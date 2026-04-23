// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface HealthResponse {
  results: HealthResponse.Results;
}

export namespace HealthResponse {
  export interface Results {
    message: string;

    id?: string | null;

    memory_id?: string | null;
  }
}

export declare namespace TopLevel {
  export { type HealthResponse as HealthResponse };
}
