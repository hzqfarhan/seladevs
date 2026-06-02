import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";
import { JOBS } from "@/data/jobs";
import { JobApplyButton, CopyLinkButton } from "@/components/sections/jobs/JobActions";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = JOBS.find((x) => x.slug === slug);
  if (!j) return { title: "not found" };
  return { title: `${j.title} · ${j.company}`, description: j.description.slice(0, 160) };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;jobs / {job.slug}&gt;
            </p>
            <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong leading-[0.95]">
                  {job.title}
                </h1>
                <p className="mt-3 text-lg text-sd-ink-soft">{job.company}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/70">
                  <span>{job.location}</span>
                  <span aria-hidden>·</span>
                  <span className="text-sd-amber">{job.type}</span>
                  <span aria-hidden>·</span>
                  <span>{job.posted}</span>
                  {job.urgent && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="text-sd-neon">urgent</span>
                    </>
                  )}
                  {job.verified && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="text-sd-money">verified</span>
                    </>
                  )}
                </div>
              </div>
              <p className="font-pixel text-3xl text-sd-ink-strong">{job.salary}</p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            <div>
              <p className="text-sd-ink-soft/90 leading-relaxed">{job.description}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;requirements&gt;
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-sd-ink-soft/90">
                {job.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="text-sd-neon">·</span>
                    {r}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;nice to have&gt;
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-sd-ink-soft/90">
                {job.nice.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="text-sd-amber">·</span>
                    {r}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;perks&gt;
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-sd-ink-soft/90">
                {job.perks.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="text-sd-money">·</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-3">
              <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                <JobApplyButton job={job} />
                <a
                  href={`mailto:${job.applyEmail}?subject=Application · ${encodeURIComponent(job.title)} · ${encodeURIComponent(job.company)}`}
                  className="mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft rounded-full px-3 py-2 hover:border-sd-neon hover:text-sd-neon transition-colors"
                >
                  [ email {job.applyEmail} ]
                </a>
              </div>

              <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">share</p>
                <CopyLinkButton />
              </div>

              <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">issue?</p>
                <a
                  href={`mailto:abuse@seladevs.com?subject=Report · ${encodeURIComponent(job.slug)}`}
                  className="mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/60 hover:text-sd-neon"
                >
                  [ report this listing ]
                </a>
              </div>

              <div className="pt-2">
                <BracketLink href="/jobs">[&gt; all jobs]</BracketLink>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
