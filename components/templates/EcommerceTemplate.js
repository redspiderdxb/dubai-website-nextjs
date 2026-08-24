// frontend/components/templates/EcommerceTemplate.js

import { Fragment, useEffect } from "react";

import ServiceCTA from "../services/ServiceCTA";

export default function EcommerceTemplate({ data }) {
  // =========================================================
  // DYNAMIC BACKEND DATA
  // =========================================================

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

    intro_small_heading = "Ecommerce · Dubai",
    intro_main_heading = "",
    intro_description = "At RedSpider we offer the best ecommerce web design and development services in Dubai. Each webstore is built with creativity, innovation and passion. Our team plans each step from product browsing to secure checkout keeping in mind your customer's convenience.",
    intro_image = "",

    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,

    // Repeaters
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],

    // =======================================================
    // FRONTEND SETTINGS
    // =======================================================

    layout_style = "grid",
    columns_count = 3,

    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",

    section_padding = "large",

    // =======================================================
    // SECTION VISIBILITY
    // =======================================================

    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // =======================================================
    // CONTENT
    // =======================================================

    hero_button_text = "Get Started",
    hero_button_url = "/contact",

    features_title = "Ecommerce Website Solutions We Offer",

    features_subtitle = "All solutions are built around your products, customers and business goals.",

    benefits_title = "Why Choose RedSpider for Ecommerce Development Services.",

    benefits_subtitle = "",

    processes_title = "Our Ecommerce Development Process",

    processes_subtitle = "The development process is well planned and delivered without compromising on quality, on time, for each and every ecommerce project.",

    technologies_title = "Ecommerce Platforms We Work With",

    technologies_subtitle = "We will help you decide the best ecommerce platform after discussing the product range, budget, customization needs and future plans for expansion.",

    faqs_title = "Frequently Asked Questions",

    faqs_subtitle = "Find quick answers about our ecommerce website development services.",

    gallery_title = "Our Work",
    gallery_subtitle = "",

    cta_subtitle = "",
    cta_button_url = "/contact",

    // =======================================================
    // ANIMATION SETTINGS
    // =======================================================

    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

    // =======================================================
    // SECTION ORDER
    // =======================================================

    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "technologies",
      "gallery",
      "faqs",
      "cta",
    ],

    custom_css = "",
    custom_js = "",
  } = data || {};

  // =========================================================
  // INTRO TEXT WORD SPLITTER
  // =========================================================

  const accentWords = [
    "RedSpider",
    "ecommerce",
    "creativity",
    "innovation",
    "passion",
    "solutions",
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

  // =========================================================
  // INTRO WORD SCROLL REVEAL
  // =========================================================

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let retryTimer = null;
    let initialized = false;

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

      // Remove previous trigger if it already exists.
      const existingTrigger = ScrollTrigger.getById("rs-intro-word-reveal");

      if (existingTrigger) {
        existingTrigger.kill();
      }

      // Kill any previous word tweens.
      gsap.killTweensOf(words);

      // Initial state.
      gsap.set(words, {
        opacity: 0,
        y: 18,
        filter: "blur(7px)",
        willChange: "transform, opacity, filter",
      });

      // Word-by-word scroll reveal.
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

          // Do not pin the intro section.
          pin: false,
        },
      });

      ScrollTrigger.refresh();

      initialized = true;

      return true;
    };

    // Try immediately.
    const firstAttempt = initIntroWordAnimation();

    // If GSAP/ScrollTrigger is loaded after the component,
    // retry for a short period.
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

      initialized = false;
    };
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  // =========================================================
  // FALLBACK DATA
  // =========================================================

  const solutions =
    features.length > 0
      ? features
      : [
          {
            title: "Custom Ecommerce Website Development",
          },
          {
            title: "Shopify Store Development",
          },
          {
            title: "WooCommerce Development",
          },
          {
            title: "Magento Ecommerce Development",
          },
          {
            title: "Laravel Ecommerce Development",
          },
          {
            title: "Multi-Vendor Marketplace Development",
          },
          {
            title: "Secure Payment Gateway Integration",
          },
          {
            title: "Mobile-Responsive Ecommerce Design",
          },
          {
            title: "Inventory & Order Management Systems",
          },
          {
            title: "Ecommerce Website Redesign & Migration",
          },
          {
            title: "Routine Maintenance & Technical Support",
          },
        ];

  const solutionIcons = [
    "bi-cart-check",
    "bi-shop",
    "bi-wordpress",
    "bi-box-seam",
    "bi-code-slash",
    "bi-diagram-3",
    "bi-credit-card-2-front",
    "bi-phone",
    "bi-box2",
    "bi-arrow-repeat",
    "bi-tools",
  ];

  // =========================================================
  // PLATFORMS
  // =========================================================

  const platforms =
    technologies.length > 0
      ? technologies
      : [
          {
            title: "Shopify",
            description:
              "Shopify is an ideal choice for startups and growing businesses who are looking for a secure solution for their ecommerce store.",
            icon: "shopify",
          },
          {
            title: "WooCommerce",
            description:
              "A great choice for companies that are already on WordPress. WooCommerce is flexible, highly customizable, and comes with a comprehensive suite of plugins.",
            icon: "woocommerce",
          },
          {
            title: "Magento",
            description:
              "Magento is suitable for large organizations that want powerful features and a high level of scalability.",
            icon: "magento",
          },
          {
            title: "Laravel Ecommerce",
            description:
              "A completely custom ecommerce solution, designed to match your business processes, with the highest degree of flexibility, speed and scalability.",
            icon: "laravel",
          },
          {
            title: "Custom Ecommerce Development",
            description:
              "We create custom ecommerce solutions for businesses with special needs, including solutions that integrate with other business systems and processes.",
            icon: "php",
          },
        ];

  // =========================================================
  // PROCESS
  // =========================================================

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We analyze your business goals, target audience, and ecommerce requirements to create a clear project roadmap.",
          },
          {
            title: "Platform Selection",
            description:
              "We help you choose the right ecommerce platform based on your product range, budget, and future plans.",
          },
          {
            title: "Design & Development",
            description:
              "We create visually appealing designs with a focus on user experience and conversion optimization.",
          },
          {
            title: "Testing & Quality Assurance",
            description:
              "We conduct extensive testing to ensure smooth functionality across all devices and browsers.",
          },
          {
            title: "Launch & Support",
            description:
              "We deploy your ecommerce store and provide ongoing technical support and maintenance.",
          },
        ];

  // =========================================================
  // KEY FEATURES
  // =========================================================

  const featureItems =
    benefits.length > 0
      ? benefits
      : [
          {
            title: "Responsive design for desktop, tablets and mobile devices",
            icon: "phone",
          },
          {
            title: "Secure payment gateway integration",
            icon: "shield-check",
          },
          {
            title: "Fast-loading pages for a better user experience",
            icon: "speedometer2",
          },
          {
            title: "Easily manage products and categories",
            icon: "box-seam",
          },
          {
            title: "Enhanced inventory and stock management",
            icon: "boxes",
          },
          {
            title: "Easy-to-use shopping cart and checkout",
            icon: "cart-check",
          },
          {
            title: "Customer accounts and order tracking",
            icon: "person-check",
          },
          {
            title: "Product search and filtering",
            icon: "search",
          },
          {
            title: "SEO-friendly website structure",
            icon: "graph-up-arrow",
          },
          {
            title: "Shipping and tax configurations",
            icon: "truck",
          },
          {
            title: "Easy-to-manage admin dashboard",
            icon: "grid-1x2",
          },
        ];

  // =========================================================
  // INDUSTRIES
  // =========================================================

  const industryItems = [
    "Retail & Fashion",
    "Electronics & Technology",
    "Beauty & Cosmetics",
    "Food & Grocery",
    "Healthcare Products",
    "Furniture & Home Décor",
    "Automotive Parts & Accessories",
    "B2B Wholesale Distribution",
    "Lifestyle & Luxury Brands",
    "Educational Products",
  ];

  // =========================================================
  // WHY CHOOSE
  // =========================================================

  const whyChooseItems = [
    "Experienced Ecommerce Developers",
    "Custom Design Tailored to Your Brand",
    "SEO-Friendly Development Practices",
    "Mobile-First Approach",
    "Secure Coding Standards",
    "Scalable Ecommerce Architecture",
    "Fast Project Delivery",
    "Transparent Communication",
    "Reliable Post-Launch Support",
    "Solutions for Long-Term Growth",
  ];

  const whyChooseIcons1 = [
    "person-workspace",
    "palette",
    "search",
    "phone",
    "shield-check",
  ];

  const whyChooseIcons2 = [
    "diagram-3",
    "lightning-charge",
    "chat-dots",
    "headset",
    "graph-up-arrow",
  ];

  // =========================================================
  // FAQ
  // =========================================================

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question:
              "How much does ecommerce website development cost in Dubai?",
            answer:
              "The cost depends on factors such as platform choice, features, design complexity, and integration requirements. We provide customized quotes based on your specific needs.",
          },
          {
            question: "Which ecommerce platform is best for my business?",
            answer:
              "The best platform depends on your product range, budget, technical requirements, and future growth plans. We help you choose the right platform after a thorough analysis of your needs.",
          },
          {
            question: "How long does it take to build an ecommerce website?",
            answer:
              "Development timelines typically range from 4-12 weeks depending on the complexity and features of the project.",
          },
          {
            question: "Do you provide ongoing maintenance and support?",
            answer:
              "Yes, we offer routine maintenance, security updates, and technical support packages to ensure your ecommerce store runs smoothly.",
          },
        ];

  // =========================================================
  // GALLERY
  // =========================================================

  const galleryImages = gallery.length > 0 ? gallery : [];

  // =========================================================
  // DYNAMIC STYLES
  // =========================================================

  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  // =========================================================
  // REUSABLE AOS ATTRIBUTES
  // =========================================================

  const getAosDelay = (index) => 100 + index * 50;

  // =========================================================
  // SECTION MAP
  // =========================================================

  console.log("ECOMMERCE DEBUG:", {
    show_features,
    solutionsCount: solutions.length,
    processCount: processData.length,
    sectionOrder: section_order,
  });

  const sectionMap = {
    // =======================================================
    // HERO
    // =======================================================

    hero: {
      component: (
        <section
          key="hero"
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${
                  process.env.NEXT_PUBLIC_IMAGE_URL ||
                  "http://localhost/redspider/public"
                }/storage/${hero_background})`
              : hero_image
                ? `url(${
                    process.env.NEXT_PUBLIC_IMAGE_URL ||
                    "http://localhost/redspider/public"
                  }/storage/${hero_image})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-12"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="rs-process-title-sec">
                  <h1 className="rs-process-title mb-3">
                    Ecommerce Development
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
                    <p
                      className="rs-process-text mb-3"
                      data-aos="fade-up"
                      data-aos-delay="150"
                      data-aos-duration="700"
                      data-aos-once="true"
                    >
                      RedSpider provides professional ecommerce website
                      development in Dubai for businesses that want to sell
                      products and services online. We create secure, responsive
                      and easy-to-manage online stores designed around your
                      products, customers and business goals.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_hero,
    },

    // =======================================================
    // INTRO
    // =======================================================

    intro: {
      component: (
        <section key="intro" className="rs-gd-intro">
          <span className="rs-gd-intro__shape" aria-hidden="true"></span>

          <div className="container px-3 px-md-4 px-xl-5">
            <div className="row gx-xl-5 align-items-start">
              {/* LEFT RAIL */}

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

              {/* CENTER COPY */}

              <div className="col-lg-7">
                <div className="rs-gd-intro__copy">
                  <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                    {splitTextIntoWords(intro_description)}
                  </p>

                  <p className="rs-gd-intro__support rs-gd-intro__reveal">
                    {splitTextIntoWords(
                      "Our ecommerce development team works with businesses across Dubai and the UAE to create scalable online stores that support smooth shopping experiences and long-term business growth.",
                    )}
                  </p>

                  <div
                    className="rs-gd-intro__footer"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-aos-once="true"
                  >
                    <a className="rs-gd-intro__link" href="/portfolio">
                      <span>Explore our Work</span>

                      <i className="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT META */}

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

    // =======================================================
    // FEATURES + PROCESS
    // =======================================================

    features: {
      component: (
        <section
          key="features"
          className="archidex-accordion-sec dark-cs-bg dark-background dev-before"
        >
          <div className="archidex-bg-shape"></div>

          <div
            className="container rs-container-reveal"
            style={{
              maxWidth: "1250px",
            }}
          >
            <div className="rs-container-reveal-inner">
              <div className="row g-5 align-items-start justify-content-between">
                {/* ================= LEFT ================= */}

                <div className="col-lg-5">
                  <h2
                    className="archidex-title fs-1"
                    style={{ letterSpacing: 0 }}
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-once="true"
                  >
                    <span>{features_title}</span>
                  </h2>

                  <p
                    data-aos="fade-right"
                    data-aos-delay="50"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    {features_subtitle}
                  </p>

                  <ul className="archidex-list">
                    {solutions.map((item, index) => (
                      <li
                        key={item.id || index}
                        data-aos="fade-right"
                        data-aos-delay={100 + index * 50}
                        data-aos-duration="700"
                        data-aos-once="true"
                      >
                        <span className="archidex-list-icon">
                          <i
                            className={
                              solutionIcons[index % solutionIcons.length]
                            }
                          ></i>
                        </span>

                        <span>{item.title || item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ================= RIGHT ================= */}

                <div className="col-lg-7 px-lg-5">
                  <div
                    className="archidex-small-title mb-3 text-white"
                    data-aos="fade-left"
                    data-aos-duration="800"
                    data-aos-once="true"
                  >
                    <h2 className="text-white">
                      Our Ecommerce <br />
                      Development <br />
                      Process
                    </h2>
                  </div>

                  <p
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    {processes_subtitle}
                  </p>

                  <div
                    className="accordion archidex-accordion mt-4"
                    id="archidexAccordion"
                  >
                    {processData.map((process, index) => {
                      const isFirst = index === 0;

                      const collapseId = `ecommerce-collapse-${index}`;

                      const headingId = `ecommerce-heading-${index}`;

                      return (
                        <div
                          className="accordion-item"
                          key={process.id || index}
                          data-aos="fade-left"
                          data-aos-delay={100 + index * 50}
                          data-aos-duration="700"
                          data-aos-once="true"
                        >
                          <h3 className="accordion-header" id={headingId}>
                            <button
                              className={`accordion-button ${
                                isFirst ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${collapseId}`}
                              aria-expanded={isFirst}
                              aria-controls={collapseId}
                            >
                              <span className="arch-no">{index + 1}.</span>

                              <span className="arch-name">
                                {process.title || process.name}
                              </span>

                              <span className="arch-arrow">↗</span>
                            </button>
                          </h3>

                          <div
                            id={collapseId}
                            className={`accordion-collapse collapse ${
                              isFirst ? "show" : ""
                            }`}
                            aria-labelledby={headingId}
                            data-bs-parent="#archidexAccordion"
                          >
                            <div className="accordion-body">
                              {process.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* ================= CONNECT ================= */}

                    <div
                      className="letconnect mt-5"
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-once="true"
                    >
                      <span
                        className="text-white"
                        data-aos="fade-right"
                        data-aos-delay="100"
                        data-aos-duration="700"
                        data-aos-once="true"
                      >
                        Let's Connect :
                      </span>

                      <div
                        className="line"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                        data-aos-duration="700"
                        data-aos-once="true"
                      ></div>

                      <a
                        href={cta_button_link || cta_button_url || "#"}
                        data-aos="fade-left"
                        data-aos-delay="300"
                        data-aos-duration="700"
                        data-aos-once="true"
                      >
                        {cta_button_text || "Book A Call"}
                      </a>
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

    // =======================================================
    // BENEFITS
    // =======================================================

    benefits: {
      component: (
        <section key="benefits" className="rs-agency-intro-sec py-5">
          <div className="container">
            <div className="rs-effect-section py-2">
              <div className="container">
                <h2
                  className="rs-title-effect rs-title-rotate-up"
                  data-title={benefits_title}
                >
                  {benefits_title}
                </h2>
              </div>
            </div>

            <div className="row rs-agency-bottom align-items-center">
              <div className="col-lg-1"></div>

              <div className="col-lg-8">
                <p className="rs-agency-text">
                  Building a successful online store requires more than
                  selecting an ecommerce platform. Our team focuses on
                  usability, performance, security and scalability to create
                  ecommerce solutions that support both day-to-day operations
                  and long-term business growth.
                </p>
              </div>

              <div className="col-lg-1 d-none d-lg-block">
                <div className="rs-agency-line"></div>
              </div>

              <div className="col-lg-1">
                <div className="rs-agency-circle-wrap">
                  <div
                    className="rs-agency-scroll-text"
                    id="rsAgencyCircleText"
                    aria-hidden="true"
                  ></div>

                  <div className="rs-agency-circle-center">14+</div>
                </div>
              </div>
            </div>

            <div className="row rs-agency-bottom align-items-center">
              <div className="letconnect">
                <span>Let's Connect :</span>

                <div className="line"></div>

                <a href={cta_button_link || cta_button_url || "#"}>
                  {cta_button_text || "Book A Call"}
                </a>
              </div>
            </div>

            {/* FEATURE MARQUEE */}

            <div className="row rs-agency-bottom align-items-center my-4">
              <div className="rs-feature-marquee pb-0">
                {/* ROW 1 */}

                <div className="rs-feature-row">
                  <div className="rs-feature-track">
                    {whyChooseItems.slice(0, 5).map((item, idx) => (
                      <div className="rs-feature-item" key={idx}>
                        <i className={`bi bi-${whyChooseIcons1[idx]}`}></i>

                        <span>{item}</span>
                      </div>
                    ))}

                    {whyChooseItems.slice(0, 5).map((item, idx) => (
                      <div className="rs-feature-item" key={`dup-${idx}`}>
                        <i className={`bi bi-${whyChooseIcons1[idx]}`}></i>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROW 2 */}

                <div className="rs-feature-row reverse">
                  <div className="rs-feature-track">
                    {whyChooseItems.slice(5, 10).map((item, idx) => (
                      <div className="rs-feature-item" key={idx + 5}>
                        <i className={`bi bi-${whyChooseIcons2[idx]}`}></i>

                        <span>{item}</span>
                      </div>
                    ))}

                    {whyChooseItems.slice(5, 10).map((item, idx) => (
                      <div className="rs-feature-item" key={`dup-${idx + 5}`}>
                        <i className={`bi bi-${whyChooseIcons2[idx]}`}></i>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_benefits,
    },

    // =======================================================
    // PROCESSES / KEY FEATURES
    // =======================================================

    processes: {
      component: (
        <section key="processes" className="rs-key-features pt-5">
          <span className="rs-dot" aria-hidden="true"></span>

          <div className="container-fluid px-4 px-lg-5">
            <div className="row align-items-center g-4 g-xl-5">
              <div className="col-lg-3">
                <div className="rs-content">
                  <span className="rs-label">Ecommerce Development</span>

                  <h2 className="rs-title re">
                    Key Features of Our <span>eCommerce Websites</span>
                  </h2>

                  <p className="rs-description">
                    Your online store should make it easy for customers to
                    discover products, complete purchases and manage their
                    accounts. We build practical ecommerce features that also
                    make products, inventory, orders and payments easier for
                    businesses to manage.
                  </p>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="rs-image-frame">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
                    alt="Customer using an ecommerce payment system"
                    loading="lazy"
                  />

                  <span className="rs-image-tag">
                    <i className="bi bi-bag-check"></i> Built to Sell Better
                  </span>
                </div>
              </div>

              <div className="col-lg-4">
                <ul className="rs-feature-list">
                  {featureItems.map((feature, idx) => (
                    <li className="rs-feature-item" key={feature.id || idx}>
                      <i className={`bi ${feature.icon || "star"}`}></i>

                      <span className="rs-feature-text">{feature.title}</span>

                      <i className="bi bi-arrow-up-right rs-arrow"></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_processes,
    },

    // =======================================================
    // TECHNOLOGIES / PLATFORMS
    // =======================================================

    technologies: {
      component: (
        <section
          key="technologies"
          className="rs-ecommerce-platforms py-0"
          id="ecommerce-platforms"
        >
          <div className="team-sticky">
            <div className="container">
              <div className="title-wrap">
                <h2 className="title mb-4">
                  Ecommerce
                  <span className="red sse">Platforms We Work With</span>
                </h2>

                <p className="rs-subtitl introline mb-5">
                  {technologies_subtitle}
                </p>
              </div>

              <div className="gallery">
                {platforms.map((platform, idx) => {
                  const iconMap = {
                    shopify: "shopify",
                    woocommerce: "woocommerce",
                    magento: "magento",
                    laravel: "laravel",
                    php: "php",

                    "bi-shopify": "shopify",
                    "bi-wordpress": "woocommerce",
                    "bi-magento": "magento",
                    "bi-laravel": "laravel",
                    "bi-code-slash": "php",
                  };

                  let iconName = platform.icon || "default";

                  if (iconName.startsWith("bi-")) {
                    iconName = iconMap[iconName] || "default";
                  }

                  return (
                    <article className="card" key={platform.id || idx}>
                      <div
                        className="card-content"
                        data-aos="fade-up"
                        data-aos-delay={idx * 80}
                        data-aos-once="true"
                      >
                        <span className="card-number">
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <div className="platform-icon" aria-hidden="true">
                          <img
                            src={`/assets/img/icons/${iconName}.webp`}
                            alt=""
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <h3>{platform.title}</h3>

                        <p>{platform.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_technologies,
    },

    // =======================================================
    // INDUSTRIES
    // =======================================================

    industries: {
      component: (
        <section
          key="industries"
          className="rs-text-marquee-sec dark-background"
        >
          <div className="rs-light-pattern">
            <span className="rs-pattern-dot dot1"></span>
            <span className="rs-pattern-dot dot2"></span>
            <span className="rs-pattern-dot dot3"></span>
            <span className="rs-pattern-dot dot4"></span>
            <span className="rs-pattern-dot dot5"></span>
          </div>

          <div className="container">
            <div className="rs-marquee-heading text-center">
              <span className="rs-small-title">
                Industries Using Ecommerce in the UAE
              </span>

              <h2 className="rs-main-title fw-bold text-white">
                Ecommerce is <span>Transforming Every</span> Industry
                <br />
                Across the UAE
              </h2>

              <p className="rs-main-text">
                The UAE is still in the process of revolutionizing business in
                the region with the power of ecommerce. Businesses in nearly
                every vertical are investing in digital commerce and seeking to
                serve more customers while delivering an online shopping
                experience that's convenient.
              </p>
            </div>
          </div>

          <div
            className="rs-industry-marquee py-0"
            aria-label="Industries we serve"
          >
            <div className="rs-marquee-line">
              <div className="rs-marquee-track">
                {/* GROUP 1 */}

                <div className="rs-marquee-group">
                  {industryItems.map((item, index) => (
                    <span
                      key={index}
                      className={`rs-marquee-item ${
                        index % 3 === 0
                          ? "rs-red"
                          : index % 2 === 1
                            ? "rs-outline"
                            : ""
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* GROUP 2 */}

                <div className="rs-marquee-group">
                  {industryItems.map((item, index) => (
                    <span
                      key={`dup-${index}`}
                      className={`rs-marquee-item ${
                        index % 3 === 0
                          ? "rs-red"
                          : index % 2 === 1
                            ? "rs-outline"
                            : ""
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: true,
    },

    // =======================================================
    // FAQ
    // =======================================================

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
              <h2 className="fw-bold">{faqs_title}</h2>

              <p className="mb-0">{faqs_subtitle}</p>
            </div>

            {faqData.length > 0 ? (
              <div className="row g-4">
                {/* LEFT */}

                <div className="col-lg-6">
                  <div className="accordion" id="faqLeft-ecommerce">
                    {faqData
                      .slice(0, Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div
                          className="accordion-item"
                          key={faq.id || `left-${idx}`}
                        >
                          <h3 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-ecommerce-left-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h3>

                          <div
                            id={`faq-ecommerce-left-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqLeft-ecommerce"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* RIGHT */}

                <div className="col-lg-6">
                  <div className="accordion" id="faqRight-ecommerce">
                    {faqData
                      .slice(Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div
                          className="accordion-item"
                          key={faq.id || `right-${idx}`}
                        >
                          <h3 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-ecommerce-right-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h3>

                          <div
                            id={`faq-ecommerce-right-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqRight-ecommerce"
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

    // =======================================================
    // CTA
    // =======================================================

    cta: {
      component: <ServiceCTA service={data} key="cta" />,

      show: show_cta,
    },
  };

  // =========================================================
  // RENDER ORDER
  // =========================================================

  const renderSections = () => {
    let order = section_order;

    if (typeof order === "string") {
      order = order.split(",").map((item) => item.trim());
    }

    if (!Array.isArray(order) || order.length === 0) {
      order = [
        "hero",
        "intro",
        "features",
        "benefits",
        "processes",
        "technologies",
        "industries",
        "gallery",
        "reviews",
        "faqs",
        "cta",
      ];
    }

    /*
     * Industries and Reviews are not backend-controlled
     * in the current data structure, so inject them after
     * their relevant sections if the old saved section_order
     * doesn't contain them.
     */

    const finalOrder = [];

    order.forEach((key) => {
      finalOrder.push(key);

      if (key === "technologies" && !order.includes("industries")) {
        finalOrder.push("industries");
      }

      if (key === "gallery" && !order.includes("reviews")) {
        finalOrder.push("reviews");
      }
    });

    return finalOrder
      .map((key) => {
        const section = sectionMap[key];

        if (!section) {
          return null;
        }

        return section.show ? section.component : null;
      })
      .filter(Boolean);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div style={styles}>
      {/* Backend custom CSS */}

      {custom_css && (
        <style
          dangerouslySetInnerHTML={{
            __html: custom_css,
          }}
        />
      )}

      <main className="service-template">{renderSections()}</main>

      {/* Backend custom JS */}

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
