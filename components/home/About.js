import { useEffect, useRef, useState } from "react";

export default function About({ data }) {
  const videoSectionRef = useRef(null);
  const [videoOpen, setVideoOpen] = useState(false);

  // =====================================================
  // ABOUT DATA
  // =====================================================

  const aboutHeading = data?.about_heading || "About RedSpider";

  const aboutSubtitle =
    data?.about_subtitle ||
    "We have qualified IT support team that can meet the needs of your business needs.";

  const aboutDescription =
    data?.about_description ||
    "We are passionate about Graphic Design, Original Logo Design and creating Responsive Web Design Dubai Layouts. With over 14 years of experience, RedSpider has established itself as a trusted web design and development company in Dubai, delivering high-quality digital solutions that drive business growth.";

  const aboutImage = data?.about_image || "assets/img/about_back.png";

  const readmoreText = data?.about_readmore_text || "Read More...";

  const readmoreLink = data?.about_readmore_link || "/about";

  const portfolioText = data?.about_portfolio_text || "View Portfolio";

  const portfolioLink = data?.about_portfolio_link || "/portfolio";

  const videoTitle =
    data?.video_title || "Why Businesses Trust Our Web Design Expertise";

  const videoThumbnail = data?.video_thumbnail || "assets/img/videos/video.jpg";

  const videoUrl = data?.video_url || "assets/img/videos/redspider.webm";

  // =====================================================
  // IMAGE / VIDEO URL
  // =====================================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Full URL
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // /storage/...
    if (imagePath.startsWith("/storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";

      return `${baseUrl}${imagePath}`;
    }

    // storage/...
    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";

      return `${baseUrl}/${imagePath}`;
    }

    // Local frontend assets
    return imagePath;
  };

  // =====================================================
  // VIDEO SCROLL ANIMATION
  // =====================================================

  useEffect(() => {
    const section = videoSectionRef.current;

    if (!section) return;

    let ticking = false;

    const updateVideoAnimation = () => {
      const video = section.querySelector(".rs-video-wrap");
      const title = section.querySelector(".rs-video-title");

      if (!video) {
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
       * Animation starts when section reaches viewport.
       */
      const start = viewportHeight * 0.85;

      /*
       * Animation completes before section leaves viewport.
       */
      const end = viewportHeight * 0.2;

      let progress = (start - rect.top) / (start - end);

      progress = Math.max(0, Math.min(1, progress));

      /*
       * Smooth easing.
       */
      const eased = progress * progress * (3 - 2 * progress);

      // =================================================
      // VIDEO
      // =================================================

      const minScale = 0.42;
      const maxScale = 1;

      const scale = minScale + (maxScale - minScale) * eased;

      const opacity = 0.45 + 0.55 * eased;

      video.style.transform = `scale(${scale})`;

      video.style.opacity = opacity;

      // =================================================
      // TITLE
      // =================================================

      if (title) {
        const titleMove = -45 + 45 * eased;

        const titleOpacity = 0.2 + 0.8 * eased;

        title.style.transform = `translateY(${titleMove}px)`;

        title.style.opacity = titleOpacity;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVideoAnimation);

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    window.addEventListener("resize", handleScroll);

    updateVideoAnimation();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // =====================================================
  // ESCAPE TO CLOSE VIDEO
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    if (videoOpen) {
      document.body.style.overflow = "hidden";

      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoOpen]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          ABOUT SECTION
      ================================================= */}

      <section className="key-features py-5 about-features dark-background py-3">
        <div className="container" style={{ maxWidth: "1290px" }}>
          <div className="row align-items-center g-5">
            {/* LEFT CONTENT */}

            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <h2
                className="kf-title text-white fs-1 text-uppercase aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="100"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {aboutHeading}
              </h2>

              <div className="lin_sec"></div>

              <div className="clearfix"></div>

              <p
                className="h2"
                dangerouslySetInnerHTML={{
                  __html: aboutSubtitle.replace(/\n/g, "<br />"),
                }}
              />

              <div
                className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center mt-5"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <a
                  href={readmoreLink}
                  className="btn btn-animation btn-about-readmore d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-title">{readmoreText}</span>
                </a>

                <a
                  href={portfolioLink}
                  className="btn btn-animation btn-about-portfolio d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-title">{portfolioText}</span>
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}

            <div
              className="col-lg-6"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <img
                src={getImageUrl(aboutImage)}
                alt={aboutHeading}
                className="img-fluid"
                data-aos="zoom-in"
                data-aos-delay="350"
                data-aos-duration="900"
                data-aos-once="true"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          VIDEO SCROLL SECTION
      ================================================= */}

      <section ref={videoSectionRef} className="rs-video-scroll-section">
        {/* STICKY VIEWPORT */}

        <div className="rs-video-sticky">
          <div className="container text-center">
            <div className="rs-video-content">
              {/* VIDEO TITLE */}

              <div className="rs-video-title">
                <h4>{videoTitle}</h4>
              </div>

              {/* VIDEO */}

              <div className="rs-video-wrap">
                <button
                  type="button"
                  className="rs-video-trigger"
                  onClick={() => setVideoOpen(true)}
                  aria-label={`Play ${videoTitle}`}
                >
                  <img
                    src={getImageUrl(videoThumbnail)}
                    alt={videoTitle}
                    className="video-thumb"
                    loading="lazy"
                  />

                  <span className="play-btn" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          VIDEO LIGHTBOX / MODAL
      ================================================= */}

      {videoOpen && (
        <div className="rs-video-modal" onClick={() => setVideoOpen(false)}>
          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="rs-video-modal-close"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            ×
          </button>

          {/* VIDEO BOX */}

          <div
            className="rs-video-modal-box"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              src={getImageUrl(videoUrl)}
              controls
              autoPlay
              playsInline
              className="rs-video-player"
            />
          </div>
        </div>
      )}
    </>
  );
}
