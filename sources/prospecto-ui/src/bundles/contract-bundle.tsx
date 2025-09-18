import { Kysely } from "kysely";
import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { z } from "zod/v4";
import { throwHttpError } from "../helpers/error";
import { type inferSchemaMap } from "./helpers";

export type ContractSchemas = inferSchemaMap<typeof Contract.schemas>;

export const Contract = {
  get schemas() {
    return {
      contract: z.strictObject({
        id: z.number().optional(),
        title: z.string(),
        body: z.string(),
      }),
    };
  },

  get fixtures() {
    return {
      contract() {
        return Contract.schemas.contract.parse({
          title: "title",
          body: "body",
        });
      },
    };
  },

  get migrations() {
    return {
      async v001_create_table_contract(db: Kysely<ContractSchemas>) {
        return await db.schema
          .createTable("contract")
          .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
          .addColumn("title", "text", (it) => it.notNull())
          .addColumn("body", "text", (it) => it.notNull())
          .execute();
      },
    };
  },

  get clients() {
    type WriteContract = {
      Params: { contract: ContractSchemas["contract"] };
    };
    type ReadContract = {
      Params: { contractId: number };
    };
    type ReadContracts = {
      Params: { limit?: number };
    };

    return {
      async writeContract(db: Kysely<ContractSchemas>, params: WriteContract["Params"]) {
        const contract = Contract.schemas.contract.parse(
          params.contract ?? throwHttpError(400, "contract required"),
        );
        await db
          .insertInto("contract")
          .values(contract)
          .onConflict((it) => it.column("id").doUpdateSet(contract))
          .execute();
        return {};
      },

      async readContract(db: Kysely<ContractSchemas>, params: ReadContract["Params"]) {
        const r = await db
          .selectFrom("contract")
          .where("id", "=", params.contractId ?? throwHttpError(400, "contractId required"))
          .select(["id", "title", "body"])
          .limit(1)
          .executeTakeFirst();
        const contract = Contract.schemas.contract.parse(
          r ?? throwHttpError(404, "contract not found"),
        );
        return { contract };
      },

      async readContracts(db: Kysely<ContractSchemas>, params: ReadContracts["Params"]) {
        const r = await db
          .selectFrom("contract")
          .orderBy("id", "asc")
          .select(["id", "title", "body"])
          .$call((it) => (params.limit !== undefined ? it.limit(params.limit) : it))
          .execute();
        const contracts = Contract.schemas.contract.array().parse(r);
        return { contracts };
      },
    };
  },

  get admin() {
    type ContractTableProps = { contracts: ContractSchemas["contract"][] };
    type ContractFormProps = { contract: ContractSchemas["contract"] };

    return {
      ContractTable: (props: ContractTableProps) => {
        const [contracts, setContracts] = useState<ContractSchemas["contract"][]>([]);
        useEffect(() => {
          setContracts(props.contracts);
        }, [props.contracts]);

        return (
          <table>
            <thead>
              <tr>
                <th aria-label="contract[id]">id</th>
                <th aria-label="contract[title]">title</th>
                <th aria-label="contract[body]">body</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={contract.id}>
                  <td aria-label={`contract[${index}][id]`}>{contract.id}</td>
                  <td aria-label={`contract[${index}][title]`}>{contract.title}</td>
                  <td aria-label={`contract[${index}][body]`}>{contract.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      },

      ContractForm: observer((props: ContractFormProps) => {
        const [form] = useState(() =>
          observable({
            contract: Contract.fixtures.contract(),
            setContract(contract: ContractSchemas["contract"]) {
              this.contract = contract;
            },
          }),
        );
        useEffect(() => {
          form.setContract(props.contract);
        }, [props.contract]);

        return (
          <form role="form">
            <input
              aria-label="contract[title]"
              value={form.contract.title}
              onChange={action((event) => (form.contract.title = event.target.value))}
              required
            />
            <input
              aria-label="contract[body]"
              value={form.contract.body}
              onChange={action((event) => (form.contract.body = event.target.value))}
              required
            />
          </form>
        );
      }),
    };
  },
};
