import { beforeEach, expect, describe as suite, test } from "vitest";
import { createDatabaseWithSqlocal } from "../../src/helpers/sqlocal";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";
import { Person, type PersonSchemas } from "./person-bundle";

export const setupDatabase = async <T extends any = any>() => {
  return createDatabaseWithSqlocal<T>({
    databasePath: process.env.NODE_ENV === "test" ? ":memory:" : ":localStorage:",
  });
};

const { db, deleteDatabaseFile } = await setupDatabase<PersonSchemas>();
beforeEach(deleteDatabaseFile);
registerGlobals();
registerMatchers();

suite("person bundle", () => {
  test("person schema, migration, client", async () => {
    await Person.migrations.v001_create_persons(db);
    await Person.clients.writePerson(db, {
      person: Person.schemas.person.parse(Person.fixtures.person()),
    });
    await Person.clients.writePerson(db, {
      person: Person.schemas.person.parse(Person.fixtures.person()),
    });
    const person = await Person.clients.readPerson(db, { personId: 1 });
    expect(person).toMatchObject({
      person: {
        id: 1,
        title: "title",
        body: "body",
      },
    });
    const persons = await Person.clients.readPersons(db, { limit: 2 });
    expect(persons).toMatchObject({
      persons: [
        {
          id: 1,
          title: "title",
          body: "body",
        },
        {
          id: 2,
          title: "title",
          body: "body",
        },
      ],
    });
  });
});
