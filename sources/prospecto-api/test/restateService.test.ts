import * as restate from "@restatedev/restate-sdk";
import * as clients from "@restatedev/restate-sdk-clients";
import { logi } from "@soapbox/logi";
import { beforeAll, describe, expect, it } from "bun:test";
import { styleText } from "node:util";
import { RestateTestEnvironment } from "./restateTestHelper";

const restateIngressAddr = process.env.RESTATE_INGRESS_ADDR ?? "localhost:8080";
const restateAdminAddr = process.env.RESTATE_ADMIN_ADDR ?? "localhost:9070";

const serviceHost = process.env.SERVICE_HOST ?? "localhost";
const mainServicePort = 9080;
const mainServiceAddr = `${serviceHost}:${mainServicePort}`;

const greeterService = restate.service({
  name: "main-greeter",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      await ctx.sleep(0);
      return `Hello ${name}`;
    },
  },
});

const virtualObject = restate.object({
  name: "main-virtual-object",
  description: "A virtual object",
  handlers: {
    handle: async (ctx: restate.ObjectContext) => {
      ctx.set("state", "hello");
      return "result";
    },
  },
});

const userSignupWorkflow = restate.workflow({
  name: "main-user-signup",
  handlers: {
    run: async (ctx: restate.WorkflowContext, req: { email: string }) => {
      ctx.set("value", req.email);
      await ctx.run("action", () => {
        console.log("in action");
      });
      return { email: req.email };
    },
  },
});

beforeAll(async () => {
  logi.handler = (log): void => {
    const ts = new Date().toISOString();
    console.log(
      styleText("yellow", ts),
      styleText("cyanBright", log.ns),
      styleText("cyan", log.level),
      ...(log.invocationId ? [styleText("white", String(log.invocationId))] : []),
      ...(log.invocationTarget ? [styleText("white", String(log.invocationTarget))] : []),
      styleText("gray", String(log.message)),
    );
  };
  await restate
    .endpoint()
    .bind(greeterService)
    .bind(userSignupWorkflow)
    .bind(virtualObject)
    .setLogger((meta, message) => {
      const invocationId = meta.context?.invocationId;
      const invocationTarget = meta.context?.invocationTarget;
      logi({
        level: meta.level,
        ns: "restate",
        invocationId,
        invocationTarget,
        message,
      });
    })
    .listen(mainServicePort);
  await fetch(`http://${restateAdminAddr}/deployments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uri: `http://${mainServiceAddr}/` }),
  });
});

const restateTest = new RestateTestEnvironment(restateIngressAddr, restateAdminAddr);

describe("restate service", () => {
  it("introspect invocations", async () => {
    const res = await fetch(`http://${restateAdminAddr}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "select * from sys_invocation where status = 'completed'" }),
    });
    console.log(await res.json());
  });

  it("should call greeter service", async () => {
    const client = clients.connect({ url: `http://${restateIngressAddr}/` });
    const result = await client
      .serviceClient(greeterService)
      .greet("world", new clients.Opts({ timeout: 1000 }));
    expect(result).toBe("Hello world");
  });

  it("should call greeter service, again", async () => {
    const client = clients.connect({ url: `http://${restateIngressAddr}/` });
    const result = await client.serviceClient(greeterService).greet("earth");
    expect(result).toBe("Hello earth");
  });

  it("should call virtual object service", async () => {
    const client = clients.connect({ url: `http://${restateIngressAddr}/` });
    const result = await client.objectClient(virtualObject, "key").handle();
    expect(result).toBe("result");
  });

  it("should execute workflow", async () => {
    const client = clients.connect({ url: `http://${restateIngressAddr}/` });
    const handler = client.workflowClient(userSignupWorkflow, "key");
    await handler.workflowSubmit({ email: "email" });
    const result = await handler.workflowAttach();
    expect(result).toMatchObject({ email: "email" });
    const state = restateTest.stateOf(userSignupWorkflow, "key");
    expect(await state.get<string>("value")).toBe("email");
    expect(await state.getAll()).toStrictEqual({ value: "email" });
  });
});
