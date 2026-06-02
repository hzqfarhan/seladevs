import type { ReactNode } from "react";
import { BentoCard } from "./BentoCard";
import { BracketLink } from "./BracketLink";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

type ActionType = "link" | "button" | "external";

interface Action {
  label: string;
  href: string;
  type?: ActionType;
}

interface Props {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  primary?: Action;
  secondary?: Action;
  align?: "left" | "center";
  className?: string;
}

function renderAction(a: Action | undefined, variant: "primary" | "outline") {
  if (!a) return null;
  const t = a.type ?? "link";
  if (t === "button") {
    return <a href={a.href} className="inline-block"><Button variant={variant === "primary" ? "primary" : "outline"}>{a.label}</Button></a>;
  }
  if (t === "external") {
    return <a href={a.href} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft hover:text-sd-neon border border-sd-wine-500/50 rounded-md px-4 py-2 inline-block">[{a.label} ↗]</a>;
  }
  return <BracketLink href={a.href}>[&gt; {a.label}]</BracketLink>;
}

export function CTACard({ eyebrow, title, body, primary, secondary, align = "left", className }: Props) {
  return (
    <BentoCard clip withCorner className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft", align === "center" && "mx-auto")}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className={cn("mt-2 font-pixel uppercase text-2xl md:text-3xl text-sd-ink-strong", align === "center" && "mx-auto")}>
          {title}
        </h2>
      )}
      {body && <div className={cn("mt-2 text-sm text-sd-ink-soft/85", align === "center" && "mx-auto")}>{body}</div>}
      {(primary || secondary) && (
        <div className={cn("mt-4 flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>
          {primary && renderAction(primary, "primary")}
          {secondary && renderAction(secondary, "outline")}
        </div>
      )}
    </BentoCard>
  );
}
