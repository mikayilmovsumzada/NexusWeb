import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getContent } from "@/i18n/server";
import { LocaleLink } from "@/i18n/LocaleLink";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./ButtonBase";

export { Button, buttonClasses } from "./ButtonBase";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Renders an arrow that nudges on hover. External links get an "up-right" arrow. */
  arrow?: boolean;
};

function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}

/** Server Component link-button. Internal hrefs are localised automatically. */
export async function ButtonLink({ href, children, variant = "primary", size = "md", className, arrow = false }: ButtonLinkProps) {
  const external = isExternal(href);
  const ArrowIcon = external ? ArrowUpRight : ArrowRight;
  const newTab = external && !href.startsWith("mailto:");
  const { ui } = await getContent();

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowIcon
          aria-hidden="true"
          size={16}
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px"
        />
      )}
      {newTab && <span className="sr-only"> {ui.common.opensNewTab}</span>}
    </>
  );

  if (external) {
    return (
      <a href={href} className={buttonClasses(variant, size, className)} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <LocaleLink href={href} className={buttonClasses(variant, size, className)}>
      {content}
    </LocaleLink>
  );
}
