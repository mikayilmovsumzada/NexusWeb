/**
 * Server-only SQLite storage (Node's built-in `node:sqlite`, no native add-on).
 *
 * Holds contact-form messages and admin sessions. The database file lives in
 * `NEXUSWEB_DATA_DIR` (default: `./data`), which is git-ignored. Never import
 * this module from a client component.
 */

import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

const globalForDb = globalThis as unknown as { __nexuswebDb?: DatabaseSync };

function open(): DatabaseSync {
  // turbopackIgnore: a runtime data folder, not something the build should trace into the server bundle.
  const dir = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.NEXUSWEB_DATA_DIR?.trim() || "data");
  mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, "nexusweb.db"));
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS messages (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at  INTEGER NOT NULL,
      name        TEXT    NOT NULL,
      email       TEXT    NOT NULL,
      topic       TEXT    NOT NULL,
      message     TEXT    NOT NULL,
      locale      TEXT    NOT NULL,
      sender_hash TEXT    NOT NULL,
      read_at     INTEGER
    );
    CREATE INDEX IF NOT EXISTS messages_created ON messages (created_at DESC);

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      user_agent TEXT
    );

    CREATE TABLE IF NOT EXISTS login_failures (
      ip TEXT    NOT NULL,
      at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS login_failures_at ON login_failures (at);

    CREATE TABLE IF NOT EXISTS kv (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
  db.prepare("INSERT OR IGNORE INTO kv (key, value) VALUES ('sender_salt', ?)").run(randomBytes(32).toString("hex"));
  return db;
}

export function db(): DatabaseSync {
  globalForDb.__nexuswebDb ??= open();
  return globalForDb.__nexuswebDb;
}

export function kvGet(key: string): string | undefined {
  const row = db().prepare("SELECT value FROM kv WHERE key = ?").get(key) as { value: string } | undefined;
  return row?.value;
}

export function kvSet(key: string, value: string): void {
  db().prepare("INSERT INTO kv (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(key, value);
}
