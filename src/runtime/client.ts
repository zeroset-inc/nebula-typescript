import {
  errorFromResponse,
  NebulaAPIError,
  NebulaConnectionError,
  NebulaTimeoutError,
} from "./errors.ts";
import { backoffMs, DEFAULT_RETRY, isRetryableStatus, sleep, type RetryPolicy } from "./retry.ts";

export interface ClientOptions {
  baseUrl?: string;
  apiKey?: string;
  defaultHeaders?: Record<string, string>;
  fetchImpl?: typeof fetch;
  // Caller-supplied RequestInit fields applied to every outbound fetch.
  // Lets browser callers pass `credentials: "include"` for cookie auth,
  // or `mode`/`cache`/`referrer` for cross-origin tuning. Method, headers,
  // body, and signal are owned by the runtime and cannot be overridden
  // here (they're set per-request).
  fetchOptions?: Omit<RequestInit, "method" | "headers" | "body" | "signal">;
  timeoutMs?: number;
  retry?: Partial<RetryPolicy>;
  userAgent?: string;
}

export interface RequestArgs {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  pathParams?: Record<string, string | number>;
  query?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string | undefined>;
  routing?: EdgeRoutingRule;
  /** Enables transient retries for this complete serialized request. */
  retryable?: boolean;
  /** Describes the HTTP method only; it never enables retries. */
  httpSemanticallyIdempotent?: boolean;
  /** Identifies an unknown mutation outcome for server-side reconciliation. */
  mutationReplayIdentity?: MutationReplayIdentity;
  utf8ByteLimits?: ReadonlyArray<Utf8ByteLimit>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export type MutationReplayIdentity =
  | { source: "body"; name: string; generated?: "uuid" }
  | { source: "header"; name: string }
  | {
      source: "intrinsic";
      name: "operation_item" | "operation_id" | "resource_path" | "resource_set";
    };

export interface GeneratedBodyField {
  path: ReadonlyArray<string>;
  kind: "uuid";
}

/** Makes SDK-generated wire fields optional at every marked nesting level. */
export type GeneratedBodyInput<T, Keys extends PropertyKey> =
  T extends readonly (infer Item)[]
    ? Array<GeneratedBodyInput<Item, Keys>>
    : T extends object
      ? {
          [Key in keyof T as Key extends Keys ? never : Key]:
            GeneratedBodyInput<T[Key], Keys>;
        } & {
          [Key in keyof T as Key extends Keys ? Key : never]?:
            GeneratedBodyInput<T[Key], Keys>;
        }
      : T;

export interface Utf8ByteLimit {
  source: "body" | "header";
  path: ReadonlyArray<string>;
  maximum: number;
}

/**
 * Clone a request body and fill all generated wire fields once, before the
 * runtime freezes the serialized request for retries.
 */
export function prepareGeneratedBody<T>(
  body: T,
  fields: ReadonlyArray<GeneratedBodyField>,
): T {
  let prepared: unknown = body;
  for (const field of fields) {
    prepared = prepareGeneratedPath(prepared, field.path, field.kind);
  }
  return prepared as T;
}

function prepareGeneratedPath(
  value: unknown,
  path: ReadonlyArray<string>,
  kind: GeneratedBodyField["kind"],
): unknown {
  if (path.length === 0) return value;
  const [head, ...tail] = path;
  if (head === "*") {
    if (value === undefined || value === null) return value;
    if (!Array.isArray(value)) {
      throw new TypeError("Generated body field wildcard must traverse an array");
    }
    return value.map((item) => prepareGeneratedPath(item, tail, kind));
  }
  if (value === undefined || value === null) return value;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Generated body field must traverse an object");
  }
  const copy = { ...(value as Record<string, unknown>) };
  if (tail.length === 0) {
    if (copy[head] === undefined || copy[head] === null) {
      copy[head] = generateBodyValue(kind);
    }
  } else if (copy[head] !== undefined && copy[head] !== null) {
    copy[head] = prepareGeneratedPath(copy[head], tail, kind);
  }
  return copy;
}

function generateBodyValue(kind: GeneratedBodyField["kind"]): string {
  if (kind === "uuid") return globalThis.crypto.randomUUID();
  return kind satisfies never;
}

