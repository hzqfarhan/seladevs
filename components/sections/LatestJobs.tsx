import { Eyebrow } from "@/components/ui/Eyebrow";
import { BracketLink } from "@/components/ui/BracketLink";
import { JOBS } from "@/data/content";

export function LatestJobs() {
  return (
    <section id="jobs" className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Eyebrow>&lt;hiring now&gt;</Eyebrow>
            <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong">
              ## Latest Jobs
            </h2>
          </div>
          <BracketLink href="/jobs">[&gt; view all jobs]</BracketLink>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {JOBS.map((j) => (
            <article
              key={j.id}
              className="group relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5 transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
            >
              <span aria-hidden className="absolute right-3 top-3 font-mono text-[10px] text-sd-neon-soft/70 select-none">
                [ + ]
              </span>

              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon">
                  {j.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sd-ink-strong leading-snug">{j.title}</h3>
                  <p className="text-xs text-sd-ink-soft/70">{j.company}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-sd-ink-soft/60">
                <span>{j.location}</span>
                <span aria-hidden>·</span>
                <span className="text-sd-amber">{j.type}</span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="font-pixel text-2xl text-sd-ink-strong">{j.salary}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
                    {j.posted}
                  </p>
                </div>
                <BracketLink href="/jobs" prefix="[" suffix=">">apply</BracketLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
