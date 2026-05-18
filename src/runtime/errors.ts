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

export interface APIErrorPayload {
  readonly status: number;
  readonly requestId?: string;
  readonly body: unknown;
}

export class NebulaAPIError extends NebulaError {
  override readonly name: string = "NebulaAPIError";
  readonly status: number;
  readonly requestId?: string;
  readonly body: unknown;

  constructor(payload: APIErrorPayload, message?: string) {
    super(message ?? `Nebula API error (status ${payload.status})`);
    this.status = payload.status;
    this.requestId = payload.requestId;
    this.body = payload.body;
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
