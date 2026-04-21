// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class APIKeys extends APIResource {
  /**
   * Create a new API key for the specified user.
   *
   * Only superusers or the user themselves may create an API key.
   */
  create(
    id: string,
    body: APIKeyCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIKeyCreateResponse> {
    return this._client.post(path`/v1/users/${id}/api-keys`, { body, ...options });
  }

  /**
   * List all API keys for the specified user.
   *
   * Only superusers or the user themselves may list the API keys.
   */
  list(id: string, options?: RequestOptions): APIPromise<APIKeyListResponse> {
    return this._client.get(path`/v1/users/${id}/api-keys`, options);
  }

  /**
   * Delete a specific API key for the specified user.
   *
   * Only superusers or the user themselves may delete the API key.
   */
  delete(
    keyID: string,
    params: APIKeyDeleteParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { id } = params;
    return this._client.delete(path`/v1/users/${id}/api-keys/${keyID}`, options);
  }
}

export interface APIKeyCreateResponse {
  results: APIKeyCreateResponse.Results;
}

export namespace APIKeyCreateResponse {
  export interface Results {
    api_key: string;

    key_id: string;

    public_key: string;

    name?: string | null;
  }
}

export interface APIKeyListResponse {
  results: Array<APIKeyListResponse.Result>;

  total_entries: number;
}

export namespace APIKeyListResponse {
  export interface Result {
    key_id: string;

    public_key: string;

    updated_at: string;

    description?: string | null;

    name?: string | null;
  }
}

export interface APIKeyCreateParams {
  /**
   * Description of the API key
   */
  description?: string | null;

  /**
   * Name of the API key
   */
  name?: string | null;
}

export interface APIKeyDeleteParams {
  /**
   * ID of the user
   */
  id: string;
}

export declare namespace APIKeys {
  export {
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyDeleteParams as APIKeyDeleteParams,
  };
}
