import {
  fetchAllBlogPosts,
  fetchAllProducts,
  fetchAllServices,
} from "../lib/api";
import { SITE_URL, isProductionSitemapUrl } from "../lib/seo";

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
    if (
      !process.env.NEXT_PUBLIC_API_URL ||
      !(process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY)
    ) {
      console.error(
        "SITEMAP: NEXT_PUBLIC_API_URL and API_KEY are required for dynamic URLs.",
      );
    }

    const [servicesResult, productsResult, blogsResult] = await Promise.all([
      fetchAllServices(),
      fetchAllProducts(),
      fetchAllBlogPosts(),
    ]);

    const services = Array.isArray(servicesResult) ? servicesResult : [];
    const products = Array.isArray(productsResult) ? productsResult : [];
    const blogs = Array.isArray(blogsResult) ? blogsResult : [];

    const staticUrls = [
      "/",
      "/about-us/",
      "/our-portfolio/",
      "/contact-us/",
      "/blog/",
      "/service/",
      "/faqs/",
    ];

    const serviceUrls = services
      .filter((service) => service?.slug)
      .map((service) => `/service/${encodeURIComponent(service.slug)}/`);

    const productUrls = products
      .filter((product) => product?.slug)
      .map((product) => `/products/${encodeURIComponent(product.slug)}/`);

    const blogUrls = blogs
      .filter((post) => post?.slug)
      .map((post) => `/blog/${encodeURIComponent(post.slug)}/`);

    const allUrls = [
      ...new Set([...staticUrls, ...serviceUrls, ...productUrls, ...blogUrls]),
    ];

    console.log(
      `SITEMAP: ${services.length} services, ${products.length} products, ${blogs.length} blogs, ${allUrls.length} total URLs`,
    );

    const productionUrls = allUrls
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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.statusCode = 200;
    res.write(xml);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("SITEMAP GENERATION ERROR:", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");

    res.end(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
    );

    return {
      props: {},
    };
  }
}

export default function SitemapXml() {
  return null;
}
