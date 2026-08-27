import "glightbox/dist/css/glightbox.min.css";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { fetchAllGalleries } from "../../lib/api";
import ThemedSelect from "../ui/ThemedSelect";

const FALLBACK_IMAGE = "/assets/img/portfolio/portfolio-1.webp";

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
      title: gallery.name || "Untitled Project",
      category: cleanDescription || "Portfolio",
      image: resolveGalleryImage(gallery.image),
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
}) {
  const lightboxInstance = useRef(null);

  const PER_PAGE = 12;

  const initialFormattedGalleries = useMemo(
    () => formatGalleries(initialGalleries || []),
    [initialGalleries],
  );

  const [galleries, setGalleries] = useState(initialFormattedGalleries);

  const [allGalleries, setAllGalleries] = useState(initialFormattedGalleries);

  /*
   * IMPORTANT:
   *
   * This loading state is ONLY for actual
   * pagination/manual loading.
   *
   * Background portfolio loading does NOT
   * set this to true.
   */
  const [loading, setLoading] = useState(false);

  // ============================================
  // Filter State
  // ============================================

  const [filter, setFilter] = useState("filter-websites");

  const [industryFilter, setIndustryFilter] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // ============================================
  // Load ALL Portfolio Projects
  //
  // IMPORTANT:
  // This runs in the background.
  //
  // It does NOT:
  // - set loading true
  // - block initial 12 projects
  // - block pagination UI
  //
  // Initial 12 projects are already supplied
  // through getStaticProps().
  // ============================================

  useEffect(() => {
    let mounted = true;

    const loadAllPortfolio = async () => {
      try {
        const result = await fetchAllGalleries();

        if (!mounted) {
          return;
        }

        const formatted = formatGalleries(result || []);

        if (formatted.length > 0) {
          setAllGalleries(formatted);
        }
      } catch (error) {
        console.error("Error loading all portfolio projects:", error);
      }
    };

    /*
     * Background loading.
     *
     * IMPORTANT:
     * No setLoading(true) here.
     */
    loadAllPortfolio();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================
  // GLightbox
  // ============================================

  useEffect(() => {
    let mounted = true;

    if (lightboxInstance.current) {
      lightboxInstance.current.destroy();

      lightboxInstance.current = null;
    }

    import("glightbox").then((module) => {
      if (!mounted) {
        return;
      }

      const GLightbox = module.default;

      if (!GLightbox) {
        return;
      }

      lightboxInstance.current = GLightbox({
        selector: ".glightbox",

        touchNavigation: true,

        loop: true,

        autoplayVideos: true,
      });
    });

    return () => {
      mounted = false;

      if (lightboxInstance.current) {
        lightboxInstance.current.destroy();

        lightboxInstance.current = null;
      }
    };
  }, [galleries]);

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

    "filter-nl": [
      "newsletter",
      "newsletter designing",
      "email newsletter",
      "email design",
      "email campaign",
      "mailchimp",
    ],

    "filter-cwp": [
      "customized web application",
      "customized web app",
      "custom web application",
      "custom web app",
      "web application",
      "web app",
      "business application",
      "online application",
      "management system",
      "crm",
      "erp",
      "portal application",
    ],
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
    // Newsletter
    // ------------------------------------------

    if (selectedFilter === "filter-nl") {
      return containsKeyword(text, categoryKeywords["filter-nl"]);
    }

    // ------------------------------------------
    // Customized Web Application
    // ------------------------------------------

    if (selectedFilter === "filter-cwp") {
      return containsKeyword(text, categoryKeywords["filter-cwp"]);
    }

    // ------------------------------------------
    // Websites
    // ------------------------------------------

    if (selectedFilter === "filter-websites") {
      const isApp = containsKeyword(text, categoryKeywords["filter-app"]);

      const isVideo =
        project.isYoutube ||
        containsKeyword(text, categoryKeywords["filter-video"]);

      const isNewsletter = containsKeyword(text, categoryKeywords["filter-nl"]);

      const isCustomWebApp = containsKeyword(
        text,
        categoryKeywords["filter-cwp"],
      );

      return !isApp && !isVideo && !isNewsletter && !isCustomWebApp;
    }

    return true;
  };

  // ============================================
  // Filter Projects
  // ============================================

  const filteredProjectsBeforePagination = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allGalleries.filter((project) => {
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
  }, [allGalleries, filter, industryFilter, searchTerm]);

  // ============================================
  // Pagination
  // ============================================

  const totalFilteredProjects = filteredProjectsBeforePagination.length;

  const totalPages = Math.max(1, Math.ceil(totalFilteredProjects / PER_PAGE));

  const filteredProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE;

    const endIndex = startIndex + PER_PAGE;

    return filteredProjectsBeforePagination.slice(startIndex, endIndex);
  }, [filteredProjectsBeforePagination, currentPage]);

  // ============================================
  // Keep Page Valid
  // ============================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // ============================================
  // Sync Visible Galleries
  // ============================================

  useEffect(() => {
    setGalleries(filteredProjects);
  }, [filteredProjects]);

  // ============================================
  // Category Click
  // ============================================

  const handleFilterClick = (value) => {
    setFilter(value);

    setCurrentPage(1);

    setIsMenuOpen(false);
  };

  // ============================================
  // Industry Change
  // ============================================

  const handleIndustryChange = (event) => {
    setIndustryFilter(event.target.value);

    setCurrentPage(1);
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
    if (page < 1 || page > totalPages || page === currentPage || loading) {
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

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);
    pages.push(2);
    pages.push(3);

    if (currentPage > 4 && currentPage < totalPages - 3) {
      pages.push("ellipsis-start");

      pages.push(currentPage);

      pages.push("ellipsis-end");
    } else if (currentPage >= totalPages - 3) {
      pages.push("ellipsis-start");
    } else {
      pages.push("ellipsis-middle");
    }

    pages.push(totalPages - 2);

    pages.push(totalPages - 1);

    pages.push(totalPages);

    return pages.filter((item, index, array) => array.indexOf(item) === index);
  };

  const pageNumbers = getPageNumbers();

  // ============================================
  // Display Count
  // ============================================

  const displayFrom =
    totalFilteredProjects === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;

  const displayTo = Math.min(currentPage * PER_PAGE, totalFilteredProjects);

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
            <button
              type="button"
              className={`portfolio-category-tab ${
                filter === "filter-websites" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("filter-websites")}
            >
              Websites
            </button>

            <button
              type="button"
              className={`portfolio-category-tab ${
                filter === "filter-app" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("filter-app")}
            >
              Mobile App
            </button>

            <button
              type="button"
              className={`portfolio-category-tab ${
                filter === "filter-video" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("filter-video")}
            >
              Videos Production
            </button>

            <button
              type="button"
              className={`portfolio-category-tab ${
                filter === "filter-nl" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("filter-nl")}
            >
              Newsletter Designing
            </button>

            <button
              type="button"
              className={`portfolio-category-tab ${
                filter === "filter-cwp" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("filter-cwp")}
            >
              Customized Web Application
            </button>

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
                { value: "real-estate", label: "Real Estate Websites" },
                { value: "ecommerce", label: "E-Commerce Websites" },
                { value: "corporate", label: "Corporate Websites" },
                { value: "daily-deals", label: "Daily Deals Websites" },
                { value: "web-portal", label: "Web Portal" },
                {
                  value: "engineering",
                  label: "Engineering & Construction",
                },
                { value: "travel", label: "Travel & Tourism" },
                { value: "somalian", label: "Somalian Clients" },
                {
                  value: "international",
                  label: "International Projects",
                },
                { value: "luxury", label: "Luxury & Stunning" },
                { value: "landing", label: "Ad Landing Pages" },
                { value: "logistics", label: "Logistics & Shipping" },
                { value: "bank", label: "Bank" },
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
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="col-lg-4 col-md-6 portfolio-item isotope-item"
              >
                <div
                  className="portfolio-content"
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
                        priority={currentPage === 1 && index < 2}
                      />

                      <div className="portfolio-info">
                        <h4>{project.title}</h4>

                        <p>{project.category}</p>

                        {project.image && (
                          <a
                            href={project.image}
                            title={project.title}
                            data-gallery="portfolio-gallery"
                            className="glightbox preview-link"
                          >
                            <i className="bi bi-zoom-in" aria-hidden="true"></i>
                          </a>
                        )}

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="More Details"
                          className="details-link"
                        >
                          <i
                            className="bi bi-link-45deg"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
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
              disabled={currentPage <= 1 || loading}
              onClick={() => handlePageChange(currentPage - 1)}
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
                      currentPage === page ? "active" : ""
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
              disabled={currentPage >= totalPages || loading}
              onClick={() => handlePageChange(currentPage + 1)}
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
    </section>
  );
}
