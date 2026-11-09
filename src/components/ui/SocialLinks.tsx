import { siteConfig, type SocialLink } from "@/config/site";
import { getContent } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { GitHubIcon } from "./Icon";

/**
 * Renders only social profiles that are configured via environment variables.
 * `includeRepository` adds the ContextPulse AI repository, which is always real.
 */
export async function SocialLinks({ className, includeRepository = false }: { className?: string; includeRepository?: boolean }) {
  const { ui } = await getContent();
  const links: Array<SocialLink | { id: "repo"; label: string; href: string }> = [...siteConfig.social];
  if (includeRepository && !links.some((l) => l.href === siteConfig.contextPulse.repositoryUrl)) {
    links.unshift({ id: "repo", label: ui.common.repoLabel, href: siteConfig.contextPulse.repositoryUrl });
  }
  if (links.length === 0) return null;

  return (
    <ul role="list" className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            {(link.id === "github" || link.id === "repo") && <GitHubIcon size={14} />}
            {link.label}
            <span className="sr-only"> {ui.common.opensNewTab}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
