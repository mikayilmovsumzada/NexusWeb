import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale } from "@/i18n/config";
import { SESSION_COOKIE, adminEnabled, ipAllowed, validSession } from "@/server/auth";
import { clientIp } from "@/server/request";

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function plain(status: 403 | 404) {
  return new NextResponse(status === 403 ? "403 Forbidden" : "404 Not Found", {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...PRIVATE_HEADERS },
  });
}

/**
 * Admin area gate (/admin, /api/admin).
 * - Admin not configured            → 404 (the area doesn't exist).
 * - IP not in ADMIN_ALLOWED_IPS      → 403 everywhere, login page included.
 * - No valid session                 → 403, except the login page and login endpoint.
 * Pages and API handlers check the session again themselves.
 */
function guardAdmin(request: NextRequest, pathname: string) {
  if (!adminEnabled()) return plain(404);
  if (!ipAllowed(clientIp(request.headers))) return plain(403);

  const loggedIn = validSession(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/admin/login" || pathname === "/api/admin/login";
  if (!loggedIn && !isLogin) return plain(403);
  if (loggedIn && pathname === "/admin/login") {
    return new NextResponse(null, { status: 303, headers: { Location: "/admin", ...PRIVATE_HEADERS } });
  }

  const res = NextResponse.next();
  for (const [k, v] of Object.entries(PRIVATE_HEADERS)) res.headers.set(k, v);
  return res;
}

/**
 * Locale routing.
 * - "/az/..."  → served as-is (Azerbaijani).
 * - "/en/..."  → redirected to the unprefixed URL (English is canonical without a prefix).
 * - "/..."     → English, rewritten internally to "/en/...". If the visitor has explicitly
 *                chosen Azerbaijani before (cookie), they are redirected to "/az/...".
 * The default language is never guessed from Accept-Language: English stays the primary site.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "admin" || pathname === "/api/admin" || pathname.startsWith("/api/admin/")) {
    return guardAdmin(request, pathname.replace(/\/+$/, "") || "/");
  }
  if (first === "api") return NextResponse.next();

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale(first)) return NextResponse.next();

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(preferred) && preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (icons, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
