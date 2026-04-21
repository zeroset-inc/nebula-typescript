// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Engrams extends APIResource {
  /**
   * Get duplicate detection statistics for an engram.
   */
  retrieveDuplicateStats(
    engramID: string,
    query: EngramRetrieveDuplicateStatsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v1/engrams/${engramID}/duplicate-stats`, { query, ...options });
  }
}

export type EngramRetrieveDuplicateStatsResponse = unknown;

export interface EngramRetrieveDuplicateStatsParams {
  public?: boolean;
}

export declare namespace Engrams {
  export {
    type EngramRetrieveDuplicateStatsResponse as EngramRetrieveDuplicateStatsResponse,
    type EngramRetrieveDuplicateStatsParams as EngramRetrieveDuplicateStatsParams,
  };
}
