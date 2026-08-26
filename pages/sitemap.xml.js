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
    console.log("========================================");
    console.log("SITEMAP GENERATION STARTED");
    console.log("========================================");

    // =====================================================
    // FETCH SERVICES + PRODUCTS
    // =====================================================

    const [servicesResult, productsResult] = await Promise.all([
      fetchAllServices(),
      fetchAllProducts(),
    ]);

    const services = Array.isArray(servicesResult)
      ? servicesResult
      : [];

    const products = Array.isArray(productsResult)
      ? productsResult
      : [];

    // =====================================================
    // DEBUG - API RESULTS
    // =====================================================

    console.log("SITEMAP SERVICES COUNT:", services.length);
    console.log("SITEMAP PRODUCTS COUNT:", products.length);

    console.log(
      "SITEMAP SERVICE SLUGS:",
      services.map((service) => service?.slug).filter(Boolean)
    );

    console.log(
      "SITEMAP PRODUCT SLUGS:",
      products.map((product) => product?.slug).filter(Boolean)
    );

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
      "/faqs/",
    ];

    // =====================================================
    // SERVICE URLs
    // FINAL STRUCTURE: /service/
    // =====================================================

    const serviceUrls = services
      .filter((service) => service?.slug)
      .map((service) => `/service/${service.slug}/`);

    console.log(
      "GENERATED SERVICE URLS:",
      serviceUrls
    );

    // =====================================================
    // PRODUCT URLs
    // =====================================================

    const productUrls = products
      .filter((product) => product?.slug)
      .map((product) => `/products/${product.slug}/`);

    console.log(
      "GENERATED PRODUCT URLS:",
      productUrls
    );

    // =====================================================
    // COMBINE ALL URLS
    // REMOVE DUPLICATES
    // =====================================================

    const allUrls = [
      ...new Set([
        ...staticUrls,
        ...serviceUrls,
        ...productUrls,
      ]),
    ];

    console.log("========================================");
    console.log("FINAL SITEMAP URL COUNT:", allUrls.length);
    console.log("FINAL SITEMAP URLS:");
    console.log(allUrls);
    console.log("========================================");

    // =====================================================
    // XML GENERATION
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    // =====================================================
    // RESPONSE HEADERS
    // =====================================================

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    // =====================================================
    // SEND XML
    // =====================================================

    res.statusCode = 200;
    res.write(xml);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("========================================");
    console.error("SITEMAP GENERATION ERROR");
    console.error(error);
    console.error("========================================");

    res.statusCode = 500;

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    res.end(errorXml);

    return {
      props: {},
    };
  }
}

export default function SitemapXml() {
  return null;
}