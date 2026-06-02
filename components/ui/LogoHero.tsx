"use client";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/cn";

export function LogoHero({
  className,
  size = 520,
}: {
  className?: string;
  size?: number;
}) {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const src = isLight ? "/logo/seladevs-light.png" : "/logo/seladevs-dark.png";

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 55%, rgba(255,45,85,0.30) 0%, rgba(255,45,85,0.08) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 animate-glow rounded-full"
        style={{
          boxShadow: "0 0 90px 10px rgba(255,45,85,0.25), inset 0 0 60px rgba(255,45,85,0.18)",
        }}
      />
      <img
        src={src}
        alt="SelaDevs"
        width={size}
        height={Math.round(size * 0.28)}
        className={cn("block animate-hero-logo animate-logo-glitch", "drop-shadow-[0_0_28px_rgba(255,45,85,0.35)]")}
        style={{ width: "auto", height: "auto", maxWidth: size }}
        draggable={false}
      />
    </div>
  );
}
