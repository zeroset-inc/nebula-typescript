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
export interface ErrorEnvelope {
  readonly type: string;
  readonly message: string;
  readonly code?: string;
  readonly request_id?: string;
  readonly details?: Record<string, unknown> | null;
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
  readonly details?: Record<string, unknown> | null;

  constructor(payload: APIErrorPayload, message?: string) {
    const envelope = isEnvelope(payload.body) ? payload.body : undefined;
    super(
      message ??
        envelope?.message ??
        `Nebula API error (status ${payload.status})`
    );
    this.status = payload.status;
    // Prefer the envelope's request_id (server-stamped) over the header
    // we captured at the transport — they should match, but if they
    // diverge the envelope is authoritative.
    this.requestId = envelope?.request_id ?? payload.requestId;
    this.body = payload.body;
    this.type = envelope?.type;
    this.code = envelope?.code;
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
