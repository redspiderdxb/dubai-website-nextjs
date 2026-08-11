export default function BlogStats({ data }) {
  // Get data from API or use fallback
  const blogTitle = data?.blog_title || "From Our Blog";
  const blogPosts =
    data?.blog_posts?.length > 0
      ? data.blog_posts
      : [
          {
            id: 1,
            title:
              "Understanding the Ongoing Costs of a Custom Real Estate Website",
            image: "assets/img/blog/custom-real-estate-website.webp",
            link: "https://www.redspider.ae/custom-real-estate-website-maintenance-costs/",
          },
          {
            id: 2,
            title:
              "Why Professional Website Design Matters for Businesses in Dubai",
            image: "assets/img/blog/Professional-Website-Design.webp",
            link: "https://www.redspider.ae/custom-real-estate-website-maintenance-costs/",
          },
        ];

  const clientLogos =
    data?.client_logos?.length > 0
      ? data.client_logos
      : [
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

  const stats =
    data?.stats?.length > 0
      ? data.stats
      : [
          { number: "500", label: "COMPLETED PROJECTS" },
          { number: "100", label: "5 STAR REVIEWS" },
          { number: "14", label: "YEARS OF EXCELLENCE" },
        ];

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Full URL
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      // Convert localhost backend image URL to live backend URL
      if (imagePath.includes("localhost")) {
        return imagePath.replace(
          "http://localhost/redspider/public",
          "https://redspider.rsworkspace.net/admin/public"
        );
      }

      // Keep external URLs unchanged
      return imagePath;
    }

    // /storage/filename.jpg or storage/filename.jpg
    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
      return `${baseUrl}${cleanPath}`;
    }

    // If it's an asset path (assets/img/...)
    if (imagePath.startsWith("assets/") || imagePath.startsWith("/assets/")) {
      return imagePath;
    }

    // For client logos - check if it's just a filename
    if (!imagePath.includes("/")) {
      return `/assets/img/we-work/${imagePath}`;
    }

    // Fallback
    return imagePath;
  };

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
            <div className="home-blog-title fw-normal">{blogTitle}</div>
          </div>
          <div className="row g-3">
            {blogPosts.map((post, index) => (
              <div
                key={post.id || index}
                className="col-lg-6 aos-init aos-animate"
                data-aos="fade-up"
              >
                <div className="rs-blog-text-card">
                  <div className="blog-img">
                    <img
                      src={getImageUrl(post.image)}
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
            {stats.map((stat, index) => (
              <div key={index} className="col-4">
                <div>
                  <span
                    className="rs-blog-stat-number purecounter"
                    data-purecounter-start="0"
                    data-purecounter-end={parseInt(stat.number) || 0}
                    data-purecounter-duration="0"
                  >
                    {stat.number}
                  </span>
                  <span className="rs-plus"></span>
                </div>
                <p>{stat.label}</p>
              </div>
            ))}
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
                      src={getImageUrl(logo)}
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
                  src={getImageUrl("assets/img/reviewimg.png")}
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