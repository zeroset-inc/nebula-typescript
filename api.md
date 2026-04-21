# Nebula

Types:

- <code><a href="./src/resources/top-level.ts">GetStatusResponse</a></code>

Methods:

- <code title="get /">client.<a href="./src/index.ts">getStatus</a>() -> unknown</code>

# Chunks

Types:

- <code><a href="./src/resources/chunks.ts">ChunkResponse</a></code>
- <code><a href="./src/resources/chunks.ts">ChunkSearchResult</a></code>
- <code><a href="./src/resources/chunks.ts">NebulaResultsChunkResponse</a></code>
- <code><a href="./src/resources/chunks.ts">NebulaResultsGenericBooleanResponse</a></code>
- <code><a href="./src/resources/chunks.ts">PaginatedNebulaResultListChunkResponse</a></code>
- <code><a href="./src/resources/chunks.ts">SearchSettings</a></code>
- <code><a href="./src/resources/chunks.ts">ChunkSearchResponse</a></code>

Methods:

- <code title="get /v1/chunks/{id}">client.chunks.<a href="./src/resources/chunks.ts">retrieve</a>(id) -> NebulaResultsChunkResponse</code>
- <code title="post /v1/chunks/{id}">client.chunks.<a href="./src/resources/chunks.ts">update</a>(id, { ...params }) -> NebulaResultsChunkResponse</code>
- <code title="get /v1/chunks">client.chunks.<a href="./src/resources/chunks.ts">list</a>({ ...params }) -> PaginatedNebulaResultListChunkResponse</code>
- <code title="delete /v1/chunks/{id}">client.chunks.<a href="./src/resources/chunks.ts">delete</a>(id) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/chunks/search">client.chunks.<a href="./src/resources/chunks.ts">search</a>({ ...params }) -> ChunkSearchResponse</code>

# Collections

Types:

- <code><a href="./src/resources/collections/collections.ts">CollectionResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">GraphCreationSettings</a></code>
- <code><a href="./src/resources/collections/collections.ts">NebulaResultsCollectionResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">PaginatedNebulaResultListCollectionResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionExportResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionGetDocumentsWithMemoriesResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionGetMetricsResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionValidateStatusResponse</a></code>

Methods:

