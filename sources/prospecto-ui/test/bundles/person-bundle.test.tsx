import { beforeEach, expect, describe as suite, test } from "vitest";
import { createDatabaseWithSqlocal } from "../../src/helpers/sqlocal";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";
import { Post, type PostSchemas } from "./person-bundle";

export const setupDatabase = async <T extends any = any>() => {
  return createDatabaseWithSqlocal<T>({
    databasePath: process.env.NODE_ENV === "test" ? ":memory:" : ":localStorage:",
  });
};

const { db, deleteDatabaseFile } = await setupDatabase<PostSchemas>();
beforeEach(deleteDatabaseFile);
registerGlobals();
registerMatchers();

suite("post bundle", () => {
  test("post schema, migration, client", async () => {
    await Post.migrations.v001_create_posts(db);
    await Post.clients.writePost(db, {
      post: Post.schemas.post.parse(Post.fixtures.post()),
    });
    await Post.clients.writePost(db, {
      post: Post.schemas.post.parse(Post.fixtures.post()),
    });
    const post = await Post.clients.readPost(db, { postId: 1 });
    expect(post).toMatchObject({
      post: {
        id: 1,
        title: "title",
        body: "body",
      },
    });
    const posts = await Post.clients.readPosts(db, { limit: 2 });
    expect(posts).toMatchObject({
      posts: [
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
