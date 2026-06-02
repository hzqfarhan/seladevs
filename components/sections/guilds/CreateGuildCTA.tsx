import { BentoCard } from "@/components/ui/BentoCard";
import { BracketLink } from "@/components/ui/BracketLink";

export function CreateGuildCTA() {
  return (
    <section className="px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1440px]">
        <BentoCard clip withCorner className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;start a guild&gt;
            </p>
            <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">
              don't see your tribe?
            </h3>
            <p className="mt-1 text-sm text-sd-ink-soft/80 max-w-xl">
              start a guild. we'll give you a channel, a weekly rhythm, and a public mission page.
            </p>
          </div>
          <BracketLink href="/guilds/new">[&gt; start a guild]</BracketLink>
        </BentoCard>
      </div>
    </section>
  );
}