export interface EdgeRoutingRule {
  owner: string;
  bodyFields?: string[];
  queryFields?: string[];
  pathFields?: string[];
}

/** Per-call options every generated resource method accepts. */
export interface RequestOptions {
  signal?: AbortSignal;
  /** Total invocation budget, including all attempts and retry waits. */
  timeoutMs?: number;
}

const DEFAULT_BASE_URL = "https://api.zeroset.com";
const DEFAULT_TIMEOUT_MS = 60_000;

export class NebulaCore {
  readonly baseUrl: string;
  readonly apiKey?: string;
  readonly defaultHeaders: Record<string, string>;
  readonly fetchImpl: typeof fetch;
  readonly fetchOptions: Omit<RequestInit, "method" | "headers" | "body" | "signal">;
  readonly timeoutMs: number;
  readonly retry: RetryPolicy;
  readonly userAgent: string;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.apiKey = options.apiKey;
    // Filter null/undefined values. Callers (often using `as any` to
    // bypass the `Record<string, string>` type) pass nulls to suppress
    // a header — but `new Headers({k: null})` coerces null to the
    // literal string "null", which a backend that checks "is this
    // header present" treats as an explicit credential. Strip nulls
    // here so the Headers constructor sees only real string values.
    this.defaultHeaders = filterNullishHeaders(options.defaultHeaders);
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.fetchOptions = options.fetchOptions ?? {};
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.retry = { ...DEFAULT_RETRY, ...(options.retry ?? {}) };
    this.userAgent = options.userAgent ?? "nebula-sdk-js/0.0.1";
  }

  buildUrl(path: string, pathParams?: Record<string, string | number>, query?: Record<string, unknown>): string {
    let resolved = path;
    if (pathParams) {
      for (const [k, v] of Object.entries(pathParams)) {
        resolved = resolved.replace(`{${k}}`, encodeURIComponent(String(v)));
      }
    }
    const url = new URL(this.baseUrl + resolved);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v === undefined || v === null) continue;
        if (Array.isArray(v)) for (const item of v) url.searchParams.append(k, String(item));
        else url.searchParams.set(k, String(v));
      }
    }
    return url.toString();
  }

  private buildHeaders(perRequest?: Record<string, string | undefined>, hasBody = false): Headers {
    const headers = new Headers(this.defaultHeaders);
    headers.set("User-Agent", this.userAgent);
    headers.set("Accept", "application/json");
    if (hasBody) headers.set("Content-Type", "application/json");
    // The API key authenticates via the Authorization header — the backend
    // resolves a Nebula API key (or, for internal callers, a JWT) from the
    // same bearer credential.
    if (this.apiKey) headers.set("Authorization", `Bearer ${this.apiKey}`);
    if (perRequest) {
      for (const [k, v] of Object.entries(perRequest)) {
        if (v !== undefined) headers.set(k, v);
      }
    }
    return headers;
  }

  async request<T>(args: RequestArgs): Promise<T> {
    const timeoutMs = args.timeoutMs ?? this.timeoutMs;
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      throw new RangeError("timeoutMs must be a positive finite number");
    }
    const deadline = monotonicNow() + timeoutMs;
    validateUtf8ByteLimits(args);
    const url = this.buildUrl(args.path, args.pathParams, args.query);
    const hasBody = args.body !== undefined && args.body !== null;
    const routeHeaders = routingHeadersForRequest(args);
    const headers = this.buildHeaders(
      { ...routeHeaders, ...(args.headers ?? {}) },
      hasBody
    );
    // Spread caller-supplied fetch options first so the runtime-owned
    // method/headers/body always win on key collision. The TS type for
    // `fetchOptions` already excludes those keys, so this is belt-and-
    // suspenders.
    const init: RequestInit = {
      ...this.fetchOptions,
      method: args.method,
      headers: [...headers.entries()],
      body: hasBody ? JSON.stringify(args.body) : undefined,
    };

    const maxAttempts = (args.retryable ?? false) ? this.retry.maxRetries + 1 : 1;
    let lastError: unknown;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      throwIfCallerAborted(args.signal);
      const remaining = deadline - monotonicNow();
      if (remaining <= 0) throw invocationTimeout(timeoutMs);
      const controller = new AbortController();
      let timedOut = false;
      const timeoutHandle = setTimeout(() => {
        timedOut = true;
        controller.abort(new DOMException("Invocation deadline exceeded", "AbortError"));
      }, remaining);
      const { signal: composedSignal, dispose: disposeAbort } = composeAbort(
        controller.signal,
        args.signal
      );
      try {
        const response = await raceWithSignal(
          this.fetchImpl(url, { ...init, signal: composedSignal }),
          composedSignal,
        );

        if (response.ok) {
          if (response.status === 204) return undefined as T;
          return (await raceWithSignal(response.json(), composedSignal)) as T;
        }

        // A body-stream reset is a transport failure. Let it reach the retry
        // path instead of converting it into an empty API error response.
        const text = await raceWithSignal(response.text(), composedSignal);
        const parsed = safeParseJSON(text);
        const retryAfter = parseRetryAfter(response.headers.get("Retry-After"));
        const err = errorFromResponse(
          {
            status: response.status,
            requestId: response.headers.get("X-Request-Id") ?? undefined,
            body: parsed ?? text,
          },
          retryAfter
        );

        if (isRetryableStatus(response.status) && attempt + 1 < maxAttempts) {
          await sleepWithinDeadline(
            backoffMs(attempt, this.retry, retryAfter),
            deadline,
            timeoutMs,
            args.signal,
          );
          lastError = err;
          continue;
        }
        throw err;
      } catch (rawError) {
        if (args.signal?.aborted) {
          throw args.signal.reason ?? rawError;
        }
        if (timedOut || monotonicNow() >= deadline) {
          throw invocationTimeout(timeoutMs, rawError);
        }
        if (rawError instanceof NebulaTimeoutError) throw rawError;
        if (rawError instanceof NebulaAPIError) throw rawError;
        if (attempt + 1 < maxAttempts) {
          await sleepWithinDeadline(
            backoffMs(attempt, this.retry),
            deadline,
            timeoutMs,
            args.signal,
          );
          lastError = rawError;
          continue;
        }
        if (rawError instanceof NebulaConnectionError) throw rawError;
        if (rawError instanceof Error) {
          throw new NebulaConnectionError(rawError.message, { cause: rawError });
        }
        throw rawError;
      } finally {
        clearTimeout(timeoutHandle);
        disposeAbort();
      }
    }
    throw lastError ?? new NebulaConnectionError("retry budget exhausted");
  }
}

