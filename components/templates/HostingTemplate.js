"use client";

import { useState } from "react";
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function HostingTemplate({ data }) {
  if (!data) return <div className="text-center py-5">Loading...</div>;

  // ============================================
  // ✅ DYNAMIC FIELDS - Backend se aayenge
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
    intro_small_heading = "Web Hosting · Dubai",
    intro_main_heading = "",
    intro_description = "Our hosting infrastructure promises high performance, advanced security and a 99.99% uptime guarantee, ensuring that your website is always accessible. All hosting packages come with fully trained technical support as well as tools to assist you in managing your website with confidence.",
    intro_image = "",
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,

    // Repeater Data
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],

    // ============================================
    // 🆕 NEW - FRONTEND DYNAMIC SETTINGS
    // ============================================

    // Design & Layout
    layout_style = "grid",
    columns_count = 3,
    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

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
    hero_button_text = "Get Started",
    hero_button_url = "/contact",
    features_title = "Our Web Hosting Solutions",
    features_subtitle = "Select the hosting environment that will suit your business.",
    benefits_title = "Benefits of Hosting Your Website with RedSpider",
    benefits_subtitle = "When you choose RedSpider, you receive more than just web hosting. Our reliable hosting platform includes advanced performance, security, technical support and complete digital solutions.",
    processes_title = "Why Choose RedSpider?",
    processes_subtitle = "",
    technologies_title = "Free Website Applications",
    technologies_subtitle = "Our one click application installer makes launching a Website very easy. Install popular content management system (CMS) platforms such as:",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about web hosting.",
    gallery_title = "Our Work",
    gallery_subtitle = "",
    cta_subtitle = "",
    cta_button_url = "/contact",

    // Animation
    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

    // Section Order
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

    // Custom Code
    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================
  // 📌 FALLBACK DATA - Jab backend se data na aaye
  // ============================================

  // 1. Hosting Benefits - Dynamic from benefits or static fallback
  const hostingBenefitsList =
    benefits.length > 0
      ? benefits
      : [
          "99.99% Uptime",
          "24/7 Technical Support",
          "DDoS Protection",
          "Secure Hosting Environment",
          "High-Speed Quad-Core Servers",
          "Instant Account Activation",
          "Reliable Network Connectivity",
          "Regular Backup Services",
          "Free SSL Certificates",
          "Easy-to-Use cPanel",
          "Website Design Services",
          "Digital Marketing Solutions",
        ];

  // 2. Hosting Solutions - Dynamic from features or static fallback
  const hostingSolutions =
    features.length > 0
      ? features
      : [
          {
            icon: "bi-hdd-stack",
            title: "Shared Hosting",
            description:
              "Reliable and affordable hosting for small websites, blogs and growing businesses.",
          },
          {
            icon: "bi-server",
            title: "VPS Hosting",
            description:
              "High-performance VPS hosting powered by SSD servers with full root access.",
          },
          {
            icon: "bi-cloud-check",
            title: "Cloud Hosting",
            description:
              "Flexible and scalable hosting that grows as your website and business requirements increase.",
          },
          {
            icon: "bi-cpu",
            title: "Dedicated Hosting",
            description:
              "All CPU, RAM and storage resources are dedicated to your business for maximum performance and control.",
          },
          {
            icon: "bi-diagram-3",
            title: "Reseller Hosting",
            description:
              "Ideal for agencies and entrepreneurs managing multiple client websites from one hosting account.",
          },
          {
            icon: "bi-globe2",
            title: "Domain Registration",
            description:
              "Register local or international domain extensions that represent and protect your business online.",
          },
        ];

  // 3. CMS Platforms - Dynamic from technologies or static fallback
  const cmsPlatforms =
    technologies.length > 0
      ? technologies
      : [
          { icon: "wordpress", name: "WordPress" },
          { icon: "magento", name: "Magento" },
          { icon: "joomla", name: "Joomla" },
          { icon: "drupal", name: "Drupal" },
        ];

  // 4. Process Data - Dynamic from processes or static fallback
  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Looking for a Website, Too?",
            description:
              "Our knowledgeable designers build modern, responsive websites that work perfectly on every device and provide an excellent user experience. From a basic business website to a complete custom-designed platform, we will create a professional website that helps your business achieve its goals.",
          },
          {
            title: "Email Marketing Services in Dubai",
            description:
              "Want to reach thousands of potential customers? Our email marketing services help businesses promote products, services, offers and announcements through carefully planned campaigns. Using a large verified database and strategic campaign planning, you can increase engagement and generate quality leads.",
          },
          {
            title: "SMS Marketing Services",
            description:
              "SMS remains one of the quickest ways to communicate with your customers. Our affordable SMS marketing services help businesses send professional messages, alerts, offers and important updates directly to their target audience.",
          },
          {
            title: "Logo & Brochure Design",
            description:
              "Your image and visual identity create your first impression. RedSpider designs professional logos, brochures, company profiles, flyers and other marketing materials that help businesses stand out. We also offer high-quality printing services to companies across Dubai and the UAE.",
          },
        ];

  // 5. FAQ Data - Dynamic from faqs or static fallback
  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "What web hosting services do you offer in Dubai?",
            answer:
              "We offer a wide range of web hosting services including shared hosting, VPS hosting, cloud hosting, dedicated hosting, and reseller hosting. We also provide domain registration and website migration services.",
          },
          {
            question: "What is the uptime guarantee for your hosting?",
            answer:
              "We provide a 99.99% uptime guarantee to ensure your website remains accessible and reliable for your visitors.",
          },
          {
            question: "Do you provide free SSL certificates?",
            answer:
              "Yes, most of our hosting packages include a complimentary SSL certificate to encrypt your website data and increase visitor trust.",
          },
          {
            question: "Can you migrate my existing website to RedSpider?",
            answer:
              "Yes, our migration team will manage the complete process carefully, securely and efficiently, including website files, databases, domains, emails, themes and plugins.",
          },
        ];

  // 6. Gallery Images - Dynamic from backend
  const galleryImages = gallery.length > 0 ? gallery : [];

  // ============================================
  // 🎨 UI State
  // ============================================
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const handleProcessClick = (index) => {
    setActiveProcess(index === activeProcess ? -1 : index);
  };

  // Static Data (hardcoded)
  const domainExtensions = [
    { name: ".com", price: "AED 65/year" },
    { name: ".ae", price: "AED 160/year" },
    { name: ".net", price: "AED 75/year" },
    { name: ".org", price: "AED 70/year" },
    { name: ".co", price: "AED 95/year" },
  ];

  const securityFeatures = [
    { icon: "bi-patch-check", title: "Free SSL Certificates" },
    { icon: "bi-router", title: "Dedicated IP Options" },
    { icon: "bi-shield-lock", title: "DDoS Protection" },
    { icon: "bi-arrow-repeat", title: "Regular Security Updates" },
    { icon: "bi-server", title: "Secure Server Infrastructure" },
    { icon: "bi-activity", title: "Continuous Monitoring" },
  ];

  const cpanelFeatures = [
    "Set up and configure email accounts",
    "Install WordPress and other applications",
    "Manage domains and subdomains",
    "Upload and manage website files",
    "Create and manage backups",
    "Manage website databases",
    "Monitor website performance",
  ];

  const emailFeatures = [
    "Access from desktop and mobile devices",
    "Compatible with iOS and Android",
    "Advanced spam filtering",
    "Reliable email uptime",
    "Automatic email responders",
    "Email forwarding",
    "Vacation messages",
    "Secure email access",
  ];

  const whyChooseItems = [
    {
      title: "Local UAE Presence",
      description:
        "You can always contact our local staff. No overseas support centers or lengthy waiting times, only fast and reliable support when needed.",
    },
    {
      title: "Reliable Hosting",
      description:
        "We provide a guarantee of 99.99% uptime and website stability through our reliable hosting infrastructure.",
    },
    {
      title: "Dedicated Account Support",
      description:
        "All customers of our web hosting service receive access to cPanel and expert assistance from our knowledgeable support team whenever needed.",
    },
    {
      title: "Enterprise-Level Security",
      description:
        "We use modern server technologies, regular software updates, advanced firewalls and continuous monitoring to protect your website and data.",
    },
    {
      title: "Free Hosting Resources",
      description:
        "Our hosting plans include valuable features such as free email accounts, generous storage space, bandwidth and domain-related benefits.",
    },
    {
      title: "24/7 Technical Support",
      description:
        "Our hosting experts are available 24 hours a day to assist with technical problems, website migrations, account administration and general support.",
    },
  ];

  const migrationServices = [
    { icon: "bi-window-stack", title: "Website Migration" },
    { icon: "bi-globe2", title: "Transfer or Renew a Domain" },
    { icon: "bi-envelope-arrow-up", title: "Email Migration" },
    { icon: "bi-puzzle", title: "Theme and Plugin Restoration" },
    { icon: "bi-database-up", title: "Database Transfer" },
  ];

  // ============================================
  // 🎨 Dynamic Styles
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
  // 📐 Section Order Mapping
  // ============================================
  const sectionMap = {
    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },
    intro: {
      component: (
        <section key="intro" className="rs-gd-intro">
          <span className="rs-gd-intro__shape" aria-hidden="true"></span>
          <div className="container-fluid px-3 px-md-4 px-xl-5">
            <div className="row gx-xl-5 align-items-start">
              <div className="col-lg-3">
                <div className="rs-gd-intro__rail">
                  <span className="rs-gd-intro__rail-icon">
                    <i className="bi bi-server"></i>
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
                  <div className="rs-gd-intro__footer">
                    <a className="rs-gd-intro__link" href="#">
                      <span>Explore our Service</span>
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
    features: {
      component: (
        <section
          className="rs-why-brochure owhsol"
          aria-labelledby="rs-hosting-solutions-title"
        >
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8 col-md-10">
                <div className="rs-why-brochure__intro py-0">
                  <span className="rs-why-brochure__label">
                    Hosting Solutions
                  </span>
                  <h2
                    className="rs-title-effect rs-title-letter-flip fs-1 mb-3"
                    data-title={features_title}
                  >
                    {features_title}
                  </h2>
                  <p>{features_subtitle}</p>
                </div>
              </div>
            </div>
            <div className="row g-4 justify-content-center mt-0">
              {hostingSolutions.map((solution, index) => (
                <div className="col-lg-4 col-md-6" key={solution.id || index}>
                  <article className="rs-why-brochure__card">
                    <div className="rs-why-brochure__card-inner">
                      <div className="rs-why-brochure__card-face rs-why-brochure__card-front">
                        <div className="rs-why-brochure__top">
                          <span className="rs-why-brochure__icon">
                            <i
                              className={solution.icon || "bi-box"}
                              aria-hidden="true"
                            ></i>
                          </span>
                          <span className="rs-why-brochure__number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="rs-why-brochure__card-title">
                          {solution.title}
                        </h3>
                      </div>
                      <div className="rs-why-brochure__card-face rs-why-brochure__card-back">
                        <h3 className="rs-why-brochure__card-title">
                          {solution.title}
                        </h3>
                        <p className="rs-why-brochure__text">
                          {solution.description}
                        </p>
                        <span className="rs-why-brochure__back-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_features,
    },
    benefits: {
      component: (
        <section className="rs-mail-tech">
          <div
            className="container-fluid px-lg-5"
            style={{ maxWidth: "1840px" }}
          >
            <div className="rs-mail-tech__frame">
              <span className="rs-mail-tech__scan" aria-hidden="true"></span>
              <div className="row align-items-center g-5 w-100">
                <div className="col-lg-2">
                  <div className="rs-mail-tech__index">
                    <p className="rs-mail-tech__category">
                      Reliable Website Hosting
                      <br />
                      Security &amp; Performance
                    </p>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="rs-mail-tech__content">
                    <h2 className="rs-mail-tech__title">{benefits_title}</h2>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="rs-mail-tech__content">
                    <p className="rs-mail-tech__description">
                      {benefits_subtitle}
                    </p>
                    <a
                      className="rs-mail-tech__button"
                      href="#rs-hosting-benefit-list"
                    >
                      <span>View Benefits</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M14 6l6 6-6 6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="col-lg-12">
                  <ul
                    id="rs-hosting-benefit-list"
                    className="rs-mail-tech__specs rs-mail-tech__specs-half"
                  >
                    {hostingBenefitsList.map((benefit, index) => {
                      const benefitText =
                        typeof benefit === "string"
                          ? benefit
                          : benefit.title || benefit.description || "Benefit";
                      return (
                        <li
                          className="rs-mail-tech__spec"
                          key={benefit.id || index}
                        >
                          <span className="rs-mail-tech__spec-label">
                            Benefit {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="rs-mail-tech__spec-text">
                            {benefitText}
                          </span>
                          <span className="rs-mail-tech__spec-arrow">→</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },
    processes: {
      component: (
        <section className="kk-why-section">
          <div className="kk-why-container" style={{ maxWidth: "1550px" }}>
            <div className="kk-why-inner">
              <div className="kk-why-grid">
                <div className="kk-why-left">
                  <h2 className="kk-why-title">{processes_title}</h2>
                  <div className="kk-accordion-list">
                    {whyChooseItems.map((item, index) => (
                      <div className="kk-accordion-item" key={index}>
                        <button
                          className={`kk-accordion-btn ${activeIndex === index ? "kk-active" : ""}`}
                          type="button"
                          onClick={() => handleAccordionClick(index)}
                          aria-expanded={activeIndex === index}
                        >
                          <span className="kk-accordion-symbol">
                            {activeIndex === index ? "−" : "+"}
                          </span>
                          <span className="kk-accordion-label">
                            {item.title}
                          </span>
                        </button>
                        <div
                          className={`kk-accordion-content ${activeIndex === index ? "kk-open" : ""}`}
                        >
                          <div className="kk-accordion-body">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="kk-footer">
                    <span className="kk-footer-text">Know More About :</span>
                    <div className="kk-footer-line"></div>
                    <a href="#" className="kk-footer-link">
                      Contact us
                    </a>
                  </div>
                </div>
                <div className="kk-why-right">
                  <div className="kk-right-header">
                    <h6 className="kk-right-title">
                      Professional <br />
                      Website Design <br /> Services
                    </h6>
                  </div>
                  <div className="kk-process-accordion">
                    {processData.map((item, index) => (
                      <div className="kk-process-item" key={item.id || index}>
                        <button
                          className={`kk-process-btn ${activeProcess === index ? "kk-active" : ""}`}
                          type="button"
                          onClick={() => handleProcessClick(index)}
                          aria-expanded={activeProcess === index}
                        >
                          <span className="kk-process-number">
                            {index + 1}.
                          </span>
                          <span className="kk-process-name">{item.title}</span>
                          <span
                            className={`kk-process-arrow ${activeProcess === index ? "kk-rotated" : ""}`}
                          >
                            ↗
                          </span>
                        </button>
                        <div
                          className={`kk-process-content ${activeProcess === index ? "kk-open" : ""}`}
                        >
                          <div className="kk-process-body">
                            {item.description}
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
      ),
      show: show_processes,
    },
    technologies: {
      component: (
        <section className="ak-cms-section" id="ak-cms-platforms">
          <div className="ak-cms-sticky">
            <div className="ak-cms-title-wrap">
              <h2 className="ak-cms-title">
                <span className="ak-cms-red">{technologies_title}</span>
              </h2>
              <p className="ak-cms-subtitle">{technologies_subtitle}</p>
            </div>
            <div
              className="ak-cms-gallery"
              aria-label="Content management system platforms"
            >
              {cmsPlatforms.map((platform, index) => {
                const iconMap = {
                  wordpress: "wordpress",
                  magento: "magento",
                  joomla: "joomla",
                  drupal: "drupal",
                };
                const iconName =
                  typeof platform.icon === "string" &&
                  platform.icon.startsWith("bi-")
                    ? platform.icon
                    : iconMap[platform.icon] || "default";

                return (
                  <article className="ak-cms-card" key={platform.id || index}>
                    <div className="ak-cms-card-content">
                      <span className="ak-cms-card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="ak-cms-platform-icon" aria-hidden="true">
                        {typeof iconName === "string" &&
                        iconName.startsWith("bi-") ? (
                          <i
                            className={`bi ${iconName}`}
                            style={{ fontSize: "3rem", color: "#FF6B35" }}
                          ></i>
                        ) : (
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-plain.svg`}
                            alt={platform.name}
                            className="ak-cms-icon"
                          />
                        )}
                      </div>
                      <h3 className="ak-cms-platform-name">{platform.name}</h3>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="ak-cms-bottom-text">
              Whether it is creating blogs, business websites, online stores,
              and custom web applications do it with no hassle. Just Install
              themes, plugins and edit content from a single dashboard.
            </p>
          </div>
        </section>
      ),
      show: show_technologies,
    },
    gallery: {
      component: (
        <section key="gallery" className="opposite-gallery-sec py-0">
          <div className="opposite-gallery-sticky">
            <div className="gallery-title-wrap">
              <span>{gallery_title || "Our Work"}</span>
              <h2>{gallery_title || "Our Work"}</h2>
              {gallery_subtitle && <p>{gallery_subtitle}</p>}
            </div>
            <div className="gallery-inner">
              {galleryImages.length > 0 ? (
                <>
                  <div className="gallery-track top-track">
                    {galleryImages.slice(0, 6).map((item, index) => (
                      <div
                        key={item.id || index}
                        className={`gallery-card ${index % 3 === 0 ? "large" : index % 3 === 2 ? "small" : ""}`}
                      >
                        <img src={item.image} alt={item.title || "Gallery"} />
                      </div>
                    ))}
                  </div>
                  {galleryImages.length > 6 && (
                    <div className="gallery-track bottom-track">
                      {galleryImages.slice(6, 12).map((item, index) => (
                        <div
                          key={item.id || index}
                          className={`gallery-card ${index % 3 === 1 ? "large" : index % 3 === 0 ? "small" : ""}`}
                        >
                          <img src={item.image} alt={item.title || "Gallery"} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center py-5">No gallery images available</p>
              )}
            </div>
          </div>
        </section>
      ),
      show: show_gallery,
    },
    faqs: {
      component: (
        <section
          key="faqs"
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section light-background pb-0"
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
            {faqData.length > 0 ? (
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="accordion" id="faqLeft-hosting">
                    {faqData
                      .slice(0, Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div className="accordion-item" key={faq.id || idx}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-hosting-left-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h2>
                          <div
                            id={`faq-hosting-left-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqLeft-hosting"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="accordion" id="faqRight-hosting">
                    {faqData
                      .slice(Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div className="accordion-item" key={faq.id || idx}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-hosting-right-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h2>
                          <div
                            id={`faq-hosting-right-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqRight-hosting"
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
    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

  // ============================================
  // 🏗️ Render Sections Based on Order
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
        "technologies",
        "gallery",
        "faqs",
        "cta",
      ];
    }
    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section) return null;
        return section.show ? section.component : null;
      })
      .filter(Boolean);
  };

  return (
    <div style={styles}>
      {custom_css && <style dangerouslySetInnerHTML={{ __html: custom_css }} />}
      <main className="service-template">{renderSections()}</main>
      {custom_js && <script dangerouslySetInnerHTML={{ __html: custom_js }} />}
    </div>
  );
}
