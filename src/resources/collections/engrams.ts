// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as MetadataAPI from '../memories/metadata';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Engrams extends APIResource {
  /**
   * Get all engrams in a collection with pagination and sorting options.
   *
   * This endpoint retrieves a paginated list of engrams associated with a specific
   * collection. It supports sorting options to customize the order of returned
   * engrams.
   */
  list(
    id: string,
    query: EngramListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedNebulaResultListEngramResponse> {
    return this._client.get(path`/v1/collections/${id}/engrams`, { query, ...options });
  }

  /**
   * Add an engram to a collection.
   */
  add(
    engramID: string,
    params: EngramAddParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsGenericMessageResponse> {
    const { id } = params;
    return this._client.post(path`/v1/collections/${id}/engrams/${engramID}`, options);
  }

  /**
   * Remove an engram from a collection.
   *
   * This endpoint removes the association between an engram and a collection. It
   * does not delete the engram itself. The user must have permissions to modify the
   * collection.
   */
  remove(
    engramID: string,
    params: EngramRemoveParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { id } = params;
    return this._client.delete(path`/v1/collections/${id}/engrams/${engramID}`, options);
  }
}

export interface NebulaResultsGenericMessageResponse {
  results: NebulaResultsGenericMessageResponse.Results;
}

export namespace NebulaResultsGenericMessageResponse {
  export interface Results {
    message: string;

    id?: string | null;

    memory_id?: string | null;
  }
}

export interface PaginatedNebulaResultListEngramResponse {
  results: Array<MetadataAPI.EngramResponse>;

  total_entries: number;
}

export interface EngramListParams {
  /**
   * Specifies a limit on the number of objects to return, ranging between 1 and 100.
   * Defaults to 100.
   */
  limit?: number;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;
}

export interface EngramAddParams {
  id: string;
}

export interface EngramRemoveParams {
  /**
   * The unique identifier of the collection
   */
  id: string;
}

export declare namespace Engrams {
  export {
    type NebulaResultsGenericMessageResponse as NebulaResultsGenericMessageResponse,
    type PaginatedNebulaResultListEngramResponse as PaginatedNebulaResultListEngramResponse,
    type EngramListParams as EngramListParams,
    type EngramAddParams as EngramAddParams,
    type EngramRemoveParams as EngramRemoveParams,
  };
}
