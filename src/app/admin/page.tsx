import { Suspense } from "react";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { LogOut, Mail, Trash2 } from "lucide-react";
import { CopyEmail } from "@/components/admin/CopyEmail";
import { SESSION_COOKIE, validSession } from "@/server/auth";
import { countMessages, listMessages, type Message } from "@/server/messages";

const dateFmt = new Intl.DateTimeFormat("az-AZ", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Baku",
});

const replySubject = (m: Message) => `Re: [NexusWeb] ${m.topic}`;

/** Original message quoted below the reply (shortened so the URL stays within browser limits). */
function replyBody(m: Message) {
  const original = m.message.length > 1500 ? `${m.message.slice(0, 1500)}…` : m.message;
  const quoted = original
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
  return `\n\n\n${dateFmt.format(m.created_at)}, ${m.name} yazıb:\n${quoted}`;
}

/** Opens Gmail's compose window in the browser: no email app needed. */
function gmailHref(m: Message) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: m.email, su: replySubject(m), body: replyBody(m) });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Opens the computer's default email app (Outlook, Mail…), if one is set up. */
function mailtoHref(m: Message) {
  const params = new URLSearchParams({ subject: replySubject(m), body: replyBody(m) });
  return `mailto:${encodeURIComponent(m.email).replace(/%40/g, "@")}?${params.toString().replace(/\+/g, "%20")}`;
}

function ActionButton({ id, action, filter, children, danger }: { id: number; action: string; filter: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <form method="post" action="/api/admin/messages">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="action" value={action} />
      <input type="hidden" name="filter" value={filter} />
      <button
        type="submit"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
          danger
            ? "border-red-400/30 text-red-300 hover:bg-red-400/10"
            : "border-line-strong text-muted hover:bg-white/5 hover:text-text"
        }`}
      >
        {children}
      </button>
    </form>
  );
}

async function Inbox({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  await connection(); // always rendered per request, never prerendered or cached
  // The proxy already blocks requests without a session; this is the second check.
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!validSession(token)) redirect("/admin/login");

  const sp = await searchParams;
  const filter = sp.filter === "unread" ? "unread" : "all";
  const messages = listMessages(filter);
  const counts = countMessages();

  const tab = (value: "all" | "unread", label: string) => (
    <a
      href={value === "all" ? "/admin" : "/admin?filter=unread"}
      aria-current={filter === value ? "page" : undefined}
      className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
        filter === value ? "bg-pulse-500 text-white" : "text-muted hover:bg-white/5 hover:text-text"
      }`}
    >
      {label}
    </a>
  );

  return (
    <>
      <nav aria-label="Filtr" className="mt-8 flex gap-2">
        {tab("all", `Hamısı (${counts.total})`)}
        {tab("unread", `Oxunmamış (${counts.unread})`)}
      </nav>

      {messages.length === 0 ? (
        <p className="mt-10 rounded-[var(--radius-card)] border border-dashed border-line-strong p-10 text-center text-sm text-muted">
          {filter === "unread" ? "Oxunmamış müraciət yoxdur." : "Hələ heç bir müraciət yoxdur."}
        </p>
      ) : (
        <ul role="list" className="mt-6 space-y-4">
          {messages.map((m) => {
            const unread = m.read_at === null;
            return (
              <li
                key={m.id}
                className={`rounded-[var(--radius-card)] border p-5 sm:p-6 ${
                  unread ? "border-pulse-400/40 bg-pulse-500/[0.06]" : "border-line bg-ink-900/60"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2">
                      {unread && <span className="size-2 rounded-full bg-pulse-400" aria-label="Oxunmamış" />}
                      <span className="font-medium text-text">{m.name}</span>
                      <a href={gmailHref(m)} target="_blank" rel="noopener noreferrer" className="break-all text-sm text-pulse-300 hover:underline">
                        {m.email}
                      </a>
                    </p>
                    <p className="mt-1 text-xs text-subtle">
                      {m.topic} · {dateFmt.format(m.created_at)} · {m.locale.toUpperCase()} · göndərən #{m.sender_hash}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={gmailHref(m)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-pulse-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-pulse-400"
                    >
                      <Mail aria-hidden="true" size={13} /> Gmail-də cavab yaz
                    </a>
                    <a
                      href={mailtoHref(m)}
                      title="Kompüterdə qurulmuş e-poçt proqramında aç (Outlook, Mail…)"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted transition-colors hover:bg-white/5 hover:text-text"
                    >
                      Mail proqramı
                    </a>
                    <CopyEmail email={m.email} />
                    <ActionButton id={m.id} action={unread ? "read" : "unread"} filter={filter}>
                      {unread ? "Oxundu" : "Oxunmamış et"}
                    </ActionButton>
                    <ActionButton id={m.id} action="delete" filter={filter} danger>
                      <Trash2 aria-hidden="true" size={13} /> Sil
                    </ActionButton>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-text">{m.message}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default function AdminPage(props: PageProps<"/admin">) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">NexusWeb admin</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Müraciətlər</h1>
        </div>
        <form method="post" action="/api/admin/logout">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text"
          >
            <LogOut aria-hidden="true" size={15} /> Çıxış
          </button>
        </form>
      </header>
      <Suspense fallback={<p className="mt-10 text-sm text-muted">Yüklənir…</p>}>
        <Inbox searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
