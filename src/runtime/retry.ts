export interface RetryPolicy {
  readonly maxRetries: number;
  readonly baseMs: number;
  readonly maxMs: number;
}

export const DEFAULT_RETRY: RetryPolicy = {
  maxRetries: 2,
  baseMs: 250,
  maxMs: 8000,
};

const RETRYABLE_STATUSES: ReadonlySet<number> = new Set([408, 429, 502, 503, 504]);

export function isRetryableStatus(status: number): boolean {
  return RETRYABLE_STATUSES.has(status);
}

export function backoffMs(attempt: number, policy: RetryPolicy, retryAfterSec?: number): number {
  if (retryAfterSec != null && Number.isFinite(retryAfterSec)) {
    return Math.min(retryAfterSec * 1000, policy.maxMs);
  }
  const exp = Math.min(policy.baseMs * 2 ** attempt, policy.maxMs);
  return Math.floor(Math.random() * exp);
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolveSleep, reject) => {
    const handle = setTimeout(resolveSleep, ms);
    if (signal) {
      const onAbort = () => {
        clearTimeout(handle);
        reject(signal.reason ?? new Error("aborted"));
      };
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}
