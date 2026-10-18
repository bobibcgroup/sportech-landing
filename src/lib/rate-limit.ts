interface RateLimiterOptions {
  /** Max requests allowed per key within one window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Cap on tracked keys so spoofed IPs can't grow memory unbounded. */
  maxKeys?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets; 0 when allowed. */
  retryAfterSeconds: number;
}

interface WindowEntry {
  count: number;
  resetAt: number;
}

/**
 * Fixed-window in-memory rate limiter. Per-instance only: on serverless this
 * bounds abuse per warm instance rather than globally, which is enough to
 * stop floods against a low-volume endpoint without an external store.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: RateLimiterOptions) {
  const windows = new Map<string, WindowEntry>();

  function prune(now: number): void {
    for (const [key, entry] of windows) {
      if (now >= entry.resetAt) windows.delete(key);
    }
    // Still full after dropping expired windows — evict oldest-inserted keys.
    while (windows.size >= maxKeys) {
      const oldest = windows.keys().next().value;
      if (oldest === undefined) break;
      windows.delete(oldest);
    }
  }

  function check(key: string, now: number = Date.now()): RateLimitResult {
    const entry = windows.get(key);

    if (!entry || now >= entry.resetAt) {
      if (windows.size >= maxKeys) prune(now);
      windows.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (entry.count >= limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      };
    }

    windows.set(key, { count: entry.count + 1, resetAt: entry.resetAt });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { check };
}

/** First hop of x-forwarded-for (set by Vercel's edge), with fallbacks. */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}
