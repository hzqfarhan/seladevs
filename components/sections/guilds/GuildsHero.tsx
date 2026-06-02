import { Counter } from "@/components/ui/Counter";
import { StatusPill } from "@/components/ui/StatusPill";

export function GuildsHero() {
  return (
    <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;guilds&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## find your crew
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              themed working groups. weekly sprints. real shipping.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              <Counter value={89} suffix=" active guilds" />
            </p>
            <StatusPill tone="amber">12 recruiting</StatusPill>
          </div>
        </div>
      </div>
    </section>
  );
}
