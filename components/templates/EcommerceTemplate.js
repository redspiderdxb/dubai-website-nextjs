import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const ECOMMERCE_SOLUTIONS = [
  {
    title: "Custom Ecommerce Website Development",
    description: "We build tailored ecommerce websites for your business goals.",
    icon: "/assets/img/ecommerce-solutions/custom-website.svg",
  },
  {
    title: "Shopify Store Development",
    description: "Custom Shopify stores with theme and app integration.",
    icon: "/assets/img/ecommerce-solutions/shopify-store.svg",
  },
  {
    title: "WooCommerce Development",
    description: "Flexible WooCommerce solutions with WordPress.",
    icon: "/assets/img/ecommerce-solutions/woocommerce.svg",
  },
  {
    title: "Magento Ecommerce Development",
    description: "Scalable Magento solutions for growing brands.",
    icon: "/assets/img/ecommerce-solutions/magento.svg",
  },
  {
    title: "Laravel Ecommerce Development",
    description: "Advanced Laravel ecommerce systems with custom functionality.",
    icon: "/assets/img/ecommerce-solutions/laravel.svg",
  },
  {
    title: "Multi-Vendor Marketplace Development",
    description: "Marketplace platforms for multiple sellers.",
    icon: "/assets/img/ecommerce-solutions/marketplace.svg",
  },
  {
    title: "Secure Payment Gateway Integration",
    description: "Safe and seamless online payment integration.",
    icon: "/assets/img/ecommerce-solutions/payment.svg",
  },
  {
    title: "Mobile-Responsive Ecommerce Design",
    description: "Mobile-first ecommerce design for all devices.",
    icon: "/assets/img/ecommerce-solutions/mobile.svg",
  },
  {
    title: "Inventory & Order Management Systems",
    description: "Efficient tools for inventory and order workflows.",
    icon: "/assets/img/ecommerce-solutions/inventory.svg",
  },
  {
    title: "Ecommerce Website Redesign & Migration",
    description: "Upgrade and migrate existing ecommerce stores.",
    icon: "/assets/img/ecommerce-solutions/redesign.svg",
  },
  {
    title: "Routine Maintenance & Technical Support",
    description: "Ongoing support and maintenance for ecommerce platforms.",
    icon: "/assets/img/ecommerce-solutions/maintenance.svg",
  },
];

const ECOMMERCE_PLATFORMS = [
  {
    title: "Shopify",
    description:
      "Secure online stores for startups and growing businesses, with simple product management tools.",
    icon: "/assets/img/ecommerce-platforms/shopify.svg",
  },
  {
    title: "WooCommerce",
    description:
      "Flexible WordPress ecommerce with plugins and tools for managing products, orders, and sales.",
    icon: "/assets/img/ecommerce-platforms/woocommerce.svg",
  },
  {
    title: "Magento",
    description:
      "Scalable ecommerce for large businesses needing advanced features, custom workflows, and future growth.",
    icon: "/assets/img/ecommerce-platforms/magento.svg",
  },
  {
    title: "Laravel Ecommerce",
    description:
      "Custom ecommerce solutions tailored to your business processes, integrations, performance, and operational requirements.",
    icon: "/assets/img/ecommerce-platforms/laravel.svg",
  },
  {
    title: "Custom Ecommerce Development",
    description:
      "Bespoke ecommerce development for unique business needs, specialist integrations, and custom operational workflows.",
    icon: "/assets/img/ecommerce-platforms/custom-development.svg",
  },
];

