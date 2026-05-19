# Changelog

## 1.4.0 (2026-05-19)

Full Changelog: [v1.3.0...v1.4.0](https://github.com/nebula-agi/nebula-typescript/compare/v1.3.0...v1.4.0)

### Features

* Add workflow synthesis pipeline ([384d0cb](https://github.com/nebula-agi/nebula-typescript/commit/384d0cbaf7401f7bbc0fc79a3811758344c61af5))
* graph: unify TASK→EPISODIC + decouple Step 3.5+ from ingest ack ([ef47505](https://github.com/nebula-agi/nebula-typescript/commit/ef47505cf23fd175e7528d4b9c6c7deac2bc5bdb))
* **overview:** Shape A++ — additive scaffolding for Memories upload→list RYW ([78a5185](https://github.com/nebula-agi/nebula-typescript/commit/78a518582254192ffda5700ac85f87b61f926ebe))
* Rationale grounding + backfill outbox for v4 trace pipeline ([a1e097c](https://github.com/nebula-agi/nebula-typescript/commit/a1e097ce0ac2ccd815b9a10ef762ad2204280c48))
* support setting headers via env ([8283ad3](https://github.com/nebula-agi/nebula-typescript/commit/8283ad372cefe5ea4214d38873d6365cfd120cf3))


### Chores

* configure new SDK language ([b1382c4](https://github.com/nebula-agi/nebula-typescript/commit/b1382c49cc44d87745fbf8c36ac56bd0dac15c4f))
* **format:** run eslint and prettier separately ([4ee384f](https://github.com/nebula-agi/nebula-typescript/commit/4ee384f8f6155a006a39011e68772cfa50c63381))
* **internal:** codegen related update ([c27bb1e](https://github.com/nebula-agi/nebula-typescript/commit/c27bb1eacb365332f0398f999b26a87bc7e2e53f))
* **internal:** codegen related update ([7806cb2](https://github.com/nebula-agi/nebula-typescript/commit/7806cb245908e4d89c11ff27649a10096295365b))
* redact api-key headers in debug logs ([18bf5b5](https://github.com/nebula-agi/nebula-typescript/commit/18bf5b5719acdc47fa80f5e6f0dee5fcd1f622d8))


### Documentation

* align SDK examples with nebula-sdk v1.3.0; fix stale router descriptions ([020c8a4](https://github.com/nebula-agi/nebula-typescript/commit/020c8a40e2c119775eea985b5f2e72ec9fd39e13))


### Refactors

* **engrams:** typed EngramKind + ConversationFields/DocumentFields substructure ([5ecdcb7](https://github.com/nebula-agi/nebula-typescript/commit/5ecdcb7b5e8e43d12119f9c91c4dcf4adfc46f5d))

## 1.3.0 (2026-04-27)

Full Changelog: [v1.2.2...v1.3.0](https://github.com/nebula-agi/nebula-typescript/compare/v1.2.2...v1.3.0)

### Features

* [codex] Clean up replayed playground memories ([2b1f57d](https://github.com/nebula-agi/nebula-typescript/commit/2b1f57d98f1e4f433a8ef6fd9d9eba5b6a55917f))
* [codex] Fix EngramResponse OpenAPI example ([4025791](https://github.com/nebula-agi/nebula-typescript/commit/402579144bba03ddc0266488d54d48276bef6dc5))
* [codex] Harden memory write validation contracts ([64a8ef8](https://github.com/nebula-agi/nebula-typescript/commit/64a8ef80de1a5ce71636b376a14fea9b1bbf765e))
* add nebula devex facade ([41916e2](https://github.com/nebula-agi/nebula-typescript/commit/41916e2dd50161f87c41f2096bc4209580a25e48))
* api: honor chunks_limit on memory listing ([d9da2aa](https://github.com/nebula-agi/nebula-typescript/commit/d9da2aa355911262bcefa1a5acdad71f12d2768d))
* engram: replace generated summaries with deterministic engram_context ([a3f9ec1](https://github.com/nebula-agi/nebula-typescript/commit/a3f9ec1fdee8b454e1d4ac915ae0054c8c9c1cfe))
* NQL overhaul v2 - clean cherry-pick baseline from [#526](https://github.com/nebula-agi/nebula-typescript/issues/526) ([cf0a59d](https://github.com/nebula-agi/nebula-typescript/commit/cf0a59db3b8bc6de2ab5fcd413ed3d8f4edce141))
* Remove legacy append chunk IDs from public contract ([e81eb69](https://github.com/nebula-agi/nebula-typescript/commit/e81eb69b3f738a03f4718d48257b3fee139152b6))
* Rename MemoryRecall response fields to adjective-uniform shape ([9041587](https://github.com/nebula-agi/nebula-typescript/commit/9041587a4e1fdd8af6247a89237bad4b1875b4f8))
* sdks/python: SnapshotEnvelope dataclass + typed export/import/search/add ([db8ba18](https://github.com/nebula-agi/nebula-typescript/commit/db8ba187d0eca3acd2b6296c9aac60ef9f48899e))
* Stabilize memory create SDK response schema ([077b653](https://github.com/nebula-agi/nebula-typescript/commit/077b653f8c2b51729b7399c153921dca8335b510))


### Bug Fixes

* dx deleteMemories body precedence ([#7](https://github.com/nebula-agi/nebula-typescript/issues/7)) ([0db50e6](https://github.com/nebula-agi/nebula-typescript/commit/0db50e680625f4212e2e15f3186eb8b08a26ede7))
* harden DX store and delete helpers ([#6](https://github.com/nebula-agi/nebula-typescript/issues/6)) ([6682596](https://github.com/nebula-agi/nebula-typescript/commit/6682596faf42e20116796c9fb55c38abf44cb194))
* split MemoryInput into discriminated union, forward all append fields ([#8](https://github.com/nebula-agi/nebula-typescript/issues/8)) ([323948a](https://github.com/nebula-agi/nebula-typescript/commit/323948aecbadaed6c6f8f3bcb96af4e015db9241))


### Chores

* configure new SDK language ([51c71c3](https://github.com/nebula-agi/nebula-typescript/commit/51c71c3f1f01bdc3e0eb478b8855753f15033e36))
* **internal:** more robust bootstrap script ([586f171](https://github.com/nebula-agi/nebula-typescript/commit/586f1714807451e24da433558e96aa872c6d9073))
* seed release baseline ([#5](https://github.com/nebula-agi/nebula-typescript/issues/5)) ([cb59ec4](https://github.com/nebula-agi/nebula-typescript/commit/cb59ec47ffa008da8d1154f6b5ae98ce263ae9e2))
* update SDK settings ([b7693b1](https://github.com/nebula-agi/nebula-typescript/commit/b7693b152c878bee241a3beb87f48c0e6fb8bf0f))
* update SDK settings ([8954684](https://github.com/nebula-agi/nebula-typescript/commit/8954684d19b304fca8111359b57d38f033257269))
