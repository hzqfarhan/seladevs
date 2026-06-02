import Link from "next/link";

export default async function NotFound({ params }: { params?: Promise<{ state?: string }> }) {
  let state = "unknown";
  try {
    if (params) {
      const p = await params;
      if (p && typeof p.state === "string") state = p.state;
    }
  } catch {}
  return (
    <section className="px-6 md:px-10 py-24">
      <div className="mx-auto max-w-[1440px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;404&gt;
        </p>
        <h2 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
          404 · "{state}" not on the map
        </h2>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em]">
          <Link href="/map" className="text-sd-neon hover:text-sd-neon-soft">[&gt; back to map]</Link>
        </div>
      </div>
    </section>
  );
}
