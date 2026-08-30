/**
 * Validate CSS brace balance and report files with issues.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const files = [
  "styles/shared/layout.css",
  "styles/shared/utilities.css",
  "styles/pages/home.css",
  "styles/pages/about.css",
  "styles/pages/blog.css",
  "styles/pages/blog-detail.css",
  "styles/pages/contact.css",
  "styles/pages/portfolio.css",
  "styles/pages/service.css",
  "styles/pages/products.css",
  "styles/pages/faqs.css",
];

function balance(css) {
  let depth = 0;
  let minDepth = 0;
  let inStr = null;
  let inComment = false;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    const next = css[i + 1];
    if (inComment) {
      if (ch === "*" && next === "/") {
        inComment = false;
        i++;
      }
      continue;
    }
    if (inStr) {
      if (ch === "\\" ) {
        i++;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "/" && next === "*") {
      inComment = true;
      i++;
      continue;
    }
    if (ch === "'" || ch === '"') {
      inStr = ch;
      continue;
    }
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth < minDepth) minDepth = depth;
    }
  }
  return { depth, minDepth };
}

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.log("MISSING", rel);
    continue;
  }
  const css = fs.readFileSync(abs, "utf8");
  const { depth, minDepth } = balance(css);
  const ok = depth === 0 && minDepth >= 0;
  console.log(
    `${ok ? "OK" : "BAD"} ${rel} endDepth=${depth} minDepth=${minDepth} size=${css.length}`,
  );
}
