import {
  assembleGalleryCatalog,
  planGalleryPages,
  slimGalleries,
  slimPagination,
} from "./galleries";

export { adoptPortfolioCatalog, portfolioActivePage } from "./galleries";

// ============================================
// API Configuration
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

// ============================================
// Common API Headers
// ============================================

const getHeaders = () => ({
  Accept: "application/json",
  "X-API-KEY": API_KEY,
});

function hasApiConfig() {
  return Boolean(API_URL && API_KEY);
}

function extractApiList(payload) {
  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.posts)) {
    return payload.posts;
  }

  if (Array.isArray(payload?.products)) {
    return payload.products;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
}

function getPaginatedMeta(payload) {
  if (payload?.meta && typeof payload.meta === "object") {
    return payload.meta;
  }

  if (
    payload?.data &&
    typeof payload.data === "object" &&
    !Array.isArray(payload.data)
  ) {
    return {
      current_page: payload.data.current_page,
      last_page: payload.data.last_page,
      per_page: payload.data.per_page,
      total: payload.data.total,
    };
  }

  return {};
}

function dedupeBySlug(items) {
  return Array.from(
    new Map(
      items.filter((item) => item?.slug).map((item) => [item.slug, item]),
    ).values(),
  );
}

async function fetchRemainingPages(baseUrl, lastPage, parsePage) {
  if (lastPage <= 1) {
    return [];
  }

  const requests = [];

  for (let page = 2; page <= lastPage; page++) {
    requests.push(
      fetch(`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${page}`, {
        headers: getHeaders(),
        cache: "no-store",
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`API error on page ${page}: ${res.status}`);
        }

        return parsePage(await res.json());
      }),
    );
  }

  const pages = await Promise.all(requests);

  return pages.flat();
}

// ============================================
// Blog API
// ============================================

/**
 * Fetch all blog posts
 */
export const fetchPosts = async (page = 1) => {
  try {
    const res = await fetch(`${API_URL}/posts?page=${page}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Blog API error: ${res.status}`);
    }

    const data = await res.json();

    return {
      posts: data.data || [],
      pagination: data.meta || {},
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    return {
      posts: [],
      pagination: {},
    };
  }
};

/**
 * Fetch every published blog post (all API pages).
 */
export const fetchAllBlogPosts = async () => {
  if (!hasApiConfig()) {
    console.error("Blog API configuration is missing.");

    return [];
  }

  try {
    const perPage = 100;
    const baseUrl = `${API_URL}/posts?per_page=${perPage}`;
    const firstRes = await fetch(`${baseUrl}&page=1`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!firstRes.ok) {
      throw new Error(`Blog API error: ${firstRes.status}`);
    }

    const firstData = await firstRes.json();
    const firstPosts = Array.isArray(firstData?.data) ? firstData.data : [];
    const lastPage = Number(getPaginatedMeta(firstData).last_page || 1);

    const remainingPosts = await fetchRemainingPages(
      baseUrl,
      lastPage,
      (payload) => (Array.isArray(payload?.data) ? payload.data : []),
    );

    return dedupeBySlug([...firstPosts, ...remainingPosts]);
  } catch (error) {
    console.error("Error fetching all blog posts:", error);

    return [];
  }
};

/**
 * Fetch a single blog post by slug
 */
export { fetchPostBySlug } from "./blogPost.mjs";

// ============================================
// Pages API
// ============================================

/**
 * Fetch all static pages
 */
export const fetchAllPages = async () => {
  try {
    const res = await fetch(`${API_URL}/pages`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Pages API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || [];
  } catch (error) {
    console.error("Error fetching pages:", error);

    return [];
  }
};

/**
 * Fetch a single page by slug
 */
export const fetchPageBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/pages/${slug}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Page detail API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || null;
  } catch (error) {
    console.error("Error fetching page:", error);

    return null;
  }
};

// ============================================
// Settings API
// ============================================

/**
 * Fetch site settings
 */
