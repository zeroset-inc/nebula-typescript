# @nebula-ai/sdk

Official Nebula API SDK for TypeScript. Provides typed access to the public
Nebula REST API: collections, memories, connectors, snapshots, and system
health.

## Install

```bash
# Stable
npm install @nebula-ai/sdk
# Preview (next iteration, RC versions)
npm install @nebula-ai/sdk@next
```

> **Pre-launch:** The public surface is still being shaped. Plain
> semver releases (`1.6.0`, `1.7.0`, …) are stable and published to
> the `latest` dist-tag. Iteration happens on the `next` dist-tag
> as pre-release versions (`1.6.0-rc.1`, `-rc.2`, …). Caret ranges
> like `^1.6.0` never auto-pick pre-releases — semver excludes them
> unless you explicitly opt in. Stable consumers are insulated from
> the iteration channel by default.

## Quick start

```ts
import { Nebula } from "@nebula-ai/sdk";

const client = new Nebula({
  apiKey: process.env.NEBULA_API_KEY,
  // or: bearerToken: process.env.NEBULA_BEARER_TOKEN,
});

const result = await client.memories.create({
  collection_id: "01234567-...",
  raw_text: "hello, world",
});

const results = await client.memories.search({ query: "hello" });
```

Resource methods (`client.memories.*`, `client.collections.*`,
`client.connectors.*`, `client.snapshots.*`) are generated directly from
the OpenAPI spec. A small DX layer at `src/lib/dx.ts` adds polymorphic
helpers like `storeMemory` (dispatches create-vs-append based on whether
a `memory_id` is present); prefer the resource methods for everything else.

## Auth

The constructor accepts both `apiKey` / `bearerToken` (camelCase) and the
snake_case aliases `api_key` / `access_token`. If you pass an API key that
doesn't look like a Nebula key (not prefixed with `key_` or `neb_`), the
DX layer automatically routes it through the bearer-token header instead.

## Errors

All HTTP errors map to a typed exception hierarchy:

- `NebulaBadRequestError` (400)
- `NebulaUnauthorizedError` (401)
- `NebulaForbiddenError` (403)
- `NebulaNotFoundError` (404)
- `NebulaConflictError` (409)
- `NebulaValidationError` (422)
- `NebulaRateLimitError` (429) — carries `retryAfter` when the server returns `Retry-After`
- `NebulaServerError` (5xx)
- `NebulaConnectionError` / `NebulaTimeoutError` — transport-level

## Docs

- API reference: https://docs.zeroset.com
- Migration notes: see `MIGRATION.md` in the source repo

## License

MIT
