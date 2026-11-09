import { Suspense } from "react";
import { Lock } from "lucide-react";

const errors: Record<string, string> = {
  invalid: "Parol və ya kod yanlışdır.",
  locked: "Çox sayda uğursuz cəhd. 15 dəqiqə sonra yenidən yoxlayın.",
};

async function Notice({ searchParams }: { searchParams: PageProps<"/admin/login">["searchParams"] }) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? errors[sp.error] : undefined;
  if (error) return <p role="alert" className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">{error}</p>;
  if (sp.signedOut) return <p role="status" className="rounded-lg border border-line bg-white/5 px-4 py-3 text-sm text-muted">Çıxış etdiniz.</p>;
  return null;
}

export default function AdminLoginPage(props: PageProps<"/admin/login">) {
  const field =
    "mt-2 block w-full rounded-xl border border-line-strong bg-ink-900 px-4 py-3 text-sm text-text focus:border-pulse-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-pulse-400";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-line bg-ink-900/80 p-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-pulse-500/15 text-pulse-300">
            <Lock aria-hidden="true" size={18} />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">Admin girişi</h1>
            <p className="text-xs text-subtle">NexusWeb · müraciətlər</p>
          </div>
        </div>

        <div className="mt-6 empty:hidden">
          <Suspense>
            <Notice searchParams={props.searchParams} />
          </Suspense>
        </div>

        <form method="post" action="/api/admin/login" className="mt-6 space-y-5">
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Parol
            </label>
            <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={256} className={field} />
          </div>
          <div>
            <label htmlFor="code" className="text-sm font-medium">
              Autentifikator kodu
            </label>
            <input
              id="code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9 ]{6,7}"
              maxLength={7}
              required
              className={`${field} font-mono tracking-[0.3em]`}
            />
            <p className="mt-1.5 text-xs text-subtle">Authenticator tətbiqindəki 6 rəqəmli kod.</p>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-pulse-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-pulse-400"
          >
            Daxil ol
          </button>
        </form>
      </div>
    </main>
  );
}
