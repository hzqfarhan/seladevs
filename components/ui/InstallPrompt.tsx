"use client";
import { useEffect, useState } from "react";

const DISMISS_KEY = "sd-install-dismissed";
const DISMISS_DAYS = 14;

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const ts = parseInt(dismissed, 10);
      if (Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }
    const onBefore = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBefore);
    return () => window.removeEventListener("beforeinstallprompt", onBefore);
  }, []);

  if (!visible || !deferred) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] max-w-sm animate-enter">
      <div className="border border-sd-neon/60 bg-sd-bg-0/95 rounded-2xl p-4 shadow-[0_0_30px_rgba(255,45,85,0.3)] backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;install&gt;
        </p>
        <p className="mt-1 font-pixel uppercase text-xl text-sd-ink-strong">Install SelaDevs</p>
        <p className="mt-1 text-sm text-sd-ink-soft/80">Add to your home screen. Works offline.</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={async () => {
              await deferred.prompt();
              setVisible(false);
            }}
            className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-strong border border-sd-neon/60 bg-sd-wine-700/60 rounded-md px-3 py-1.5 hover:shadow-[0_0_20px_rgba(255,45,85,0.5)] transition-shadow"
          >
            [ &gt; install ]
          </button>
          <button
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, String(Date.now()));
              setVisible(false);
            }}
            className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/60 hover:text-sd-neon-soft px-3 py-1.5"
          >
            dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
