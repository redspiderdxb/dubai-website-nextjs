import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  adoptPortfolioCatalog,
  fetchAllGalleries,
  portfolioActivePage,
} from "../../lib/api";
import {
  DEFAULT_CATEGORY,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_INDUSTRIES,
  buildPortfolioPath,
} from "../../lib/portfolioFilters";
import ThemedSelect from "../ui/ThemedSelect";
import PortfolioPagePopup from "./PortfolioPagePopup";

const FALLBACK_IMAGE = "/assets/img/portfolio/portfolio-1.webp";

const MAX_CONCURRENT_PRELOADS = 2;
const MAX_DECODED_IMAGES = 3;

function automaticPreloadAllowed() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) {
    return true;
  }

  if (connection.saveData) {
    return false;
  }

  return connection.effectiveType !== "2g" && connection.effectiveType !== "slow-2g";
}

function createPreloadState() {
  return {
    urls: [],
    urlKey: "",
    popupIndex: -1,
    hovered: "",
    queue: [],
    inflight: new Map(),
    decoded: new Map(),
    recent: [],
    requested: new Set(),
    idleId: 0,
    idleType: "",
    fallbackId: 0,
  };
}

function priorityUrls(state) {
  const urls = [];
  const push = (url) => {
    if (url && !urls.includes(url)) {
      urls.push(url);
    }
  };

  if (state.hovered) {
    push(state.hovered);
  }

  const list = state.urls;
  const index = state.popupIndex;

  if (index >= 0 && list[index]) {
    push(list[index]);

    if (list.length > 1) {
      push(list[(index + 1) % list.length]);
      push(list[(index - 1 + list.length) % list.length]);
    }
  }

  return urls;
}

function enqueuePreload(state, url, front) {
  if (!url) {
    return;
  }

  const alreadyActive =
    state.inflight.has(url) || state.decoded.has(url) || state.requested.has(url);

  if (alreadyActive || state.queue.includes(url)) {
    if (front && state.queue.includes(url)) {
      state.queue = [url, ...state.queue.filter((item) => item !== url)];
    }

    return;
  }

  if (front) {
    state.queue.unshift(url);
  } else {
    state.queue.push(url);
  }
}

function reprioritizeQueue(state) {
  const front = priorityUrls(state).filter((url) => state.queue.includes(url));

  if (!front.length) {
    return;
  }

  state.queue = [...front, ...state.queue.filter((url) => !front.includes(url))];
}

function trimDecodedImages(state) {
  const keep = [];
  const push = (url) => {
    if (!url || keep.includes(url) || keep.length >= MAX_DECODED_IMAGES || !state.decoded.has(url)) {
      return;
    }

    keep.push(url);
  };

  for (const url of priorityUrls(state)) {
    push(url);
  }

  for (const url of state.recent) {
    if (state.urls.includes(url)) {
      push(url);
    }
  }

  const keepSet = new Set(keep);

  for (const url of state.decoded.keys()) {
    if (!keepSet.has(url)) {
      state.decoded.delete(url);
    }
  }

  state.recent = state.recent.filter((url) => state.decoded.has(url));
}

function cancelScheduledPreload(state) {
  if (state.fallbackId) {
    clearTimeout(state.fallbackId);
    state.fallbackId = 0;
  }

  if (!state.idleId) {
    return;
  }

  if (state.idleType === "idle" && typeof cancelIdleCallback === "function") {
    cancelIdleCallback(state.idleId);
  } else {
    clearTimeout(state.idleId);
  }

  state.idleId = 0;
  state.idleType = "";
}

function schedulePreload(state) {
  if (state.idleId || state.fallbackId || typeof window === "undefined") {
    return;
  }

  // Clear both handles before downloading. A cached image can finish inside
  // pumpPreloads and schedule the next pair; that new handle must stay.
  const run = () => {
    const idleId = state.idleId;
    const idleType = state.idleType;
    const fallbackId = state.fallbackId;

    state.idleId = 0;
    state.idleType = "";
    state.fallbackId = 0;

    if (fallbackId) {
      clearTimeout(fallbackId);
    }

    if (idleType === "idle" && idleId && typeof cancelIdleCallback === "function") {
      cancelIdleCallback(idleId);
    } else if (idleId) {
      clearTimeout(idleId);
    }

    pumpPreloads(state);
  };

  if (typeof requestIdleCallback === "function") {
    state.idleType = "idle";
    state.idleId = requestIdleCallback(run, { timeout: 1500 });
    state.fallbackId = window.setTimeout(run, 1600);
    return;
  }

  state.idleType = "timeout";
  state.idleId = window.setTimeout(run, 200);
}

