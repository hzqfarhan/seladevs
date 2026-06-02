import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Markdown } from "@/components/ui/Markdown";
import { BracketLink } from "@/components/ui/BracketLink";
import { THREADS, TAG_COLOR } from "@/data/community";
import { ThreadReplyButton } from "@/components/ui/ThreadReplyButton";

export function generateStaticParams() {
  return THREADS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = THREADS.find((x) => x.slug === slug);
  if (!t) return { title: "not found" };
  return { title: t.title, description: t.body.slice(0, 160) };
}

export default async function ThreadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = THREADS.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "townhall", href: "/community" }, { label: t.title }]} />
      <main>
        <article className="px-6 md:px-10 pt-8 pb-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${TAG_COLOR[t.tag]}`}>
                {t.tag}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                opened {new Date(t.opened).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <Link
                href={`/members/${t.openedBy.handle}`}
                className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft hover:text-sd-neon"
              >
                @{t.openedBy.handle}
              </Link>
            </div>
            <h1 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong leading-[0.95]">
              {t.title}
            </h1>
          </div>
        </article>

        <section className="px-6 md:px-10 py-4">
          <div className="mx-auto max-w-2xl">
            <article className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6">
              <Markdown source={t.body} />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                — @{t.openedBy.handle} · {new Date(t.opened).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </article>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;{t.replies.length} repl{t.replies.length === 1 ? "y" : "ies"}&gt;
            </p>
            <div className="space-y-3">
              {t.replies.map((r) => (
                <article key={r.id} className="border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl p-5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href={`/members/${r.handle}`}
                      className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft hover:text-sd-neon"
                    >
                      @{r.handle}
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                      {new Date(r.at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-sd-ink-soft/90 leading-relaxed whitespace-pre-line">{r.body}</div>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <ThreadReplyButton threadSlug={t.slug} threadTitle={t.title} />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/community">[&gt; all threads]</BracketLink>
            <BracketLink href={`/members/${t.openedBy.handle}`}>[&gt; about @{t.openedBy.handle}]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
