import { NextResponse, type NextRequest } from "next/server";
import { clientIp, isSameOrigin, rateLimit } from "@/server/request";
import { messagesToday, parseMessage, saveMessage } from "@/server/messages";

/**
 * Contact form endpoint. Stores the message for the admin inbox (/admin).
 * No email is sent. Defences: same-origin check, JSON-only, body size cap,
 * strict validation, honeypot field, per-IP and global rate limits.
 */

const MAX_BODY_BYTES = 16 * 1024;
const PER_IP_PER_HOUR = 5;
const GLOBAL_PER_DAY = 300;

function reply(status: number, error?: string) {
  return NextResponse.json(error ? { ok: false, error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request.headers)) return reply(403, "forbidden");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "invalid");

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reply(413, "invalid");

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply(400, "invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return reply(400, "invalid");
  }

  // Honeypot: a hidden field real visitors never fill. Pretend success so bots learn nothing.
  if (typeof body.website === "string" && body.website !== "") return reply(200);

  const input = parseMessage(body);
  if (!input) return reply(400, "invalid");

  const ip = clientIp(request.headers);
  if (!rateLimit(`contact:${ip}`, PER_IP_PER_HOUR, 3_600_000)) return reply(429, "rate_limited");
  if (messagesToday() >= GLOBAL_PER_DAY) return reply(429, "rate_limited");

  try {
    saveMessage(input, ip);
  } catch (error) {
    console.error("[contact] Could not store message:", error);
    return reply(500, "server");
  }
  return reply(200);
}
