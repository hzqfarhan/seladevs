import { cn } from "@/lib/cn";
import Link from "next/link";
import type { Member } from "@/data/members";

interface Props {
  m: Member;
  variant?: "grid" | "list";
}

export function MemberCard({ m, variant = "grid" }: Props) {
  if (variant === "list") {
    return (
      <Link
        href={`/members/${m.handle}`}
        className="group flex items-center gap-3 border border-sd-wine-500/30 bg-sd-bg-1/40 hover:border-sd-neon/70 hover:bg-sd-bg-1/70 transition-colors rounded-xl px-3 py-2"
      >
        <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-xs uppercase text-sd-neon">
          {m.name.charAt(0)}
          {m.online && (
            <span aria-hidden className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-sd-money ring-2 ring-sd-bg-0" />
          )}
        </span>
        <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[12px] text-sd-neon-soft">@{m.handle}</span>
          <span className="text-sd-ink-soft/50">·</span>
          <span className="text-xs text-sd-ink-strong truncate">{m.name}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">{m.role}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">{m.state}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-sd-amber">★ {m.stars}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft group-hover:text-sd-neon">[&gt; profile →]</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/members/${m.handle}`}
      className={cn(
        "group relative block border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 transition-all duration-200",
        "hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
      )}
    >
      <span aria-hidden className="absolute right-3 top-3 font-mono text-[10px] text-sd-neon-soft/70 select-none">
        [ + ]
      </span>

      <div className="flex items-start gap-3">
        <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-xl uppercase text-sd-neon">
          {m.name.charAt(0)}
          {m.online && (
            <span aria-hidden className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-sd-money ring-2 ring-sd-bg-1" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sd-ink-strong leading-tight">{m.name}</h3>
          <p className="font-mono text-[11px] text-sd-neon-soft">@{m.handle}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-sd-ink-soft/80 line-clamp-2 min-h-[2.5rem]">{m.bio}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip>{m.role}</Chip>
        <Chip>{m.state}</Chip>
        <Chip>{m.stack[0]}</Chip>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
        <span>★ {m.stars}</span>
        <span>joined {new Date(m.joined).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
      </div>
    </Link>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft/80 rounded-full px-2 py-0.5">
      {children}
    </span>
  );
}
