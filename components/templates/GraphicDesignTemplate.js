// frontend/components/templates/GraphicDesignTemplate.js

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function GraphicDesignTemplate({ data }) {
  // ============================================
  // LIGHTBOX STATE
  // ============================================

  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  // ============================================
  // LOADING
  // ============================================

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  // ============================================
  // DYNAMIC FIELDS
  // ============================================

  const {
    name,
    description,
    content,
    image,

    hero_title,
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,

    intro_small_heading = "Graphic Design · Dubai",
    intro_main_heading = "",
    intro_description = "At RedSpider Web & Art Design, we offer professional graphic design services in Dubai to help businesses build a strong and consistent identity. Our creative team designs visuals that are not only impressive but communicate your brand's message clearly.",
    intro_image = "",

    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,

    // ============================================
    // REPEATER DATA
    // ============================================

    features = [],
    benefits = [],
    processes = [],
    faqs = [],
    gallery = [],

    // ============================================
    // FRONTEND SETTINGS
    // ============================================

    layout_style = "grid",
    columns_count = 3,

    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

    // ============================================
    // SECTION VISIBILITY
    // ============================================

    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // ============================================
    // CONTENT CUSTOMIZATION
    // ============================================

    hero_button_text = "Get Started",
    hero_button_url = "/contact",

    features_title = "Our Graphic Design Services",
    features_subtitle = "We offer a wide range of graphic design services tailored to your needs.",

    benefits_title = "Why Choose RedSpider for Graphic Design Services in Dubai?",

    benefits_subtitle = "We have a wealth of experience in the UAE assisting businesses in design to reinforce their branding and drive business growth.",

    processes_title = "Our Graphic Design Process",

    processes_subtitle = "We work hard to create a graphic design that can keep our clients satisfied. Here is how it begins:",

    faqs_title = "Frequently Asked Questions",

    faqs_subtitle = "Find quick answers to common questions about our services.",

    gallery_title = "Our Gallery",
    gallery_subtitle = "",

    cta_subtitle = "",
    cta_button_url = "/contact",

    // ============================================
    // ANIMATION
    // ============================================

    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

    // ============================================
    // SECTION ORDER
    // ============================================

    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "gallery",
      "faqs",
      "cta",
    ],

    // ============================================
    // CUSTOM CODE
    // ============================================

    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================
  // CIRCLE TEXT
  // ============================================

  const circleText = "Years of Design Experience";

  // ============================================
  // FALLBACK DATA
  // ============================================

  // ============================================
  // GRAPHIC SERVICES
  // ============================================

  const graphicServices =
    features.length > 0
      ? features
      : [
          {
            id: 1,
            title: "Business Brochure Design",
            description:
              "Distribute professionally created brochures that feature appealing designs and captivating information about your products and services. Whether it is a meeting, exhibition or marketing campaign, our brochure designs make a good impression.",
          },
          {
            id: 2,
            title: "Logo Design",
            description:
              "Your logo will be the face of your business. Being an established logo design company in Dubai, we develop one-of-a-kind logos that capture the nature and personality of your brand and are easily recognizable on social media, websites, signage, packaging and print media.",
          },
          {
            id: 3,
            title: "Business Card Design",
            description:
              "We can design a professional business card to make a long lasting impression on your potential customers.",
          },
          {
            id: 4,
            title: "Letterhead Design",
            description:
              "Establish a business identity by using custom designed letterhead design to make your business documents look elegant and consistent.",
          },
          {
            id: 5,
            title: "Flyer Design",
            description:
              "Are you promoting an event or launching a new product or special offer? No doubt, the creative flyers can help you do your work successfully. We design visually appealing flyers that will cater to your needs.",
          },
          {
            id: 6,
            title: "Banner & Advertising Design",
            description:
              "We create digital and print marketing assets such as website banners, social media graphics, online ads, promotional posters, exhibition graphics, and more, all branded to enhance your marketing efforts.",
          },
        ];

  // ============================================
  // BENEFIT CARDS
  // ============================================

  const benefitCards =
    benefits.length > 0
      ? benefits
      : [
          {
            id: 1,
            title: "Dedicated In-House Creative Team",
            description:
              "The highly experienced designers collaborate with the clients to provide innovative solutions without compromising standards across all projects.",
            icon: "bi-person-badge",
          },
          {
            id: 2,
            title: "Design with Purpose",
            description:
              "All designs we create have a clear purpose to convey your brand's message across various customers.",
            icon: "bi-rocket-takeoff",
          },
          {
            id: 3,
            title: "Fast Delivery & Clear Communication",
            description:
              "We value your time. We have a streamlined workflow, clear communication and timely updates, so that each project remains on schedule.",
            icon: "bi-people",
          },
          {
            id: 4,
            title: "Print & Digital Ready Designs",
            description:
              "Each design is presented in professional formats for commercial print, web, social media, presentations and other digital media.",
            icon: "bi-clock-history",
          },
        ];

  // ============================================
  // PROCESS DATA
  // ============================================

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We analyze your business goals, target audience, and design requirements to create a clear project roadmap.",
          },
          {
            title: "Concept Development",
            description:
              "We create multiple design concepts based on your brand identity and project requirements.",
          },
          {
            title: "Design Refinement",
            description:
              "We refine the chosen design based on your feedback and brand guidelines.",
          },
          {
            title: "Final Delivery",
            description:
              "We deliver the final design in multiple formats for both print and digital use.",
          },
        ];

  // ============================================
  // FAQ DATA
  // ============================================

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "What graphic design services do you offer in Dubai?",
            answer:
              "We offer a wide range of graphic design services including brochure design, logo design, business card design, letterhead design, flyer design, banner design, and advertising design.",
          },
          {
            question:
              "How long does it take to complete a graphic design project?",
            answer:
              "Timelines depend on project complexity. Simple designs typically take 2-5 days, while comprehensive branding projects may take 1-2 weeks.",
          },
          {
            question: "Do you provide print-ready files?",
            answer:
              "Yes, all designs are delivered in print-ready formats including CMYK, high-resolution PDF, and vector files for commercial printing.",
          },
          {
            question: "Can you redesign my existing brand materials?",
            answer:
              "Yes, we offer rebranding and redesign services to modernize your existing brand materials while maintaining brand recognition.",
          },
        ];

  // ============================================
  // GALLERY DATA
  // ============================================

  const galleryImages =
    Array.isArray(gallery) && gallery.length > 0 ? gallery : [];

  // ============================================
  // REMOVE DUPLICATE IMAGE PATHS
  //
  // Same backend image path = only one card
  // ============================================

  const uniqueGalleryImages = Array.from(
    new Map(
      galleryImages
        .filter(
          (item) =>
            item && typeof item.image === "string" && item.image.trim() !== "",
        )
        .map((item) => [item.image.trim(), item]),
    ).values(),
  );

  // ============================================
  // LIGHTBOX SLIDES
  // ============================================

  const gallerySlides = uniqueGalleryImages.map((item) => ({
    src: item.image,
  }));

  // ============================================
  // DYNAMIC STYLES
  // ============================================

  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  // ============================================
  // SECTION MAP
  // ============================================

  const sectionMap = {
    // ============================================
    // HERO
    // ============================================

    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },

    // ============================================
    // INTRO
    // ============================================

    intro: {
      component: (
        <section key="intro" className="rs-gd-intro">
          <span className="rs-gd-intro__shape" aria-hidden="true"></span>

          <div className="container-fluid px-3 px-md-4 px-xl-5">
            <div className="row gx-xl-5 align-items-start">
              <div className="col-lg-3">
                <div className="rs-gd-intro__rail">
                  <span className="rs-gd-intro__rail-icon">
                    <i className="bi bi-bezier2"></i>
                  </span>

                  <span className="rs-gd-intro__rail-text">
                    {intro_small_heading}
                  </span>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="rs-gd-intro__copy">
                  <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                    {intro_description}
                  </p>

                  <p className="rs-gd-intro__support rs-gd-intro__reveal">
                    Whether you are a startup launching a new brand or an
                    established company revamping your marketing strategies, we
                    create designs that are tailored to meet your goals. Every
                    project is carefully planned to ensure consistency whether
                    for print or digital platforms.
                  </p>

                  <div className="rs-gd-intro__footer">
                    <a
                      className="rs-gd-intro__link"
                      href="#graphic-design-services"
                    >
                      <span>Explore our designs</span>

                      <i className="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-2">
                <div className="rs-gd-intro__meta">Creative since 2010</div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_intro,
    },

    // ============================================
    // FEATURES
    // ============================================

    features: {
      component: (
        <section key="features" className="premium-services-section">
          <div className="premium-container">
            <div className="premium-grid">
              {/* LEFT */}

              <div className="premium-col premium-col-left">
                <div className="premium-services">
                  <span className="premium-badge">SERVICES</span>

                  <h2 className="premium-title">{features_title}</h2>

                  <p className="premium-subtitle">{features_subtitle}</p>

                  <div className="premium-accordion">
                    {graphicServices.map((service, index) => (
                      <div
                        key={service.id || index}
                        className="premium-accordion-item"
                      >
                        <button
                          className={`premium-accordion-btn ${
                            index === 0 ? "active" : ""
                          }`}
                          onClick={(e) => {
                            const btn = e.currentTarget;

                            const item = btn.parentElement;

                            const body = item.querySelector(
                              ".premium-accordion-body",
                            );

                            const isActive = btn.classList.contains("active");

                            const allItems = document.querySelectorAll(
                              ".premium-col-left .premium-accordion-item",
                            );

                            allItems.forEach((el) => {
                              el.querySelector(
                                ".premium-accordion-btn",
                              ).classList.remove("active");

                              el.querySelector(
                                ".premium-accordion-body",
                              ).classList.remove("active");
                            });

                            if (!isActive) {
                              btn.classList.add("active");

                              body.classList.add("active");

                              const images = document.querySelectorAll(
                                ".premium-main-image",
                              );

                              images.forEach((img) =>
                                img.classList.remove("active"),
                              );

                              const targetImage = document.querySelector(
                                `.premium-main-image-${index + 1}`,
                              );

                              if (targetImage) {
                                targetImage.classList.add("active");
                              }
                            }
                          }}
                        >
                          <span className="premium-accordion-icon">
                            {index === 0 ? "−" : "+"}
                          </span>

                          <span className="premium-accordion-title">
                            {service.title}
                          </span>
                        </button>

                        <div
                          className={`premium-accordion-body ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <p className="premium-accordion-text">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="premium-connect">
                    <span className="premium-connect-label">
                      Know More About:
                    </span>

                    <div className="premium-connect-line"></div>

                    <a href="#" className="premium-connect-link">
                      Contact us
                    </a>
                  </div>
                </div>
              </div>

              {/* CENTER */}

              <div className="premium-col premium-col-center">
                <div className="premium-image-wrapper">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <img
                      key={num}
                      className={`premium-main-image premium-main-image-${num} ${
                        num === 1 ? "active" : ""
                      }`}
                      src={`https://images.unsplash.com/photo-${
                        num === 1
                          ? "1497366754035-f200968a6e72"
                          : num === 2
                            ? "1517048676732-d65bc937f952"
                            : num === 3
                              ? "1556761175-b413da4baf72"
                              : num === 4
                                ? "1497366811353-6870744d04b2"
                                : num === 5
                                  ? "1552664730-d307ca884978"
                                  : "1556761175-4b46a572b786"
                      }?q=80&w=1400&auto=format&fit=crop`}
                      alt="Design showcase"
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT */}

              <div className="premium-col premium-col-right">
                <div className="premium-process">
                  <div className="premium-process-header">
                    <span className="premium-badge">PROCESS</span>

                    <h6 className="premium-process-title">Our Process</h6>
                  </div>

                  <p className="premium-process-subtitle">
                    {processes_subtitle}
                  </p>

                  <div className="premium-process-accordion">
                    {processData.map((process, index) => (
                      <div
                        key={process.id || index}
                        className={`premium-process-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <button
                          className="premium-process-btn"
                          onClick={(e) => {
                            const btn = e.currentTarget;

                            const item = btn.parentElement;

                            const isActive = item.classList.contains("active");

                            const allItems = document.querySelectorAll(
                              ".premium-col-right .premium-process-item",
                            );

                            allItems.forEach((el) =>
                              el.classList.remove("active"),
                            );

                            if (!isActive) {
                              item.classList.add("active");
                            }
                          }}
                        >
                          <span className="premium-process-number">
                            {index + 1}.
                          </span>

                          <span className="premium-process-name">
                            {process.title}
                          </span>

                          <span className="premium-process-arrow">↗</span>
                        </button>

                        <div className="premium-process-body">
                          <p className="premium-process-text">
                            {process.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_features,
    },

    // ============================================
    // BENEFITS
    // ============================================

    benefits: {
      component: (
        <section key="benefits" className="rs-benefits-v2">
          <div className="rs-benefits-v2__container">
            <h2 className="rs-benefits-v2__title">{benefits_title}</h2>

            <div className="rs-benefits-v2__grid">
              <div className="rs-benefits-v2__connect">
                <span className="rs-benefits-v2__connect-text">
                  Let's Connect :
                </span>

                <span className="rs-benefits-v2__connect-line"></span>

                <a
                  href={cta_button_link || "#"}
                  className="rs-benefits-v2__button"
                >
                  {cta_button_text || "Book A Call"}
                </a>
              </div>

              <div className="rs-benefits-v2__description">
                <p>{benefits_subtitle}</p>
              </div>

              <div className="rs-benefits-v2__right">
                <span className="rs-benefits-v2__horizontal-line"></span>

                <div className="rs-benefits-v2__circle">
                  <div
                    className="rs-benefits-v2__circle-text"
                    aria-hidden="true"
                  >
                    {circleText.split("").map((char, index) => (
                      <span
                        key={index}
                        style={{
                          transform: `rotate(${
                            index * (360 / circleText.length)
                          }deg) translate(42px)`,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>

                  <span className="rs-benefits-v2__circle-center">14+</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_benefits,
    },

    // ============================================
    // PROCESSES
    // ============================================

    processes: {
      component: (
        <section key="processes" className="rs-vertical-cards">
          <div className="rs-vertical-cards__sticky">
            <div className="rs-vertical-cards__label">Scroll to explore</div>

            <h2 className="rs-vertical-cards__word fw-bold text-uppercase text-white">
              Why US
            </h2>

            {benefitCards.map((card, index) => (
              <div
                key={card.id || index}
                className={`rs-vertical-cards__lane rs-vertical-cards__lane--${
                  index + 1
                }`}
              >
                <article className="rs-vertical-cards__card">
                  <div className="rs-vertical-cards__card-inner">
                    <div className="rs-vertical-cards__card-head">
                      <i
                        className={`bi ${
                          card.icon || "bi-star"
                        } rs-vertical-cards__icon`}
                      ></i>

                      <h3 className="rs-vertical-cards__title">{card.title}</h3>
                    </div>

                    <p className="rs-vertical-cards__text">
                      {card.description}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      ),

      show: show_processes,
    },

    // ============================================
    // GALLERY
    //
    // HOMEPAGE PORTFOLIO UI
    // Dynamic backend images
    // Duplicate paths removed
    // Zoom only
    // NO WEBSITE URL
    // ============================================

    gallery: {
      component: (
        <>
          {/* ============================================
              LIGHTBOX
          ============================================ */}

          <Lightbox
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />

          {/* ============================================
              HOMEPAGE PORTFOLIO LAYOUT
          ============================================ */}

          <section id="portfolio" className="portfolio section pt-0">
            <div className="container">
              <div
                className="isotope-layout"
                data-default-filter="*"
                data-layout="masonry"
                data-sort="original-order"
              >
                {/* ============================================
                    PORTFOLIO INTRO
                    Same presentation style
                ============================================ */}

                <div className="rs-gd-intro py-5">
                  <div className="container-fluid px-3 px-md-4 px-xl-5">
                    <div className="row align-items-center">
                      <div className="col-12">
                        <div
                          className="rs-gd-intro__copy"
                          style={{
                            maxWidth: "100%",
                            margin: "auto",
                          }}
                        >
                          <h2
                            className="rs-gd-intro__lead rs-gd-intro__reveal fade-title mb-3"
                            style={{
                              maxWidth: "1000px",
                              margin: "auto",
                            }}
                          >
                            {gallery_title || "Our Gallery"}
                          </h2>

                          {gallery_subtitle && (
                            <p className="rs-gd-intro__lead rs-gd-intro__reveal text-center fs-5">
                              {gallery_subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================
                    HIDDEN FILTERS
                    Same homepage behavior
                ============================================ */}

                <ul
                  className="portfolio-filters isotope-filters d-none"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                </ul>

                {/* ============================================
                    HOMEPAGE PORTFOLIO GRID
                ============================================ */}

                <div className="row gy-4 isotope-container">
                  {uniqueGalleryImages.length > 0 ? (
                    uniqueGalleryImages.map((item, index) => (
                      <div
                        key={`${item.image}-${index}`}
                        className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                      >
                        <div
                          className="portfolio-content h-100"
                          onClick={() => {
                            setGalleryLightboxIndex(index);

                            setGalleryLightboxOpen(true);
                          }}
                          role="button"
                          tabIndex={0}
                          style={{
                            cursor: "zoom-in",
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();

                              setGalleryLightboxIndex(index);

                              setGalleryLightboxOpen(true);
                            }
                          }}
                        >
                          {/* ============================================
                                IMAGE
                            ============================================ */}

                          <img
                            src={item.image}
                            className="img-fluid"
                            alt={item.title || "Gallery Image"}
                            loading="lazy"
                          />

                          {/* ============================================
                                HOMEPAGE INFO OVERLAY
                                NO URL ICON
                            ============================================ */}

                          <div className="portfolio-info">
                            <h3>{item.title || "Gallery Image"}</h3>

                            {item.description && <p>{item.description}</p>}

                            {/* ONLY ZOOM */}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                setGalleryLightboxIndex(index);

                                setGalleryLightboxOpen(true);
                              }}
                              className="preview-link border-0 bg-transparent text-white"
                              style={{
                                fontSize: "1.2rem",
                                cursor: "zoom-in",
                              }}
                              aria-label={`View ${
                                item.title || "Gallery Image"
                              }`}
                            >
                              <i
                                className="bi bi-zoom-in"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p className="text-center py-5">
                        No gallery images available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ),

      show: show_gallery,
    },

    // ============================================
    // FAQ
    // ============================================

    faqs: {
      component: (
        <section
          key="faqs"
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section pb-5 pt-0 light-background"
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
              <h2 className="fw-bold">
                {faqs_title || "Frequently Asked Questions"}
              </h2>

              <p>
                {faqs_subtitle ||
                  "Find quick answers to common questions about our services."}
              </p>
            </div>

            {faqData.length > 0 ? (
              <div className="row g-4">
                {/* LEFT FAQ */}

                <div className="col-lg-6">
                  <div className="accordion" id="faqLeft-graphic">
                    {faqData
                      .slice(0, Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div
                          className="accordion-item"
                          key={faq.id || `left-${idx}`}
                        >
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-graphic-left-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h2>

                          <div
                            id={`faq-graphic-left-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqLeft-graphic"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* RIGHT FAQ */}

                <div className="col-lg-6">
                  <div className="accordion" id="faqRight-graphic">
                    {faqData
                      .slice(Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div
                          className="accordion-item"
                          key={faq.id || `right-${idx}`}
                        >
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-graphic-right-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h2>

                          <div
                            id={`faq-graphic-right-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqRight-graphic"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">No FAQs available</p>
            )}
          </div>
        </section>
      ),

      show: show_faqs,
    },

    // ============================================
    // CTA
    // ============================================

    cta: {
      component: <ServiceCTA service={data} key="cta" />,

      show: show_cta,
    },
  };

  // ============================================
  // RENDER SECTIONS
  // ============================================

  const renderSections = () => {
    let order = section_order;

    if (typeof order === "string") {
      order = order.split(",").map((s) => s.trim());
    }

    if (!Array.isArray(order) || order.length === 0) {
      order = [
        "hero",
        "intro",
        "features",
        "benefits",
        "processes",
        "gallery",
        "faqs",
        "cta",
      ];
    }

    return order
      .map((key) => {
        const section = sectionMap[key];

        if (!section) {
          return null;
        }

        return section.show ? section.component : null;
      })
      .filter(Boolean);
  };

  // ============================================
  // FINAL RENDER
  // ============================================

  return (
    <div style={styles}>
      {custom_css && (
        <style
          dangerouslySetInnerHTML={{
            __html: custom_css,
          }}
        />
      )}

      <main className="service-template">{renderSections()}</main>

      {custom_js && (
        <script
          dangerouslySetInnerHTML={{
            __html: custom_js,
          }}
        />
      )}
    </div>
  );
}