const WHY_FEATURES = [
  { title: "Responsive Design", icon: "/assets/img/ecommerce-features/responsive-design.svg" },
  { title: "Secure Payment Integration", icon: "/assets/img/ecommerce-features/secure-payment.svg" },
  { title: "Fast Loading Pages", icon: "/assets/img/ecommerce-features/fast-loading.svg" },
  { title: "Easy Product Management", icon: "/assets/img/ecommerce-features/product-management.svg" },
  { title: "Inventory Management", icon: "/assets/img/ecommerce-features/inventory.svg" },
  { title: "Easy Shopping Cart", icon: "/assets/img/ecommerce-features/shopping-cart.svg" },
  { title: "Customer Accounts", icon: "/assets/img/ecommerce-features/customer-accounts.svg" },
  { title: "Product Search & Filtering", icon: "/assets/img/ecommerce-features/product-search.svg" },
  { title: "SEO Friendly", icon: "/assets/img/ecommerce-features/seo-friendly.svg" },
  { title: "Shipping & Tax Configurations", icon: "/assets/img/ecommerce-features/shipping-tax.svg" },
  { title: "Admin Dashboard", icon: "/assets/img/ecommerce-features/admin-dashboard.svg" },
];

const PROCESS_STEPS = [
  {
    title: "Requirement Analysis",
    description:
      "We analyze your business goals, target audience, and ecommerce requirements to create a clear project roadmap.",
    icon: "/assets/img/ecommerce-process/process-01-requirement-analysis.png",
    width: 200,
    height: 176,
  },
  {
    title: "Platform Selection",
    description:
      "We help you choose the right ecommerce platform based on your product range, budget, and future plans.",
    icon: "/assets/img/ecommerce-process/process-02-platform-selection.png",
    width: 232,
    height: 152,
  },
  {
    title: "Design & Development",
    description:
      "We create visually appealing designs with a focus on user experience and conversion optimization.",
    icon: "/assets/img/ecommerce-process/process-03-design-development.png",
    width: 196,
    height: 156,
  },
  {
    title: "Testing & Quality Assurance",
    description:
      "We conduct extensive testing to ensure smooth functionality across all devices and browsers.",
    icon: "/assets/img/ecommerce-process/process-04-testing-quality.png",
    width: 212,
    height: 164,
  },
  {
    title: "Launch & Support",
    description:
      "We deploy your ecommerce store and provide ongoing technical support and maintenance.",
    icon: "/assets/img/ecommerce-process/process-05-launch-support.png",
    width: 240,
    height: 178,
  },
];

// Fixed static portfolio cards (all six). Names come from each site's own page title.
const FIXED_PORTFOLIO_PROJECTS = [
  {
    id: "fixed-zehi",
    title: "ZEHI",
    image: "/assets/img/ecommerce-portfolio/zehi.png",
    fullImage: "/assets/img/ecommerce-portfolio/zehi-fullpage-optimized.png",
    link: "https://jewellery2.rsworkspace.net/",
  },
  {
    id: "fixed-diamont-fzco",
    title: "DIAMONT FZCO",
    image: "/assets/img/ecommerce-portfolio/diamont-fzco.png",
    fullImage: "/assets/img/ecommerce-portfolio/diamont-fzco-fullpage-optimized.png",
    link: "https://jewellery.rsworkspace.net/",
  },
  {
    id: "fixed-health-wellness-me",
    title: "Health & Wellness ME",
    image: "/assets/img/ecommerce-portfolio/health-wellness-me.png",
    fullImage: "/assets/img/ecommerce-portfolio/health-wellness-me-fullpage-optimized.png",
    link: "http://hw.rsworkspace.net/",
  },
  {
    id: "fixed-boj-middle-east",
    title: "BOJ Middle East",
    image: "/assets/img/ecommerce-portfolio/boj-thumbnail.png",
    fullImage: "/assets/img/ecommerce-portfolio/boj-fullpage-optimized.webp",
    link: "https://boj.rsworkspace.net/",
  },
];

// Shows a project URL as its hostname, e.g. https://www.example.ae/ -> example.ae
const getProjectHost = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// Zoom steps for the full-page popup; the first step fits the image to the popup width
const POPUP_ZOOM_LEVELS = [1, 1.5, 2, 3];

