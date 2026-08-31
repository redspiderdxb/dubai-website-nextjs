/**
 * Remove duplicate UNIFIED TYPOGRAPHY block from utilities.css
 */

import fs from "fs";
import path from "path";

const files = [
  "styles/shared/utilities.css",
  "public/assets/css/shared/utilities.css",
];

const ROOT = path.resolve(import.meta.dirname, "..");
const START = "/* =========================================================\n   UNIFIED TYPOGRAPHY";
const END_MARKER = ".rs-creative-intro__grid";

for (const rel of files) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, "utf8");
  const startIdx = content.indexOf(START);
  if (startIdx === -1) {
    console.log(`No block in ${rel}`);
    continue;
  }

  const endIdx = content.indexOf(END_MARKER, startIdx);
  if (endIdx === -1) {
    console.log(`End marker not found in ${rel}`);
    continue;
  }

  const next = content.slice(0, startIdx) + content.slice(endIdx);
  fs.writeFileSync(filePath, next);
  console.log(`Removed UNIFIED TYPOGRAPHY from ${rel}`);
}
