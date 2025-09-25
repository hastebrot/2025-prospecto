import { z } from "zod/v4";

export type inferSchemaMap<T extends { [key: string]: z.ZodType }> = {
  [key in keyof T]: z.infer<T[key]>;
};
