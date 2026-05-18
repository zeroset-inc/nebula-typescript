export interface OffsetPageEnvelope<T> {
  results: T[];
  total_entries: number;
}

export interface PageFetcher<T, Params extends { offset?: number; limit?: number }> {
  (params: Params): Promise<OffsetPageEnvelope<T>>;
}

export interface OffsetPaginatorOptions {
  pageSize?: number;
}

export async function* paginateOffset<T, Params extends { offset?: number; limit?: number }>(
  fetcher: PageFetcher<T, Params>,
  initial: Params,
  options: OffsetPaginatorOptions = {}
): AsyncIterableIterator<T> {
  const pageSize = options.pageSize ?? initial.limit ?? 100;
  let offset = initial.offset ?? 0;
  while (true) {
    const params = { ...initial, offset, limit: pageSize } as Params;
    const page = await fetcher(params);
    for (const item of page.results) yield item;
    if (page.results.length < pageSize) return;
    if (offset + page.results.length >= page.total_entries) return;
    offset += page.results.length;
  }
}
