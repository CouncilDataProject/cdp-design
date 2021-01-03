const { glob } = require("glob");
const fs = require("fs");

let allImages = glob.sync(__dirname + "/src/static/img/**/*.png");

let cssElements = [];
allImages.map((f) => {
  let splitF = f.split("/");
  let imgType = splitF[splitF.length - 2];
  let fname = splitF[splitF.length - 1];
  let className = fname.replace(".png", "");

  cssElements.push(
    `.cdp-${imgType}-${className} {
    content: url(../img/${imgType}/${fname})
}`
  );
});

let cssText = cssElements.join("\n\n");

// Remove old and write new
const cssFilepath = __dirname + "/src/static/css/cdp-img.css";
try {
  fs.unlinkSync(cssFilepath);
} catch (err) {
  console.error(err);
}
fs.writeFileSync(cssFilepath, cssText);

console.log(`Generated file: ${cssFilepath}`);
