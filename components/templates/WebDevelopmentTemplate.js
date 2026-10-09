import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";
import GoogleReviews from "../ui/GoogleReviews";
import WebDevelopmentPortfolio from "../services/WebDevelopmentPortfolio";
import WebDevelopmentServices from "../services/WebDevelopmentServices";

const SERVICE_ICONS = [
  "bi-code-slash",
  "bi-wordpress",
  "bi-phone",
  "bi-gear",
  "bi-diagram-3",
  "bi-shield-check",
];

const ADVANTAGE_CARDS = [
  {
    number: "01",
    title: "Industry Experience Across UAE",
    description:
      "Experience across real estate, corporate, healthcare, education, retail, and service business websites across Dubai and the UAE.",
    icon: "/assets/img/web-development/advantage/1.webp",
  },
  {
    number: "02",
    title: "Strategic Layout & User Experience",
    description:
      "Clear structure and intuitive navigation designed to improve engagement and usability.",
    icon: "/assets/img/web-development/advantage/2.webp",
  },
  {
    number: "03",
    title: "Conversion-Focused Structure",
    description:
      "Smart visual flow and strong calls to action built for lead generation.",
    icon: "/assets/img/web-development/advantage/3.webp",
  },
  {
    number: "04",
    title: "SEO-Friendly Foundation",
    description:
      "Clean, fast, and search-optimized website structure from the start.",
    icon: "/assets/img/web-development/advantage/4.webp",
  },
  {
    number: "05",
    title: "Custom UI/UX Approach",
    description:
      "Tailored design aligned with brand identity, uniqueness, and consistency.",
    icon: "/assets/img/web-development/advantage/5.webp",
  },
  {
    number: "06",
    title: "Scalable & Future-Ready",
    description:
      "Flexible design built for future updates, integration, and growth.",
    icon: "/assets/img/web-development/advantage/6.webp",
  },
  {
    number: "07",
    title: "Transparent Workflow & Timelines",
    description:
      "A structured process from wireframing to deployment with clarity at each step.",
    icon: "/assets/img/web-development/advantage/7.webp",
  },
];

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Requirement Analysis",
    description:
      "We analyze business goals, target audience, and technical needs.",
    icon: "/assets/img/web-development/workflow/1.webp",
  },
  {
    number: "02",
    title: "Wireframe & Structure Planning",
    description:
      "We define user flow, content hierarchy, and navigation structure.",
    icon: "/assets/img/web-development/workflow/2.webp",
  },
  {
    number: "03",
    title: "UI/UX Planning",
    description:
      "We craft engaging, intuitive interfaces that strengthen user experience.",
    icon: "/assets/img/web-development/workflow/3.webp",
  },
  {
    number: "04",
    title: "Development & Integration",
    description:
      "We build responsive pages and integrate required features seamlessly.",
    icon: "/assets/img/web-development/workflow/4.webp",
  },
  {
    number: "05",
    title: "Testing & Optimization",
    description:
      "We test and optimize to ensure smooth performance across devices.",
    icon: "/assets/img/web-development/workflow/5.webp",
  },
];

