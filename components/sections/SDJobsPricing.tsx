import { Eyebrow } from "@/components/ui/Eyebrow";
import { BracketLink } from "@/components/ui/BracketLink";
import { cn } from "@/lib/cn";

const FEATURES = [
  { label: "Free", title: "Free job posting", body: "1 active job slot, no credit card required." },
  { label: "ATS", title: "ATS pipeline", body: "Kanban pipeline from applied to hired. Built-in." },
  { label: "AI Top Match", title: "AI top match", body: "Selang AI scores every applicant against your requirements." },
];

const ROWS: { label: string; sd: boolean; other: boolean; body: string }[] = [
  {
    label: "Applicant Vetting",
    sd: true,
    other: false,
    body: "We rigorously vet applicants through deep analysis of GitHub proof-of-work, community rapport, and guild activity.",
  },
  {
    label: "AI Matching",
    sd: true,
    other: false,
    body: "Selang AI actively scores and matches applicant skills against your exact job requirements.",
  },
  {
    label: "Scorecard Transparency",
    sd: true,
    other: false,
    body: "Opt-in candidate scorecards are fully visible, allowing for a transparent and frictionless screening process.",
  },
  {
    label: "Free Tier Available",
    sd: true,
    other: false,
    body: "Post your first job absolutely free, no credit card required.",
  },
];

export function SDJobsPricing() {
  return (
    <section id="sd-jobs" className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow>&lt;sd jobs&gt;</Eyebrow>
        <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong max-w-3xl">
          ## Hire Malaysia&apos;s Best Builders
        </h2>
        <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
          Post your first job free. Upgrade when you need more. Free premium features until 29th May 2026.
          Sign up now to enjoy up to 10x job posting for free.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 hover:border-sd-neon/60 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft border border-sd-wine-500/40 rounded-full px-2.5 py-1">
                {f.label}
              </span>
              <h3 className="mt-4 font-pixel uppercase text-2xl text-sd-ink-strong">{f.title}</h3>
              <p className="mt-2 text-sm text-sd-ink-soft/80">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-sd-wine-500/30 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr] font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft bg-sd-bg-2/60 px-5 py-3 border-b border-sd-wine-500/30">
            <span>Feature</span>
            <span className="text-center">SelaDevs</span>
            <span className="text-center">Other Boards</span>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className={cn(
                "grid grid-cols-[1.4fr_0.6fr_0.6fr] px-5 py-4 text-sm items-start gap-4",
                i < ROWS.length - 1 && "border-b border-sd-wine-500/15"
              )}
            >
              <div>
                <p className="font-semibold text-sd-ink-strong">{r.label}</p>
                <p className="text-xs text-sd-ink-soft/60 mt-1">{r.body}</p>
              </div>
              <Cell on={r.sd} />
              <Cell on={r.other} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/hire/register"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sd-ink-strong bg-sd-wine-700/60 border border-sd-neon/60 rounded-md px-4 py-2 hover:shadow-[0_0_20px_rgba(255,45,85,0.55)] transition-shadow"
          >
            [ claim offer &gt; ]
          </a>
          <BracketLink href="/hire/register">[&gt; register your company free]</BracketLink>
          <BracketLink href="/pricing">[&gt; see pricing]</BracketLink>
        </div>
      </div>
    </section>
  );
}

function Cell({ on }: { on: boolean }) {
  return (
    <div className="grid place-items-center">
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-md border",
          on
            ? "text-sd-neon border-sd-neon/50 bg-sd-neon/10"
            : "text-sd-ink-soft/50 border-sd-wine-500/30"
        )}
      >
        {on ? "yes" : "no"}
      </span>
    </div>
  );
}
