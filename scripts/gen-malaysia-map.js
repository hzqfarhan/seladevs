// Generates a real geographic data file for the Malaysia map.
// We use d3-geo's geoMercator + fitExtent to put the entire Malaysia
// country outline (from world-atlas) into the viewBox, then project each
// state centroid through the same projection. This guarantees the country
// outline and the hotspots use the same projection.
const fs = require("fs");
const path = require("path");
const d3 = require("d3-geo");
const topojson = require("topojson-client");

// Real lat/lng centroids (approximate, from DOSM).
const STATE_CENTROID = {
  PERLIS:           { lng: 100.36, lat: 6.45 },
  KEDAH:            { lng: 100.36, lat: 5.80 },
  "PULAU PINANG":   { lng: 100.38, lat: 5.36 },
  PERAK:            { lng: 101.00, lat: 4.80 },
  KELANTAN:         { lng: 102.00, lat: 5.40 },
  TERENGGANU:       { lng: 103.00, lat: 4.95 },
  PAHANG:           { lng: 102.50, lat: 3.75 },
  SELANGOR:         { lng: 101.35, lat: 3.22 },
  "KUALA LUMPUR":   { lng: 101.69, lat: 3.14 },
  PUTRAJAYA:        { lng: 101.70, lat: 2.93 },
  "NEGERI SEMBILAN":{ lng: 102.23, lat: 2.80 },
  MELAKA:           { lng: 102.37, lat: 2.27 },
  JOHOR:            { lng: 104.40, lat: 2.05 },
  SABAH:            { lng: 117.20, lat: 5.50 },
  SARAWAK:          { lng: 113.00, lat: 2.80 },
};

const HOTSPOT_R = 22;
const FED_R = 6;
const VBW = 600;
const VBH = 380;

// Load the world-atlas country feature for Malaysia
const worldTopo = require("../data/world-110m.json");
const fc = topojson.feature(worldTopo, worldTopo.objects.countries);
const malaysia = fc.features.find((f) => f.properties && f.properties.name === "Malaysia");

if (!malaysia) {
  console.error("Malaysia feature not found in world-atlas. Aborting.");
  process.exit(1);
}

// Fit projection to include all of Malaysia (Peninsular + Borneo) with
// a small inner padding so the country doesn't touch the edges.
const projection = d3.geoMercator().fitExtent(
  [[12, 12], [VBW - 12, VBH - 12]],
  malaysia
);

const hotspots = [];
for (const [code, c] of Object.entries(STATE_CENTROID)) {
  const isFed = code === "KUALA LUMPUR" || code === "PUTRAJAYA";
  const [x, y] = projection([c.lng, c.lat]);
  if (isNaN(x) || isNaN(y)) {
    console.warn("skip", code, "→", x, y);
    continue;
  }
  hotspots.push({
    code,
    cx: Number(x.toFixed(2)),
    cy: Number(y.toFixed(2)),
    r: isFed ? FED_R : HOTSPOT_R,
    kind: isFed ? "federal" : "state",
  });
}

const out = {
  viewBox: [0, 0, VBW, VBH],
  // The projection parameters are derived; we save them so the React
  // component can use the EXACT same projection for the country path.
  projection: {
    type: "mercator",
    center: projection.center(),
    scale: projection.scale(),
    translate: projection.translate(),
  },
  hotspots,
};

const outPath = path.join(__dirname, "..", "data", "malaysia-states.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("wrote", outPath, "with", hotspots.length, "hotspots");
console.log("projection: center", projection.center(), "scale", projection.scale(), "translate", projection.translate());
