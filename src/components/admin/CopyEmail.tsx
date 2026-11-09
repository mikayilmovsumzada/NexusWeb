"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies a sender's address so it can be pasted into any webmail. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("E-poçt ünvanı:", email);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted transition-colors hover:bg-white/5 hover:text-text"
    >
      {copied ? <Check aria-hidden="true" size={13} /> : <Copy aria-hidden="true" size={13} />}
      <span aria-live="polite">{copied ? "Kopyalandı" : "E-poçtu kopyala"}</span>
    </button>
  );
}
