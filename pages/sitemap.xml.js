import { fetchAllServices, fetchAllProducts } from "../lib/api";

const SITE_URL = "https://www.redspider.ae";

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

export async function getServerSideProps({ res }) {
  try {
    const [servicesResult, productsResult] = await Promise.all([
      fetchAllServices(),
      fetchAllProducts(),
    ]);

    const services = Array.isArray(servicesResult) ? servicesResult : [];

    const products = Array.isArray(productsResult) ? productsResult : [];

    // =====================================================
    // STATIC FINAL URLs
    // =====================================================

    const staticUrls = [
      "/",
      "/about-us/",
      "/our-portfolio/",
      "/contact-us/",
      "/blog/",
      "/service/",
    ];

    // =====================================================
    // SERVICE URLs
    // FINAL STRUCTURE: /service/
    // =====================================================

    const serviceUrls = services
      .filter((service) => service?.slug)
      .map((service) => `/service/${service.slug}/`);

    // =====================================================
    // PRODUCT URLs
    // =====================================================

    const productUrls = products
      .filter((product) => product?.slug)
      .map((product) => `/products/${product.slug}/`);

    // =====================================================
    // REMOVE DUPLICATES
    // =====================================================

    const allUrls = [
      ...new Set([...staticUrls, ...serviceUrls, ...productUrls]),
    ];

    // =====================================================
    // XML
    // =====================================================

    const urlsXml = allUrls
      .map((path) => {
        const url = normalizeUrl(`${SITE_URL}${path}`);

        return `
  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urlsXml}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );

    res.write(xml);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("SITEMAP GENERATION ERROR:", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/xml");

    res.end(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
    );

    return {
      props: {},
    };
  }
}

export default function SitemapXml() {
  return null;
}
