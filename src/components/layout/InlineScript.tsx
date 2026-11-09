"use client";

/**
 * Inline script that runs during HTML parsing (before first paint) on full page
 * loads. On the client React would otherwise warn about rendering a <script>;
 * using type="text/plain" there (and suppressing the mismatch) keeps it inert.
 * Pattern from the Next.js "Preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