function pumpPreloads(state) {
  if (typeof document !== "undefined" && document.hidden) {
    return;
  }

  while (state.inflight.size < MAX_CONCURRENT_PRELOADS && state.queue.length > 0) {
    const url = state.queue.shift();

    if (!url || state.requested.has(url) || state.inflight.has(url) || state.decoded.has(url)) {
      continue;
    }

    state.requested.add(url);

    // window.Image: the file also imports next/image as Image, and the bundler
    // would otherwise compile this into `new Image()` from that component.
    const img = new window.Image();
    state.inflight.set(url, img);
    img.decoding = "async";

    const finish = (ok) => {
      if (state.inflight.get(url) === img) {
        state.inflight.delete(url);
      }

      if (ok && img.naturalWidth > 0 && state.urls.includes(url)) {
        state.decoded.set(url, img);
        state.recent = [url, ...state.recent.filter((item) => item !== url)];
        trimDecodedImages(state);
        publishRetainedImages(state);
      }

      schedulePreload(state);
    };

    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    img.src = url;
  }
}

function rebuildPreloadQueue(state, resetPage) {
  if (resetPage) {
    const allowed = new Set(state.urls);

    for (const url of state.requested) {
      if (!allowed.has(url) && !state.inflight.has(url)) {
        state.requested.delete(url);
      }
    }

    for (const url of state.decoded.keys()) {
      if (!allowed.has(url)) {
        state.decoded.delete(url);
      }
    }

    state.recent = state.recent.filter((url) => state.decoded.has(url));
  }

  state.queue = [];

  if (automaticPreloadAllowed()) {
    for (const url of state.urls) {
      enqueuePreload(state, url, false);
    }
  }

  const explicit = automaticPreloadAllowed()
    ? priorityUrls(state)
    : state.hovered
      ? [state.hovered]
      : [];

  for (let index = explicit.length - 1; index >= 0; index -= 1) {
    enqueuePreload(state, explicit[index], true);
  }

  reprioritizeQueue(state);
  trimDecodedImages(state);
}

function prioritizePreload(state, url) {
  if (!url || !state.urls.includes(url)) {
    return;
  }

  state.hovered = url;
  enqueuePreload(state, url, true);
  reprioritizeQueue(state);
  trimDecodedImages(state);
  publishRetainedImages(state);
  cancelScheduledPreload(state);
  pumpPreloads(state);
}

function publishRetainedImages(state) {
  state.onRetained?.(state.recent.filter((url) => state.decoded.has(url)));
}

// Approved priority order for the Websites view (CMS gallery IDs).
// Matched only by Number(project.id); never by name or URL.
const PINNED_PORTFOLIO_IDS = [
  224, // De Leeuw International
  169, // Dome International
  211, // DSQ Property Advisory
  202, // Pixium Mobile Phones
  165, // EDMAC Engineering Consultant
  223, // Jewellery2
  156, // Aime Le Noir
  225, // Health & Wellness ME
  226, // AA2
  197, // Astronyx Aerospace
  194, // Cityview Developments
  195, // Kashwani Law Firm
  193, // BSI UAE
  8, // KASCO Developments
  170, // Fogo de Chão
  168, // Everbridge Shipping
  183, // BOJ Middle East
  182, // Makyee
  177, // AWP
  172, // FASSCO International
  167, // ATS
];

// Project URL option hidden by CMS ID (the card, image and lightbox stay visible).
// NOT_WORKING projects: link hidden; grouped third after the pinned 21.
const NOT_WORKING_HIDDEN_IDS = new Set([
  21, 24, 25, 26, 32, 39, 42, 46, 62, 64, 82, 92, 107, 116, 119, 120, 128, 130,
  131, 137, 138, 141, 143, 146, 147, 148, 150, 151, 152, 155, 159, 160, 164, 166,
  171, 175, 178, 189, 192,
]);
// Remaining MANUAL REVIEW projects: link hidden; grouped fourth.
// Kept linked: intwo, EDMAC, Onda, all 8 Figma links, and CMS 226 (pinned).
const MANUAL_HIDDEN_IDS = new Set([44, 45, 80, 127, 134, 162]);
const HIDDEN_PROJECT_URL_IDS = new Set([
  ...NOT_WORKING_HIDDEN_IDS,
  ...MANUAL_HIDDEN_IDS,
]);

// Temporary card-level hiding on /our-portfolio/. Reverse by changing this flag.
// true:  hide (1) projects with a null, empty, whitespace-only or "#" project_url
//             and (2) projects whose ID is in HIDDEN_PROJECT_URL_IDS.
// false: show all projects, with the original card and link behaviour.
const HIDE_UNAVAILABLE_PORTFOLIO_PROJECTS = true;

// Same URL rule as hasProjectLink: a link is usable only when it is non-empty and not "#".
const hasUsableProjectUrl = (project) => {
  const url = String(project.project_url || "").trim();

  return url !== "" && url !== "#";
};

const isUnavailablePortfolioProject = (project) =>
  !hasUsableProjectUrl(project) ||
  HIDDEN_PROJECT_URL_IDS.has(Number(project.id));

