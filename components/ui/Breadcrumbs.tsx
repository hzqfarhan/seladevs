import Link from "next/link";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: Props) {
  return (
    <nav aria-label="breadcrumbs" className={cn("px-6 md:px-10 pt-4", className)}>
      <div className="mx-auto max-w-[1440px] font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
        <span aria-hidden>[</span>{" "}
        <Link href="/" className="hover:text-sd-neon-soft">home</Link>
        {items.map((c, i) => (
          <span key={i}>
            <span aria-hidden> / </span>
            {c.href ? (
              <Link href={c.href} className="hover:text-sd-neon-soft">{c.label}</Link>
            ) : (
              <span className="text-sd-neon-soft">{c.label}</span>
            )}
          </span>
        ))}
        <span aria-hidden> ]</span>
      </div>
    </nav>
  );
}
