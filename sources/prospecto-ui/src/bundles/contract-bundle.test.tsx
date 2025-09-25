import { cleanup, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, expect, describe as suite, test } from "vitest";
import { Sqlocal } from "../helpers/sqlocal";
import { registerGlobals } from "../tests/register-globals.ts";
import { registerMatchers } from "../tests/register-matchers";
import { Contract, type ContractSchemas } from "./contract-bundle";

registerGlobals();
registerMatchers();

export const setupDatabase = async <T extends any = any>() => {
  return Sqlocal.createDatabase<T>({
    databasePath: process.env.NODE_ENV === "test" ? ":memory:" : ":localStorage:",
  });
};

const { db, deleteDatabaseFile } = await setupDatabase<ContractSchemas>();
beforeEach(deleteDatabaseFile);

suite("contract bundle", () => {
  beforeEach(async () => {
    await Contract.migrations.v001_create_table_contract(db);
    await Contract.clients.writeContract(db, {
      contract: Contract.schemas.contract.parse(Contract.fixtures.contract()),
    });
    await Contract.clients.writeContract(db, {
      contract: Contract.schemas.contract.parse(Contract.fixtures.contract()),
    });
  });

  test("contract clients", async () => {
    const contract = await Contract.clients.readContract(db, { contractId: 1 });
    expect(contract).toMatchObject({
      contract: {
        id: 1,
        title: "title",
        body: "body",
      },
    });

    const contracts = await Contract.clients.readContracts(db, { limit: 2 });
    expect(contracts).toMatchObject({
      contracts: [
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

  test("contract table", async () => {
    cleanup();
    const contracts = await Contract.clients.readContracts(db, { limit: 2 });
    const screen = render(<Contract.components.ContractTable contracts={contracts.contracts} />);

    const contractTable = screen.getByRole("table");
    await waitFor(() => contractTable);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByRole("columnheader", { name: "contract[id]" })).toHaveTextContent("id");
    expect(screen.getByRole("columnheader", { name: "contract[title]" })).toHaveTextContent(
      "title",
    );
    expect(screen.getByRole("columnheader", { name: "contract[body]" })).toHaveTextContent("body");
    expect(screen.getByRole("cell", { name: "contract[0][id]" })).toHaveTextContent("1");
    expect(screen.getByRole("cell", { name: "contract[0][title]" })).toHaveTextContent("title");
    expect(screen.getByRole("cell", { name: "contract[0][body]" })).toHaveTextContent("body");
    expect(screen.getByRole("cell", { name: "contract[1][id]" })).toHaveTextContent("2");
    expect(screen.getByRole("cell", { name: "contract[1][title]" })).toHaveTextContent("title");
    expect(screen.getByRole("cell", { name: "contract[1][body]" })).toHaveTextContent("body");
  });

  test("contract form", async () => {
    cleanup();
    const contract = await Contract.clients.readContract(db, { contractId: 1 });
    const screen = render(<Contract.components.ContractForm contract={contract.contract} />);
    const user = userEvent.setup({ document: global.document });

    const contractForm = screen.getByRole("form");
    await waitFor(() => contractForm);
    const contractTitle = screen.getByRole("textbox", { name: "contract[title]" });
    const contractBody = screen.getByRole("textbox", { name: "contract[body]" });
    expect(contractTitle).toHaveValue("title");
    expect(contractBody).toHaveValue("body");
    await user.click(contractTitle);
    await user.clear(contractTitle);
    await user.type(contractTitle, "new title");
    expect(contractTitle).toHaveValue("new title");
    await user.click(contractBody);
    await user.clear(contractBody);
    await user.type(contractBody, "new body");
    expect(contractBody).toHaveValue("new body");
  });
});
