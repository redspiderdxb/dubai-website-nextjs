import { fetchAllServices } from "./api";

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

function slimServices(services) {
  if (!Array.isArray(services)) {
    return [];
  }

  return services
    .filter((service) => service?.name && service?.slug)
    .map((service) => ({
      id: service.id,
      name: service.name,
      slug: service.slug,
    }));
}

/** Products shown under Services in the nav (not under Products). */
const SERVICE_MENU_PRODUCT_SLUGS = new Set([
  "real-estate-portal",
  "sms-marketing-uae",
]);

function mergeServiceMenuProducts(services, products) {
  const merged = [...slimServices(services)];
  const slugs = new Set(merged.map((item) => item.slug));

  for (const product of slimProducts(products)) {
    if (!SERVICE_MENU_PRODUCT_SLUGS.has(product.slug) || slugs.has(product.slug)) {
      continue;
    }

    merged.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      path: `/products/${product.slug}`,
    });
    slugs.add(product.slug);
  }

  return merged;
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
  const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  if (!API_URL || !API_KEY) {
    return cache.data || { products: [], services: [] };
  }

  try {
    const [productsResponse, servicesList] = await Promise.all([
      fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }),
      fetchAllServices(),
    ]);

    if (!productsResponse.ok) {
      throw new Error(`Header nav API error: ${productsResponse.status}`);
    }

    const productsPayload = await productsResponse.json();
    const products = slimProducts(extractProducts(productsPayload));
    const data = {
      products,
      services: mergeServiceMenuProducts(servicesList, products),
    };

    cache = {
      data,
      expiresAt: now + CACHE_TTL_MS,
    };

    return data;
  } catch (error) {
    console.error("Error fetching header nav data:", error);

    return cache.data || { products: [], services: [] };
  }
}
