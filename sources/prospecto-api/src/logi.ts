// https://jsr.io/@soapbox/logi/0.3.0/src/logi.ts
// This is free and unencumbered software released into the public domain.

/**
 * Logi is the simplest JSON logging "framework" for TypeScript.
 *
 * ```ts
 * import { logi } from '@soapbox/logi';
 *
 * logi({ level: 'info', ns: 'myapp.startup', started: true });
 * logi({ level: 'debug', ns: 'myapp.sql', sql: 'SELECT * FROM users LIMIT $1', parameters: [20] });
 * logi({ level: 'warn', ns: 'myapp.config', message: 'missing TRUSTED_PROXIES, rate limiting will be disabled' });
 * logi({ level: 'error', ns: 'myapp.http', status: 500, client_ip: '192.168.1.2', message: 'Something went wrong!' });
 * ```
 */
export const logi: Logi = (log: LogiLog): void => {
  logi.handler(log);
};

// Default custom handler.
logi.handler = (log: LogiLog): void => {
  console.log(
    JSON.stringify(log, (_key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      if (typeof value === "symbol") {
        return value.toString();
      }
      if (typeof value === "function") {
        return value.toString();
      }
      if (value instanceof Error) {
        return {
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      if (value instanceof Uint8Array) {
        return `Uint8Array(${value.length})`;
      }
      return value;
    })
  );
};

/** Logi main interface, with extensible handler. */
export interface Logi extends LogiHandler {
  /** Custom handler function to use globally whenever `logi()` is called. */
  handler: LogiHandler;
}

/** Function that accepts a Logi log object and outputs it to the logging backend (usually to the console). */
export interface LogiHandler {
  (log: LogiLog): void;
}

/** Logi log object. */
export interface LogiLog {
  /**
   * Log level. Includes all levels supported by Loki by default.
   *
   * See: https://github.com/grafana/loki/blob/main/pkg/util/constants/levels.go
   */
  level: "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "critical";
  /**
   * Logger namespace separated by dots (reverse DNS-ish).
   *
   * Examples: `myapp.sql`, `myapp.config`, `myapp.http.request`.
   *
   * Usually `<appname>.<subsystem>` is sufficient, but a fully-qualified reverse DNS name like `com.example.myapp.sql` could also be used.
   */
  ns: string;
  /** Extra properties of the log. */
  [k: string]: LogiValue | undefined;
}

/** Native JSON value or an object that can be serialized into JSON (with `JSON.stringify`) automatically. */
// deno-lint-ignore ban-types
export type LogiValue =
  | JsonValue
  | bigint
  | symbol
  | { toJSON(): JsonValue }
  | Error
  | Date
  | Function
  | Uint8Array;

/** Native JSON primitive value, including objects and arrays. */
type JsonValue =
  | { [key: string]: JsonValue | undefined }
  | JsonValue[]
  | string
  | number
  | boolean
  | null;
