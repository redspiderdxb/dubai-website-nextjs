export default function BlogStats() {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the Ongoing Costs of a Custom Real Estate Website",
      image: "assets/img/blog/custom-real-estate-website.webp",
      link: "https://www.redspider.ae/custom-real-estate-website-maintenance-costs/",
    },
    {
      id: 2,
      title: "Why Professional Website Design Matters for Businesses in Dubai",
      image: "assets/img/blog/Professional-Website-Design.webp",
      link: "https://www.redspider.ae/custom-real-estate-website-maintenance-costs/",
    },
  ];

  const clientLogos = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
  ];

  return (
    <>
      {/* Blog Section */}
      <section
        id="home-blog"
        className="mobile-app-ser section dark-background rs-home-blog-new"
      >
        <div className="container" style={{ maxWidth: "980px" }}>
          <div
            className="section-title text-center text-white mb-2 aos-init aos-animate"
            data-aos="fade-up"
          >
            <div className="home-blog-title fw-normal">From Our Blog</div>
          </div>
          <div className="row g-3">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="col-lg-6 aos-init aos-animate"
                data-aos="fade-up"
              >
                <div className="rs-blog-text-card">
                  <div className="blog-img">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                  <div className="rs-blog-post-title">
                    <h4>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rs-blog-link"
                      >
                        {post.title}
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1320px" }}>
          <div className="rs-blog-stats row text-center">
            <div className="col-4">
              <div>
                <span
                  className="rs-blog-stat-number purecounter"
                  data-purecounter-start="0"
                  data-purecounter-end="500"
                  data-purecounter-duration="0"
                >
                  500
                </span>
                <span className="rs-plus">+</span>
              </div>
              <p>COMPLETED PROJECTS</p>
            </div>
            <div className="col-4">
              <div>
                <span
                  className="rs-blog-stat-number purecounter"
                  data-purecounter-start="0"
                  data-purecounter-end="100"
                  data-purecounter-duration="0"
                >
                  100
                </span>
                <span className="rs-plus">+</span>
              </div>
              <p>5 STAR REVIEWS</p>
            </div>
            <div className="col-4">
              <div>
                <span
                  className="rs-blog-stat-number purecounter"
                  data-purecounter-start="0"
                  data-purecounter-end="14"
                  data-purecounter-duration="0"
                >
                  14
                </span>
                <span className="rs-plus">+</span>
              </div>
              <p>YEARS OF EXCELLENCE</p>
            </div>
          </div>
          <div className="rs-worked-with text-center d-none">
            <div className="rs-worked-title">We've worked with</div>
            <img
              src="https://www.redspider.ae/wp-content/uploads/2024/05/Logo_White.png.webp"
              alt="UAE Website designers"
              className="img-fluid"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section
        className="gr-section section pt-0"
        style={{ background: "#000" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="text-center text-white mb-5">We've worked with</h3>
            </div>
          </div>

          <div className="row justify-content-center">
            {clientLogos.map((logo, index) => (
              <div key={index} className="col-lg-2">
                <div
                  className="g-review-wrap text-center rs-logo-hover"
                  data-aos="fade-up"
                >
                  <div className="rs-logo-hover__item">
                    <img
                      src={`assets/img/we-work/${logo}`}
                      alt={`Client logo ${index + 1}`}
                      className="img-fluid"
                      loading="lazy"
                      width="150"
                      height="80"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="gr-section light-background section pt-5 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="g-review-wrap text-center" data-aos="fade-up">
                <img
                  src="assets/img/reviewimg.png"
                  alt="Google reviews and client testimonials"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
