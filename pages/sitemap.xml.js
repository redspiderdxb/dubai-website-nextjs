import { fetchAllServices, fetchAllProducts } from "../lib/api";

const SITE_URL = "https://www.redspider.ae";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

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

/**
 * Fetch all blog posts from API
 *
 * The blog API is paginated, so we keep requesting
 * pages until all posts have been collected.
 */
async function fetchAllBlogPosts() {
  if (!API_URL || !API_KEY) {
    console.error("Blog API configuration is missing.");
    return [];
  }

  const allPosts = [];
  let page = 1;

  try {
    while (true) {
      const response = await fetch(`${API_URL}/posts?page=${page}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_KEY,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Blog API error: ${response.status}`);
      }

      const data = await response.json();

      const posts = Array.isArray(data?.data) ? data.data : [];
      const meta = data?.meta || {};

      allPosts.push(...posts);

      /*
       * Try to determine the last page from the API
       * pagination response.
       */
      const currentPage = Number(
        meta?.current_page || meta?.currentPage || meta?.page || page,
      );

      const lastPage = Number(
        meta?.last_page ||
          meta?.lastPage ||
          meta?.total_pages ||
          meta?.totalPages ||
          currentPage,
      );

      console.log(`SITEMAP BLOG PAGE ${page}: ${posts.length} POSTS`);

      /*
       * Stop when:
       * 1. API tells us this is the last page
       * OR
       * 2. The current page returned no posts
       * OR
       * 3. The API returned fewer posts than expected
       */
      if (page >= lastPage || posts.length === 0) {
        break;
      }

      page++;
    }

    /*
     * Remove duplicate posts by slug.
     */
    const uniquePosts = Array.from(
      new Map(
        allPosts.filter((post) => post?.slug).map((post) => [post.slug, post]),
      ).values(),
    );

    console.log("SITEMAP TOTAL BLOG POSTS:", uniquePosts.length);

    console.log(
      "SITEMAP BLOG SLUGS:",
      uniquePosts.map((post) => post.slug),
    );

    return uniquePosts;
  } catch (error) {
    console.error("SITEMAP BLOG FETCH ERROR:", error);

    return [];
  }
}

export async function getServerSideProps({ res }) {
  try {
    console.log("========================================");
    console.log("SITEMAP GENERATION STARTED");
    console.log("========================================");

    // =====================================================
    // FETCH SERVICES + PRODUCTS + BLOGS
    // =====================================================

    const [servicesResult, productsResult, blogsResult] = await Promise.all([
      fetchAllServices(),
      fetchAllProducts(),
      fetchAllBlogPosts(),
    ]);

    const services = Array.isArray(servicesResult) ? servicesResult : [];

    const products = Array.isArray(productsResult) ? productsResult : [];

    const blogs = Array.isArray(blogsResult) ? blogsResult : [];

    // =====================================================
    // DEBUG
    // =====================================================

    console.log("SITEMAP SERVICES COUNT:", services.length);

    console.log("SITEMAP PRODUCTS COUNT:", products.length);

    console.log("SITEMAP BLOG POSTS COUNT:", blogs.length);

    // =====================================================
    // STATIC URLs
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
    // =====================================================

    const serviceUrls = services
      .filter((service) => service?.slug)
      .map((service) => `/service/${encodeURIComponent(service.slug)}/`);

    console.log("GENERATED SERVICE URLS:", serviceUrls);

    // =====================================================
    // PRODUCT URLs
    // =====================================================

    const productUrls = products
      .filter((product) => product?.slug)
      .map((product) => `/products/${encodeURIComponent(product.slug)}/`);

    console.log("GENERATED PRODUCT URLS:", productUrls);

    // =====================================================
    // BLOG URLs
    // =====================================================

    const blogUrls = blogs
      .filter((post) => post?.slug)
      .map((post) => `/blog/${encodeURIComponent(post.slug)}/`);

    console.log("GENERATED BLOG URLS:", blogUrls);

    // =====================================================
    // COMBINE ALL URLs
    // =====================================================

    const allUrls = [
      ...new Set([...staticUrls, ...serviceUrls, ...productUrls, ...blogUrls]),
    ];

    console.log("========================================");
    console.log("FINAL SITEMAP URL COUNT:", allUrls.length);
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

    res.setHeader("Content-Type", "application/xml; charset=utf-8");

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
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

    res.setHeader("Content-Type", "application/xml; charset=utf-8");

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
