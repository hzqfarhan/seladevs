"use client";
import { ShowcaseCover } from "@/components/ui/ShowcaseCover";
import type { ShowcaseItem } from "@/data/showcase";

interface Props {
  item: ShowcaseItem;
  onOpen: (id: number) => void;
}

export function ShowcaseCard({ item, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.id)}
      aria-haspopup="dialog"
      aria-label={`Open ${item.title} details`}
      className="group relative text-left border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-3 transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)] focus:outline-none focus:border-sd-neon"
    >
      <span aria-hidden className="absolute right-3 top-3 z-10 font-mono text-[10px] text-sd-neon-soft/70 select-none">
        [ + ]
      </span>

      <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
        <ShowcaseCover id={item.cover} title={item.title} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-semibold text-sd-ink-strong leading-snug">{item.title}</h3>
        <p className="mt-0.5 text-xs text-sd-ink-soft/70 line-clamp-1">{item.oneLiner}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft/80 rounded-full px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-xs uppercase text-sd-neon">
              {item.author.name.charAt(0)}
            </span>
            <span className="font-mono text-[11px] text-sd-neon-soft truncate">@{item.author.handle}</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
            <span>★ {item.stars >= 1000 ? `${(item.stars / 1000).toFixed(1)}k` : item.stars}</span>
            <span>{item.forks} forks</span>
          </div>
        </div>
      </div>
    </button>
  );
}
