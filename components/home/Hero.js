export default function Hero() {
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
          <button
            type="button"
            data-bs-target="#rsHeroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1 - Unique Interactive Creative"
          ></button>
          <button
            type="button"
            data-bs-target="#rsHeroCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2 - Ecommerce Custom Solutions"
          ></button>
          <button
            type="button"
            data-bs-target="#rsHeroCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3 - Company Branding"
          ></button>
          <button
            type="button"
            data-bs-target="#rsHeroCarousel"
            data-bs-slide-to="3"
            aria-label="Slide 4 - Designed for Business Growth"
          ></button>
        </div>

        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <div
              className="rs-slide"
              style={{
                backgroundImage:
                  "url('https://www.redspider.ae/wp-content/uploads/2026/07/Dubai-Web-Design.webp')",
              }}
              role="img"
              aria-label="Dubai Web Design hero background"
            >
              <div className="rs-slide-content">
                <p className="rs-slide-kicker">We Create Experiences</p>
                <h1 className="rs-slide-title">
                  Unique. Interactive. Creative
                </h1>
                <p className="rs-slide-description">
                  RedSpider is a top-rated Web Design Company in Dubai offering
                  expert Web Design Dubai and Web Development Company services
                  to grow your business.
                </p>
                <a className="rs-slide-button" href="#portfolio">
                  View Portfolio
                </a>
                <div className="rs-review-box">
                  <div className="rs-review-top">
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
                  </div>
                  <p className="rs-review-text">
                    RedSpider is rated 4.9 stars - based on 100+ reviews in
                    Google Business listing.
                  </p>
                </div>
              </div>
              <span className="rs-slide-count" aria-hidden="true">
                01 / 04
              </span>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div
              className="rs-slide"
              style={{
                backgroundImage:
                  "url('https://www.redspider.ae/wp-content/uploads/2026/06/Dubai-Web-Development-Company.jpg')",
              }}
              role="img"
              aria-label="Dubai Web Development Company hero background"
            >
              <div className="rs-slide-content">
                <p className="rs-slide-kicker">
                  Web Design &amp; Development Company Dubai
                </p>
                <h2 className="rs-slide-title">
                  Ecommerce &amp; Custom Solutions
                </h2>
                <p className="rs-slide-description">
                  Corporate identity, digital consultancy and custom websites
                  designed to strengthen your business presence.
                </p>
                <a className="rs-slide-button" href="#portfolio">
                  View Portfolio
                </a>
                <div className="rs-review-box">
                  <div className="rs-review-top">
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
                  </div>
                  <p className="rs-review-text">
                    RedSpider is rated 4.9 stars - based on 100+ reviews in
                    Google Business listing.
                  </p>
                </div>
              </div>
              <span className="rs-slide-count" aria-hidden="true">
                02 / 04
              </span>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <div
              className="rs-slide"
              style={{
                backgroundImage:
                  "url('https://www.redspider.ae/wp-content/uploads/2026/07/Web-Design-Dubai.webp')",
              }}
              role="img"
              aria-label="Web Design Dubai hero background"
            >
              <div className="rs-slide-content">
                <p className="rs-slide-kicker">Improve Your</p>
                <h2 className="rs-slide-title">Company Branding</h2>
                <p className="rs-slide-description">
                  With our artistic and skilled web design team, your brand
                  receives a professional digital presence built to make an
                  impact.
                </p>
                <a className="rs-slide-button" href="#portfolio">
                  View Portfolio
                </a>
                <div className="rs-review-box">
                  <div className="rs-review-top">
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
                  </div>
                  <p className="rs-review-text">
                    RedSpider is rated 4.9 stars - based on 100+ reviews in
                    Google Business listing.
                  </p>
                </div>
              </div>
              <span className="rs-slide-count" aria-hidden="true">
                03 / 04
              </span>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="carousel-item">
            <div
              className="rs-slide"
              style={{
                backgroundImage:
                  "url('https://www.redspider.ae/wp-content/uploads/2026/07/website-design-company.webp')",
              }}
              role="img"
              aria-label="Website Design Company hero background"
            >
              <div className="rs-slide-content">
                <p className="rs-slide-kicker">Creative Digital Solutions</p>
                <h2 className="rs-slide-title">Designed for Business Growth</h2>
                <p className="rs-slide-description">
                  Responsive, user-focused websites that combine creative
                  design, reliable development and measurable performance.
                </p>
                <a className="rs-slide-button" href="#portfolio">
                  View Portfolio
                </a>
                <div className="rs-review-box">
                  <div className="rs-review-top">
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
                  </div>
                  <p className="rs-review-text">
                    RedSpider is rated 4.9 stars - based on 100+ reviews in
                    Google Business listing.
                  </p>
                </div>
              </div>
              <span className="rs-slide-count" aria-hidden="true">
                04 / 04
              </span>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#rsHeroCarousel"
          data-bs-slide="prev"
          aria-label="Previous slide"
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
