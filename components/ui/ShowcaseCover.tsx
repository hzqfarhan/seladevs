interface Props {
  id: number;
  title: string;
  className?: string;
}

const PALETTES: { from: string; to: string; ink: string }[] = [
  { from: "#FF2D55", to: "#5F0617", ink: "#FFE9EE" },
  { from: "#9B5CFF", to: "#5F0617", ink: "#FFE9EE" },
  { from: "#FFB454", to: "#8C0A26", ink: "#1A040B" },
  { from: "#FF7A93", to: "#14070C", ink: "#FFE9EE" },
  { from: "#B01434", to: "#14070C", ink: "#FFE9EE" },
  { from: "#FF2D55", to: "#9B5CFF", ink: "#FFE9EE" },
  { from: "#FFB454", to: "#5F0617", ink: "#FFE9EE" },
  { from: "#9B5CFF", to: "#14070C", ink: "#FFE9EE" },
  { from: "#FF2D55", to: "#FFB454", ink: "#1A040B" },
  { from: "#8C0A26", to: "#9B5CFF", ink: "#FFE9EE" },
  { from: "#FF7A93", to: "#5F0617", ink: "#FFE9EE" },
  { from: "#FF2D55", to: "#14070C", ink: "#FFB454" },
];

export function ShowcaseCover({ id, title, className }: Props) {
  const p = PALETTES[(id - 1) % PALETTES.length];
  const initial = title.charAt(0).toUpperCase();
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.to} stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`glow${id}`} cx="0.7" cy="0.3" r="0.6">
          <stop offset="0%" stopColor={p.from} stopOpacity="0.4" />
          <stop offset="100%" stopColor={p.to} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill={`url(#g${id})`} />
      <rect width="800" height="500" fill={`url(#glow${id})`} />
      <g stroke={p.ink} strokeOpacity="0.18" strokeWidth="1">
        <line x1="0" y1="125" x2="800" y2="125" />
        <line x1="0" y1="250" x2="800" y2="250" />
        <line x1="0" y1="375" x2="800" y2="375" />
        <line x1="200" y1="0" x2="200" y2="500" />
        <line x1="400" y1="0" x2="400" y2="500" />
        <line x1="600" y1="0" x2="600" y2="500" />
      </g>
      <g fill={p.ink} fillOpacity="0.5">
        <circle cx="120" cy="100" r="2" />
        <circle cx="680" cy="80" r="2" />
        <circle cx="540" cy="200" r="2" />
        <circle cx="80" cy="380" r="2" />
        <circle cx="720" cy="420" r="2" />
        <circle cx="320" cy="430" r="2" />
      </g>
      <g stroke={p.ink} strokeOpacity="0.15" strokeWidth="0.8" fill="none">
        <path d="M0 380 L200 320 L400 360 L600 300 L800 340" />
        <path d="M0 420 L200 400 L400 430 L600 380 L800 400" />
      </g>
      <text
        x="400"
        y="280"
        textAnchor="middle"
        fontFamily='"VT323", monospace'
        fontSize="200"
        fill={p.ink}
        fillOpacity="0.85"
        style={{ letterSpacing: "-0.04em" }}
      >
        {initial}
      </text>
    </svg>
  );
}