export const fetchSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/settings`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Settings API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || {};
  } catch (error) {
    console.error("Error fetching settings:", error);

    return {};
  }
};

// ============================================
// Services API
// ============================================
export const fetchAllServices = async () => {
  if (!hasApiConfig()) {
    console.error("Services API configuration is missing.");

    return [];
  }

  try {
    const perPage = 100;
    const baseUrl = `${API_URL}/services?per_page=${perPage}`;
    const firstRes = await fetch(`${baseUrl}&page=1`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!firstRes.ok) {
      throw new Error(`Services API error: ${firstRes.status}`);
    }

    const firstData = await firstRes.json();
    const firstServices = extractApiList(firstData);
    const lastPage = Number(getPaginatedMeta(firstData).last_page || 1);

    const remainingServices = await fetchRemainingPages(
      baseUrl,
      lastPage,
      (payload) => extractApiList(payload),
    );

    return dedupeBySlug([...firstServices, ...remainingServices]);
  } catch (error) {
    console.error("Error fetching services:", error);

    return [];
  }
};
/**
 * Fetch a single service by slug
 */
export { fetchServiceBySlug } from "./cmsDetail.mjs";

/**
 * Fetch featured services
 */
export const fetchFeaturedServices = async (limit = 6) => {
  try {
    const res = await fetch(`${API_URL}/services/featured?limit=${limit}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Featured services API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || [];
  } catch (error) {
    console.error("Error fetching featured services:", error);

    return [];
  }
};

// ============================================
// PRODUCTS API
// ============================================

/**
 * Fetch ALL products
 *
 * Server-side calls go directly to the CMS API so sitemap
 * generation, static paths and ISR work in production.
 * The browser still uses the Next.js API proxy so the API
 * key is never exposed client-side.
 */
export const fetchAllProducts = async () => {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser && !hasApiConfig()) {
    console.error("Products API configuration is missing.");

    return [];
  }

  try {
    const res = await fetch(
      isBrowser ? "/api/products/" : `${API_URL}/products`,
      {
        method: "GET",
        headers: isBrowser ? { Accept: "application/json" } : getHeaders(),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Products API error: ${res.status}`);
    }

    const data = await res.json();

    return dedupeBySlug(extractApiList(data));
  } catch (error) {
    console.error("Error fetching products:", error);

    return [];
  }
};

/**
 * Fetch a single product by slug
 *
 * Used by getStaticProps; failures propagate so ISR retains the last good page.
 */
export { fetchProductBySlug } from "./cmsDetail.mjs";

/**
 * Fetch featured products
 */
export const fetchFeaturedProducts = async (limit = 6) => {
  try {
    const res = await fetch(`${API_URL}/products/featured?limit=${limit}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Featured products API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);

    return [];
  }
};

// ============================================
// Galleries API
// ============================================

/**
 * Fetch paginated galleries
 *
 * IMPORTANT:
 * This existing function is kept unchanged.
 * It is still used by the Portfolio page for
 * the initial server-side portfolio data.
 */
export const fetchGalleries = async (page = 1, perPage = 12) => {
  try {
    const isBrowser = typeof window !== "undefined";

    const res = await fetch(
      isBrowser
        ? `/api/galleries/?page=${page}&per_page=${perPage}`
        : `${API_URL}/galleries?page=${page}&per_page=${perPage}`,
      {
        headers: isBrowser ? { Accept: "application/json" } : getHeaders(),
      },
    );

    if (!res.ok) {
      throw new Error(`Gallery API error: ${res.status}`);
    }

    const data = await res.json();

    if (isBrowser) {
      return {
        galleries: slimGalleries(data.galleries),
        pagination: slimPagination(data.pagination),
      };
    }

    return {
      galleries: slimGalleries(data.data),
      pagination: slimPagination(data.meta),
    };
  } catch (error) {
    console.error("Error fetching galleries:", error);

    return {
      galleries: [],
      pagination: {},
    };
  }
};

function getGalleryResponseMeta(payload) {
  const meta = getPaginatedMeta(payload);

  if (meta.last_page != null || meta.total != null) {
    return meta;
  }

  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    (payload.last_page != null || payload.total != null)
  ) {
    return payload;
  }

  return {};
}

let browserCatalogRequest = null;
let serverCatalogRequest = null;

