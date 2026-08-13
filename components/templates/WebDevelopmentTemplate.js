// frontend/components/templates/WebDevelopmentTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function WebDevelopmentTemplate({ data }) {
  // ============================================
  // ✅ DYNAMIC FIELDS - Backend se aayenge, fallback hardcoded values
  // ============================================
  const {
    // Basic
    name = "Web Development",
    description = "",

    // Hero - ServiceHero component handle karega
    hero_title = "Why Website Development Matters for Business Growth",
    hero_subtitle = "RedSpider Web Solutions",
    hero_description = "A strong website is the foundation of digital presence. Structured layout, clear navigation, and responsive design ensure businesses communicate effectively across all devices.",
    hero_image = "",
    hero_background = "",

    // Intro
    intro_small_heading = "Web Development · Dubai, UAE",
    intro_main_heading = "Professional Web Development Services in Dubai",
    intro_description = "We build modern websites that reflect your brand. Our team creates responsive, SEO-friendly websites that help businesses grow online.",
    intro_image = "",

    // CTA
    cta_title = "Ready to build a strong brand identity?",
    cta_description = "Let RedSpider create a professional logo that represents your business the right way.",
    cta_button_text = "Schedule Free Consultation",
    cta_button_link = "#",
    cta_background = "",

    // Repeater Data
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],

    // ============================================
    // 🆕 NEW - Frontend Settings (with hardcoded fallbacks)
    // ============================================

    // Section Visibility
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // Content Customization (Hardcoded fallbacks)
    features_title = "Our Web Development Services",
    features_subtitle = "At RedSpider, we offer a wide range of web development services to cater to your needs.",
    benefits_title = "Why is RedSpider a Trustworthy choice for Businesses?",
    benefits_subtitle = "RedSpider has earned trust by offering top notch services to various businesses in the industry. You can choose us for the following:",
    processes_title = "Web Design & Development in Dubai",
    processes_subtitle = "Dubai is a web design and development company with extensive experience and track record.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about our services.",
    gallery_title = "Our Work",
    gallery_subtitle = "",
    cta_subtitle = "",
    cta_button_url = "/contact",
  } = data || {};

  // ============================================
  // 📌 FALLBACK: Benefits - Agar backend se na aaye toh hardcoded
  // ============================================
  const fallbackBenefits = [
    {
      id: 1,
      title: "Industry Experience Across UAE",
      description:
        "Real Estate, Corporate, Healthcare, Educational, Retail, Service Business sites all over Dubai and the UAE.",
    },
    {
      id: 2,
      title: "Strategic Layout & User Experience",
      description:
        "We develop websites with a clear structure and intuitive navigation that will enhance user engagement.",
    },
    {
      id: 3,
      title: "Conversion-Focused Structure",
      description:
        "Optimized visual flow, Content hierarchy for lead generation, and Clear call to actions.",
    },
    {
      id: 4,
      title: "SEO-Friendly Foundation",
      description:
        "The initial design of a website that is clean, optimized for loading speeds and easy to search.",
    },
    {
      id: 5,
      title: "Custom UI/UX Approach",
      description:
        "The projects are created in accordance with brand requirements and image standards for uniqueness and consistency.",
    },
    {
      id: 6,
      title: "Scalable & Future-Ready",
      description:
        "Flexible design for future updates, integration and business growth.",
    },
    {
      id: 7,
      title: "Transparent Workflow & Timelines",
      description:
        "The benefits of a structured design process are that it will provide clarity all the way from wireframing through to deployment.",
    },
  ];

  const finalBenefits = benefits?.length > 0 ? benefits : fallbackBenefits;

  return (
    <>
      {/* Hero - Only show if enabled */}
      {show_hero && <ServiceHero service={data} />}

      {/* Features Grid */}
      {show_features && features.length > 0 && (
        <section className="re-process py-5 pix-bg">
          <div className="container pt-lg-5" style={{ maxWidth: "1550px" }}>
            <div className="row justify-content-center text-center">
              <div className="col-lg-12" data-aos="fade-up">
                <div className="title-wrap text-start cus-title-ani-1">
                  <h3 className="rs-main-title text-white fw-bold">
                     {features_title}
                  </h3>
                  <p className="cus-20 text-white mb-0">{features_subtitle}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-lg-5" style={{ maxWidth: "1600px" }}>
            <div className="row g-4">
              {features.map((feature, index) => (
                <div
                  key={feature.id || index}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="re-process-card">
                    <div className="re-process-icon">
                      {feature.icon && (
                        <i className={`${feature.icon}`}></i>
                      )}
                    </div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="rs-main-title">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits - Why RedSpider Section */}
      {show_benefits && finalBenefits.length > 0 && (
        <section className="rsu-creative-sec">
          <div className="container-fluid px-lg-5">
            <div className="rsu-scene">
              <span className="rsu-red-line"></span>
              <div className="rsu-content">
                <h2 className="rsu-main-title">{benefits_title}</h2>
                <div className="rsu-bottom-left">
                  <p className="rsu-intro">{benefits_subtitle}</p>
                  <a href="#" className="rsu-btn">
                    View Our Works <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
                <div className="rsu-accordion-wrap">
                  <div className="rsu-mini-title">
                    <span>What we do</span>
                    <i className="bi bi-arrow-down-right"></i>
                  </div>
                  <div className="accordion" id="rsuBusinessAccordion">
                    {finalBenefits.map((point, index) => (
                      <div
                        className="rsu-accordion-item"
                        key={point.id || index}
                      >
                        <button
                          className={`rsu-accordion-btn ${index === 0 ? "" : "collapsed"}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#rsu${index + 1}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                        >
                          <span>{String(index + 1).padStart(2, "0")}</span>{" "}
                          {point.title}
                          <i className="bi bi-plus-lg"></i>
                        </button>
                        <div
                          id={`rsu${index + 1}`}
                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                          data-bs-parent="#rsuBusinessAccordion"
                        >
                          <div className="rsu-accordion-body">
                            {point.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Accordion */}
      {show_processes && processes.length > 0 && (
        <section className="archidex-accordion-sec dark-cs-bg dark-background dev-before pt-0">
          <div className="archidex-bg-shape"></div>

          <div className="container" style={{ maxWidth: "1550px" }}>
            <div className="row g-5 align-items-start justify-content-between">
              <div className="col-lg-4">
                <h2 className="archidex-title">{processes_title}</h2>

                <ul className="archidex-list">
                  <li className="text-white">
                    <span className="fs-5">{processes_subtitle}</span>
                  </li>
                </ul>

                <div className="letconnect mt-5">
                  <span className="text-white">Let's Connect :</span>
                  <div className="line"></div>
                  <a href="#">Book A Call</a>
                </div>
              </div>

              <div className="col-lg-7 px-lg-5">
                <div className="archidex-small-title">
                  <h6>
                    Our <br />
                    Process
                  </h6>
                </div>

                <div
                  className="accordion archidex-accordion"
                  id="webProcessAccordion"
                >
                  {processes.map((process, index) => {
                    const isFirst = index === 0;
                    const collapseId = `process-collapse-${process.id || index}`;

                    return (
                      <div className="accordion-item" key={process.id || index}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isFirst ? "true" : "false"}
                          >
                            <span className="arch-no">{index + 1}.</span>
                            <span className="arch-name">{process.title}</span>
                            <span className="arch-arrow">↗</span>
                          </button>
                        </h2>

                        <div
                          id={collapseId}
                          className={`accordion-collapse collapse ${
                            isFirst ? "show" : ""
                          }`}
                          data-bs-parent="#webProcessAccordion"
                        >
                          <div className="accordion-body">
                            {process.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Review Section - Hamesha show */}
      <section
        id="review-sec"
        className="review-sec section light-background pb-0"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.png"
              alt="Reviews"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {show_gallery && gallery.length > 0 && (
        <section className="opposite-gallery-sec py-0">
          <div className="opposite-gallery-sticky">
            <div className="gallery-title-wrap">
              <h2 className="rs-main-title">{gallery_title}</h2>
              {gallery_subtitle && <p>{gallery_subtitle}</p>}
            </div>
            <div className="gallery-inner">
              <div className="gallery-track top-track">
                {gallery.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`gallery-card ${
                      index % 3 === 0 ? "large" : index % 3 === 2 ? "small" : ""
                    }`}
                  >
                    <img src={item.image} alt={item.title || "Gallery Image"} />
                  </div>
                ))}
              </div>
              {gallery.length > 6 && (
                <div className="gallery-track bottom-track">
                  {gallery.slice(6, 12).map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`gallery-card ${
                        index % 3 === 1
                          ? "large"
                          : index % 3 === 0
                            ? "small"
                            : ""
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title || "Gallery Image"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {show_faqs && faqs.length > 0 && (
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
            <div className="text-start mb-5 border-bottom pb-3">
              <h2 className="fw-bold">{faqs_title}</h2>
              <p>{faqs_subtitle}</p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id="homeFaqLeft">
                  {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id || `left-${faq.question}`}
                    >
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-left-${faq.id || faq.question}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`faq-left-${faq.id || faq.question}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#homeFaqLeft"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion" id="homeFaqRight">
                  {faqs.slice(Math.ceil(faqs.length / 2)).map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id || `right-${faq.question}`}
                    >
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-right-${faq.id || faq.question}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`faq-right-${faq.id || faq.question}`}
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
      )}

      {/* CTA */}
      {show_cta && <ServiceCTA service={data} />}
    </>
  );
}