- <code title="post /v1/collections">client.collections.<a href="./src/resources/collections/collections.ts">create</a>({ ...params }) -> NebulaResultsCollectionResponse</code>
- <code title="get /v1/collections/{id}">client.collections.<a href="./src/resources/collections/collections.ts">retrieve</a>(id) -> NebulaResultsCollectionResponse</code>
- <code title="post /v1/collections/{id}">client.collections.<a href="./src/resources/collections/collections.ts">update</a>(id, { ...params }) -> NebulaResultsCollectionResponse</code>
- <code title="get /v1/collections">client.collections.<a href="./src/resources/collections/collections.ts">list</a>({ ...params }) -> PaginatedNebulaResultListCollectionResponse</code>
- <code title="delete /v1/collections/{id}">client.collections.<a href="./src/resources/collections/collections.ts">delete</a>(id) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/collections/export">client.collections.<a href="./src/resources/collections/collections.ts">export</a>({ ...params }) -> unknown</code>
- <code title="post /v1/collections/{id}/extract">client.collections.<a href="./src/resources/collections/collections.ts">extract</a>(id, { ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="get /v1/collections/{id}/documents-with-memories">client.collections.<a href="./src/resources/collections/collections.ts">getDocumentsWithMemories</a>(id, { ...params }) -> unknown</code>
- <code title="get /v1/collections/{collection_id}/metrics">client.collections.<a href="./src/resources/collections/collections.ts">getMetrics</a>(collectionID, { ...params }) -> unknown</code>
- <code title="get /v1/collections/name/{collection_name}">client.collections.<a href="./src/resources/collections/collections.ts">retrieveByName</a>(collectionName, { ...params }) -> NebulaResultsCollectionResponse</code>
- <code title="post /v1/collections/{id}/validate-status">client.collections.<a href="./src/resources/collections/collections.ts">validateStatus</a>(id, { ...params }) -> unknown</code>

## Engrams

Types:

- <code><a href="./src/resources/collections/engrams.ts">NebulaResultsGenericMessageResponse</a></code>
- <code><a href="./src/resources/collections/engrams.ts">PaginatedNebulaResultListEngramResponse</a></code>

Methods:

- <code title="get /v1/collections/{id}/engrams">client.collections.engrams.<a href="./src/resources/collections/engrams.ts">list</a>(id, { ...params }) -> PaginatedNebulaResultListEngramResponse</code>
- <code title="post /v1/collections/{id}/engrams/{engram_id}">client.collections.engrams.<a href="./src/resources/collections/engrams.ts">add</a>(engramID, { ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="delete /v1/collections/{id}/engrams/{engram_id}">client.collections.engrams.<a href="./src/resources/collections/engrams.ts">remove</a>(engramID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>

## Users

Types:

- <code><a href="./src/resources/collections/users.ts">PaginatedNebulaResultListUser</a></code>

Methods:

- <code title="get /v1/collections/{id}/users">client.collections.users.<a href="./src/resources/collections/users.ts">list</a>(id, { ...params }) -> PaginatedNebulaResultListUser</code>
- <code title="post /v1/collections/{id}/users/{user_id}">client.collections.users.<a href="./src/resources/collections/users.ts">add</a>(userID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="delete /v1/collections/{id}/users/{user_id}">client.collections.users.<a href="./src/resources/collections/users.ts">remove</a>(userID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>

# Memories

Types:

- <code><a href="./src/resources/memories/memories.ts">IngestionConfig</a></code>
- <code><a href="./src/resources/memories/memories.ts">IngestionMode</a></code>
- <code><a href="./src/resources/memories/memories.ts">SearchMode</a></code>
- <code><a href="./src/resources/memories/memories.ts">MemoryCreateResponse</a></code>
- <code><a href="./src/resources/memories/memories.ts">MemoryAppendResponse</a></code>
- <code><a href="./src/resources/memories/memories.ts">MemoryDeleteMultipleResponse</a></code>
- <code><a href="./src/resources/memories/memories.ts">MemoryExportResponse</a></code>
- <code><a href="./src/resources/memories/memories.ts">MemorySearchResponse</a></code>

Methods:

- <code title="post /v1/memories">client.memories.<a href="./src/resources/memories/memories.ts">create</a>({ ...params }) -> unknown</code>
- <code title="get /v1/memories/{id}">client.memories.<a href="./src/resources/memories/memories.ts">retrieve</a>(id) -> NebulaResultsEngramResponse</code>
- <code title="patch /v1/memories/{id}">client.memories.<a href="./src/resources/memories/memories.ts">update</a>(id, { ...params }) -> NebulaResultsEngramResponse</code>
- <code title="get /v1/memories">client.memories.<a href="./src/resources/memories/memories.ts">list</a>({ ...params }) -> PaginatedNebulaResultListEngramResponse</code>
- <code title="delete /v1/memories/{id}">client.memories.<a href="./src/resources/memories/memories.ts">delete</a>(id) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/memories/{id}/append">client.memories.<a href="./src/resources/memories/memories.ts">append</a>(id, { ...params }) -> MemoryAppendResponse</code>
- <code title="post /v1/memories/{id}/deduplicate">client.memories.<a href="./src/resources/memories/memories.ts">deduplicateEntities</a>(id, { ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="delete /v1/memories/by-filter">client.memories.<a href="./src/resources/memories/memories.ts">deleteByFilter</a>({ ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/memories/delete">client.memories.<a href="./src/resources/memories/memories.ts">deleteMultiple</a>({ ...params }) -> MemoryDeleteMultipleResponse</code>
- <code title="get /v1/memories/{id}/download">client.memories.<a href="./src/resources/memories/memories.ts">downloadContent</a>(id) -> void</code>
- <code title="get /v1/memories/download_zip">client.memories.<a href="./src/resources/memories/memories.ts">downloadZip</a>({ ...params }) -> void</code>
- <code title="post /v1/memories/export">client.memories.<a href="./src/resources/memories/memories.ts">export</a>({ ...params }) -> unknown</code>
- <code title="post /v1/memories/{id}/extract">client.memories.<a href="./src/resources/memories/memories.ts">extractEntities</a>(id, { ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="get /v1/memories/{id}/chunks">client.memories.<a href="./src/resources/memories/memories.ts">listChunks</a>(id, { ...params }) -> PaginatedNebulaResultListChunkResponse</code>
- <code title="get /v1/memories/{id}/collections">client.memories.<a href="./src/resources/memories/memories.ts">listCollections</a>(id, { ...params }) -> PaginatedNebulaResultListCollectionResponse</code>
- <code title="post /v1/memories/search">client.memories.<a href="./src/resources/memories/memories.ts">search</a>({ ...params }) -> MemorySearchResponse</code>

## Metadata

Types:

- <code><a href="./src/resources/memories/metadata.ts">EngramResponse</a></code>
- <code><a href="./src/resources/memories/metadata.ts">NebulaResultsEngramResponse</a></code>

Methods:

- <code title="patch /v1/memories/{id}/metadata">client.memories.metadata.<a href="./src/resources/memories/metadata.ts">append</a>(id, [ ...body ]) -> NebulaResultsEngramResponse</code>
- <code title="put /v1/memories/{id}/metadata">client.memories.metadata.<a href="./src/resources/memories/metadata.ts">replace</a>(id, [ ...body ]) -> NebulaResultsEngramResponse</code>

## Entities

Types:

- <code><a href="./src/resources/memories/entities.ts">PaginatedNebulaResultEntity</a></code>
- <code><a href="./src/resources/memories/entities.ts">EntityExportResponse</a></code>

Methods:

- <code title="get /v1/memories/{id}/entities">client.memories.entities.<a href="./src/resources/memories/entities.ts">list</a>(id, { ...params }) -> PaginatedNebulaResultEntity</code>
- <code title="post /v1/memories/{id}/entities/export">client.memories.entities.<a href="./src/resources/memories/entities.ts">export</a>(id, { ...params }) -> unknown</code>

## Relationships

Types:

- <code><a href="./src/resources/memories/relationships.ts">PaginatedNebulaResultRelationship</a></code>
- <code><a href="./src/resources/memories/relationships.ts">RelationshipExportResponse</a></code>

Methods:

- <code title="get /v1/memories/{id}/relationships">client.memories.relationships.<a href="./src/resources/memories/relationships.ts">list</a>(id, { ...params }) -> PaginatedNebulaResultRelationship</code>
- <code title="post /v1/memories/{id}/relationships/export">client.memories.relationships.<a href="./src/resources/memories/relationships.ts">export</a>(id, { ...params }) -> unknown</code>

# Graphs

Types:

- <code><a href="./src/resources/graphs/graphs.ts">GraphResponse</a></code>
- <code><a href="./src/resources/graphs/graphs.ts">NebulaResultsGraphResponse</a></code>
- <code><a href="./src/resources/graphs/graphs.ts">GraphListResponse</a></code>

Methods:

- <code title="get /v1/graphs/{collection_id}">client.graphs.<a href="./src/resources/graphs/graphs.ts">retrieve</a>(collectionID) -> NebulaResultsGraphResponse</code>
- <code title="post /v1/graphs/{collection_id}">client.graphs.<a href="./src/resources/graphs/graphs.ts">update</a>(collectionID, { ...params }) -> NebulaResultsGraphResponse</code>
- <code title="get /v1/graphs">client.graphs.<a href="./src/resources/graphs/graphs.ts">list</a>({ ...params }) -> GraphListResponse</code>
- <code title="post /v1/graphs/{collection_id}/reset">client.graphs.<a href="./src/resources/graphs/graphs.ts">reset</a>(collectionID) -> NebulaResultsGenericBooleanResponse</code>

## Communities

Types:

- <code><a href="./src/resources/graphs/communities.ts">Community</a></code>
- <code><a href="./src/resources/graphs/communities.ts">NebulaResultsCommunity</a></code>
- <code><a href="./src/resources/graphs/communities.ts">CommunityListResponse</a></code>
- <code><a href="./src/resources/graphs/communities.ts">CommunityExportResponse</a></code>

Methods:

- <code title="post /v1/graphs/{collection_id}/communities">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">create</a>(collectionID, { ...params }) -> NebulaResultsCommunity</code>
- <code title="get /v1/graphs/{collection_id}/communities/{community_id}">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">retrieve</a>(communityID, { ...params }) -> NebulaResultsCommunity</code>
- <code title="post /v1/graphs/{collection_id}/communities/{community_id}">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">update</a>(communityID, { ...params }) -> NebulaResultsCommunity</code>
- <code title="get /v1/graphs/{collection_id}/communities">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">list</a>(collectionID, { ...params }) -> CommunityListResponse</code>
- <code title="delete /v1/graphs/{collection_id}/communities/{community_id}">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">delete</a>(communityID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/graphs/{collection_id}/communities/build">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">build</a>(collectionID, { ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="post /v1/graphs/{collection_id}/communities/export">client.graphs.communities.<a href="./src/resources/graphs/communities.ts">export</a>(collectionID, { ...params }) -> unknown</code>

## Entities

Types:

- <code><a href="./src/resources/graphs/entities.ts">Entity</a></code>
- <code><a href="./src/resources/graphs/entities.ts">NebulaResultsEntity</a></code>
- <code><a href="./src/resources/graphs/entities.ts">EntityExportResponse</a></code>

Methods:

- <code title="post /v1/graphs/{collection_id}/entities">client.graphs.entities.<a href="./src/resources/graphs/entities.ts">create</a>(collectionID, { ...params }) -> NebulaResultsEntity</code>
- <code title="get /v1/graphs/{collection_id}/entities/{entity_id}">client.graphs.entities.<a href="./src/resources/graphs/entities.ts">retrieve</a>(entityID, { ...params }) -> NebulaResultsEntity</code>
- <code title="post /v1/graphs/{collection_id}/entities/{entity_id}">client.graphs.entities.<a href="./src/resources/graphs/entities.ts">update</a>(entityID, { ...params }) -> NebulaResultsEntity</code>
- <code title="get /v1/graphs/{collection_id}/entities">client.graphs.entities.<a href="./src/resources/graphs/entities.ts">list</a>(collectionID, { ...params }) -> PaginatedNebulaResultEntity</code>
- <code title="delete /v1/graphs/{collection_id}/entities/{entity_id}">client.graphs.entities.<a href="./src/resources/graphs/entities.ts">delete</a>(entityID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/graphs/{collection_id}/entities/export">client.graphs.entities.<a href="./src/resources/graphs/entities.ts">export</a>(collectionID, { ...params }) -> unknown</code>

## Relationships

Types:

- <code><a href="./src/resources/graphs/relationships.ts">NebulaResultsRelationship</a></code>
- <code><a href="./src/resources/graphs/relationships.ts">Relationship</a></code>
- <code><a href="./src/resources/graphs/relationships.ts">RelationshipExportResponse</a></code>

Methods:

- <code title="post /v1/graphs/{collection_id}/relationships">client.graphs.relationships.<a href="./src/resources/graphs/relationships.ts">create</a>(collectionID, { ...params }) -> NebulaResultsRelationship</code>
- <code title="get /v1/graphs/{collection_id}/relationships/{relationship_id}">client.graphs.relationships.<a href="./src/resources/graphs/relationships.ts">retrieve</a>(relationshipID, { ...params }) -> NebulaResultsRelationship</code>
- <code title="post /v1/graphs/{collection_id}/relationships/{relationship_id}">client.graphs.relationships.<a href="./src/resources/graphs/relationships.ts">update</a>(relationshipID, { ...params }) -> NebulaResultsRelationship</code>
- <code title="get /v1/graphs/{collection_id}/relationships">client.graphs.relationships.<a href="./src/resources/graphs/relationships.ts">list</a>(collectionID, { ...params }) -> PaginatedNebulaResultRelationship</code>
- <code title="delete /v1/graphs/{collection_id}/relationships/{relationship_id}">client.graphs.relationships.<a href="./src/resources/graphs/relationships.ts">delete</a>(relationshipID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/graphs/{collection_id}/relationships/export">client.graphs.relationships.<a href="./src/resources/graphs/relationships.ts">export</a>(collectionID, { ...params }) -> unknown</code>

# Entities

Types:

- <code><a href="./src/resources/entities.ts">EntityResolveDuplicateResponse</a></code>
- <code><a href="./src/resources/entities.ts">EntityRetrieveDuplicatesResponse</a></code>

Methods:

- <code title="post /v1/entities/{entity_id}/resolve-duplicate">client.entities.<a href="./src/resources/entities.ts">resolveDuplicate</a>(entityID, { ...params }) -> unknown</code>
- <code title="get /v1/entities/{entity_id}/duplicates">client.entities.<a href="./src/resources/entities.ts">retrieveDuplicates</a>(entityID, { ...params }) -> unknown</code>

# Engrams

Types:

- <code><a href="./src/resources/engrams.ts">EngramRetrieveDuplicateStatsResponse</a></code>

Methods:

- <code title="get /v1/engrams/{engram_id}/duplicate-stats">client.engrams.<a href="./src/resources/engrams.ts">retrieveDuplicateStats</a>(engramID, { ...params }) -> unknown</code>

# Prompts

Types:

- <code><a href="./src/resources/prompts.ts">PromptResponse</a></code>
- <code><a href="./src/resources/prompts.ts">PromptRetrieveResponse</a></code>
- <code><a href="./src/resources/prompts.ts">PromptListResponse</a></code>

Methods:

- <code title="post /v1/prompts">client.prompts.<a href="./src/resources/prompts.ts">create</a>({ ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="post /v1/prompts/{name}">client.prompts.<a href="./src/resources/prompts.ts">retrieve</a>(name, { ...params }) -> PromptRetrieveResponse</code>
- <code title="put /v1/prompts/{name}">client.prompts.<a href="./src/resources/prompts.ts">update</a>(name, { ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="get /v1/prompts">client.prompts.<a href="./src/resources/prompts.ts">list</a>() -> PromptListResponse</code>
- <code title="delete /v1/prompts/{name}">client.prompts.<a href="./src/resources/prompts.ts">delete</a>(name) -> NebulaResultsGenericBooleanResponse</code>

# Retrieval

Types:

- <code><a href="./src/resources/retrieval.ts">GenerationConfig</a></code>
- <code><a href="./src/resources/retrieval.ts">Message</a></code>
- <code><a href="./src/resources/retrieval.ts">WebPageSearchResult</a></code>
- <code><a href="./src/resources/retrieval.ts">RetrievalEngageAgentResponse</a></code>
- <code><a href="./src/resources/retrieval.ts">RetrievalExecuteRagQueryResponse</a></code>
- <code><a href="./src/resources/retrieval.ts">RetrievalGenerateCompletionsResponse</a></code>
- <code><a href="./src/resources/retrieval.ts">RetrievalGenerateEmbeddingsResponse</a></code>
- <code><a href="./src/resources/retrieval.ts">RetrievalSearchResponse</a></code>

Methods:

- <code title="post /v1/retrieval/agent">client.retrieval.<a href="./src/resources/retrieval.ts">engageAgent</a>({ ...params }) -> RetrievalEngageAgentResponse</code>
- <code title="post /v1/retrieval/rag">client.retrieval.<a href="./src/resources/retrieval.ts">executeRagQuery</a>({ ...params }) -> unknown</code>
- <code title="post /v1/retrieval/completion">client.retrieval.<a href="./src/resources/retrieval.ts">generateCompletions</a>({ ...params }) -> RetrievalGenerateCompletionsResponse</code>
- <code title="post /v1/retrieval/embedding">client.retrieval.<a href="./src/resources/retrieval.ts">generateEmbeddings</a>({ ...params }) -> RetrievalGenerateEmbeddingsResponse</code>
- <code title="post /v1/retrieval/search">client.retrieval.<a href="./src/resources/retrieval.ts">search</a>({ ...params }) -> RetrievalSearchResponse</code>

# Marketplace

## Collections

Types:

- <code><a href="./src/resources/marketplace/collections.ts">CollectionAddResponse</a></code>

Methods:

- <code title="get /v1/marketplace/collections/{collection_id}">client.marketplace.collections.<a href="./src/resources/marketplace/collections.ts">retrieve</a>(collectionID) -> NebulaResultsCollectionResponse</code>
- <code title="get /v1/marketplace/collections">client.marketplace.collections.<a href="./src/resources/marketplace/collections.ts">list</a>({ ...params }) -> PaginatedNebulaResultListCollectionResponse</code>
- <code title="post /v1/marketplace/collections/{collection_id}/add">client.marketplace.collections.<a href="./src/resources/marketplace/collections.ts">add</a>(collectionID) -> CollectionAddResponse</code>

# Analytics

## Collections

### Centrality

Types:

- <code><a href="./src/resources/analytics/collections/centrality.ts">CentralityComputeResponse</a></code>
- <code><a href="./src/resources/analytics/collections/centrality.ts">CentralityStatusResponse</a></code>

Methods:

- <code title="post /v1/analytics/collections/{collection_id}/centrality/compute">client.analytics.collections.centrality.<a href="./src/resources/analytics/collections/centrality.ts">compute</a>(collectionID, { ...params }) -> CentralityComputeResponse</code>
- <code title="get /v1/analytics/collections/{collection_id}/centrality/status">client.analytics.collections.centrality.<a href="./src/resources/analytics/collections/centrality.ts">status</a>(collectionID) -> CentralityStatusResponse</code>

# Health

Methods:

- <code title="get /v1/health">client.health.<a href="./src/resources/health.ts">check</a>() -> NebulaResultsGenericMessageResponse</code>

# Version

Types:

- <code><a href="./src/resources/version.ts">VersionRetrieveResponse</a></code>

Methods:

- <code title="get /v1/version">client.version.<a href="./src/resources/version.ts">retrieve</a>() -> unknown</code>

# Management

Types:

- <code><a href="./src/resources/management.ts">ManagementSyncSubscriptionResponse</a></code>

Methods:

- <code title="post /v1/management/sync-subscription">client.management.<a href="./src/resources/management.ts">syncSubscription</a>() -> unknown</code>

# Plans

Types:

- <code><a href="./src/resources/plans.ts">PlanListResponse</a></code>

Methods:

- <code title="get /v1/plans">client.plans.<a href="./src/resources/plans.ts">list</a>() -> unknown</code>

# Usage

Types:

- <code><a href="./src/resources/usage/usage.ts">UsageRetrieveResponse</a></code>

Methods:

- <code title="get /v1/usage">client.usage.<a href="./src/resources/usage/usage.ts">retrieve</a>() -> unknown</code>

## Tokens

Types:

- <code><a href="./src/resources/usage/tokens.ts">TokenRetrieveCurrentMonthResponse</a></code>
- <code><a href="./src/resources/usage/tokens.ts">TokenRetrieveHistoryResponse</a></code>

Methods:

- <code title="get /v1/usage/tokens">client.usage.tokens.<a href="./src/resources/usage/tokens.ts">retrieveCurrentMonth</a>() -> unknown</code>
- <code title="get /v1/usage/tokens/history">client.usage.tokens.<a href="./src/resources/usage/tokens.ts">retrieveHistory</a>({ ...params }) -> unknown</code>

# System

Types:

- <code><a href="./src/resources/system.ts">SystemRetrieveSettingsResponse</a></code>
- <code><a href="./src/resources/system.ts">SystemRetrieveStatusResponse</a></code>

Methods:

- <code title="get /v1/system/settings">client.system.<a href="./src/resources/system.ts">retrieveSettings</a>() -> SystemRetrieveSettingsResponse</code>
- <code title="get /v1/system/status">client.system.<a href="./src/resources/system.ts">retrieveStatus</a>() -> SystemRetrieveStatusResponse</code>

# Secrets

Types:

- <code><a href="./src/resources/secrets/secrets.ts">SecretInitializeResponse</a></code>
- <code><a href="./src/resources/secrets/secrets.ts">SecretRetrieveHistoryResponse</a></code>
- <code><a href="./src/resources/secrets/secrets.ts">SecretRetrieveStatusResponse</a></code>
- <code><a href="./src/resources/secrets/secrets.ts">SecretRotateResponse</a></code>
- <code><a href="./src/resources/secrets/secrets.ts">SecretUpdateConfigResponse</a></code>

Methods:

- <code title="post /v1/secrets/initialize">client.secrets.<a href="./src/resources/secrets/secrets.ts">initialize</a>({ ...params }) -> SecretInitializeResponse</code>
- <code title="get /v1/secrets/history">client.secrets.<a href="./src/resources/secrets/secrets.ts">retrieveHistory</a>({ ...params }) -> SecretRetrieveHistoryResponse</code>
- <code title="get /v1/secrets/status">client.secrets.<a href="./src/resources/secrets/secrets.ts">retrieveStatus</a>({ ...params }) -> SecretRetrieveStatusResponse</code>
- <code title="post /v1/secrets/rotate">client.secrets.<a href="./src/resources/secrets/secrets.ts">rotate</a>({ ...params }) -> SecretRotateResponse</code>
- <code title="put /v1/secrets/config">client.secrets.<a href="./src/resources/secrets/secrets.ts">updateConfig</a>({ ...params }) -> SecretUpdateConfigResponse</code>

## Scheduler

Types:

- <code><a href="./src/resources/secrets/scheduler.ts">SchedulerStartResponse</a></code>
- <code><a href="./src/resources/secrets/scheduler.ts">SchedulerStopResponse</a></code>

Methods:

- <code title="post /v1/secrets/scheduler/start">client.secrets.scheduler.<a href="./src/resources/secrets/scheduler.ts">start</a>() -> SchedulerStartResponse</code>
- <code title="post /v1/secrets/scheduler/stop">client.secrets.scheduler.<a href="./src/resources/secrets/scheduler.ts">stop</a>() -> SchedulerStopResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookGetStatsResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListEventsResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookScheduleCleanupResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookTriggerCleanupResponse</a></code>

Methods:

- <code title="get /v1/webhooks/stats">client.webhooks.<a href="./src/resources/webhooks.ts">getStats</a>() -> WebhookGetStatsResponse</code>
- <code title="get /v1/webhooks/events">client.webhooks.<a href="./src/resources/webhooks.ts">listEvents</a>({ ...params }) -> WebhookListEventsResponse</code>
- <code title="post /v1/webhooks/schedule-cleanup">client.webhooks.<a href="./src/resources/webhooks.ts">scheduleCleanup</a>({ ...params }) -> WebhookScheduleCleanupResponse</code>
- <code title="post /v1/webhooks/cleanup">client.webhooks.<a href="./src/resources/webhooks.ts">triggerCleanup</a>({ ...params }) -> WebhookTriggerCleanupResponse</code>

# Billing

Types:

- <code><a href="./src/resources/billing.ts">BillingCreateBillingPortalSessionResponse</a></code>
- <code><a href="./src/resources/billing.ts">BillingCreateCheckoutSessionResponse</a></code>
- <code><a href="./src/resources/billing.ts">BillingHandleWebhookResponse</a></code>

Methods:

- <code title="post /v1/billing/portal">client.billing.<a href="./src/resources/billing.ts">createBillingPortalSession</a>({ ...params }) -> unknown</code>
- <code title="post /v1/billing/checkout">client.billing.<a href="./src/resources/billing.ts">createCheckoutSession</a>({ ...params }) -> unknown</code>
- <code title="post /v1/billing/webhook">client.billing.<a href="./src/resources/billing.ts">handleWebhook</a>() -> unknown</code>

# Contradictions

Types:

- <code><a href="./src/resources/contradictions.ts">ContradictionCascadeInvalidationResponse</a></code>

Methods:

- <code title="post /v1/contradictions/{relationship_id}/cascade">client.contradictions.<a href="./src/resources/contradictions.ts">cascadeInvalidation</a>(relationshipID, { ...params }) -> unknown</code>

# TemporalEvents

Types:

- <code><a href="./src/resources/temporal-events.ts">TemporalEventRetrieveResponse</a></code>
- <code><a href="./src/resources/temporal-events.ts">TemporalEventListResponse</a></code>

Methods:

- <code title="get /v1/temporal-events/{event_id}">client.temporalEvents.<a href="./src/resources/temporal-events.ts">retrieve</a>(eventID) -> unknown</code>
- <code title="get /v1/temporal-events/">client.temporalEvents.<a href="./src/resources/temporal-events.ts">list</a>({ ...params }) -> unknown</code>

# Users

Types:

- <code><a href="./src/resources/users/users.ts">NebulaResultsUser</a></code>
- <code><a href="./src/resources/users/users.ts">StandardUser</a></code>
- <code><a href="./src/resources/users/users.ts">StorageTypeLimit</a></code>
- <code><a href="./src/resources/users/users.ts">SystemDefaults</a></code>
- <code><a href="./src/resources/users/users.ts">Token</a></code>
- <code><a href="./src/resources/users/users.ts">TokenResponse</a></code>
- <code><a href="./src/resources/users/users.ts">UsageLimit</a></code>
- <code><a href="./src/resources/users/users.ts">UserExportResponse</a></code>
- <code><a href="./src/resources/users/users.ts">UserFetchLimitsResponse</a></code>
- <code><a href="./src/resources/users/users.ts">UserRetrieveMetricsResponse</a></code>

Methods:

- <code title="get /v1/users/{id}">client.users.<a href="./src/resources/users/users.ts">retrieve</a>(id) -> NebulaResultsUser</code>
- <code title="post /v1/users/{id}">client.users.<a href="./src/resources/users/users.ts">update</a>(id, { ...params }) -> NebulaResultsUser</code>
- <code title="get /v1/users">client.users.<a href="./src/resources/users/users.ts">list</a>({ ...params }) -> PaginatedNebulaResultListUser</code>
- <code title="delete /v1/users/{id}">client.users.<a href="./src/resources/users/users.ts">delete</a>(id, { ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="post /v1/users/change-password">client.users.<a href="./src/resources/users/users.ts">changePassword</a>({ ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="post /v1/users/export">client.users.<a href="./src/resources/users/users.ts">export</a>({ ...params }) -> unknown</code>
- <code title="get /v1/users/{id}/limits">client.users.<a href="./src/resources/users/users.ts">fetchLimits</a>(id) -> UserFetchLimitsResponse</code>
- <code title="get /v1/users/me">client.users.<a href="./src/resources/users/users.ts">getCurrentUser</a>() -> NebulaResultsUser</code>
- <code title="post /v1/users/login">client.users.<a href="./src/resources/users/users.ts">login</a>({ ...params }) -> TokenResponse</code>
- <code title="post /v1/users/logout">client.users.<a href="./src/resources/users/users.ts">logout</a>() -> NebulaResultsGenericMessageResponse</code>
- <code title="post /v1/users/refresh-token">client.users.<a href="./src/resources/users/users.ts">refreshToken</a>({ ...params }) -> TokenResponse</code>
- <code title="post /v1/users">client.users.<a href="./src/resources/users/users.ts">register</a>({ ...params }) -> NebulaResultsUser</code>
- <code title="post /v1/users/request-password-reset">client.users.<a href="./src/resources/users/users.ts">requestPasswordReset</a>({ ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="post /v1/users/reset-password">client.users.<a href="./src/resources/users/users.ts">resetPassword</a>({ ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="get /v1/user/metrics">client.users.<a href="./src/resources/users/users.ts">retrieveMetrics</a>({ ...params }) -> unknown</code>
- <code title="post /v1/users/send-verification-email">client.users.<a href="./src/resources/users/users.ts">sendVerificationEmail</a>({ ...params }) -> NebulaResultsGenericMessageResponse</code>
- <code title="post /v1/users/verify-email">client.users.<a href="./src/resources/users/users.ts">verifyEmail</a>({ ...params }) -> NebulaResultsGenericMessageResponse</code>

## Collections

Methods:

- <code title="post /v1/users/{id}/collections/{collection_id}">client.users.collections.<a href="./src/resources/users/collections.ts">add</a>(collectionID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>
- <code title="get /v1/users/{id}/collections">client.users.collections.<a href="./src/resources/users/collections.ts">getAll</a>(id, { ...params }) -> PaginatedNebulaResultListCollectionResponse</code>
- <code title="delete /v1/users/{id}/collections/{collection_id}">client.users.collections.<a href="./src/resources/users/collections.ts">remove</a>(collectionID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>

## APIKeys

Types:

- <code><a href="./src/resources/users/api-keys.ts">APIKeyCreateResponse</a></code>
- <code><a href="./src/resources/users/api-keys.ts">APIKeyListResponse</a></code>

Methods:

- <code title="post /v1/users/{id}/api-keys">client.users.apiKeys.<a href="./src/resources/users/api-keys.ts">create</a>(id, { ...params }) -> APIKeyCreateResponse</code>
- <code title="get /v1/users/{id}/api-keys">client.users.apiKeys.<a href="./src/resources/users/api-keys.ts">list</a>(id) -> APIKeyListResponse</code>
- <code title="delete /v1/users/{id}/api-keys/{key_id}">client.users.apiKeys.<a href="./src/resources/users/api-keys.ts">delete</a>(keyID, { ...params }) -> NebulaResultsGenericBooleanResponse</code>

## OAuth

### Google

Types:

- <code><a href="./src/resources/users/oauth/google.ts">LoginResponse</a></code>

Methods:

- <code title="get /v1/users/oauth/google/authorize">client.users.oauth.google.<a href="./src/resources/users/oauth/google.ts">authorize</a>() -> NebulaResultsGenericMessageResponse</code>
- <code title="get /v1/users/oauth/google/callback">client.users.oauth.google.<a href="./src/resources/users/oauth/google.ts">callback</a>({ ...params }) -> LoginResponse</code>

### GitHub

Methods:

- <code title="get /v1/users/oauth/github/authorize">client.users.oauth.github.<a href="./src/resources/users/oauth/github.ts">authorize</a>() -> NebulaResultsGenericMessageResponse</code>
- <code title="get /v1/users/oauth/github/callback">client.users.oauth.github.<a href="./src/resources/users/oauth/github.ts">callback</a>({ ...params }) -> LoginResponse</code>
