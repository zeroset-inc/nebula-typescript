# Migration guide

When upgrading across multiple release lines, review every section newer than
your installed version and apply the applicable changes from oldest to newest.

## Migrating to @nebula-ai/sdk 3.x

Version 3.x extends the 2.x collection-context requirement to the batch
methods. Every selection passed to `getMany` or `searchBarrier` must name the
collection that owns the operation, so the request can be routed to the region
that owns it.

### Batch selections

In 2.x, a selection carried only the operation:

```ts
await client.ingestionOperation.getMany({
  operations: [{ operation_id: operationId }],
});
```

In 3.x, each selection also carries `collection_id`:

```ts
await client.ingestionOperation.getMany({
  operations: [{ operation_id: operationId, collection_id: collectionId }],
});
```

`collection_id` must be the same value supplied as `collection_id` when the
operation was created. A selection naming a different collection is reported
as `resource_not_found`, because that operation does not exist in that
collection.

### Batches that span regions

A single request is served by a single region, so every selection in one call
must resolve to the same owning region. A batch whose collections are owned by
different regions is rejected with HTTP 422 and the new `cross_region_batch`
error code; split it into one request per owning region. Batches confined to a
single collection, or to collections sharing one region, are unaffected.

Selections that all name the same collection are additionally routed directly
to the owning region. A batch spanning several collections in that region is
still served correctly, but reaches the owner by way of the active writer.

## Migrating to @nebula-ai/sdk 2.x

Version 2.x requires the collection context when operating on a single
ingestion operation. Retain the collection ID used in the operation's
`create` request and pass that same value to subsequent calls.

### Ingestion-operation methods

In 1.x, single-operation methods accepted only the operation ID:

```ts
await client.ingestionOperation.putItem({ operationId, body });
await client.ingestionOperation.seal(operationId);
await client.ingestionOperation.get(operationId);
await client.ingestionOperation.cancel(operationId);
```

In 2.x, all four methods accept a named parameter object that includes
`collectionId`:

```ts
await client.ingestionOperation.putItem({
  operationId,
  collectionId,
  body,
});
await client.ingestionOperation.seal({ operationId, collectionId });
await client.ingestionOperation.get({ operationId, collectionId });
await client.ingestionOperation.cancel({ operationId, collectionId });
```

`collectionId` must be the same value supplied as `collection_id` when the
operation was created.

The `create`, `getMany`, and `searchBarrier` method signatures are unchanged.

## Migrating to @nebula-ai/sdk 1.4.x

The 1.4.x line replaces the Stainless-generated SDK with an in-house generator.
Public method names and call signatures are preserved; the **wire shapes**
for errors and list responses changed — see the breaking-change section
below.

### Breaking changes

#### Error envelope

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

**1.3.x callers reading `err.body.message` or `err.body.error_type` keep
working** — `err.body` is still the raw response body. The new typed fields
(`err.type`, `err.code`, `err.requestId`, `err.details`) are the recommended
accessors going forward.

If you wrote error-class checks against the body's `error_type` field, those
no longer match — `error_type` was renamed to `type`. Switch the check to
`err.type` or the typed-class hierarchy.

#### Cursor pagination

List endpoints (`listMemories`, `listCollections`) moved from offset to
opaque cursors:

```ts
// 1.3.x
const { results, total_entries } = await client.listMemories({ offset: 0, limit: 50 });

// 1.4.x
const { data, next_cursor, has_more } = await client.listMemories({ limit: 50 });
while (has_more) {
  const next = await client.listMemories({ limit: 50, cursor: next_cursor });
  // ...
}
```

`total_entries` is no longer returned. If you displayed it as a UI count,
either drop it or query a dedicated count endpoint (none exists today —
file an issue if you need one).

### Non-breaking improvements

- `storeMemories` accepts `{ maxConcurrency }` (default 8) — bounded worker
  pool, no more accidental unbounded fan-out under the hood.
- `AbortSignal` propagation on every method.
- Dual ESM/CJS builds with proper `.d.ts` / `.d.cts` outputs.
- Node 18+ required (`engines.node >= 18`) — earlier versions are unsupported
  because we rely on global `fetch`.

## Need help?

File issues at https://github.com/zeroset-inc/nebula-typescript/issues with
the `request_id` from `err.requestId`.
