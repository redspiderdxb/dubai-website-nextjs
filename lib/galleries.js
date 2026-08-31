const CACHE_TTL_MS = 5 * 60 * 1000;

let allCache = {
  data: null,
  expiresAt: 0,
};

function getApiConfig() {
  return {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_KEY: process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  };
}

function getHeaders(API_KEY) {
  return {
    Accept: "application/json",
    "X-API-KEY": API_KEY,
  };
}

function cleanText(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slimGallery(gallery) {
  if (!gallery || typeof gallery !== "object") {
    return null;
  }

  return {
    id: gallery.id ?? null,
    name: gallery.name || "",
    slug: gallery.slug || "",
    description: cleanText(gallery.description),
    image: gallery.image || "",
    project_url: gallery.project_url || "",
  };
}

export function slimGalleries(galleries) {
  if (!Array.isArray(galleries)) {
    return [];
  }

  return galleries.map(slimGallery).filter(Boolean);
}

export function slimPagination(meta) {
  if (!meta || typeof meta !== "object") {
    return {};
  }

  return {
    current_page: Number(meta.current_page || 1),
    last_page: Number(meta.last_page || 1),
    per_page: Number(meta.per_page || 12),
    total: Number(meta.total || 0),
  };
}

async function fetchGalleryPage(API_URL, API_KEY, page = 1, perPage = 12) {
  const response = await fetch(
    `${API_URL}/galleries?page=${page}&per_page=${perPage}`,
    {
      headers: getHeaders(API_KEY),
    },
  );

  if (!response.ok) {
    throw new Error(`Gallery API error on page ${page}: ${response.status}`);
  }

  const data = await response.json();

  return {
    galleries: slimGalleries(data?.data),
    pagination: slimPagination(data?.meta),
  };
}

export async function getGalleriesPage(page = 1, perPage = 12) {
  const { API_URL, API_KEY } = getApiConfig();

  if (!API_URL || !API_KEY) {
    return {
      galleries: [],
      pagination: {},
    };
  }

  try {
    return await fetchGalleryPage(API_URL, API_KEY, page, perPage);
  } catch (error) {
    console.error("Error fetching galleries page:", error);

    return {
      galleries: [],
      pagination: {},
    };
  }
}

export async function getAllGalleries() {
  const now = Date.now();

  if (allCache.data && now < allCache.expiresAt) {
    return allCache.data;
  }

  const { API_URL, API_KEY } = getApiConfig();

  if (!API_URL || !API_KEY) {
    return [];
  }

  try {
    const firstPage = await fetchGalleryPage(API_URL, API_KEY, 1, 50);
    const lastPage = Number(firstPage.pagination?.last_page || 1);

    let galleries = firstPage.galleries;

    if (lastPage > 1) {
      const remaining = await Promise.all(
        Array.from({ length: lastPage - 1 }, (_, index) =>
          fetchGalleryPage(API_URL, API_KEY, index + 2, 50),
        ),
      );

      galleries = [
        ...galleries,
        ...remaining.flatMap((page) => page.galleries),
      ];
    }

    allCache = {
      data: galleries,
      expiresAt: now + CACHE_TTL_MS,
    };

    return galleries;
  } catch (error) {
    console.error("Error fetching all galleries:", error);

    return allCache.data || [];
  }
}
