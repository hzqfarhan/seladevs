"use client";
import { useState } from "react";
import { JobApplyModal } from "@/components/sections/jobs/JobApplyModal";
import type { Job } from "@/data/jobs";

export function JobApplyButton({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full font-mono text-[11px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2.5 hover:bg-sd-wine-700/30 transition-colors"
      >
        [ apply to this role ]
      </button>
      <JobApplyModal open={open} onClose={() => setOpen(false)} job={job} />
    </>
  );
}

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        navigator.clipboard?.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="mt-3 w-full font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/80 rounded-full px-3 py-2 hover:border-sd-neon hover:text-sd-neon transition-colors"
    >
      {copied ? "✓ copied" : "[ copy link ]"}
    </button>
  );
}
