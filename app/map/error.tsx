"use client";
import { BracketLink } from "@/components/ui/BracketLink";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="px-6 md:px-10 py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
            &lt;map&gt; · error
          </p>
          <h2 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong">
            something broke at /map
          </h2>
          <p className="mt-3 font-mono text-xs text-sd-ink-soft/80 break-all">{error.message}</p>
          <div className="mt-5 flex items-center gap-4">
            <button type="button" onClick={reset} className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors">
              [ retry ]
            </button>
            <BracketLink href="/">[&gt; back to home]</BracketLink>
          </div>
        </div>
      </div>
    </section>
  );
}
