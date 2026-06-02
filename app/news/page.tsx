import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { Counter } from "@/components/ui/Counter";
import { StatusPill } from "@/components/ui/StatusPill";
import { NEWS, TAG_COLOR } from "@/data/news";

export const metadata: Metadata = {
  title: "news",
  description: "release notes, partnerships, and the occasional op-ed. updated weekly.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function NewsPage() {
  const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
  const grouped = new Map<string, typeof sorted>();
  for (const n of sorted) {
    const key = n.date.slice(0, 7);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(n);
  }
  const months = Array.from(grouped.entries()).sort(([a], [b]) => b.localeCompare(a));

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "news" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;news&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
                  ## from the forge
                </h1>
                <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
                  release notes, partnerships, and the occasional op-ed. updated weekly.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  <Counter value={NEWS.length} suffix=" entries" />
                </p>
                <StatusPill tone="amber">weekly cadence</StatusPill>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] space-y-10">
            {months.map(([monthKey, list]) => {
              const [y, m] = monthKey.split("-");
              const monthLabel = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
              return (
                <div key={monthKey}>
                  <h2 className="font-pixel uppercase text-2xl text-sd-ink-strong mb-4">{monthLabel}</h2>
                  <div className="space-y-3">
                    {list.map((n) => (
                      <Link
                        key={n.id}
                        href={`/news/${n.slug}`}
                        className="group block border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5 transition-all hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${TAG_COLOR[n.tag]}`}>
                            {n.tag}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                            {formatDate(n.date)}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
                            @{n.author.handle}
                          </span>
                        </div>
                        <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong group-hover:text-sd-neon transition-colors">
                          {n.title}
                        </h3>
                        <p className="mt-1 text-sm text-sd-ink-soft/80 line-clamp-2">{n.dek}</p>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft group-hover:text-sd-neon">
                          [&gt; read →]
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <BracketLink href="/changelog">[&gt; changelog]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
