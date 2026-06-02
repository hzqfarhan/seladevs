import { Eyebrow } from "@/components/ui/Eyebrow";
import { BracketLink } from "@/components/ui/BracketLink";
import { MarqueeRow } from "@/components/ui/Marquee";
import { SHOWCASE } from "@/data/content";

const GRADIENTS = [
  "from-sd-wine-500 via-sd-wine-600 to-sd-bg-2",
  "from-sd-purple via-sd-wine-500 to-sd-bg-2",
  "from-sd-neon via-sd-wine-500 to-sd-bg-2",
  "from-sd-amber via-sd-wine-500 to-sd-bg-2",
  "from-sd-wine-400 via-sd-wine-600 to-sd-bg-2",
  "from-sd-money via-sd-wine-500 to-sd-bg-2",
];

export function OpportunitiesMarquee() {
  const row1 = SHOWCASE.slice(0, 3);
  const row2 = SHOWCASE.slice(3, 6);

  return (
    <section id="opportunities" className="px-6 md:px-10 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <Eyebrow>&lt;opportunities hub&gt;</Eyebrow>
          <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong">
            Build. Get Hired. Get Seen.
          </h2>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="flex">
          <MarqueeRow>
            {row1.map((p, i) => (
              <ProjectCard key={p.id} title={p.title} author={p.author} gradient={GRADIENTS[i % GRADIENTS.length]} />
            ))}
          </MarqueeRow>
        </div>
        <div className="flex">
          <MarqueeRow reverse>
            {row2.map((p, i) => (
              <ProjectCard key={p.id} title={p.title} author={p.author} gradient={GRADIENTS[(i + 3) % GRADIENTS.length]} />
            ))}
          </MarqueeRow>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] mt-10 flex flex-wrap items-center justify-center gap-6">
        <BracketLink href="/showcase">[&gt; project showcase]</BracketLink>
        <BracketLink href="/jobs">[&gt; find a job]</BracketLink>
      </div>
    </section>
  );
}

function ProjectCard({ title, author, gradient }: { title: string; author: string; gradient: string }) {
  return (
    <article className="group w-[260px] md:w-[320px] shrink-0 border border-sd-wine-500/30 bg-sd-bg-1/70 rounded-2xl overflow-hidden hover:border-sd-neon/60 transition-colors">
      <div className={`h-44 bg-gradient-to-br ${gradient} relative`}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,45,85,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.6) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="absolute inset-0 grid place-items-center font-pixel uppercase text-2xl text-sd-ink-strong tracking-tighter">
          {title.split(" ")[0]}
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="font-mono text-sm text-sd-ink-strong truncate">{title}</p>
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sd-wine-700 font-mono text-[10px] text-sd-neon">
            {author.charAt(0).toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-sd-ink-soft/60">@{author}</span>
        </div>
      </div>
    </article>
  );
}
