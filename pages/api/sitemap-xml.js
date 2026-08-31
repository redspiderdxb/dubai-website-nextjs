import {
  collectSitemapPaths,
  fetchSitemapLinkGroups,
  SITEMAP_STATIC_PAGES,
} from "../../lib/sitemapData";
import { SITE_URL, isProductionSitemapUrl } from "../../lib/seo";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeUrl(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

function buildSitemapXml(paths) {
  const productionUrls = paths
    .map((path) => normalizeUrl(`${SITE_URL}${path}`))
    .filter(isProductionSitemapUrl);

  const urlsXml = productionUrls
    .map(
      (url) => `
  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).end("Method not allowed");
  }

  let paths = collectSitemapPaths({
    main: SITEMAP_STATIC_PAGES,
    services: [],
    products: [],
    blogs: [],
    portfolio: [],
  });

  try {
    const groups = await fetchSitemapLinkGroups();
    paths = collectSitemapPaths(groups);

    console.log(
      `SITEMAP XML: ${groups.services.length} services, ${groups.products.length} products, ${groups.blogs.length} blogs, ${paths.length} total paths`,
    );
  } catch (error) {
    console.error("SITEMAP XML generation error:", error);
  }

  const xml = buildSitemapXml(paths);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.status(200).send(xml);
}