// Moves pinned projects to the top in the approved sequence.
// Pinned IDs missing from the data are skipped (no empty cards).
// All other projects keep their existing API order after them.
function applyPinnedOrder(projects) {
  const rankById = new Map(
    PINNED_PORTFOLIO_IDS.map((id, index) => [id, index]),
  );
  const pinnedByRank = new Map();
  const rest = [];

  projects.forEach((project) => {
    const rank = rankById.get(Number(project.id));

    if (rank === undefined || pinnedByRank.has(rank)) {
      rest.push(project);
    } else {
      pinnedByRank.set(rank, project);
    }
  });

  const pinnedInOrder = [...pinnedByRank.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, project]) => project);

  // Groups after the pinned 21, each keeping API order:
  // 1. working/approved URL, 2. no URL,
  // 3. NOT_WORKING with link hidden, 4. remaining MANUAL with link hidden.
  const workingOrApproved = rest.filter(
    (project) =>
      hasUsableProjectUrl(project) &&
      !HIDDEN_PROJECT_URL_IDS.has(Number(project.id)),
  );
  const noUrl = rest.filter((project) => !hasUsableProjectUrl(project));
  const notWorkingHidden = rest.filter((project) =>
    NOT_WORKING_HIDDEN_IDS.has(Number(project.id)),
  );
  const manualHidden = rest.filter((project) =>
    MANUAL_HIDDEN_IDS.has(Number(project.id)),
  );

  return [
    ...pinnedInOrder,
    ...workingOrApproved,
    ...noUrl,
    ...notWorkingHidden,
    ...manualHidden,
  ];
}

// Moves one project to a fixed 0-based index in an already ordered list.
// Returns the list unchanged if the project is absent or the index is out of range.
function placeProjectAtIndex(projects, id, index) {
  const currentIndex = projects.findIndex(
    (project) => Number(project.id) === id,
  );

  if (
    currentIndex === -1 ||
    currentIndex === index ||
    index >= projects.length
  ) {
    return projects;
  }

  const next = projects.slice();
  const [project] = next.splice(currentIndex, 1);

  next.splice(index, 0, project);

  return next;
}

function getAssetUrl() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return API_URL ? API_URL.replace("/api/v1", "").replace(/\/$/, "") : "";
}

function resolveGalleryImage(image) {
  if (!image) {
    return FALLBACK_IMAGE;
  }

  const value = String(image);

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  ) {
    return value;
  }

  const assetUrl = getAssetUrl();

  return assetUrl ? `${assetUrl}/storage/${value}` : FALLBACK_IMAGE;
}

function getYoutubeVideoId(url) {
  if (!url) {
    return "";
  }

  try {
    const value = String(url).trim();

    if (value.includes("youtube.com/watch")) {
      return new URL(value).searchParams.get("v") || "";
    }

    if (value.includes("youtu.be/")) {
      return new URL(value).pathname.replace("/", "").split("?")[0] || "";
    }

    if (value.includes("youtube.com/embed/")) {
      const parts = new URL(value).pathname.split("/");
      const embedIndex = parts.indexOf("embed");

      return embedIndex !== -1 ? parts[embedIndex + 1] || "" : "";
    }

    if (value.includes("youtube.com/shorts/")) {
      const parts = new URL(value).pathname.split("/");
      const shortsIndex = parts.indexOf("shorts");

      return shortsIndex !== -1 ? parts[shortsIndex + 1] || "" : "";
    }

    if (value.includes("youtube.com/live/")) {
      const parts = new URL(value).pathname.split("/");
      const liveIndex = parts.indexOf("live");

      return liveIndex !== -1 ? parts[liveIndex + 1] || "" : "";
    }

    return "";
  } catch (error) {
    return "";
  }
}

/** Brand abbreviations kept uppercase when reformatting ALL CAPS titles. */
const PRESERVED_TITLE_ACRONYMS = new Set([
  "ATS",
  "AI",
  "UAE",
  "LLC",
  "SGD",
  "RS",
]);

function isFullyUppercaseTitle(title) {
  const letters = String(title || "").replace(/[^A-Za-z]/g, "");

  return letters.length > 0 && letters === letters.toUpperCase();
}

/**
 * Display-only: convert fully uppercase CMS titles to Title Case.
 * Mixed-case titles are left unchanged. Search still uses raw CMS names.
 */
