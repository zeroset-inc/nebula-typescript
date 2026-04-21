// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SchedulerAPI from './scheduler';
import { Scheduler, SchedulerStartResponse, SchedulerStopResponse } from './scheduler';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Secrets extends APIResource {
  scheduler: SchedulerAPI.Scheduler = new SchedulerAPI.Scheduler(this._client);

  /**
   * Initialize a new webhook secret if none exists
   */
  initialize(
    params: SecretInitializeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SecretInitializeResponse> {
    const { secret_key } = params ?? {};
    return this._client.post('/v1/secrets/initialize', { query: { secret_key }, ...options });
  }

  /**
   * Get rotation history for audit purposes
   */
  retrieveHistory(
    query: SecretRetrieveHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SecretRetrieveHistoryResponse> {
    return this._client.get('/v1/secrets/history', { query, ...options });
  }

  /**
   * Get current rotation status and configuration
   */
  retrieveStatus(
    query: SecretRetrieveStatusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SecretRetrieveStatusResponse> {
    return this._client.get('/v1/secrets/status', { query, ...options });
  }

  /**
   * Manually trigger secret rotation. Requires admin privileges.
   */
  rotate(body: SecretRotateParams, options?: RequestOptions): APIPromise<SecretRotateResponse> {
    return this._client.post('/v1/secrets/rotate', { body, ...options });
  }

  /**
   * Update rotation configuration for a secret
   */
  updateConfig(
    params: SecretUpdateConfigParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SecretUpdateConfigResponse> {
    const { auto_rotation_enabled, rotation_interval_days, secret_key } = params ?? {};
    return this._client.put('/v1/secrets/config', {
      query: { auto_rotation_enabled, rotation_interval_days, secret_key },
      ...options,
    });
  }
}

export type SecretInitializeResponse = { [key: string]: unknown };

/**
 * Response model for rotation history
 */
export interface SecretRetrieveHistoryResponse {
  history: Array<{ [key: string]: unknown }>;

  total_rotations: number;
}

export type SecretRetrieveStatusResponse = { [key: string]: unknown };

/**
 * Response model for secret rotation
 */
export interface SecretRotateResponse {
  message: string;

  success: boolean;

  next_rotation_at?: string | null;

  version?: number | null;
}

export type SecretUpdateConfigResponse = { [key: string]: unknown };

export interface SecretInitializeParams {
  secret_key?: string;
}

export interface SecretRetrieveHistoryParams {
  limit?: number;

  secret_key?: string;
}

export interface SecretRetrieveStatusParams {
  secret_key?: string;
}

export interface SecretRotateParams {
  notify_external?: boolean;

  reason?: string;

  secret_key?: string;
}

export interface SecretUpdateConfigParams {
  auto_rotation_enabled?: boolean | null;

  rotation_interval_days?: number | null;

  secret_key?: string;
}

Secrets.Scheduler = Scheduler;

export declare namespace Secrets {
  export {
    type SecretInitializeResponse as SecretInitializeResponse,
    type SecretRetrieveHistoryResponse as SecretRetrieveHistoryResponse,
    type SecretRetrieveStatusResponse as SecretRetrieveStatusResponse,
    type SecretRotateResponse as SecretRotateResponse,
    type SecretUpdateConfigResponse as SecretUpdateConfigResponse,
    type SecretInitializeParams as SecretInitializeParams,
    type SecretRetrieveHistoryParams as SecretRetrieveHistoryParams,
    type SecretRetrieveStatusParams as SecretRetrieveStatusParams,
    type SecretRotateParams as SecretRotateParams,
    type SecretUpdateConfigParams as SecretUpdateConfigParams,
  };

  export {
    Scheduler as Scheduler,
    type SchedulerStartResponse as SchedulerStartResponse,
    type SchedulerStopResponse as SchedulerStopResponse,
  };
}
