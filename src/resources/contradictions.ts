// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Contradictions extends APIResource {
  /**
   * Return IDs invalidated via cascading dependency logic and expire them.
   */
  cascadeInvalidation(
    relationshipID: string,
    params: ContradictionCascadeInvalidationParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { max_depth, min_confidence_threshold } = params ?? {};
    return this._client.post(path`/v1/contradictions/${relationshipID}/cascade`, {
      query: { max_depth, min_confidence_threshold },
      ...options,
    });
  }
}

export type ContradictionCascadeInvalidationResponse = unknown;

export interface ContradictionCascadeInvalidationParams {
  max_depth?: number;

  min_confidence_threshold?: number;
}

export declare namespace Contradictions {
  export {
    type ContradictionCascadeInvalidationResponse as ContradictionCascadeInvalidationResponse,
    type ContradictionCascadeInvalidationParams as ContradictionCascadeInvalidationParams,
  };
}
