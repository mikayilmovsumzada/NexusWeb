/**
 * Shared content types.
 *
 * All user-facing copy lives in `src/content/*` as typed data, separate from the
 * components that render it. To add Azerbaijani later, create parallel modules
 * (e.g. `src/content/az/…`) that satisfy these same types and select them by
 * locale — no component changes required.
 */

/** Honest status vocabulary used everywhere a feature, product or initiative is shown. */
export type Status = "live" | "in-development" | "planned" | "exploring" | "forming";

export type TechCategory =
  | "Artificial Intelligence"
  | "Cybersecurity"
  | "Software Development"
  | "Developer Productivity"
  | "Privacy"
  | "Technology Education";

export type Accent = "pulse" | "violet" | "signal";

export type IconName =
  | "boxes"
  | "graduation"
  | "users"
  | "shield"
  | "brain"
  | "code"
  | "workflow"
  | "eye-off"
  | "lock"
  | "radar"
  | "layers"
  | "book"
  | "flask"
  | "terminal"
  | "git"
  | "message"
  | "compass"
  | "sparkles"
  | "rocket"
  | "lightbulb"
  | "mail"
  | "handshake";

export type Product = {
  slug: string;
  name: string;
  /** One-line value proposition. */
  tagline: string;
  description: string;
  status: Status;
  categories: TechCategory[];
  href: string;
  repositoryUrl?: string;
  featured?: boolean;
};

export type Feature = {
  icon: IconName;
  title: string;
  body: string;
};
