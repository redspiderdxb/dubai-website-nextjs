// frontend/components/product-templates/DailyDealTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function DailyDealTemplate({ data }) {
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
    faqs = [],
    gallery = [],
  } = data;

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
    "Find quick answers to common questions about our daily deal website script.";

  const faqMidPoint = Math.ceil(validFaqs.length / 2);

  const leftFaqs = validFaqs.slice(0, faqMidPoint);

  const rightFaqs = validFaqs.slice(faqMidPoint);

  // ============================================
  // ❌ STATIC FIELDS - Abhi hardcoded (Future Dynamic)
  // ============================================

  // Diamond Version Features - Static (Future Dynamic)
  const diamondFeatures = [
    "All basic components of Deal site including email notifications",
    "Free Installation on your server",
    "City-wise deals & account history management",
    "Search engine optimized & friendly URL",
    "Category-wise deals & theme changing",
    "Social media websites posting & sharing system",
    "Connect with Facebook",
    "Newsletter management system",
    "Manage online activity and statistics",
    "Making An RSS Feed – Search Engine Watch",
    "Automatic Sitemap Creation",
    "Payment Gateway (PayPal, 2Checkout, Authorize & Credit Card)",
    "My Shopping basket",
    "Printable Deals Coupon",
    "Recommend deal / Gift Deal",
    "Deal chat & discussion option",
    "Referral bonus program / Referral marketing modules",
    "Dynamic website setting from Admin Panel",
    "Sharing with Social sites",
    "Managing multilingual",
    "Dynamic Currency Conversion",
    "Affiliate Partners",
    "Mobile Version included",
    "Support Multiple Payment Gateway",
    "Authorize.net payment gateway",
    "2Checkout payment gateway",
    "PayPal payment gateway",
    "Auto-post to Facebook & Twitter social sites",
    "Instant deals",
    "Web Analytics reporting tool",
    "Free facebook application",
  ];

  // Platforms - Static (Future Dynamic)
  const platforms = [
    { name: "SHOPIFY", icon: "shopify.webp" },
    { name: "WOOCOMMERCE", icon: "woocommerce.webp" },
    { name: "MAGENTO", icon: "magento.webp" },
    { name: "LARAVEL ECOMMERCE", icon: "laravel.webp" },
    { name: "CUSTOM DEVELOPMENT", icon: "php.webp" },
  ];

  return (
    <>
      {/* Hero */}
      <ServiceHero service={data} />

      {/* Hero Banner Section */}
      <section id="hero-banner" className="hero-banner section rs-full-section">
        <div className="rs-hero-banner">
          <div className="container" >
            {/* Row 1 : Title */}
            <div className="row align-items-center text-center text-lg-start mb-5">
              <div className="col-12 col-lg-10">
                <h1 className="hero-titleinner text-center text-lg-start">
                  <strong>Daily Deal </strong>
                  Website Script
                </h1>
              </div>
              <div className="col-12"></div>
            </div>

            {/* Row 2 */}
            <div className="row align-items-center g-4 text-center text-lg-start mt-4">
              <div className="col-12 col-md-12 col-lg-4 order-2 order-lg-1 pe-lg-5">
                <p>
                  HouponDeal is an innovative and effective product of RedSpider
                  Systems. It is an open source Groupon Clone PHP script which
                  offers you the best and cost effective Groupon/Cobone Clone
                  script in the market. Start your own group buying website with
                  our HouponDeal open source Groupon clone script. Some of the
                  features of HouponDeal include free themes, strong payment
                  gateway integration, mobile version of the site and many more.
                </p>
              </div>

              <div className="col-12 col-md-12 col-lg-6 order-1 order-lg-2">
                <div className="rs-video-wrapper">
                  <div className="video-wrapper">
                    <video autoPlay muted loop playsInline className="w-100">
                      <source
                        src="/assets/img/videos/script.mov"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-12 col-lg-2 d-flex justify-content-center justify-content-lg-end order-3">
                <div className="rs-circle-wrap">
                  <a href="#" className="rs-circle-btn">
                    <span className="rs-arrow">↗</span>
                    <h3 className="rs-text">
                      Get In <br /> Touch
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Groupon/Cobone */}
      <section
        id="mobile-app-bs"
        className="mobile-app-bs section light-background dot-bg py-5"
      >
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold mb-4">
              {intro_main_heading || "What is Groupon/Cobone?"}
            </h2>
            <p className="rs-subtitle">
              {intro_description ||
                "Launched in 2008, Groupon/Cobone has taken the web world by storm. Groupon is a deal of the day website that offers you daily discounted deals which range from restaurants, shopping to air tickets and package tours. Groupon is based on the simple concept of making all the amazing deals to their subscribers each day. Users can easily sign up for daily alerts of the deals. Anyone who likes it can select and buy a deal easily."}
            </p>
          </div>
        </div>
      </section>

      {/* Diamond Version Features */}
      <section className="key-features py-5">
        <div className="container" style={{ maxWidth: "1290px" }}>
          <div className="row align-items-start">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h2 className="kf-title mb-0">Diamond Version</h2>
              <p>(Includes all features in diamond Version)</p>
            </div>

            <div className="col-lg-4">
              <ul className="kf-list list-unstyled mb-3">
                <li>Free Installation</li>
                <li>Mobile version of your website</li>
                <li>
                  2Checkout, Authorize.net, Paypal, Credit Card payment gateway
                  integration
                </li>
                <li>Instant deals</li>
              </ul>
            </div>

            <div className="col-lg-4 mb-4 mb-lg-0">
              <ul className="kf-list list-unstyled mb-3">
                <li>Mail notification on daily basis</li>
                <li>
                  Automatic deal posting on social sites (facebook & twitter)
                </li>
                <li>Free Facebook Application</li>
                <li>Free Live Technical Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="card-icon-types section dark-background line-bg-dark pb-4">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-4">
              <div className="rs-left-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="mt-4">Why us?</h4>
                  <div className="rs-arrow-btn mt-4">
                    <span>
                      <img
                        src="/assets/img/arrow-icon-40.svg"
                        alt=""
                        className="arrow-40deg-icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-5 quick-contect">
                  <small>Quick Contact</small>
                  <h5>: 971555515475</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-12">
                  <div className="rs-card">
                    <p>
                      Groupon/Cobone is a very fast growing and successful
                      business trend. Now is the time to join this new ecommerce
                      trend and become a part of this profitable venture.
                      HouponDeals is a powerful Groupon/Cobone clone script
                      which is build in PHP programming and MySql database.
                    </p>
                    <p>
                      RedSpider Systems will walk hand in hand with you in the
                      installation and implementation of your website. We also
                      deliver custom made designs to meet your business needs.
                      Our skilled and expert team will customize your site,
                      design and logo according to your requirements. Our
                      professional developer team can also implement additional
                      functionally to the site, giving you the freedom to put
                      your ideas into your product. We can also develop a mobile
                      application for your website which allows your customers
                      to shop on mobile. Our creative team will make your dreams
                      come true. Our clients are successfully running their
                      profit making business by using our HouponDeals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="ecommerce-platforms section dark-background line-bg-dark pt-0">
        <div className="container text-center">
          <div className="row g-4 justify-content-center">
            {platforms.map((platform, index) => (
              <div className="col-6 col-md-4 col-lg" key={index}>
                <div className="ep-card">
                  <img
                    src={`/assets/img/icons/${platform.icon}`}
                    alt={platform.name}
                  />
                  <h6>{platform.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Features Grid */}
      <section className="daily-features section dark-background line-bg-dark">
        <div className="container">
          <div className="df-header d-flex justify-content-between">
            <div>Features</div>
            <div className="text-center">Diamond Version</div>
          </div>

          {diamondFeatures.map((feature, index) => (
            <div className="df-row" key={index}>
              <div>{feature}</div>
              <div className="df-right">
                <span className="check">✔</span>
              </div>
            </div>
          ))}

          <div className="df-row highlight">
            <div>iPhone, Android Mobile Application Development available</div>
            <div className="df-right fw-bold">At an additional cost</div>
          </div>
        </div>
      </section>

    
     

      {/* FAQs - Dynamic */}
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
                <div className="accordion" id="dailyDealFaqLeft">
                  {leftFaqs.map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`left-${faq.id || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`daily-deal-faq-left-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#daily-deal-faq-left-${index}`}
                          aria-expanded="false"
                          aria-controls={`daily-deal-faq-left-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

                      <div
                        id={`daily-deal-faq-left-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`daily-deal-faq-left-heading-${index}`}
                        data-bs-parent="#dailyDealFaqLeft"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="accordion" id="dailyDealFaqRight">
                  {rightFaqs.map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`right-${faq.id || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`daily-deal-faq-right-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#daily-deal-faq-right-${index}`}
                          aria-expanded="false"
                          aria-controls={`daily-deal-faq-right-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h3>

                      <div
                        id={`daily-deal-faq-right-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`daily-deal-faq-right-heading-${index}`}
                        data-bs-parent="#dailyDealFaqRight"
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
      <ServiceCTA service={data} />
    </>
  );
}