// Premium full-page popup for the fixed portfolio cards.
// Shows one continuous full-page screenshot (an image, never a live page).
function PortfolioPagePopup({ projects, index, onClose, onNavigate }) {
  const [zoomIndex, setZoomIndex] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const closeRef = useRef(null);
  const project = projects[index];
  const count = projects.length;
  const lastZoom = POPUP_ZOOM_LEVELS.length - 1;
  const zoom = POPUP_ZOOM_LEVELS[zoomIndex];

  // Parent re-keys this component per project, so every project starts fresh.
  // Lock page scroll while open and focus the close button.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (count > 1 && event.key === "ArrowRight") onNavigate((index + 1) % count);
      if (count > 1 && event.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
      if (event.key === "+" || event.key === "=") setZoomIndex((z) => Math.min(z + 1, lastZoom));
      if (event.key === "-") setZoomIndex((z) => Math.max(z - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, lastZoom, onClose, onNavigate]);

  return createPortal(
    <div className="ecommerce-template">
      <div
        className="rs-ecom-popup"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} full page preview`}
      >
        <div className="rs-ecom-popup__bar">
          <div className="rs-ecom-popup__title">
            <span className="rs-ecom-popup__name">{project.title}</span>
            {count > 1 ? (
              <span className="rs-ecom-popup__count">
                {index + 1} / {count}
              </span>
            ) : null}
          </div>
          <div className="rs-ecom-popup__tools">
            <button
              type="button"
              className="rs-ecom-popup__btn"
              onClick={() => setZoomIndex((z) => Math.max(z - 1, 0))}
              disabled={zoomIndex === 0}
              aria-label="Zoom out"
            >
              <i className="bi bi-dash-lg" aria-hidden="true"></i>
            </button>
            <span className="rs-ecom-popup__zoom" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              className="rs-ecom-popup__btn"
              onClick={() => setZoomIndex((z) => Math.min(z + 1, lastZoom))}
              disabled={zoomIndex === lastZoom}
              aria-label="Zoom in"
            >
              <i className="bi bi-plus-lg" aria-hidden="true"></i>
            </button>
            <a
              className="rs-ecom-popup__open"
              href={project.fullImage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} HD image in a new tab`}
            >
              <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              <span>Open HD image</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              className="rs-ecom-popup__btn"
              onClick={onClose}
              aria-label="Close preview"
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div
          className="rs-ecom-popup__body"
          onClick={(event) => {
            // Clicking the empty dark area around the image closes the popup
            if (event.target === event.currentTarget) onClose();
          }}
        >
          {!imageReady ? <span className="rs-ecom-popup__spinner" aria-hidden="true"></span> : null}
          <img
            className="rs-ecom-popup__image"
            src={project.fullImage}
            alt={`Full page screenshot of ${project.title}`}
            decoding="async"
            style={{ width: `${zoom * 100}%`, opacity: imageReady ? 1 : 0 }}
            onLoad={() => setImageReady(true)}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = project.image;
              setImageReady(true);
            }}
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              className="rs-ecom-popup__nav rs-ecom-popup__nav--prev"
              onClick={() => onNavigate((index - 1 + count) % count)}
              aria-label="Previous project"
            >
              <i className="bi bi-chevron-left" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="rs-ecom-popup__nav rs-ecom-popup__nav--next"
              onClick={() => onNavigate((index + 1) % count)}
              aria-label="Next project"
            >
              <i className="bi bi-chevron-right" aria-hidden="true"></i>
            </button>
          </>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

