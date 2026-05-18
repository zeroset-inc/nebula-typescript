# @nebula-ai/sdk

Official Nebula API SDK for TypeScript. Provides typed access to the public
Nebula REST API: collections, memories, connectors, snapshots, and system
health.

## Install

```bash
npm install @nebula-ai/sdk
# or
bun add @nebula-ai/sdk
```

## Quick start

```ts
import { Nebula } from "@nebula-ai/sdk";

const client = new Nebula({
  apiKey: process.env.NEBULA_API_KEY,
  // or: bearerToken: process.env.NEBULA_BEARER_TOKEN,
});

const id = await client.storeMemory({
  collection_id: "01234567-...",
  raw_text: "hello, world",
});

const results = await client.search({ query: "hello" });
```

The high-level methods (`storeMemory`, `search`, `deleteMemory`, ...) come
from the handwritten DX layer at `src/lib/dx.ts`. The low-level resource
clients (`client.memories.*`, `client.collections.*`, ...) are generated
directly from the OpenAPI spec and remain available as
`client.memories.create(...)`, `client.memories.search(...)`, etc.

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

- API reference: https://docs.trynebula.ai
- Migration notes: see `MIGRATION.md` in the source repo

## License

MIT
