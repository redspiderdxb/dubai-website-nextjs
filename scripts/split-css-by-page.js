/**
 * Split custom.css + globals.css into styles/shared/* and styles/pages/*.
 * Keeps class names unchanged. Run: node scripts/split-css-by-page.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const PAGE_PATTERNS = {
  home: [
    /^\.rs-hero-slider\b/,
    /^\.rs-slide/,
    /^\.rs-review-box\b/,
    /^\.rs-google-word\b/,
    /^\.rs-stars\b/,
    /^\.rs-google-reviews\b/,
    /^\.rs-google-review/,
    /^\.rs-google-g\b/,
    /^\.rs-google-verified\b/,
    /^\.rs-marquee\b/,
    /^\.rs-industry-marquee\b/,
    /^\.rs-gsap-/,
    /^\.rs-agency-/,
    /^\.rs-packages-sec\b/,
    /^\.rs-packages-container\b/,
    /^\.rs-left-card\b/,
    /^\.rs-left-heading\b/,
    /^\.rs-join\b/,
    /^\.rs-arrow-btn\b/,
    /^\.rs-card\b/,
    /^\.rs-card-red\b/,
    /^\.rs-creative-sec\b/,
    /^\.rs-creative-accordion\b/,
    /^\.rs-creative-img\b/,
    /^\.rs-creative-copy\b/,
    /^\.rs-home-blog\b/,
    /^\.rs-home-clients\b/,
    /^\.rs-home-insights\b/,
    /^\.rs-gd-intro\b/,
    /^\.rs-video-zoom-sec\b/,
    /^\.rs-video-wrap\b/,
    /^\.rs-video-content\b/,
    /^\.rs-video-title\b/,
    /^\.ideo-grow-se\b/,
    /^\.play-btn\b/,
    /^\.video-thumb\b/,
    /^\.rs-service-card\b/,
    /^\.rs-service-icon\b/,
    /^\.about-features\b/,
    /^\.laptop-mobile\b/,
    /^\.inlinebtns\b/,
    /^\.lin_sec\b/,
    /^\.form-sec\b/,
    /^\.mid_sec\b/,
    /^\.req_block_left\b/,
    /^\.stak-sec\b/,
    /^\.stak-wrap\b/,
    /^\.stack-no\b/,
    /^\.stack-desc\b/,
    /^\.darkblue-line\b/,
    /^\.bluelight-backgroun\b/,
    /^\.google-box\b/,
    /^\.fade-title\b/,
    /^#services\b/,
    /^#home-blog\b/,
    /^#portfolio\b/,
    /^#stak-sec\b/,
    /^#mobile-app-ser\b/,
    /^\.home-blog-title\b/,
    /^\.quick-contect\b/,
  ],
  about: [
    /^\.about-info-sec\b/,
    /^\.about-who/,
    /^\.about-stats\b/,
    /^\.stat-box\b/,
    /^\.stat-icon\b/,
    /^\.company_numbers\b/,
    /^\.about-image-card\b/,
    /^\.rs-about-company\b/,
    /^\.rs-company-left\b/,
    /^\.rs-company-logos\b/,
    /^\.service-container-red\b/,
    /^\.service-section-inner\b/,
    /^\.about-hero\b/,
  ],
  blog: [
    /^\.rs-blog-section\b/,
    /^\.rs-blog-intro/,
    /^\.rs-blog-categories\b/,
    /^\.rs-blog-category\b/,
    /^\.rs-blog-featured/,
    /^\.rs-blog-grid\b/,
    /^\.rs-blog-card/,
    /^\.rs-blog-pagination/,
    /^\.rs-blog-page-/,
    /^\.rs-blog-meta\b/,
    /^\.rs-blog-read-more\b/,
    /^\.rs-meta-dot\b/,
    /^\.rs-blog-empty\b/,
    /^\.rs-blog-loading\b/,
    /^\.rs-blog-spinner\b/,
    /^\.rs-blog-image-overlay\b/,
    /^\.rs-blog-hover-icon\b/,
    /^\.blog-hero-custom\b/,
    /^\.rs-blog-hero-/,
    /^#blog-posts\b/,
    /^#blog-pagination\b/,
  ],
  "blog-detail": [
    /^\.rs-blog-detail\b/,
    /^\.rs-blog-header\b/,
    /^\.rs-blog-title\b/,
    /^\.rs-blog-html\b/,
    /^\.rs-blog-body-layout\b/,
    /^\.rs-blog-content\b/,
    /^\.rs-blog-sidebar/,
    /^\.rs-blog-feature-image\b/,
    /^\.rs-image-caption\b/,
    /^\.rs-author-avatar\b/,
    /^\.rs-toc-/,
    /^\.rs-blog-toc\b/,
    /^\.rs-blog-bottom-tags\b/,
    /^\.page-title\b/,
  ],
  contact: [
    /^\.rs-contact-sec\b/,
    /^\.rs-contact-layout\b/,
    /^\.rs-contact-copy\b/,
    /^\.rs-contact-detail/,
    /^\.rs-contact-highlight/,
    /^\.rs-contact-submit\b/,
    /^\.rs-contact-terms\b/,
    /^\.rs-contact-callout\b/,
    /^\.rs-contact-map/,
  ],
  portfolio: [
    /^\.portfolio-page-hero\b/,
    /^\.portfolio-top-filter\b/,
    /^\.portfolio-category-tab/,
    /^\.portfolio-search-/,
    /^\.portfolio-industry-select\b/,
    /^\.portfolio-youtube-/,
    /^\.portfolio-video-wrapper\b/,
    /^\.portfolio-play-icon\b/,
    /^\.portfolio-pagination\b/,
    /^\.portfolio-page-/,
    /^\.portfolio-loading\b/,
    /^\.portfolio-count\b/,
    /^\.porh\b/,
  ],
  service: [
    /^\.rs-creative-page\b/,
    /^\.rs-creative-intro\b/,
    /^\.rs-creative-head\b/,
    /^\.rs-creative-card\b/,
    /^\.rs-creative-why\b/,
    /^\.rs-creative-process\b/,
    /^\.rs-creative-step/,
    /^\.rs-creative-pill\b/,
    /^\.rs-creative-industry/,
    /^\.rs-creative-services\b/,
    /^\.rs-creative-platforms\b/,
    /^\.rs-creative-industries\b/,
    /^\.rs-creative-kicker\b/,
    /^\.rs-creative-btn\b/,
    /^\.rs-creative-link\b/,
    /^\.rs-custom-gallery\b/,
    /^\.archidex-/,
    /^\.arch-no\b/,
    /^\.arch-name\b/,
    /^\.arch-arrow\b/,
    /^\.opposite-gallery/,
    /^\.gallery-track\b/,
    /^\.gallery-title-wrap\b/,
    /^\.pix-bg\b/,
    /^\.dark-cs-bg\b/,
    /^\.dev-before\b/,
    /^\.cus-20\b/,
    /^\.cus-title-ani-1\b/,
    /^\.rs-main-title\b/,
    /^\.letconnect\b/,
    /^\.graphic-design-template\b/,
    /^\.logo-design-template\b/,
    /^\.design-developemnt-hero\b/,
    /^\.service-template\b/,
  ],
  products: [
    /^\.crm-hero\b/,
    /^\.rs-crm-/,
    /^\.rs-api-/,
    /^\.zivora-/,
    /^\.zra-/,
    /^\.zss-/,
    /^\.zrs-/,
    /^\.sms-target-ser\b/,
    /^\.email-campaign-types\b/,
    /^\.kf-/,
    /^\.daily-features\b/,
    /^\.df-/,
    /^\.ecommerce-platforms\b/,
    /^\.ep-card\b/,
    /^\.card-icon-types\b/,
    /^\.dubizzle-clone-features\b/,
    /^\.ect-card\b/,
    /^\.ect-icon\b/,
    /^\.ect-heading\b/,
    /^\.ect-text\b/,
    /^\.rs-best-realestate\b/,
    /^\.rs-project-/,
    /^\.rs-gallery-/,
    /^\.re-label\b/,
    /^\.re-features\b/,
    /^\.re-launch/,
    /^\.re-services-showcase\b/,
    /^\.why-sticky-/,
    /^\.why-row-card\b/,
    /^\.dynamic-text\b/,
    /^\.hero-banner\b/,
    /^\.rs-hero-banner\b/,
    /^\.hero-titleinner\b/,
    /^\.rs-full-section\b/,
    /^\.rs-circle-/,
    /^\.rs-desc\b/,
    /^\.rs-subtitle\b/,
    /^\.dot-bg\b/,
    /^\.line-bg-dark\b/,
    /^\.premium-/,
  ],
  faqs: [/^\.faq-hero-custom\b/],
};

const SHARED_PATTERNS = [
  /^\.rs-btn\b/,
  /^\.btn-title\b/,
  /^\.rs-main-header\b/,
  /^\.rs-header-/,
  /^\.rs-navmenu\b/,
  /^\.rs-nav-/,
  /^\.rs-dropdown/,
  /^\.rs-mobile-/,
  /^\.rs-top-row\b/,
  /^\.rs-bottom-row\b/,
  /^\.rs-call-now\b/,
  /^\.rs-logo\b/,
  /^\.rs-footer/,
  /^\.rs-menu\b/,
  /^\.rs-services\b/,
  /^\.rs-copyright\b/,
  /^\.swim-foot\b/,
  /^\.rs-fixed-contact\b/,
  /^\.rs-whatsapp/,
  /^\.scroll-top\b/,
  /^\.footer-/,
  /^\.rs-themed-select/,
  /^\.rs-form-/,
  /^\.rs-field-error/,
  /^\.phone-field\b/,
  /^\.rs-contact-form/,
  /^\.contact-cta\b/,
  /^\.cta-/,
  /^\.icon-box\b/,
  /^\.rs-process-/,
  /^\.rs-section-subtitle\b/,
  /^\.rs-inner-hero\b/,
  /^\.hero-marquee\b/,
  /^\.contact-shared-hero-bg\b/,
  /^\.rs-contact-hero/,
  /^\.rs-hero-overlay\b/,
  /^\.home-faq\b/,
  /^\.rs-faq-/,
  /^\.rs-home-faq/,
  /^\.faq-icon\b/,
  /^\.re-process/,
  /^\.breadcrumbs\b/,
  /^\.section\b/,
  /^\.dark-background\b/,
  /^\.mobile-app-ser\b/,
  /^\.rs-service-grid-outline\b/,
  /^\.rs-grid-/,
  /^\.grid-box\b/,
  /^\.rs-icon\b/,
  /^\.key-features\b/,
  /^\.portfolio\b/,
  /^\.portfolio-item\b/,
  /^\.portfolio-content\b/,
  /^\.portfolio-info\b/,
  /^\.preview-link\b/,
  /^\.details-link\b/,
  /^\.isotope-/,
  /^\.glightbox\b/,
  /^\.bluelight-background\b/,
  /^\.redlight-background\b/,
  /^:root\b/,
  /^html\b/,
  /^body\b/,
  /^\*\b/,
  /^@font-face\b/,
  /^@keyframes\b/,
  /^@import\b/,
];

function tokenizeTopLevel(css) {
  const blocks = [];
  let i = 0;
  const n = css.length;

  while (i < n) {
    while (i < n && /\s/.test(css[i])) i++;
    if (i >= n) break;

    // Skip stray top-level closing braces from legacy CSS.
    if (css[i] === "}") {
      i++;
      continue;
    }

    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i + 2);
      const commentEnd = end === -1 ? n : end + 2;
      blocks.push({ type: "comment", text: css.slice(i, commentEnd) });
      i = commentEnd;
      continue;
    }

    if (css[i] === "@") {
      const start = i;
      while (i < n && css[i] !== "{" && css[i] !== ";") i++;
      if (i < n && css[i] === ";") {
        blocks.push({ type: "atrule", text: css.slice(start, i + 1) });
        i += 1;
        continue;
      }
      if (i >= n || css[i] !== "{") {
        blocks.push({ type: "raw", text: css.slice(start) });
        break;
      }
      let depth = 0;
      const braceStart = i;
      for (; i < n; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        }
      }
      blocks.push({ type: "atrule-block", text: css.slice(start, i) });
      continue;
    }

    const start = i;
    while (i < n && css[i] !== "{") i++;
    if (i >= n) {
      blocks.push({ type: "raw", text: css.slice(start) });
      break;
    }
    let depth = 0;
    for (; i < n; i++) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
    }
    blocks.push({ type: "rule", text: css.slice(start, i) });
  }

  return blocks;
}

function firstSelectors(ruleText) {
  const brace = ruleText.indexOf("{");
  if (brace === -1) return [];
  return ruleText
    .slice(0, brace)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSelector(sel) {
  return sel
    .replace(/^:is\(/, "")
    .replace(/^:where\(/, "")
    .replace(/^\(/, "")
    .trim();
}

function matchBucket(selector) {
  const sel = normalizeSelector(selector);
  const candidates = [];

  for (const [page, patterns] of Object.entries(PAGE_PATTERNS)) {
    for (const re of patterns) {
      if (re.test(sel)) {
        candidates.push({ bucket: page, specificity: re.source.length });
      }
    }
  }

  if (candidates.length) {
    candidates.sort((a, b) => b.specificity - a.specificity);
    return candidates[0].bucket;
  }

  for (const re of SHARED_PATTERNS) {
    if (re.test(sel)) return "shared";
  }

  // Also match nested selectors like ".foo .rs-hero-slider"
  for (const [page, patterns] of Object.entries(PAGE_PATTERNS)) {
    for (const re of patterns) {
      const parts = sel.split(/\s+/);
      for (const part of parts) {
        const cleaned = part.replace(/^[>+~]/, "").replace(/::?[a-zA-Z-]+$/, "");
        if (re.test(cleaned) || re.test(part)) return page;
      }
    }
  }

  for (const re of SHARED_PATTERNS) {
    const parts = sel.split(/\s+/);
    for (const part of parts) {
      const cleaned = part.replace(/^[>+~]/, "");
      if (re.test(cleaned) || re.test(part)) return "shared";
    }
  }

  return "shared";
}

function assignRule(ruleText) {
  const selectors = firstSelectors(ruleText);
  if (!selectors.length) return "shared";

  const votes = {};
  for (const sel of selectors) {
    const bucket = matchBucket(sel);
    votes[bucket] = (votes[bucket] || 0) + 1;
  }

  const ranked = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  if (ranked[0][0] === "shared" && ranked.length > 1) return ranked[1][0];
  return ranked[0][0];
}

function splitMediaBlock(text) {
  const open = text.indexOf("{");
  if (open === -1) return { prelude: text, innerBlocks: [] };
  const prelude = text.slice(0, open).trim();
  let inner = text.slice(open + 1);
  if (inner.endsWith("}")) inner = inner.slice(0, -1);
  return { prelude, innerBlocks: tokenizeTopLevel(inner) };
}

function processFile(css) {
  const buckets = {
    shared: [],
    home: [],
    about: [],
    blog: [],
    "blog-detail": [],
    contact: [],
    portfolio: [],
    service: [],
    products: [],
    faqs: [],
  };

  const pendingComments = [];
  const blocks = tokenizeTopLevel(css);

  for (const block of blocks) {
    if (block.type === "comment") {
      pendingComments.push(block.text);
      continue;
    }

    const flushComments = (target) => {
      if (pendingComments.length) {
        buckets[target].push(...pendingComments);
        pendingComments.length = 0;
      }
    };

    if (block.type === "atrule") {
      flushComments("shared");
      buckets.shared.push(block.text);
      continue;
    }

    if (block.type === "raw") {
      flushComments("shared");
      buckets.shared.push(block.text);
      continue;
    }

    if (block.type === "rule") {
      const bucket = assignRule(block.text);
      flushComments(bucket);
      buckets[bucket].push(block.text);
      continue;
    }

    if (block.type === "atrule-block") {
      const isMedia = /^@media\b/i.test(block.text);
      const isKeyframes = /^@keyframes\b/i.test(block.text);
      const isSupports = /^@supports\b/i.test(block.text);

      if (isKeyframes) {
        flushComments("shared");
        buckets.shared.push(block.text);
        continue;
      }

      // Keep @media / @supports intact (avoid broken braces from splitting).
      // Assign the whole block by majority vote of inner rule selectors.
      if (isMedia || isSupports) {
        const { innerBlocks } = splitMediaBlock(block.text);
        const votes = {};

        for (const inner of innerBlocks) {
          if (inner.type !== "rule") continue;
          const bucket = assignRule(inner.text);
          votes[bucket] = (votes[bucket] || 0) + 1;
        }

        let target = "shared";
        const ranked = Object.entries(votes).sort((a, b) => b[1] - a[1]);
        if (ranked.length) {
          target =
            ranked[0][0] === "shared" && ranked.length > 1
              ? ranked[1][0]
              : ranked[0][0];
        }

        flushComments(target);
        buckets[target].push(block.text);
        continue;
      }

      flushComments("shared");
      buckets.shared.push(block.text);
    }
  }

  if (pendingComments.length) {
    buckets.shared.push(...pendingComments);
  }

  return buckets;
}

function writeBucket(filePath, header, parts) {
  let body = parts.filter(Boolean).join("\n\n").trim();
  // public/assets/css relative urls → absolute public paths for webpack
  body = body
    .replace(/url\(\s*(['"]?)\.\.\/img\//g, "url($1/assets/img/")
    .replace(/url\(\s*(['"]?)\.\.\/fonts\//g, "url($1/assets/fonts/")
    .replace(/url\(\s*(['"]?)\.\.\/vendor\//g, "url($1/assets/vendor/")
    .replace(/url\(\s*(['"]?)\.\.\/lib\//g, "url($1/assets/lib/")
    .replace(/url\(\s*(['"]?)\.\.\/public\/assets\//g, "url($1/assets/");
  const content = `${header}\n\n${body}\n`;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");

  // Mirror into public/ so pages can load via <link> (Next forbids page-level global CSS imports)
  const rel = path.relative(path.join(ROOT, "styles"), filePath).replace(/\\/g, "/");
  if (rel.startsWith("pages/") || rel.startsWith("shared/")) {
    const publicPath = path.join(ROOT, "public/assets/css", rel);
    fs.mkdirSync(path.dirname(publicPath), { recursive: true });
    fs.writeFileSync(publicPath, content, "utf8");
  }

  return body.length;
}

function main() {
  const customPath = path.join(ROOT, "public/assets/css/custom.css");
  const globalsPath = path.join(ROOT, "styles/globals.css");
  const backupDir = path.join(ROOT, "styles/_backup");
  const customBak = path.join(backupDir, "custom.css.bak");
  const globalsBak = path.join(backupDir, "globals-before-split.css.bak");

  // Prefer backups so re-runs stay safe after custom.css was stubbed.
  const custom = fs.readFileSync(
    fs.existsSync(customBak) ? customBak : customPath,
    "utf8",
  );
  const globals = fs.readFileSync(
    fs.existsSync(globalsBak) ? globalsBak : globalsPath,
    "utf8",
  );

  // Keep Tailwind entry + root tokens in globals; strip the rest into buckets
  const tailwindHeaderMatch = globals.match(/^([\s\S]*?:root\s*\{[\s\S]*?\}\s*)/);
  let globalsKeep = "";
  let globalsRest = globals;

  if (tailwindHeaderMatch) {
    // Keep from start through first large structural chunk carefully:
    // Prefer keeping @import tailwind + :root + scrollbar through html/body basics
    const cutMarkers = [
      "/* Dropdown Menu */",
      "/* ============================================\n   HEADER",
      "/* Footer Fixes */",
      ".rs-footer-sec",
      ".rs-main-header",
    ];
    let cutAt = -1;
    for (const marker of cutMarkers) {
      const idx = globals.indexOf(marker);
      if (idx !== -1 && (cutAt === -1 || idx < cutAt)) cutAt = idx;
    }
    if (cutAt === -1) {
      // fallback: keep first 100 lines-ish by first component comment after :root
      cutAt = globals.indexOf("/* Dropdown Menu */");
    }
    if (cutAt > 0) {
      globalsKeep = globals.slice(0, cutAt).trim() + "\n";
      globalsRest = globals.slice(cutAt);
    } else {
      globalsKeep = globals.slice(0, Math.min(globals.length, 2500));
      globalsRest = globals.slice(globalsKeep.length);
    }
  } else {
    globalsKeep = '@import "tailwindcss";\n';
    globalsRest = globals;
  }

  const fromCustom = processFile(custom);
  const fromGlobals = processFile(globalsRest);

  const merged = {};
  for (const key of Object.keys(fromCustom)) {
    merged[key] = [...fromCustom[key], ...fromGlobals[key]];
  }

  // Split shared into layout vs utilities by selector heuristics
  const layout = [];
  const utilities = [];
  for (const chunk of merged.shared) {
    const layoutHit =
      /\.rs-(main-header|header|nav|footer|logo|btn|whatsapp|fixed-contact|form-|themed-select|field-error|contact-form|process-|section-subtitle|inner-hero|contact-hero|faq-)/.test(
        chunk,
      ) ||
      /\.contact-cta|\.cta-|\.breadcrumbs|\.scroll-top|\.footer-|\.phone-field|\.hero-marquee|\.dark-background|\.section\b|\.key-features|\.portfolio\b|\.mobile-app-ser|\.home-faq|\.re-process/.test(
        chunk,
      );
    if (layoutHit) layout.push(chunk);
    else utilities.push(chunk);
  }

  const outputs = {
    "styles/shared/layout.css": {
      header: "/* Shared layout: header, footer, buttons, forms, heroes, FAQ shell */",
      parts: layout,
    },
    "styles/shared/utilities.css": {
      header: "/* Shared utilities and cross-page leftovers */",
      parts: utilities,
    },
    "styles/pages/home.css": {
      header: "/* Homepage styles */",
      parts: merged.home,
    },
    "styles/pages/about.css": {
      header: "/* About page styles */",
      parts: merged.about,
    },
    "styles/pages/blog.css": {
      header: "/* Blog listing page styles */",
      parts: merged.blog,
    },
    "styles/pages/blog-detail.css": {
      header: "/* Blog detail page styles */",
      parts: merged["blog-detail"],
    },
    "styles/pages/contact.css": {
      header: "/* Contact page styles */",
      parts: merged.contact,
    },
    "styles/pages/portfolio.css": {
      header: "/* Portfolio page styles */",
      parts: merged.portfolio,
    },
    "styles/pages/service.css": {
      header: "/* Service pages + templates styles */",
      parts: merged.service,
    },
    "styles/pages/products.css": {
      header: "/* Product pages + templates styles */",
      parts: merged.products,
    },
    "styles/pages/faqs.css": {
      header: "/* FAQs page styles */",
      parts: merged.faqs,
    },
  };

  const stats = {};
  for (const [rel, cfg] of Object.entries(outputs)) {
    const abs = path.join(ROOT, rel);
    const size = writeBucket(abs, cfg.header, cfg.parts);
    stats[rel] = size;
  }

  // Rewrite globals.css to keep only base tokens + Tailwind
  const thinGlobals = `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
  --default-font: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --heading-font: var(--default-font);
  --nav-font: var(--default-font);
  --rs-scroll-track: #111111;
  --rs-scroll-thumb: #d20000;
  --rs-scroll-thumb-hover: #ff2d2d;
}

html {
  scrollbar-width: thin;
  scrollbar-color: var(--rs-scroll-thumb) var(--rs-scroll-track);
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--rs-scroll-thumb) var(--rs-scroll-track);
}

*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-track {
  background: var(--rs-scroll-track);
}

*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #e31e24 0%, #d20000 100%);
  border: 2px solid var(--rs-scroll-track);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--rs-scroll-thumb-hover);
}

*::-webkit-scrollbar-corner {
  background: var(--rs-scroll-track);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--default-font);
  --font-mono: var(--default-font);
}

html,
body {
  font-family: var(--default-font);
}
`;

  fs.writeFileSync(globalsPath, thinGlobals, "utf8");

  fs.writeFileSync(
    customPath,
    `/* custom.css retired — styles moved to styles/shared/* and styles/pages/*\n   Backup: styles/_backup/custom.css.bak\n*/\n`,
    "utf8",
  );

  console.log("Split complete. Output sizes (chars):");
  for (const [rel, size] of Object.entries(stats)) {
    console.log(`  ${rel}: ${size}`);
  }
  console.log(`  styles/globals.css kept base: ${thinGlobals.length}`);
}

main();