function formatPortfolioDisplayTitle(rawTitle) {
  const title = String(rawTitle ?? "");

  if (!title.trim() || !isFullyUppercaseTitle(title)) {
    return title;
  }

  return title
    .split(/(\s+)/)
    .map((part) => {
      if (!part || /^\s+$/.test(part)) {
        return part;
      }

      if (!/[A-Za-z]/.test(part)) {
        return part;
      }

      const upper = part.toUpperCase();

      if (PRESERVED_TITLE_ACRONYMS.has(upper)) {
        return upper;
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");
}

function formatGalleries(data = []) {
  return data.map((gallery) => {
    const cleanDescription = gallery.description
      ? String(gallery.description)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "Portfolio";

    const projectUrl =
      gallery.project_url || `/galleries/${gallery.slug || gallery.id}`;

    const searchText = `
        ${gallery.name || ""}
        ${cleanDescription || ""}
        ${projectUrl || ""}
      `
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

    const isYoutube =
      typeof gallery.project_url === "string" &&
      (gallery.project_url.includes("youtube.com/watch") ||
        gallery.project_url.includes("youtu.be/") ||
        gallery.project_url.includes("youtube.com/embed/") ||
        gallery.project_url.includes("youtube.com/shorts/") ||
        gallery.project_url.includes("youtube.com/live/"));

    return {
      id: gallery.id,
      title: formatPortfolioDisplayTitle(gallery.name || "Untitled Project"),
      category: cleanDescription || "Portfolio",
      image: resolveGalleryImage(gallery.image),
      project_url: gallery.project_url,
      link: projectUrl,
      searchText,
      isYoutube,
      youtubeId: isYoutube ? getYoutubeVideoId(gallery.project_url) : "",
      filter: "filter-websites",
    };
  });
}

function PortfolioProjectImage({ src, alt, priority = false }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setImageSrc(src || FALLBACK_IMAGE);
  }, [src]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
      priority={priority}
      style={{
        objectFit: "cover",
        objectPosition: "top center",
      }}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}

function PortfolioYoutubeItem({ title, videoId }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : "";
  const thumb = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : FALLBACK_IMAGE;

  if (playing && embedUrl) {
    return (
      <div className="portfolio-video-wrapper">
        <iframe
          src={`${embedUrl}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="portfolio-video-wrapper">
      <button
        type="button"
        className="portfolio-youtube-facade"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${title}`}
      >
        <Image
          src={thumb}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <span className="portfolio-play-icon" aria-hidden="true">
          <i className="bi bi-play-fill"></i>
        </span>
      </button>
    </div>
  );
}

export default function PortfolioGrid({
  initialGalleries = [],
  initialFilter = DEFAULT_CATEGORY,
  initialIndustry = "",
}) {
  const router = useRouter();
  const popupTriggerRef = useRef(null);

  const PER_PAGE = 24;
  const PAGES_PER_GROUP = 6;

  const filter = initialFilter || DEFAULT_CATEGORY;
  const industryFilter = initialIndustry || "";

  const initialFormattedGalleries = useMemo(
    () => formatGalleries(initialGalleries || []),
    [initialGalleries],
  );

  const [galleries, setGalleries] = useState(initialFormattedGalleries);

  const [catalog, setCatalog] = useState(() => ({
    items: initialFormattedGalleries,
    complete: false,
  }));

  const [catalogProps, setCatalogProps] = useState(initialFormattedGalleries);

  // Apply new server props before paint. A shorter list cannot replace a longer one.
  let visibleCatalog = catalog;

  if (catalogProps !== initialFormattedGalleries) {
    visibleCatalog = adoptPortfolioCatalog(catalog, {
      items: initialFormattedGalleries,
      complete: false,
    });
    setCatalogProps(initialFormattedGalleries);

    if (visibleCatalog !== catalog) {
      setCatalog(visibleCatalog);
    }
  }

  const allGalleries = visibleCatalog.items;

  /*
   * `loading` stays reserved for pagination.
   * `catalogLoading` only replaces the empty message while the catalog
   * request is still running. Existing cards stay on screen.
   */
  const [loading, setLoading] = useState(false);

  const [catalogLoading, setCatalogLoading] = useState(true);

  // ============================================
  // Filter State
  // ============================================

  const [searchInput, setSearchInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const filterKey = `${filter}\0${industryFilter}`;

  const [pageScope, setPageScope] = useState(filterKey);

  const pageChanged = pageScope !== filterKey;

  if (pageChanged) {
    setPageScope(filterKey);
    setCurrentPage(1);
  }

  // Page 1 is used in the same render a category changes, before paint.
  const activePage = portfolioActivePage(pageScope, filterKey, currentPage);

  // ============================================
  // Load ALL Portfolio Projects
  //
  // One background refresh. A shorter or incomplete response cannot
  // replace a longer or complete catalog already on screen.
  // ============================================

  useEffect(() => {
    let mounted = true;

    const loadAllPortfolio = async () => {
      try {
        const result = await fetchAllGalleries();

        if (!mounted) {
          return;
        }

        const formatted = formatGalleries(Array.isArray(result) ? result : []);

        setCatalog((current) =>
          adoptPortfolioCatalog(current, {
            items: formatted,
            complete: result?.complete === true,
          }),
        );
      } catch (error) {
        console.error("Error loading all portfolio projects:", error);
      } finally {
        if (mounted) {
          setCatalogLoading(false);
        }
      }
    };

    loadAllPortfolio();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================
  // Category Keyword Rules
  // ============================================

  const categoryKeywords = {
    "filter-app": [
      "mobile app",
      "mobile application",
      "android app",
      "android application",
      "ios app",
      "ios application",
      "iphone app",
      "ipad app",
      "app development",
      "mobile development",
      "mobile application development",
      "patient app",
      "doctor app",
      "doctors app",
      "patient & doctors app",
      "ecommerce app",
      "e-commerce app",
      "shopping app",
      "booking app",
    ],

    "filter-video": [
      "video",
      "videos",
      "video production",
      "video productions",
      "video production company",
      "corporate video",
      "corporate videos",
      "promotional video",
      "promotional videos",
      "promo video",
      "promo videos",
      "animation",
      "animated video",
      "animated videos",
      "motion graphics",
      "motion graphic",
      "film production",
      "film",
      "youtube",
      "youtu.be",
    ],

    "filter-figma": ["figma design"],
  };

  // ============================================
  // Industry Keyword Rules
  // ============================================

  const industryKeywords = {
    "real-estate": [
      "real estate",
      "real-estate",
      "property",
      "properties",
      "property developer",
      "real estate developer",
      "real estate developer website",
      "real estate portal",
      "real estate website",
      "realty",
      "real estate investments",
      "property management",
      "property portal",
      "offplan",
      "off-plan",
      "estate",
    ],

    ecommerce: [
      "ecommerce",
      "e-commerce",
      "online shopping",
      "online store",
      "online shop",
      "shopping website",
      "shopping cart",
      "woocommerce",
      "shopify",
      "online marketplace",
    ],

    corporate: [
      "corporate",
      "corporate website",
      "corporate group",
      "business website",
      "company website",
      "business",
    ],

    "daily-deals": [
      "daily deals",
      "daily deal",
      "deals website",
      "deal website",
      "discount website",
      "offers website",
      "offers",
    ],

    "web-portal": [
      "web portal",
      "website portal",
      "online portal",
      "portal website",
      "portal",
    ],

    engineering: [
      "engineering",
      "construction",
      "engineering & construction",
      "engineering and construction",
      "contracting",
      "contractor",
      "infrastructure",
      "building construction",
    ],

    travel: [
      "travel",
      "tourism",
      "travel & tourism",
      "travel and tourism",
      "tour operator",
      "travel agency",
      "tourism company",
      "holiday",
      "holidays",
      "safari",
      "aviation",
    ],

    somalian: ["somalia", "somalian", "somaliland", "mogadishu"],

    international: [
      "international",
      "international project",
      "international projects",
      "global",
      "overseas",
    ],

    luxury: ["luxury", "luxurious", "stunning", "luxury website", "premium"],

    landing: [
      "landing page",
      "landing pages",
      "ad landing",
      "advertising landing",
      "campaign landing",
    ],

    logistics: [
      "logistics",
      "shipping",
      "cargo",
      "freight",
      "courier",
      "delivery",
      "transportation",
      "supply chain",
    ],

    bank: ["bank", "banking", "financial institution", "finance", "fintech"],
  };

  // ============================================
  // Keyword Match
  // ============================================

  const containsKeyword = (text, keywords = []) => {
    const normalizedText = String(text || "").toLowerCase();

    return keywords.some((keyword) =>
      normalizedText.includes(keyword.toLowerCase()),
    );
  };

  // ============================================
  // Category Match
  // ============================================

  const matchesCategory = (project, selectedFilter) => {
    if (selectedFilter === "*") {
      return true;
    }

    const text = project.searchText || "";

    // ------------------------------------------
    // Mobile App
    // ------------------------------------------

    if (selectedFilter === "filter-app") {
      return containsKeyword(text, categoryKeywords["filter-app"]);
    }

    // ------------------------------------------
    // Video Production
    // ------------------------------------------

    if (selectedFilter === "filter-video") {
      if (project.isYoutube) {
        return true;
      }

      return containsKeyword(text, categoryKeywords["filter-video"]);
    }

    // ------------------------------------------
    // Figma Design
    // ------------------------------------------

    if (selectedFilter === "filter-figma") {
      return containsKeyword(text, categoryKeywords["filter-figma"]);
    }

    // ------------------------------------------
    // Websites
    // ------------------------------------------

    if (selectedFilter === "filter-websites") {
      const isApp = containsKeyword(text, categoryKeywords["filter-app"]);

      const isVideo =
        project.isYoutube ||
        containsKeyword(text, categoryKeywords["filter-video"]);

      const isFigma = containsKeyword(text, categoryKeywords["filter-figma"]);

      return !isApp && !isVideo && !isFigma;
    }

    return true;
  };

  // ============================================
  // Filter Projects
  // ============================================

  const filteredProjectsBeforePagination = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchedProjects = allGalleries.filter((project) => {
      // Card-level hiding (before category, industry, search and pagination)
      if (
        HIDE_UNAVAILABLE_PORTFOLIO_PROJECTS &&
        isUnavailablePortfolioProject(project)
      ) {
        return false;
      }

      // Category
      const categoryMatch = matchesCategory(project, filter);

      if (!categoryMatch) {
        return false;
      }

      // Industry
      if (industryFilter) {
        const keywords = industryKeywords[industryFilter] || [];

        const industryMatch = containsKeyword(project.searchText, keywords);

        if (!industryMatch) {
          return false;
        }
      }

      // Search
      if (normalizedSearch) {
        const searchMatch = project.searchText.includes(normalizedSearch);

        if (!searchMatch) {
          return false;
        }
      }

      return true;
    });

    // Websites view only (no industry filter): pinned projects first
    if (filter === "filter-websites" && !industryFilter) {
      const pinnedOrder = applyPinnedOrder(matchedProjects);

      // Default view only (no search): CMS 235 at Page 2, position 1 (index 24)
      return normalizedSearch
        ? pinnedOrder
        : placeProjectAtIndex(pinnedOrder, 235, 24);
    }

    return matchedProjects;
  }, [allGalleries, filter, industryFilter, searchTerm]);

  // ============================================
  // Pagination
  // ============================================

  const totalFilteredProjects = filteredProjectsBeforePagination.length;

  const totalPages = Math.max(1, Math.ceil(totalFilteredProjects / PER_PAGE));

  const filteredProjects = useMemo(() => {
    const startIndex = (activePage - 1) * PER_PAGE;

    const endIndex = startIndex + PER_PAGE;

    return filteredProjectsBeforePagination.slice(startIndex, endIndex);
  }, [filteredProjectsBeforePagination, activePage]);

  // Current page only, in the order already on screen. YouTube cards stay embeds.
  const popupProjects = filteredProjects
    .filter((project) => !project.isYoutube && project.image)
    .map((project) => ({
      id: project.id,
      title: project.title,
      image: project.image,
      fullImage: project.image,
      imageAlt: `${project.title} preview`,
      openLabel: "Open image",
      openAria: `Open ${project.title} image in a new tab`,
    }));

  const popupUrls = popupProjects.map((project) => project.fullImage);
  const popupUrlKey = popupUrls.join("\0");
  const preloadStateRef = useRef(null);
  const [retainedUrls, setRetainedUrls] = useState([]);

  const popupScope = `${filterKey}\0${searchTerm}\0${activePage}`;

  const [popupScopeSeen, setPopupScopeSeen] = useState(popupScope);

  const [popupIndex, setPopupIndex] = useState(-1);

  const prioritizeImage = (url) => {
    if (preloadStateRef.current == null) {
      return;
    }

    prioritizePreload(preloadStateRef.current, url);
  };

  useEffect(() => {
    if (preloadStateRef.current == null) {
      preloadStateRef.current = createPreloadState();
    }

    const state = preloadStateRef.current;

    state.onRetained = (urls) => {
      setRetainedUrls((current) => {
        if (current.length === urls.length && current.every((url, index) => url === urls[index])) {
          return current;
        }

        return urls;
      });
    };
    const urls = popupUrlKey ? popupUrlKey.split("\0") : [];
    const pageChanged = state.urlKey !== popupUrlKey;

    state.urlKey = popupUrlKey;
    state.urls = urls;
    state.popupIndex = popupIndex;
    rebuildPreloadQueue(state, pageChanged);
    schedulePreload(state);

    const onVisible = () => {
      if (!document.hidden) {
        schedulePreload(state);
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const onConnection = () => {
      rebuildPreloadQueue(state, false);
      schedulePreload(state);
    };

    connection?.addEventListener?.("change", onConnection);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      connection?.removeEventListener?.("change", onConnection);
      cancelScheduledPreload(state);
    };
  }, [popupUrlKey, popupIndex]);

  if (popupScopeSeen !== popupScope) {
    setPopupScopeSeen(popupScope);

    if (popupIndex !== -1) {
      setPopupIndex(-1);
    }
  }

  const pendingFocusId = useRef("");

  const closePopup = () => {
    pendingFocusId.current = popupTriggerRef.current?.getAttribute("data-popup-id") || "";
    setPopupIndex(-1);
  };

  useEffect(() => {
    if (popupIndex !== -1 || !pendingFocusId.current) {
      return;
    }

    const triggerId = pendingFocusId.current;
    pendingFocusId.current = "";

    const trigger = document.querySelector(
      `#portfolio button.preview-link[data-popup-id="${CSS.escape(triggerId)}"]`,
    );

    if (!trigger) {
      return;
    }

    // Hidden zoom controls use visibility:hidden !important until hover.
    trigger.classList.add("is-returning-focus");
    void trigger.offsetWidth;
    trigger.focus({ preventScroll: true });

    const clear = () => {
      trigger.classList.remove("is-returning-focus");
      trigger.removeEventListener("blur", clear);
    };

    trigger.addEventListener("blur", clear);
  }, [popupIndex]);

  const openPopup = (event, projectId) => {
    const index = popupProjects.findIndex((item) => item.id === projectId);

    if (index < 0) {
      return;
    }

    popupTriggerRef.current = event.currentTarget;
    setPopupIndex(index);
  };

  if (!pageChanged && currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  // ============================================
  // Sync Visible Galleries
  // ============================================

  useEffect(() => {
    setGalleries(filteredProjects);
  }, [filteredProjects]);

  // ============================================
  // Industry Change → dedicated URL
  // ============================================

  const handleIndustryChange = (event) => {
    const nextIndustry = event.target.value;

    if (!nextIndustry) {
      router.push(buildPortfolioPath(filter));
      return;
    }

    router.push(buildPortfolioPath(DEFAULT_CATEGORY, nextIndustry));
  };

  // ============================================
  // Search Input
  // ============================================

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  // ============================================
  // Search
  // ============================================

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());

    setCurrentPage(1);
  };

  // ============================================
  // Enter Search
  // ============================================

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // ============================================
  // Clear Search
  // ============================================

  const handleClearSearch = () => {
    setSearchInput("");

    setSearchTerm("");

    setCurrentPage(1);
  };

  // ============================================
  // Pagination Change
  // ============================================

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === activePage || loading) {
      return;
    }

    setCurrentPage(page);

    setTimeout(() => {
      const portfolio = document.getElementById("portfolio");

      if (portfolio) {
        portfolio.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // ============================================
  // Pagination Numbers
  // ============================================

  // Pages are shown in fixed groups of PAGES_PER_GROUP (1–6, 7–12, 13–16, ...).
  // The current group determines the numbers and the previous/next arrows.
  const pageGroupStart =
    Math.floor((activePage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const pageGroupEnd = Math.min(
    pageGroupStart + PAGES_PER_GROUP - 1,
    totalPages,
  );
  const hasPrevPageGroup = pageGroupStart > 1;
  const hasNextPageGroup = pageGroupStart + PAGES_PER_GROUP <= totalPages;

  const getPageNumbers = () => {
    const pages = [];

    for (let i = pageGroupStart; i <= pageGroupEnd; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // ============================================
  // Display Count
  // ============================================

  const displayFrom =
    totalFilteredProjects === 0 ? 0 : (activePage - 1) * PER_PAGE + 1;

  const displayTo = Math.min(activePage * PER_PAGE, totalFilteredProjects);

  // ============================================
  // Render
  // ============================================

  return (
    <section id="portfolio" className="portfolio section pt-5">
      <div className="container">
        {/* ======================================
            FILTER / SEARCH
        ====================================== */}

        <div className="portfolio-top-filter">
          {/* Category Tabs */}

          <div className="portfolio-category-tabs">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <Link
                key={category.filter}
                href={buildPortfolioPath(category.filter)}
                className={`portfolio-category-tab ${
                  filter === category.filter ? "active" : ""
                }`}
                aria-current={filter === category.filter ? "page" : undefined}
              >
                {category.label}
              </Link>
            ))}

            {/* YouTube Channel */}

            <a
              href="https://www.youtube.com/channel/UC_aZoH8d6c7fv6TdV49N59Q"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-youtube-btn"
            >
              <i className="bi bi-youtube" aria-hidden="true"></i>

              <span>YouTube</span>
            </a>
          </div>

          {/* Search Row */}

          <div className="portfolio-search-row">
            {/* Industry */}

            <ThemedSelect
              className="portfolio-industry-select"
              variant="dark"
              value={industryFilter}
              onChange={handleIndustryChange}
              aria-label="Industry Type"
              options={[
                { value: "", label: "Industry Type" },
                ...PORTFOLIO_INDUSTRIES.filter((industry) => industry.value !== "daily-deals").map(
                  (industry) => ({
                    value: industry.value,
                    label: industry.label,
                  }),
                ),
              ]}
            />

            {/* Search */}

            <input
              type="text"
              className="portfolio-search-input"
              placeholder="Search Portfolio..."
              aria-label="Search Portfolio"
              value={searchInput}
              onChange={handleSearchInput}
              onKeyDown={handleSearchKeyDown}
            />

            <button
              type="button"
              className="portfolio-search-btn"
              onClick={handleSearch}
            >
              Search
            </button>

            {(searchInput || searchTerm) && (
              <button
                type="button"
                className="portfolio-search-clear"
                onClick={handleClearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* ======================================
            LOADING
        ====================================== */}

        {loading && (
          <div className="portfolio-loading">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <span>Loading portfolio...</span>
          </div>
        )}

        {/* ======================================
            PORTFOLIO GRID
        ====================================== */}

        <div className="row gy-4 isotope-container">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const hasProjectLink =
                !HIDDEN_PROJECT_URL_IDS.has(Number(project.id)) &&
                String(project.project_url || "").trim() !== "" &&
                String(project.project_url).trim() !== "#";

              return (
              <div
                key={project.id}
                className="col-lg-6 col-md-6 portfolio-item isotope-item"
              >
                <div className="portfolio-card-heading">
                  <p className="portfolio-card-title">{project.title}</p>
                  {hasProjectLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-card-title-link"
                      onClick={(event) => event.stopPropagation()}
                      title={
                        project.isYoutube
                          ? `Open ${project.title} on YouTube`
                          : `Visit ${project.title} website`
                      }
                      aria-label={
                        project.isYoutube
                          ? `Open ${project.title} on YouTube`
                          : `Visit ${project.title} website`
                      }
                    >
                      <svg
                        className="portfolio-card-title-link-icon"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fill="currentColor"
                          d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
                        />
                      </svg>
                    </a>
                  )}
                </div>

                <div
                  className="portfolio-content"
                  onMouseEnter={() => {
                    if (!project.isYoutube && project.image) {
                      prioritizeImage(project.image);
                    }
                  }}
                  style={
                    project.isYoutube
                      ? {
                          overflow: "hidden",
                          background: "#000",
                        }
                      : undefined
                  }
                >
                  {project.isYoutube ? (
                    <PortfolioYoutubeItem
                      title={project.title}
                      videoId={project.youtubeId}
                    />
                  ) : (
                    <>
                      <PortfolioProjectImage
                        src={project.image}
                        alt={`${project.title} web design project by RedSpider Dubai`}
                        priority={activePage === 1 && index < 2}
                      />
                      {hasProjectLink && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-project-link"
                          title={`Visit ${project.title} website`}
                          aria-label={`Visit ${project.title} website`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <img
                            src="/assets/img/project-link.svg"
                            alt=""
                            aria-hidden="true"
                          />
                        </a>
                      )}

                      <div className="portfolio-info">
                        <h4>{project.title}</h4>

                        <p>{project.category}</p>

                        {project.image && (
                          <button
                            type="button"
                            title={project.title}
                            className="preview-link"
                            data-popup-id={project.id}
                            aria-label={`Open ${project.title} preview`}
                            onMouseEnter={() => prioritizeImage(project.image)}
                            onFocus={() => prioritizeImage(project.image)}
                            onClick={(event) => openPopup(event, project.id)}
                          >
                            <i className="bi bi-zoom-in" aria-hidden="true"></i>
                          </button>
                        )}

                        {hasProjectLink && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="More Details"
                              className="details-link"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <i
                                className="bi bi-link-45deg"
                                aria-hidden="true"
                              ></i>
                            </a>
                          )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              );
            })
          ) : catalogLoading ? (
            <div className="col-12">
              <div className="portfolio-loading">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>

                <span>Loading portfolio...</span>
              </div>
            </div>
          ) : (
            <div className="col-12 text-center py-5">
              <p>No portfolio items found.</p>
            </div>
          )}
        </div>

        {/* ======================================
            PAGINATION
        ====================================== */}

        {totalPages > 1 && (
          <div className="portfolio-pagination">
            {/* Previous */}

            <button
              type="button"
              className="portfolio-page-arrow"
              disabled={!hasPrevPageGroup || loading}
              onClick={() => handlePageChange(pageGroupStart - 1)}
              aria-label="Previous page"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Page Numbers */}

            <div className="portfolio-page-numbers">
              {pageNumbers.map((page, index) => {
                if (typeof page !== "number") {
                  return (
                    <span
                      key={`${page}-${index}`}
                      className="portfolio-page-ellipsis"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    type="button"
                    disabled={loading}
                    className={`portfolio-page-number ${
                      activePage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next */}

            <button
              type="button"
              className="portfolio-page-arrow"
              disabled={!hasNextPageGroup || loading}
              onClick={() => handlePageChange(pageGroupStart + PAGES_PER_GROUP)}
              aria-label="Next page"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}

        {/* ======================================
            RESULT COUNT
        ====================================== */}

        {totalFilteredProjects > 0 && (
          <div className="portfolio-count text-center">
            Showing {displayFrom}
            {"–"}
            {displayTo}
            {" of "}
            {totalFilteredProjects} projects
          </div>
        )}
      </div>

      {popupIndex >= 0 && popupProjects[popupIndex] ? (
        <PortfolioPagePopup
          key={popupProjects[popupIndex].id}
          projects={popupProjects}
          index={popupIndex}
          imageDecoded={retainedUrls.includes(popupProjects[popupIndex].fullImage)}
          onClose={closePopup}
          onNavigate={setPopupIndex}
        />
      ) : null}
    </section>
  );
}
