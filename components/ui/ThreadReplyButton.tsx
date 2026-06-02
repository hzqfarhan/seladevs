"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export function ThreadReplyButton({ threadSlug, threadTitle }: { threadSlug: string; threadTitle: string }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [handle, setHandle] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || !handle.trim()) return;
    const payload = { slug: threadSlug, handle, body, at: new Date().toISOString() };
    try { localStorage.setItem(`sd:reply:${threadSlug}:${Date.now()}`, JSON.stringify(payload)); } catch {}
    setDone(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2 hover:bg-sd-wine-700/30 transition-colors"
      >
        [ reply to this thread ]
      </button>
      <Modal open={open} onClose={() => { setOpen(false); setTimeout(() => { setDone(false); setBody(""); setHandle(""); }, 200); }} ariaLabel={`Reply to ${threadTitle}`}>
        {done ? (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;reply submitted&gt;
            </p>
            <h3 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong">thanks · @{handle}</h3>
            <p className="mt-3 text-sm text-sd-ink-soft/85">
              your reply to <span className="text-sd-ink-strong">{threadTitle}</span> is in the moderation queue.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-sd-amber">
              demo only. in prod this posts to /api/community.
            </p>
            <button
              type="button"
              onClick={() => { setOpen(false); setTimeout(() => { setDone(false); setBody(""); setHandle(""); }, 200); }}
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
            >
              [ close ]
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;reply · {threadSlug}&gt;
            </p>
            <h3 className="mt-3 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">
              {threadTitle}
            </h3>
            <div className="mt-4 space-y-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">your handle</label>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@you"
                  className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  reply · {body.length}/2000
                </label>
                <textarea
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value.slice(0, 2000))}
                  rows={6}
                  className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
                  placeholder="add to the discussion."
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-2 hover:bg-sd-wine-700/30 transition-colors"
            >
              [ submit reply ]
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
