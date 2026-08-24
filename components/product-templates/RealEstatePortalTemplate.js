// frontend/components/product-templates/RealEstatePortalTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function RealEstatePortalTemplate({ data }) {
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
    faqs = [],
    gallery = [],
  } = data;

  // ============================================
  // ❌ STATIC FIELDS - Abhi hardcoded (Future Dynamic)
  // ============================================

  // Real Estate Features - Static (Future Dynamic)
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
    "Powerful jQuery Approach",
    "Advanced Contents Management System",
    "Advertisement Management",
  ];

  // Why Choose - Static (Future Dynamic)
  const whyChooseItems = [
    {
      icon: "bi-building-check",
      title: "Industry-Specific Expertise",
      description:
        "Every member of our Real Estate Web Design team has 14+ years of experience and deep expertise in the real estate industry to deliver the best solutions.",
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
        "To ensure better visibility in search engines and adapt to the growing number of mobile users, we build SEO-Optimized Real Estate Websites.",
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
        "We craft unique and visually appealing designs that strengthen your brand identity and make your real estate website stand out.",
    },
    {
      icon: "bi-clock-history",
      title: "On-Time Delivery",
      description:
        "Typically, our team completes Real Estate Web Design & Development projects within 10 to 15 days.",
    },
    {
      icon: "bi-headset",
      title: "Reliable Support & Maintenance",
      description:
        "RedSpider provides ongoing support and maintenance services to ensure your website remains up-to-date and fully functional.",
    },
  ];

  // Portfolio Items - Static (Future Dynamic)
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
      category: "Real Estate Developer website",
      image: "portfolio/books-3.webp",
      link: "https://www.sankariproperties.com/",
    },
  ];

  return (
    <>
      {/* Hero */}
      <ServiceHero service={data} />

      {/* Best Real Estate Section - Intro */}
      <section className="rs-best-realestate py-5">
        <div className="container py-lg-5" style={{ maxWidth: "1450px" }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="rs-project-gallery">
                <div className="rs-gallery-shape shape-one"></div>
                <div className="rs-gallery-shape shape-two"></div>
                <div className="rs-project-img img-two">
                  <img src="/assets/img/p4.webp" alt="Property portal project" />
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
                    {intro_small_heading || "Real Estate Web Design Dubai"}
                  </span>
                  <h3>
                    {intro_main_heading ||
                      "Best Real Estate Web Design Company in Dubai UAE"}
                  </h3>
                </div>
                <p>
                  {intro_description ||
                    "Looking for a powerful real estate website? We create websites that help you sell faster and manage more easily. We specialize in custom real estate web design solutions that connect property developers, agents, and buyers through clean layouts, quick search tools, and mobile-friendly pages."}
                </p>
                <p>
                  Our CRM-based real estate websites make it simple to manage
                  listings, capture leads, and grow your business online.
                  Designed to fit every real estate business in the UAE.
                  Choosing the right real estate website design company Dubai
                  can make a significant difference in your online success.
                </p>
                <p>
                  As a trusted real estate website design company in Dubai, we
                  focus on websites that look great and perform even better.
                  Let's build your dream real estate website - simple, smart,
                  and built to convert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Dynamic */}
      {processes.length > 0 && (
        <section className="re-process py-5">
          <div className="container py-lg-5">
            <div className="row justify-content-center text-center">
              <div className="col-lg-10" data-aos="fade-up">
                <div className="title-wrap">
                  <h3 className="fs-h4 fw-bold">
                    Real Estate Website Design & Development Process
                  </h3>
                </div>
                <p>
                  RedSpider has extensive experience working with real estate
                  businesses and understands the requirements of the Dubai
                  property market. Our real estate web design Dubai team creates
                  custom websites that help agencies, brokers, and developers
                  showcase properties, manage inquiries, and deliver a better
                  user experience.
                </p>
                <p>
                  To ensure every project meets business goals and technical
                  requirements, our real estate web design company Dubai follows
                  a structured 8-stage website design and development process.
                  Our team works closely with clients at every stage, from
                  planning and design to launch and ongoing support.
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

      {/* Features Section - Static */}
      <section className="re-features py-5">
        <div className="container py-lg-5" >
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="title-wrap">
                <span className="re-label">Main Features</span>
                <h3>Main Features of Real Estate Web Design Agency Dubai</h3>
              </div>
              <p>
                As the best real estate website design company in Dubai, our
                team of designers and developers provides a wide range of Real
                Estate Website features for our clients' websites. Some of these
                key features are listed:
              </p>
              <p>
                Along with these core functions, we also offer smart property
                tools such as AI-based property recommendations, Google Map
                integration, and WhatsApp inquiry features to make communication
                faster and more personal. These features help property buyers
                explore listings interactively while allowing agents and
                developers to track performance in real time. Designed for
                Dubai's competitive market, our Real estate web design company
                improves engagement and increases qualified inquiries.
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

      {/* Why Choose - Static */}
      <section className="why-sticky-sec py-5">
        <div className="container py-lg-5" style={{ maxWidth: "1450px" }}>
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="why-sticky-content" data-aos="fade-right">
                <span className="why-label">Why Choose RedSpider</span>
                <h2>Trusted Real Estate Website Design Dubai Company</h2>
                <p>
                  With over 14 years of experience, RedSpider has successfully
                  completed 500+ real estate website design and development
                  projects in Dubai, establishing a strong reputation in the
                  market. Redspider is a trusted Dubai Real Estate Website
                  Designing company that not only provides Web Design &
                  Development services but also offers additional solutions to
                  boost your website's market presence and meet client needs.
                  The following are our core features:
                </p>
                <p>
                  Over the past decade, RedSpider has delivered successful
                  websites for several Dubai-based property companies, helping
                  them generate consistent buyer inquiries and build strong
                  online reputations. With our expertise in the UAE market, fast
                  delivery timelines, and secure hosting infrastructure, we
                  continue to be a trusted partner for real estate professionals
                  who want measurable online growth.
                </p>
                <div className="why-mini-stats">
                  <div>
                    <span>14+</span>
                    <small>Years Experience</small>
                  </div>
                  <div>
                    <span>500+</span>
                    <small>Projects Completed</small>
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

      {/* Portfolio Section */}
      <section
        id="section-two"
        className="section dynamic-text effect-title pb-0"
      >
        <div className="container">
          <h2>
            <div className="dynamic-text-clone">
              <div>500+ Successful Projects</div>
              <div>Delivered Across Dubai & UAE</div>
            </div>
          </h2>
        </div>
      </section>

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

      {/* Services Showcase - Static */}
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
                Nowadays, having just a beautiful website is not enough. If you
                want to stand out in the real estate market, it is important to
                have a good real estate website design company in Dubai.
              </p>
              <p>
                We provide high-quality commercial real estate web design
                services for agencies and developers that help generate
                qualified leads and improve customer engagement.
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
                <h3>Real Estate Website Development Company Dubai</h3>
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

      {/* Launch Section */}
      <section className="re-launch py-5">
        <div className="container py-lg-5">
          <div className="re-launch-wrap">
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-left">
                <div className="re-launch-content">
                  <div className="title-wrap">
                    <span className="re-label">Website Launch</span>
                    <h3>Launch Your Real Estate Website with Redspider</h3>
                  </div>
                  <p>
                    Did you just start your business as a real estate agency in
                    Dubai or a property dealer in Dubai? You will need a new
                    website to promote it properly.
                  </p>
                  <p>
                    Are you having trouble upgrading your existing website?
                    Having a professional real estate website design and build
                    has never been this easy.
                  </p>
                  <p>
                    Similarly, we can update your existing website with quality
                    features and enhance its functionality. At RedSpider, we can
                    make the real estate website development process easy and
                    hassle-free.
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

      {/* More Services Showcase */}
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
                At Redspider, we specialize in designing and developing high
                quality real estate websites. As a full-service professional
                real estate website design company in Dubai, we create websites
                that are fast and easy to use for both buyers and sellers.
              </p>
              <p>
                Our team is full of talented professionals who understand the
                unique needs of the real estate industry. We will build a web
                design for real estate agents that will help you manage your
                listings easily, while the users will have the perfect browsing
                experience. We make use of the latest programs and web design
                techniques that can cater to the needs of your buyers.
              </p>
              <p>
                Your website will not only look impressive but will function
                properly, too. If you want to generate more leads, showcase your
                portfolio, or improve your online presence, don't hesitate to
                contact Real Estate Website Design Company in UAE. We can
                develop solutions that will support the growth of your real
                estate business at every step.
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
                <h3>
                  Real Estate Web Design Dubai - Custom Websites Built to Sell
                  Properties
                </h3>
              </div>
              <p>
                Every real estate business is unique and may have different
                requirements than others. Nowadays, having a good website is
                very important as it becomes a good promotional tool. Whether it
                is the branding, gaining an audience, or reaching a specific
                sales goal, look no further.
              </p>
              <p>
                At Redspider, we design Custom Websites to Sell Properties that
                will showcase your listing to potential buyers. Businesses who
                dont have a good website often fail, and we understand it well.
                With the immersive 360 tours and user friendly galleries,
                visitors can know what you are offering. Are you looking for a
                sleek website that showcases luxury developments?
              </p>
              <p>
                Or are you looking for a powerful platform that features large
                property inventories? We can create a fully functional website
                for the real estate industry that attracts the visitor and
                builds trust from the very first click!
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
                Our team manages real estate social media design for every real
                estate company wanting to reach the top. We specialize in real
                estate marketing that promises long term growth. You don't have
                to worry about creating posts for your social media. Our team
                will manage the social media campaigns for real estate offices
                and agents that bring high engagement from users.
              </p>
              <p>
                As every business is different, we make use of a customized
                approach for real estate social media post design in Dubai. It
                ensures that each property dealer or office gets personalized
                attention. As a result, you will successfully attract and engage
                clients.
              </p>
              <p>
                Every real estate website we build follows a careful approach.
                We ensure every stage, starting from design, development, and
                launch, is completed properly. Our team always focuses on
                delivering exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

     

      {/* FAQs - Dynamic */}
      {faqs.length > 0 && (
        <section
          id="rs-faq-sec"
          className="rs-faq-sec section py-5 light-background"
        >
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold">FAQ's</h2>
            </div>
            <div className="accordion rs-faq-custom" id="rsFaqOne">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={faq.id || index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button rs-faq-btn ${index === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${index}`}
                    >
                      <span className="faq-icon">+</span>
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faq${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    data-bs-parent="#rsFaqOne"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <ServiceCTA service={data} />
    </>
  );
}
