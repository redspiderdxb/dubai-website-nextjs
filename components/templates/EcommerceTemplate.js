// frontend/components/templates/EcommerceTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function EcommerceTemplate({ data }) {
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
    intro_small_heading,
    intro_main_heading,
    intro_description,
    intro_image,
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,
    // Repeater Data
    features = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],
  } = data;

  // ============================================
  // 📊 DYNAMIC DATA WITH STATIC FALLBACK
  // ============================================

  // 1. Solutions - Dynamic from backend or static fallback
  const solutions =
    features.length > 0
      ? features
      : [
          { title: "Custom Ecommerce Website Development" },
          { title: "Shopify Store Development" },
          { title: "WooCommerce Development" },
          { title: "Magento Ecommerce Development" },
          { title: "Laravel Ecommerce Development" },
          { title: "Multi-Vendor Marketplace Development" },
          { title: "Secure Payment Gateway Integration" },
          { title: "Mobile-Responsive Ecommerce Design" },
          { title: "Inventory & Order Management Systems" },
          { title: "Ecommerce Website Redesign & Migration" },
          { title: "Routine Maintenance & Technical Support" },
        ];

  // Icons for solutions
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

  // 2. Platforms - Dynamic from backend or static fallback
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

  // 3. Process Steps - Dynamic from backend or static fallback
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

  // 4. Key Features (Static - Future Dynamic)
  const featuresList = [
    "Responsive design for desktop, tablets and mobile devices",
    "Secure payment gateway integration",
    "Fast-loading pages for a better user experience",
    "Easily manage products and categories",
    "Enhanced inventory and stock management",
    "Easy-to-use shopping cart and checkout",
    "Customer accounts and order tracking",
    "Product search and filtering",
    "SEO-friendly website structure",
    "Shipping and tax configurations",
    "Easy-to-manage admin dashboard",
  ];

  const featureIcons = [
    "phone",
    "shield-check",
    "speedometer2",
    "box-seam",
    "boxes",
    "cart-check",
    "person-check",
    "search",
    "graph-up-arrow",
    "truck",
    "grid-1x2",
  ];

  // 5. Industry Items (Static - Future Dynamic)
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

  // 6. Why Choose Items (Static - Future Dynamic)
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

  // 7. FAQ Data - Dynamic from backend or static fallback
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

  // 8. Gallery Images - Dynamic from backend
  const galleryImages = gallery.length > 0 ? gallery : [];

  return (
    <>
      <ServiceHero service={data} />

      {/* Intro */}
      <section className="rs-gd-intro">
        <span className="rs-gd-intro__shape" aria-hidden="true"></span>
        <div className="container-fluid px-3 px-md-4 px-xl-5">
          <div className="row gx-xl-5 align-items-start">
            <div className="col-lg-3">
              <div className="rs-gd-intro__rail">
                <span className="rs-gd-intro__rail-icon">
                  <i className="bi bi-bezier2"></i>
                </span>
                <span className="rs-gd-intro__rail-text">
                  {intro_small_heading || "Ecommerce · Dubai"}
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rs-gd-intro__copy">
                <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                  {intro_description ||
                    "At RedSpider we offer the best ecommerce web design and development services in Dubai. Each webstore is built with creativity, innovation and passion. Our team plans each step from product browsing to secure checkout keeping in mind your customer's convenience."}
                </p>
                <p className="rs-gd-intro__support rs-gd-intro__reveal">
                  We create ecommerce solutions that help various businesses in
                  Dubai and UAE sell more and store management easier.
                </p>
                <div className="rs-gd-intro__footer">
                  <a className="rs-gd-intro__link" href="#">
                    <span>Explore our Work</span>
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

      {/* Solutions + Process */}
      <section className="brochure-services-section dark-bg">
        <div className="container">
          <div className="row align-items-start justify-content-between">
            {/* Left Column - Solutions List */}
            <div className="col-lg-5">
              <h2
                className="services-heading fs-1"
                style={{ letterSpacing: 0 }}
              >
                <span>Ecommerce Website Solutions We Offer</span>
              </h2>
              <p className="solutions-description">
                All solutions are built around your products, customers and
                business goals.
              </p>
              <ul className="services-list">
                {solutions.map((item, idx) => (
                  <li key={item.id || idx}>
                    <span className="service-icon">
                      <i
                        className={solutionIcons[idx % solutionIcons.length]}
                      ></i>
                    </span>
                    <span className="service-text">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Process Accordion */}
            <div className="col-lg-7 px-lg-5">
              <div className="process-title-wrapper mb-3">
                <h6 className="text-white">
                  Our Ecommerce <br />
                  Development <br /> Process
                </h6>
              </div>
              <p className="process-description">
                The development process is well planned and delivered without
                compromising on quality, on time, for each and every ecommerce
                project.
              </p>

              <div
                className="process-accordion mt-4"
                id="ecommerceProcessAccordion"
              >
                {processData.map((process, index) => {
                  const isFirst = index === 0;
                  const collapseId = `ecommerce-collapse-${index}`;
                  return (
                    <div className="accordion-item" key={process.id || index}>
                      <div className="accordion-header">
                        <button
                          className={`accordion-trigger ${isFirst ? "active" : ""}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded={isFirst ? "true" : "false"}
                        >
                          <span className="step-number">{index + 1}.</span>
                          <span className="step-title">{process.title}</span>
                          <span className="step-arrow">↗</span>
                        </button>
                      </div>
                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                        data-bs-parent="#ecommerceProcessAccordion"
                      >
                        <div className="accordion-body">
                          <div className="accordion-body-text">
                            {process.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Let's Connect Section */}
              <div className="connect-section mt-5">
                <span className="connect-label">Let's Connect :</span>
                <div className="connect-divider"></div>
                <a href="#" className="connect-btn">
                  Book A Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecommerce Platforms Section */}
      <section className="ecommerce-platforms-section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <h2>
              Ecommerce <span>Platforms We Work With</span>
            </h2>
            <p>
              We will help you decide the best ecommerce platform after
              discussing the product range, budget, customization needs and
              future plans for expansion.
            </p>
          </div>

          {/* Platforms Grid */}
          <div className="platforms-list">
            {platforms.map((platform, idx) => (
              <div
                className={`platform-item platform-${idx + 1}`}
                key={platform.id || idx}
              >
                {/* Number */}
                <span className="platform-number">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Platform Icon */}
                <div className="platform-icon">
                  <img
                    src={`/assets/img/icons/${platform.icon || "default"}.png`}
                    alt={platform.title}
                  />
                </div>

                {/* Platform Content */}
                <div className="platform-info">
                  <h3>{platform.title}</h3>
                  <p>{platform.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Marquee */}
      <section className="rs-text-marquee-sec dark-background">
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
              Ecommerce is <span>Transforming Every</span> Industry <br />
              Across the UAE
            </h2>
            <p className="rs-main-text">
              The UAE is still in the process of revolutionizing business in the
              region with the power of ecommerce. Businesses in nearly every
              vertical are investing in digital commerce and seeking to serve
              more customers while delivering an online shopping experience
              that's convenient.
            </p>
          </div>
        </div>
        <div
          className="rs-industry-marquee py-0"
          aria-label="Industries we serve"
        >
          <div className="rs-marquee-line">
            <div className="rs-marquee-track">
              <div className="rs-marquee-group">
                {industryItems.map((item, idx) => (
                  <span
                    key={idx}
                    className={`rs-marquee-item ${idx % 2 === 0 ? "rs-red" : "rs-outline"}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="rs-marquee-group" aria-hidden="true">
                {industryItems.map((item, idx) => (
                  <span
                    key={idx + industryItems.length}
                    className={`rs-marquee-item ${idx % 2 === 0 ? "rs-red" : "rs-outline"}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="rs-key-features pt-5">
        <span className="rs-dot" aria-hidden="true"></span>
        <div className="container-fluid px-4 px-lg-5">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-3">
              <div className="rs-content">
                <span className="rs-label">Ecommerce Development</span>
                <h2 className="rs-title">
                  Key Features of Our <span>Ecommerce Websites</span>
                </h2>
                <p className="rs-description">
                  Your ecommerce website should be visually appealing, fast and
                  user-friendly. We build practical features that make shopping
                  easier and store management simpler.
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
                {featuresList.map((feature, idx) => (
                  <li className="rs-feature-item" key={idx}>
                    <i className={`bi bi-${featureIcons[idx]}`}></i>
                    <span className="rs-feature-text">{feature}</span>
                    <i className="bi bi-arrow-up-right rs-arrow"></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Join With Us */}
      <section
        className="rs-packages-se dark-background section pt-0"
        style={{ background: "#fff" }}
      >
        <div className="container" style={{ maxWidth: "1450px" }}>
          <div className="row">
            <div className="col-12">
              <div
                className="rs-left-card h-100 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 text-center text-lg-start"
                style={{ background: "#111" }}
              >
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4 gap-lg-5">
                  <span className="rs-join">Join With Us</span>
                  <h4 className="mb-0">
                    Get an Estimate for Ecommerce
                    <br className="d-none d-md-block" />
                    Website Development in Dubai
                  </h4>
                  <div className="rs-arrow-btn">
                    <span>
                      <img
                        src="/assets/img/arrow-icon-40.svg"
                        alt=""
                        className="arrow-40deg-icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="quick-contect text-center text-lg-end mt-3 mt-lg-0">
                  <small>Get A Consultation</small>
                  <h5 className="mb-0">: 971555515475</h5>
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="text-muted mt-3 mb-0">
                <em>
                  Planning to launch a new ecommerce website or upgrade an
                  existing online store? Our team will understand your
                  requirements and prepare a customized development plan that
                  aligns with your business goals. Get your estimate today!
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Dynamic */}
      {galleryImages.length > 0 && (
        <section className="opposite-gallery-sec py-0">
          <div className="opposite-gallery-sticky">
            <div className="gallery-title-wrap">
              <span>Our Work</span>
              <h2>Our Work</h2>
            </div>
            <div className="gallery-inner">
              <div className="gallery-track top-track">
                {galleryImages.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`gallery-card ${
                      index % 3 === 0 ? "large" : index % 3 === 2 ? "small" : ""
                    }`}
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
                      className={`gallery-card ${
                        index % 3 === 1
                          ? "large"
                          : index % 3 === 0
                            ? "small"
                            : ""
                      }`}
                    >
                      <img src={item.image} alt={item.title || "Gallery"} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose - Ecommerce */}
      <section className="rs-agency-intro-sec py-5">
        <div className="container">
          <div className="rs-effect-section py-2">
            <div className="container">
              <h2
                className="rs-title-effect rs-title-rotate-up"
                data-title="Why Choose RedSpider for Ecommerce Development Services."
              >
                Why Choose RedSpider for Ecommerce Development Services.
              </h2>
            </div>
          </div>
          <div className="row rs-agency-bottom align-items-center">
            <div className="col-lg-1"></div>
            <div className="col-lg-4">
              <p className="rs-agency-text">
                Selecting a proper development partner is as crucial as picking
                the correct platform. We have technical knowledge and hands-on
                ecommerce experience in creating websites that produce
                measurable results for businesses.
              </p>
            </div>
            <div className="col-lg-4">
              <p className="rs-agency-text">
                We don't just develop online stores, we develop platforms that
                can help any business attract customers, improve conversions and
                grow their online presence.
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
                ></div>
                <div className="rs-agency-circle-center">14+</div>
              </div>
            </div>
          </div>
          <div className="row rs-agency-bottom align-items-center">
            <div className="letconnect">
              <span>Let's Connect :</span>
              <div className="line"></div>
              <a href="#">Book A Call</a>
            </div>
          </div>
          <div className="row rs-agency-bottom align-items-center my-4">
            <div className="rs-feature-marquee pb-0">
              <div className="rs-feature-row">
                <div className="rs-feature-track">
                  {whyChooseItems.slice(0, 5).map((item, idx) => (
                    <div className="rs-feature-item" key={idx}>
                      <i className={`bi bi-${whyChooseIcons1[idx]}`}></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rs-feature-row reverse">
                <div className="rs-feature-track">
                  {whyChooseItems.slice(5, 10).map((item, idx) => (
                    <div className="rs-feature-item" key={idx + 5}>
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

      {/* Review */}
      <section id="review-sec" className="review-sec section light-background">
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

      {/* FAQs - Dynamic */}
      {faqData.length > 0 && (
        <section
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
              <h2 className="fw-bold">Frequently Asked Questions</h2>
              <p className="mb-0">
                Find quick answers about our ecommerce website development
                services.
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id="faqLeft-ecommerce">
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
                            data-bs-target={`#faq-ecommerce-left-${idx}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
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
              <div className="col-lg-6">
                <div className="accordion" id="faqRight-ecommerce">
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
                            data-bs-target={`#faq-ecommerce-right-${idx}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
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
          </div>
        </section>
      )}

      <ServiceCTA service={data} />
    </>
  );
}
