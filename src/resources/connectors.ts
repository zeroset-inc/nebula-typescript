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
   * List Slack channels for a connection
   */
  listChannels(connectionID: string, options?: RequestOptions): APIPromise<ConnectorListChannelsResponse> {
    return this._client.get(path`/v1/connectors/${connectionID}/channels`, options);
  }

  /**
   * Browse Google Drive folders and files for a connection
   */
  listContents(
    connectionID: string,
    query: ConnectorListContentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectorListContentsResponse> {
    return this._client.get(path`/v1/connectors/${connectionID}/contents`, { query, ...options });
  }

  /**
   * Browse Google Drive folders for a connection
   */
  listFolders(
    connectionID: string,
    query: ConnectorListFoldersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectorListFoldersResponse> {
    return this._client.get(path`/v1/connectors/${connectionID}/folders`, { query, ...options });
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

  /**
   * Update connection config (e.g. folder selection)
   */
  updateConfig(
    connectionID: string,
    body: ConnectorUpdateConfigParams,
    options?: RequestOptions,
  ): APIPromise<ConnectorUpdateConfigResponse> {
    return this._client.patch(path`/v1/connectors/${connectionID}/config`, { body, ...options });
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

export interface ConnectorListChannelsResponse {
  results: Array<ConnectorListChannelsResponse.Result>;
}

export namespace ConnectorListChannelsResponse {
  export interface Result {
    id: string;

    name: string;

    is_private?: boolean;

    is_selected?: boolean;

    num_members?: number;
  }
}

export interface ConnectorListContentsResponse {
  results: Array<ConnectorListContentsResponse.Result>;
}

export namespace ConnectorListContentsResponse {
  export interface Result {
    id: string;

    has_children: boolean;

    mime_type: string;

    name: string;

    type: 'folder' | 'file';

    is_selected?: boolean;
  }
}

export interface ConnectorListFoldersResponse {
  results: Array<ConnectorListFoldersResponse.Result>;
}

export namespace ConnectorListFoldersResponse {
  export interface Result {
    id: string;

    has_children: boolean;

    name: string;

    is_selected?: boolean;
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

export interface ConnectorUpdateConfigResponse {
  results: ConnectorUpdateConfigResponse.Results;
}

export namespace ConnectorUpdateConfigResponse {
  export interface Results {
    message: string;

    status: 'active';
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

export interface ConnectorListContentsParams {
  parent_id?: string | null;
}

export interface ConnectorListFoldersParams {
  parent_id?: string | null;
}

export interface ConnectorUpdateConfigParams {
  config: { [key: string]: unknown };

  apply?: 'full_resync';
}

export declare namespace Connectors {
  export {
    type ConnectorRetrieveResponse as ConnectorRetrieveResponse,
    type ConnectorListResponse as ConnectorListResponse,
    type ConnectorConnectResponse as ConnectorConnectResponse,
    type ConnectorDisconnectResponse as ConnectorDisconnectResponse,
    type ConnectorListChannelsResponse as ConnectorListChannelsResponse,
    type ConnectorListContentsResponse as ConnectorListContentsResponse,
    type ConnectorListFoldersResponse as ConnectorListFoldersResponse,
    type ConnectorListProvidersResponse as ConnectorListProvidersResponse,
    type ConnectorSyncResponse as ConnectorSyncResponse,
    type ConnectorUpdateConfigResponse as ConnectorUpdateConfigResponse,
    type ConnectorListParams as ConnectorListParams,
    type ConnectorConnectParams as ConnectorConnectParams,
    type ConnectorDisconnectParams as ConnectorDisconnectParams,
    type ConnectorListContentsParams as ConnectorListContentsParams,
    type ConnectorListFoldersParams as ConnectorListFoldersParams,
    type ConnectorUpdateConfigParams as ConnectorUpdateConfigParams,
  };
}
