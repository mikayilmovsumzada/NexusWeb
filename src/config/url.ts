/**
 * Validation for externally configured URLs (environment variables).
 *
 * A link is only rendered when its URL passes these checks; otherwise the site
 * shows an "unavailable" state instead of sending visitors somewhere broken or unsafe.
 *
 * Rules:
 *  - Must parse as an absolute URL.
 *  - Scheme must be https:, or http: ONLY for local development hosts
 *    (localhost, 127.0.0.1, [::1], *.localhost) — never for public hosts.
 *  - No embedded credentials (https://user:pass@host).
 *  - Anything else (javascript:, data:, file:, ftp:, relative paths, typos) is rejected.
 */

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

export type UrlCheck = { ok: true; href: string } | { ok: false; reason: string };

export function checkExternalUrl(raw: string | undefined): UrlCheck {
  const value = raw?.trim();
  if (!value) return { ok: false, reason: "not set" };

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ok: false, reason: "not a valid absolute URL" };
  }

  const host = url.hostname.toLowerCase();
  const isLocal = LOCAL_HOSTS.has(host) || host.endsWith(".localhost");

  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocal)) {
    return {
      ok: false,
      reason:
        url.protocol === "http:"
          ? "plain http is only allowed for localhost; use https for public hosts"
          : `scheme "${url.protocol}" is not allowed (use https)`,
    };
  }
  if (url.username || url.password) return { ok: false, reason: "URLs with embedded credentials are not allowed" };

  return { ok: true, href: url.href };
}

/**
 * Returns the normalised URL, or undefined if it is missing/invalid.
 * Invalid (but present) values are reported once at build/server time so a
 * misconfiguration is visible in the logs instead of failing silently.
 */
export function safeExternalUrl(name: string, raw: string | undefined): string | undefined {
  const result = checkExternalUrl(raw);
  if (result.ok) return result.href;
  if (raw?.trim()) console.warn(`[config] Ignoring ${name}: ${result.reason}.`);
  return undefined;
}
