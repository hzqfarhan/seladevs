"use client";
import { StatusPill } from "@/components/ui/StatusPill";
import { LogoMark } from "@/components/ui/LogoMark";
import { BracketLink } from "@/components/ui/BracketLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(255,45,85,0.18) 0%, transparent 60%), radial-gradient(40% 40% at 80% 80%, rgba(155,92,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,45,85,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.6) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <Cubes />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-32">
        <div className="flex items-center justify-between">
          <StatusPill>SYS.MEM // OK</StatusPill>
          <div className="md:hidden">
            <LogoMark width={120} height={40} />
          </div>
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;The forge for Malaysia&apos;s future builders&gt;
        </p>

        <h1 className="mt-4 font-pixel uppercase leading-[0.9] tracking-tighter text-[18vw] md:text-[10rem] text-sd-ink-strong animate-text-neon">
          SelaDevs<span className="text-sd-neon">.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg text-sd-ink-soft/85">
          A forge for high-performance builders. We are raising the next generation of technical excellence in Southeast Asia.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BracketLink href="/about">[&gt; learn more]</BracketLink>
          <BracketLink href="/hire/register">[&gt; sign up]</BracketLink>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
          <Coord label="lat" value="03.1390" />
          <Coord label="lng" value="101.6869" />
          <Coord label="node" value="kl-forge-01" />
          <Coord label="uptime" value="99.99%" />
        </div>
      </div>
    </section>
  );
}

function Coord({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 border border-sd-wine-500/20 rounded-md px-3 py-2 bg-sd-bg-1/40">
      <span className="text-sd-neon-soft">{label}</span>
      <span className="text-sd-ink-strong animate-hud-blink">{value}</span>
    </div>
  );
}

function Cubes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      <Cube className="left-[6%] top-[18%] w-16 h-16 opacity-70" />
      <Cube className="right-[10%] top-[24%] w-24 h-24 opacity-80" reverse />
      <Cube className="left-[14%] bottom-[18%] w-20 h-20 opacity-60" />
      <Cube className="right-[16%] bottom-[12%] w-28 h-28 opacity-80" reverse />
    </div>
  );
}

function Cube({ className, reverse }: { className?: string; reverse?: boolean }) {
  return (
    <div className={`absolute ${className}`} style={{ perspective: 800 }}>
      <div className={`relative w-full h-full ${reverse ? "animate-rotate-cube-reverse" : "animate-rotate-cube"}`} style={{ transformStyle: "preserve-3d" }}>
        <Face cls="inset-0 bg-sd-wine-500/30 border border-sd-neon/40" tx="translateZ(2rem)" />
        <Face cls="inset-0 bg-sd-wine-600/30 border border-sd-neon/30" tx="rotateY(180deg) translateZ(2rem)" />
        <Face cls="inset-0 bg-sd-wine-700/30 border border-sd-neon/30" tx="rotateY(90deg) translateZ(2rem)" />
        <Face cls="inset-0 bg-sd-wine-700/30 border border-sd-neon/30" tx="rotateY(-90deg) translateZ(2rem)" />
        <Face cls="inset-0 bg-sd-wine-400/30 border border-sd-neon/40" tx="rotateX(90deg) translateZ(2rem)" />
        <Face cls="inset-0 bg-sd-wine-400/30 border border-sd-neon/40" tx="rotateX(-90deg) translateZ(2rem)" />
      </div>
    </div>
  );
}

function Face({ cls, tx }: { cls: string; tx: string }) {
  return <div className={`absolute ${cls}`} style={{ transform: tx }} />;
}
