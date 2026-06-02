"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

const MalaysiaMap = dynamic(
  () => import("./MalaysiaMap").then((m) => m.MalaysiaMap),
  {
    ssr: false,
    loading: () => <Skeleton className="aspect-[8/5] rounded-2xl" />,
  }
);

export function MalaysiaMapClient() {
  return <MalaysiaMap />;
}
