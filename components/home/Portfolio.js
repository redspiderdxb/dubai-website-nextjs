import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Abu Alnaga Development V2",
      category: "Real Estate Developer",
      image: "assets/img/portfolio/app-1.jpg",
      link: "https://aa.rsworkspace.com/",
      filter: "filter-app",
    },
    {
      id: 2,
      title: "Kasco Developments",
      category: "Real Estate Developer Website",
      image: "assets/img/portfolio/app-2.jpg",
      link: "https://www.kascodevelopments.com/",
      filter: "filter-app",
    },
    {
      id: 3,
      title: "Mansion Edition Real Estate",
      category: "Luxury Real Estate - Offplan Projects",
      image: "assets/img/portfolio/app-3.jpg",
      link: "https://www.mansionedition.ae/",
      filter: "filter-app",
    },
    {
      id: 4,
      title: "SPACE & PLACE REAL ESTATE LLC",
      category: "Real Estate Broker Website",
      image: "assets/img/portfolio/books-1.jpg",
      link: "https://www.spaceandplace.ae/",
      filter: "filter-app",
    },
    {
      id: 5,
      title: "DSQ Real Estate – V2",
      category: "Real Estate Broker Website next.js",
      image: "assets/img/portfolio/books-2.jpg",
      link: "https://www.dsqrealestate.ae/",
      filter: "filter-app",
    },
    {
      id: 6,
      title: "Sankari Properties",
      category: "Real Estate Developer website",
      image: "assets/img/portfolio/books-3.jpg",
      link: "https://www.sankariproperties.com/projects/regent-residences-dubai-sankari-place/",
      filter: "filter-app",
    },
  ];

  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slides = projects.map((project) => ({ src: project.image }));

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
                <p
                  className="rs-gd-intro__lead rs-gd-intro__reveal fade-title mb-3"
                  style={{ maxWidth: "1000px", margin: "auto" }}
                >
                  500+ Successful Projects Delivered Across Dubai & UAE
                </p>
                <p
                  className="rs-gd-intro__lead rs-gd-intro__reveal text-center fs-5"
                  style={{ fontWeight: 400 }}
                >
                  We are passionate about{" "}
                  <a
                    href="https://www.redspider.ae/service/graphic-design-company-dubai/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Graphic Design
                  </a>
                  ,{" "}
                  <a
                    href="https://www.redspider.ae/service/logo-designing-company-dubai/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Original Logo Design
                  </a>{" "}
                  and creating Responsive Web Design Dubai Layouts.
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
                    <img
                      src={project.image}
                      className="img-fluid"
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="portfolio-info">
                      <h4>{project.title}</h4>
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
