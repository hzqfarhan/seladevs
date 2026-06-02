import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  prefix?: ">" | "[>" | "[" | "";
  suffix?: ">" | "]" | "" ;
}

export function BracketLink({ href, children, className, external, prefix = "[>", suffix = "]" }: Props) {
  const base =
    "group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-sd-neon-soft transition-all duration-150 hover:text-sd-neon hover:translate-x-0.5";
  const inner = (
    <span className={cn(base, className)}>
      {prefix && <span className="opacity-80">{prefix}</span>}
      <span>{children}</span>
      {suffix && <span className="opacity-80">{suffix}</span>}
      <span aria-hidden className="inline-block transition-transform duration-150 group-hover:translate-x-1">
        →
      </span>
    </span>
  );
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="inline-block">
      {inner}
    </Link>
  );
}
