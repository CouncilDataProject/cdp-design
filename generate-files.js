const { glob } = require("glob");
const { execSync } = require("child_process");
const fs = require("fs");

const VARIANT_SIZES = [16, 32, 64, 128, 256];

function generateResizeVariants(f) {
  for (resizeTo of VARIANT_SIZES) {
    let resizeName = f.replace(".png", `-size-${resizeTo}.png`);

    execSync(
      `convert -resize ${resizeTo}x${resizeTo} ${f} ${resizeName}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      }
    );

    console.log(`Generated file: ${resizeName}`);
  }

  return;
}

function generateBackgroundVariant(f) {
  // Generate white and black backgrounds
  let bgWhite = f.replace("bg-transparent", "bg-white");
  let bgBlack = f.replace("bg-transparent", "bg-black");

  if (f.includes("white")) {
    execSync(
      `convert -background black -alpha remove -alpha off ${f} ${bgBlack}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      }
    );

    console.log(`Generated file: ${bgBlack}`);
  } else if (f.includes("black")) {
    execSync(
      `convert -background white -alpha remove -alpha off ${f} ${bgWhite}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      }
    );

    console.log(`Generated file: ${bgWhite}`);
  }

  return;
}

// CLEAR OLD FILES
let bgBlackFiles = glob.sync(__dirname + "/src/static/img/**/*bg-black*");
let bgWhiteFiles = glob.sync(__dirname + "/src/static/img/**/*bg-white*");
let bgTransFiles = glob.sync(__dirname + "/src/static/img/**/*bg-transparent-size*");
let allPriorGenFiles = bgBlackFiles.concat(bgWhiteFiles, bgTransFiles);
allPriorGenFiles.map((f) => fs.unlinkSync(f));

// RUN BLACK AND WHITE BACKGROUND GENERATION
bgTransOrigs = glob.sync(__dirname + "/src/static/img/**/*-bg-transparent.png");
bgTransOrigs.map((f) => generateBackgroundVariant(f));

// RUN ALL ICON SIZES GENERATION
allIcons = glob.sync(__dirname + "/src/static/img/icon/*.png");
console.log(allIcons);
allIcons.map((f) => generateResizeVariants(f));
