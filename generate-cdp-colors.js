const fs = require("fs");

const COLORS = {
  dark_purple: "#190d2e",
  light_purple: "#664ebc",
  red: "#ff3f57",
  dark_orange: "#ea5246",
  yellow: "#feb938",
  white: "#fff",
  light_grey: "#f5f5f5",
  teal: "#03bdb8",
};

let cssElements = [];

for (const key in COLORS) {
  let cleanedKey = key.replace("_", "-");
  let value = COLORS[key];

  cssElements.push(
    `.cdp-${cleanedKey} {
    color: ${value}
}`
  );

  cssElements.push(
    `.cdp-bg-${cleanedKey} {
    background-color: ${value}
}`
  );
}

let cssText = cssElements.join("\n\n");

// Remove old and write new
const cssFilepath = __dirname + "/src/static/css/cdp-colors.css";
try {
  fs.unlinkSync(cssFilepath);
} catch (err) {
  console.error(err);
}
fs.writeFileSync(cssFilepath, cssText);

console.log(`Generated file: ${cssFilepath}`);
