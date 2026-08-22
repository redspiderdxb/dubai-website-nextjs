// frontend/components/templates/GraphicDesignTemplate.js

import { Fragment, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function GraphicDesignTemplate({ data }) {
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

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

    features = [],
    benefits = [],
    processes = [],
    faqs = [],
    gallery = [],

    layout_style = "grid",
    columns_count = 3,

    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

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

    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

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

    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================================
  // CIRCLE TEXT
  // ============================================================

  const circleText = "Years of Design Experience";

  // ============================================================
  // INTRO TEXT WORD SPLITTER
  // ============================================================

  const accentWords = [
    "RedSpider",
    "graphic",
    "design",
    "creativity",
    "innovation",
    "Dubai",
    "UAE",
  ];

  const splitTextIntoWords = (text) => {
    if (!text) return null;

    const words = String(text).trim().split(/\s+/);

    return words.map((word, index) => {
      const cleanWord = word
        .replace(/[.,!?;:]+$/g, "")
        .replace(/^["']|["']$/g, "");

      const isAccent = accentWords.includes(cleanWord);

      return (
        <Fragment key={`${cleanWord}-${index}`}>
          <span
            className={`rs-gd-intro__word ${
              isAccent ? "rs-gd-intro__word--accent" : ""
            }`}
          >
            {word}
          </span>

          {index < words.length - 1 ? " " : null}
        </Fragment>
      );
    });
  };

  // ============================================================
  // INTRO WORD SCROLL REVEAL
  // ============================================================

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let retryTimer = null;

    const initIntroWordAnimation = () => {
      if (!window.gsap || !window.ScrollTrigger) {
        return false;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const section = document.querySelector(".rs-gd-intro");

      if (!section) {
        return false;
      }

      const words = section.querySelectorAll(".rs-gd-intro__word");

      if (!words.length) {
        return false;
      }

      const existingTrigger = ScrollTrigger.getById("rs-intro-word-reveal");

      if (existingTrigger) {
        existingTrigger.kill();
      }

      gsap.killTweensOf(words);

      // Initial state
      gsap.set(words, {
        opacity: 0,
        y: 18,
        filter: "blur(7px)",
        willChange: "transform, opacity, filter",
      });

      // Word-by-word scroll reveal
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",

        stagger: {
          each: 0.025,
        },

        scrollTrigger: {
          id: "rs-intro-word-reveal",

          trigger: section,

          start: "top 75%",
          end: "top 20%",

          scrub: 1,

          invalidateOnRefresh: true,

          pin: false,
        },
      });

      ScrollTrigger.refresh();

      return true;
    };

    const firstAttempt = initIntroWordAnimation();

    if (!firstAttempt) {
      let attempts = 0;

      retryTimer = setInterval(() => {
        attempts++;

        const success = initIntroWordAnimation();

        if (success || attempts >= 30) {
          clearInterval(retryTimer);
          retryTimer = null;
        }
      }, 100);
    }

    return () => {
      if (retryTimer) {
        clearInterval(retryTimer);
        retryTimer = null;
      }

      if (window.ScrollTrigger) {
        const trigger = window.ScrollTrigger.getById("rs-intro-word-reveal");

        if (trigger) {
          trigger.kill();
        }
      }

      if (window.gsap) {
        const words = document.querySelectorAll(".rs-gd-intro__word");

        if (words.length) {
          window.gsap.killTweensOf(words);

          window.gsap.set(words, {
            clearProps: "opacity,transform,filter,willChange",
          });
        }
      }
    };
  }, []);

  // ============================================================
  // GRAPHIC SERVICES
  // ============================================================

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

  // ============================================================
  // BENEFITS
  // ============================================================

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

  // ============================================================
  // PROCESS
  // ============================================================

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

  // ============================================================
  // FAQ
  // ============================================================

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

  // ============================================================
  // GALLERY
  // ============================================================

  const galleryImages =
    Array.isArray(gallery) && gallery.length > 0 ? gallery : [];

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

  const gallerySlides = uniqueGalleryImages.map((item) => ({
    src: item.image,
  }));

  // ============================================================
  // DYNAMIC STYLES
  // ============================================================

  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  // ============================================================
  // SECTION MAP
  // ============================================================

  const sectionMap = {
    // ==========================================================
    // HERO
    // Original hero uses about-hero hero-marquee
    // ==========================================================

    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },

    // ==========================================================
    // INTRO
    // Original classes + AOS restored
    // ==========================================================

    intro: {
      component: (
        <section key="intro" className="rs-gd-intro">
          <span className="rs-gd-intro__shape" aria-hidden="true"></span>

          <div className="container px-3 px-md-4 px-xl-5">
            <div className="row gx-xl-5 align-items-start">
              {/* =========================
              LEFT RAIL
          ========================= */}
              <div
                className="col-lg-3"
                data-aos="fade-right"
                data-aos-once="true"
              >
                <div className="rs-gd-intro__rail">
                  <span className="rs-gd-intro__rail-icon">
                    <i className="bi bi-bezier2"></i>
                  </span>

                  <span className="rs-gd-intro__rail-text">
                    {intro_small_heading}
                  </span>
                </div>
              </div>

              {/* =========================
              CENTER CONTENT
          ========================= */}
              <div className="col-lg-7">
                <div className="rs-gd-intro__copy">
                  {/* MAIN INTRO */}
                  <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                    {splitTextIntoWords(intro_description)}
                  </p>

                  {/* SUPPORTING INTRO */}
                  <p className="rs-gd-intro__support rs-gd-intro__reveal">
                    {splitTextIntoWords(
                      "Whether you are a startup launching a new brand or an established company revamping your marketing strategies, we create designs that are tailored to meet your goals. Every project is carefully planned to ensure consistency whether for print or digital platforms.",
                    )}
                  </p>

                  {/* =========================
                  EXPLORE LINK
              ========================= */}
                  <div
                    className="rs-gd-intro__footer"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-aos-duration="800"
                    data-aos-once="true"
                  >
                    <a
                      className="rs-gd-intro__link"
                      href="#graphic-design-services"
                    >
                      <span>Explore our designs</span>

                      <i
                        className="bi bi-arrow-up-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* =========================
              RIGHT META
          ========================= */}
              <div
                className="col-lg-2"
                data-aos="fade-left"
                data-aos-once="true"
              >
                <div className="rs-gd-intro__meta">Creative since 2010</div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_intro,
    },

    // ==========================================================
    // FEATURES
    // Original Archidex classes restored
    // Dynamic data retained
    // ==========================================================

    features: {
      component: (
        <section
          key="features"
          id="graphic-design-services"
          className="archidex-accordion-sec dark-cs-bg dark-background dev-before"
        >
          <div className="archidex-bg-shape"></div>

          <div
            className="container rs-container-reveal"
            style={{ maxWidth: "1550px" }}
          >
            <div className="rs-container-reveal-inner">
              <div>
                <div className="row g-5 align-items-start justify-content-between">
                  {/* LEFT */}

                  <div className="col-lg-5">
                    <h2 className="rs-main-title">{features_title}</h2>

                    <p>{features_subtitle}</p>

                    <div
                      className="accordion rs-studio-list"
                      id="rsStudioAccordion"
                    >
                      {graphicServices.map((service, index) => (
                        <div
                          key={service.id || index}
                          className="accordion-item rs-studio-item"
                        >
                          <h3 className="accordion-header">
                            <button
                              className={`rs-studio-btn ${
                                index !== 0 ? "collapsed" : ""
                              }`}
                              type="button"
                              data-img={index}
                              onClick={(e) => {
                                const btn = e.currentTarget;

                                const allButtons =
                                  document.querySelectorAll(".rs-studio-btn");

                                const allBodies = document.querySelectorAll(
                                  ".rs-studio-list .accordion-collapse",
                                );

                                allButtons.forEach((button) => {
                                  button.classList.add("collapsed");

                                  const symbol =
                                    button.querySelector(".rs-studio-symbol");

                                  if (symbol) {
                                    symbol.textContent = "+";
                                  }
                                });

                                allBodies.forEach((body) => {
                                  body.classList.remove("show");
                                });

                                btn.classList.remove("collapsed");

                                const symbol =
                                  btn.querySelector(".rs-studio-symbol");

                                if (symbol) {
                                  symbol.textContent = "−";
                                }

                                const currentBody = btn
                                  .closest(".rs-studio-item")
                                  ?.querySelector(".accordion-collapse");

                                if (currentBody) {
                                  currentBody.classList.add("show");
                                }

                                document
                                  .querySelectorAll(".rs-studio-img")
                                  .forEach((img) =>
                                    img.classList.remove("active"),
                                  );

                                const targetImage = document.querySelector(
                                  `.rs-studio-img-${index}`,
                                );

                                if (targetImage) {
                                  targetImage.classList.add("active");
                                }
                              }}
                            >
                              <span className="rs-studio-symbol">
                                {index === 0 ? "−" : "+"}
                              </span>

                              <span>{service.title}</span>
                            </button>
                          </h3>

                          <div
                            className={`accordion-collapse collapse ${
                              index === 0 ? "show" : ""
                            }`}
                            data-bs-parent="#rsStudioAccordion"
                          >
                            <div className="accordion-body rs-studio-body">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="letconnect mt-5 d-none">
                      <span>Know More About :</span>
                      <div className="line"></div>
                      <a href="#">Contact us</a>
                    </div>
                  </div>

                  {/* CENTER IMAGE */}

                  <div className="col-lg-2 rs-studio-image-col">
                    <div className="rs-studio-image-wrap">
                      {[
                        "1497366754035-f200968a6e72",
                        "1517048676732-d65bc937f952",
                        "1556761175-b413da4baf72",
                        "1497366811353-6870744d04b2",
                        "1552664730-d307ca884978",
                        "1556761175-4b46a572b786",
                      ].map((photo, index) => (
                        <img
                          key={photo}
                          className={`rs-studio-img rs-studio-img-${index} ${
                            index === 0 ? "active" : ""
                          }`}
                          src={`https://images.unsplash.com/photo-${photo}?q=80&w=1400&auto=format&fit=crop`}
                          alt="Design showcase"
                        />
                      ))}
                    </div>
                  </div>

                  {/* RIGHT PROCESS */}

                  <div className="col-lg-5 px-lg-5">
                    <div className="archidex-small-title mb-3 text-white">
                      <h6 className="text-white">
                        Our <br />
                        Graphic Design
                        <br />
                        Process
                      </h6>
                    </div>

                    <p>{processes_subtitle}</p>

                    <div
                      className="accordion archidex-accordion mt-4"
                      id="archidexAccordion"
                    >
                      {processData.map((process, index) => (
                        <div
                          className="accordion-item"
                          key={process.id || index}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingGraphic${index}`}
                          >
                            <button
                              className={`accordion-button ${
                                index !== 0 ? "collapsed" : ""
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseGraphic${index}`}
                              aria-expanded={index === 0}
                              aria-controls={`collapseGraphic${index}`}
                            >
                              <span className="arch-no">{index + 1}.</span>

                              <span className="arch-name">{process.title}</span>

                              <span className="arch-arrow">↗</span>
                            </button>
                          </h2>

                          <div
                            id={`collapseGraphic${index}`}
                            className={`accordion-collapse collapse ${
                              index === 0 ? "show" : ""
                            }`}
                            aria-labelledby={`headingGraphic${index}`}
                            data-bs-parent="#archidexAccordion"
                          >
                            <div className="accordion-body">
                              {process.description}
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
        </section>
      ),
      show: show_features,
    },

    // ==========================================================
    // BENEFITS
    // Original agency classes + AOS restored
    // ==========================================================

    benefits: {
      component: (
        <section key="benefits" className="rs-agency-intro-sec">
          <div className="container">
            <h2 className="rs-agency-big-title">{benefits_title}</h2>

            <div className="row rs-agency-bottom align-items-center">
              <div className="col-lg-5">
                <div
                  className="letconnect mt-5"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <span
                    data-aos="fade-right"
                    data-aos-delay="100"
                    data-aos-duration="700"
                  >
                    Let's Connect :
                  </span>

                  <div
                    className="line"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    data-aos-duration="700"
                  ></div>

                  <a
                    href={cta_button_link || "#"}
                    data-aos="fade-left"
                    data-aos-delay="300"
                    data-aos-duration="700"
                  >
                    {cta_button_text || "Book A Call"}
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <p className="rs-agency-text">{benefits_subtitle}</p>
              </div>

              <div className="col-lg-1 d-none d-lg-block">
                <div className="rs-agency-line"></div>
              </div>

              <div className="col-lg-1">
                <div className="rs-agency-circle-wrap">
                  <div
                    className="rs-agency-scroll-text"
                    id="rsAgencyCircleText"
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

                  <div className="rs-agency-circle-center">14+</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },

    // ==========================================================
    // PROCESSES / WHY US
    // Original section already same — animations/data-scroll restored
    // ==========================================================

    processes: {
      component: (
        <section key="processes" className="rs-vertical-cards">
          <div className="rs-vertical-cards__sticky">
            {/* =========================
            TOP HEADING
        ========================= */}
            <div className="rs-vertical-cards__top">
              <div className="rs-vertical-cards__label">Scroll to explore</div>

              <h2 className="rs-vertical-cards__word">WHY US</h2>
            </div>

            {/* =========================
            CARDS
        ========================= */}
            <div className="rs-vertical-cards__cards">
              {benefitCards.map((card, index) => {
                const speeds = ["1.04", "1.18", ".94", "1.1"];

                return (
                  <div
                    key={card.id || index}
                    className={`rs-vertical-cards__lane rs-vertical-cards__lane--${
                      index + 1
                    }`}
                  >
                    <article
                      className="rs-vertical-cards__card"
                      data-scroll-speed={speeds[index] || "1"}
                    >
                      <div className="rs-vertical-cards__card-inner">
                        <div className="rs-vertical-cards__card-head">
                          <i
                            className={`bi ${
                              card.icon || "bi-star"
                            } rs-vertical-cards__icon`}
                          ></i>

                          <h3 className="rs-vertical-cards__title">
                            {card.title}
                          </h3>
                        </div>

                        <p className="rs-vertical-cards__text">
                          {card.description}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ),

      show: show_processes,
    },
    // ==========================================================
    // GALLERY
    // ⚠️ SAME CURRENT GALLERY — DO NOT CHANGE
    // ==========================================================

    gallery: {
      component: (
        <>
          <Lightbox
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />
          <section
            id="portfolio"
            className="portfolio section pt-0 rs-custom-gallery"
          >
            <div className="container">
              <div
                className="isotope-layout"
                data-default-filter="*"
                data-layout="masonry"
                data-sort="original-order"
              >
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

                <ul
                  className="portfolio-filters isotope-filters d-none"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                </ul>

                {/* =========================================
          CUSTOM GALLERY GRID
      ========================================= */}

                <div className="rs-custom-gallery-grid">
                  {uniqueGalleryImages.length > 0 ? (
                    uniqueGalleryImages.map((item, index) => (
                      <div
                        key={`${item.image}-${index}`}
                        className="rs-custom-gallery-item"
                      >
                        <div
                          className="rs-custom-gallery-card portfolio-content h-100"
                          onClick={() => {
                            setGalleryLightboxIndex(index);
                            setGalleryLightboxOpen(true);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setGalleryLightboxIndex(index);
                              setGalleryLightboxOpen(true);
                            }
                          }}
                        >
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt={item.title || "Gallery Image"}
                            loading="lazy"
                          />

                          {/* EXISTING HOVER INFO */}
                          <div className="portfolio-info">
                            <h3>{item.title || "Gallery Image"}</h3>

                            {item.description && <p>{item.description}</p>}

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
                    <div className="rs-custom-gallery-empty">
                      <p>No gallery images available</p>
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

    // ==========================================================
    // FAQ
    // Original FAQ classes retained
    // ==========================================================

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

    // ==========================================================
    // CTA
    // ==========================================================

    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

  // ============================================================
  // RENDER SECTIONS
  // ============================================================

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

  // ============================================================
  // FINAL RENDER
  // ============================================================

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
