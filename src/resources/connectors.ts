// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Connectors extends APIResource {
  /**
   * Get a single connection by ID
   */
  retrieve(connectionID: string, options?: RequestOptions): APIPromise<ConnectorRetrieveResponse> {
    return this._client.get(path`/v1/connectors/${connectionID}`, options);
  }

  /**
   * List active connections for a collection
   */
  list(query: ConnectorListParams, options?: RequestOptions): APIPromise<ConnectorListResponse> {
    return this._client.get('/v1/connectors', { query, ...options });
  }

  /**
   * Start OAuth connection flow
   */
  connect(
    provider: string,
    body: ConnectorConnectParams,
    options?: RequestOptions,
  ): APIPromise<ConnectorConnectResponse> {
    return this._client.post(path`/v1/connectors/${provider}/connect`, { body, ...options });
  }

  /**
   * Disconnect an external data source
   */
  disconnect(
    connectionID: string,
    params: ConnectorDisconnectParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectorDisconnectResponse> {
    const { delete_memories } = params ?? {};
    return this._client.delete(path`/v1/connectors/${connectionID}`, {
      query: { delete_memories },
      ...options,
    });
  }

  /**
   * List available connector providers
   */
  listProviders(options?: RequestOptions): APIPromise<ConnectorListProvidersResponse> {
    return this._client.get('/v1/connectors/providers', options);
  }

  /**
   * Manually trigger a sync
   */
  sync(connectionID: string, options?: RequestOptions): APIPromise<ConnectorSyncResponse> {
    return this._client.post(path`/v1/connectors/${connectionID}/sync`, options);
  }
}

export interface ConnectorRetrieveResponse {
  results: ConnectorRetrieveResponse.Results;
}

export namespace ConnectorRetrieveResponse {
  export interface Results {
    id: string;

    collection_id: string;

    created_at: string;

    provider: string;

    status: 'active' | 'pending' | 'revoked';

    updated_at: string;

    user_id: string;

    config?: { [key: string]: unknown } | null;

    error_detail?: Results.ErrorDetail | null;

    external_account_id?: string | null;

    health?: 'ok' | 'error' | null;

    items_synced?: number | null;

    last_error?: string | null;

    last_synced_at?: string | null;

    next_sync_at?: string | null;

    sync_cursor?: { [key: string]: unknown } | null;

    token_expires_at?: string | null;
  }

  export namespace Results {
    export interface ErrorDetail {
      message: string;

      retryable: boolean;
    }
  }
}

export interface ConnectorListResponse {
  results: Array<ConnectorListResponse.Result>;
}

export namespace ConnectorListResponse {
  export interface Result {
    id: string;

    collection_id: string;

    created_at: string;

    provider: string;

    status: 'active' | 'pending' | 'revoked';

    updated_at: string;

    user_id: string;

    config?: { [key: string]: unknown } | null;

    error_detail?: Result.ErrorDetail | null;

    external_account_id?: string | null;

    health?: 'ok' | 'error' | null;

    items_synced?: number | null;

    last_error?: string | null;

    last_synced_at?: string | null;

    next_sync_at?: string | null;

    sync_cursor?: { [key: string]: unknown } | null;

    token_expires_at?: string | null;
  }

  export namespace Result {
    export interface ErrorDetail {
      message: string;

      retryable: boolean;
    }
  }
}

export interface ConnectorConnectResponse {
  results: ConnectorConnectResponse.Results;
}

export namespace ConnectorConnectResponse {
  export interface Results {
    auth_url: string;

    state: string;
  }
}

export interface ConnectorDisconnectResponse {
  results: ConnectorDisconnectResponse.Results;
}

export namespace ConnectorDisconnectResponse {
  export interface Results {
    message: string;

    warnings?: Array<Results.Warning>;
  }

  export namespace Results {
    export interface Warning {
      code: string;

      message: string;
    }
  }
}

export interface ConnectorListProvidersResponse {
  results: Array<string>;
}

export interface ConnectorSyncResponse {
  results: ConnectorSyncResponse.Results;
}

export namespace ConnectorSyncResponse {
  export interface Results {
    message: string;
  }
}

export interface ConnectorListParams {
  collection_id: string;
}

export interface ConnectorConnectParams {
  collection_id: string;

  config?: { [key: string]: unknown } | null;
}

export interface ConnectorDisconnectParams {
  delete_memories?: boolean;
}

export declare namespace Connectors {
  export {
    type ConnectorRetrieveResponse as ConnectorRetrieveResponse,
    type ConnectorListResponse as ConnectorListResponse,
    type ConnectorConnectResponse as ConnectorConnectResponse,
    type ConnectorDisconnectResponse as ConnectorDisconnectResponse,
    type ConnectorListProvidersResponse as ConnectorListProvidersResponse,
    type ConnectorSyncResponse as ConnectorSyncResponse,
    type ConnectorListParams as ConnectorListParams,
    type ConnectorConnectParams as ConnectorConnectParams,
    type ConnectorDisconnectParams as ConnectorDisconnectParams,
  };
}
