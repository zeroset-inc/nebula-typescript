// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TemporalEvents extends APIResource {
  /**
   * Retrieve a single temporal-event by ID.
   */
  retrieve(eventID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/temporal-events/${eventID}`, options);
  }

  /**
   * Return temporal-event rows with basic filtering/pagination.
   */
  list(
    query: TemporalEventListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/v1/temporal-events/', { query, ...options });
  }
}

export type TemporalEventRetrieveResponse = unknown;

export type TemporalEventListResponse = unknown;

export interface TemporalEventListParams {
  /**
   * Filter by event_type
   */
  event_type?: string | null;

  limit?: number;

  offset?: number;

  /**
   * Filter events created after this timestamp (inclusive)
   */
  since?: string | null;

  /**
   * Filter by relationship UUID
   */
  target_relationship_id?: string | null;

  /**
   * Filter events created before this timestamp (inclusive)
   */
  until?: string | null;
}

export declare namespace TemporalEvents {
  export {
    type TemporalEventRetrieveResponse as TemporalEventRetrieveResponse,
    type TemporalEventListResponse as TemporalEventListResponse,
    type TemporalEventListParams as TemporalEventListParams,
  };
}
