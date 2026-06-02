import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { LeaderboardList } from "@/components/ui/LeaderboardList";

export const metadata: Metadata = {
  title: "leaderboard",
  description: "builders ranked by shipped work, not vibes.",
};

export default function LeaderboardPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "leaderboard" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;leaderboard&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
                  ## the scoreboard
                </h1>
                <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
                  builders ranked by shipped work, not vibes. season resets quarterly.
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest border border-sd-amber text-sd-amber rounded-full px-3 py-1 inline-flex items-center gap-2 self-start md:self-end">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-sd-amber" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sd-amber animate-live-ping" />
                </span>
                season 03 · 91d left
              </span>
            </div>
          </div>
        </section>

        <LeaderboardList />

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <BracketLink href="/members">[&gt; all members]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
