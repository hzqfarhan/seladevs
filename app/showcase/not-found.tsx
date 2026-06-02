import { BracketLink } from "@/components/ui/BracketLink";

export default function NotFound() {
  return (
    <section className="px-6 md:px-10 py-24">
      <div className="mx-auto max-w-[1440px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;404&gt;
        </p>
        <h2 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
          404 · signal lost
        </h2>
        <p className="mt-4 text-sd-ink-soft/80 max-w-md mx-auto">
          the page you are looking for has dropped out of the band.
        </p>
        <div className="mt-6">
          <BracketLink href="/">[&gt; back to home]</BracketLink>
        </div>
      </div>
    </section>
  );
}
