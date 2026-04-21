// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Nebula } from '../client';

export abstract class APIResource {
  protected _client: Nebula;

  constructor(client: Nebula) {
    this._client = client;
  }
}
