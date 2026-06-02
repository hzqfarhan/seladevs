import { cn } from "@/lib/cn";
import { Markdown } from "./Markdown";
import type { ReactNode } from "react";

export type TimelineTag = "shipped" | "shipping" | "proposed" | "press" | "release";

export interface TimelineEntry {
  date: string;
  title: string;
  body?: ReactNode | string;
  tag?: TimelineTag;
  handle?: string;
}

interface Props {
  entries: TimelineEntry[];
  className?: string;
}

const TAG_COLOR: Record<TimelineTag, string> = {
  shipped: "border-sd-neon text-sd-neon",
  shipping: "border-sd-amber text-sd-amber",
  proposed: "border-sd-purple text-sd-purple",
  press: "border-sd-money text-sd-money",
  release: "border-sd-neon-soft text-sd-neon-soft",
};

const TAG_BG: Record<TimelineTag, string> = {
  shipped: "bg-sd-neon/10",
  shipping: "bg-sd-amber/10",
  proposed: "bg-sd-purple/10",
  press: "bg-sd-money/10",
  release: "bg-sd-wine-700/20",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function Timeline({ entries, className }: Props) {
  return (
    <ol className={cn("relative space-y-4", className)}>
      <span aria-hidden className="absolute left-[78px] top-2 bottom-2 w-px bg-sd-wine-500/30" />
      {entries.map((e, i) => (
        <li key={i} className="relative flex gap-4">
          <div className="w-[68px] shrink-0 flex flex-col items-end">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
              {formatDate(e.date)}
            </span>
            {e.handle && (
              <span className="mt-1 font-mono text-[9px] text-sd-ink-soft/50">@{e.handle}</span>
            )}
          </div>
          <div className="relative flex-1 min-w-0">
            <span aria-hidden className="absolute -left-[19px] top-2 h-2 w-2 rounded-full bg-sd-neon" />
            <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4">
              <div className="flex items-start gap-3 flex-wrap">
                <h3 className="font-pixel uppercase text-lg text-sd-ink-strong leading-tight flex-1 min-w-0">
                  {e.title}
                </h3>
                {e.tag && (
                  <span className={cn("font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5", TAG_COLOR[e.tag], TAG_BG[e.tag])}>
                    {e.tag}
                  </span>
                )}
              </div>
              {e.body && (
                <div className="mt-2 text-sm text-sd-ink-soft/85">
                  {typeof e.body === "string" ? <Markdown source={e.body} /> : e.body}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
