import { type Compilable, Kysely } from "kysely";
import { z } from "zod/v4";

export type PostSchemas = inferSchemaMap<typeof Post.schemas>;

export const Post = {
  get schemas() {
    return {
      post: z.strictObject({
        id: z.number().optional(),
        title: z.string(),
        body: z.string(),
      }),
    };
  },

  get fixtures() {
    return {
      post() {
        return Post.schemas.post.parse({
          title: "title",
          body: "body",
        });
      },
    };
  },

  get migrations() {
    type PostSchemas = inferSchemaMap<typeof Post.schemas>;
    return {
      async v001_create_posts(db: Kysely<PostSchemas>) {
        return await db.schema
          .createTable("post")
          .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
          .addColumn("title", "text", (it) => it.notNull())
          .addColumn("body", "text", (it) => it.notNull())
          .execute();
      },
    };
  },

  get clients() {
    type PostSchemas = inferSchemaMap<typeof Post.schemas>;
    type WritePost = {
      Params: { post: PostSchemas["post"] };
    };
    type ReadPost = {
      Params: { postId: number };
    };
    type ReadPosts = {
      Params: { limit?: number };
    };
    return {
      async writePost(db: Kysely<PostSchemas>, params: WritePost["Params"]) {
        const post = Post.schemas.post.parse(params.post);
        await db
          .insertInto("post")
          .values(post)
          .onConflict((it) => it.column("id").doUpdateSet(post))
          .$call(debugSql)
          .execute();
        return {};
      },

      async readPost(db: Kysely<PostSchemas>, params: ReadPost["Params"]) {
        const r = await db
          .selectFrom("post")
          .where("id", "=", params.postId)
          .select(["id", "title", "body"])
          .limit(1)
          .executeTakeFirstOrThrow();
        const post = Post.schemas.post.parse(r);
        return { post };
      },

      async readPosts(db: Kysely<PostSchemas>, params: ReadPosts["Params"]) {
        const r = await db
          .selectFrom("post")
          .orderBy("id", "asc")
          .select(["id", "title", "body"])
          .$call((it) => (params.limit !== undefined ? it.limit(params.limit) : it))
          .execute();
        const posts = Post.schemas.post.array().parse(r);
        return { posts };
      },
    };
  },
};

export type inferSchemaMap<T extends { [key: string]: z.ZodType }> = {
  [key in keyof T]: z.infer<T[key]>;
};

export const debugSql = <T extends Compilable>(it: T): T => (console.debug(it.compile().sql), it);
