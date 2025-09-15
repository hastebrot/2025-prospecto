import { cleanup, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { type ColumnDataType, type Compilable, Kysely } from "kysely";
import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { beforeEach, expect, describe as suite, test } from "vitest";
import { z } from "zod/v4";
import { throwError } from "../../src/helpers/error";
import { createDatabaseWithSqlocal } from "../../src/helpers/sqlocal";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";

const Post = {
  get schema() {
    return {
      post: z
        .strictObject({
          id: meta(z.number().optional(), {
            migration: {
              primaryKey: true,
              autoIncrement: true,
            },
          }),
          title: z.string(),
          body: z.string(),
        })
        .meta({
          title: "post",
        }),
    };
  },

  get jsonSchema() {
    return {
      post: toJsonSchema(Post.schema.post),
    };
  },

  get faker() {
    return {
      post() {
        return Post.schema.post.parse({
          title: "title",
          body: "body",
        });
      },
    };
  },

  get migration() {
    type Post = inferSchemaMap<typeof Post.schema>;
    return {
      async createPosts(db: Kysely<Post>) {
        return await db.schema
          .createTable("post")
          .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
          .addColumn("title", "text", (it) => it.notNull())
          .addColumn("body", "text", (it) => it.notNull())
          .execute();
      },
    };
  },

  get client() {
    type Post = inferSchemaMap<typeof Post.schema>;
    type WritePost = {
      Params: { post: Post["post"] };
    };
    type ReadPost = {
      Params: { postId: number };
    };
    type ReadPosts = {
      Params: { limit?: number };
    };
    return {
      async writePost(db: Kysely<Post>, params: WritePost["Params"]) {
        const post = Post.schema.post.parse(params.post);
        await db
          .insertInto("post")
          .values(post)
          .onConflict((it) => it.column("id").doUpdateSet(post))
          .execute();
        return {};
      },
      async readPost(db: Kysely<Post>, params: ReadPost["Params"]) {
        const r = await db
          .selectFrom("post")
          .where("id", "=", params.postId)
          .select(["id", "title", "body"])
          .limit(1)
          .executeTakeFirstOrThrow();
        const post = Post.schema.post.parse(r);
        return { post };
      },
      async readPosts(db: Kysely<Post>, params: ReadPosts["Params"]) {
        const r = await db
          .selectFrom("post")
          .orderBy("id", "asc")
          .select(["id", "title", "body"])
          .$call((it) => (params.limit !== undefined ? it.limit(params.limit) : it))
          .execute();
        const posts = Post.schema.post.array().parse(r);
        return { posts };
      },
    };
  },

  get admin() {
    type Post = inferSchemaMap<typeof Post.schema>;
    type PostListTableProps = { posts: Post["post"][] };
    type PostFormProps = { post: Post["post"] };
    return {
      PostListTable: (props: PostListTableProps) => {
        const [posts, setPosts] = useState<Post["post"][]>([]);
        useEffect(() => {
          setPosts(props.posts);
        }, [props.posts]);
        return (
          <table>
            <thead>
              <tr>
                <th aria-label="post[id]">id</th>
                <th aria-label="post[title]">title</th>
                <th aria-label="post[body]">body</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td aria-label={`post[${index}][id]`}>{post.id}</td>
                  <td aria-label={`post[${index}][title]`}>{post.title}</td>
                  <td aria-label={`post[${index}][body]`}>{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      },
      PostForm: observer((props: PostFormProps) => {
        const [form] = useState(() =>
          observable({
            post: Post.faker.post(),
            setPost(post: Post["post"]) {
              this.post = post;
            },
          }),
        );
        useEffect(() => {
          form.setPost(props.post);
        }, [props.post]);
        return (
          <form role="form">
            <input
              aria-label="post[title]"
              value={form.post.title}
              onChange={action((event) => (form.post.title = event.target.value))}
              required
            />
            <input
              aria-label="post[body]"
              value={form.post.body}
              onChange={action((event) => (form.post.body = event.target.value))}
              required
            />
          </form>
        );
      }),
    };
  },
};

type inferSchemaMap<T extends { [key: string]: z.ZodType }> = {
  [key in keyof T]: z.infer<T[key]>;
};

type SchemaMeta = {
  [key: string]: unknown;
  migration?: {
    primaryKey?: boolean;
    autoIncrement?: boolean;
  };
};

const meta = <T extends z.ZodType>(schema: T, meta?: SchemaMeta) => {
  return meta !== undefined ? schema.meta(meta) : schema;
};

const toJsonSchema = <T extends z.ZodType>(schema: T) => {
  return z.toJSONSchema(schema) as z.core.JSONSchema.ObjectSchema;
};

export const debugSql = <T extends Compilable>(it: T): T => (console.debug(it.compile().sql), it);

export const setupDatabase = async <T extends any = any>() => {
  return createDatabaseWithSqlocal<T>({
    databasePath: process.env.NODE_ENV === "test" ? ":memory:" : ":localStorage:",
  });
};

export const autoCreateTable = <T extends any = any>(name: string, schema: z.ZodObject) => {
  type SqlTypes = {
    [key: string]: ColumnDataType;
  };
  const sqlTypes: SqlTypes = {
    string: "text",
    number: "integer",
    boolean: "boolean",
  };
  type TableModel = {
    name: string;
    columns: {
      [key: string]: {
        columnName: string;
        dataType: ColumnDataType;
        primaryKey?: boolean;
        autoIncrement?: boolean;
        notNull?: boolean;
      };
    };
  };
  function toTableModel(jsonSchema: z.core.JSONSchema.ObjectSchema): TableModel {
    const tableModel: TableModel = { name: jsonSchema.title!, columns: {} };
    for (const key in jsonSchema.properties) {
      const value = jsonSchema.properties[key] as z.core.JSONSchema.Schema & SchemaMeta;
      const type = value.type ?? throwError(`type property not found: "${key}"`);
      const dataType = sqlTypes[type] ?? throwError(`type mapping not found: "${type}"`);
      const primaryKey = value.migration?.primaryKey === true;
      const autoIncrement = value.migration?.autoIncrement === true;
      const notNull = jsonSchema.required?.includes(key);
      tableModel.columns[key] = { columnName: key, dataType };
      primaryKey && (tableModel.columns[key].primaryKey = primaryKey);
      autoIncrement && (tableModel.columns[key].autoIncrement = autoIncrement);
      notNull && (tableModel.columns[key].notNull = notNull);
    }
    return tableModel;
  }
  const jsonSchema = {
    ...toJsonSchema(schema),
    title: name,
  };
  const tableModel = toTableModel(jsonSchema);
  return (db: Kysely<T>) => {
    let q = db.schema.createTable(tableModel.name);
    for (const column of Object.values(tableModel.columns)) {
      q = q.addColumn(column.columnName, column.dataType, (qc) => {
        qc = column.primaryKey ? qc.primaryKey() : qc;
        qc = column.autoIncrement ? qc.autoIncrement() : qc;
        qc = column.notNull ? qc.notNull() : qc;
        return qc;
      });
    }
    return q;
  };
};

const { db, deleteDatabaseFile } = await setupDatabase<inferSchemaMap<typeof Post.schema>>();
beforeEach(deleteDatabaseFile);
registerGlobals();
registerMatchers();

suite("post bundle", () => {
  test("auto create table", async () => {
    const createTable = autoCreateTable("post", Post.schema.post);
    expect(createTable(db).compile().sql).toBe(
      `create table "post" ("id" integer primary key autoincrement, "title" text not null, "body" text not null)`,
    );
  });

  test("post schema, migration, client, admin", async () => {
    await Post.migration.createPosts(db);
    await Post.client.writePost(db, {
      post: Post.schema.post.parse(Post.faker.post()),
    });
    await Post.client.writePost(db, {
      post: Post.schema.post.parse(Post.faker.post()),
    });
    const post = await Post.client.readPost(db, { postId: 1 });
    expect(post).toMatchObject({
      post: {
        id: 1,
        title: "title",
        body: "body",
      },
    });
    const posts = await Post.client.readPosts(db, { limit: 2 });
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
    expect(Post.jsonSchema.post).toMatchObject({
      title: "post",
      type: "object",
      properties: {
        id: { type: "number" },
        title: { type: "string" },
        body: { type: "string" },
      },
      required: ["title", "body"],
    });
    {
      cleanup();
      const posts = await Post.client.readPosts(db, { limit: 2 });
      const screen = render(<Post.admin.PostListTable posts={posts.posts} />);
      const postTable = screen.getByRole("table");
      await waitFor(() => postTable);
      expect(screen.getAllByRole("row")).toHaveLength(3);
      expect(screen.getByRole("columnheader", { name: "post[id]" })).toHaveTextContent("id");
      expect(screen.getByRole("columnheader", { name: "post[title]" })).toHaveTextContent("title");
      expect(screen.getByRole("columnheader", { name: "post[body]" })).toHaveTextContent("body");
      expect(screen.getByRole("cell", { name: "post[0][id]" })).toHaveTextContent("1");
      expect(screen.getByRole("cell", { name: "post[0][title]" })).toHaveTextContent("title");
      expect(screen.getByRole("cell", { name: "post[0][body]" })).toHaveTextContent("body");
      expect(screen.getByRole("cell", { name: "post[1][id]" })).toHaveTextContent("2");
      expect(screen.getByRole("cell", { name: "post[1][title]" })).toHaveTextContent("title");
      expect(screen.getByRole("cell", { name: "post[1][body]" })).toHaveTextContent("body");
    }
    {
      cleanup();
      const post = await Post.client.readPost(db, { postId: 1 });
      const screen = render(<Post.admin.PostForm post={post.post} />);
      const user = userEvent.setup({ document: global.document });
      const postForm = screen.getByRole("form");
      await waitFor(() => postForm);
      const postTitle = screen.getByRole("textbox", { name: "post[title]" });
      const postBody = screen.getByRole("textbox", { name: "post[body]" });
      expect(postTitle).toHaveValue("title");
      expect(postBody).toHaveValue("body");
      await user.click(postTitle);
      await user.clear(postTitle);
      await user.type(postTitle, "new title");
      expect(postTitle).toHaveValue("new title");
      await user.click(postBody);
      await user.clear(postBody);
      await user.type(postBody, "new body");
      expect(postBody).toHaveValue("new body");
    }
  });
});
