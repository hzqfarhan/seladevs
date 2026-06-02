import type { ReactNode } from "react";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHref(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("#")) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  if (trimmed.startsWith("mailto:")) {
    const email = trimmed.slice("mailto:".length).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
    return `mailto:${email}`;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return null;
}

function renderInline(text: string, keyPrefix: string): ReactNode {
  const parts: ReactNode[] = [];
  let remaining = text;
  let i = 0;

  const patterns: { re: RegExp; render: (m: RegExpMatchArray, k: string) => ReactNode }[] = [
    {
      re: /\[([^\]]+)\]\(([^)]+)\)/,
      render: (m, k) => {
        const href = sanitizeHref(m[2]);
        if (!href) return `[${m[1]}](${m[2]})`;
        const external = href.startsWith("http");
        return (
          <a
            key={k}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="text-sd-neon-soft hover:text-sd-neon underline underline-offset-2"
          >
            {m[1]}
          </a>
        );
      },
    },
    {
      re: /`([^`]+)`/,
      render: (m, k) => (
        <code key={k} className="font-mono text-[0.9em] bg-sd-bg-2 text-sd-amber px-1.5 py-0.5 rounded">
          {m[1]}
        </code>
      ),
    },
    {
      re: /\*\*([^*]+)\*\*/,
      render: (m, k) => <strong key={k} className="text-sd-ink-strong font-semibold">{m[1]}</strong>,
    },
    {
      re: /\*([^*]+)\*/,
      render: (m, k) => <em key={k}>{m[1]}</em>,
    },
  ];

  while (remaining.length > 0) {
    let earliest: { idx: number; len: number; node: ReactNode } | null = null;
    for (const p of patterns) {
      const m = remaining.match(p.re);
      if (m && m.index !== undefined && (earliest === null || m.index < earliest.idx)) {
        earliest = { idx: m.index, len: m[0].length, node: p.render(m, `${keyPrefix}-${i++}`) };
      }
    }
    if (!earliest) {
      parts.push(remaining);
      break;
    }
    if (earliest.idx > 0) parts.push(remaining.slice(0, earliest.idx));
    parts.push(earliest.node);
    remaining = remaining.slice(earliest.idx + earliest.len);
  }
  return <>{parts}</>;
}

function renderBlock(block: string, key: string): ReactNode {
  if (block.startsWith("```")) {
    const lines = block.split("\n");
    const code = lines.slice(1, -1).join("\n");
    return (
      <pre key={key} className="my-4 p-4 rounded-lg border border-sd-wine-500/30 bg-sd-bg-0/80 font-mono text-[12px] text-sd-ink-soft overflow-x-auto whitespace-pre">
{escapeHtml(code)}
      </pre>
    );
  }
  if (block.startsWith("### ")) {
    return <h3 key={key} className="mt-6 mb-2 font-pixel uppercase text-xl text-sd-ink-strong">{renderInline(block.slice(4), key)}</h3>;
  }
  if (block.startsWith("## ")) {
    return <h2 key={key} className="mt-8 mb-3 font-pixel uppercase text-2xl text-sd-ink-strong">{renderInline(block.slice(3), key)}</h2>;
  }
  if (block.startsWith("# ")) {
    return <h1 key={key} className="mt-8 mb-4 font-pixel uppercase text-3xl text-sd-ink-strong">{renderInline(block.slice(2), key)}</h1>;
  }
  if (block.startsWith("> ")) {
    const inner = block.split("\n").map((l) => l.replace(/^>\s?/, "")).join("\n");
    return (
      <blockquote key={key} className="my-3 pl-4 border-l-2 border-sd-neon/60 text-sd-ink-soft/85 italic">
        {renderInline(inner, key)}
      </blockquote>
    );
  }
  if (/^(\d+)\.\s/.test(block)) {
    const items = block.split("\n").filter((l) => /^\d+\.\s/.test(l)).map((l) => l.replace(/^\d+\.\s+/, ""));
    return (
      <ol key={key} className="my-3 list-decimal list-inside space-y-1.5 text-sd-ink-soft/90">
        {items.map((it, idx) => <li key={idx}>{renderInline(it, `${key}-${idx}`)}</li>)}
      </ol>
    );
  }
  if (/^[-*]\s/.test(block)) {
    const items = block.split("\n").filter((l) => /^[-*]\s/.test(l)).map((l) => l.replace(/^[-*]\s+/, ""));
    return (
      <ul key={key} className="my-3 space-y-1.5 text-sd-ink-soft/90">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2">
            <span aria-hidden className="text-sd-neon">·</span>
            <span>{renderInline(it, `${key}-${idx}`)}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p key={key} className="my-3 text-sd-ink-soft/90 leading-relaxed">{renderInline(block, key)}</p>;
}

export function parseMarkdown(md: string): ReactNode {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let buf: string[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      buf.push(line);
      if (inCode) {
        blocks.push(buf.join("\n"));
        buf = [];
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      buf.push(line);
      continue;
    }
    if (line.trim() === "") {
      if (buf.length > 0) {
        blocks.push(buf.join("\n"));
        buf = [];
      }
    } else {
      buf.push(line);
    }
  }
  if (buf.length > 0) blocks.push(buf.join("\n"));
  return <>{blocks.map((b, i) => renderBlock(b, `b${i}`))}</>;
}

interface Props {
  source: string;
  className?: string;
}

export function Markdown({ source, className }: Props) {
  return <div className={className}>{parseMarkdown(source)}</div>;
}
