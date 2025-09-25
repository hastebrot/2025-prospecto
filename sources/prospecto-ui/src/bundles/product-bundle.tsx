import { Kysely } from "kysely";
import { z } from "zod/v4";
import { Sqlocal } from "../helpers/sqlocal";
import { type inferSchemaMap } from "../helpers/zod";

export type ProductSchemas = inferSchemaMap<typeof Product.schemas>;

export const Product = {
  get schemas() {
    return {
      product: z.strictObject({
        id: z.number().optional(),
        title: z.string(),
        body: z.string(),
      }),
    };
  },

  get fixtures() {
    return {
      product() {
        return Product.schemas.product.parse({
          title: "title",
          body: "body",
        });
      },
    };
  },

  get migrations() {
    type ProductSchemas = inferSchemaMap<typeof Product.schemas>;
    return {
      async v001_create_table_product(db: Kysely<ProductSchemas>) {
        return await db.schema
          .createTable("product")
          .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
          .addColumn("title", "text", (it) => it.notNull())
          .addColumn("body", "text", (it) => it.notNull())
          .execute();
      },
    };
  },

  get clients() {
    type ProductSchemas = inferSchemaMap<typeof Product.schemas>;
    type WriteProduct = {
      Params: { product: ProductSchemas["product"] };
    };
    type ReadProduct = {
      Params: { productId: number };
    };
    type ReadPersons = {
      Params: { limit?: number };
    };
    return {
      async writeProduct(db: Kysely<ProductSchemas>, params: WriteProduct["Params"]) {
        const person = Product.schemas.product.parse(params.product);
        await db
          .insertInto("product")
          .values(person)
          .onConflict((it) => it.column("id").doUpdateSet(person))
          .$call(Sqlocal.debugSql)
          .execute();
        return {};
      },

      async readProduct(db: Kysely<ProductSchemas>, params: ReadProduct["Params"]) {
        const r = await db
          .selectFrom("product")
          .where("id", "=", params.productId)
          .select(["id", "title", "body"])
          .limit(1)
          .executeTakeFirstOrThrow();
        const product = Product.schemas.product.parse(r);
        return { product };
      },

      async readProducts(db: Kysely<ProductSchemas>, params: ReadPersons["Params"]) {
        const r = await db
          .selectFrom("product")
          .orderBy("id", "asc")
          .select(["id", "title", "body"])
          .$call((it) => (params.limit !== undefined ? it.limit(params.limit) : it))
          .execute();
        const products = Product.schemas.product.array().parse(r);
        return { products };
      },
    };
  },
};
