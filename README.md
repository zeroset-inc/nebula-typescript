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
});

const result = await client.memory.store({
  collection_id: "01234567-...",
  raw_text: "hello, world",
});

const results = await client.memory.search({
  query: "hello",
  retrieval_operation_id: crypto.randomUUID(),
});
```

Resource methods (`client.memory.*`, `client.collections.*`,
`client.connectors.*`, `client.snapshots.*`) are generated directly from
the OpenAPI spec. A small DX layer at `src/lib/dx.ts` adds positional
convenience methods for operations whose generated wire shape is less ergonomic.

## Auth

Pass your Nebula API key as `apiKey` when constructing the client. It is sent
via the `Authorization: Bearer` header.

```ts
new Nebula({ apiKey: process.env.NEBULA_API_KEY });
```

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
