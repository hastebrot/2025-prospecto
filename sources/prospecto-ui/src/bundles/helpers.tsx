import { type Compilable } from "kysely";
import { z } from "zod/v4";

export type inferSchemaMap<T extends { [key: string]: z.ZodType }> = {
  [key in keyof T]: z.infer<T[key]>;
};

export const debugSql = <T extends Compilable>(it: T): T => (console.debug(it.compile().sql), it);
