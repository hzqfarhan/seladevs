import { Eyebrow } from "@/components/ui/Eyebrow";
import { BracketLink } from "@/components/ui/BracketLink";

const TOP = [
  { rank: 1, handle: "kagerou1107", score: 9820, color: "from-sd-neon to-sd-wine-500" },
  { rank: 2, handle: "strdst7", score: 7640, color: "from-sd-purple to-sd-wine-500" },
  { rank: 3, handle: "unc_sayyuf", score: 5210, color: "from-sd-amber to-sd-wine-500" },
];

export function LeaderboardPreview() {
  return (
    <section id="leaderboard" className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>&lt;leaderboard&gt;</Eyebrow>
            <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong">
              ## discover top users in the community
            </h2>
          </div>
          <BracketLink href="/leaderboard">[&gt; view agent directory]</BracketLink>
        </div>

        <div
          className="mt-10 border border-sd-wine-500/30 rounded-2xl p-6 md:p-10 relative overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(255,45,85,0.12) 0%, transparent 50%), linear-gradient(rgba(255,45,85,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.08) 1px, transparent 1px)",
            backgroundSize: "auto, 30px 30px, 30px 30px",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOP.map((u) => (
              <article
                key={u.handle}
                className="border border-sd-wine-500/30 bg-sd-bg-1/80 rounded-2xl p-5 hover:border-sd-neon/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                    rank {String(u.rank).padStart(2, "0")}
                  </span>
                  <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${u.color} animate-glow`} />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon">
                    {u.handle.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-mono text-sm text-sd-ink-strong">@{u.handle}</p>
                    <p className="font-pixel text-3xl text-sd-neon">{u.score.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
                  <span>// score</span>
                  <span className="text-sd-neon-soft">[{u.rank === 1 ? "top" : "active"}]</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
