export type FacultyRegion = "engineering" | "computing" | "applied" | "management" | "centre";

export type StateDatum = {
  code: string;
  name: string;
  slug: string;
  landmark: string;
  region: FacultyRegion;
  coords: { x: number; y: number };
  pathD: string;
  shape: "path" | "circle";
  builders: number;
  guilds: number;
  jobs: number;
  events: number;
};

// UTHM campus faculty map (Parit Raja, Batu Pahat, Johor).
// TODO: confirm coordinates, builder counts, and faculty list with UTHM data team.
// viewBox is 600x420 to keep proportions similar to original Malaysia map.
export const UTHM_FACULTIES: StateDatum[] = [
  {
    code: "FSKTM",
    name: "FSKTM",
    slug: "fsktm",
    landmark: "Faculty of Computer Science & IT",
    region: "computing",
    coords: { x: 220, y: 130 },
    pathD: "M180 100 L260 100 L260 165 L180 165 Z",
    shape: "path",
    builders: 412,
    guilds: 14,
    jobs: 6,
    events: 5,
  },
  {
    code: "FKMP",
    name: "FKMP",
    slug: "fkmp",
    landmark: "Faculty of Mechanical & Manufacturing Eng.",
    region: "engineering",
    coords: { x: 380, y: 130 },
    pathD: "M340 100 L420 100 L420 165 L340 165 Z",
    shape: "path",
    builders: 268,
    guilds: 8,
    jobs: 4,
    events: 3,
  },
  {
    code: "FKE",
    name: "FKE",
    slug: "fke",
    landmark: "Faculty of Electrical & Electronic Eng.",
    region: "engineering",
    coords: { x: 300, y: 200 },
    pathD: "M260 175 L340 175 L340 230 L260 230 Z",
    shape: "path",
    builders: 224,
    guilds: 6,
    jobs: 3,
    events: 2,
  },
  {
    code: "FKAAS",
    name: "FKAAS",
    slug: "fkaas",
    landmark: "Faculty of Civil & Environmental Eng.",
    region: "engineering",
    coords: { x: 460, y: 200 },
    pathD: "M425 175 L495 175 L495 230 L425 230 Z",
    shape: "path",
    builders: 142,
    guilds: 4,
    jobs: 2,
    events: 2,
  },
  {
    code: "FPTV",
    name: "FPTV",
    slug: "fptv",
    landmark: "Faculty of Technical & Vocational Edu.",
    region: "applied",
    coords: { x: 220, y: 280 },
    pathD: "M180 255 L260 255 L260 310 L180 310 Z",
    shape: "path",
    builders: 88,
    guilds: 3,
    jobs: 1,
    events: 1,
  },
  {
    code: "FSTI",
    name: "FSTI",
    slug: "fsti",
    landmark: "Faculty of Science & Information Tech.",
    region: "applied",
    coords: { x: 380, y: 280 },
    pathD: "M340 255 L420 255 L420 310 L340 310 Z",
    shape: "path",
    builders: 110,
    guilds: 4,
    jobs: 2,
    events: 2,
  },
  {
    code: "FPM",
    name: "FPM",
    slug: "fpm",
    landmark: "Faculty of Technology Management",
    region: "management",
    coords: { x: 300, y: 360 },
    pathD: "M260 335 L340 335 L340 380 L260 380 Z",
    shape: "path",
    builders: 72,
    guilds: 2,
    jobs: 1,
    events: 1,
  },
  {
    code: "CAPS",
    name: "UTHM-CAPS",
    slug: "caps",
    landmark: "Centre for Academic Dev. & Postgrad Studies",
    region: "centre",
    coords: { x: 470, y: 360 },
    pathD: "M470 360 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0",
    shape: "circle",
    builders: 38,
    guilds: 1,
    jobs: 1,
    events: 2,
  },
  {
    code: "PTTA",
    name: "PTTA",
    slug: "ptta",
    landmark: "Teaching & Learning Centre",
    region: "centre",
    coords: { x: 530, y: 360 },
    pathD: "M530 360 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0",
    shape: "circle",
    builders: 24,
    guilds: 1,
    jobs: 0,
    events: 1,
  },
];

// Legacy alias — components that still import `StateRegion` keep compiling.
// TODO: rename to `FacultyRegion` across the codebase in a follow-up.
export type StateRegion = FacultyRegion;

// Legacy export kept for components that still import `STATES`.
export const STATES = UTHM_FACULTIES;
