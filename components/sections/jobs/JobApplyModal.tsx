"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { Job } from "@/data/jobs";

interface Props {
  open: boolean;
  onClose: () => void;
  job: Job | null;
}

export function JobApplyModal({ open, onClose, job }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [note, setNote] = useState("");
  const [resume, setResume] = useState("");
  const [sent, setSent] = useState(false);

  function reset() {
    setName(""); setEmail(""); setHandle(""); setNote(""); setResume(""); setSent(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!job) return;
    const payload = { jobId: job.id, slug: job.slug, name, email, handle, note, resume, at: new Date().toISOString() };
    try {
      localStorage.setItem(`sd:apply:${job.id}`, JSON.stringify(payload));
    } catch {}
    setSent(true);
  }

  if (!job) return null;

  return (
    <Modal open={open} onClose={() => { onClose(); setTimeout(reset, 200); }} ariaLabel={`Apply to ${job.title}`}>
      {sent ? (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
            &lt;{job.slug} · sent&gt;
          </p>
          <h2 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong">application sent</h2>
          <p className="mt-3 text-sm text-sd-ink-soft/80">
            your application for <span className="text-sd-ink-strong">{job.title}</span> at {job.company} is in the queue. expect a reply within 24h.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-sd-amber">
            demo only. in prod this posts to /api/apply.
          </p>
          <button
            type="button"
            onClick={() => { onClose(); setTimeout(reset, 200); }}
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
          >
            [ close ]
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
            &lt;{job.slug}&gt;
          </p>
          <h2 className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong leading-tight">
            apply · {job.title}
          </h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/60">
            {job.company} · {job.location} · {job.type}
          </p>

          <div className="mt-5 space-y-3">
            <Field label="name" value={name} onChange={setName} required />
            <Field label="email" type="email" value={email} onChange={setEmail} required />
            <Field label="github / x handle" value={handle} onChange={setHandle} placeholder="@you" />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
                note · {note.length}/500
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
                rows={4}
                className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
                placeholder="tell us why you'd ship this well."
              />
            </div>
            <Field label="resume url (optional)" type="url" value={resume} onChange={setResume} placeholder="https://" />
          </div>

          <button
            type="submit"
            className="mt-5 w-full font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-2 hover:bg-sd-wine-700/30 transition-colors"
          >
            [ send application ]
          </button>
        </form>
      )}
    </Modal>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-md p-2 text-sm text-sd-ink-soft focus:outline-none focus:border-sd-neon"
      />
    </div>
  );
}
