const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const pageMap = {
  "pages/index.js": {
    remove: 'import "@/styles/pages/home.css";',
    insertAfter: null,
    pageStyles: 'import PageStyles from "../components/seo/PageStyles";',
    href: "/assets/css/pages/home.css",
    component: "Home",
  },
  "pages/about-us.js": {
    remove: 'import "@/styles/pages/about.css";',
    pageStyles: 'import PageStyles from "../components/seo/PageStyles";',
    href: "/assets/css/pages/about.css",
  },
  "pages/blog.js": {
    remove: 'import "@/styles/pages/blog.css";',
    pageStyles: 'import PageStyles from "../components/seo/PageStyles";',
    href: "/assets/css/pages/blog.css",
  },
  "pages/blog/[slug].js": {
    remove: 'import "@/styles/pages/blog-detail.css";',
    pageStyles: 'import PageStyles from "../../components/seo/PageStyles";',
    href: "/assets/css/pages/blog-detail.css",
  },
  "pages/contact-us.js": {
    remove: 'import "@/styles/pages/contact.css";',
    pageStyles: 'import PageStyles from "../components/seo/PageStyles";',
    href: "/assets/css/pages/contact.css",
  },
  "pages/our-portfolio.js": {
    remove: 'import "@/styles/pages/portfolio.css";',
    pageStyles: 'import PageStyles from "../components/seo/PageStyles";',
    href: "/assets/css/pages/portfolio.css",
  },
  "pages/service/index.js": {
    remove: 'import "@/styles/pages/service.css";',
    pageStyles: 'import PageStyles from "../../components/seo/PageStyles";',
    href: "/assets/css/pages/service.css",
  },
  "pages/service/[id].js": {
    remove: 'import "@/styles/pages/service.css";',
    pageStyles: 'import PageStyles from "../../components/seo/PageStyles";',
    href: "/assets/css/pages/service.css",
  },
  "pages/products/[slug].js": {
    remove: 'import "@/styles/pages/products.css";',
    pageStyles: 'import PageStyles from "../../components/seo/PageStyles";',
    href: "/assets/css/pages/products.css",
  },
  "pages/faqs/index.js": {
    remove: 'import "@/styles/pages/faqs.css";',
    pageStyles: 'import PageStyles from "../../components/seo/PageStyles";',
    href: "/assets/css/pages/faqs.css",
  },
};

function injectPageStyles(source, href) {
  if (source.includes("<PageStyles")) return source;

  // Prefer placing right after opening fragment / Layout / SEO return
  if (source.includes("<>")) {
    return source.replace(
      /<>(\s*)/,
      `<>\n      <PageStyles href="${href}" />$1`,
    );
  }

  if (source.includes("<Layout>")) {
    return source.replace(
      /<Layout>/,
      `<Layout>\n        <PageStyles href="${href}" />`,
    );
  }

  return source;
}

for (const [rel, cfg] of Object.entries(pageMap)) {
  const abs = path.join(ROOT, rel);
  let source = fs.readFileSync(abs, "utf8");

  // remove css import lines
  source = source.replace(
    new RegExp(`^import "@\\/styles\\/pages\\/[^"]+";\\r?\\n\\r?\\n?`, "m"),
    "",
  );

  if (!source.includes("PageStyles")) {
    // insert import after first import or at top
    if (/^import /m.test(source)) {
      source = source.replace(/^import /m, `${cfg.pageStyles}\nimport `);
    } else {
      source = `${cfg.pageStyles}\n${source}`;
    }
  }

  source = injectPageStyles(source, cfg.href);
  fs.writeFileSync(abs, source);
  console.log("updated", rel);
}
