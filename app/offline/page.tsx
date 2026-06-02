import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <main className="min-h-dvh grid place-items-center px-6">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <LogoMark width={180} height={60} />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sd-neon-soft">
          offline<span className="animate-cursor-blink">_</span>
        </p>
        <h1 className="font-pixel uppercase text-4xl text-sd-ink-strong">no signal</h1>
        <p className="text-sd-ink-soft/80">
          Looks like you&apos;re offline. Reconnect to get the latest from the forge.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sd-ink-strong bg-sd-wine-700/60 border border-sd-neon/60 rounded-md px-4 py-2 hover:shadow-[0_0_20px_rgba(255,45,85,0.55)] transition-shadow"
        >
          [ &gt; retry ]
        </Link>
      </div>
    </main>
  );
}
