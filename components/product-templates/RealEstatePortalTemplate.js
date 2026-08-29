// frontend/components/product-templates/RealEstatePortalTemplate.js

import ServiceCTA from "../services/ServiceCTA";

export default function RealEstatePortalTemplate({ data }) {
  if (!data) return <div className="text-center py-5">Loading...</div>;

  // ============================================
  // DYNAMIC FIELDS - Backend se aayenge
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
    faqs = [],
    gallery = [],
  } = data;

  // ============================================
  // STATIC FIELDS
  // ============================================

  // Real Estate Features - Static
  const realEstateFeatures = [
    "Sales & Rental Listing Management",
    "Advanced Uploading Gallery",
    "Adjust Main Picture from Gallery",
    "Leads Management Systems",
    "Brokers Listing",
    "Contacts Management",
    "Users / Brokers Management",
    "Trash Log History",
    "Powerful Blog",
    "News & Events",
    "Property Feed Integration",
    "Advanced Contents Management System",
    "Advertisement Management",
  ];

  // ============================================
  // WHY CHOOSE - STATIC
  // ============================================

  const whyChooseItems = [
    {
      icon: "bi-building-check",
      title: "Industry-Specific Expertise",
      description:
        "Our team has 14+ years of experience and understands the specific needs of real estate businesses, helping us create practical digital solutions.",
    },
    {
      icon: "bi-window-sidebar",
      title: "User-Friendly Interface",
      description:
        "We create intuitive and easy-to-navigate websites that help businesses engage customers effortlessly.",
    },
    {
      icon: "bi-phone",
      title: "SEO & Mobile Optimization",
      description:
        "We build responsive websites with search-friendly structures and mobile-first experiences to help businesses reach more customers.",
    },
    {
      icon: "bi-sliders2",
      title: "Advanced Features",
      description:
        "We integrate custom features tailored to client needs, ensuring the website meets business goals effectively.",
    },
    {
      icon: "bi-shield-check",
      title: "Fast & Secure Websites",
      description:
        "Our team prioritizes speed and security, implementing advanced measures to protect against hacking and performance issues.",
    },
    {
      icon: "bi-palette",
      title: "Custom Design & Branding",
      description:
        "We craft unique and visually appealing designs that strengthen your brand identity and help your business stand out.",
    },
    {
      icon: "bi-clock-history",
      title: "On-Time Delivery",
      description:
        "Simple real estate websites can be completed within approximately 2–4 weeks, while custom property portals with CRM, feeds and advanced integrations may require 6–12 weeks.",
    },
    {
      icon: "bi-headset",
      title: "Reliable Support & Maintenance",
      description:
        "RedSpider provides ongoing support and maintenance services to ensure your website remains up-to-date and fully functional.",
    },
  ];

  // ============================================
  // PORTFOLIO ITEMS - STATIC
  // ============================================

  const portfolioItems = [
    {
      title: "Abu Alnaga Development V2",
      category: "Real Estate Developer",
      image: "portfolio/app-1.webp",
      link: "https://aa.rsworkspace.com/",
    },
    {
      title: "Kasco Developments",
      category: "Real Estate Developer Website",
      image: "portfolio/app-2.webp",
      link: "https://www.kascodevelopments.com/",
    },
    {
      title: "Mansion Edition Real Estate",
      category: "Luxury Real Estate - Offplan Projects",
      image: "portfolio/app-3.webp",
      link: "https://www.mansionedition.ae/",
    },
    {
      title: "SPACE & PLACE REAL ESTATE LLC",
      category: "Real Estate Broker Website",
      image: "portfolio/books-1.webp",
      link: "https://www.spaceandplace.ae/",
    },
    {
      title: "DSQ Real Estate – V2",
      category: "Real Estate Broker Website",
      image: "portfolio/books-2.webp",
      link: "https://www.dsqrealestate.ae/",
    },
    {
      title: "Sankari Properties",
      category: "Real Estate Developer Website",
      image: "portfolio/books-3.webp",
      link: "https://www.sankariproperties.com/",
    },
  ];

  // ============================================
  // HERO DATA
  // ============================================

  const heroTitle = hero_title || name || "Our Services";
  const heroSubtitle = hero_subtitle || "";
  const heroDesc = hero_description || description || "";
  const backgroundImage = hero_background || hero_image || "";

  // ============================================
  // IMAGE URL
  // ============================================

  const imageUrl = backgroundImage
    ? `${
        process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public"
      }/storage/${backgroundImage}`
    : "";

  // ============================================
  // FAQ DATA
  // ============================================

  const faqSource = Array.isArray(faqs)
    ? faqs
    : faqs && typeof faqs === "object"
      ? Object.values(faqs)
      : [];

  const validFaqs = faqSource.filter((faq) => faq?.question && faq?.answer);

  const faqTitle = data?.faq_title || "Frequently Asked Questions";

  const faqDescription =
    data?.faq_description ||
    "Find quick answers to common questions about our real estate portal.";

  const faqMidPoint = Math.ceil(validFaqs.length / 2);

  const leftFaqs = validFaqs.slice(0, faqMidPoint);

  const rightFaqs = validFaqs.slice(faqMidPoint);

  return (
    <>
      {/* ============================================
          HERO SECTION
      ============================================ */}

      <section
        className="design-developemnt-hero hero-marquee"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12" data-aos="fade-right">
              <div className="rs-process-title-sec">
                <h1 className="rs-process-title mb-3">
                  Real Estate Website Design
                  {heroSubtitle && (
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

                {heroDesc && <p className="rs-process-text mb-3">{heroDesc}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          INTRO SECTION
      ============================================ */}

      <section className="rs-best-realestate py-5">
        <div className="container py-lg-5" style={{ maxWidth: "1450px" }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="rs-project-gallery">
                <div className="rs-gallery-shape shape-one"></div>
                <div className="rs-gallery-shape shape-two"></div>

                <div className="rs-project-img img-two">
                  <img
                    src="/assets/img/p4.webp"
                    alt="Property portal project"
                  />
                </div>

                <div className="rs-project-img img-three">
                  <img
                    src="/assets/img/p5.webp"
                    alt="Real estate landing page"
                  />
                </div>

                <div className="rs-project-img img-four">
                  <img
                    src="/assets/img/p6.webp"
                    alt="Property listing website"
                  />
                </div>

                <div className="rs-gallery-badge">
                  <span>CRM</span>
                  <small>Lead Ready Website</small>
                </div>

                <div className="rs-dashed-line">
                  <svg viewBox="0 0 620 520" fill="none">
                    <path
                      d="M65 380 C160 230, 230 455, 320 260 C390 130, 470 100, 560 180"
                      stroke="#DE1515"
                      strokeWidth="2.5"
                      strokeDasharray="10 13"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="rs-best-content">
                <div className="title-wrap">
                  <span className="re-label">
                    {intro_small_heading || "Real Estate Web Solutions"}
                  </span>

                  <h3>
                    {intro_main_heading ||
                      "Real Estate Website Solutions in Dubai"}
                  </h3>
                </div>

                <p>
                  {intro_description ||
                    "Looking for a powerful real estate website? We create websites that help you sell faster and manage more easily. We specialize in custom solutions that connect property developers, agents, and buyers through clean layouts, quick search tools, and mobile-friendly pages."}
                </p>

                <p>
                  Our CRM-based websites make it simple to manage listings,
                  capture leads, and grow your business online. Designed to fit
                  different property businesses across the UAE.
                </p>

                <p>
                  We focus on websites that look great and perform even better.
                  Let's build your property website - simple, smart, and built
                  to convert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PROCESS SECTION - DYNAMIC
      ============================================ */}

      {processes.length > 0 && (
        <section className="re-process py-5">
          <div className="container py-lg-5">
            <div className="row justify-content-center text-center">
              <div className="col-lg-10" data-aos="fade-up">
                <div className="title-wrap">
                  {/* POINT #24: H3 -> H2 */}
                  <h2 className="fs-h4 fw-bold">
                    Real Estate Website Design & Development Process
                  </h2>
                </div>

                <p>
                  RedSpider has extensive experience working with real estate
                  businesses and understands the requirements of the Dubai
                  property market. Our experienced team creates custom websites
                  that help agencies, brokers, and developers showcase
                  properties, manage inquiries, and deliver a better user
                  experience.
                </p>

                <p>
                  To ensure every project meets business goals and technical
                  requirements, our team follows a structured 8-stage website
                  design and development process. We work closely with clients
                  at every stage, from planning and design to launch and ongoing
                  support.
                </p>
              </div>
            </div>
          </div>

          <div className="container py-lg-5">
            <div className="row g-4">
              {processes.map((process, index) => (
                <div
                  key={process.id || index}
                  className="col-lg-3 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="re-process-card">
                    <div className="re-process-icon">
                      <i
                        className={`bi bi-${
                          [
                            "search",
                            "diagram-3",
                            "palette",
                            "code-slash",
                            "graph-up-arrow",
                            "bug",
                            "chat-dots",
                            "rocket-takeoff",
                          ][index % 8]
                        }`}
                      ></i>
                    </div>

                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <h3>{process.title}</h3>

                    <p>{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FEATURES SECTION
      ============================================ */}

      <section className="re-features py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="title-wrap">
                <span className="re-label">Main Features</span>

                {/* POINT #24: H3 -> H2 */}
                <h2>Main Features of Real Estate Web Design Agency Dubai</h2>
              </div>

              <p>
                Our team provides a wide range of features for real estate
                websites. These tools are designed to make property management,
                lead generation, and customer interactions easier.
              </p>

              <p>
                Along with these core functions, we also offer smart property
                tools such as AI-based property recommendations, Google Map
                integration, and WhatsApp inquiry features to make communication
                faster and more personal.
              </p>

              <p>
                These features help property buyers explore listings
                interactively while allowing agents and developers to track
                performance in real time.
              </p>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="re-feature-box">
                <div className="row g-3">
                  {realEstateFeatures.map((feature, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="re-item">{feature}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE SECTION
      ============================================ */}

      <section className="why-sticky-sec py-5">
        <div className="container py-lg-5">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="why-sticky-content" data-aos="fade-right">
                <span className="why-label">Why Choose RedSpider</span>

                <h2>Why Businesses Choose RedSpider</h2>

                <p>
                  With over 14 years of experience, RedSpider has extensive
                  experience delivering digital solutions for developers,
                  brokers, and property businesses across Dubai and the UAE.
                </p>

                <p>
                  We help property businesses build professional digital
                  platforms that support their marketing goals, improve customer
                  engagement, and generate meaningful enquiries.
                </p>

                <p>
                  Over the past decade, RedSpider has delivered successful
                  websites for several Dubai-based property companies, helping
                  them generate consistent buyer inquiries and build strong
                  online reputations.
                </p>

                <div className="why-mini-stats">
                  <div>
                    <span>14+</span>
                    <small>Years Experience</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="why-card-list">
                {whyChooseItems.map((item, index) => (
                  <div className="why-row-card" key={index} data-aos="fade-up">
                    <div className={`why-icon shape-${index + 1}`}>
                      <i className={item.icon}></i>
                    </div>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PORTFOLIO INTRO
      ============================================ */}

      <section
        id="section-two"
        className="section dynamic-text effect-title pb-0"
      >
        <div className="container">
          <div className="dynamic-text-heading">
            <div className="dynamic-text-clone">
              <div>500+ Successful Projects</div>
              <div>Delivered Across Dubai & UAE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PORTFOLIO
      ============================================ */}

      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <div className="row gy-4 isotope-container">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                >
                  <div className="portfolio-content h-100">
                    <img
                      src={`/assets/img/${item.image}`}
                      className="img-fluid"
                      alt={item.title}
                    />

                    <div className="portfolio-info">
                      <h4>{item.title}</h4>

                      <p>{item.category}</p>

                      <a
                        href={`/assets/img/${item.image}`}
                        title=""
                        data-gallery="portfolio-gallery-app"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES SHOWCASE
      ============================================ */}

      <section className="re-services-showcase py-5">
        <div className="container">
          {/* Row 1 */}
          <div className="row align-items-center g-5 service-row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="service-image">
                <img src="/assets/img/rewd-ser.webp" alt="" />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="title-wrap">
                <span className="re-label">Commercial Solutions</span>

                <h3>Commercial Real Estate Web Design Services in Dubai</h3>
              </div>

              <p>
                Nowadays, having just a beautiful website is not enough. To
                stand out in the property market, businesses need a website that
                supports lead generation, property discovery, and customer
                engagement.
              </p>

              <p>
                We provide high-quality commercial website solutions for
                agencies and developers that help generate qualified leads and
                improve customer engagement.
              </p>

              <a href="#" className="service-btn">
                Learn More
              </a>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row align-items-center g-5 service-row flex-lg-row-reverse">
            <div className="col-lg-6" data-aos="fade-left">
              <div className="service-image dark-image">
                <img src="/assets/img/rewd-ser-2.webp" alt="" />

                <div className="service-overlay">
                  CRM
                  <small>Integrated Property Platform</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-right">
              <div className="title-wrap">
                <span className="re-label">Development</span>

                <h3>Real Estate Website Development</h3>
              </div>

              <p>
                We create custom digital solutions for agencies, brokers and
                developers using advanced property search, CRM integration and
                lead generation tools.
              </p>

              <p>
                Every website is designed to simplify property management while
                delivering a seamless experience for visitors.
              </p>

              <a href="#" className="service-btn">
                View Portfolio
              </a>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row align-items-center g-5 service-row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="service-image">
                <img src="/assets/img/rewd-ser-3.webp" alt="" />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="title-wrap">
                <span className="re-label">Business Growth</span>

                <h3>
                  Custom Real Estate Websites Designed for Business Growth
                </h3>
              </div>

              <p>
                We build elegant and user-friendly websites that help property
                businesses manage listings, track inquiries and streamline
                communication.
              </p>

              <p>
                Our responsive websites include CRM integration, SEO
                optimization and modern UI that turns visitors into buyers.
              </p>

              <a href="#" className="service-btn">
                Start Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          LAUNCH SECTION
      ============================================ */}

      <section className="re-launch py-5">
        <div className="container py-lg-5">
          <div className="re-launch-wrap">
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-left">
                <div className="re-launch-content">
                  <div className="title-wrap">
                    <span className="re-label">Website Launch</span>

                    <h3>Launch Your Real Estate Website with RedSpider</h3>
                  </div>

                  <p>
                    Did you just start your business as a real estate agency in
                    Dubai or a property dealer in Dubai? You will need a new
                    website to promote it properly.
                  </p>

                  <p>
                    Are you having trouble upgrading your existing website?
                    Having a professional website designed and built has never
                    been this easy.
                  </p>

                  <p>
                    Similarly, we can update your existing website with quality
                    features and enhance its functionality. At RedSpider, we
                    make the development process easy and hassle-free.
                  </p>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-right">
                <div className="re-launch-img">
                  <img
                    src="/assets/img/rewd-ser-4.webp"
                    alt="Launch real estate website"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MORE SERVICES SHOWCASE
      ============================================ */}

      <section className="re-services-showcase py-5">
        <div className="container">
          {/* Row 1 */}
          <div className="row align-items-center g-5 service-row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="service-image">
                <img src="/assets/img/rewd-ser-5.webp" alt="" />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="title-wrap">
                <span className="re-label">Drives More Leads</span>

                <h3>Create a Real Estate Website That Drives More Leads</h3>
              </div>

              <p>
                At RedSpider, we specialize in designing and developing
                high-quality websites for property businesses. We create
                websites that are fast and easy to use for both buyers and
                sellers.
              </p>

              <p>
                Our team understands the unique needs of the property industry.
                We build websites that help agents manage listings easily while
                providing visitors with a smooth browsing experience.
              </p>

              <p>
                Your website will not only look impressive but will function
                properly, too. Whether you want to generate more leads, showcase
                your portfolio, or improve your online presence, we can develop
                solutions that support your business growth.
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row align-items-center g-5 service-row flex-lg-row-reverse">
            <div className="col-lg-6" data-aos="fade-left">
              <div className="service-image dark-image">
                <img src="/assets/img/rewd-ser-6.webp" alt="" />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-right">
              <div className="title-wrap">
                <span className="re-label">Built to Sell Properties</span>

                <h3>Custom Websites Built to Sell Properties</h3>
              </div>

              <p>
                Every real estate business is unique and may have different
                requirements. A professional website can become an effective
                promotional tool for branding, audience engagement, and sales.
              </p>

              <p>
                At RedSpider, we design custom websites that showcase property
                listings to potential buyers. With immersive 360 tours and
                user-friendly galleries, visitors can explore properties and
                understand what you offer.
              </p>

              <p>
                Whether you need a sleek website for luxury developments or a
                powerful platform for large property inventories, we can create
                a fully functional digital experience that builds trust from the
                first click.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row align-items-center g-5 service-row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="service-image">
                <img src="/assets/img/rewd-ser-7.webp" alt="" />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="title-wrap">
                <span className="re-label">Social Media Design</span>

                <h3>
                  Professional Social Media Design for Real Estate Businesses
                </h3>
              </div>

              <p>
                Our team manages social media design for property businesses
                looking to increase engagement and build long-term visibility.
                We create campaigns and content that help real estate offices
                and agents connect with potential customers.
              </p>

              <p>
                As every business is different, we use a customized approach for
                social media content and campaign design in Dubai. This ensures
                that each property dealer or office receives personalized
                attention.
              </p>

              <p>
                Every website project we build follows a careful approach. We
                ensure every stage, starting from design, development, and
                launch, is completed properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQs - DYNAMIC
      ============================================ */}

      {validFaqs.length > 0 && (
        <section
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section py-5 light-background"
        >
          <div className="container rs-home-faq-box">
            <div className="text-center mb-3 border-bottom pb-3">
              <h2 className="fw-bold rs-process-title">{faqTitle}</h2>

              <p className="rs-section-subtitle mx-auto text-center">
                {faqDescription}
              </p>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id="realEstateFaqLeft">
                  {leftFaqs.map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`left-${faq.id || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`real-estate-faq-left-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#real-estate-faq-left-${index}`}
                          aria-expanded="false"
                          aria-controls={`real-estate-faq-left-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

                      <div
                        id={`real-estate-faq-left-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`real-estate-faq-left-heading-${index}`}
                        data-bs-parent="#realEstateFaqLeft"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="accordion" id="realEstateFaqRight">
                  {rightFaqs.map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`right-${faq.id || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`real-estate-faq-right-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#real-estate-faq-right-${index}`}
                          aria-expanded="false"
                          aria-controls={`real-estate-faq-right-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

                      <div
                        id={`real-estate-faq-right-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`real-estate-faq-right-heading-${index}`}
                        data-bs-parent="#realEstateFaqRight"
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

      <ServiceCTA service={data} />
    </>
  );
}
