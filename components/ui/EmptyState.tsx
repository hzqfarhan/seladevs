import type { ReactNode } from "react";

interface Props {
  title?: string;
  body?: string;
  cta?: ReactNode;
  glyph?: ReactNode;
}

export function EmptyState({ title = "no signals yet", body, cta, glyph }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl">
      <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/70 select-none">
        {glyph ?? "[ + ]"}
      </span>
      <h3 className="mt-4 font-pixel uppercase text-2xl text-sd-ink-strong">{title}</h3>
      {body && <p className="mt-3 max-w-md text-sm text-sd-ink-soft/80">{body}</p>}
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}
