import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface Props {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  cta?: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ eyebrow, heading, align = "left", children, cta, className, id }: Props) {
  return (
    <section id={id} className={cn("relative px-6 md:px-10 py-16 md:py-24", className)}>
      <div className="mx-auto max-w-[1440px]">
        <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center")}>
          {eyebrow && <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">{eyebrow}</p>}
          {heading && (
            <h2 className="font-pixel uppercase leading-[0.95] text-3xl md:text-5xl text-sd-ink-strong max-w-3xl">
              {heading}
            </h2>
          )}
          {cta && <div className="mt-2">{cta}</div>}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
