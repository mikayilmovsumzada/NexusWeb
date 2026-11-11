import type { Metadata } from "next";
import { getContent } from "@/i18n/server";
import { StatusPage } from "@/components/sections/StatusPage";

export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getContent();
  return { title: ui.notFound.metaTitle, robots: { index: false } };
}

export default async function NotFound() {
  const t = (await getContent()).ui.notFound;
  return (
    <StatusPage
      kicker={t.kicker}
      title={t.title}
      body={t.body}
      primary={{ href: "/", label: t.home }}
      secondary={{ href: "/products", label: t.products }}
    />
  );
}
