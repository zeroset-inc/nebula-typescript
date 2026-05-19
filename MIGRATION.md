# Migrating to @nebula-ai/sdk 2.x

The 2.x line replaces the Stainless-generated SDK with an in-house generator.
Public method names and call signatures are preserved; the **wire shapes**
for errors and list responses changed.

## Breaking changes

### 1. Error envelope

Every 4xx / 5xx now returns the canonical envelope:

```jsonc
{
  "type": "validation_error",       // stable machine-readable class
  "message": "raw_text must be non-empty",
  "code": "raw_text.empty",         // optional, stable per type
  "request_id": "rid-abc-123",      // X-Request-Id round-trip
  "details": { ... }                // optional structured context
}
```

The SDK surfaces these on `NebulaAPIError`:

```ts
import { NebulaValidationError } from "@nebula-ai/sdk";

try {
  await client.storeMemory({ collection_id: "...", raw_text: "" });
} catch (err) {
  if (err instanceof NebulaValidationError) {
    err.type;        // "validation_error"
    err.code;        // "raw_text.empty"
    err.requestId;   // "rid-abc-123" — quote in support tickets
    err.details;     // { field: "raw_text", limit: 1 }
    err.message;     // "raw_text must be non-empty"
  }
}
```

**1.x callers reading `err.body.message` or `err.body.error_type` keep
working** — `err.body` is still the raw response body. The new typed fields
(`err.type`, `err.code`, `err.requestId`, `err.details`) are the recommended
accessors going forward.

If you wrote error-class checks against the body's `error_type` field, those
no longer match — `error_type` was renamed to `type`. Switch the check to
`err.type` or the typed-class hierarchy.

### 2. Cursor pagination

List endpoints (`listMemories`, `listCollections`) moved from offset to
opaque cursors:

```ts
// 1.x
const { results, total_entries } = await client.listMemories({ offset: 0, limit: 50 });

// 2.x
const { data, next_cursor, has_more } = await client.listMemories({ limit: 50 });
while (has_more) {
  const next = await client.listMemories({ limit: 50, cursor: next_cursor });
  // ...
}
```

`total_entries` is no longer returned. If you displayed it as a UI count,
either drop it or query a dedicated count endpoint (none exists today —
file an issue if you need one).

### 3. `applied_wal_seq` on `listMemories`

For read-your-writes scenarios, `listMemories` now returns an `applied_wal_seq`
field. Pair it with `min_applied_wal_seq` on the request to assert that a
prior write is visible. Default behavior is unchanged for callers that don't
pass `min_applied_wal_seq`.

## Non-breaking improvements

- `storeMemories` accepts `{ maxConcurrency }` (default 8) — bounded worker
  pool, no more accidental unbounded fan-out under the hood.
- `AbortSignal` propagation on every method.
- Dual ESM/CJS builds with proper `.d.ts` / `.d.cts` outputs.
- Node 18+ required (`engines.node >= 18`) — earlier versions are unsupported
  because we rely on global `fetch`.

## Need help?

File issues at https://github.com/nebula-agi/nebula-typescript/issues with
the `request_id` from `err.requestId`.
