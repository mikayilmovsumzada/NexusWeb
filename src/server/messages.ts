import { createHash } from "node:crypto";
import { db, kvGet } from "./db";
import { contactContent as en } from "@/content/en/contact";
import { contactContent as az } from "@/content/az/contact";

export type Message = {
  id: number;
  created_at: number;
  name: string;
  email: string;
  topic: string;
  message: string;
  locale: string;
  sender_hash: string;
  read_at: number | null;
};

const TOPICS = new Set<string>([...en.form.topics, ...az.form.topics]);
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
// Control characters except tab/newline are stripped from stored text.
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const LIMITS = { name: 120, email: 200, message: 4000 } as const;

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.replace(CONTROL_RE, "").replace(/\r\n?/g, "\n").trim();
  if (!text || text.length > max) return null;
  return text;
}

export type MessageInput = { name: string; email: string; topic: string; message: string; locale: "en" | "az" };

/** Validates untrusted form data. Returns null when anything is missing or out of bounds. */
export function parseMessage(body: Record<string, unknown>): MessageInput | null {
  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);
  const topic = typeof body.topic === "string" && TOPICS.has(body.topic) ? body.topic : en.form.topics[0];
  const locale = body.locale === "az" ? "az" : "en";
  if (!name || !email || !message || !EMAIL_RE.test(email)) return null;
  return { name, email, topic, message, locale };
}

/** Pseudonymous sender id (salted IP hash) so repeated senders can be spotted without storing IPs. */
function senderHash(ip: string): string {
  return createHash("sha256").update(`${kvGet("sender_salt")}:${ip}`).digest("hex").slice(0, 12);
}

export function saveMessage(input: MessageInput, ip: string): void {
  db()
    .prepare(
      "INSERT INTO messages (created_at, name, email, topic, message, locale, sender_hash) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .run(Date.now(), input.name, input.email, input.topic, input.message, input.locale, senderHash(ip));
}

export function listMessages(filter: "all" | "unread"): Message[] {
  const where = filter === "unread" ? "WHERE read_at IS NULL" : "";
  return db().prepare(`SELECT * FROM messages ${where} ORDER BY created_at DESC LIMIT 500`).all() as Message[];
}

export function countMessages(): { total: number; unread: number } {
  return db()
    .prepare("SELECT COUNT(*) AS total, COALESCE(SUM(read_at IS NULL), 0) AS unread FROM messages")
    .get() as { total: number; unread: number };
}

export function setRead(id: number, read: boolean): void {
  db().prepare("UPDATE messages SET read_at = ? WHERE id = ?").run(read ? Date.now() : null, id);
}

export function deleteMessage(id: number): void {
  db().prepare("DELETE FROM messages WHERE id = ?").run(id);
}

/** Messages stored in the last 24 hours, used as a global flood guard. */
export function messagesToday(): number {
  const row = db().prepare("SELECT COUNT(*) AS n FROM messages WHERE created_at > ?").get(Date.now() - 86_400_000) as { n: number };
  return row.n;
}
