import { BentoCard } from "./BentoCard";
import { cn } from "@/lib/cn";

export interface StatItem {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}

interface Props {
  items: StatItem[];
  cols?: 2 | 3 | 4 | 5;
  className?: string;
}

const COLS: Record<NonNullable<Props["cols"]>, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

export function StatRow({ items, cols, className }: Props) {
  const c = cols ?? (items.length <= 2 ? 2 : items.length <= 3 ? 3 : items.length <= 4 ? 4 : 5);
  return (
    <div className={cn("grid gap-3", COLS[c], className)}>
      {items.map((s, i) => (
        <BentoCard key={i} clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{s.label}</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">
            {s.prefix && <span className="text-sd-ink-soft/60">{s.prefix}</span>}
            {s.value}
            {s.suffix && <span className="text-sd-ink-soft/40">{s.suffix}</span>}
          </p>
        </BentoCard>
      ))}
    </div>
  );
}
