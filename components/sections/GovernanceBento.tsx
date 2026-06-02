import { Eyebrow } from "@/components/ui/Eyebrow";
import { BracketLink } from "@/components/ui/BracketLink";
import { GOVERNANCE } from "@/data/content";

export function GovernanceBento() {
  return (
    <section id="governance" className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow>&lt;get involved&gt;</Eyebrow>
        <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong max-w-2xl">
          ## governance &amp; community
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {GOVERNANCE.map((g) => (
            <article
              key={g.n}
              className="group relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center bg-sd-neon text-sd-bg-0 font-pixel text-2xl">
                  {g.n}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
                    &lt;{g.eyebrow}&gt;
                  </p>
                  <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">
                    ### {g.title}
                  </h3>
                  <p className="mt-3 text-sm text-sd-ink-soft/80">{g.body}</p>

                  {g.n === "03" && (
                    <div className="mt-4 border border-sd-wine-500/30 rounded-md p-3 bg-sd-bg-2/50">
                      <p className="text-sm text-sd-ink-strong">
                        &ldquo;Is &lsquo;Vibe Coding&rsquo; making us better engineers, or just faster script-kiddies?&rdquo;
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-sd-ink-soft/50">
                        <span className="border border-sd-wine-500/30 rounded px-1.5 py-0.5">vibe coding</span>
                        <span className="border border-sd-wine-500/30 rounded px-1.5 py-0.5">ai</span>
                        <span>4 comments · 6 days ago</span>
                      </div>
                    </div>
                  )}

                  {g.n === "04" && (
                    <div className="mt-4 flex items-center gap-3 border border-sd-wine-500/30 rounded-md p-3 bg-sd-bg-2/50">
                      <div className="grid h-9 w-9 place-items-center rounded-md bg-sd-wine-700 font-pixel text-sd-neon">
                        SD
                      </div>
                      <div>
                        <p className="font-mono text-sm text-sd-ink-strong">official sd team</p>
                        <p className="text-[11px] text-sd-ink-soft/60">
                          4 members · 1 project
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <BracketLink href={g.href}>[&gt; {g.cta}]</BracketLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
