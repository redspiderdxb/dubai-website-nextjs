// ============================================
// API Configuration
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ============================================
// Common API Headers
// ============================================

const getHeaders = () => ({
  Accept: "application/json",
  "X-API-KEY": API_KEY,
});

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
 * Fetch a single blog post by slug
 */
export const fetchPostBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Blog detail API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);

    return null;
  }
};

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

/**
 * Fetch all services
 */
export const fetchAllServices = async () => {
  try {
    const res = await fetch(`${API_URL}/services`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Services API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || [];
  } catch (error) {
    console.error("Error fetching services:", error);

    return [];
  }
};

/**
 * Fetch a single service by slug
 */
export const fetchServiceBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/services/${slug}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Service detail API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || null;
  } catch (error) {
    console.error("Error fetching service:", error);

    return null;
  }
};

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
 * IMPORTANT:
 * This API is used by the Header.
 * No-cache is intentionally used here so newly
 * created published products appear in the menu.
 */
export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",

      headers: {
        ...getHeaders(),

        // Prevent API/proxy/browser caching
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },

      // Important for Next.js server-side fetching
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Products API error: ${res.status}`);
    }

    const data = await res.json();

    const products = Array.isArray(data?.data) ? data.data : [];

    // ==========================================
    // DEBUG
    // ==========================================

    console.log("============================================");

    console.log(
      "HEADER API PRODUCTS:",
      products.map((product) => ({
        id: product?.id,
        name: product?.name,
        slug: product?.slug,
        status: product?.status,
      })),
    );

    console.log("PRODUCT COUNT:", products.length);

    console.log("============================================");

    return products;
  } catch (error) {
    console.error("HEADER PRODUCTS API ERROR:", error);

    return [];
  }
};

/**
 * Fetch a single product by slug
 */
export const fetchProductBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Product detail API error: ${res.status}`);
    }

    const data = await res.json();

    return data.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);

    return null;
  }
};

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
    const res = await fetch(
      `${API_URL}/galleries?page=${page}&per_page=${perPage}`,
      {
        headers: getHeaders(),
      },
    );

    if (!res.ok) {
      throw new Error(`Gallery API error: ${res.status}`);
    }

    const data = await res.json();

    return {
      galleries: data.data || [],
      pagination: data.meta || {},
    };
  } catch (error) {
    console.error("Error fetching galleries:", error);

    return {
      galleries: [],
      pagination: {},
    };
  }
};

// ============================================
// Fetch ALL Galleries
//
// Optimized for Portfolio filtering/search.
//
// Page 1 is fetched first to know the total
// number of pages. Remaining pages are then
// fetched in parallel instead of sequentially.
//
// IMPORTANT:
// Existing API response structure is preserved.
// ============================================

export const fetchAllGalleries = async () => {
  try {
    // ==========================================
    // FIRST REQUEST
    // ==========================================

    const firstRes = await fetch(`${API_URL}/galleries?page=1&per_page=12`, {
      headers: getHeaders(),
    });

    if (!firstRes.ok) {
      throw new Error(`Gallery API error on page 1: ${firstRes.status}`);
    }

    const firstData = await firstRes.json();

    const firstPageGalleries = Array.isArray(firstData?.data)
      ? firstData.data
      : [];

    const lastPage = Number(firstData?.meta?.last_page || 1);

    // ==========================================
    // ONLY ONE PAGE
    // ==========================================

    if (lastPage <= 1) {
      console.log("============================================");

      console.log("ALL PORTFOLIO GALLERIES:", firstPageGalleries.length);

      console.log("TOTAL API PAGES:", lastPage);

      console.log("============================================");

      return firstPageGalleries;
    }

    // ==========================================
    // FETCH REMAINING PAGES IN PARALLEL
    // ==========================================

    const pageRequests = [];

    for (let page = 2; page <= lastPage; page++) {
      pageRequests.push(
        fetch(`${API_URL}/galleries?page=${page}&per_page=12`, {
          headers: getHeaders(),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Gallery API error on page ${page}: ${res.status}`);
          }

          const data = await res.json();

          return Array.isArray(data?.data) ? data.data : [];
        }),
      );
    }

    // ==========================================
    // WAIT FOR ALL PAGES TO COMPLETE
    // ==========================================

    const remainingPages = await Promise.all(pageRequests);

    // ==========================================
    // COMBINE ALL RESULTS
    //
    // Page 1 remains first.
    // Remaining pages stay in their original
    // request/order sequence.
    // ==========================================

    const allGalleries = [...firstPageGalleries, ...remainingPages.flat()];

    // ==========================================
    // DEBUG
    // ==========================================

    console.log("============================================");

    console.log("ALL PORTFOLIO GALLERIES:", allGalleries.length);

    console.log("TOTAL API PAGES:", lastPage);

    console.log("============================================");

    return allGalleries;
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

    const data = await res.json();

    return data.success ? data.data : null;
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
