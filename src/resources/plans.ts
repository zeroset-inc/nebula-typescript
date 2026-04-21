// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Plans extends APIResource {
  /**
   * Get all available plans with their limits (public endpoint)
   */
  list(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/plans', options);
  }
}

export type PlanListResponse = unknown;

export declare namespace Plans {
  export { type PlanListResponse as PlanListResponse };
}
