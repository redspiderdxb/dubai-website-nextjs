import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Button from "../ui/Button";

/* =========================================================
   FALLBACK PROJECTS

   IMPORTANT:
   These are ONLY used if server-side API data is unavailable.
   They will NOT flash first and then change because projects
   are now provided through initialGalleries.
   ========================================================= */

const fallbackProjects = [
  {
    id: "fallback-1",
    title: "Abu Alnaga Development V2",
    name: "Abu Alnaga Development V2",
    category: "Real Estate Developer",
    description: "",
    image: "/assets/img/portfolio/app-1.webp",
    link: "https://aa.rsworkspace.com/",
  },
  {
    id: "fallback-2",
    title: "Kasco Developments",
    name: "Kasco Developments",
    category: "Real Estate Developer Website",
    description: "",
    image: "/assets/img/portfolio/app-2.webp",
    link: "https://www.kascodevelopments.com/",
  },
  {
    id: "fallback-3",
    title: "Mansion Edition Real Estate",
    name: "Mansion Edition Real Estate",
    category: "Luxury Real Estate - Offplan Projects",
    description: "",
    image: "/assets/img/portfolio/app-3.webp",
    link: "https://www.mansionedition.ae/",
  },
  {
    id: "fallback-4",
    title: "SPACE & PLACE REAL ESTATE LLC",
    name: "SPACE & PLACE REAL ESTATE LLC",
    category: "Real Estate Broker Website",
    description: "",
    image: "/assets/img/portfolio/books-1.webp",
    link: "https://www.spaceandplace.ae/",
  },
  {
    id: "fallback-5",
    title: "DSQ Real Estate – V2",
    name: "DSQ Real Estate – V2",
    category: "Real Estate Broker Website",
    description: "",
    image: "/assets/img/portfolio/books-2.webp",
    link: "https://www.dsqrealestate.ae/",
  },
  {
    id: "fallback-6",
    title: "Sankari Properties",
    name: "Sankari Properties",
    category: "Real Estate Developer Website",
    description: "",
    image: "/assets/img/portfolio/books-3.webp",
    link: "https://www.sankariproperties.com/",
  },
];

/* =========================================================
   BACKEND BASE URL

   Same backend structure as main PortfolioGrid.js
   ========================================================= */

const getBackendBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  return apiUrl.replace("/api/v1", "").replace(/\/$/, "");
};

/* =========================================================
   IMAGE URL HELPER

   Handles:

   filename.webp
   /storage/filename.webp
   storage/filename.webp
   /public/storage/filename.webp
   public/storage/filename.webp
   localhost backend URLs
   full external URLs
   local assets
   ========================================================= */

const getImageSrc = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") {
    return null;
  }

  const cleanImagePath = imagePath.trim();

  if (!cleanImagePath) {
    return null;
  }

  const backendBase = getBackendBaseUrl();

  /* -----------------------------------------
     FULL URL
     ----------------------------------------- */

  if (
    cleanImagePath.startsWith("http://") ||
    cleanImagePath.startsWith("https://")
  ) {
    // Old localhost URL
    if (/^https?:\/\/localhost\/redspider\/public/i.test(cleanImagePath)) {
      return cleanImagePath.replace(
        /^https?:\/\/localhost\/redspider\/public/i,
        backendBase,
      );
    }

    // Old localhost URL with RedSpider capitalisation
    if (/^https?:\/\/localhost\/RedSpider\/public/i.test(cleanImagePath)) {
      return cleanImagePath.replace(
        /^https?:\/\/localhost\/RedSpider\/public/i,
        backendBase,
      );
    }

    // Any other full URL
    return cleanImagePath;
  }

  /* -----------------------------------------
     /storage/filename
     ----------------------------------------- */

  if (cleanImagePath.startsWith("/storage/")) {
    return `${backendBase}${cleanImagePath}`;
  }

  /* -----------------------------------------
     storage/filename
     ----------------------------------------- */

  if (cleanImagePath.startsWith("storage/")) {
    return `${backendBase}/${cleanImagePath}`;
  }

  /* -----------------------------------------
     /public/storage/filename
     ----------------------------------------- */

  if (cleanImagePath.startsWith("/public/storage/")) {
    return `${backendBase}${cleanImagePath.replace("/public", "")}`;
  }

  /* -----------------------------------------
     public/storage/filename
     ----------------------------------------- */

  if (cleanImagePath.startsWith("public/storage/")) {
    return `${backendBase}/${cleanImagePath.replace("public/", "")}`;
  }

  /* -----------------------------------------
     Local frontend image
     ----------------------------------------- */

  if (cleanImagePath.startsWith("assets/")) {
    return `/${cleanImagePath}`;
  }

  /* -----------------------------------------
     /assets/ local frontend image
     ----------------------------------------- */

  if (cleanImagePath.startsWith("/assets/")) {
    return cleanImagePath;
  }

  /* -----------------------------------------
     API gives ONLY filename
     ----------------------------------------- */

  if (!cleanImagePath.startsWith("/") && !cleanImagePath.includes("/")) {
    return `${backendBase}/storage/${cleanImagePath}`;
  }

  return cleanImagePath;
};

