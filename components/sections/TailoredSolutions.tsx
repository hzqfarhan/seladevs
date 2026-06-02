import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const CARDS = [
  {
    href: "/for-developers",
    eyebrow: "<for developers>",
    title: "Build a portfolio that pays.",
    body: "Not just another job board. Earn real money while learning modern skills on shipping projects.",
    art: "devs",
  },
  {
    href: "/for-companies",
    eyebrow: "<for companies>",
    title: "Hire real engineering talent.",
    body: "A faster, smarter, more efficient way to scale your development team across Southeast Asia.",
    art: "companies",
  },
  {
    href: "/for-government",
    eyebrow: "<for government>",
    title: "A self-sustaining ecosystem.",
    body: "We solve the talent gap through gamification, community, and real economic incentives — for the long term.",
    art: "government",
  },
];

export function TailoredSolutions() {
  return (
    <section id="about" className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow>&lt;about us&gt;</Eyebrow>
        <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong">
          ## tailored solutions
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 overflow-hidden hover:border-sd-neon/60 transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)] min-h-[280px]"
            >
              <Art variant={c.art} />
              <div className="relative z-10 flex flex-col h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  {c.eyebrow}
                </p>
                <h3 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-sd-ink-soft/80">{c.body}</p>
                <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-widest text-sd-neon-soft group-hover:text-sd-neon">
                  [ read more → ]
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Art({ variant }: { variant: string }) {
  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,45,85,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <svg viewBox="0 0 200 200" className="absolute -right-6 -bottom-6 w-48 h-48 opacity-60 group-hover:scale-105 transition-transform">
        {variant === "devs" && (
          <g fill="none" stroke="#FF2D55" strokeWidth="1">
            <rect x="40" y="40" width="80" height="80" />
            <path d="M40 40 L120 120 M120 40 L40 120" />
            <circle cx="80" cy="80" r="6" fill="#FF2D55" />
          </g>
        )}
        {variant === "companies" && (
          <g fill="none" stroke="#FF2D55" strokeWidth="1">
            <polygon points="80,30 130,60 130,120 80,150 30,120 30,60" />
            <polygon points="80,55 110,72 110,108 80,125 50,108 50,72" fill="rgba(255,45,85,0.15)" />
          </g>
        )}
        {variant === "government" && (
          <g fill="none" stroke="#FF2D55" strokeWidth="1">
            <path d="M20 160 L60 80 L100 130 L140 60 L180 160 Z" />
            <circle cx="60" cy="80" r="4" fill="#FF2D55" />
            <circle cx="140" cy="60" r="4" fill="#FF2D55" />
          </g>
        )}
      </svg>
    </div>
  );
}
