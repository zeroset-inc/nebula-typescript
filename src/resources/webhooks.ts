// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Webhooks extends APIResource {
  /**
   * Get statistics about webhook events for monitoring dashboard.
   */
  getStats(options?: RequestOptions): APIPromise<WebhookGetStatsResponse> {
    return this._client.get('/v1/webhooks/stats', options);
  }

  /**
   * Get recent webhook events for monitoring.
   *
   * Args: webhook_type: Filter by webhook type (e.g., 'subscription_sync')
   * processing_status: Filter by status ('processed', 'failed', 'retry') limit:
   * Maximum number of events to return (default 100)
   */
  listEvents(
    query: WebhookListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListEventsResponse> {
    return this._client.get('/v1/webhooks/events', { query, ...options });
  }

  /**
   * Schedule periodic cleanup of webhook events using cron expression.
   *
   * Args: cron_expression: Cron expression for scheduling (default: daily at
   * midnight) retention_days: Delete events older than this many days (default 90)
   *
   * Common cron expressions: - "0 0 \* \* _" - Daily at midnight - "0 _/6 \* \* _" -
   * Every 6 hours - "0 0 _ _ 0" - Weekly on Sunday at midnight - "0 0 1 _ \*" -
   * Monthly on the 1st at midnight
   */
  scheduleCleanup(
    params: WebhookScheduleCleanupParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookScheduleCleanupResponse> {
    const { cron_expression, retention_days } = params ?? {};
    return this._client.post('/v1/webhooks/schedule-cleanup', {
      query: { cron_expression, retention_days },
      ...options,
    });
  }

  /**
   * Trigger Hatchet workflow to clean up old webhook events.
   *
   * Args: days: Delete events older than this many days (default 90)
   */
  triggerCleanup(
    params: WebhookTriggerCleanupParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookTriggerCleanupResponse> {
    const { days } = params ?? {};
    return this._client.post('/v1/webhooks/cleanup', { query: { days }, ...options });
  }
}

/**
 * Response model for webhook event statistics
 */
export interface WebhookGetStatsResponse {
  earliest_event: string | null;

  failed_count: number;

  latest_event: string | null;

  processed_count: number;

  success_rate: number;

  total_events: number;

  unique_types: number;

  verified_count: number;
}

/**
 * Response model for webhook events list
 */
export interface WebhookListEventsResponse {
  events: Array<{ [key: string]: unknown }>;

  total_count: number;
}

export type WebhookScheduleCleanupResponse = { [key: string]: unknown };

export type WebhookTriggerCleanupResponse = { [key: string]: unknown };

export interface WebhookListEventsParams {
  limit?: number;

  processing_status?: string | null;

  webhook_type?: string | null;
}

export interface WebhookScheduleCleanupParams {
  cron_expression?: string;

  retention_days?: number;
}

export interface WebhookTriggerCleanupParams {
  days?: number;
}

export declare namespace Webhooks {
  export {
    type WebhookGetStatsResponse as WebhookGetStatsResponse,
    type WebhookListEventsResponse as WebhookListEventsResponse,
    type WebhookScheduleCleanupResponse as WebhookScheduleCleanupResponse,
    type WebhookTriggerCleanupResponse as WebhookTriggerCleanupResponse,
    type WebhookListEventsParams as WebhookListEventsParams,
    type WebhookScheduleCleanupParams as WebhookScheduleCleanupParams,
    type WebhookTriggerCleanupParams as WebhookTriggerCleanupParams,
  };
}
