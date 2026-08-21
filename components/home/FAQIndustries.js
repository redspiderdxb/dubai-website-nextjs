export default function FAQIndustries({ data }) {
  // Get data from API or use fallback
  const faqTitle = data?.faq_title || "Frequently Asked Questions";
  const faqDescription =
    data?.faq_description ||
    "Find quick answers to common questions about our services.";
  const faqs = data?.faqs?.length > 0 ? data.faqs : [];

  // Split FAQs into left and right columns
  const midPoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midPoint);
  const rightFaqs = faqs.slice(midPoint);

  // Fallback stats if not available from API
  const stats = [
    { number: "20+", label: "Web Development Experts" },
    { number: "10+", label: "UI/UX Specialists" },
    { number: "10+", label: "Front-End Developers" },
    { number: "14+", label: "Years of Experience" },
  ];

  const industries = [
    "Small & Large Business",
    "Finance & Technology",
    "Petroleum & Government",
    "Manufacturing & Logistics",
    "Hospitality",
    "Real Estate",
    "Corporate",
    "Personal & Portfolio",
    "Healthcare",
    "Construction",
    "Hotel & Tourism",
  ];

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

  return (
    <>
      {/* FAQ Section */}
      <section
        id="rs-faq-sec"
        className="home-faq rs-faq-sec section py-5 light-background"
      >
        <div
          className="container"
          style={{
            maxWidth: "1600px",
            background: "#f6f6f6",
            padding: "40px",
            borderRadius: "30px",
          }}
        >
          <div className="text-center mb-5 border-bottom pb-3">
            <h2 className="fw-bold">{faqTitle}</h2>
            <p>{faqDescription}</p>
          </div>
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-6">
              <div className="accordion" id="homeFaqLeft">
                {leftFaqs.map((faq, index) => (
                  <div className="accordion-item" key={`left-${index}`}>
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-left-${index}`}
                        aria-expanded="false"
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`faq-left-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#homeFaqLeft"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-6">
              <div className="accordion" id="homeFaqRight">
                {rightFaqs.map((faq, index) => (
                  <div className="accordion-item" key={`right-${index}`}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-right-${index}`}
                        aria-expanded="false"
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq-right-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#homeFaqRight"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stak-sec"
        className="stak-sec section darkblue-line pt-0 pb-5"
      >
        <div className="container pb-3" style={{ maxWidth: "1200px" }}>
          <div
            className="section-title text-center text-white mb-1"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h3 className="fw-bold mb-3">
              Comprehensive Web Design of a High Standard
            </h3>
          </div>

          <div className="row align-items-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 text-center mb-4 mb-lg-0"
                data-aos="zoom-in-up"
                data-aos-delay={100 + index * 150}
                data-aos-duration="900"
              >
                <div className="stak-wrap">
                  <div className="stack-no">{stat.number}</div>
                  <div className="stack-desc">
                    <h4>{stat.label}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section
        id="mobile-app-ser"
        className="mobile-app-ser section dark-background rs-service-grid-outline py-0"
      >
        <div
          className="container mb-3"
          style={{ maxWidth: "1200px" }}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-normal" data-aos="fade-up" data-aos-delay="100">
              Built on Experience and Quality 
            </h2>
            <p className="mb-4" data-aos="fade-up" data-aos-delay="250">
              RedSpider is a Dubai-based web design and development agency with
              over 14 years of experience delivering high-performance digital
              solutions. Our team combines technical expertise with strategic
              thinking to build websites that are visually compelling,
              user-friendly, and built for long-term growth.
            </p>
            <p data-aos="fade-up" data-aos-delay="400">
              With a strong foundation in UI/UX design and modern development
              frameworks, we create secure, scalable, and performance-driven
              websites tailored to each client's goals. Every project is managed
              with transparency, structured workflows, and a commitment to
              quality ensuring measurable business impact.
            </p>
          </div>
        </div>

        <div
          className="container"
          style={{ maxWidth: "1100px" }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
        >
          <div className="section-title text-center text-white mb-0 mt-2">
            <h2 className="fw-normal" data-aos="fade-up" data-aos-delay="200">
              Industries We Serve
            </h2>
            <p className="pb-0" data-aos="fade-up" data-aos-delay="350">
              Customized web solutions for businesses across multiple industries
              in Dubai and the UAE.
            </p>
          </div>
        </div>

        <div className="container bg-red" style={{ maxWidth: "100%" }}>
          <div className="rs-marquee">
            <div className="rs-marquee-track">
              {industries.map((industry, index) => (
                <span key={index}>{industry}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
