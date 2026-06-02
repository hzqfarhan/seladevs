import Link from "next/link";

export default async function NotFound({ params }: { params?: Promise<{ handle?: string }> }) {
  let handle = "unknown";
  try {
    if (params) {
      const p = await params;
      if (p && typeof p.handle === "string") handle = p.handle;
    }
  } catch {}
  return (
    <section className="px-6 md:px-10 py-24">
      <div className="mx-auto max-w-[1440px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;404&gt;
        </p>
        <h2 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
          404 · @{handle} not found
        </h2>
        <p className="mt-4 text-sd-ink-soft/80 max-w-md mx-auto">
          no such builder in the directory.
        </p>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em]">
          <Link href="/members" className="text-sd-neon hover:text-sd-neon-soft">[&gt; back to /members]</Link>
        </div>
      </div>
    </section>
  );
}
