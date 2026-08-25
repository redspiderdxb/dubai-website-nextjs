import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Abu Alnaga Development V2",
      category: "Real Estate Developer",
      image: "assets/img/portfolio/app-1.webp",
      link: "https://aa.rsworkspace.com/",
      filter: "filter-app",
    },
    {
      id: 2,
      title: "Kasco Developments",
      category: "Real Estate Developer Website",
      image: "assets/img/portfolio/app-2.webp",
      link: "https://www.kascodevelopments.com/",
      filter: "filter-app",
    },
    {
      id: 3,
      title: "Mansion Edition Real Estate",
      category: "Luxury Real Estate - Offplan Projects",
      image: "assets/img/portfolio/app-3.webp",
      link: "https://www.mansionedition.ae/",
      filter: "filter-app",
    },
    {
      id: 4,
      title: "SPACE & PLACE REAL ESTATE LLC",
      category: "Real Estate Broker Website",
      image: "assets/img/portfolio/books-1.webp",
      link: "https://www.spaceandplace.ae/",
      filter: "filter-app",
    },
    {
      id: 5,
      title: "DSQ Real Estate – V2",
      category: "Real Estate Broker Website next.js",
      image: "assets/img/portfolio/books-2.webp",
      link: "https://www.dsqrealestate.ae/",
      filter: "filter-app",
    },
    {
      id: 6,
      title: "Sankari Properties",
      category: "Real Estate Developer website",
      image: "assets/img/portfolio/books-3.webp",
      link: "https://www.sankariproperties.com/projects/regent-residences-dubai-sankari-place/",
      filter: "filter-app",
    },
  ];

  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper to ensure image paths have leading slash for Next.js Image
  const getImageSrc = (imagePath) => {
    if (!imagePath) return null;
    // If it already starts with / or is a full URL, return as-is
    if (
      imagePath.startsWith("/") ||
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }
    // Otherwise add leading slash
    return `/${imagePath}`;
  };

  const slides = projects.map((project) => ({
    src: getImageSrc(project.image),
  }));

  return (
    <>
      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentImageIndex}
        slides={slides}
        // Agar plugins use karna ho toh yahan add karein, jaise: plugins={[Zoom, Slideshow]}
      />

      {/* Portfolio Intro */}
      <section className="rs-gd-intro py-5" style={{ background: "none" }}>
        <div className="container-fluid px-3 px-md-4 px-xl-5">
          <div className="row align-items-center">
            <div className="col-12">
              <div
                className="rs-gd-intro__copy"
                style={{ maxWidth: "100%", margin: "auto" }}
              >
                <h2
                  className="rs-gd-intro__lead rs-gd-intro__reveal fade-title mb-3"
                  style={{ maxWidth: "1000px", margin: "auto" }}
                >
                  500+ Successful Website Projects Across Dubai & UAE
                </h2>
                <p className="rs-gd-intro__lead rs-gd-intro__reveal text-center fs-5">
                  Explore some of the websites we’ve designed and developed for
                  businesses across Dubai and the UAE, <br></br> combining
                  creative design, responsive functionality and user-focused
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="portfolio section pt-0">
        <div className="container">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <ul
              className="portfolio-filters isotope-filters d-none"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li data-filter="*" className="filter-active">
                All
              </li>
              <li data-filter=".filter-app">App</li>
              <li data-filter=".filter-product">Product</li>
              <li data-filter=".filter-branding">Branding</li>
              <li data-filter=".filter-books">Books</li>
            </ul>

            <div className="row gy-4 isotope-container">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                >
                  <div className="portfolio-content h-100">
                    <Image
                      src={getImageSrc(project.image)}
                      className="img-fluid"
                      alt={project.title}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="portfolio-info">
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>

                      <button
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setOpen(true);
                        }}
                        className="preview-link border-0 bg-transparent text-white"
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        aria-label={`View ${project.title} image`}
                      >
                        <i className="bi bi-zoom-in" aria-hidden="true"></i>
                      </button>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="More Details"
                        className="details-link"
                        aria-label={`View ${project.title} details`}
                      >
                        <i className="bi bi-link-45deg" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Our Work Button */}
        <div className="container text-center mt-5">
          <a
            href="/portfolio"
            className="btn btn-animation btn-red d-inline-flex align-items-center mt-4"
          >
            <span className="btn-title">View Our Work</span>
          </a>
        </div>
      </section>
    </>
  );
}
