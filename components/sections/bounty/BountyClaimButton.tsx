"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { Bounty } from "@/data/bounties";

export function BountyClaimButton({ bounty }: { bounty: Bounty }) {
  const [open, setOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);

  function claim() {
    try { localStorage.setItem(`sd:claim:${bounty.id}`, "1"); } catch {}
    setClaimed(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[11px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2.5 hover:bg-sd-wine-700/30 transition-colors"
      >
        [ claim this bounty ]
      </button>
      <Modal open={open} onClose={() => setOpen(false)} ariaLabel={`Claim ${bounty.title}`}>
        {claimed ? (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;{bounty.slug} · claimed&gt;
            </p>
            <h3 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong">claim in queue</h3>
            <p className="mt-3 text-sm text-sd-ink-soft/80">
              your claim for <span className="text-sd-ink-strong">{bounty.title}</span> is in the queue. the issuer will review and confirm within 48h.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
            >
              [ close ]
            </button>
          </div>
        ) : (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;{bounty.slug}&gt;
            </p>
            <h3 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong leading-tight">
              claim · {bounty.title}
            </h3>
            <p className="mt-3 text-sm text-sd-ink-soft/80">
              by claiming, you commit to shipping per the rubric. payout on merge.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-sd-ink-soft/85">
              {bounty.rubric.slice(0, 3).map((r) => (
                <li key={r} className="flex gap-2"><span className="text-sd-neon">·</span>{r}</li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={claim}
                className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2 hover:bg-sd-wine-700/30 transition-colors"
              >
                [ confirm claim ]
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/70 hover:text-sd-neon"
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