/* =========================================================
   TEXT NORMALIZER
   ========================================================= */

const normalizeText = (value) => {
  if (!value) {
    return "";
  }

  return String(value)
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/[^a-z0-9\s&/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/* =========================================================
   SELECT HOMEPAGE PROJECTS

   TARGET:

   2 Real Estate
   1 Corporate
   1 Ecommerce
   1 Healthcare / Hospitality
   1 Technology / Industrial

   If a category does not exist in API data,
   remaining slots are filled automatically.
   ========================================================= */

const selectHomepageProjects = (projects) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return [];
  }

  const usedIds = new Set();

  const getSearchText = (project) =>
    normalizeText(
      [project.title, project.name, project.category, project.description]
        .filter(Boolean)
        .join(" "),
    );

  const findProject = (keywords) => {
    let bestProject = null;
    let bestScore = 0;

    projects.forEach((project) => {
      if (!project || usedIds.has(project.id)) {
        return;
      }

      const text = getSearchText(project);

      let score = 0;

      keywords.forEach((keyword) => {
        const normalizedKeyword = normalizeText(keyword);

        if (normalizedKeyword && text.includes(normalizedKeyword)) {
          score += normalizedKeyword.length > 5 ? 3 : 2;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestProject = project;
      }
    });

    return bestProject;
  };

  const selected = [];

  /* =========================================
     REAL ESTATE - 2
     ========================================= */

  const realEstate = [
    "real estate",
    "real-estate",
    "real estate developer",
    "property",
    "properties",
    "property developer",
    "developer",
    "development",
    "broker",
    "realty",
    "offplan",
    "off plan",
  ];

  for (let i = 0; i < 2; i++) {
    const project = findProject(realEstate);

    if (project) {
      selected.push(project);
      usedIds.add(project.id);
    }
  }

  /* =========================================
     CORPORATE - 1
     ========================================= */

  const corporate = findProject([
    "corporate",
    "corporate website",
    "business",
    "company",
    "enterprise",
    "professional services",
    "consulting",
    "finance",
    "financial",
    "legal",
  ]);

  if (corporate) {
    selected.push(corporate);
    usedIds.add(corporate.id);
  }

  /* =========================================
     ECOMMERCE - 1
     ========================================= */

  const ecommerce = findProject([
    "ecommerce",
    "e-commerce",
    "online store",
    "online shop",
    "shopping",
    "retail",
    "woocommerce",
    "shopify",
    "marketplace",
  ]);

  if (ecommerce) {
    selected.push(ecommerce);
    usedIds.add(ecommerce.id);
  }

  /* =========================================
     HEALTHCARE / HOSPITALITY - 1
     ========================================= */

  const healthcareHospitality = findProject([
    "healthcare",
    "health care",
    "hospital",
    "clinic",
    "medical",
    "doctor",
    "dental",
    "hospitality",
    "hotel",
    "resort",
    "restaurant",
    "travel",
    "tourism",
  ]);

  if (healthcareHospitality) {
    selected.push(healthcareHospitality);
    usedIds.add(healthcareHospitality.id);
  }

  /* =========================================
     TECHNOLOGY / INDUSTRIAL - 1
     ========================================= */

  const technologyIndustrial = findProject([
    "technology",
    "technology company",
    "tech",
    "software",
    "saas",
    "app",
    "mobile app",
    "industrial",
    "manufacturing",
    "engineering",
    "automation",
    "logistics",
    "construction",
  ]);

  if (technologyIndustrial) {
    selected.push(technologyIndustrial);
    usedIds.add(technologyIndustrial.id);
  }

  /* =========================================
     FILL REMAINING SLOTS

     Always try to show 6 projects.
     ========================================= */

  if (selected.length < 6) {
    for (const project of projects) {
      if (selected.length >= 6) {
        break;
      }

      if (!usedIds.has(project.id)) {
        selected.push(project);
        usedIds.add(project.id);
      }
    }
  }

  return selected.slice(0, 6);
};

export function slimHomepageGalleries(galleries) {
  const normalized = normalizeProjects(galleries);
  const selected = selectHomepageProjects(normalized);
  const projects =
    selected.length > 0 ? selected : normalized.slice(0, 6);

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    category: project.category,
    image: project.image,
    project_url: project.link,
  }));
}

/* =========================================================
   NORMALIZE API GALLERIES
   ========================================================= */

const normalizeProjects = (galleries) => {
  if (!Array.isArray(galleries)) {
    return [];
  }

  return galleries
    .filter((gallery) => gallery?.name && gallery?.image)
    .map((gallery, index) => ({
      id: gallery.id || `gallery-${index}`,

      title: gallery.name,

      name: gallery.name,

      description: gallery.description || "",

      category:
        gallery.category ||
        gallery.description ||
        "Website Design & Development",

      image: gallery.image,

      link: gallery.project_url || "#",
    }));
};