function fetchBrowserGalleryCatalog() {
  if (!browserCatalogRequest) {
    browserCatalogRequest = requestBrowserGalleryCatalog().finally(() => {
      browserCatalogRequest = null;
    });
  }

  return browserCatalogRequest;
}

async function requestBrowserGalleryCatalog() {
  const res = await fetch("/api/galleries/?all=1", {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Gallery API error: ${res.status}`);
  }

  const data = await res.json();
  const galleries = slimGalleries(data?.galleries);

  // Callers still receive an array. complete is set only for a verified catalog.
  galleries.complete = data?.complete === true;

  return galleries;
}

function fetchSharedServerCatalog() {
  if (!serverCatalogRequest) {
    serverCatalogRequest = requestServerGalleryCatalog()
      .catch((error) => {
        console.error("Error fetching all portfolio galleries:", error);

        return [];
      })
      .finally(() => {
        serverCatalogRequest = null;
      });
  }

  return serverCatalogRequest;
}

async function fetchServerGalleryPage(page) {
  const response = await fetch(`${API_URL}/galleries?page=${page}&per_page=50`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gallery API error on page ${page}: ${response.status}`);
  }

  const data = await response.json();

  return {
    galleries: slimGalleries(extractApiList(data)),
    meta: getGalleryResponseMeta(data),
  };
}

async function requestServerGalleryCatalog() {
  const firstPage = await fetchServerGalleryPage(1);
  const pages = [{ page: 1, galleries: firstPage.galleries }];
  const plan = planGalleryPages(firstPage.meta, {
    requestedPerPage: 50,
    firstPageCount: firstPage.galleries.length,
  });

  if (plan.pageCount > 1) {
    const remaining = await Promise.all(
      Array.from({ length: plan.pageCount - 1 }, (_, index) =>
        fetchServerGalleryPage(index + 2),
      ),
    );

    remaining.forEach((page, index) => {
      pages.push({ page: index + 2, galleries: page.galleries });
    });
  }

  const assembled = assembleGalleryCatalog(pages, firstPage.meta, {
    requestedPerPage: 50,
  });

  if (!assembled.ok) {
    throw new Error(`Incomplete gallery catalog: ${assembled.reason}`);
  }

  return assembled.galleries;
}

// ============================================
// Fetch ALL Galleries
//
// Optimized for Portfolio filtering/search.
//
// Page 1 is fetched first to know the total
// number of pages. Remaining pages are then
// fetched in parallel instead of sequentially.
//
// Concurrent callers share one in-flight request.
// The return value stays an array. The browser
// path also sets `complete` when the API proved
// the catalog is whole.
// ============================================

export const fetchAllGalleries = async () => {
  try {
    if (typeof window !== "undefined") {
      return await fetchBrowserGalleryCatalog();
    }

    return await fetchSharedServerCatalog();
  } catch (error) {
    console.error("Error fetching all portfolio galleries:", error);

    // Keep existing behavior:
    // return empty array if API fails.
    return [];
  }
};

// ============================================
// CMS Pages API
// ============================================

/**
 * Fetch Homepage data
 */
export const fetchHomepageData = async () => {
  try {
    const res = await fetch(`${API_URL}/cms-pages/homepage`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Homepage API error: ${res.status}`);
    }

    const response = await res.json();

    if (!response?.success) {
      return null;
    }

    return response?.data || null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);

    return null;
  }
};
/**
 * Fetch About Us data
 */
export const fetchAboutData = async () => {
  try {
    const res = await fetch(`${API_URL}/cms-pages/about`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`About API error: ${res.status}`);
    }

    const data = await res.json();

    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching about data:", error);

    return null;
  }
};

/**
 * Fetch Contact Us data
 */
export const fetchContactData = async () => {
  try {
    const res = await fetch(`${API_URL}/cms-pages/contact`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Contact API error: ${res.status}`);
    }

    const data = await res.json();

    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching contact data:", error);

    return null;
  }
};

export const submitContactForm = async (payload) => {
  try {
    const res = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit contact form");
    }

    return data;
  } catch (error) {
    console.error("Contact form submission error:", error);
    throw error;
  }
};
