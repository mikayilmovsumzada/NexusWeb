"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/ButtonBase";
import type { ContactFormStrings } from "@/content/en/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "missing" | "missingCourse" | "rateLimited" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "#enroll" or "#enroll-<course>" in the URL pre-selects course enrolment (links from /learn). */
const ENROLL_HASH = /^#enroll(?:-([a-z]+))?$/;

/**
 * Contact form. Posts to /api/contact, which stores the message for the
 * team's private admin inbox. No email is sent and no third party is involved.
 */
export function ContactForm({ t }: { t: ContactFormStrings }) {
  const id = useId();
  const params = useParams<{ locale?: string }>();
  const [status, setStatus] = useState<Status>("idle");
  const enrollTopic = t.enroll.label;
  const courseIds = Object.keys(t.enroll.courses) as Array<keyof typeof t.enroll.courses>;
  const [topic, setTopic] = useState<string>(t.topics[0]);
  const [course, setCourse] = useState<string>("");
  const enrolling = topic === enrollTopic;

  useEffect(() => {
    const apply = () => {
      const m = ENROLL_HASH.exec(window.location.hash);
      if (!m) return;
      setTopic(enrollTopic);
      if (m[1] && (courseIds as string[]).includes(m[1])) setCourse(m[1]);
      // After Next.js has finished its own navigation scroll.
      window.setTimeout(() => document.getElementById("form")?.scrollIntoView({ behavior: "instant", block: "start" }), 150);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic,
      course: enrolling ? course : undefined,
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
      locale: params.locale === "az" ? "az" : "en",
    };

    if (!payload.name || !payload.message || !EMAIL_RE.test(payload.email)) {
      setStatus("missing");
      return;
    }
    if (enrolling && !course) {
      setStatus("missingCourse");
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
        setTopic(t.topics[0]);
        setCourse("");
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
    status === "missing" ? t.missing : status === "missingCourse" ? t.enroll.missingCourse : status === "rateLimited" ? t.rateLimited : status === "failed" ? t.failed : null;

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
      <fieldset>
        <legend className="text-sm font-medium text-text">{t.topic}</legend>

        {/* Course enrolment: highlighted on purpose, it is the main action for students. */}
        <label
          className={cn(
            "mt-3 flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pulse-400",
            enrolling
              ? "border-pulse-400 bg-gradient-to-br from-pulse-500/25 to-violet-500/20 shadow-[0_8px_30px_-12px_rgb(58_123_255/0.7)]"
              : "border-pulse-400/40 bg-gradient-to-br from-pulse-500/10 to-violet-500/10 hover:border-pulse-400/80",
          )}
        >
          <input
            type="radio"
            name="topic"
            value={enrollTopic}
            checked={enrolling}
            onChange={() => setTopic(enrollTopic)}
            className="sr-only"
          />
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pulse-500 text-white shadow-[0_0_0_1px_rgb(92_157_255/0.5)]">
            <GraduationCap aria-hidden="true" size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-display text-lg font-semibold text-text">{enrollTopic}</span>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-emerald-300">
                {t.enroll.badge}
              </span>
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">{t.enroll.hint}</span>
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
              enrolling ? "border-pulse-300 bg-pulse-400" : "border-line-strong",
            )}
          >
            {enrolling && <span className="size-2 rounded-full bg-white" />}
          </span>
        </label>

        <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-subtle">{t.otherTopics}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.topics.map((option) => (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pulse-400",
                topic === option
                  ? "border-pulse-400/70 bg-pulse-500/15 text-text"
                  : "border-line-strong text-muted hover:border-pulse-400/50 hover:text-text",
              )}
            >
              <input
                type="radio"
                name="topic"
                value={option}
                checked={topic === option}
                onChange={() => setTopic(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {enrolling && (
        <div>
          <label htmlFor={`${id}-course`} className="text-sm font-medium text-text">
            {t.enroll.course}
          </label>
          <select
            id={`${id}-course`}
            name="course"
            required
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={field}
          >
            <option value="" disabled>
              —
            </option>
            {courseIds.map((cid) => (
              <option key={cid} value={cid}>
                {t.enroll.courses[cid]}
              </option>
            ))}
          </select>
        </div>
      )}
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
          placeholder={enrolling ? t.enroll.placeholder : t.placeholder}
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
          <Send aria-hidden="true" size={16} className="shrink-0" /> {status === "sending" ? t.sending : t.submit}
        </Button>
        <p id={`${id}-how`} className="text-xs leading-relaxed text-subtle">
          {t.how}
        </p>
      </div>
    </form>
  );
}
