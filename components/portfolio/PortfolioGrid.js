// components/portfolio/PortfolioGrid.js

import "glightbox/dist/css/glightbox.min.css";
import { useState, useEffect, useRef } from "react";

export default function PortfolioGrid() {
  const lightboxInstance = useRef(null);

  useEffect(() => {
    import("glightbox").then((module) => {
      const GLightbox = module.default;
      if (typeof window !== "undefined" && GLightbox) {
        lightboxInstance.current = GLightbox({
          selector: ".glightbox",
          touchNavigation: true,
          loop: true,
          autoplayVideos: true,
        });
      }
    });
    return () => {
      if (lightboxInstance.current) lightboxInstance.current.destroy();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Abu Alnaga Development V2",
      category: "Real Estate Developer",
      image: "assets/img/portfolio/app-1.jpg",
      link: "https://aa.rsworkspace.com/",
      filter: "filter-websites",
    },
    {
      id: 2,
      title: "Kasco Developments",
      category: "Real Estate Developer Website",
      image: "assets/img/portfolio/app-2.jpg",
      link: "https://www.kascodevelopments.com/",
      filter: "filter-websites",
    },
    {
      id: 3,
      title: "Mansion Edition Real Estate",
      category: "Luxury Real Estate - Offplan Projects",
      image: "assets/img/portfolio/app-3.jpg",
      link: "https://www.mansionedition.ae/",
      filter: "filter-websites",
    },
    {
      id: 4,
      title: "SPACE & PLACE REAL ESTATE LLC",
      category: "Real Estate Broker Website",
      image: "assets/img/portfolio/books-1.jpg",
      link: "https://www.spaceandplace.ae/",
      filter: "filter-websites",
    },
    {
      id: 5,
      title: "DSQ Real Estate – V2",
      category: "Real Estate Broker Website next.js",
      image: "assets/img/portfolio/books-2.jpg",
      link: "https://www.dsqrealestate.ae/",
      filter: "filter-websites",
    },
    {
      id: 6,
      title: "Sankari Properties",
      category: "Real Estate Developer website",
      image: "assets/img/portfolio/books-3.jpg",
      link: "https://www.sankariproperties.com/projects/regent-residences-dubai-sankari-place/",
      filter: "filter-websites",
    },
    {
      id: 7,
      title: "Feeta.pk – Real Estate Portal",
      category: "Real Estate web portal mobile website",
      image: "assets/img/portfolio/FeetaMainScreen.webp",
      link: "https://www.feeta.pk/",
      filter: "filter-app",
    },
    {
      id: 8,
      title: "ArabAvenue Property Portal",
      category: "Real Estate web portal mobile website",
      image: "assets/img/portfolio/ArabAvenue-MobileApp.webp",
      link: "#",
      filter: "filter-app",
    },
    {
      id: 9,
      title: "FCG – Projects division video",
      category: "Video Project",
      image: "https://img.youtube.com/vi/xQtsana1-Jc/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=xQtsana1-Jc",
      filter: "filter-video",
      isVideo: true,
    },
    {
      id: 10,
      title: "Game Trailer – ArabGame",
      category: "Video Project",
      image: "https://img.youtube.com/vi/MdKMVuTwKY4/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=MdKMVuTwKY4",
      filter: "filter-video",
      isVideo: true,
    },
    {
      id: 11,
      title: "GulfAutoTraders corporate video",
      category: "Video Project",
      image: "https://img.youtube.com/vi/GzJshiZRtXc/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=GzJshiZRtXc",
      filter: "filter-video",
      isVideo: true,
    },
    {
      id: 12,
      title: "Al Hossani Computer LLC",
      category: "Newsletter",
      image: "assets/img/portfolio/Corel_01.webp",
      link: "#",
      filter: "filter-nl",
    },
    {
      id: 13,
      title: "The Entertainer",
      category: "Newsletter",
      image: "assets/img/portfolio/Hertz-Academic-Campaign.webp",
      link: "#",
      filter: "filter-nl",
    },
    {
      id: 14,
      title: "Hertz",
      category: "Newsletter",
      image: "assets/img/portfolio/hertz.webp",
      link: "#",
      filter: "filter-nl",
    },
    {
      id: 15,
      title: "Social-ful",
      category: "Web Application",
      image: "assets/img/portfolio/social-ful1.webp",
      link: "https://www.spysugar.com/",
      filter: "filter-cwp",
    },
    {
      id: 16,
      title: "Spysugar",
      category: "Web Application",
      image: "assets/img/portfolio/spysugar1.webp",
      link: "https://vcard.rsworkspace.info/",
      filter: "filter-cwp",
    },
  ];

  const [filter, setFilter] = useState("*");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filterOptions = [
    { value: "*", label: "All Projects" },
    { value: "filter-app", label: "Mobile App" },
    { value: "filter-websites", label: "Websites" },
    { value: "filter-video", label: "Video Productions" },
    { value: "filter-nl", label: "Newsletter Designing" },
    { value: "filter-cwp", label: "Customized Web Application" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleFilterClick = (value) => {
    setFilter(value);
    setIsMenuOpen(false);
  };

  const filteredProjects =
    filter === "*" ? projects : projects.filter((p) => p.filter === filter);

  return (
    <section id="portfolio" className="portfolio section pt-2">
      <div className="container">
        {/* Portfolio Filter Wrapper (HTML jaisa exact structure) */}
        <div className="portfolio-filter-wrapper">
          <div className="portfolio-actions">
            {/* Filter Dropdown */}
            <div className="filter-dropdown">
              <button
                className="filter-btn"
                id="filterToggle"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <i className="bi bi-funnel-fill" aria-hidden="true"></i>
                Filter
              </button>

              {isMenuOpen && (
                <ul className="filter-menu" id="filterMenu" role="menu">
                  {filterOptions.map((opt) => (
                    <li
                      key={opt.value}
                      data-filter={opt.value}
                      className={filter === opt.value ? "active" : ""}
                      onClick={() => handleFilterClick(opt.value)}
                      role="menuitem"
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* YouTube Button - Exact HTML class */}
            <a
              href="https://www.youtube.com/channel/UC_aZoH8d6c7fv6TdV49N59Q"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-btn"
            >
              <i className="bi bi-youtube" aria-hidden="true"></i>
              YouTube
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className="row gy-4 isotope-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="col-lg-4 col-md-6 portfolio-item isotope-item"
            >
              <div className="portfolio-content h-100">
                <img
                  src={project.image}
                  className="img-fluid"
                  alt={project.title}
                  style={{ width: "100%" }}
                  loading="lazy"
                />
                <div className="portfolio-info">
                  <h4>{project.title}</h4>
                  <p>{project.category}</p>
                  <a
                    href={project.isVideo ? project.link : project.image}
                    title={project.title}
                    data-gallery="portfolio-gallery-app"
                    className={`glightbox preview-link ${project.isVideo ? "video-link" : ""}`}
                    target={project.isVideo ? "_blank" : undefined}
                    rel={project.isVideo ? "noopener noreferrer" : undefined}
                  >
                    <i
                      className={
                        project.isVideo ? "bi bi-play-circle" : "bi bi-zoom-in"
                      }
                      aria-hidden="true"
                    ></i>
                    <span className="sr-only">
                      {project.isVideo ? "Play video" : "View image"}
                    </span>
                  </a>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="More Details"
                    className="details-link"
                  >
                    <i className="bi bi-link-45deg" aria-hidden="true"></i>
                    <span className="sr-only">View project details</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container text-center mt-5">
        <a
          href="/about"
          className="btn btn-animation btn-red d-inline-flex align-items-center mt-4"
        >
          <span className="btn-title">Load More..</span>
        </a>
      </div>
    </section>
  );
}
