// Generates a real geographic SVG path for each Malaysian state using actual lat/lng bounding boxes,
// projected through d3-geo's geoMercator. The output is a JSON file with path-d strings keyed by state code.
const fs = require("fs");
const path = require("path");
const d3 = require("d3-geo");
const topojson = require("topojson-client");

// Real lat/lng bounding boxes for each Malaysian state and federal territory.
// Sources: Wikipedia state pages + DOSM. These are tight approximations.
const STATE_BBOX = {
  PERLIS:           { minLng: 100.07, maxLng: 100.66, minLat: 6.16,  maxLat: 6.55 },
  KEDAH:            { minLng: 99.62,  maxLng: 101.10, minLat: 5.07,  maxLat: 6.55 },
  PULAU_PINANG:     { minLng: 100.20, maxLng: 100.56, minLat: 5.12,  maxLat: 5.60 },
  PERAK:            { minLng: 100.07, maxLng: 101.83, minLat: 3.66,  maxLat: 5.92 },
  KELANTAN:         { minLng: 101.34, maxLng: 102.66, minLat: 4.55,  maxLat: 6.25 },
  TERENGGANU:       { minLng: 102.38, maxLng: 103.62, minLat: 4.00,  maxLat: 5.90 },
  PAHANG:           { minLng: 101.34, maxLng: 103.62, minLat: 2.45,  maxLat: 4.78 },
  SELANGOR:         { minLng: 100.74, maxLng: 101.97, minLat: 2.55,  maxLat: 3.88 },
  KUALA_LUMPUR:     { minLng: 101.65, maxLng: 101.78, minLat: 3.04,  maxLat: 3.18 },
  PUTRAJAYA:        { minLng: 101.66, maxLng: 101.78, minLat: 2.86,  maxLat: 3.02 },
  NEGERI_SEMBILAN:  { minLng: 101.74, maxLng: 102.72, minLat: 2.40,  maxLat: 3.20 },
  MELAKA:           { minLng: 102.14, maxLng: 102.60, minLat: 2.05,  maxLat: 2.50 },
  JOHOR:            { minLng: 103.21, maxLng: 105.60, minLat: 1.21,  maxLat: 2.95 },
  SABAH:            { minLng: 115.21, maxLng: 119.28, minLat: 4.10,  maxLat: 7.36 },
  SARAWAK:          { minLng: 109.54, maxLng: 115.66, minLat: 0.85,  maxLat: 5.00 },
};

const CENTER_BBOX = {
  // Federal territories are tiny — position them as dots inside Selangor.
  // We render them as small circles at real lat/lng.
  KUALA_LUMPUR:  { lng: 101.69, lat: 3.14 },
  PUTRAJAYA:     { lng: 101.70, lat: 2.93 },
};

const projection = d3.geoMercator()
  .center([109, 4.0])
  .scale(2400)
  .translate([600, 380]);

function projectBox(b) {
  const p1 = projection([b.minLng, b.minLat]);
  const p2 = projection([b.maxLng, b.maxLat]);
  return { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1] };
}

function boxToPath(b) {
  const { x1, y1, x2, y2 } = projectBox(b);
  // SVG path: M x1 y1 L x2 y1 L x2 y2 L x1 y2 Z
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} L${x1.toFixed(2)} ${y2.toFixed(2)} Z`;
}

function pointToCircle(c, r) {
  const p = projection([c.lng, c.lat]);
  return { cx: p[0], cy: p[1], r };
}

const features = [];
for (const [code, bbox] of Object.entries(STATE_BBOX)) {
  if (code === "KUALA_LUMPUR" || code === "PUTRAJAYA") continue;
  features.push({ code, pathD: boxToPath(bbox), kind: "rect" });
}
const federal = [];
for (const code of Object.keys(CENTER_BBOX)) {
  federal.push({ code, ...pointToCircle(CENTER_BBOX[code], code === "KUALA_LUMPUR" ? 4 : 3), kind: "circle" });
}

const out = {
  viewBox: [0, 0, 600, 380],
  projection: { type: "mercator", center: [109, 4.0], scale: 2400 },
  states: features,
  federal,
};

const outPath = path.join(__dirname, "..", "data", "malaysia-states.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("wrote", outPath, "with", features.length, "states and", federal.length, "federal territories");
