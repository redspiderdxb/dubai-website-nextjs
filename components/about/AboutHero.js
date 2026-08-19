export default function AboutHero({ data }) {
  // Get data from API or use fallback
  const heroTitle = data?.hero_title || "About RedSpider";
  const heroSubtitle = data?.hero_subtitle || "We're a creative digital agency";
  const heroDescription =
    data?.hero_description ||
    "RedSpider Web & Art Design is a professional web design company in Dubai, having been in the business for more than 14 years, providing creative and effective digital solutions. We've been helping startups and businesses establish a solid online identity with our high-quality, responsive, and SEO-optimized websites since 2010. We have a strong belief in using creativity, technology and user experience to develop web solutions that will be stunning, as well as working seamlessly across all devices.";

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
      return `${baseUrl}${cleanPath}`;
    }

    return imagePath;
  };

  return (
    <section className="about-hero hero-marquee">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              {heroSubtitle && (
                <span className="rs-process-subtitle">{heroSubtitle}</span>
              )}
              <h1 className="rs-process-title mb-3">
                {heroTitle}

                 <span className="rs-process-highlight">
                  Web & Art Design
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
                <div className="para_ti" dangerouslySetInnerHTML={{ __html: heroDescription }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
