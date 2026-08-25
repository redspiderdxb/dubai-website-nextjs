import "glightbox/dist/css/glightbox.min.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { fetchGalleries, fetchAllGalleries } from "../../lib/api";

export default function PortfolioGrid({
  initialGalleries = [],
  initialPagination = {},
}) {
  const lightboxInstance = useRef(null);

  const PER_PAGE = 12;

  // ============================================
  // Format Gallery Data
  // ============================================

  const formatGalleries = (data = []) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const ASSET_URL = API_URL
      ? API_URL.replace("/api/v1", "").replace(/\/$/, "")
      : "";

    return data.map((gallery) => {
      const cleanDescription = gallery.description
        ? String(gallery.description)
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
        : "Portfolio";

      // Existing Project URL from backend
      const projectUrl =
        gallery.project_url || `/galleries/${gallery.slug || gallery.id}`;

      // ==========================================
      // Search Text
      // ==========================================

      const searchText = `
        ${gallery.name || ""}
        ${cleanDescription || ""}
        ${projectUrl || ""}
      `
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

      // ==========================================
      // Detect YouTube URL
      // ==========================================

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

        image: gallery.image
          ? `${ASSET_URL}/storage/${gallery.image}`
          : "/assets/img/portfolio/portfolio-1.webp",

        link: projectUrl,

        searchText,

        isYoutube,

        filter: "filter-websites",
      };
    });
  };

  // ============================================
  // Initial Data
  // ============================================

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
  // Existing Gallery Loader
  // ============================================

  const loadGalleries = async (page) => {
    try {
      setLoading(true);

      const result = await fetchGalleries(page, PER_PAGE);

      const formatted = formatGalleries(result.galleries || []);

      setGalleries(formatted);

      return formatted;
    } catch (error) {
      console.error("Error loading portfolio:", error);

      return [];
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // YouTube URL → Embed URL
  // ============================================

  const getYoutubeEmbedUrl = (url) => {
    if (!url) {
      return "";
    }

    try {
      const value = String(url).trim();

      // youtube.com/watch?v=VIDEO_ID
      if (value.includes("youtube.com/watch")) {
        const parsedUrl = new URL(value);

        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // youtu.be/VIDEO_ID
      if (value.includes("youtu.be/")) {
        const parsedUrl = new URL(value);

        const videoId = parsedUrl.pathname.replace("/", "").split("?")[0];

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // youtube.com/embed/VIDEO_ID
      if (value.includes("youtube.com/embed/")) {
        return value;
      }

      // youtube.com/shorts/VIDEO_ID
      if (value.includes("youtube.com/shorts/")) {
        const parsedUrl = new URL(value);

        const parts = parsedUrl.pathname.split("/");

        const shortsIndex = parts.indexOf("shorts");

        if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
          return `https://www.youtube.com/embed/${parts[shortsIndex + 1]}`;
        }
      }

      // youtube.com/live/VIDEO_ID
      if (value.includes("youtube.com/live/")) {
        const parsedUrl = new URL(value);

        const parts = parsedUrl.pathname.split("/");

        const liveIndex = parts.indexOf("live");

        if (liveIndex !== -1 && parts[liveIndex + 1]) {
          return `https://www.youtube.com/embed/${parts[liveIndex + 1]}`;
        }
      }

      return "";
    } catch (error) {
      console.error("Invalid YouTube URL:", url, error);

      return "";
    }
  };

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

            <select
              className="portfolio-industry-select"
              value={industryFilter}
              onChange={handleIndustryChange}
              aria-label="Industry Type"
            >
              <option value="">Industry Type</option>

              <option value="real-estate">Real Estate Websites</option>

              <option value="ecommerce">E-Commerce Websites</option>

              <option value="corporate">Corporate Websites</option>

              <option value="daily-deals">Daily Deals Websites</option>

              <option value="web-portal">Web Portal</option>

              <option value="engineering">
                Engineering &amp; Construction
              </option>

              <option value="travel">Travel &amp; Tourism</option>

              <option value="somalian">Somalian Clients</option>

              <option value="international">International Projects</option>

              <option value="luxury">Luxury &amp; Stunning</option>

              <option value="landing">Ad Landing Pages</option>

              <option value="logistics">Logistics &amp; Shipping</option>

              <option value="bank">Bank</option>
            </select>

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

        <div
          className="row gy-4 isotope-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
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
                  {/* ==================================
                        YOUTUBE VIDEO
                    ================================== */}

                  {project.isYoutube ? (
                    <div
                      className="portfolio-video-wrapper"
                      style={{
                        position: "relative",

                        width: "100%",

                        height: "100%",

                        overflow: "hidden",

                        background: "#000",

                        margin: "0",

                        padding: "0",
                      }}
                    >
                      <iframe
                        src={`${getYoutubeEmbedUrl(
                          project.link,
                        )}?rel=0&modestbranding=1`}
                        title={project.title}
                        style={{
                          position: "absolute",

                          top: 0,

                          left: 0,

                          width: "100%",

                          height: "100%",

                          border: "0",

                          display: "block",

                          margin: "0",

                          padding: "0",
                        }}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <>
                      {/* ==================================
                            NORMAL IMAGE PROJECT
                        ================================== */}

                      <img
                        src={project.image}
                        className="img-fluid"
                        alt={project.title}
                        loading="lazy"
                        style={{
                          width: "100%",

                          height: "100%",

                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          console.error(
                            "IMAGE LOAD FAILED:",
                            e.currentTarget.src,
                          );

                          e.currentTarget.onerror = null;

                          e.currentTarget.src =
                            "/assets/img/portfolio/portfolio-1.webp";
                        }}
                      />

                      {/* ==================================
                            NORMAL PROJECT INFO
                        ================================== */}

                      <div className="portfolio-info">
                        <h4>{project.title}</h4>

                        <p>{project.category}</p>

                        {/* Image Preview */}

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

                        {/* Project URL */}

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
