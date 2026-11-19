type Bucket = {
  count: number;
  expiresAt: number;
};

export type RateLimitResult = {
  limited: boolean;
  remaining: number;
  resetAt: number;
};

export type RateLimiterStore = {
  check(key: string, now: number): Promise<RateLimitResult> | RateLimitResult;
};

type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  maxKeys?: number;
  store?: RateLimiterStore;
};

/**
 * Resilient in-memory fixed-window rate limiter with LRU/expiry pruning.
 * Suitable for single Node.js process / developer environments.
 */
export class InMemoryRateLimiterStore implements RateLimiterStore {
  private readonly buckets = new Map<string, Bucket>();
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly maxKeys: number;

  constructor(windowMs: number, maxRequests: number, maxKeys = 10_000) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.maxKeys = maxKeys;
  }

  private prune(now: number) {
    for (const [key, bucket] of this.buckets) {
      if (bucket.expiresAt <= now) this.buckets.delete(key);
    }

    if (this.buckets.size <= this.maxKeys) return;

    // Evict oldest buckets first under memory pressure
    const overflow = this.buckets.size - this.maxKeys;
    const oldest = [...this.buckets.entries()]
      .sort((a, b) => a[1].expiresAt - b[1].expiresAt)
      .slice(0, overflow);
    for (const [key] of oldest) this.buckets.delete(key);
  }

  check(key: string, now = Date.now()): RateLimitResult {
    this.prune(now);
    const current = this.buckets.get(key);

    if (!current || current.expiresAt <= now) {
      const resetAt = now + this.windowMs;
      this.buckets.set(key, { count: 1, expiresAt: resetAt });
      return { limited: false, remaining: Math.max(0, this.maxRequests - 1), resetAt };
    }

    if (current.count >= this.maxRequests) {
      return { limited: true, remaining: 0, resetAt: current.expiresAt };
    }

    const nextCount = current.count + 1;
    this.buckets.set(key, { ...current, count: nextCount });
    return {
      limited: false,
      remaining: Math.max(0, this.maxRequests - nextCount),
      resetAt: current.expiresAt,
    };
  }
}

/**
 * Upstash Redis / Vercel KV REST API distributed rate limiter.
 * Enables synchronized rate limiting across multi-instance, serverless, or multi-region deployments
 * using native fetch with zero extra npm dependencies.
 */
export class DistributedRedisRateLimiterStore implements RateLimiterStore {
  private readonly restUrl: string;
  private readonly restToken: string;
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly fallback: InMemoryRateLimiterStore;

  constructor(
    restUrl: string,
    restToken: string,
    windowMs: number,
    maxRequests: number,
    fallback?: InMemoryRateLimiterStore,
  ) {
    this.restUrl = restUrl.replace(/\/+$/, "");
    this.restToken = restToken;
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.fallback = fallback ?? new InMemoryRateLimiterStore(windowMs, maxRequests);
  }

  async check(key: string, now = Date.now()): Promise<RateLimitResult> {
    try {
      const redisKey = `ratelimit:${key}`;
      const response = await fetch(`${this.restUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.restToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["PTTL", redisKey],
        ]),
        signal: AbortSignal.timeout(3000),
      });

      if (!response.ok) {
        return this.fallback.check(key, now);
      }

      const results = (await response.json()) as Array<{ result: number }>;
      const count = Number(results[0]?.result ?? 1);
      let ttlMs = Number(results[1]?.result ?? -1);

      if (ttlMs <= 0) {
        await fetch(`${this.restUrl}/pexpire/${encodeURIComponent(redisKey)}/${this.windowMs}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${this.restToken}` },
          signal: AbortSignal.timeout(2000),
        }).catch(() => {});
        ttlMs = this.windowMs;
      }

      const resetAt = now + ttlMs;
      if (count > this.maxRequests) {
        return { limited: true, remaining: 0, resetAt };
      }

      return {
        limited: false,
        remaining: Math.max(0, this.maxRequests - count),
        resetAt,
      };
    } catch {
      // Gracefully fall back to local in-memory store upon network failure
      return this.fallback.check(key, now);
    }
  }
}

/**
 * Creates a rate limiter instance.
 * Automatically uses DistributedRedisRateLimiterStore if UPSTASH_REDIS_REST_URL/TOKEN
 * or KV_REST_API_URL/TOKEN are provided in the environment; otherwise falls back to
 * an in-memory sliding fixed-window limiter.
 */
export function createRateLimiter({
  windowMs,
  maxRequests,
  maxKeys = 10_000,
  store,
}: RateLimiterOptions) {
  let activeStore = store;

  if (!activeStore) {
    const redisUrl =
      process.env.UPSTASH_REDIS_REST_URL?.trim() ||
      process.env.KV_REST_API_URL?.trim();
    const redisToken =
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
      process.env.KV_REST_API_TOKEN?.trim();

    if (redisUrl && redisToken) {
      activeStore = new DistributedRedisRateLimiterStore(
        redisUrl,
        redisToken,
        windowMs,
        maxRequests,
        new InMemoryRateLimiterStore(windowMs, maxRequests, maxKeys),
      );
    } else {
      activeStore = new InMemoryRateLimiterStore(windowMs, maxRequests, maxKeys);
    }
  }

  return {
    async check(key: string, now = Date.now()): Promise<RateLimitResult> {
      return activeStore!.check(key, now);
    },
  };
}
