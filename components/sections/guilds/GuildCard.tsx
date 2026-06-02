import Link from "next/link";
import type { Guild } from "@/data/guilds";

export function GuildCard({ g }: { g: Guild }) {
  return (
    <Link
      href={`/guilds/${g.slug}`}
      className="group relative block border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl overflow-hidden transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
    >
      <span aria-hidden className="absolute right-3 top-3 z-10 font-mono text-[10px] text-sd-neon-soft/70 select-none">
        [ + ]
      </span>

      <div
        aria-hidden
        className="h-20 w-full"
        style={{ background: `linear-gradient(135deg, ${g.banners[0]}, ${g.banners[1]})` }}
      />

      <div className="p-4">
        <h3 className="font-pixel uppercase text-2xl text-sd-ink-strong">{g.name}</h3>
        <p className="mt-1 text-xs text-sd-ink-soft/70 line-clamp-2 min-h-[2.5rem]">{g.tagline}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-xs uppercase text-sd-neon">
            {g.lead.name.charAt(0)}
          </span>
          <span className="font-mono text-[11px] text-sd-neon-soft">@{g.lead.handle}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60 ml-auto">
            {g.members}/{g.maxMembers} members
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Tag>{g.category}</Tag>
          <Tag>{g.cadence}</Tag>
          {g.recruiting ? (
            <Tag tone="amber">recruiting</Tag>
          ) : (
            <Tag>closed</Tag>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
          <span>last activity: {g.recentActivity}</span>
          <span className="text-sd-neon-soft group-hover:text-sd-neon">[&gt; enter →]</span>
        </div>
      </div>
    </Link>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone?: "amber" }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-2 py-0.5 ${
        tone === "amber" ? "border-sd-amber/60 text-sd-amber" : "border-sd-wine-500/40 text-sd-neon-soft/80"
      }`}
    >
      {children}
    </span>
  );
}
