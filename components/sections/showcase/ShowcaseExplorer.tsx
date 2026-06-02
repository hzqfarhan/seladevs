"use client";
import { useMemo, useState } from "react";
import { ShowcaseFilterBar } from "./ShowcaseFilterBar";
import { ShowcaseCard } from "./ShowcaseCard";
import { ShowcaseDetailModal } from "./ShowcaseDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { SHOWCASE, SHOWCASE_TAGS, type ShowcaseItem } from "@/data/showcase";

type Sort = "new" | "top" | "random";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ShowcaseExplorer() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("new");
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string>("all");
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const filtered = useMemo<ShowcaseItem[]>(() => {
    let list = SHOWCASE;
    if (activeTag !== "all") list = list.filter((s) => s.tags.includes(activeTag));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.author.handle.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "new") {
      list = [...list].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    } else if (sort === "top") {
      list = [...list].sort((a, b) => b.stars - a.stars);
    } else {
      list = shuffle(list);
    }
    return list;
  }, [query, sort, activeTag, shuffleSeed]);

  function handleSortChange(s: Sort) {
    setSort(s);
    if (s === "random") setShuffleSeed((n) => n + 1);
  }

  return (
    <>
      <ShowcaseFilterBar
        tags={SHOWCASE_TAGS}
        query={query}
        sort={sort}
        onQueryChange={setQuery}
        onSortChange={handleSortChange}
      />

      <section className="px-6 md:px-10 py-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-6">
            [{filtered.length} / {SHOWCASE.length} signals]
            {activeTag !== "all" && <span className="ml-2">· tag: {activeTag}</span>}
            {query && <span className="ml-2">· search: "{query}"</span>}
          </p>

          {filtered.length === 0 ? (
            <EmptyState
              title="no signals match"
              body="try a different tag, or clear the search."
              glyph="[ ∅ ]"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((it) => (
                <ShowcaseCard key={it.id} item={it} onOpen={setOpenId} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ShowcaseDetailModal
        item={filtered.find((s) => s.id === openId) ?? SHOWCASE.find((s) => s.id === openId) ?? null}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}
