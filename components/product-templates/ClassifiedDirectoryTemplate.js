// frontend/components/product-templates/ClassifiedDirectoryTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function ClassifiedDirectoryTemplate({ data }) {
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
    features = [],
    benefits = [],
    faqs = [],
    gallery = [],
  } = data;

  // ============================================
  // ❌ STATIC FIELDS - Abhi hardcoded (Future Dynamic)
  // ============================================

  // Frontend Features - Static (Future Dynamic)
  const frontendFeatures = [
    {
      title: "Listing Features",
      items: [
        "Advanced listing fields according to selected category",
        "Featured Listings",
        "Unlimited Categories and Sub-Categories",
        "Upload Photos",
        "Photos Automatically Resized",
        "More Listings from This Advertiser",
        "Ad View Counter",
      ],
    },
    {
      title: "Home Page Features",
      items: [
        "Quick browser by category list",
        "Features ads display",
        "Blogs/article section",
        "Quick search",
      ],
    },
    {
      title: "Advanced Google Mapping",
      items: [
        "Google map for all listings",
        "Mark Google location during ad listing step",
      ],
    },
    {
      title: "Security Features",
      items: [
        "Security codes (Captcha) on forms",
        "Registration validation via email",
        "Credit card data never stored on your server for PCI compliance",
      ],
    },
    {
      title: "Advanced Search Features",
      items: [
        "Search category, keywords, location",
        "Saved searches",
        "Featured listings display 1st in search results",
        "Paged search results – previous, next, paging",
      ],
    },
    {
      title: "Membership Plan",
      items: [
        "Unlimited pricing plans",
        "Pricing plan types – individual listing, subscription, category based pricing supported",
      ],
    },
    {
      title: "Customer Self Service Features",
      items: [
        "Online registration with email validation",
        "Login/logout",
        "Remember me",
        "Forgotten password",
        "Profile update",
        "Privacy preferences",
        "Refer friend",
        "My account control panel",
      ],
    },
  ];

  // Admin Features - Static (Future Dynamic)
  const adminFeatures = [
    {
      title: "Admin Features - Part 1",
      items: [
        "Customers – view, edit, add, change, delete, send email, export, purge",
        "Sections/category management",
        "Pricing plan management",
        "Contents pages management",
        "Display ad management",
      ],
    },
    {
      title: "Admin Features - Part 2",
      items: [
        "Settings wizard for site setup and preferences",
        "Trash history",
        "Banner management",
        "Contact / spams / enquiry management",
        "Listings – view, edit, add, change, delete, approve, browse, export, purge",
      ],
    },
    {
      title: "Admin Features - Part 3",
      items: [
        "Master records management section / category wise",
        "Site Text – home page, page titles",
        "Country / Cities / Location management",
        "Blogs/articles management",
        "Email templates to control text sent in email messages",
      ],
    },
    {
      title: "Admin Features - Part 4",
      items: [
        "Delivery server management",
        "Common settings",
        "Themes / extensions section",
        "Ads listing images management (approve / delete)",
      ],
    },
  ];

  // Feature Cards - Static (Future Dynamic)
  const featureCards = [
    {
      icon: "email-3.svg",
      title: "User-Friendly and Highly Customizable",
      text: "RSClassify offers an intuitive, web-based admin interface that makes site management seamless. Whether you want to list cars, electronics, furniture, sporting goods, or real estate properties, RSClassify has you covered. The platform is fully customizable, allowing you to adapt it to your unique business needs. With Dubizzle Clone, you can create a site that serves various niche markets or a broad selection of categories—whatever works best for your audience.",
    },
    {
      icon: "email-4.svg",
      title: "Monetize Your Website Easily",
      text: "Monetization options are abundant with RSClassify. You can make money from your website using Google AdSense, affiliate programs, or by implementing different pricing plans for listings. The platform supports payment integration, enabling users to pay directly on your site using multiple gateways like PayPal or custom payment processors. This ensures that you can generate revenue without much effort, whether through paid listings or other revenue streams.",
    },
    {
      icon: "email-5.svg",
      title: "Manage Listings Efficiently",
      text: "RSClassify empowers you to take full control of your site. You can manage listings, track users, and optimize content through an easy-to-navigate admin panel. Plus, the software is mobile responsive, so your site will look great and function smoothly across all devices, enhancing the user experience and boosting your platform's success.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <ServiceHero service={data} />

      {/* Hero Banner Section */}
      <section id="hero-banner" className="hero-banner section rs-full-section">
        <div className="rs-hero-banner">
          <div className="container" style={{ maxWidth: "1600px" }}>
            <div className="row align-items-center g-4 text-center text-lg-start mt-4">
              <div className="col-12 col-md-12 col-lg-6 order-2 order-lg-1 pe-lg-5">
                <h1 className="hero-titleinner text-center text-lg-start mb-4 ext-title">
                  <strong>Classified Website, </strong>
                  Dubizzle Clone, Olx Clone
                </h1>
                <p className="rs-desc">
                  Powerful and Easy-to-Use Software for Creating Online
                  Directories & Classified Ad Websites like Dubizzle, Olx
                  website.
                </p>

                <p>
                  RSClassify is the ideal product for building general-purpose
                  classified advertising websites. RSClassify can be used for
                  any item for sale including cars, electronics, furniture,
                  sporting goods, real estate, etc.
                </p>
                <p>
                  You can sell any combination of listings, with unlimited
                  pricing plans. Monetize your site with Google Adsense or
                  similar programs. You can take payments directly on your site
                  with a payment gateway or use PayPal standard as an
                  inexpensive payment processor.
                </p>
                <p>
                  You have full control of your site via our easy-to-use
                  web-based back office admin area.
                </p>

                <div className="rs-circle-wrap justify-content-md-start justify-content-center">
                  <a href="#" className="rs-circle-btn">
                    <span className="rs-arrow">↗</span>
                    <h3 className="rs-text">
                      Get In <br /> Touch
                    </h3>
                  </a>
                </div>
              </div>

              <div className="col-12 col-md-12 col-lg-6 order-1 order-lg-2">
                <img
                  src="/assets/img/Dubizzle-Olx-768x768.webp"
                  className="img-fluid rs-hero-img"
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section
        id="mobile-app-bs"
        className="mobile-app-bs section light-background dot-bg py-5"
      >
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold mb-4">
              {intro_main_heading ||
                "Dubizzle Clone: Build Your Own Classified Ad Website with RSClassify"}
            </h2>
            <p className="rs-subtitle">
              {intro_description ||
                "Looking to create a successful online directory or classified ad website like Dubizzle Clone? RSClassify is the perfect software solution for developing a fully functional platform similar to popular websites like Dubizzle and OLX. It is designed to make building, managing, and monetizing your classified ad website simple and effective, catering to a wide range of listings."}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="card-icon-types section dark-background line-bg-dark">
        <div className="container" style={{ maxWidth: "1700px" }}>
          <div className="row g-4">
            {featureCards.map((card, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="ect-card h-100 d-flex flex-column justify-content-between">
                  <img
                    src={`/assets/img/icons/${card.icon}`}
                    className="ect-icon mb-3"
                    alt=""
                  />
                  <div>
                    <h6 className="ect-heading">{card.title}</h6>
                    <p className="ect-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frontend Features Accordion */}
      <div className="dubizzle-clone-features section dark-background rs-service-grid-outline pt-0">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold">Frontend Features</h2>
          </div>
        </div>

        <div
          className="container accordion"
          id="featuresAccordion"
          style={{ maxWidth: "1050px" }}
        >
          {frontendFeatures.map((feature, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#feature-${index}`}
                >
                  {feature.title}
                </button>
              </h2>
              <div
                id={`feature-${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    {feature.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Features */}
      <section className="rs-packages-sec dark-background section">
        <div className="container" style={{ maxWidth: "1550px" }}>
          <div className="section-title text-center text-white mb-4">
            <h2 className="fw-bold">Admin Features</h2>
            <p className="rs-subtitle">Administration Rich Features Detail</p>
          </div>

          <div className="row g-4 align-items-stretch mb-5">
            {adminFeatures.map((feature, index) => (
              <div className="col-md-3" key={index}>
                <div className="rs-card">
                  <ul>
                    {feature.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12">
              <div className="rs-left-card h-100 d-flex flex-column flex-lg-row justify-content-between align-items-center text-center text-lg-start">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 gap-md-5">
                  <span className="rs-join">Join With Us</span>
                  <h4 className="mb-0">
                    Amazing Pricing For <br />
                    Growth Business
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
                <div className="mt-4 mt-lg-0 quick-contect text-center text-lg-end">
                  <small>Quick Contact</small>
                  <h5>: 971555515475</h5>
                </div>
              </div>
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
                      data-bs-target={`#faq-${index}`}
                    >
                      <span className="faq-icon">+</span>
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faq-${index}`}
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
