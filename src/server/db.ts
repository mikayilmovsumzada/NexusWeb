/**
 * Server-only storage on Cloudflare D1 (SQLite), bound as `DB` in cloudflare.config.ts.
 *
 * Holds contact-form messages and admin sessions. Locally, `npm run dev` runs the
 * Worker in workerd with a local D1 database under `.cloudflare/`; in production
 * Cloudflare provisions the database on first deploy. Never import this module from
 * a client component.
 */

import { env } from "cloudflare:workers";

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at  INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    topic       TEXT    NOT NULL,
    message     TEXT    NOT NULL,
    locale      TEXT    NOT NULL,
    sender_hash TEXT    NOT NULL,
    read_at     INTEGER
  )`,
  "CREATE INDEX IF NOT EXISTS messages_created ON messages (created_at DESC)",
  `CREATE TABLE IF NOT EXISTS admin_sessions (
    token_hash TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    user_agent TEXT
  )`,
  "CREATE TABLE IF NOT EXISTS login_failures (ip TEXT NOT NULL, at INTEGER NOT NULL)",
  "CREATE INDEX IF NOT EXISTS login_failures_at ON login_failures (at)",
  "CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL)",
];

function randomHex(bytes: number): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, "0")).join("");
}

let ready: Promise<void> | undefined;

/** Creates the tables once per Worker isolate (cheap no-op after the first deploy). */
function ensureSchema(database: D1Database): Promise<void> {
  ready ??= database
    .batch([
      ...SCHEMA.map((sql) => database.prepare(sql)),
      database.prepare("INSERT OR IGNORE INTO kv (key, value) VALUES ('sender_salt', ?)").bind(randomHex(32)),
    ])
    .then(() => undefined)
    .catch((error: unknown) => {
      ready = undefined; // retry on the next request
      throw error;
    });
  return ready;
}

/** The D1 database, with the schema guaranteed to exist. */
export async function db(): Promise<D1Database> {
  const database = env.DB;
  await ensureSchema(database);
  return database;
}

export async function kvGet(key: string): Promise<string | undefined> {
  const row = await (await db()).prepare("SELECT value FROM kv WHERE key = ?").bind(key).first<{ value: string }>();
  return row?.value;
}

export async function kvSet(key: string, value: string): Promise<void> {
  await (await db())
    .prepare("INSERT INTO kv (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .bind(key, value)
    .run();
}