function raceWithSignal<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) {
    // The operation may have synchronously aborted the signal immediately
    // before returning a rejected promise. Observe that rejection so the
    // caller receives the cancellation reason without an unhandled sibling.
    void promise.catch(() => undefined);
    return Promise.reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
  }
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
  });
}

function monotonicNow(): number {
  return globalThis.performance.now();
}

function invocationTimeout(timeoutMs: number, cause?: unknown): NebulaTimeoutError {
  return new NebulaTimeoutError(
    `Invocation timed out after ${timeoutMs}ms`,
    cause === undefined ? undefined : { cause },
  );
}

function throwIfCallerAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw signal.reason ?? new DOMException("Aborted", "AbortError");
}

async function sleepWithinDeadline(
  delayMs: number,
  deadline: number,
  timeoutMs: number,
  signal?: AbortSignal,
): Promise<void> {
  throwIfCallerAborted(signal);
  const remaining = deadline - monotonicNow();
  if (delayMs >= remaining) throw invocationTimeout(timeoutMs);
  await sleep(delayMs, signal);
  if (monotonicNow() >= deadline) throw invocationTimeout(timeoutMs);
}

function composeAbort(
  timeoutSignal: AbortSignal,
  userSignal?: AbortSignal
): { signal: AbortSignal; dispose: () => void } {
  if (!userSignal) return { signal: timeoutSignal, dispose: () => {} };
  const controller = new AbortController();
  // Hold one listener per source so dispose can detach exactly what we added.
  // Caller's signal can outlive the request (e.g. a long-lived request-scope
  // controller reused across many SDK calls); without dispose, each call's
  // closures would stay pinned on it until that signal eventually aborts.
  const onTimeoutAbort = () =>
    controller.abort(timeoutSignal.reason ?? new Error("aborted"));
  const onUserAbort = () =>
    controller.abort(userSignal.reason ?? new Error("aborted"));
  if (timeoutSignal.aborted) controller.abort(timeoutSignal.reason);
  if (userSignal.aborted) controller.abort(userSignal.reason);
  timeoutSignal.addEventListener("abort", onTimeoutAbort, { once: true });
  userSignal.addEventListener("abort", onUserAbort, { once: true });
  const dispose = () => {
    timeoutSignal.removeEventListener("abort", onTimeoutAbort);
    userSignal.removeEventListener("abort", onUserAbort);
  };
  return { signal: controller.signal, dispose };
}

