"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface FormState {
  company: string;
  email: string;
  website: string;
  name: string;
  role: string;
  password: string;
  terms: boolean;
}

const DEFAULT: FormState = { company: "", email: "", website: "", name: "", role: "", password: "", terms: false };

export function HireForm() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.terms) return;
    const payload = { ...form, password: "***", at: new Date().toISOString() };
    try { localStorage.setItem(`sd:hire:${Date.now()}`, JSON.stringify(payload)); } catch {}
    setDone(true);
  }

  if (done) {
    return (
      <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;received&gt;
        </p>
        <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">thanks · {form.name}</h3>
        <p className="mt-2 text-sm text-sd-ink-soft/85">
          we received your registration for <span className="text-sd-ink-strong">{form.company}</span>. we'll verify the SSM registration and email you within 24h with a login link to the employer dashboard.
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-sd-amber">
          demo only. in prod this posts to /api/hire.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setForm(DEFAULT); setDone(false); }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/80 rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
          >
            [ register another ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="company name" value={form.company} onChange={(v) => update("company", v)} required />
        <Field label="company email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
        <Field label="company website" type="url" value={form.website} onChange={(v) => update("website", v)} placeholder="https://" />
        <Field label="your name" value={form.name} onChange={(v) => update("name", v)} required />
        <Field label="your role" value={form.role} onChange={(v) => update("role", v)} placeholder="e.g. Head of Engineering" />
        <Field label="password" type="password" value={form.password} onChange={(v) => update("password", v)} required placeholder="••••••••" />
      </div>
      <label className="mt-3 flex items-start gap-2 text-sm text-sd-ink-soft/85">
        <input
          type="checkbox"
          checked={form.terms}
          onChange={(e) => update("terms", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-sd-neon)]"
        />
        <span>
          i agree to the <a href="/terms" className="text-sd-neon hover:text-sd-neon-soft">terms of service</a> and the <a href="/privacy" className="text-sd-neon hover:text-sd-neon-soft">privacy policy</a>.
        </span>
      </label>
      <button
        type="submit"
        disabled={!form.terms}
        className={cn(
          "mt-4 w-full font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-4 py-2.5 transition-colors",
          form.terms
            ? "border-sd-neon text-sd-neon hover:bg-sd-wine-700/30"
            : "border-sd-wine-500/30 text-sd-ink-soft/40 cursor-not-allowed"
        )}
      >
        [ register · verify in 24h ]
      </button>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-sd-amber">
        demo only. in prod this posts to /api/hire.
      </p>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
      />
    </div>
  );
}
