"use client";
import Image from "next/image";
import { useTheme } from "@/lib/useTheme";

export function LogoMark({ className, width = 220, height = 80 }: { className?: string; width?: number; height?: number }) {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const src = isLight ? "/logo/seladevs-light.png" : "/logo/seladevs-dark.png";
  return (
    <span className={className} aria-label="SelaDevs">
      <Image
        src={src}
        alt="SelaDevs"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
        style={{ width: "auto", height: "auto", maxHeight: height }}
      />
    </span>
  );
}
