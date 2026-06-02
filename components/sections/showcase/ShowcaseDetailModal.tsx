"use client";
import { Modal } from "@/components/ui/Modal";
import { BracketLink } from "@/components/ui/BracketLink";
import { ShowcaseCover } from "@/components/ui/ShowcaseCover";
import type { ShowcaseItem } from "@/data/showcase";

interface Props {
  item: ShowcaseItem | null;
  onClose: () => void;
}

export function ShowcaseDetailModal({ item, onClose }: Props) {
  if (!item) return null;
  return (
    <Modal open={!!item} onClose={onClose} ariaLabel={`${item.title} details`} className="max-w-2xl">
      <div className="relative aspect-[16/9] -m-6 mb-4 overflow-hidden rounded-t-2xl">
        <ShowcaseCover id={item.cover} title={item.title} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon">
          {item.author.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <h2 className="font-pixel uppercase text-2xl text-sd-ink-strong leading-tight">{item.title}</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest text-sd-neon-soft">
            @{item.author.handle} · {item.author.name}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft/80 rounded-full px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-sd-ink-soft/90 leading-relaxed">{item.description}</p>

      <div className="mt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">&lt;tech stack&gt;</p>
        <ul className="mt-2 grid grid-cols-2 gap-1.5 font-mono text-[11px] text-sd-ink-soft/80">
          {item.stack.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span aria-hidden className="block h-1 w-1 rounded-full bg-sd-neon" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.links.live && (
          <a
            href={item.links.live}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
          >
            [ live demo → ]
          </a>
        )}
        {item.links.github && (
          <a
            href={item.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/50 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
          >
            [ github → ]
          </a>
        )}
        {item.links.writeup && (
          <a
            href={item.links.writeup}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/50 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
          >
            [ writeup → ]
          </a>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-sd-wine-500/30">
        <BracketLink href="/members">[&gt; join a guild]</BracketLink>
      </div>
    </Modal>
  );
}
