/**
 * Central site configuration.
 *
 * Every external URL and contact detail lives here so it can be changed in one
 * place. Values come from `NEXT_PUBLIC_*` environment variables (see
 * `.env.example`). Anything left empty is simply not rendered — the site never
 * shows a placeholder link or a fake address. External URLs are validated by
 * `safeExternalUrl` (https only, http only for localhost; see ./url.ts).
 */

import { safeExternalUrl } from "./url";

function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export type SocialLink = {
  id: "github" | "linkedin" | "x" | "discord" | "youtube" | "instagram";
  label: string;
  href: string;
};

/** Published defaults. A matching NEXT_PUBLIC_* variable overrides each one. */
const defaults = {
  contactEmail: "movsumzademikayil@gmail.com",
  github: "https://github.com/mikayilmovsumzada",
  linkedin: "https://www.linkedin.com/in/mikay%C4%B1l-m%C3%B6vs%C3%BCmzad%C9%99-5b404538b/",
  instagram: "https://www.instagram.com/nexusweb.az/",
};

const socialCandidates: Array<{ id: SocialLink["id"]; label: string; href?: string }> = [
  { id: "github", label: "GitHub", href: safeExternalUrl("NEXT_PUBLIC_GITHUB_URL", process.env.NEXT_PUBLIC_GITHUB_URL) ?? defaults.github },
  { id: "linkedin", label: "LinkedIn", href: safeExternalUrl("NEXT_PUBLIC_LINKEDIN_URL", process.env.NEXT_PUBLIC_LINKEDIN_URL) ?? defaults.linkedin },
  { id: "x", label: "X", href: safeExternalUrl("NEXT_PUBLIC_X_URL", process.env.NEXT_PUBLIC_X_URL) },
  { id: "discord", label: "Discord", href: safeExternalUrl("NEXT_PUBLIC_DISCORD_URL", process.env.NEXT_PUBLIC_DISCORD_URL) },
  { id: "youtube", label: "YouTube", href: safeExternalUrl("NEXT_PUBLIC_YOUTUBE_URL", process.env.NEXT_PUBLIC_YOUTUBE_URL) },
  { id: "instagram", label: "Instagram", href: safeExternalUrl("NEXT_PUBLIC_INSTAGRAM_URL", process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? defaults.instagram },
];

export const siteConfig = {
  name: "NexusWeb",
  // Tagline and description are localised: see src/content/{en,az}/ui.ts
  url: stripTrailingSlash(env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000"),
  copyrightYear: 2026,

  /** Public contact address. When empty, the contact form is disabled and says so. */
  contactEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? defaults.contactEmail,

  /** Social profiles. Only configured ones are shown. */
  social: socialCandidates.filter((s): s is SocialLink => Boolean(s.href)),

  contextPulse: {
    /** Official repository (the old NeuroBridge-ContextPulse-AI URL redirects here). */
    repositoryUrl:
      safeExternalUrl("NEXT_PUBLIC_CONTEXTPULSE_REPO_URL", process.env.NEXT_PUBLIC_CONTEXTPULSE_REPO_URL) ??
      "https://github.com/mikayilmovsumzada/ContextPulse-AI",
    /**
     * Deployed ContextPulse AI application for the "Try Live Demo" button
     * (intended: https://contextpulse.nexusweb.az, once it is actually hosted).
     * Missing or invalid → the product page shows "Live demo not available yet".
     * Set it only when the deployment is live and reachable.
     */
    demoUrl: safeExternalUrl("NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL", process.env.NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL),
    /**
     * Optional external early-access form (e.g. a form service you control).
     * When empty, the beta section states that registration is not open yet.
     */
    betaSignupUrl: safeExternalUrl("NEXT_PUBLIC_CONTEXTPULSE_BETA_URL", process.env.NEXT_PUBLIC_CONTEXTPULSE_BETA_URL),
  },
} as const;

export function mailtoHref(subject: string, body?: string): string | undefined {
  if (!siteConfig.contactEmail) return undefined;
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  return `mailto:${siteConfig.contactEmail}?${params.toString().replace(/\+/g, "%20")}`;
}
