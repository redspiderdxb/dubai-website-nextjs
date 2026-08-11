// ============================================
// API Configuration
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ============================================
// Blog API
// ============================================

/**
 * Fetch all blog posts
 * @returns {Promise<Array>} Array of blog posts
 */
export const fetchAllPosts = async () => {
  const res = await fetch(`${API_URL}/posts`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || [];
};

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post data or null
 */
export const fetchPostBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/posts/${slug}`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || null;
};

// ============================================
// Pages API
// ============================================

/**
 * Fetch all static pages
 * @returns {Promise<Array>} Array of pages
 */
export const fetchAllPages = async () => {
  const res = await fetch(`${API_URL}/pages`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || [];
};

/**
 * Fetch a single page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} Page data or null
 */
export const fetchPageBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/pages/${slug}`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || null;
};

// ============================================
// Settings API
// ============================================

/**
 * Fetch site settings
 * @returns {Promise<Object>} Settings data
 */
export const fetchSettings = async () => {
  const res = await fetch(`${API_URL}/settings`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || {};
};

// ============================================
// Services API
// ============================================

/**
 * Fetch all services
 * @returns {Promise<Array>} Array of services
 */
export const fetchAllServices = async () => {
  const res = await fetch(`${API_URL}/services`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || [];
};

/**
 * Fetch a single service by slug
 * @param {string} slug - Service slug
 * @returns {Promise<Object|null>} Service data or null
 */
export const fetchServiceBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/services/${slug}`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || null;
};

/**
 * Fetch featured services for homepage
 * @param {number} limit - Number of services to fetch
 * @returns {Promise<Array>} Array of featured services
 */
export const fetchFeaturedServices = async (limit = 6) => {
  const res = await fetch(`${API_URL}/services/featured?limit=${limit}`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || [];
};

// ============================================
// Products API
// ============================================

/**
 * Fetch all products
 * @returns {Promise<Array>} Array of products
 */
export const fetchAllProducts = async () => {
  const res = await fetch(`${API_URL}/products`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || [];
};

/**
 * Fetch a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object|null>} Product data or null
 */
export const fetchProductBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/products/${slug}`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || null;
};

/**
 * Fetch featured products for homepage
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} Array of featured products
 */
export const fetchFeaturedProducts = async (limit = 6) => {
  const res = await fetch(`${API_URL}/products/featured?limit=${limit}`, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  return data.data || [];
};

// ============================================
// Galleries API
// ============================================

/**
 * Fetch all galleries
 * @returns {Promise<Array>} Array of galleries
 */
export const fetchAllGalleries = async () => {
  try {
    const res = await fetch(`${API_URL}/galleries`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
};

// ============================================
// CMS Pages API (Homepage, About, Contact)
// ============================================

/**
 * Fetch homepage data from CMS
 * @returns {Promise<Object|null>} Homepage data or null
 */
export const fetchHomepageData = async () => {
  try {
    const res = await fetch(`${API_URL}/cms-pages/homepage`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
};

/**
 * Fetch About Us page data from CMS
 * @returns {Promise<Object|null>} About page data or null
 */
export const fetchAboutData = async () => {
  try {
    const res = await fetch(`${API_URL}/cms-pages/about`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};

/**
 * Fetch Contact Us page data from CMS
 * @returns {Promise<Object|null>} Contact page data or null
 */
export const fetchContactData = async () => {
  try {
    const res = await fetch(`${API_URL}/cms-pages/contact`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return null;
  }
};
