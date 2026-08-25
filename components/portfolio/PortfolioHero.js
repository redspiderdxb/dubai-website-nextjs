// components/portfolio/PortfolioHero.js

export default function PortfolioHero() {
  return (
    <>
      <section className="about-hero hero-marquee portfolio-page-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="rs-process-title-sec">
                <h1 className="rs-process-title mb-3">
                  <span className="rs-process-highlight">
                    Our Web Design
                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>{" "}
                  Portfolio
                </h1>

                <p className="text-center  text-white">
                  Explore selected websites and digital projects created by
                  RedSpider for businesses across Dubai, the UAE and
                  international markets.
                </p>

                <h2 className="text-center text-white porh">
                500+ Website Projects Delivered Across Dubai & UAE
              </h2>
              <p className="text-center text-white">
                Browse a selection of projects completed for clients across real
                estate, corporate, ecommerce, construction, logistics and other
                industries. Each project reflects different business
                requirements, design styles and digital experiences.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
}
