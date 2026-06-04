export type CaseStudy = {
  id: number;
  slug: string;
  client: string;
  title: string;
  timeline: string;
  outcome: string;
  body: string;
};

export const GOV_CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    slug: "fsktm-bahasa-ocr-fyp",
    client: "UTHM · FSKTM",
    title: "Bahasa Melayu OCR pipeline (FYP)",
    timeline: "12 weeks",
    outcome: "shipped · RM 900 paid",
    body: `brief: a 2025 FYP at FSKTM needed a public, reproducible OCR pipeline for old UTHM Library thesis PDFs — most of which are in Bahasa Melayu with non-standard typeface.

delivered: a working pipeline (Tesseract + a post-correction pass) that lifts Bahasa-Melayu text out of 1980s–2000s thesis scans. 12 weeks from kickoff to merged OSS, including 2 weeks of design review with Dr. Aini's NLP group.

UTHM Forge paid the 2 builders (RM 900 total) out of the community bounty bank. the code is MIT-licensed and live on github.`,
  },
  {
    id: 2,
    slug: "fkmp-johor-predictive-maintenance",
    client: "UTHM · FKMP × Maju Holdings",
    title: "predictive maintenance for a Johor factory",
    timeline: "8 weeks",
    outcome: "live in factory · 14% downtime reduction",
    body: `brief: a Johor-based manufacturing partner (Maju Holdings) asked FKMP for a student-built IoT prototype that could predict pump failure 48h in advance.

delivered: 4 final-year ME + EE students shipped an edge device (ESP32 + vibration sensor) and a small ML model that runs on a Raspberry Pi at the plant. the first 8 weeks in production showed a 14% reduction in unplanned downtime.

funded by Maju Holdings (RM 6,000) and an FKMP research grant (RM 2,000). the work continues as a follow-on FYP in 2026.`,
  },
  {
    id: 3,
    slug: "uthm-ptta-iot-air-quality",
    client: "UTHM · PTTA × MBIP",
    title: "low-cost IoT air-quality monitor for Batu Pahat",
    timeline: "in flight",
    outcome: "20 units · shipping 2026",
    body: `brief: Majlis Bandaraya Batu Pahat (MBIP) wanted a low-cost, open-source air-quality monitor that secondary schools in the district could deploy.

in flight: a collaboration between the UTHM Teaching & Learning Centre (PTTA) and the UTHM Edge circle. 20 ESP32-based units are being built by FKE students; the data pipeline runs on a UTHM-managed Supabase instance. the firmware, the dashboard, and the calibration scripts will be MIT-licensed.

funded by an MBIP community grant (RM 18,000) and a PTTA teaching-practicum budget (RM 4,500). first 20 units ship to schools in 2026.`,
  },
];
