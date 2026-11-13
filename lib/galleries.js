const CACHE_TTL_MS = 5 * 60 * 1000;
const ALL_GALLERIES_PER_PAGE = 50;

let allCache = {
  result: null,
  expiresAt: 0,
};

let allInFlight = null;

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

function resolveGalleryMeta(payload) {
  if (payload?.meta && typeof payload.meta === "object") {
    return payload.meta;
  }

  if (
    payload?.data &&
    typeof payload.data === "object" &&
    !Array.isArray(payload.data) &&
    (payload.data.last_page != null || payload.data.total != null)
  ) {
    return payload.data;
  }

  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    (payload.last_page != null || payload.total != null)
  ) {
    return payload;
  }

  return null;
}

function extractGalleryList(payload) {
  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
}

function positiveNumber(value) {
  if (value == null || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) && number > 0 ? number : null;
}

/**
 * Page count comes from a real last_page, or from total and the first page
 * size when last_page was not sent. A missing last_page is never treated as 1.
 */
export function planGalleryPages(meta, { requestedPerPage, firstPageCount } = {}) {
  const lastPage = positiveNumber(meta?.last_page);
  const total = positiveNumber(meta?.total);
  const declaredPageSize = positiveNumber(meta?.per_page) || positiveNumber(requestedPerPage);
  const received = positiveNumber(firstPageCount);
  let pageCount = null;

  if (lastPage) {
    pageCount = lastPage;
  } else if (total && received && received >= total) {
    pageCount = 1;
  } else if (total && (declaredPageSize || received)) {
    pageCount = Math.ceil(total / (received || declaredPageSize));
  }

  return {
    pageCount,
    total,
    totalProvided: total != null,
    lastPageProvided: lastPage != null,
  };
}

/**
 * A catalog is complete only when every requested page was accepted and the
 * merged length matches a total the API actually sent. Missing total, or a
 * last_page coerced to 1, is not evidence.
 */
export function isCompleteGalleryCatalog(galleries, pageInfo) {
  const list = Array.isArray(galleries) ? galleries : [];

  if (!pageInfo?.totalProvided || pageInfo.pagesAccepted !== true || list.length === 0) {
    return false;
  }

  const total = Number(pageInfo.total ?? pageInfo.pagination?.total);

  return Number.isFinite(total) && total > 0 && list.length === total;
}

/**
 * Reject a short or empty page before the last page, an empty declared last
 * page, or a merged list that does not match total. Those results are not a
 * full catalog.
 */
export function assembleGalleryCatalog(pages, meta, options = {}) {
  const list = Array.isArray(pages) ? pages : [];
  const first = list.find((page) => page?.page === 1);
  const firstGalleries = Array.isArray(first?.galleries) ? first.galleries : [];
  const plan = planGalleryPages(meta, {
    requestedPerPage: options.requestedPerPage,
    firstPageCount: firstGalleries.length,
  });
  const total = plan.total || 0;

  if (!plan.pageCount) {
    return {
      ok: !plan.totalProvided,
      galleries: plan.totalProvided ? [] : firstGalleries,
      complete: false,
      total,
      reason: plan.totalProvided ? "unresolved-page-count" : "single-page-unverified",
    };
  }

  const byPage = new Map(
    list.map((page) => [page.page, Array.isArray(page.galleries) ? page.galleries : []]),
  );
  const ordered = [];

  for (let page = 1; page <= plan.pageCount; page += 1) {
    if (!byPage.has(page)) {
      return {
        ok: false,
        galleries: [],
        complete: false,
        total,
        reason: "missing-page",
      };
    }

    ordered.push(byPage.get(page));
  }

  const firstCount = ordered[0].length;

  for (let index = 0; index < ordered.length; index += 1) {
    const count = ordered[index].length;
    const isLast = index === ordered.length - 1;

    if (!isLast && (count === 0 || (firstCount > 0 && count < firstCount))) {
      return {
        ok: false,
        galleries: [],
        complete: false,
        total,
        reason: "incomplete-page",
      };
    }

    if (isLast && count === 0 && ordered.length > 1) {
      return {
        ok: false,
        galleries: [],
        complete: false,
        total,
        reason: "empty-last-page",
      };
    }
  }

  const galleries = ordered.flat();

  if (plan.totalProvided && galleries.length !== plan.total) {
    return {
      ok: false,
      galleries: [],
      complete: false,
      total,
      reason: "count-mismatch",
    };
  }

  return {
    ok: true,
    galleries,
    complete: isCompleteGalleryCatalog(galleries, {
      totalProvided: plan.totalProvided,
      pagesAccepted: true,
      total: plan.total,
    }),
    total: plan.total || galleries.length,
    reason: "ok",
  };
}

