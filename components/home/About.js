import { useEffect, useRef } from "react";

export default function About({ data }) {
  const videoSectionRef = useRef(null);

  // Get data from API or use fallback
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

  // Helper function to get image URL
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

  useEffect(() => {
    const handleScroll = () => {
      if (!videoSectionRef.current) return;

      const rect = videoSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visiblePercentage = Math.min(
        1,
        Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)),
      );

      const scale = 0.6 + visiblePercentage * 0.4;
      const opacity = 0.4 + visiblePercentage * 0.6;

      if (videoSectionRef.current) {
        const videoWrap =
          videoSectionRef.current.querySelector(".rs-video-wrap");
        if (videoWrap) {
          videoWrap.style.transform = `scale(${scale})`;
          videoWrap.style.opacity = opacity;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* About Section */}
      <section className="key-features py-5 about-features dark-background py-3">
        <div className="container" style={{ maxWidth: "1290px" }}>
          <div className="row align-items-center g-5">
            {/* Left Content */}
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

            {/* Right Image */}
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

      {/* Video Section */}
      <section
        ref={videoSectionRef}
        className="py-5 ideo-grow-se rs-video-zoom-sec"
      >
        <div className="container text-center" style={{ maxWidth: "1000px" }}>
          <div className="rs-video-content">
            <div className="rs-video-title">
              <h4 className="fw-bold">{videoTitle}</h4>
            </div>

            <div
              className="rs-video-wrap"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-once="true"
              style={{ transform: "scale(0.6)", opacity: 0.4 }}
            >
              <a
                href={videoUrl}
                className="glightbox video-link"
                style={{ display: "block", position: "relative" }}
              >
                <img
                  src={getImageUrl(videoThumbnail)}
                  alt={videoTitle}
                  className="img-fluid rounded shadow rounded-5 video-thumb"
                  style={{
                    width: "100%",
                    borderRadius: "30px",
                    display: "block",
                  }}
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
