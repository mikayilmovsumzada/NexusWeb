import { env } from "cloudflare:workers";

/**
 * Server-only setting: a Worker secret or variable (`cf` secrets in production,
 * `.dev.vars` locally), falling back to process.env. Never use for NEXT_PUBLIC_ values.
 */
export function serverEnv(name: "ADMIN_PASSWORD_HASH" | "ADMIN_TOTP_SECRET" | "ADMIN_ALLOWED_IPS" | "TRUST_PROXY"): string {
  const value = (env as unknown as Record<string, unknown>)[name] ?? process.env[name];
  return typeof value === "string" ? value.trim() : "";
}
