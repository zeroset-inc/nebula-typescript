export class NebulaError extends Error {
  override readonly name: string = "NebulaError";
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
  }
}

export class NebulaConnectionError extends NebulaError {
  override readonly name = "NebulaConnectionError";
}

export class NebulaTimeoutError extends NebulaError {
  override readonly name = "NebulaTimeoutError";
}

// Canonical Error envelope returned by every Nebula 4xx/5xx. The runtime
// pulls these fields out of the response body and surfaces them as typed
// accessors on NebulaAPIError so callers can branch on err.code without
// digging into err.body.
//
// The optional fields are typed as `T | null` because the wire schema is
// `anyOf [T, null]` — the server emits the keys with explicit `null` rather
// than omitting them. The NebulaAPIError constructor coerces `null` to
// `undefined` so the public accessor surface stays `T | undefined`.
export interface ErrorEnvelope {
  readonly type: string;
  readonly message: string;
  readonly code?: string | null;
  readonly request_id?: string | null;
  // `details` is intentionally `unknown`: the server emits arbitrary
  // JSON here. For validation errors it's an array of {loc, msg, type}
  // entries; for other classes it can be an object or null. Callers
  // should narrow at the read site (e.g. `Array.isArray(err.details)`).
  readonly details?: unknown;
}

export interface APIErrorPayload {
  readonly status: number;
  readonly requestId?: string;
  readonly body: unknown;
}

function isEnvelope(body: unknown): body is ErrorEnvelope {
  return (
    typeof body === "object" &&
    body !== null &&
    typeof (body as { type?: unknown }).type === "string" &&
    typeof (body as { message?: unknown }).message === "string"
  );
}

export class NebulaAPIError extends NebulaError {
  override readonly name: string = "NebulaAPIError";
  readonly status: number;
  readonly requestId?: string;
  readonly body: unknown;
  // Canonical envelope fields. `type` is always present when the server
  // returned the documented envelope; the rest are present when the server
  // populated them. All four are undefined when the response body wasn't
  // an envelope (e.g. an HTML error page from a misconfigured proxy).
  readonly type?: string;
  readonly code?: string;
  readonly details?: unknown;

  constructor(payload: APIErrorPayload, message?: string) {
    const envelope = isEnvelope(payload.body) ? payload.body : undefined;
    super(
      message ??
        envelope?.message ??
        `Nebula API error (status ${payload.status})`
    );
    this.status = payload.status;
    // Coerce `null` (wire-level) to `undefined` (idiomatic JS absence) so
    // every accessor's runtime value matches its declared T | undefined.
    const envCode =
      typeof envelope?.code === "string" ? envelope.code : undefined;
    const envRid =
      typeof envelope?.request_id === "string"
        ? envelope.request_id
        : undefined;
    // Prefer the envelope's request_id (server-stamped) over the header
    // we captured at the transport — they should match, but if they
    // diverge the envelope is authoritative.
    this.requestId = envRid ?? payload.requestId;
    this.body = payload.body;
    this.type = envelope?.type;
    this.code = envCode;
    this.details = envelope?.details ?? undefined;
  }
}

export class NebulaBadRequestError extends NebulaAPIError {
  override readonly name = "NebulaBadRequestError";
}
export class NebulaUnauthorizedError extends NebulaAPIError {
  override readonly name = "NebulaUnauthorizedError";
}
export class NebulaForbiddenError extends NebulaAPIError {
  override readonly name = "NebulaForbiddenError";
}
export class NebulaNotFoundError extends NebulaAPIError {
  override readonly name = "NebulaNotFoundError";
}
export class NebulaConflictError extends NebulaAPIError {
  override readonly name = "NebulaConflictError";
}
export class NebulaValidationError extends NebulaAPIError {
  override readonly name = "NebulaValidationError";
}
export class NebulaRateLimitError extends NebulaAPIError {
  override readonly name = "NebulaRateLimitError";
  readonly retryAfter?: number;
  constructor(payload: APIErrorPayload, retryAfter?: number) {
    super(payload);
    this.retryAfter = retryAfter;
  }
}
export class NebulaServerError extends NebulaAPIError {
  override readonly name = "NebulaServerError";
}

type APIErrorCtor = new (payload: APIErrorPayload) => NebulaAPIError;

const STATUS_TO_CLASS: Record<number, APIErrorCtor> = {
  400: NebulaBadRequestError,
  401: NebulaUnauthorizedError,
  403: NebulaForbiddenError,
  404: NebulaNotFoundError,
  409: NebulaConflictError,
  422: NebulaValidationError,
};

export function errorFromResponse(payload: APIErrorPayload, retryAfter?: number): NebulaAPIError {
  if (payload.status === 429) return new NebulaRateLimitError(payload, retryAfter);
  const cls = STATUS_TO_CLASS[payload.status];
  if (cls) return new cls(payload);
  if (payload.status >= 500) return new NebulaServerError(payload);
  return new NebulaAPIError(payload);
}
