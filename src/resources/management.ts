// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Management extends APIResource {
  /**
   * Sync subscription from Stripe webhook with enhanced security. Supports HMAC
   * signature verification, IP allowlisting, and idempotency.
   */
  syncSubscription(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/management/sync-subscription', options);
  }
}

export type ManagementSyncSubscriptionResponse = unknown;

export declare namespace Management {
  export { type ManagementSyncSubscriptionResponse as ManagementSyncSubscriptionResponse };
}
