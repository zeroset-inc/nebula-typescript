// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class System extends APIResource {
  /**
   * App Settings
   */
  retrieveSettings(options?: RequestOptions): APIPromise<SystemRetrieveSettingsResponse> {
    return this._client.get('/v1/system/settings', options);
  }

  /**
   * Server Stats
   */
  retrieveStatus(options?: RequestOptions): APIPromise<SystemRetrieveStatusResponse> {
    return this._client.get('/v1/system/status', options);
  }
}

export interface SystemRetrieveSettingsResponse {
  results: SystemRetrieveSettingsResponse.Results;
}

export namespace SystemRetrieveSettingsResponse {
  export interface Results {
    config: { [key: string]: unknown };

    nebula_project_name: string;

    prompts: { [key: string]: unknown };
  }
}

export interface SystemRetrieveStatusResponse {
  results: SystemRetrieveStatusResponse.Results;
}

export namespace SystemRetrieveStatusResponse {
  export interface Results {
    cpu_usage: number;

    memory_usage: number;

    start_time: string;

    uptime_seconds: number;
  }
}

export declare namespace System {
  export {
    type SystemRetrieveSettingsResponse as SystemRetrieveSettingsResponse,
    type SystemRetrieveStatusResponse as SystemRetrieveStatusResponse,
  };
}
