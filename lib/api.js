const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ✅ All Posts (Blog Listing)
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

// ✅ Single Post (Blog Detail)
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

// ✅ All Pages (About, Contact, etc.)
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

// ✅ Single Page
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

// ✅ Site Settings
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
// 🔥 SERVICES - NAYA ADD KIYA HAI
// ============================================

// ✅ All Services (Services Listing)
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

// ✅ Single Service (Service Detail)
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

// ✅ Featured Services (Homepage)
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
// 🔥 PRODUCTS - NAYA ADD KIYA HAI
// ============================================

// ✅ All Products (Products Listing)
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

// ✅ Single Product (Product Detail)
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

// ✅ Featured Products (Homepage)
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

// ✅ Fetch all galleries
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
