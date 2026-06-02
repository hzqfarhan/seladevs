const fs = require("fs");
const dir = ".next/static/css";
const files = fs.readdirSync(dir);
const c = fs.readFileSync(`${dir}/${files[0]}`, "utf8");
const m = c.match(/html\.light\s*\{[^}]+\}/g);
if (m) {
  console.log("found", m.length, "html.light blocks");
  m.slice(0, 5).forEach((x, i) => {
    console.log("---", i, "---");
    console.log(x.substring(0, 300));
  });
} else {
  console.log("no html.light in compiled css");
}

// Also check for the map vars
const mapVar = c.match(/--sd-map-fill-\w+:\s*#[0-9A-Fa-f]+/g);
console.log("\nmap vars:", mapVar);

const lightMapVar = c.match(/html\.light[^}]*--sd-map[^}]+/g);
console.log("\nlight map override:", lightMapVar);
