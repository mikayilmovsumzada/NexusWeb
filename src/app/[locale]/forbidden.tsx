import type { Metadata } from "next";
import { getContent } from "@/i18n/server";
import { StatusPage } from "@/components/sections/StatusPage";

export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getContent();
  return { title: ui.forbidden.metaTitle, robots: { index: false } };
}

/** Rendered with HTTP 403 whenever forbidden() is called inside a locale (see ./access-denied). */
export default async function Forbidden() {
  const t = (await getContent()).ui.forbidden;
  return (
    <StatusPage
      kicker={t.kicker}
      title={t.title}
      body={t.body}
      primary={{ href: "/", label: t.home }}
      secondary={{ href: "/contact", label: t.contact }}
    />
  );
}
