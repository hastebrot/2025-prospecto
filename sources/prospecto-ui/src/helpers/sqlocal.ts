import { Kysely, type Compilable } from "kysely";
import { defaultDeserializer, defaultSerializer, SerializePlugin } from "kysely-plugin-serialize";
import { SQLocalKysely } from "sqlocal/kysely";

export const Sqlocal = {
  createDatabase<KyselyDatabase = unknown>(sqlocalConfig: SQLocalKysely["config"]) {
    const { dialect, getDatabaseFile, deleteDatabaseFile } = new SQLocalKysely(sqlocalConfig);
    const db = new Kysely<KyselyDatabase>({
      dialect,
      plugins: [
        // serialize plugin should be placed at the end of the plugins array.
        new SerializePlugin({
          serializer: defaultSerializer,
          deserializer: defaultDeserializer,
        }),
      ],
    });

    return { db, getDatabaseFile, deleteDatabaseFile };
  },

  debugSql: <T extends Compilable>(it: T): T => (console.debug(it.compile().sql), it),
};
