export default function FAQIndustries({ data }) {
  // ============================================
  // FAQ SECTION
  // ============================================

  const faqTitle = data?.faq_title || "Frequently Asked Questions";

  const faqDescription =
    data?.faq_description ||
    "Find quick answers to common questions about our services.";

  // API is returning FAQs as an object:
  // {
  //   0: {...},
  //   1: {...},
  //   2: {...},
  //   ...
  // }
  //
  // Convert object to array safely.
  const faqSource = data?.faqs;

  const faqArray = Array.isArray(faqSource)
    ? faqSource
    : faqSource && typeof faqSource === "object"
      ? Object.values(faqSource)
      : [];

  // Only valid FAQs + maximum 10 for homepage
  const faqs = faqArray
    .filter((faq) => faq?.question && faq?.answer)
    .slice(0, 10);

  // Split 10 FAQs into two columns
  const midPoint = Math.ceil(faqs.length / 2);

  const leftFaqs = faqs.slice(0, midPoint);
  const rightFaqs = faqs.slice(midPoint);

  // ============================================
  // STATS
  // ============================================

  const stats = [
    {
      number: "20+",
      label: "Web Development Experts",
    },
    {
      number: "10+",
      label: "UI/UX Specialists",
    },
    {
      number: "10+",
      label: "Front-End Developers",
    },
    {
      number: "14+",
      label: "Years of Experience",
    },
  ];

  // ============================================
  // INDUSTRIES
  // ============================================

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

  return (
    <>
      {/* ==========================================
          FAQ SECTION
      ========================================== */}

      <section
        id="rs-faq-sec"
        className="home-faq rs-faq-sec section py-5"
      >
        <div className="container rs-home-faq-box">
          {/* FAQ HEADER */}

          <div className="text-center mb-3 border-bottom pb-3">
            <h2 className="fw-bold rs-process-title">{faqTitle}</h2>

            <p className="rs-section-subtitle mx-auto text-center">{faqDescription}</p>
          </div>

          {/* FAQ GRID */}

          {faqs.length > 0 ? (
            <div className="row g-4">
              {/* ======================================
                  LEFT COLUMN
              ====================================== */}

              <div className="col-lg-6">
                <div className="accordion" id="homeFaqLeft">
                  {leftFaqs.map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`left-${faq.id || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`faq-left-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-left-${index}`}
                          aria-expanded="false"
                          aria-controls={`faq-left-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

                      <div
                        id={`faq-left-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`faq-left-heading-${index}`}
                        data-bs-parent="#homeFaqLeft"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ======================================
                  RIGHT COLUMN
              ====================================== */}

              <div className="col-lg-6">
                <div className="accordion" id="homeFaqRight">
                  {rightFaqs.map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`right-${faq.id || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`faq-right-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-right-${index}`}
                          aria-expanded="false"
                          aria-controls={`faq-right-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

                      <div
                        id={`faq-right-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`faq-right-heading-${index}`}
                        data-bs-parent="#homeFaqRight"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="mb-0">No frequently asked questions available.</p>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          STATS SECTION
      ========================================== */}

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
            <h3 className="fw-bold mb-3 rs-process-title rs-process-title-sm">
              Comprehensive Web Design of a High Standard
            </h3>
          </div>

          <div className="row align-items-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="col-lg-3 col-6 text-center mb-4 mb-lg-0"
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

      {/* ==========================================
          INDUSTRIES SECTION
      ========================================== */}

      <section
        id="mobile-app-ser"
        className="mobile-app-ser section dark-background rs-service-grid-outline pb-0"
      >
        {/* EXPERIENCE CONTENT */}

        <div
          className="container mb-3"
          style={{ maxWidth: "1200px" }}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="section-title text-center text-white mb-3">
            <h2 className="rs-process-title" data-aos="fade-up" data-aos-delay="100">
              Built on Experience and Quality
            </h2>

            <p className="mb-4 rs-section-subtitle mx-auto text-center" data-aos="fade-up" data-aos-delay="250">
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

        {/* INDUSTRIES TITLE */}

        <div
          className="container"
          style={{ maxWidth: "1100px" }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
        >
          <div className="section-title text-center text-white mb-0 mt-2">
            <h2 className="rs-process-title" data-aos="fade-up" data-aos-delay="200">
              Industries We Serve
            </h2>

            <p className="pb-0 rs-section-subtitle mx-auto text-center" data-aos="fade-up" data-aos-delay="350">
              Customized web solutions for businesses across multiple industries
              in Dubai and the UAE.
            </p>
          </div>
        </div>

        {/* INDUSTRIES MARQUEE */}

        <div className="container bg-red" style={{ maxWidth: "100%" }}>
          <div className="rs-marquee">
            <div className="rs-marquee-track">
              {industries.map((industry, index) => (
                <span key={`${industry}-${index}`}>{industry}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
