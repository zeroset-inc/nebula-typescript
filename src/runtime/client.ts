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
  bearerToken?: string;
  defaultHeaders?: Record<string, string>;
  fetchImpl?: typeof fetch;
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
  headers?: Record<string, string>;
  idempotent?: boolean;
  signal?: AbortSignal;
}

const DEFAULT_BASE_URL = "https://api.trynebula.ai";
const DEFAULT_TIMEOUT_MS = 60_000;

export class NebulaCore {
  readonly baseUrl: string;
  readonly apiKey?: string;
  readonly bearerToken?: string;
  readonly defaultHeaders: Record<string, string>;
  readonly fetchImpl: typeof fetch;
  readonly timeoutMs: number;
  readonly retry: RetryPolicy;
  readonly userAgent: string;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.apiKey = options.apiKey;
    this.bearerToken = options.bearerToken;
    this.defaultHeaders = options.defaultHeaders ?? {};
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
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

  private buildHeaders(perRequest?: Record<string, string>, hasBody = false): Headers {
    const headers = new Headers(this.defaultHeaders);
    headers.set("User-Agent", this.userAgent);
    headers.set("Accept", "application/json");
    if (hasBody) headers.set("Content-Type", "application/json");
    if (this.apiKey) headers.set("X-API-Key", this.apiKey);
    if (this.bearerToken) headers.set("Authorization", `Bearer ${this.bearerToken}`);
    if (perRequest) {
      for (const [k, v] of Object.entries(perRequest)) headers.set(k, v);
    }
    return headers;
  }

  async request<T>(args: RequestArgs): Promise<T> {
    const url = this.buildUrl(args.path, args.pathParams, args.query);
    const hasBody = args.body !== undefined && args.body !== null;
    const headers = this.buildHeaders(args.headers, hasBody);
    const init: RequestInit = {
      method: args.method,
      headers,
      body: hasBody ? JSON.stringify(args.body) : undefined,
    };

    const maxAttempts = (args.idempotent ?? false) ? this.retry.maxRetries + 1 : 1;
    let lastError: unknown;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const controller = new AbortController();
      const timeoutHandle = setTimeout(() => controller.abort(new Error("timeout")), this.timeoutMs);
      const { signal: composedSignal, dispose: disposeAbort } = composeAbort(
        controller.signal,
        args.signal
      );
      try {
        const response = await this.fetchImpl(url, { ...init, signal: composedSignal });

        if (response.ok) {
          if (response.status === 204) return undefined as T;
          return (await response.json()) as T;
        }

        const text = await safeReadText(response);
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
          await sleep(backoffMs(attempt, this.retry, retryAfter), args.signal);
          lastError = err;
          continue;
        }
        throw err;
      } catch (rawError) {
        if (rawError instanceof Error && rawError.name === "AbortError") {
          if (args.signal?.aborted) throw rawError;
          throw new NebulaTimeoutError(`Request timed out after ${this.timeoutMs}ms`, { cause: rawError });
        }
        if (rawError instanceof NebulaAPIError || rawError instanceof NebulaConnectionError) {
          throw rawError;
        }
        if (attempt + 1 < maxAttempts) {
          await sleep(backoffMs(attempt, this.retry), args.signal);
          lastError = rawError;
          continue;
        }
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

async function safeReadText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

function safeParseJSON(text: string): unknown {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function parseRetryAfter(header: string | null): number | undefined {
  if (!header) return undefined;
  const asNumber = Number.parseFloat(header);
  if (Number.isFinite(asNumber)) return asNumber;
  const asDate = Date.parse(header);
  if (Number.isFinite(asDate)) return Math.max(0, (asDate - Date.now()) / 1000);
  return undefined;
}
