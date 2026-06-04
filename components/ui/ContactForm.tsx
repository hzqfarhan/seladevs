"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

type Topic = "general" | "partnership" | "press" | "support" | "report";

interface FormState {
  name: string;
  email: string;
  company: string;
  role: string;
  topic: Topic;
  message: string;
}

const DEFAULT: FormState = { name: "", email: "", company: "", role: "", topic: "general", message: "" };

function ContactFormInner({ className, defaultTopic }: { className?: string; defaultTopic?: Topic }) {
  const sp = useSearchParams();
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [ticket, setTicket] = useState<string | null>(null);

  useEffect(() => {
    const t = (sp.get("topic") as Topic | null) ?? defaultTopic ?? "general";
    if (["general", "partnership", "press", "support", "report"].includes(t)) {
      setForm((f) => ({ ...f, topic: t }));
    }
  }, [sp, defaultTopic]);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    const id = `uthm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const payload = { ...form, at: new Date().toISOString() };
    try { localStorage.setItem(`uthm:contact:${id}`, JSON.stringify(payload)); } catch {}
    setTicket(id);
  }

  if (ticket) {
    return (
      <div className={cn("border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6", className)}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;received&gt;
        </p>
        <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">thanks · {form.name}</h3>
        <p className="mt-2 text-sm text-sd-ink-soft/85">
          we got your message on <span className="text-sd-ink-strong">{form.topic}</span>. expect a reply within 24h on weekdays.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
          ticket · {ticket}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => { navigator.clipboard?.writeText(ticket); }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/80 rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
          >
            [ copy ticket id ]
          </button>
          <button
            type="button"
            onClick={() => { setForm(DEFAULT); setTicket(null); }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/80 rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
          >
            [ send another ]
          </button>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-sd-amber">
          demo only. in prod this posts to /api/contact on uthmforge.uthm.edu.my.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="name" value={form.name} onChange={(v) => update("name", v)} required />
        <Field label="email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
        <Field label="company (optional)" value={form.company} onChange={(v) => update("company", v)} />
        <Field label="role (optional)" value={form.role} onChange={(v) => update("role", v)} />
        <SelectField label="topic" value={form.topic} onChange={(v) => update("topic", v as Topic)}>
          <option value="general">general</option>
          <option value="partnership">partnership</option>
          <option value="press">press</option>
          <option value="support">support</option>
          <option value="report">report</option>
        </SelectField>
      </div>
      <div className="mt-3">
        <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
          message · {form.message.length}/1000
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value.slice(0, 1000))}
          rows={6}
          className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
          placeholder="tell us what's on your mind."
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2.5 hover:bg-sd-wine-700/30 transition-colors"
      >
        [ send message ]
      </button>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-sd-amber">
        demo only. in prod this posts to /api/contact on uthmforge.uthm.edu.my.
      </p>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
      >
        {children}
      </select>
    </div>
  );
}

export function ContactForm(props: { className?: string; defaultTopic?: Topic }) {
  return (
    <Suspense fallback={<div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 h-64 animate-shimmer" />}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}
