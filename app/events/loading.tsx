import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <section className="px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1440px] space-y-2">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
      </div>
    </section>
  );
}
