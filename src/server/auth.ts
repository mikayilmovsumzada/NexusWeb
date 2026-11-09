/**
 * Admin authentication: password (scrypt) + time-based one-time code (TOTP, RFC 6238),
 * database-backed sessions, login throttling and an optional IP allowlist.
 *
 * Configuration (server-only environment variables, never NEXT_PUBLIC_):
 *   ADMIN_PASSWORD_HASH   scrypt:<N>:<r>:<p>:<salt>:<hash>   (create with `npm run admin:setup`)
 *   ADMIN_TOTP_SECRET     base32 secret for an authenticator app
 *   ADMIN_ALLOWED_IPS     optional comma-separated IPs; requires TRUST_PROXY=1
 * When the password hash or TOTP secret is missing, the admin area does not exist (404).
 */

import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { db, kvGet, kvSet } from "./db";

export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_IP = 5;
const MAX_FAILURES_GLOBAL = 25;
const MAX_SESSIONS = 5;

export const SESSION_COOKIE = process.env.NODE_ENV === "production" ? "__Host-nw_admin" : "nw_admin";

export function adminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH?.trim() && process.env.ADMIN_TOTP_SECRET?.trim());
}

/** IP allowlist. Empty list = any IP may reach the login page. */
export function ipAllowed(ip: string): boolean {
  const list = (process.env.ADMIN_ALLOWED_IPS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length === 0 || list.includes(ip);
}

/* ---------------------------------------------------------------- password */

function scryptAsync(password: string, salt: Buffer, keylen: number, N: number, r: number, p: number): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, keylen, { N, r, p, maxmem: 256 * N * r }, (err, key) => (err ? reject(err) : resolve(key))),
  );
}

// Used when the configured hash is malformed so a failed login still costs the same time.
const DUMMY = "scrypt:32768:8:1:AAAAAAAAAAAAAAAAAAAAAA:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

async function verifyPassword(password: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD_HASH?.trim() ?? "";
  const parts = (/^scrypt:\d+:\d+:\d+:[\w-]+:[\w-]+$/.test(stored) ? stored : DUMMY).split(":");
  const [N, r, p] = parts.slice(1, 4).map(Number);
  const salt = Buffer.from(parts[4], "base64url");
  const expected = Buffer.from(parts[5], "base64url");
  try {
    const actual = await scryptAsync(password.normalize("NFC"), salt, expected.length, N, r, p);
    return stored === parts.join(":") && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------- TOTP */

function base32Decode(input: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of input.toUpperCase().replace(/[\s=]/g, "")) {
    const idx = alphabet.indexOf(ch);
    if (idx < 0) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

function totpAt(secret: Buffer, step: number): string {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));
  const hmac = createHmac("sha1", secret).update(counter).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return code.toString().padStart(6, "0");
}

/** Accepts the current code ±30 s. Each code works only once (replay protection). */
function verifyTotp(code: string): boolean {
  const secret = base32Decode(process.env.ADMIN_TOTP_SECRET ?? "");
  if (secret.length < 10 || !/^\d{6}$/.test(code)) return false;
  const now = Math.floor(Date.now() / 30_000);
  const lastUsed = Number(kvGet("totp_last_step") ?? "0");
  for (const step of [now - 1, now, now + 1]) {
    const candidate = Buffer.from(totpAt(secret, step));
    if (timingSafeEqual(candidate, Buffer.from(code)) && step > lastUsed) {
      kvSet("totp_last_step", String(step));
      return true;
    }
  }
  return false;
}

/* --------------------------------------------------------------- throttling */

export function loginLocked(ip: string): boolean {
  const since = Date.now() - FAILURE_WINDOW_MS;
  const d = db();
  d.prepare("DELETE FROM login_failures WHERE at <= ?").run(since);
  const perIp = d.prepare("SELECT COUNT(*) AS n FROM login_failures WHERE ip = ? AND at > ?").get(ip, since) as { n: number };
  const global = d.prepare("SELECT COUNT(*) AS n FROM login_failures WHERE at > ?").get(since) as { n: number };
  return perIp.n >= MAX_FAILURES_PER_IP || global.n >= MAX_FAILURES_GLOBAL;
}

function recordFailure(ip: string) {
  db().prepare("INSERT INTO login_failures (ip, at) VALUES (?, ?)").run(ip, Date.now());
}

/* ----------------------------------------------------------------- sessions */

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export type LoginResult = { ok: true; token: string } | { ok: false; reason: "invalid" | "locked" };

export async function login(password: string, code: string, ip: string, userAgent: string): Promise<LoginResult> {
  if (loginLocked(ip)) return { ok: false, reason: "locked" };
  // The slow scrypt check always runs; the cheap code check only after a correct password,
  // so a wrong password can't burn a valid one-time code. Both failures look identical.
  const passwordOk = await verifyPassword(password.slice(0, 256));
  const codeOk = passwordOk && verifyTotp(code.replace(/\s/g, ""));
  if (!passwordOk || !codeOk) {
    recordFailure(ip);
    console.warn(`[admin] Failed login from ${ip}`);
    return { ok: false, reason: loginLocked(ip) ? "locked" : "invalid" };
  }

  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  const d = db();
  d.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").run(now);
  d.prepare("INSERT INTO admin_sessions (token_hash, created_at, expires_at, user_agent) VALUES (?, ?, ?, ?)").run(
    hashToken(token),
    now,
    now + SESSION_TTL_MS,
    userAgent.slice(0, 300),
  );
  // Keep only the newest few sessions.
  d.prepare(
    "DELETE FROM admin_sessions WHERE token_hash NOT IN (SELECT token_hash FROM admin_sessions ORDER BY created_at DESC LIMIT ?)",
  ).run(MAX_SESSIONS);
  d.prepare("DELETE FROM login_failures WHERE ip = ?").run(ip);
  console.info(`[admin] Login from ${ip}`);
  return { ok: true, token };
}

export function validSession(token: string | undefined): boolean {
  if (!adminEnabled() || !token || token.length > 100) return false;
  const row = db().prepare("SELECT expires_at FROM admin_sessions WHERE token_hash = ?").get(hashToken(token)) as
    | { expires_at: number }
    | undefined;
  return Boolean(row && row.expires_at > Date.now());
}

export function logout(token: string | undefined): void {
  if (token) db().prepare("DELETE FROM admin_sessions WHERE token_hash = ?").run(hashToken(token));
}

export function sessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
