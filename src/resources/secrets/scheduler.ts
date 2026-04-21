// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Scheduler extends APIResource {
  /**
   * Start the automatic rotation scheduler
   */
  start(options?: RequestOptions): APIPromise<SchedulerStartResponse> {
    return this._client.post('/v1/secrets/scheduler/start', options);
  }

  /**
   * Stop the automatic rotation scheduler
   */
  stop(options?: RequestOptions): APIPromise<SchedulerStopResponse> {
    return this._client.post('/v1/secrets/scheduler/stop', options);
  }
}

export type SchedulerStartResponse = { [key: string]: unknown };

export type SchedulerStopResponse = { [key: string]: unknown };

export declare namespace Scheduler {
  export {
    type SchedulerStartResponse as SchedulerStartResponse,
    type SchedulerStopResponse as SchedulerStopResponse,
  };
}
