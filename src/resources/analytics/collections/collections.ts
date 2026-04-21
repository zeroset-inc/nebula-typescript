// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CentralityAPI from './centrality';
import {
  Centrality,
  CentralityComputeParams,
  CentralityComputeResponse,
  CentralityStatusResponse,
} from './centrality';

export class Collections extends APIResource {
  centrality: CentralityAPI.Centrality = new CentralityAPI.Centrality(this._client);
}

Collections.Centrality = Centrality;

export declare namespace Collections {
  export {
    Centrality as Centrality,
    type CentralityComputeResponse as CentralityComputeResponse,
    type CentralityStatusResponse as CentralityStatusResponse,
    type CentralityComputeParams as CentralityComputeParams,
  };
}
