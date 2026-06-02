"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 9000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)} ariaLabel="Join the network">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
        join the network<span className="animate-cursor-blink">_</span>
      </p>
      <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">
        Forge updates, monthly.
      </h3>
      <p className="mt-2 text-sm text-sd-ink-soft/80">
        We send one email a month with what we shipped, what we broke, and where to find us next.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mt-5 space-y-3"
      >
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/60">email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@forge.dev"
            className="mt-1 w-full bg-transparent border border-sd-wine-500/40 rounded-md px-3 py-2 font-mono text-sm text-sd-ink-strong placeholder:text-sd-ink-soft/30 focus:border-sd-neon focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-md border border-sd-neon/60 bg-sd-wine-700/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-sd-ink-strong hover:shadow-[0_0_20px_rgba(255,45,85,0.45)] transition-shadow"
        >
          {sent ? "subscribed_" : "sign me up"}
        </button>
      </form>
    </Modal>
  );
}
