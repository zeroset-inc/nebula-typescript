// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Tokens extends APIResource {
  /**
   * Get current month's token usage and limits for the authenticated user.
   *
   * Returns: dict: Usage data including: - usage: Current month's ingestion,
   * retrieval, and total tokens used - limits: Token limits from user's plan -
   * remaining: Tokens remaining this month - percentage_used: Percentage of limit
   * consumed
   */
  retrieveCurrentMonth(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/usage/tokens', options);
  }

  /**
   * Get historical monthly token usage for the authenticated user.
   *
   * Args: months: Number of months of history to retrieve (default: 6, max: 12)
   *
   * Returns: dict: Historical usage data with monthly breakdown
   */
  retrieveHistory(
    query: TokenRetrieveHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/v1/usage/tokens/history', { query, ...options });
  }
}

export type TokenRetrieveCurrentMonthResponse = unknown;

export type TokenRetrieveHistoryResponse = unknown;

export interface TokenRetrieveHistoryParams {
  months?: number;
}

export declare namespace Tokens {
  export {
    type TokenRetrieveCurrentMonthResponse as TokenRetrieveCurrentMonthResponse,
    type TokenRetrieveHistoryResponse as TokenRetrieveHistoryResponse,
    type TokenRetrieveHistoryParams as TokenRetrieveHistoryParams,
  };
}
