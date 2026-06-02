import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Markdown } from "@/components/ui/Markdown";
import { BracketLink } from "@/components/ui/BracketLink";
import { NEWS, TAG_COLOR } from "@/data/news";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) return { title: "not found" };
  return { title: n.title, description: n.dek };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) notFound();

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "news", href: "/news" }, { label: n.title }]} />
      <main>
        <article className="px-6 md:px-10 pt-8 pb-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${TAG_COLOR[n.tag]}`}>
                {n.tag}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                {new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <Link
                href={`/members/${n.author.handle}`}
                className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft hover:text-sd-neon"
              >
                @{n.author.handle}
              </Link>
            </div>
            <h1 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong leading-[0.95]">
              {n.title}
            </h1>
            <p className="mt-4 text-sd-ink-soft/85 italic">{n.dek}</p>
          </div>
        </article>

        <section className="px-6 md:px-10 pb-16">
          <div className="mx-auto max-w-2xl">
            <Markdown source={n.body} />
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/news">[&gt; all news]</BracketLink>
            <BracketLink href={`/members/${n.author.handle}`}>[&gt; about @{n.author.handle}]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
