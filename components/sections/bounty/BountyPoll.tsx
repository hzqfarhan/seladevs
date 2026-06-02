"use client";
import { useEffect, useState } from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { BOUNTY_POLL } from "@/data/bounties";

export function BountyPoll() {
  const [voted, setVoted] = useState<number | null>(null);
  const [votes, setVotes] = useState<Record<number, number>>(
    () => Object.fromEntries(BOUNTY_POLL.map((o) => [o.id, o.votes]))
  );

  useEffect(() => {
    const stored = localStorage.getItem("sd:poll:1");
    if (stored) setVoted(Number(stored));
  }, []);

  function vote(id: number) {
    if (voted) return;
    setVotes((v) => ({ ...v, [id]: v[id] + 1 }));
    setVoted(id);
    try { localStorage.setItem("sd:poll:1", String(id)); } catch {}
  }

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const closesIn = "23h 41m";

  return (
    <section className="px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;bounty poll&gt;
            </p>
            <h2 className="mt-2 font-pixel uppercase text-3xl md:text-4xl text-sd-ink-strong">
              vote the next bounty
            </h2>
            <p className="mt-1 text-sd-ink-soft/80 text-sm">top 3 ship next sprint · closes in {closesIn}</p>
          </div>
          {voted && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
              you voted · {BOUNTY_POLL.find((o) => o.id === voted)?.title}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BOUNTY_POLL.map((o) => {
            const pct = total > 0 ? Math.round((votes[o.id] / total) * 100) : 0;
            const isVoted = voted === o.id;
            return (
              <BentoCard key={o.id} clip withCorner>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">proposed by {o.proposedBy}</p>
                <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">{o.title}</h3>
                <p className="mt-1 text-sm text-sd-ink-soft/80">{o.description}</p>

                <div className="mt-4 h-2 rounded-full bg-sd-bg-2 overflow-hidden">
                  <div
                    className={`h-full ${isVoted ? "bg-sd-neon" : "bg-sd-wine-500"} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                  {pct}% · {votes[o.id]} votes
                </p>

                <button
                  type="button"
                  onClick={() => vote(o.id)}
                  disabled={!!voted && !isVoted}
                  className={`mt-4 w-full font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-2 transition-colors ${
                    isVoted
                      ? "border-sd-neon text-sd-neon bg-sd-wine-700/30"
                      : voted
                      ? "border-sd-wine-500/30 text-sd-ink-soft/40 cursor-not-allowed"
                      : "border-sd-wine-500/50 text-sd-neon-soft hover:border-sd-neon hover:text-sd-neon"
                  }`}
                >
                  {isVoted ? "✓ your vote" : voted ? "[ locked ]" : "[ vote ]"}
                </button>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
