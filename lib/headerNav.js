const CACHE_TTL_MS = 5 * 60 * 1000;

let cache = {
  data: null,
  expiresAt: 0,
};

function slimProducts(products) {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .filter((product) => product?.name && product?.slug)
    .map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
    }));
}

function extractProducts(payload) {
  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.products)) {
    return payload.products;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
}

export async function getHeaderNavData() {
  const now = Date.now();

  if (cache.data && now < cache.expiresAt) {
    return cache.data;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.API_KEY;

  if (!API_URL || !API_KEY) {
    return cache.data || { products: [] };
  }

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Header nav API error: ${response.status}`);
    }

    const payload = await response.json();
    const data = {
      products: slimProducts(extractProducts(payload)),
    };

    cache = {
      data,
      expiresAt: now + CACHE_TTL_MS,
    };

    return data;
  } catch (error) {
    console.error("Error fetching header nav data:", error);

    return cache.data || { products: [] };
  }
}