export default function EcommerceTemplate({ data }) {
  // All portfolio cards are static now; API projects are no longer rendered here
  const portfolioProjects = FIXED_PORTFOLIO_PROJECTS;

  const [popupIndex, setPopupIndex] = useState(-1);
  const popupTriggerRef = useRef(null);

  // Closing the popup returns focus to the card that opened it
  const closePopup = useCallback(() => {
    setPopupIndex(-1);
    popupTriggerRef.current?.focus({ preventScroll: true });
  }, []);

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    cta_button_text,
    cta_button_link,
    faqs = [],
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_cta = true,
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

  // Page-specific: the intro heading is a <div> only on the
  // ecommerce-web-design-dubai service page; every other ecommerce
  // service keeps its <h2>.
  const IntroHeading =
    data?.slug === "ecommerce-web-design-dubai" ? "div" : "h2";

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
                eCommerce Website Design Dubai
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
        <section key="intro" className="rs-ecom-intro">
          <div className="container">
            <div className="rs-ecom-intro__grid">
              <div className="rs-ecom-intro__copy">
                <IntroHeading className="rs-ecom-intro__heading">
                  RedSpider provides professional ecommerce website development
                  in Dubai, creating secure, user-friendly online stores
                  designed around your products and customers.
                </IntroHeading>
                <p className="rs-ecom-intro__lead">
                  From product browsing and payment integration to inventory and
                  order management, we build practical ecommerce solutions that
                  make online selling and store management easier.
                </p>
                <p className="rs-ecom-intro__support">
                  From product pages to payments and order management, we plan
                  each step so customers can browse, trust and complete a
                  purchase.
                </p>
                <a className="rs-ecom-intro__cta" href="#ecommerce-solutions">
                  Explore store solutions
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-ecom-intro__visual">
                <img
                  src="/assets/img/ecommerce-store-illustration-transparent.png"
                  alt="Online store illustration with a laptop, phone, shopping bags and feature labels for browsing, payments, orders and inventory"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
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
          className="rs-ecom-solutions"
        >
          <div className="container">
            <div className="rs-ecom-solutions__head">
              <span className="rs-ecom-solutions__eyebrow">What we build</span>
              <h2>
                Explore Our{" "}
                <span className="rs-ecom-solutions__nowrap">E-commerce</span>{" "}
                <span className="rs-ecom-solutions__accent">Website Solutions</span>
              </h2>
              <p>
                All solutions are built around your products, customers, and
                business goals.
              </p>
            </div>
            <div className="rs-ecom-solutions__grid">
              {ECOMMERCE_SOLUTIONS.map((item, index) => (
                <article key={item.title} className="rs-ecom-solutions__card">
                  <span className="rs-ecom-solutions__icon" aria-hidden="true">
                    <img
                      src={item.icon}
                      alt=""
                      width="36"
                      height="36"
                      loading="lazy"
                    />
                  </span>
                  <div className="rs-ecom-solutions__body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="rs-ecom-solutions__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
        <section key="technologies" className="rs-ecom-platforms">
          <div className="container">
            <div className="rs-ecom-platforms__head">
              <span className="rs-ecom-platforms__eyebrow">Platforms</span>
              <h2>Ecommerce Platforms We Work With</h2>
              <p>
                We will help you decide the best ecommerce platform after
                discussing the product range, budget, customization needs and
                future plans for expansion.
              </p>
            </div>
            <div className="rs-ecom-platforms__grid">
              {ECOMMERCE_PLATFORMS.map((item, index) => (
                <article key={item.title} className="rs-ecom-platforms__card">
                  <div className="rs-ecom-platforms__top">
                    <span className="rs-ecom-platforms__icon" aria-hidden="true">
                      <img
                        src={item.icon}
                        alt=""
                        width="40"
                        height="40"
                        loading="lazy"
                      />
                    </span>
                    <span className="rs-ecom-platforms__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="rs-ecom-platforms__bar" aria-hidden="true"></span>
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
        <section key="benefits" className="rs-ecom-why">
          <div className="container">
            <div className="rs-ecom-why__intro">
              <div className="rs-ecom-why__text">
                <p className="rs-ecom-why__eyebrow">STORE FEATURES</p>
                <h2 className="rs-ecom-why__heading">
                  Why Businesses Choose RedSpider for Ecommerce Development
                </h2>
                <p className="rs-ecom-why__lead">
                  Your ecommerce website should be visually appealing, fast and
                  user-friendly. We build practical features that make shopping
                  easier and store management simpler.
                </p>
              </div>
              <div className="rs-ecom-why__visual">
                <img
                  src="/assets/img/ecommerce-features/glossy-red-shopping-scene.png"
                  alt="Glossy red e-commerce shopping scene with a laptop storefront, phone cart, shopping bags and feature badges for payments, shipping, analytics and security"
                  width="1819"
                  height="865"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="rs-ecom-why__grid">
              {WHY_FEATURES.map((item, index) => (
                <article key={item.title} className="rs-ecom-why__card">
                  <span className="rs-ecom-why__icon" aria-hidden="true">
                    <img src={item.icon} alt="" width="34" height="34" loading="lazy" />
                  </span>
                  <span className="rs-ecom-why__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rs-ecom-why__divider" aria-hidden="true"></span>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },
    processes: {
      component: (
        <section key="processes" className="rs-ecom-process">
          <div className="container">
            <div className="rs-ecom-process__head">
              <p className="rs-ecom-process__eyebrow">HOW WE WORK</p>
              <h2 className="rs-ecom-process__heading">
                Our Ecommerce Development Process
              </h2>
              <p className="rs-ecom-process__lead">
                Our ecommerce development process is carefully planned to
                maintain quality, meet project requirements and support timely
                delivery.
              </p>
            </div>
            <ol className="rs-ecom-process__steps">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.title} className="rs-ecom-process__step">
                  <article className="rs-ecom-process__card">
                    <span className="rs-ecom-process__art" aria-hidden="true">
                      <img
                        src={step.icon}
                        alt=""
                        width={step.width}
                        height={step.height}
                        loading="lazy"
                      />
                    </span>
                    <span className="rs-ecom-process__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                  {index < PROCESS_STEPS.length - 1 ? (
                    <span className="rs-ecom-process__arrow" aria-hidden="true">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  ) : null}
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
    portfolio: {
      component: (
        <section key="portfolio" className="rs-ecom-portfolio">
          <div className="container">
            <div className="rs-ecom-portfolio__head">
              <div className="rs-ecom-portfolio__copy">
                <span className="rs-ecom-portfolio__pill">{"// WORK //"}</span>
                <h2 className="rs-ecom-portfolio__heading">
                  Brands We&apos;ve Transformed
                </h2>
                <p className="rs-ecom-portfolio__lead">
                  A glimpse into ecommerce stores we have designed and developed
                  for brands across Dubai and the UAE.
                </p>
              </div>
              <Link className="rs-ecom-portfolio__viewall" href="/our-portfolio/">
                View All
                <i className="bi bi-plus-lg" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="rs-ecom-portfolio__grid">
              {portfolioProjects.map((project, index) => (
                <article key={project.id} className="rs-ecom-portfolio__card">
                  <img
                    className="rs-ecom-portfolio__bg"
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="rs-ecom-portfolio__hit"
                    onClick={(event) => {
                      popupTriggerRef.current = event.currentTarget;
                      setPopupIndex(index);
                    }}
                    aria-label={`Open ${project.title} preview`}
                  >
                    <img
                      className="rs-ecom-portfolio__preview"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "/assets/img/portfolio/portfolio-1.webp";
                      }}
                    />
                  </button>
                  <div className="rs-ecom-portfolio__overlay">
                    <span className="rs-ecom-portfolio__name">
                      {project.title}
                    </span>
                    <a
                      className="rs-ecom-portfolio__url"
                      onClick={(event) => event.stopPropagation()}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getProjectHost(project.link)}
                      <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        {popupIndex >= 0 ? (
          <PortfolioPagePopup
            key={popupIndex}
            projects={FIXED_PORTFOLIO_PROJECTS}
            index={popupIndex}
            onClose={closePopup}
            onNavigate={setPopupIndex}
          />
        ) : null}
        </section>
      ),
      show: portfolioProjects.length > 0,
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
    // Portfolio sits directly before FAQ, including for CMS-supplied orders
    if (!order.includes("portfolio")) {
      const faqIndex = order.indexOf("faqs");
      order =
        faqIndex >= 0
          ? [...order.slice(0, faqIndex), "portfolio", ...order.slice(faqIndex)]
          : [...order, "portfolio"];
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
