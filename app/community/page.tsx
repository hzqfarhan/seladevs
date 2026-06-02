import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { THREADS, TAG_COLOR } from "@/data/community";

export const metadata: Metadata = {
  title: "townhall",
  description: "long-form discussion. open to all. no upvotes, no engagement bait.",
};

function lastReply(t: typeof THREADS[number]) {
  if (t.replies.length === 0) return null;
  return t.replies[t.replies.length - 1];
}

export default function CommunityPage() {
  const sorted = [...THREADS].sort((a, b) => b.opened.localeCompare(a.opened));

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "townhall" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;community&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## townhall
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              long-form discussion. open to all. no upvotes, no engagement bait.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] space-y-3">
            {sorted.map((t) => {
              const last = lastReply(t);
              return (
                <article
                  key={t.id}
                  className="group border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5 transition-all hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${TAG_COLOR[t.tag]}`}>
                      {t.tag}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                      opened {new Date(t.opened).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <Link
                      href={`/members/${t.openedBy.handle}`}
                      className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft hover:text-sd-neon"
                    >
                      @{t.openedBy.handle}
                    </Link>
                  </div>
                  <Link href={`/community/${t.slug}`} className="block">
                    <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong group-hover:text-sd-neon transition-colors">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-sm text-sd-ink-soft/80 line-clamp-2">{t.body}</p>
                  </Link>
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                      {t.replies.length} repl{t.replies.length === 1 ? "y" : "ies"}
                      {last && <span className="ml-2">· last by @{last.handle} {new Date(last.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
                    </p>
                    <Link
                      href={`/community/${t.slug}`}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft hover:text-sd-neon"
                    >
                      [&gt; open →]
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <BracketLink href="/community/townhall">&nbsp;</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
