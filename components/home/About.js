import { useEffect } from "react";

export default function About({ data }) {
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

  const videoUrl =
    data?.video_url ||
    "https://lp.rsworkspace.com/Redspider-code/assets/img/videos/redspider.webm";

  // =====================================================
  // IMAGE / VIDEO URL
  // =====================================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("/storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";
      return `${baseUrl}${imagePath}`;
    }

    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";
      return `${baseUrl}/${imagePath}`;
    }

    return imagePath;
  };

  // =====================================================
  // GLIGHTBOX INITIALIZATION
  // =====================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lightbox = null;
    let timer = null;

    const initVideoLightbox = () => {
      if (typeof window.GLightbox !== "function") return false;

      const videoElement = document.querySelector(
        ".rs-video-zoom-sec .glightbox",
      );
      if (!videoElement) return false;

      if (videoElement.dataset.glightboxInitialized === "true") return true;

      lightbox = window.GLightbox({
        selector: ".rs-video-zoom-sec .glightbox",
      });

      videoElement.dataset.glightboxInitialized = "true";
      return true;
    };

    const initialized = initVideoLightbox();

    if (!initialized) {
      timer = setInterval(() => {
        const success = initVideoLightbox();
        if (success && timer) {
          clearInterval(timer);
          timer = null;
        }
      }, 100);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (lightbox && typeof lightbox.destroy === "function") {
        lightbox.destroy();
      }
    };
  }, []);

  // =====================================================
  // VIDEO GSAP / SCROLLTRIGGER INITIALIZATION
  // =====================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimation = () => {
      if (typeof window.initVideoZoomEffect !== "function") return false;

      const videoSection = document.querySelector(".rs-video-zoom-sec");
      if (!videoSection) return false;

      window.initVideoZoomEffect();
      return true;
    };

    const initialized = initAnimation();
    let timer = null;

    if (!initialized) {
      timer = setInterval(() => {
        const success = initAnimation();
        if (success && timer) {
          clearInterval(timer);
          timer = null;
        }
      }, 100);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (typeof window.ScrollTrigger !== "undefined") {
        const trigger = window.ScrollTrigger.getById("rs-video-zoom");
        if (trigger) trigger.kill();
      }
    };
  }, []);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <section className="key-features py-5 about-features dark-background py-3">
        <div className="container" style={{ maxWidth: "1290px" }}>
          <div className="row align-items-center g-5">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <h2
                className="kf-title text-white fs-1 text-uppercase"
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

      <section className="py-5 ideo-grow-se rs-video-zoom-sec">
        <div className="container text-center">
          <div className="rs-video-content">
            <div className="rs-video-title">
              <h4 className="fw-bold">{videoTitle}</h4>
            </div>

            <div className="rs-video-wrap">
              <a
                href={getImageUrl(videoUrl)}
                className="glightbox video-link"
                data-type="video"
                aria-label={`Watch ${videoTitle}`}
              >
                <img
                  src={getImageUrl(videoThumbnail)}
                  alt={videoTitle}
                  className="img-fluid rounded shadow rounded-5 video-thumb"
                  loading="lazy"
                />
                <span className="play-btn" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
