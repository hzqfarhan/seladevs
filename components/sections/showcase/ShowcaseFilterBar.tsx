"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Chip } from "@/components/ui/Chip";
import type { ShowcaseItem } from "@/data/showcase";

interface Props {
  tags: string[];
  query: string;
  sort: "new" | "top" | "random";
  onQueryChange: (q: string) => void;
  onSortChange: (s: "new" | "top" | "random") => void;
}

export function ShowcaseFilterBar({ tags, query, sort, onQueryChange, onSortChange }: Props) {
  const [active, setActive] = useState<string>("all");
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  useEffect(() => {
    const fromUrl = sp.get("tag");
    if (fromUrl) setActive(fromUrl);
  }, [sp]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.getElementById("sd-showcase-search")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function setTag(t: string) {
    setActive(t);
    const params = new URLSearchParams(sp.toString());
    if (t === "all") params.delete("tag");
    else params.set("tag", t);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
      <div className="mx-auto max-w-[1440px] flex flex-wrap items-center gap-2">
        <Chip active={active === "all"} onClick={() => setTag("all")}>all</Chip>
        {tags.map((t) => (
          <Chip key={t} active={active === t} onClick={() => setTag(t)}>{t}</Chip>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <input
              id="sd-showcase-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onQueryChange("");
              }}
              placeholder="[? search →]"
              className="font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-48"
            />
          </div>
          <select
            aria-label="Sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as "new" | "top" | "random")}
            className="font-mono text-[10px] uppercase tracking-[0.2em] bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft focus:outline-none focus:border-sd-neon"
          >
            <option value="new">new</option>
            <option value="top">top</option>
            <option value="random">random</option>
          </select>
        </div>
      </div>
    </div>
  );
}
