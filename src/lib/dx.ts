// Handwritten Nebula DX layer.
//
// Carries only the methods that need real dispatch logic: positional
// connector helpers and auth normalization.
//
// For everything else, use the resource methods directly. Resource
// methods now return unwrapped values natively (the generator peels
// the `{results: X}` wire envelope), so there's no separate auto-
// generated unwrap layer to extend.
//
// Source of truth: nebula-sdks/custom/typescript/dx.ts
// The generator copies this file into sdks/typescript/src/lib/dx.ts on every
// `pnpm --dir nebula-sdks/generator run generate`. Edit the source, not the copy.

import { NebulaClient } from "../client.ts";
import {
  type ClientOptions,
  type components,
} from "../index.ts";

type Schemas = components["schemas"];
type ConnectorOAuthOptions = {
  clientId?: string;
  clientSecret?: string;
  mode?: "workspace";
};

const isConnectorOAuthOptions = (
  value: ConnectorOAuthOptions | { signal?: AbortSignal } | undefined
): value is ConnectorOAuthOptions =>
  !!value &&
  ("clientId" in value || "clientSecret" in value || "mode" in value);

export type CompatClientOptions = ClientOptions & {
  apiKey?: string | null;
  baseUrl?: string | null;
  // Legacy capital-U alias. Some internal callers, including the
  // local playground WebSocket server, still pass `baseURL`; without this
  // alias the value falls through unused and the runtime defaults to
  // api.zeroset.com.
  baseURL?: string | null;
  // Legacy alias for `timeoutMs`. Same compat reason.
  timeout?: number | null;
};

export class Nebula extends NebulaClient {
  constructor(options: CompatClientOptions = {}) {
    super(normalizeClientOptions(options));
  }

  /**
   * List memories scoped to one or more collection ids (string | string[])
   * or a full MemoryListParams object.
   */
  async listMemories(
    query: string | string[] | Record<string, unknown>,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    const normalized: Record<string, unknown> =
      typeof query === "string" || Array.isArray(query)
        ? { collectionIds: arrayify(query) }
        : query;
    return this.memory.list(normalized as never, options);
  }

  /**
   * Positional `connectProvider(provider, collectionID, config?, oauth?)` — wraps the
   * generated `connectors.connect({provider, body})` to build the body shape.
   */
  async connectProvider(
    provider: string,
    collectionID: string,
    config?: Record<string, unknown>,
    oauthOrOptions?: ConnectorOAuthOptions | { signal?: AbortSignal },
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    const hasOAuthOptions = isConnectorOAuthOptions(oauthOrOptions);
    const oauth = hasOAuthOptions ? oauthOrOptions : undefined;
    const requestOptions = hasOAuthOptions ? options : oauthOrOptions;
    const body: Schemas["ConnectRequest"] = {
      collection_id: collectionID,
      ...(config !== undefined ? { config } : {}),
      ...(oauth !== undefined
        ? {
            ...(oauth.mode !== undefined
              ? { oauth_client_mode: oauth.mode }
              : {}),
            oauth_client_id: oauth.clientId,
            oauth_client_secret: oauth.clientSecret,
          }
        : {}),
    } as Schemas["ConnectRequest"];
    return this.connectors.connect({ provider, body }, requestOptions);
  }

  /** Positional listConnections(collectionID) — wraps the query wrapper. */
  async listConnections(
    collectionID: string,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.connectors.list({ collectionId: collectionID } as never, options);
  }

  /** Positional disconnect(connectionID, deleteMemories?). */
  async disconnectConnection(
    connectionID: string,
    deleteMemories = false,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.connectors.disconnect(
      { connectionId: connectionID, deleteMemories } as never,
      options
    );
  }

  /** Alias for disconnectConnection (same arg shape). */
  async disconnect(
    connectionID: string,
    deleteMemories = false,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.connectors.disconnect(
      { connectionId: connectionID, deleteMemories } as never,
      options
    );
  }

}

// ---------- helpers ----------

function normalizeClientOptions(options: CompatClientOptions): ClientOptions {
  const {
    apiKey,
    baseUrl: baseUrlAlias,
    baseURL: baseURLCapAlias,
    timeout: timeoutAlias,
    ...rest
  } = options;
  const restClientOptions: ClientOptions = rest;
  return {
    ...restClientOptions,
    apiKey: apiKey ?? undefined,
    baseUrl:
      firstDefined(restClientOptions.baseUrl, baseUrlAlias, baseURLCapAlias) ?? undefined,
    timeoutMs:
      firstDefined(restClientOptions.timeoutMs, timeoutAlias) ?? undefined,
  };
}

function firstDefined<T>(...values: (T | null | undefined)[]): T | null | undefined {
  return values.find((value) => value !== undefined);
}

function arrayify(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value];
}