export function portfolioActivePage(pageScope, filterKey, currentPage) {
  return pageScope === filterKey ? currentPage : 1;
}

/**
 * A complete catalog is kept when the incoming list is incomplete, even if
 * that incoming list is longer. A shorter list never replaces a longer one.
 */
export function adoptPortfolioCatalog(current, incoming) {
  const currentItems = Array.isArray(current?.items) ? current.items : [];
  const incomingItems = Array.isArray(incoming?.items) ? incoming.items : [];
  const currentComplete = current?.complete === true;
  const incomingComplete = incoming?.complete === true;
  const currentCatalog =
    current && Array.isArray(current.items)
      ? current
      : { items: currentItems, complete: currentComplete };

  if (currentComplete && !incomingComplete) {
    return currentCatalog;
  }

  if (incomingItems.length === 0 || incomingItems.length < currentItems.length) {
    return currentCatalog;
  }

  if (incomingItems.length === currentItems.length) {
    if (!incomingComplete) {
      return currentCatalog;
    }

    return { items: incomingItems, complete: true };
  }

  return { items: incomingItems, complete: incomingComplete };
}

async function fetchGalleryPage(API_URL, API_KEY, page = 1, perPage = 12) {
  const response = await fetch(
    `${API_URL}/galleries?page=${page}&per_page=${perPage}`,
    {
      headers: getHeaders(API_KEY),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Gallery API error on page ${page}: ${response.status}`);
  }

  const data = await response.json();
  const meta = resolveGalleryMeta(data);

  return {
    galleries: slimGalleries(extractGalleryList(data)),
    pagination: slimPagination(meta || {}),
    meta,
    metaPresent: Boolean(meta),
    totalProvided: meta?.total != null && meta?.total !== "",
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
    const pageResult = await fetchGalleryPage(API_URL, API_KEY, page, perPage);

    return {
      galleries: pageResult.galleries,
      pagination: pageResult.pagination,
    };
  } catch (error) {
    console.error("Error fetching galleries page:", error);

    return {
      galleries: [],
      pagination: {},
    };
  }
}

function emptyCatalogResult() {
  return {
    galleries: [],
    complete: false,
    total: 0,
  };
}

function staleCachedCatalog() {
  if (!allCache.result?.complete || !Array.isArray(allCache.result.galleries)) {
    return null;
  }

  return {
    galleries: allCache.result.galleries,
    complete: false,
    stale: true,
    total: Number(allCache.result.total || 0),
  };
}

async function loadAllGalleries() {
  const { API_URL, API_KEY } = getApiConfig();

  if (!API_URL || !API_KEY) {
    return emptyCatalogResult();
  }

  const firstPage = await fetchGalleryPage(
    API_URL,
    API_KEY,
    1,
    ALL_GALLERIES_PER_PAGE,
  );
  const pages = [{ page: 1, galleries: firstPage.galleries }];
  const plan = planGalleryPages(firstPage.meta, {
    requestedPerPage: ALL_GALLERIES_PER_PAGE,
    firstPageCount: firstPage.galleries.length,
  });

  if (plan.pageCount > 1) {
    const remaining = await Promise.all(
      Array.from({ length: plan.pageCount - 1 }, (_, index) =>
        fetchGalleryPage(API_URL, API_KEY, index + 2, ALL_GALLERIES_PER_PAGE),
      ),
    );

    remaining.forEach((page, index) => {
      pages.push({ page: index + 2, galleries: page.galleries });
    });
  }

  const assembled = assembleGalleryCatalog(pages, firstPage.meta, {
    requestedPerPage: ALL_GALLERIES_PER_PAGE,
  });

  if (!assembled.ok) {
    throw new Error(`Incomplete gallery catalog: ${assembled.reason}`);
  }

  const result = {
    galleries: assembled.galleries,
    complete: assembled.complete === true,
    total: Number(assembled.total || 0),
  };

  if (result.complete) {
    allCache = {
      result,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
  }

  return result;
}

export async function getAllGalleries() {
  const now = Date.now();

  if (
    allCache.result?.complete &&
    Array.isArray(allCache.result.galleries) &&
    now < allCache.expiresAt
  ) {
    return allCache.result;
  }

  if (!allInFlight) {
    allInFlight = loadAllGalleries()
      .catch((error) => {
        console.error("Error fetching all galleries:", error);

        return staleCachedCatalog() || emptyCatalogResult();
      })
      .finally(() => {
        allInFlight = null;
      });
  }

  return allInFlight;
}
