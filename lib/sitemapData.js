import {
  fetchAllBlogPosts,
  fetchAllGalleries,
  fetchAllPages,
  fetchAllProducts,
  fetchAllServices,
} from "./api";
import { PRODUCTION_HOSTS } from "./seo";

export const SITEMAP_STATIC_PAGES = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Our Portfolio", href: "/our-portfolio/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Blog", href: "/blog/" },
  { label: "Services", href: "/service/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Sitemap", href: "/sitemap/" },
];

function toInternalLink(item, buildHref) {
  if (!item?.slug) {
    return null;
  }

  return {
    label: item.name || item.title || item.slug,
    href: buildHref(item.slug),
    external: false,
  };
}

function isRedSpiderHostname(hostname) {
  return PRODUCTION_HOSTS.has(String(hostname || "").toLowerCase());
}

function toPortfolioLink(gallery) {
  const url = String(gallery?.project_url || "").trim();

  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);

    return {
      label: gallery.name || gallery.slug || url,
      href: parsed.toString(),
      external: !isRedSpiderHostname(parsed.hostname),
    };
  } catch {
    return null;
  }
}

function cmsPageToLink(page) {
  const slug = String(page?.slug || "").trim();

  if (!slug) {
    return null;
  }

  const knownRoutes = {
    home: "/",
    about: "/about-us/",
    "about-us": "/about-us/",
    contact: "/contact-us/",
    "contact-us": "/contact-us/",
    portfolio: "/our-portfolio/",
    "our-portfolio": "/our-portfolio/",
    blog: "/blog/",
    faqs: "/faqs/",
    faq: "/faqs/",
    sitemap: "/sitemap/",
    services: "/service/",
    service: "/service/",
  };

  const normalized = slug.toLowerCase();
  const href = knownRoutes[normalized] || `/${encodeURIComponent(slug)}/`;

  return {
    label: page.title || page.name || slug,
    href,
    external: false,
  };
}

async function safeFetch(fetcher, label) {
  try {
    return await fetcher();
  } catch (error) {
    console.error(`Sitemap fetch failed (${label}):`, error);

    return [];
  }
}

export async function fetchSitemapLinkGroups() {
  const [
    servicesResult,
    productsResult,
    blogsResult,
    galleriesResult,
    pagesResult,
  ] = await Promise.all([
    safeFetch(() => fetchAllServices(), "services"),
    safeFetch(() => fetchAllProducts(), "products"),
    safeFetch(() => fetchAllBlogPosts(), "blogs"),
    safeFetch(() => fetchAllGalleries(), "galleries"),
    safeFetch(() => fetchAllPages(), "pages"),
  ]);

  const services = Array.isArray(servicesResult) ? servicesResult : [];
  const products = Array.isArray(productsResult) ? productsResult : [];
  const blogs = Array.isArray(blogsResult) ? blogsResult : [];
  const galleries = Array.isArray(galleriesResult) ? galleriesResult : [];
  const cmsPages = Array.isArray(pagesResult) ? pagesResult : [];

  const cmsPageLinks = cmsPages
    .map(cmsPageToLink)
    .filter(Boolean)
    .filter(
      (link) =>
        !SITEMAP_STATIC_PAGES.some((staticPage) => staticPage.href === link.href),
    );

  const main = [...SITEMAP_STATIC_PAGES, ...cmsPageLinks];

  const portfolio = galleries.map(toPortfolioLink).filter(Boolean);

  return {
    main: dedupeLinks(main),
    services: dedupeLinks(
      services.map((item) =>
        toInternalLink(item, (slug) => `/service/${encodeURIComponent(slug)}/`),
      ),
    ),
    products: dedupeLinks(
      products.map((item) =>
        toInternalLink(item, (slug) => `/products/${encodeURIComponent(slug)}/`),
      ),
    ),
    blogs: dedupeLinks(
      blogs.map((item) =>
        toInternalLink(item, (slug) => `/blog/${encodeURIComponent(slug)}/`),
      ),
    ),
    portfolio: dedupeLinks(portfolio),
  };
}

function dedupeLinks(links) {
  const seen = new Set();

  return links
    .filter((link) => link?.href && link?.label)
    .filter((link) => {
      const key = `${link.external ? "external" : "internal"}:${link.href}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });
}

export function collectSitemapPaths(groups) {
  const paths = new Set();

  for (const links of Object.values(groups)) {
    for (const link of links) {
      if (!link?.href || link.external) {
        continue;
      }

      if (link.href.startsWith("/")) {
        paths.add(link.href);
        continue;
      }

      try {
        const parsed = new URL(link.href);

        if (
          parsed.protocol === "https:" &&
          isRedSpiderHostname(parsed.hostname)
        ) {
          paths.add(
            parsed.pathname.endsWith("/")
              ? parsed.pathname
              : `${parsed.pathname}/`,
          );
        }
      } catch {
        // Ignore invalid URLs.
      }
    }
  }

  return [...paths];
}
