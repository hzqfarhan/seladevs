import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";
import { BOUNTIES } from "@/data/bounties";
import { BountyClaimButton } from "@/components/sections/bounty/BountyClaimButton";

export function generateStaticParams() {
  return BOUNTIES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = BOUNTIES.find((x) => x.slug === slug);
  if (!b) return { title: "not found" };
  return { title: b.title, description: b.description.slice(0, 160) };
}

const STEPS = ["open", "claimed", "submitted", "paid"] as const;

export default async function BountyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = BOUNTIES.find((x) => x.slug === slug);
  if (!b) notFound();
  const isClosing = b.status === "closing-soon";

  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-20 md:pt-24 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;{b.track} · {b.status}&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong leading-[0.95]">
              {b.title}
            </h1>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-widest text-sd-ink-soft/60">
              issuer · @{b.issuer.handle}
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            <div>
              <p className="text-sd-ink-soft/90 leading-relaxed">{b.description}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;rubric&gt;
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-sd-ink-soft/90">
                {b.rubric.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="text-sd-neon">·</span>
                    {r}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;how claims are judged&gt;
              </p>
              <p className="mt-2 text-sd-ink-soft/85 text-sm leading-relaxed">{b.judging}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;submission format&gt;
              </p>
              <pre className="mt-2 p-4 rounded-lg border border-sd-wine-500/30 bg-sd-bg-0/80 font-mono text-[11px] text-sd-ink-soft overflow-x-auto whitespace-pre">
{b.submission}
              </pre>
            </div>

            <aside className="space-y-3">
              <div className={`border bg-sd-bg-1/60 rounded-2xl p-5 ${isClosing ? "border-sd-amber/60" : "border-sd-wine-500/30"}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">payout</p>
                <p className={`mt-2 font-pixel text-4xl ${isClosing ? "text-sd-amber" : "text-sd-ink-strong"}`}>
                  RM {b.payout}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                  closes {new Date(b.closesAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                </p>
                <div className="mt-4">
                  <BountyClaimButton bounty={b} />
                </div>
              </div>

              <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">status timeline</p>
                <ol className="mt-3 space-y-2">
                  {STEPS.map((s, i) => {
                    const active = s === b.status;
                    return (
                      <li key={s} className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${active ? "bg-sd-neon animate-live-ping" : "bg-sd-wine-500/40"}`} />
                        <span className={`font-mono text-[10px] uppercase tracking-widest ${active ? "text-sd-ink-strong" : "text-sd-ink-soft/50"}`}>
                          {String(i + 1).padStart(2, "0")} · {s}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="pt-2">
                <BracketLink href="/code/bounty">[&gt; all bounties]</BracketLink>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
