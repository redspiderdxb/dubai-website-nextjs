import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const SOLUTION_ICONS = [
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

const PLATFORM_ICONS = [
  "bi-bag-check",
  "bi-wordpress",
  "bi-boxes",
  "bi-braces",
  "bi-gear-wide-connected",
];

export default function EcommerceTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Ecommerce · Dubai",
    intro_description = "At RedSpider we offer the best ecommerce web design and development services in Dubai. Each webstore is built with creativity, innovation and passion. Our team plans each step from product browsing to secure checkout keeping in mind your customer's convenience.",
    cta_button_text,
    cta_button_link,
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_cta = true,
    features_title = "Ecommerce Website Solutions We Offer",
    features_subtitle = "All solutions are built around your products, customers and business goals.",
    benefits_title = "Why Choose RedSpider for Ecommerce Development Services",
    benefits_subtitle = "Stores built for product management, secure checkout and long-term growth.",
    processes_title = "Our Ecommerce Development Process",
    processes_subtitle = "Carefully planned to maintain quality, meet project requirements and support timely delivery.",
    technologies_title = "Ecommerce Platforms We Work With",
    technologies_subtitle = "We help you choose the best platform after discussing product range, budget, customisation and expansion plans.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers about our ecommerce website development services.",
    section_order = [
      "hero",
      "intro",
      "features",
      "technologies",
      "benefits",
      "processes",
      "industries",
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const imageBase =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";
  const contactHref = cta_button_link || "/contact-us/";

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

  const platforms =
    technologies.length > 0
      ? technologies
      : [
          {
            title: "Shopify",
            description:
              "Ideal for startups and growing businesses looking for a secure, easy-to-manage store.",
          },
          {
            title: "WooCommerce",
            description:
              "Flexible WordPress ecommerce with plugins and customisation for growing catalogues.",
          },
          {
            title: "Magento",
            description:
              "Suitable for larger catalogues that need powerful features and scalability.",
          },
          {
            title: "Laravel Ecommerce",
            description:
              "A custom store built around your processes, speed and integrations.",
          },
          {
            title: "Custom Ecommerce Development",
            description:
              "For businesses that need special workflows or connections to other systems.",
          },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We analyse goals, audience and ecommerce requirements to create a clear project roadmap.",
          },
          {
            title: "Platform Selection",
            description:
              "We help you choose the right platform based on products, budget and future plans.",
          },
          {
            title: "Design & Development",
            description:
              "Visual design focused on product browsing, trust and conversion.",
          },
          {
            title: "Testing & Quality Assurance",
            description:
              "Checkout, payments and catalogue checks across devices and browsers.",
          },
          {
            title: "Launch & Support",
            description:
              "We launch the store and provide technical support and maintenance.",
          },
        ];

  const featureItems =
    benefits.length > 0
      ? benefits
      : [
          { title: "Responsive design for desktop, tablets and mobile devices" },
          { title: "Secure payment gateway integration" },
          { title: "Fast-loading pages for a better user experience" },
          { title: "Easily manage products and categories" },
          { title: "Enhanced inventory and stock management" },
          { title: "Easy-to-use shopping cart and checkout" },
          { title: "Customer accounts and order tracking" },
          { title: "SEO-friendly website structure" },
        ];

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

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question:
              "How much does ecommerce website development cost in Dubai?",
            answer:
              "The cost depends on platform, features, design complexity and integrations. We provide customised quotes based on your needs.",
          },
          {
            question: "Which ecommerce platform is best for my business?",
            answer:
              "It depends on product range, budget, technical requirements and growth plans. We recommend a platform after reviewing your needs.",
          },
          {
            question: "How long does it take to build an ecommerce website?",
            answer:
              "Timelines typically range from 4–12 weeks depending on complexity and features.",
          },
          {
            question: "Do you provide ongoing maintenance and support?",
            answer:
              "Yes. We offer maintenance, security updates and technical support so your store keeps running smoothly.",
          },
        ];

  const sectionMap = {
    hero: {
      component: (
        <section
          key="hero"
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${imageBase}/storage/${hero_background})`
              : hero_image
                ? `url(${imageBase}/storage/${hero_image})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                Ecommerce Development
                {hero_subtitle ? (
                  <span className="rs-process-highlight">
                    in Dubai
                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>
                ) : null}
              </h1>
              {hero_description ? (
                <p className="rs-process-text mb-3">
                  RedSpider designs and develops ecommerce websites that help
                  businesses sell online with clear product browsing, secure
                  checkout and easy store management.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ),
      show: show_hero,
    },
    intro: {
      component: (
        <section key="intro" className="rs-creative-intro">
          <div className="container">
            <div className="rs-creative-intro__grid">
              <div className="rs-creative-intro__meta">
                <span className="rs-creative-kicker">{intro_small_heading}</span>
                <p className="rs-creative-intro__note">Stores that convert</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  From product pages to payments and order management, we plan
                  each step so customers can browse, trust and complete a
                  purchase.
                </p>
                <a className="rs-creative-link" href="#ecommerce-solutions">
                  Explore store solutions
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
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
          key="features"
          id="ecommerce-solutions"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we build</span>
              <h2>{features_title}</h2>
              <p>{features_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {solutions.map((item, index) => (
                <article
                  key={`${item.id || item.title}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${SOLUTION_ICONS[index % SOLUTION_ICONS.length]}`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title || item.name}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_features,
    },
    technologies: {
      component: (
        <section key="technologies" className="rs-creative-platforms">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Platforms</span>
              <h2>{technologies_title}</h2>
              <p>{technologies_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {platforms.map((item, index) => (
                <article
                  key={`${item.id || item.title}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${PLATFORM_ICONS[index % PLATFORM_ICONS.length]}`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title || item.name}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_technologies,
    },
    benefits: {
      component: (
        <section key="benefits" className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Store features</span>
                <h2>{benefits_title}</h2>
                <p>{benefits_subtitle}</p>
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-pill-grid">
                {featureItems.map((item, index) => (
                  <article
                    key={`${item.id || item.title}-${index}`}
                    className="rs-creative-pill"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{typeof item === "string" ? item : item.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },
    processes: {
      component: (
        <section key="processes" className="rs-creative-process">
          <div className="container">
            <div className="rs-creative-head rs-creative-head--light">
              <span className="rs-creative-kicker">How we work</span>
              <h2>{processes_title}</h2>
              <p>{processes_subtitle}</p>
            </div>
            <ol className="rs-creative-steps">
              {processData.map((process, index) => (
                <li
                  key={`${process.id || process.title}-${index}`}
                  className="rs-creative-step"
                >
                  <span className="rs-creative-step__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ),
      show: show_processes,
    },
    industries: {
      component: (
        <section key="industries" className="rs-creative-industries">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Industries</span>
              <h2>Stores we build for</h2>
              <p>Ecommerce websites for product brands and wholesale businesses.</p>
            </div>
            <div className="rs-creative-industry-grid">
              {industryItems.map((name, index) => (
                <article key={name} className="rs-creative-industry">
                  <span className="rs-creative-industry__icon" aria-hidden="true">
                    <i className="bi bi-shop"></i>
                  </span>
                  <h3>{name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: true,
    },
    faqs: {
      component: (
        <ServiceFaqs
          key="faqs"
          faqs={faqData}
          title={faqs_title}
          subtitle={faqs_subtitle}
          idPrefix="ecommerce"
        />
      ),
      show: show_faqs,
    },
    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

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
        "technologies",
        "benefits",
        "processes",
        "industries",
        "faqs",
        "cta",
      ];
    }
    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section || !section.show) return null;
        return section.component;
      })
      .filter(Boolean);
  };

  return (
    <div>
      {custom_css ? <style dangerouslySetInnerHTML={{ __html: custom_css }} /> : null}
      <main className="service-template ecommerce-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? <script dangerouslySetInnerHTML={{ __html: custom_js }} /> : null}
    </div>
  );
}
