"use client";

import { useId, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/ButtonBase";
import type { ContactFormStrings } from "@/content/en/contact";

type Status = "idle" | "sending" | "sent" | "missing" | "rateLimited" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form. Posts to /api/contact, which stores the message for the
 * team's private admin inbox. No email is sent and no third party is involved.
 */
export function ContactForm({ t }: { t: ContactFormStrings }) {
  const id = useId();
  const params = useParams<{ locale?: string }>();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? t.topics[0]),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
      locale: params.locale === "az" ? "az" : "en",
    };

    if (!payload.name || !payload.message || !EMAIL_RE.test(payload.email)) {
      setStatus("missing");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus(res.status === 429 ? "rateLimited" : res.status === 400 ? "missing" : "failed");
      }
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-emerald-400/30 bg-emerald-400/10 p-6">
        <p className="flex items-start gap-3 text-sm leading-relaxed text-text">
          <CheckCircle2 aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-emerald-300 light:text-emerald-600" />
          {t.sent}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-pulse-300 underline-offset-4 hover:underline"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block w-full rounded-xl border border-line-strong bg-ink-950/60 px-4 py-3 text-sm text-text placeholder:text-subtle transition-colors focus:border-pulse-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-pulse-400";
  const message =
    status === "missing" ? t.missing : status === "rateLimited" ? t.rateLimited : status === "failed" ? t.failed : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-how`} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-text">
            {t.name}
          </label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required maxLength={120} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-text">
            {t.email}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            aria-describedby={`${id}-email-hint`}
            className={field}
          />
          <p id={`${id}-email-hint`} className="mt-1.5 text-xs text-subtle">
            {t.emailHint}
          </p>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-topic`} className="text-sm font-medium text-text">
          {t.topic}
        </label>
        <select id={`${id}-topic`} name="topic" className={field} defaultValue={t.topics[0]}>
          {t.topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-medium text-text">
          {t.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          maxLength={4000}
          className={`${field} resize-y`}
          placeholder={t.placeholder}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="min-h-5 text-sm">
        {message && <p className="text-amber-300 light:text-amber-700">{message}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          <Send aria-hidden="true" size={16} /> {status === "sending" ? t.sending : t.submit}
        </Button>
        <p id={`${id}-how`} className="text-xs leading-relaxed text-subtle">
          {t.how}
        </p>
      </div>
    </form>
  );
}
