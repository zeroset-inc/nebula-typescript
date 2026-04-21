// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Entities extends APIResource {
  /**
   * Manually resolve duplicate relationships.
   */
  resolveDuplicate(
    entityID: string,
    params: EntityResolveDuplicateParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { public: _public, ...body } = params;
    return this._client.post(path`/v1/entities/${entityID}/resolve-duplicate`, {
      query: { public: _public },
      body,
      ...options,
    });
  }

  /**
   * Get duplicate information for a specific entity.
   */
  retrieveDuplicates(
    entityID: string,
    query: EntityRetrieveDuplicatesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v1/entities/${entityID}/duplicates`, { query, ...options });
  }
}

export type EntityResolveDuplicateResponse = unknown;

export type EntityRetrieveDuplicatesResponse = unknown;

export interface EntityResolveDuplicateParams {
  /**
   * Body param: Action to take: 'merge', 'unlink', 'change_canonical'
   */
  action: string;

  /**
   * Query param
   */
  public?: boolean;

  /**
   * Body param: Target entity ID for the action
   */
  target_entity_id?: string | null;
}

export interface EntityRetrieveDuplicatesParams {
  public?: boolean;
}

export declare namespace Entities {
  export {
    type EntityResolveDuplicateResponse as EntityResolveDuplicateResponse,
    type EntityRetrieveDuplicatesResponse as EntityRetrieveDuplicatesResponse,
    type EntityResolveDuplicateParams as EntityResolveDuplicateParams,
    type EntityRetrieveDuplicatesParams as EntityRetrieveDuplicatesParams,
  };
}