export default function WebDevelopmentTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Web Development · Dubai, UAE",
    intro_description = "We build modern websites that reflect your brand. Our team creates responsive, SEO-friendly websites that help businesses grow online.",
    features = [],
    faqs = [],
    gallery = [],
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,
    features_title = "Our Web Development Services",
    features_subtitle = "At RedSpider, we offer a wide range of web development services to cater to your needs.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about our services.",
    gallery_title = "Our Work",
    gallery_subtitle = "",
    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "gallery",
      "review",
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const imageBase =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    const image = String(imagePath).trim();
    if (image.startsWith("https://") || image.startsWith("/")) return image;
    if (image.startsWith("http://") && !image.includes("localhost")) return image;
    if (image.includes("/storage/")) {
      return `${imageBase}${image.substring(image.indexOf("/storage/"))}`;
    }
    return `${imageBase}/storage/${image}`;
  };

  const servicesData =
    features.length > 0
      ? features
      : [
          {
            title: "Custom Website Development",
            description:
              "Bespoke websites built around your brand, content and business workflows.",
          },
          {
            title: "CMS & WordPress Development",
            description:
              "Easy-to-manage websites with clean structure, plugins and content workflows.",
          },
          {
            title: "Responsive Web Design",
            description:
              "Layouts that work clearly on desktop, tablet and mobile without compromise.",
          },
          {
            title: "Web Applications",
            description:
              "Custom functionality, dashboards and tools that support how your team works.",
          },
          {
            title: "Integrations & APIs",
            description:
              "Connect CRM, payment, booking and business systems to your website.",
          },
          {
            title: "Maintenance & Support",
            description:
              "Updates, security, backups and technical support after launch.",
          },
        ];

  const uniqueGallery = Array.from(
    new Map(
      (gallery || [])
        .filter((item) => item?.image)
        .map((item) => [item.image, item]),
    ).values(),
  ).slice(0, 9);

  const sectionMap = {
    hero: {
      component: (
        <section
          key="hero"
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${getImageUrl(hero_background)})`
              : hero_image
                ? `url(${getImageUrl(hero_image)})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                Web Development
                {hero_subtitle ? (
                  <span className="rs-process-highlight">
                    Company in Dubai
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
                  RedSpider provides custom web development solutions for
                  businesses that need reliable, scalable and easy-to-manage
                  websites. From CMS development and WordPress solutions to
                  custom functionality and integrations, we build websites
                  around practical business and technical requirements.
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
                </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  From a simple business website to a custom platform, we plan
                  structure, design and development so your site stays easy to
                  manage and ready to grow.
                </p>
                <a className="rs-creative-link" href="#web-development-services">
                  Explore our services
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
      component: data.slug === "web-development" ? (
        <WebDevelopmentServices key="features" />
      ) : (
        <section
          key="features"
          id="web-development-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              
              <h2>{features_title}</h2>
              <p>{features_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {servicesData.map((item, index) => (
                <article
                  key={`${item.id || item.title}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${
                          item.icon && String(item.icon).includes("bi")
                            ? item.icon
                            : SERVICE_ICONS[index % SERVICE_ICONS.length]
                        }`}
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
    benefits: {
      component: (
        <section key="benefits" className="rs-wd-advantage">
          <svg
            className="rs-wd-advantage__web"
            viewBox="0 0 480 360"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke="#f3b7bd"
              strokeWidth="1"
            >
              <path d="M250 20 C300 80 340 70 470 40" />
              <path d="M260 30 C320 120 360 150 470 120" />
              <path d="M270 40 C330 160 380 210 470 200" />
              <path d="M280 50 C340 190 390 250 460 280" />
              <path d="M300 18 C340 90 300 160 250 240" />
              <path d="M340 16 C390 100 410 180 390 280" />
              <path d="M390 14 C430 110 450 190 470 270" />
              <path d="M240 80 C320 90 380 70 460 90" />
              <path d="M250 140 C330 150 390 130 470 160" />
              <path d="M260 200 C340 190 400 210 470 230" />
            </g>
          </svg>
          <span className="rs-wd-advantage__wash rs-wd-advantage__wash--left" aria-hidden="true" />
          <span className="rs-wd-advantage__wash rs-wd-advantage__wash--right" aria-hidden="true" />
          <span className="rs-wd-advantage__orb rs-wd-advantage__orb--small" aria-hidden="true" />
          <span className="rs-wd-advantage__orb rs-wd-advantage__orb--large" aria-hidden="true" />

          <div className="container rs-wd-advantage__inner">
            <div className="rs-wd-advantage__intro" data-aos="fade-up">
              <p className="rs-wd-advantage__eyebrow">Our Advantage</p>
              <h2>
                Why is <span>RedSpider</span> a trustworthy{" "}
                <br />
                choice for businesses?
              </h2>
              <p>
                We combine industry experience, strategic design, and a
                results-driven approach to deliver websites that help
                businesses grow with confidence.
              </p>
            </div>

            <div className="rs-wd-advantage__grid">
              {ADVANTAGE_CARDS.map((card, index) => (
                <article
                  key={card.number}
                  className={`rs-wd-advantage__card${
                    index === ADVANTAGE_CARDS.length - 1
                      ? " rs-wd-advantage__card--wide"
                      : ""
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={80 + index * 70}
                  data-aos-duration="750"
                >
                  <img
                    className="rs-wd-advantage__icon"
                    src={card.icon}
                    alt=""
                  />
                  <div className="rs-wd-advantage__copy">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="rs-wd-advantage__rule" aria-hidden="true" />
                  </div>
                  <span className="rs-wd-advantage__num">{card.number}</span>
                  <span className="rs-wd-advantage__arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
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
        <section key="processes" className="rs-wd-workflow">
          <span className="rs-wd-workflow__arc" aria-hidden="true" />
          <span className="rs-wd-workflow__glow" aria-hidden="true" />
          <span className="rs-wd-workflow__glow rs-wd-workflow__glow--bottom" aria-hidden="true" />
          <span className="rs-wd-workflow__dots" aria-hidden="true" />

          <div className="rs-wd-workflow__inner">
            <div className="rs-wd-workflow__intro" data-aos="fade-up">
              <p className="rs-wd-workflow__eyebrow">How we work</p>
              <h2>Web Design &amp; Development in Dubai</h2>
              <p>
                Dubai is a web design and development company with extensive
                experience and track record.
              </p>
            </div>

            <div className="rs-wd-workflow__track">
              {WORKFLOW_STEPS.map((step, index) => (
                <article
                  key={step.number}
                  className="rs-wd-workflow__card"
                  data-aos="fade-up"
                  data-aos-delay={60 + index * 80}
                  data-aos-duration="750"
                >
                  <div className="rs-wd-workflow__badge">
                    <span className="rs-wd-workflow__num">{step.number}</span>
                    <span className="rs-wd-workflow__ring">
                      <img src={step.icon} alt="" />
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index < WORKFLOW_STEPS.length - 1 ? (
                    <span className="rs-wd-workflow__link" aria-hidden="true">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path
                          d="M3 2.5 7.5 6 3 9.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_processes,
    },
    gallery: {
      component: (
        <WebDevelopmentPortfolio
          key="gallery"
          title={gallery_title || "Our Work"}
          subtitle={gallery_subtitle}
          items={uniqueGallery}
          getImageSrc={getImageUrl}
        />
      ),
      show: show_gallery,
    },
    review: {
      component: <GoogleReviews key="review" />,
      show: true,
    },
    faqs: {
      component: (
        <ServiceFaqs
          key="faqs"
          faqs={faqs}
          title={faqs_title}
          subtitle={faqs_subtitle}
          idPrefix="webdev"
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
        "benefits",
        "processes",
        "gallery",
        "review",
        "faqs",
        "cta",
      ];
    }
    if (!order.includes("intro") && order.includes("hero")) {
      order.splice(order.indexOf("hero") + 1, 0, "intro");
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
      <main className="service-template web-development-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? <script dangerouslySetInnerHTML={{ __html: custom_js }} /> : null}
    </div>
  );
}
