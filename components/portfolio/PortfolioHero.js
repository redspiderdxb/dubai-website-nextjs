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
                    Our
                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>{" "}
                  Projects
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hero-banner" className="mb-4 hero-banner section rs-full-section" style={{ minHeight: '50vh' }}>
        <div className="rs-hero-banner">
          <div className="container" style={{ maxWidth: '1500px' }}>
           
            <div className="container section-title" data-aos="fade-up">
              <h2 className="text-center">500+ Successful Projects Delivered Across Dubai & UAE</h2>
              <p className="text-center">
                We are passionate about <a href="https://www.redspider.ae/service/graphic-design-company-dubai/" target="_blank" rel="noopener noreferrer">Graphic Design</a>,{' '}
                <a href="https://www.redspider.ae/service/logo-designing-company-dubai/" target="_blank" rel="noopener noreferrer">Original Logo Design</a> and creating Responsive Web Design Dubai Layouts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}