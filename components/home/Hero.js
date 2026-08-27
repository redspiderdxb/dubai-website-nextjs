import { useState, useEffect } from "react";
import Button from "../ui/Button";

export default function Hero({ data, googleReviews = null }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Get slides from API data or use fallback
  const slides =
    data?.hero_slides?.length > 0
      ? data.hero_slides
      : [
          {
            title: "Unique. Interactive. Creative",
            subtitle: "We Create Experiences",
            description:
              "RedSpider is a top-rated Web Design Company in Dubai offering expert Web Design Dubai and Web Development Company services to grow your business.",
            image:
              "https://www.RedSpider.ae/wp-content/uploads/2026/07/Dubai-Web-Design.webp",
            button_text: "View Portfolio",
            button_link: "#portfolio",
          },
          {
            title: "Ecommerce & Custom Solutions",
            subtitle: "Web Design & Development Company Dubai",
            description:
              "Corporate identity, digital consultancy and custom websites designed to strengthen your business presence.",
            image:
              "https://www.RedSpider.ae/wp-content/uploads/2026/06/Dubai-Web-Development-Company.jpg",
            button_text: "View Portfolio",
            button_link: "#portfolio",
          },
          {
            title: "Company Branding",
            subtitle: "Improve Your",
            description:
              "With our artistic and skilled web design team, your brand receives a professional digital presence built to make an impact.",
            image:
              "https://www.RedSpider.ae/wp-content/uploads/2026/07/Web-Design-Dubai.webp",
            button_text: "View Portfolio",
            button_link: "#portfolio",
          },
          {
            title: "Designed for Business Growth",
            subtitle: "Creative Digital Solutions",
            description:
              "Responsive, user-focused websites that combine creative design, reliable development and measurable performance.",
            image:
              "https://www.RedSpider.ae/wp-content/uploads/2026/07/website-design-company.webp",
            button_text: "View Portfolio",
            button_link: "#portfolio",
          },
        ];

  // Auto-play carousel
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    const liveBase =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
      "https://redspider.rsworkspace.net/admin/public";

    // Full URL
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      /*
       * Convert any localhost backend URL to production backend URL.
       *
       * Handles:
       * http://localhost/redspider/public
       * http://localhost/RedSpider/public
       * https://localhost/redspider/public
       * https://localhost/REDSPIDER/public
       */
      if (/^https?:\/\/localhost\/redspider\/public/i.test(imagePath)) {
        return imagePath.replace(
          /^https?:\/\/localhost\/redspider\/public/i,
          liveBase,
        );
      }

      // Keep already-live/external URLs unchanged
      return imagePath;
    }

    // /storage/filename.jpg
    if (imagePath.startsWith("/storage/")) {
      return `${liveBase}${imagePath}`;
    }

    // storage/filename.jpg
    if (imagePath.includes("storage/")) {
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

      return `${liveBase}${cleanPath}`;
    }

    // Other relative paths
    return imagePath;
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="rs-hero-slider">
      <div
        id="rsHeroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="6500"
        data-bs-pause="false"
        data-bs-touch="true"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#rsHeroCarousel"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <div
                className="rs-slide"
                style={{
                  backgroundImage: `url("${getImageUrl(slide.image)}")`,
                }}
                role="img"
                aria-label={`Hero slide ${index + 1}`}
              >
                <div className="rs-slide-content">
                  {slide.subtitle && (
                    <p className="rs-slide-kicker">{slide.subtitle}</p>
                  )}

                  {slide.title && (
                    <div className="rs-slide-title">{slide.title}</div>
                  )}

                  {slide.description && (
                    <p className="rs-slide-description">{slide.description}</p>
                  )}

                  {slide.button_text && (
                    <Button
                      color="yellow"
                      href={slide.button_link || "#portfolio"}
                      className="rs-slide-button"
                    >
                      {slide.button_text}
                    </Button>
                  )}

                  <div className="rs-review-box">
                    <div className="rs-review-top">
                      <a
                        href={
                          googleReviews?.url ||
                          "https://share.google/Zmvt06D8A6xyIbCte"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="rs-google-word" aria-hidden="true">
                          <span className="rs-blue">G</span>
                          <span className="rs-red">o</span>
                          <span className="rs-yellow">o</span>
                          <span className="rs-blue">g</span>
                          <span className="rs-green">l</span>
                          <span className="rs-red">e</span>
                        </span>

                        <span className="rs-stars" aria-hidden="true">
                          <i className="bi bi-star-fill" aria-hidden="true"></i>
                          <i className="bi bi-star-fill" aria-hidden="true"></i>
                          <i className="bi bi-star-fill" aria-hidden="true"></i>
                          <i className="bi bi-star-fill" aria-hidden="true"></i>
                          <i className="bi bi-star-fill" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>

                    <p className="rs-review-text">
                      RedSpider is rated{" "}
                      {Number(googleReviews?.rating || 4.9).toFixed(1)} stars
                      - based on{" "}
                      {googleReviews?.available && googleReviews?.total
                        ? googleReviews.total
                        : "100+"}{" "}
                      reviews in Google Business listing.
                    </p>
                  </div>
                </div>

                <span className="rs-slide-count" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#rsHeroCarousel"
          data-bs-slide="prev"
          aria-label="Previous slide"
          onClick={goToPrev}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#rsHeroCarousel"
          data-bs-slide="next"
          aria-label="Next slide"
          onClick={goToNext}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>
  );
}
