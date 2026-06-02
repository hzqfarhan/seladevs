import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { Timeline } from "@/components/ui/Timeline";
import { CopyButton } from "@/components/ui/CopyButton";
import { CHANGELOG } from "@/data/changelog";

export const metadata: Metadata = {
  title: "changelog",
  description: "what we shipped, shipping, and proposing.",
};

export default function ChangelogPage() {
  const sorted = [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date));
  const shippedCount = sorted.filter((e) => e.tag === "shipped").length;

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "changelog" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;changelog&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
                  ## the build log
                </h1>
                <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
                  every ship, every fix, every near-miss. no marketing filter.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  {shippedCount} shipped · {CHANGELOG.length} total
                </p>
                <span className="font-mono text-[10px] uppercase tracking-widest border border-sd-amber text-sd-amber rounded-full px-3 py-1 inline-flex items-center gap-2">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-sd-amber" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sd-amber animate-live-ping" />
                  </span>
                  3 shipping this week
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/70">
              subscribe via RSS
            </p>
            <div className="flex items-center gap-2">
              <CopyButton value="https://seladevs.com/changelog/rss.xml" label="copy feed url" />
              <Link
                href="/changelog/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/50 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
              >
                [ open feed ↗ ]
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px]">
            <Timeline
              entries={sorted.map((e) => ({
                date: e.date,
                title: e.title,
                body: e.body,
                tag: e.tag,
                handle: e.handle,
              }))}
            />
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <BracketLink href="/news">[&gt; news]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
