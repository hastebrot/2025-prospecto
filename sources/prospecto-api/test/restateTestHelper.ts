// https://github.com/restatedev/sdk-typescript/blob/v1.6.1/packages/restate-sdk-testcontainers/src/restate_test_environment.ts

/*
 * Copyright (c) 2023-2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate SDK for Node.js/TypeScript,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in file LICENSE in the root
 * directory of this repository or package, or at
 * https://github.com/restatedev/sdk-typescript/blob/main/LICENSE
 */

import type {
  Serde,
  TypedState,
  UntypedState,
  VirtualObjectDefinition,
  WorkflowDefinition,
} from "@restatedev/restate-sdk";
import { serde } from "@restatedev/restate-sdk";
import { tableFromIPC } from "@uwdata/flechette";

export class RestateTestEnvironment {
  constructor(readonly baseUrl: string, readonly adminAPIBaseUrl: string) {}

  // Create a handle that allows read/write of state under a given Virtual Object/Workflow key.
  public stateOf<TState extends TypedState = UntypedState>(
    service: VirtualObjectDefinition<string, unknown> | WorkflowDefinition<string, unknown>,
    key: string
  ): StateProxy<TState> {
    return new StateProxy(this.adminAPIBaseUrl, service.name, key);
  }
}

export class StateProxy<TState extends TypedState> {
  constructor(
    private adminAPIBaseUrl: string,
    private service: string,
    private serviceKey: string
  ) {}

  // Read a single value from state under a given Virtual Object or Workflow key
  public async get<TValue, TKey extends keyof TState = string>(
    name: TState extends UntypedState ? string : TKey,
    serde?: Serde<TState extends UntypedState ? TValue : TState[TKey]>
  ): Promise<(TState extends UntypedState ? TValue : TState[TKey]) | null> {
    serde = serde ?? defaultSerde();

    const res = await fetch(`${this.adminAPIBaseUrl}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `SELECT value from state where service_name = '${this.service}' and service_key = '${
          this.serviceKey
        }' and key = '${String(name)}';`,
      }),
    });

    if (!res.ok) {
      const badResponse = await res.text();
      throw new Error(`Error ${res.status} during read state: ${badResponse}`);
    }

    const table = tableFromIPC(await res.arrayBuffer()).toArray() as {
      key: string;
      value: Uint8Array;
    }[];

    if (table.length > 0) {
      return serde.deserialize(table[0]!.value);
    }
    return null;
  }

  // Read all values from state under a given Virtual Object or Workflow key
  public async getAll<TValues extends TypedState>(
    serde?: Serde<TState extends UntypedState ? TValues[keyof TValues] : TState[keyof TState]>
  ): Promise<TState extends UntypedState ? TValues : TState> {
    serde = serde ?? defaultSerde();

    const items = await this.getAllRaw();

    return Object.fromEntries(
      items.map(({ key, value }) => {
        return [key, serde.deserialize(value)];
      })
    ) as TState extends UntypedState ? TValues : TState;
  }

  private async getAllRaw(): Promise<{ key: string; value: Uint8Array }[]> {
    const res = await fetch(`${this.adminAPIBaseUrl}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `SELECT key, value from state where service_name = '${this.service}' and service_key = '${this.serviceKey}';`,
      }),
    });

    if (!res.ok) {
      const badResponse = await res.text();
      throw new Error(`Error ${res.status} during read state: ${badResponse}`);
    }

    const table = tableFromIPC(await res.arrayBuffer()).toArray() as {
      key: string;
      value: Uint8Array;
    }[];

    return table;
  }

  // Asynchronously set a single value from state under a given Virtual Object or Workflow key.
  // This will first read all values, then insert the update and submit the new set of values to Restate;
  // as such it is possible to overwrite changes that happened between the read and the mutation being applied.
  // A successful return from this function does not imply that the set has finished, only that the mutation
  // was submitted to Restate for processing.
  public async set<TValue, TKey extends keyof TState = string>(
    name: TState extends UntypedState ? string : TKey,
    value: TState extends UntypedState ? TValue : TState[TKey],
    serde?: Serde<TState extends UntypedState ? TValue : TState[TKey]>
  ): Promise<void> {
    serde = serde ?? defaultSerde();
    const serialisedValue = serde.serialize(value);

    const items = await this.getAllRaw();

    items.push({ key: String(name), value: serialisedValue });

    await this.setAllRaw(items.map(({ key, value }) => [key, value]));
  }

  // Asynchronously set all state values under a given Virtual Object or Workflow key.
  // A successful return from this function does not imply that the set has finished,
  // only that the mutation was submitted to Restate for processing.
  public async setAll<TValues extends TypedState>(
    values: TState extends UntypedState ? TValues : TState,
    serde?: Serde<TState extends UntypedState ? TValues[keyof TValues] : TState[keyof TState]>
  ) {
    serde = serde ?? defaultSerde();

    return this.setAllRaw(
      Object.entries<TState extends UntypedState ? TValues[keyof TValues] : TState[keyof TState]>(
        values
      ).map(([key, value]) => {
        return [key, serde.serialize(value)];
      })
    );
  }

  private async setAllRaw(entries: [key: string, value: Uint8Array][], version?: string) {
    const res = await fetch(`${this.adminAPIBaseUrl}/services/${this.service}/state`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          version,
          object_key: this.serviceKey,
          new_state: Object.fromEntries(entries),
        },
        (key, value) => {
          if (value instanceof Uint8Array) {
            return Array.from(value);
          } else {
            return value;
          }
        }
      ),
    });

    if (!res.ok) {
      const badResponse = await res.text();
      throw new Error(`Error ${res.status} during modify state: ${badResponse}`);
    }
  }
}

export const defaultSerde = <T>(): Serde<T> => {
  return serde.json as Serde<T>;
};