function safeParseJSON(text: string): unknown {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function filterNullishHeaders(
  headers: Record<string, string> | undefined
): Record<string, string> {
  if (!headers) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    // Accept anything that survives the truthy guard; the type is
    // `Record<string, string>` but callers occasionally cast with
    // `as any` to slip nulls through.
    if (v !== null && v !== undefined) out[k] = v;
  }
  return out;
}

function validateUtf8ByteLimits(args: RequestArgs): void {
  for (const limit of args.utf8ByteLimits ?? []) {
    const root = limit.source === "body" ? args.body : args.headers;
    validateUtf8Path(root, limit.path, limit.maximum, limit.path.join("."));
  }
}

function validateUtf8Path(
  value: unknown,
  path: ReadonlyArray<string>,
  maximum: number,
  label: string,
): void {
  if (path.length === 0) {
    if (typeof value !== "string") return;
    if (new TextEncoder().encode(value).length > maximum) {
      throw new RangeError(`${label} must be at most ${maximum} UTF-8 bytes`);
    }
    return;
  }
  const [head, ...tail] = path;
  if (head === "*") {
    if (Array.isArray(value)) {
      for (const item of value) validateUtf8Path(item, tail, maximum, label);
    }
    return;
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) return;
  validateUtf8Path(
    (value as Record<string, unknown>)[head],
    tail,
    maximum,
    label,
  );
}

function routingHeadersForRequest(args: RequestArgs): Record<string, string> {
  if (!args.routing) return {};
  const routeId =
    stringField(objectBody(args.body), ...(args.routing.bodyFields ?? []))
    ?? stringField(args.query, ...(args.routing.queryFields ?? []))
    ?? stringField(args.pathParams, ...(args.routing.pathFields ?? []));
  return routeId ? { "X-Nebula-Owner-Key": `${args.routing.owner}:${routeId}` } : {};
}

function objectBody(body: unknown): Record<string, unknown> | undefined {
  if (!body || typeof body !== "object" || Array.isArray(body)) return undefined;
  return body as Record<string, unknown>;
}

function stringField(
  body: Record<string, unknown> | undefined,
  ...names: string[]
): string | undefined {
  if (!body) return undefined;
  for (const name of names) {
    const routeId = routeIdValue(nestedField(body, name));
    if (routeId) return routeId;
  }
  return undefined;
}

function nestedField(body: Record<string, unknown>, path: string): unknown {
  let current: unknown = body;
  for (const part of path.split(".")) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function routeIdValue(value: unknown): string | undefined {
  if (typeof value === "string" && value.length > 0) return value;
  if (
    Array.isArray(value) &&
    value.length === 1 &&
    typeof value[0] === "string" &&
    value[0].length > 0
  ) {
    return value[0];
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    if ("$eq" in record) return routeIdValue(record["$eq"]);
    for (const op of ["$in", "$overlap"]) {
      if (op in record) return routeIdValue(record[op]);
    }
  }
  return undefined;
}

function parseRetryAfter(header: string | null): number | undefined {
  if (!header) return undefined;
  const value = header.trim();
  if (/^\d+$/.test(value)) {
    const asNumber = Number(value);
    return Number.isSafeInteger(asNumber) ? asNumber : undefined;
  }
  const asDate = Date.parse(value);
  if (Number.isFinite(asDate)) return Math.max(0, (asDate - Date.now()) / 1000);
  return undefined;
}
