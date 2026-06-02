import { BracketLink } from "@/components/ui/BracketLink";

export function EventBanner() {
  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <a
          href="/events/seladevs-buildathon-2026"
          className="group block relative overflow-hidden border border-sd-wine-500/30 rounded-2xl bg-sd-bg-1/60 hover:border-sd-neon/60 transition-colors"
        >
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;SelaDevs Buildathon 2026&gt;
              </p>
              <p className="text-sd-ink-strong/80 text-sm">
                Open: <span className="text-sd-neon">SelaDevs Buildathon 2026</span> applications — ships end of August.
              </p>
              <span className="font-mono text-[11px] uppercase tracking-widest text-sd-neon-soft group-hover:text-sd-neon">
                [ read more → ]
              </span>
            </div>
            <div className="relative h-44 md:h-auto">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #5F0617 0%, #B01434 50%, #FF2D55 100%)",
                }}
              />
              <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)", backgroundSize: "100% 4px" }} />
              <div className="absolute inset-0 grid place-items-center text-sd-ink-strong font-pixel uppercase text-2xl md:text-3xl tracking-tighter">
                BUILD // SHIP // BELONG
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
