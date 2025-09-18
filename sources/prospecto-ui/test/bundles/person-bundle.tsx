import { type Compilable, Kysely } from "kysely";
import { z } from "zod/v4";

export type PersonSchemas = inferSchemaMap<typeof Person.schemas>;

export const Person = {
  get schemas() {
    return {
      person: z.strictObject({
        id: z.number().optional(),
        title: z.string(),
        body: z.string(),
      }),
    };
  },

  get fixtures() {
    return {
      person() {
        return Person.schemas.person.parse({
          title: "title",
          body: "body",
        });
      },
    };
  },

  get migrations() {
    type PersonSchemas = inferSchemaMap<typeof Person.schemas>;
    return {
      async v001_create_persons(db: Kysely<PersonSchemas>) {
        return await db.schema
          .createTable("person")
          .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
          .addColumn("title", "text", (it) => it.notNull())
          .addColumn("body", "text", (it) => it.notNull())
          .execute();
      },
    };
  },

  get clients() {
    type PersonSchemas = inferSchemaMap<typeof Person.schemas>;
    type WritePerson = {
      Params: { person: PersonSchemas["person"] };
    };
    type ReadPerson = {
      Params: { personId: number };
    };
    type ReadPersons = {
      Params: { limit?: number };
    };
    return {
      async writePerson(db: Kysely<PersonSchemas>, params: WritePerson["Params"]) {
        const person = Person.schemas.person.parse(params.person);
        await db
          .insertInto("person")
          .values(person)
          .onConflict((it) => it.column("id").doUpdateSet(person))
          .$call(debugSql)
          .execute();
        return {};
      },

      async readPerson(db: Kysely<PersonSchemas>, params: ReadPerson["Params"]) {
        const r = await db
          .selectFrom("person")
          .where("id", "=", params.personId)
          .select(["id", "title", "body"])
          .limit(1)
          .executeTakeFirstOrThrow();
        const person = Person.schemas.person.parse(r);
        return { person };
      },

      async readPersons(db: Kysely<PersonSchemas>, params: ReadPersons["Params"]) {
        const r = await db
          .selectFrom("person")
          .orderBy("id", "asc")
          .select(["id", "title", "body"])
          .$call((it) => (params.limit !== undefined ? it.limit(params.limit) : it))
          .execute();
        const persons = Person.schemas.person.array().parse(r);
        return { persons };
      },
    };
  },
};

export type inferSchemaMap<T extends { [key: string]: z.ZodType }> = {
  [key in keyof T]: z.infer<T[key]>;
};

export const debugSql = <T extends Compilable>(it: T): T => (console.debug(it.compile().sql), it);
