"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function Counter({ value, prefix = "", suffix = "", className, duration = 1600 }: Props) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  const { value: displayed, ref: countRef } = useCountUp(value, { start: inView, prefix, suffix, duration });
  return (
    <span ref={(el) => { ref.current = el; (countRef as React.MutableRefObject<HTMLSpanElement | null>).current = el; }} className={className}>
      {displayed}
    </span>
  );
}
