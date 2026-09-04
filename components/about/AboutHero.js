export default function AboutHero({ data }) {
  // Get data from API or use fallback
  const heroTitle = data?.hero_title || "About RedSpider";

  const heroSubtitle = data?.hero_subtitle || "We're a creative digital agency";

  const heroDescription =
    data?.hero_description ||
    "RedSpider Web & Art Design is a professional web design company in Dubai, having been in the business for more than 14 years, providing creative and effective digital solutions. We've been helping startups and businesses establish a solid online identity with our high-quality, responsive, and SEO-optimized websites since 2010. We have a strong belief in using creativity, technology and user experience to develop web solutions that will be stunning, as well as working seamlessly across all devices.";

  return (
    <section className="rs-inner-hero about-hero hero-marquee rs-contact-hero rs-contact-hero-video contact-shared-hero-bg">
      {/* =========================================
          BACKGROUND VIDEO
      ========================================= */}
      <video
        className="rs-contact-hero-video__background"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/assets/img/videos/header.mp4" type="video/mp4" />
      </video>

      {/* =========================================
          DARK OVERLAY
      ========================================= */}
      <div className="rs-contact-hero-video__overlay" aria-hidden="true"></div>

      <div className="container rs-contact-hero-video__content">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              {heroSubtitle && (
                <span className="rs-process-subtitle">{heroSubtitle}</span>
              )}

              <h1 className="rs-process-title mb-3 about-h1">
                RedSpider-
                <span className="rs-process-highlight">
                  Your Digital Partner in the UAE
                  <svg
                    className="rs-process-underline"
                    viewBox="0 0 320 22"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                  </svg>
                </span>
              </h1>

              {heroDescription && (
                <div
                  className="rs-section-subtitle mx-auto text-center text-white"
                  dangerouslySetInnerHTML={{
                    __html: heroDescription,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
