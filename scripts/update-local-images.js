const fs = require("fs");
const path = require("path");

const ROOT_DIRS = [
  "components",
  "pages",
  "lib",
  "styles",
];

const FILE_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
];

const IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|gif)$/i;

let changedFiles = 0;
let changedReferences = 0;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const items = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      processDirectory(fullPath);
      continue;
    }

    const fileExtension = path.extname(item.name).toLowerCase();

    if (!FILE_EXTENSIONS.includes(fileExtension)) {
      continue;
    }

    let content = fs.readFileSync(fullPath, "utf8");

    const originalContent = content;

    /*
     * Only change LOCAL image paths.
     *
     * Examples:
     * /assets/img/logo.png
     * assets/img/logo.png
     * ../public/assets/img/test.jpg
     */

    content = content.replace(
      /((?:\.\.\/)?(?:\/)?assets\/[^"'`\s)]+)\.(png|jpg|jpeg|gif)(?=[?#"'`\s)])/gi,
      (match, imagePath, extension) => {
        // Already WebP - don't touch
        if (imagePath.toLowerCase().endsWith(".webp")) {
          return match;
        }

        changedReferences++;

        return `${imagePath}.webp`;
      }
    );

    /*
     * Also handle paths beginning with:
     * ../public/assets/
     */

    content = content.replace(
      /((?:\.\.\/)+public\/assets\/[^"'`\s)]+)\.(png|jpg|jpeg|gif)(?=[?#"'`\s)])/gi,
      (match, imagePath) => {
        changedReferences++;

        return `${imagePath}.webp`;
      }
    );

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, "utf8");

      changedFiles++;

      console.log(`✅ Updated: ${fullPath}`);
    }
  }
}

console.log("");
console.log("Starting local image reference update...");
console.log("");

ROOT_DIRS.forEach(processDirectory);

console.log("");
console.log("=================================");
console.log("IMAGE REFERENCE UPDATE COMPLETE");
console.log("=================================");
console.log(`Files changed: ${changedFiles}`);
console.log(`References changed: ${changedReferences}`);
console.log("");