const fs = require("fs");
const dir = ".next/static/css";
const c = fs.readFileSync(`${dir}/${fs.readdirSync(dir)[0]}`, "utf8");
const m = c.match(/--sd-map-fill-\w+:\s*#[0-9a-f]+/g);
console.log("all map var defs in CSS:");
m.forEach(x => console.log(" ", x));
