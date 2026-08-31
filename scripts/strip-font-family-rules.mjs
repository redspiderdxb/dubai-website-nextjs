/**
 * Remove scattered font-family declarations from project CSS.
 * Typography lives in styles/shared/fonts.css only.
 *
 * Run: node scripts/strip-font-family-rules.mjs
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

const SKIP_PARTS = [
  "node_modules",
  ".next",
  "vendor",
  "bootstrap-icons",
  "fonts.css",
  "specimen_files",
  "rundkursiv",
];

const TARGET_DIRS = [
  path.join(ROOT, "styles"),
  path.join(ROOT, "public", "assets", "css"),
];

const FONT_FAMILY_RE = /^\s*font-family\s*:\s*[^;]+;?\s*$/;

function shouldSkip(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  return SKIP_PARTS.some((part) => normalized.includes(part));
}

function stripFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  const lines = original.split("\n");
  const next = lines.filter((line) => !FONT_FAMILY_RE.test(line));

  if (next.length === lines.length) {
    return 0;
  }

  fs.writeFileSync(filePath, next.join("\n"));
  return lines.length - next.length;
}

let totalRemoved = 0;
let filesChanged = 0;

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) continue;

  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!shouldSkip(full)) stack.push(full);
        continue;
      }

      if (!entry.name.endsWith(".css") || shouldSkip(full)) continue;

      const removed = stripFile(full);
      if (removed > 0) {
        filesChanged += 1;
        totalRemoved += removed;
        console.log(`  ${path.relative(ROOT, full)} (-${removed})`);
      }
    }
  }
}

console.log(`Done: ${filesChanged} files, ${totalRemoved} font-family rules removed.`);
