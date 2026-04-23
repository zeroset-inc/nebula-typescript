# Nebula

Types:

- <code><a href="./src/resources/top-level.ts">HealthResponse</a></code>

Methods:

- <code title="get /v1/health">client.<a href="./src/index.ts">health</a>() -> HealthResponse</code>

# Collections

Types:

- <code><a href="./src/resources/collections.ts">CollectionCreateResponse</a></code>
- <code><a href="./src/resources/collections.ts">CollectionRetrieveResponse</a></code>
- <code><a href="./src/resources/collections.ts">CollectionUpdateResponse</a></code>
- <code><a href="./src/resources/collections.ts">CollectionListResponse</a></code>
- <code><a href="./src/resources/collections.ts">CollectionDeleteResponse</a></code>
- <code><a href="./src/resources/collections.ts">CollectionRetrieveByNameResponse</a></code>

Methods:

- <code title="post /v1/collections">client.collections.<a href="./src/resources/collections.ts">create</a>({ ...params }) -> CollectionCreateResponse</code>
- <code title="get /v1/collections/{id}">client.collections.<a href="./src/resources/collections.ts">retrieve</a>(id) -> CollectionRetrieveResponse</code>
- <code title="post /v1/collections/{id}">client.collections.<a href="./src/resources/collections.ts">update</a>(id, { ...params }) -> CollectionUpdateResponse</code>
- <code title="get /v1/collections">client.collections.<a href="./src/resources/collections.ts">list</a>({ ...params }) -> CollectionListResponse</code>
- <code title="delete /v1/collections/{id}">client.collections.<a href="./src/resources/collections.ts">delete</a>(id) -> CollectionDeleteResponse</code>
- <code title="get /v1/collections/name/{collection_name}">client.collections.<a href="./src/resources/collections.ts">retrieveByName</a>(collectionName, { ...params }) -> CollectionRetrieveByNameResponse</code>

# Memories

Types:

- <code><a href="./src/resources/memories.ts">MemoryCreateResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryRetrieveResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryUpdateResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryListResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryDeleteResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryAppendResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryCreateUploadResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryDeleteManyResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryDeleteUploadResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemorySearchResponse</a></code>

Methods:

- <code title="post /v1/memories">client.memories.<a href="./src/resources/memories.ts">create</a>({ ...params }) -> MemoryCreateResponse</code>
- <code title="get /v1/memories/{id}">client.memories.<a href="./src/resources/memories.ts">retrieve</a>(id) -> MemoryRetrieveResponse</code>
- <code title="patch /v1/memories/{id}">client.memories.<a href="./src/resources/memories.ts">update</a>(id, { ...params }) -> MemoryUpdateResponse</code>
- <code title="get /v1/memories">client.memories.<a href="./src/resources/memories.ts">list</a>({ ...params }) -> MemoryListResponse</code>
- <code title="delete /v1/memories/{id}">client.memories.<a href="./src/resources/memories.ts">delete</a>(id) -> MemoryDeleteResponse</code>
- <code title="post /v1/memories/{id}/append">client.memories.<a href="./src/resources/memories.ts">append</a>(id, { ...params }) -> MemoryAppendResponse</code>
- <code title="post /v1/memories/upload">client.memories.<a href="./src/resources/memories.ts">createUpload</a>({ ...params }) -> MemoryCreateUploadResponse</code>
- <code title="post /v1/memories/delete">client.memories.<a href="./src/resources/memories.ts">deleteMany</a>({ ...params }) -> MemoryDeleteManyResponse</code>
- <code title="delete /v1/memories/upload">client.memories.<a href="./src/resources/memories.ts">deleteUpload</a>({ ...params }) -> MemoryDeleteUploadResponse</code>
- <code title="post /v1/memories/search">client.memories.<a href="./src/resources/memories.ts">search</a>({ ...params }) -> MemorySearchResponse</code>

# Sources

Types:

- <code><a href="./src/resources/sources.ts">SourceUpdateResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceListResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceDeleteResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceSearchResponse</a></code>

Methods:

- <code title="patch /v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">update</a>(id, { ...params }) -> SourceUpdateResponse</code>
- <code title="get /v1/sources">client.sources.<a href="./src/resources/sources.ts">list</a>({ ...params }) -> SourceListResponse</code>
- <code title="delete /v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">delete</a>(id, { ...params }) -> SourceDeleteResponse</code>
- <code title="post /v1/sources/search">client.sources.<a href="./src/resources/sources.ts">search</a>({ ...params }) -> SourceSearchResponse</code>

# Connectors

Types:

- <code><a href="./src/resources/connectors.ts">ConnectorRetrieveResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorConnectResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorDisconnectResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListChannelsResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListContentsResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListFoldersResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListProvidersResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorSyncResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorUpdateConfigResponse</a></code>

Methods:

- <code title="get /v1/connectors/{connection_id}">client.connectors.<a href="./src/resources/connectors.ts">retrieve</a>(connectionID) -> ConnectorRetrieveResponse</code>
- <code title="get /v1/connectors">client.connectors.<a href="./src/resources/connectors.ts">list</a>({ ...params }) -> ConnectorListResponse</code>
- <code title="post /v1/connectors/{provider}/connect">client.connectors.<a href="./src/resources/connectors.ts">connect</a>(provider, { ...params }) -> ConnectorConnectResponse</code>
- <code title="delete /v1/connectors/{connection_id}">client.connectors.<a href="./src/resources/connectors.ts">disconnect</a>(connectionID, { ...params }) -> ConnectorDisconnectResponse</code>
- <code title="get /v1/connectors/{connection_id}/channels">client.connectors.<a href="./src/resources/connectors.ts">listChannels</a>(connectionID) -> ConnectorListChannelsResponse</code>
- <code title="get /v1/connectors/{connection_id}/contents">client.connectors.<a href="./src/resources/connectors.ts">listContents</a>(connectionID, { ...params }) -> ConnectorListContentsResponse</code>
- <code title="get /v1/connectors/{connection_id}/folders">client.connectors.<a href="./src/resources/connectors.ts">listFolders</a>(connectionID, { ...params }) -> ConnectorListFoldersResponse</code>
- <code title="get /v1/connectors/providers">client.connectors.<a href="./src/resources/connectors.ts">listProviders</a>() -> ConnectorListProvidersResponse</code>
- <code title="post /v1/connectors/{connection_id}/sync">client.connectors.<a href="./src/resources/connectors.ts">sync</a>(connectionID) -> ConnectorSyncResponse</code>
- <code title="patch /v1/connectors/{connection_id}/config">client.connectors.<a href="./src/resources/connectors.ts">updateConfig</a>(connectionID, { ...params }) -> ConnectorUpdateConfigResponse</code>

# Snapshots

Types:

- <code><a href="./src/resources/snapshots.ts">SnapshotExportResponse</a></code>
- <code><a href="./src/resources/snapshots.ts">SnapshotImportResponse</a></code>

Methods:

- <code title="post /v1/device-memory/snapshot/export">client.snapshots.<a href="./src/resources/snapshots.ts">export</a>({ ...params }) -> SnapshotExportResponse</code>
- <code title="post /v1/device-memory/snapshot/import">client.snapshots.<a href="./src/resources/snapshots.ts">import</a>({ ...params }) -> SnapshotImportResponse</code>
