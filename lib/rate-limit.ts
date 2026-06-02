/**
 * Best-effort in-memory rate limiter.
 *
 * NOTE: On serverless (Vercel) this state lives in one warm instance and resets
 * on cold start, so it is defense-in-depth — a backstop, not a hard guarantee.
 * It still blunts single-instance bursts and caps how fast one instance can
 * drain the Resend monthly quota or flood the inbox. For strict, distributed
 * limits, layer Vercel WAF or Upstash Redis on top — see HOSTING.md.
 */

interface Window {
  count: number;
  resetAt: number; // epoch ms when this window expires
}

export interface RateLimitConfig {
  /** Max allowed hits within the window. */
  max: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets (0 when allowed). */
  retryAfterSeconds: number;
}

const store = new Map<string, Window>();
let nextSweep = 0;

/** Drop expired windows periodically so the Map can't grow without bound. */
function sweep(now: number): void {
  if (now < nextSweep) return;
  for (const [key, win] of store) {
    if (now >= win.resetAt) store.delete(key);
  }
  nextSweep = now + 5 * 60 * 1000;
}

/**
 * Record one hit against `key` and report whether it is allowed. Uses a
 * fixed-window counter — simple, allocation-light, and good enough for a
 * low-traffic marketing form.
 */
export function consume(
  key: string,
  config: RateLimitConfig,
  now: number = Date.now()
): RateLimitResult {
  sweep(now);
  const win = store.get(key);

  if (!win || now >= win.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (win.count >= config.max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((win.resetAt - now) / 1000),
    };
  }

  store.set(key, { count: win.count + 1, resetAt: win.resetAt });
  return { allowed: true, retryAfterSeconds: 0 };
}
