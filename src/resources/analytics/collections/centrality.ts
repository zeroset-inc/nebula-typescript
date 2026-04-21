// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Centrality extends APIResource {
  /**
   * Compute and store centrality for a collection
   */
  compute(
    collectionID: string,
    params: CentralityComputeParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<CentralityComputeResponse> {
    const { body } = params ?? {};
    return this._client.post(path`/v1/analytics/collections/${collectionID}/centrality/compute`, {
      body: body,
      ...options,
    });
  }

  /**
   * Get centrality computation status for a collection
   */
  status(collectionID: string, options?: RequestOptions): APIPromise<CentralityStatusResponse> {
    return this._client.get(path`/v1/analytics/collections/${collectionID}/centrality/status`, options);
  }
}

export type CentralityComputeResponse = { [key: string]: unknown };

export type CentralityStatusResponse = { [key: string]: unknown };

export interface CentralityComputeParams {
  /**
   * If true, returns immediately and runs computation in background (not yet
   * implemented)
   */
  body?: boolean | null;
}

export declare namespace Centrality {
  export {
    type CentralityComputeResponse as CentralityComputeResponse,
    type CentralityStatusResponse as CentralityStatusResponse,
    type CentralityComputeParams as CentralityComputeParams,
  };
}
