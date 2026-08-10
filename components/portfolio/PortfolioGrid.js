import "glightbox/dist/css/glightbox.min.css";
import { useState, useEffect, useRef } from "react";
import { fetchAllGalleries } from "../../lib/api";

export default function PortfolioGrid() {
  const lightboxInstance = useRef(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("*");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔥 Sirf API se dynamic galleries fetch karo
  useEffect(() => {
    const loadGalleries = async () => {
      try {
        const data = await fetchAllGalleries();

        // 🔥 API data ko projects format me map karo
        const dynamicProjects = data.map((gallery) => ({
          id: gallery.id,
          title: gallery.name,
          category: gallery.description
            ? gallery.description.replace(/<[^>]*>/g, "")
            : "Portfolio",
          // ✅ IMAGE PATH FIX - /storage/ prefix add karo
          image: gallery.image
            ? `/storage/${gallery.image}`
            : "/assets/img/placeholder.jpg",
          link: `/galleries/${gallery.slug}`,
          filter: "filter-websites",
        }));

        setGalleries(dynamicProjects);
      } catch (error) {
        console.error("Error fetching galleries:", error);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    };
    loadGalleries();
  }, []);

  // 🔥 GLightbox Init
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
  }, [galleries]);

  const filterOptions = [
    { value: "*", label: "All Projects" },
    { value: "filter-websites", label: "Websites" },
    { value: "filter-app", label: "Mobile App" },
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
    filter === "*" ? galleries : galleries.filter((p) => p.filter === filter);

  if (loading) {
    return (
      <section className="portfolio section pt-2">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio section pt-2">
      <div className="container">
        {/* Portfolio Filter Wrapper */}
        <div className="portfolio-filter-wrapper">
          <div className="portfolio-actions">
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

        {/* Projects Grid - Sirf Dynamic */}
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
                <div className="portfolio-content h-100">
                  <img
                    src={project.image}
                    className="img-fluid"
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/assets/img/placeholder.jpg";
                    }}
                  />
                  <div className="portfolio-info">
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                    <a
                      href={project.image}
                      title={project.title}
                      data-gallery="portfolio-gallery-app"
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in" aria-hidden="true"></i>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="More Details"
                      className="details-link"
                    >
                      <i className="bi bi-link-45deg" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No portfolio items found. Add galleries from admin panel.</p>
            </div>
          )}
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
