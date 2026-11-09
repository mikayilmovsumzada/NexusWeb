/**
 * Request helpers shared by the contact API, the admin API and the proxy.
 */

/**
 * The visitor's IP address.
 *
 * Next.js doesn't expose the socket address, so in production the site must run
 * behind a reverse proxy (nginx/Caddy) that overwrites `X-Real-IP`, and Next
 * must listen on 127.0.0.1 only so nobody can reach it around the proxy.
 * Set `TRUST_PROXY=1` to read that header. Without it every visitor is "unknown",
 * which keeps rate limits global and makes an IP allowlist deny everyone (fail closed).
 */
export function clientIp(headers: Headers): string {
  if (process.env.TRUST_PROXY?.trim() !== "1") return "unknown";
  const ip = headers.get("x-real-ip")?.trim();
  return ip && ip.length <= 64 ? ip : "unknown";
}

/**
 * True when a state-changing request comes from this site's own pages.
 * Browsers always send `Origin` on POST; a missing or foreign origin is rejected.
 */
export function isSameOrigin(headers: Headers): boolean {
  const site = headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = headers.get("origin");
  const host = (process.env.TRUST_PROXY?.trim() === "1" && headers.get("x-forwarded-host")) || headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Fixed-window in-memory rate limiter (single process). */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

/** 303 redirect with a relative Location, so it works unchanged behind a reverse proxy. */
export function seeOther(path: string): Response {
  return new Response(null, { status: 303, headers: { Location: path, "Cache-Control": "no-store" } });
}
