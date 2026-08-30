/**
 * Rewrite legacy public/assets/css relative urls to absolute /assets paths
 * so webpack can resolve them from styles/** imports.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const targets = [
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

function rewrite(css) {
  // url(../img/...) or url("../img/...") or url('../img/...')
  // from public/assets/css → /assets/img/...
  let out = css.replace(
    /url\(\s*(['"]?)\.\.\/img\//g,
    "url($1/assets/img/",
  );

  // url(../fonts/...) → /assets/fonts/...
  out = out.replace(
    /url\(\s*(['"]?)\.\.\/fonts\//g,
    "url($1/assets/fonts/",
  );

  // url(../vendor/...) → /assets/vendor/...
  out = out.replace(
    /url\(\s*(['"]?)\.\.\/vendor\//g,
    "url($1/assets/vendor/",
  );

  // url(../lib/...) → /assets/lib/...
  out = out.replace(
    /url\(\s*(['"]?)\.\.\/lib\//g,
    "url($1/assets/lib/",
  );

  return out;
}

for (const rel of targets) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;
  const before = fs.readFileSync(abs, "utf8");
  const after = rewrite(before);
  fs.writeFileSync(abs, after, "utf8");

  const mirrorRel = rel.replace(/^styles\//, "");
  if (mirrorRel.startsWith("pages/") || mirrorRel.startsWith("shared/")) {
    const publicPath = path.join(ROOT, "public/assets/css", mirrorRel);
    fs.mkdirSync(path.dirname(publicPath), { recursive: true });
    fs.writeFileSync(publicPath, after, "utf8");
  }

  console.log(after !== before ? "rewrote" : "synced", rel);
}
