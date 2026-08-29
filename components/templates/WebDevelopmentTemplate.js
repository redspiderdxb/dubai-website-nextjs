// frontend/components/templates/WebDevelopmentTemplate.js

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";
import GoogleReviews from "../ui/GoogleReviews";

export default function WebDevelopmentTemplate({ data }) {
  // ============================================
  // DYNAMIC FIELDS - Backend se aayenge
  // ============================================

  const {
    // Basic
    name = "Web Development",
    description = "",

    // Hero
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
    cta_title = "Ready to start your next website project?",
    cta_description = "Talk to RedSpider about a website, app or digital experience for your business in Dubai and the UAE.",
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
    // FRONTEND SETTINGS
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

    // Content Customization
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
  // IMAGE URL HELPER
  // ============================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    const image = String(imagePath).trim();

    if (!image) return "";

    // Already valid absolute HTTPS URL
    if (image.startsWith("https://")) {
      return image;
    }

    // HTTP URL except localhost
    if (
      image.startsWith("http://") &&
      !image.includes("localhost") &&
      !image.includes("127.0.0.1")
    ) {
      return image;
    }

    // --------------------------------------------
    // Convert localhost URLs
    // --------------------------------------------

    if (
      image.includes("localhost/redspider/public") ||
      image.includes("127.0.0.1/redspider/public")
    ) {
      return image.replace(
        /^https?:\/\/(localhost|127\.0\.0\.1)\/redspider\/public/,
        process.env.NEXT_PUBLIC_IMAGE_URL ||
          "https://redspider.rsworkspace.net/admin/public",
      );
    }

    // --------------------------------------------
    // Convert localhost with only storage path
    // --------------------------------------------

    if (image.includes("localhost") && image.includes("/storage/")) {
      const storageIndex = image.indexOf("/storage/");

      return `${
        process.env.NEXT_PUBLIC_IMAGE_URL ||
        "https://redspider.rsworkspace.net/admin/public"
      }${image.substring(storageIndex)}`;
    }

    if (image.includes("127.0.0.1") && image.includes("/storage/")) {
      const storageIndex = image.indexOf("/storage/");

      return `${
        process.env.NEXT_PUBLIC_IMAGE_URL ||
        "https://redspider.rsworkspace.net/admin/public"
      }${image.substring(storageIndex)}`;
    }

    // --------------------------------------------
    // Relative /storage path
    // --------------------------------------------

    if (image.startsWith("/storage/")) {
      return `${
        process.env.NEXT_PUBLIC_IMAGE_URL ||
        "https://redspider.rsworkspace.net/admin/public"
      }${image}`;
    }

    // --------------------------------------------
    // Relative storage path
    // --------------------------------------------

    if (image.startsWith("storage/")) {
      return `${
        process.env.NEXT_PUBLIC_IMAGE_URL ||
        "https://redspider.rsworkspace.net/admin/public"
      }/${image}`;
    }

    // --------------------------------------------
    // Other relative paths
    // --------------------------------------------

    return image;
  };

  // ============================================
  // LIGHTBOX STATE
  // ============================================

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ============================================
  // REMOVE DUPLICATE IMAGE PATHS
  // AND LIMIT TO ONLY 9 ITEMS
  // ============================================

  const uniqueGallery = Array.from(
    new Map(
      (gallery || [])
        .filter((item) => item?.image)
        .map((item) => [item.image, item]),
    ).values(),
  );

  // ============================================
  // ONLY 9 ITEMS
  // ============================================

  const limitedGallery = uniqueGallery.slice(0, 9);

  // ============================================
  // LIGHTBOX SLIDES
  // IMPORTANT:
  // Use converted image URL here too
  // ============================================

  const lightboxSlides = limitedGallery.map((item) => ({
    src: getImageUrl(item.image),
  }));

  // ============================================
  // FALLBACK BENEFITS
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

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* ============================================
          LIGHTBOX
      ============================================ */}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />

      {/* ============================================
          HERO
      ============================================ */}

      {show_hero && (
        <section
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${getImageUrl(hero_background)})`
              : hero_image
                ? `url(${getImageUrl(hero_image)})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12" data-aos="fade-right">
                <div className="rs-process-title-sec">
                  <h1 className="rs-process-title mb-3">
                    Web Development
                    {hero_subtitle && (
                      <span className="rs-process-highlight">
                        Company in Dubai
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
                    )}
                  </h1>

                  {hero_description && (
                    <p className="rs-process-text mb-3">
                      RedSpider provides custom web development solutions for
                      businesses that need reliable, scalable and easy-to-manage
                      websites. From CMS development and WordPress solutions to
                      custom functionality and integrations, we build websites
                      around practical business and technical requirements.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FEATURES GRID
      ============================================ */}

      {show_features && features.length > 0 && (
        <section className="re-process py-5">
          <div className="container pt-lg-5">
            <div className="row justify-content-center text-center">
              <div className="col-lg-12" data-aos="fade-up">
                <div className="title-wrap text-start cus-title-ani-1">
                  <h2 className="rs-main-title text-black fw-bold">
                    {features_title}
                  </h2>

                  <p className="cus-20 text-black mb-0">{features_subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-lg-5">
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
                      {feature.icon && <i className={`${feature.icon}`}></i>}
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

      {/* ============================================
          BENEFITS - WHY REDSPIDER
      ============================================ */}

      {show_benefits && finalBenefits.length > 0 && (
        <section className="rsu-creative-sec">
          <div className="container px-lg-5">
            <div className="rsu-scene">
              <span className="rsu-red-line"></span>

              <div className="rsu-content">
                <div className="row g-0 h-100">
                  {/* LEFT COLUMN */}

                  <div className="col-lg-6 rsu-left-col">
                    <div className="rsu-left-inner">
                      <h2 className="rsu-main-title desc">
                        Why Businesses Choose RedSpider for Web Development
                      </h2>

                      <div className="rsu-bottom-left">
                        <p className="rsu-intro">{benefits_subtitle}</p>

                        <a href="#" className="rsu-btn">
                          View Our Works
                          <i className="bi bi-arrow-up-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}

                  <div className="col-lg-6 rsu-right-col">
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
                              className={`rsu-accordion-btn ${
                                index === 0 ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#rsu${index + 1}`}
                              aria-expanded={index === 0 ? "true" : "false"}
                            >
                              <h3 className="hjs">
                                <span className="rsu-acc-num">
                                  {String(index + 1).padStart(2, "0")}
                                </span>

                                <strong className="rsu-acc-title">
                                  {point.title}
                                </strong>

                                <i className="bi bi-plus-lg rsu-acc-icon"></i>
                              </h3>
                            </button>

                            <div
                              id={`rsu${index + 1}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
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
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          PROCESS ACCORDION
      ============================================ */}

      {show_processes && processes.length > 0 && (
        <section className="archidex-accordion-sec dark-cs-bg dark-background dev-before pt-0 pb-0">
          <div className="archidex-bg-shape"></div>

          <div className="container" style={{ maxWidth: "1550px" }}>
            <div className="row g-4 g-lg-5 align-items-start justify-content-between">
              <div className="col-lg-5 col-xl-4">
                <h2 className="archidex-title">
                  Custom Development for Business Requirements
                </h2>

                <ul className="archidex-list">
                  <li className="text-white">
                    <span className="fs-5">
                      Every website has different technical requirements. We
                      develop solutions around your content, functionality,
                      integrations and future growth, giving your business a
                      website that can evolve as your requirements change.
                    </span>
                  </li>
                </ul>

                <div className="letconnect mt-4 mt-lg-5">
                  <span className="text-white">Let's Connect :</span>

                  <div className="line"></div>

                  <a href="#contact">Book A Call</a>
                </div>
              </div>

              <div className="col-lg-7 px-lg-4 px-xl-5">
                <div className="archidex-small-title">
                  <h2>
                    Our Web Development
                    <br />
                    Process
                  </h2>
                </div>

                <div
                  className="accordion archidex-accordion"
                  id="webProcessAccordion"
                >
                  {processes.map((process, index) => {
                    const isFirst = index === 0;

                    const collapseId = `process-collapse-${
                      process.id || index
                    }`;

                    return (
                      <div className="accordion-item" key={process.id || index}>
                        <h3 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              isFirst ? "" : "collapsed"
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isFirst ? "true" : "false"}
                          >
                            <span className="arch-no">{index + 1}.</span>

                            <span className="arch-name">{process.title}</span>

                            <span className="arch-arrow">↗</span>
                          </button>
                        </h3>

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

      {/* ============================================
          REVIEW SECTION
      ============================================ */}

      <GoogleReviews />

      {/* ============================================
          GALLERY / PORTFOLIO - ONLY 9 ITEMS
          Homepage-style presentation
          Dynamic backend gallery
          ONLY ZOOM OPTION
          Duplicate image paths removed
          MAX 9 ITEMS SHOWN
      ============================================ */}

      {show_gallery && limitedGallery.length > 0 && (
        <section id="portfolio" className="portfolio section pt-0">
          {/* Gallery Intro */}

          <section className="rs-gd-intro py-5" style={{ background: "none" }}>
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
                      {gallery_title}
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
          </section>

          {/* Portfolio Cards */}

          <div className="container">
            <div
              className="isotope-layout"
              data-default-filter="*"
              data-layout="masonry"
              data-sort="original-order"
            >
              {/* Hidden Filters */}

              <ul
                className="portfolio-filters isotope-filters d-none"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <li data-filter="*" className="filter-active">
                  All
                </li>
              </ul>

              {/* Gallery */}

              <div className="row gy-4 isotope-container">
                {limitedGallery.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                  >
                    <div className="portfolio-content h-100">
                      {/* IMAGE */}

                      <img
                        src={getImageUrl(item.image)}
                        className="img-fluid"
                        alt={item.title || "Gallery Image"}
                        loading="lazy"
                      />

                      {/* Overlay */}

                      <div className="portfolio-info">
                        <h3>{item.title || "Portfolio Project"}</h3>

                        {item.description && <p>{item.description}</p>}

                        {/* ONLY ZOOM BUTTON */}

                        <button
                          type="button"
                          className="preview-link border-0 bg-transparent text-white"
                          title={item.title || "Preview"}
                          aria-label={`Preview ${
                            item.title || "portfolio project"
                          }`}
                          onClick={() => {
                            setLightboxIndex(index);
                            setLightboxOpen(true);
                          }}
                        >
                          <i className="bi bi-zoom-in" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FAQ
      ============================================ */}

      {show_faqs && faqs.length > 0 && (
        <section
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section py-5 light-background"
        >
          <div
            className="container"
            style={{
              background: "#f6f6f6",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <div className="text-center mb-5 border-bottom pb-3">
              <h2 className="fw-bold">{faqs_title}</h2>

              <p>{faqs_subtitle}</p>
            </div>

            <div className="row g-4">
              {/* LEFT FAQ */}

              <div className="col-lg-6">
                <div className="accordion" id="homeFaqLeft">
                  {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id || `left-${faq.question}`}
                    >
                      <h3 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-left-${faq.id || faq.question}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

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

              {/* RIGHT FAQ */}

              <div className="col-lg-6">
                <div className="accordion" id="homeFaqRight">
                  {faqs.slice(Math.ceil(faqs.length / 2)).map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id || `right-${faq.question}`}
                    >
                      <h3 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-right-${
                            faq.id || faq.question
                          }`}
                        >
                          {faq.question}
                        </button>
                      </h3>

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

      {/* ============================================
          CTA
      ============================================ */}

      {show_cta && <ServiceCTA service={data} />}
    </>
  );
}