/* =========================================================
   PORTFOLIO

   IMPORTANT:

   NO useEffect
   NO client-side API request
   NO loading state
   NO first-render real-estate flash

   initialGalleries comes directly from getStaticProps().
   ========================================================= */

export default function Portfolio({ initialGalleries = [] }) {
  const [open, setOpen] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* =========================================
     SERVER-PROVIDED PROJECTS
     ========================================= */

  const normalizedProjects = normalizeProjects(initialGalleries);

  /*
   * If server has valid API data:
   * use balanced homepage selection.
   *
   * If API returned nothing:
   * use fallback.
   */

  let projects = [];

  if (normalizedProjects.length > 0) {
    const homepageProjects = selectHomepageProjects(normalizedProjects);

    projects =
      homepageProjects.length >= 6
        ? homepageProjects
        : homepageProjects.length > 0
          ? homepageProjects
          : normalizedProjects.slice(0, 6);
  } else {
    projects = fallbackProjects;
  }

  /* =========================================
     LIGHTBOX SLIDES
     ========================================= */

  const slides = projects
    .map((project) => ({
      src: getImageSrc(project.image),
    }))
    .filter((slide) => slide.src);

  return (
    <>
      {/* =====================================================
          LIGHTBOX
          ===================================================== */}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentImageIndex}
        slides={slides}
      />

      {/* =====================================================
          PORTFOLIO INTRO
          ===================================================== */}

      <section className="rs-gd-intro py-5" style={{ background: "none" }}>
        <div className="container-fluid px-3 px-md-4 px-xl-5">
          <div className="row align-items-center">
            <div className="col-12">
              <div
                className="rs-gd-intro__copy"
                style={{
                  maxWidth: "100%",
                  margin: "auto",
                }}
              >
                <h2
                  className="rs-gd-intro__lead rs-gd-intro__reveal fade-title rs-process-title mb-3 text-center mx-auto"
                  style={{
                    maxWidth: "1000px",
                    margin: "auto",
                  }}
                >
                  500+ Successful Website Projects Across Dubai & UAE
                </h2>

                <p className="rs-gd-intro__reveal text-center rs-section-subtitle mx-auto">
                  Explore some of the websites we’ve designed and developed for
                  businesses across Dubai and the UAE, combining creative
                  design, responsive functionality and user-focused experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PORTFOLIO GRID
          ===================================================== */}

      <section id="portfolio" className="portfolio section pt-0">
        <div className="container">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <div className="row gy-4 isotope-container">
              {projects.map((project, index) => {
                const imageSrc = getImageSrc(project.image);

                return (
                  <div
                    key={project.id}
                    className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                  >
                    <div className="portfolio-content h-100">
                      {/* ==================================
                            PROJECT IMAGE
                            ================================== */}

                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          className="img-fluid"
                          alt={project.title}
                          width="600"
                          height="400"
                          loading={index < 3 ? "eager" : "lazy"}
                          fetchPriority={index < 3 ? "high" : "auto"}
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(event) => {
                            console.error(
                              "HOMEPAGE PORTFOLIO IMAGE FAILED:",
                              event.currentTarget.src,
                            );

                            event.currentTarget.onerror = null;

                            event.currentTarget.src =
                              "/assets/img/portfolio/portfolio-1.webp";
                          }}
                        />
                      ) : (
                        <img
                          src="/assets/img/portfolio/portfolio-1.webp"
                          className="img-fluid"
                          alt={project.title}
                          width="600"
                          height="400"
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                      )}

                      {/* ==================================
                            PROJECT INFO
                            ================================== */}

                      <div className="portfolio-info">
                        <h3>{project.title}</h3>

                        <p>{project.category}</p>

                        {/* ==================================
                              IMAGE PREVIEW
                              ================================== */}

                        {imageSrc && (
                          <button
                            type="button"
                            onClick={() => {
                              const slideIndex = slides.findIndex(
                                (slide) => slide.src === imageSrc,
                              );

                              setCurrentImageIndex(
                                slideIndex >= 0 ? slideIndex : 0,
                              );

                              setOpen(true);
                            }}
                            className="preview-link border-0 bg-transparent text-white"
                            style={{
                              fontSize: "1.2rem",
                              cursor: "pointer",
                            }}
                            aria-label={`View ${project.title} image`}
                          >
                            <i className="bi bi-zoom-in" aria-hidden="true"></i>
                          </button>
                        )}

                        {/* ==================================
                              PROJECT URL
                              ================================== */}

                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="More Details"
                            className="details-link"
                            aria-label={`View ${project.title} details`}
                          >
                            <i
                              className="bi bi-link-45deg"
                              aria-hidden="true"
                            ></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================
            VIEW OUR WORK
            ===================================================== */}

        <div className="container text-center mt-5">
          <Button color="red" href="/our-portfolio/" className="mt-4">
            View Our Work
          </Button>
        </div>
      </section>
    </>
  );
}
