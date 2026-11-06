import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const SERVICE_ICONS = [
  "bi-android2",
  "bi-apple",
  "bi-phone",
  "bi-palette",
  "bi-clipboard-check",
  "bi-arrow-repeat",
  "bi-building",
];

const PLATFORM_ICONS = [
  "bi-android2",
  "bi-apple",
  "bi-layers",
  "bi-window",
];

const INDUSTRY_ICONS = [
  "bi-bag-check",
  "bi-truck",
  "bi-heart-pulse",
  "bi-mortarboard",
  "bi-buildings",
  "bi-briefcase",
];

// Uses the CMS Bootstrap icon when the item has one, otherwise the fallback list.
const iconFor = (item, fallback, index) =>
  typeof item?.icon === "string" && item.icon.startsWith("bi-")
    ? item.icon
    : fallback[index % fallback.length];

// Benefit icons are picked by card heading keywords, falling back to card order.
const BENEFIT_ICON_RULES = [
  { match: /team|people|experience/i, icon: "bi-people" },
  { match: /scal|growth|approach/i, icon: "bi-graph-up-arrow" },
  { match: /secur|reliab/i, icon: "bi-shield-check" },
  { match: /support|technical/i, icon: "bi-headset" },
];

const benefitIcon = (item, index) => {
  const title = String(item?.title || "");
  const rule = BENEFIT_ICON_RULES.find((r) => r.match.test(title));
  return (rule || BENEFIT_ICON_RULES[index % BENEFIT_ICON_RULES.length]).icon;
};

// Process icons: matched by step heading keywords, falling back to step order.
const PROCESS_ICON_RULES = [
  { match: /requirement|analysis/i, icon: "bi-search" },
  { match: /\bui\b|ux|design/i, icon: "bi-window-stack" },
  { match: /develop|build|engineer/i, icon: "bi-code-slash" },
  { match: /test|quality|qa/i, icon: "bi-laptop" },
  { match: /deploy|launch|release/i, icon: "bi-rocket-takeoff" },
];

const processIcon = (item, index) => {
  const title = String(item?.title || "");
  const rule = PROCESS_ICON_RULES.find((r) => r.match.test(title));
  return (rule || PROCESS_ICON_RULES[index % PROCESS_ICON_RULES.length]).icon;
};

const stepNumber = (index) => String(index + 1).padStart(2, "0");

// Highlights the first match of `accent` in red; returns the plain text otherwise.
const withAccent = (text, accent, ignoreCase = false) => {
  const value = String(text || "");
  const haystack = ignoreCase ? value.toLowerCase() : value;
  const needle = ignoreCase ? String(accent || "").toLowerCase() : accent;
  const at = accent ? haystack.indexOf(needle) : -1;
  if (at === -1) return value;
  return (
    <>
      {value.slice(0, at)}
      <span className="mad-accent">{value.slice(at, at + accent.length)}</span>
      {value.slice(at + accent.length)}
    </>
  );
};

export default function MobileAppTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    intro_small_heading = "Mobile App Development · Dubai",
    intro_description = "Mobile applications have become an essential part of modern business strategies. Companies across Dubai are using mobile apps to improve customer engagement, streamline operations, and provide convenient digital services to their users.",
    intro_main_heading,
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
    features_title = "Mobile App Development Services We Provide",
    features_subtitle = "From concept and UI/UX to development, testing, launch and maintenance.",
    benefits_title = "Why Choose Us for Mobile App Development in Dubai?",
    benefits_subtitle = "Secure, scalable applications with ongoing technical support.",
    processes_title = "How our work process connects with you",
    processes_subtitle = "A clear path from requirements to app store deployment.",
    technologies_title = "Mobile App Platforms We Develop",
    technologies_subtitle = "Different platforms require different technologies. We build with reliable frameworks for compatibility across devices.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers about mobile app development.",
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

  const contactHref = cta_button_link || "/contact-us/";

  const servicesData =
    features.length > 0
      ? features
      : [
          {
            title: "Android App Development",
            description:
              "Applications designed to run across a wide range of smartphones and tablets.",
          },
          {
            title: "iOS App Development",
            description:
              "Smooth performance and premium experiences for iPhone and iPad users.",
          },
          {
            title: "Cross-Platform Mobile Applications",
            description:
              "One shared codebase for Android and iOS to reduce time and cost.",
          },
          {
            title: "App UI/UX Design",
            description:
              "Intuitive navigation and engaging interactions for everyday use.",
          },
          {
            title: "Testing And Quality Assurance",
            description:
              "Functionality checks across devices and operating systems.",
          },
          {
            title: "App Maintenance And Support",
            description:
              "Updates for new OS versions, devices and feature improvements.",
          },
        ];

  const platformsData =
    technologies.length > 0
      ? technologies
      : [
          {
            name: "Android App Development",
            description:
              "Flexible reach across smartphones and tablets with native or modern frameworks.",
          },
          {
            name: "iOS App Development",
            description:
              "Premium user experiences for Apple devices with strong performance.",
          },
          {
            name: "Cross-Platform Mobile Apps",
            description:
              "Shared codebase for Android and iOS using Flutter or React Native.",
          },
          {
            name: "Progressive Web Apps (PWA)",
            description:
              "App-like experiences in the browser without an app store download.",
          },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We start with business objectives, users and project requirements.",
          },
          {
            title: "UI/UX Design",
            description:
              "Screens and flows are designed for intuitive navigation.",
          },
          {
            title: "Application Development",
            description:
              "Built with modern frameworks and a scalable architecture.",
          },
          {
            title: "Testing and Quality Assurance",
            description:
              "Extensive testing across devices and operating systems.",
          },
          {
            title: "Deployment",
            description:
              "Published to Google Play, the App Store, or as a PWA.",
          },
        ];

  const whyChooseUs =
    benefits.length > 0
      ? benefits
      : [
          {
            title: "Experienced Mobile App Development Team",
            description:
              "Custom business applications planned and built by an in-house team.",
          },
          {
            title: "Scalable Development Approach",
            description:
              "Architecture that can handle more users, features and growth.",
          },
          {
            title: "Secure and Reliable Solutions",
            description:
              "Authentication, data protection and dependable performance.",
          },
          {
            title: "Ongoing Technical Support",
            description:
              "Support, maintenance and improvements after launch.",
          },
        ];

  const industries = [
    "Ecommerce and Retail",
    "Logistics and Delivery",
    "Healthcare",
    "Education",
    "Real Estate",
    "Corporate Services",
  ];

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "How much does mobile app development cost in Dubai?",
            answer:
              "Cost depends on complexity, features, platform choice and integrations.",
          },
          {
            question: "How long does it take to develop a mobile application?",
            answer:
              "Timelines typically range from several weeks to a few months depending on scope.",
          },
          {
            question: "Should businesses develop Android or iOS apps first?",
            answer:
              "It depends on your audience. Many companies start with one platform and expand later.",
          },
          {
            question: "What technologies are used for mobile app development?",
            answer:
              "Swift, Kotlin, Flutter, React Native and other modern frameworks, depending on the project.",
          },
          {
            question: "Can existing mobile applications be upgraded or redesigned?",
            answer:
              "Yes. Apps can be upgraded to improve performance, add features or refresh the experience.",
          },
        ];

  const sectionMap = {
    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },
    intro: {
      component: (
        <section key="intro" className="mad-intro">
          <div className="container">
            <div className="mad-intro__grid">
              <div className="mad-intro__copy">
                <p className="mad-kicker">{intro_small_heading}</p>
                {intro_main_heading ? (
                  <h2 className="mad-title mad-intro__title">
                    {withAccent(intro_main_heading, "Mobile App Development")}
                  </h2>
                ) : null}
                <p className="mad-intro__lead">{intro_description}</p>
                <p className="mad-intro__support">
                  We design and develop Android, iOS and cross-platform apps
                  that help customers book, buy, track and stay connected.
                </p>
                <a className="mad-intro__cta" href="#mobile-app-services">
                  Explore app services
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="mad-intro__visual" aria-hidden="true">
                <div className="mad-phone">
                  <span className="mad-phone__notch"></span>
                  <div className="mad-phone__screen">
                    <span className="mad-phone__hero"></span>
                    <span className="mad-phone__tiles">
                      <span className="mad-phone__tile">
                        <i className="bi bi-calendar-check"></i>
                      </span>
                      <span className="mad-phone__tile">
                        <i className="bi bi-bag-check"></i>
                      </span>
                      <span className="mad-phone__tile">
                        <i className="bi bi-geo-alt"></i>
                      </span>
                    </span>
                    <span className="mad-phone__row">
                      <span className="mad-phone__line"></span>
                      <span className="mad-phone__line mad-phone__line--short"></span>
                    </span>
                    <span className="mad-phone__row">
                      <span className="mad-phone__line"></span>
                      <span className="mad-phone__line mad-phone__line--short"></span>
                    </span>
                    <span className="mad-phone__tabbar"></span>
                  </div>
                </div>
                <span className="mad-intro__chip mad-intro__chip--a">
                  <i className="bi bi-android2"></i>
                  Android
                </span>
                <span className="mad-intro__chip mad-intro__chip--b">
                  <i className="bi bi-apple"></i>
                  iOS
                </span>
                <span className="mad-intro__chip mad-intro__chip--c">
                  <i className="bi bi-lightning-charge"></i>
                  Apps for business
                </span>
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
          id="mobile-app-services"
          className="mad-services"
        >
          <div className="container">
            <header className="mad-head mad-head--split">
              <div>
                <p className="mad-kicker">What we build</p>
                <h2 className="mad-title">{features_title}</h2>
              </div>
              {features_subtitle ? (
                <p className="mad-subtitle">{features_subtitle}</p>
              ) : null}
            </header>
            <div className="mad-services__grid">
              {servicesData.map((item, index) => (
                <article
                  key={`${item.id || item.title}-${index}`}
                  className={`mad-service${index === 0 ? " mad-service--featured" : ""}`}
                  style={{ "--mad-i": index }}
                >
                  <div className="mad-service__top">
                    <span className="mad-service__icon" aria-hidden="true">
                      <i className={`bi ${iconFor(item, SERVICE_ICONS, index)}`}></i>
                    </span>
                    <span className="mad-service__num">{stepNumber(index)}</span>
                  </div>
                  <h3 className="mad-service__name">{item.title || item.name}</h3>
                  {item.description ? (
                    <p className="mad-service__desc">{item.description}</p>
                  ) : null}
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
        <section key="technologies" className="mad-platforms">
          <div className="container">
            <header className="mad-head mad-head--center">
              <p className="mad-kicker">Platforms</p>
              <h2 className="mad-title">{technologies_title}</h2>
              {technologies_subtitle ? (
                <p className="mad-subtitle">{technologies_subtitle}</p>
              ) : null}
            </header>
            <div className="mad-platforms__grid">
              {platformsData.map((item, index) => (
                <article
                  key={`${item.id || item.name}-${index}`}
                  className="mad-platform"
                  style={{ "--mad-i": index }}
                >
                  <span className="mad-platform__num">{stepNumber(index)}</span>
                  <span className="mad-platform__art" aria-hidden="true">
                    <span className="mad-platform__ring"></span>
                    <i className={`bi ${iconFor(item, PLATFORM_ICONS, index)}`}></i>
                  </span>
                  <h3 className="mad-platform__name">{item.name || item.title}</h3>
                  {item.description ? (
                    <p className="mad-platform__desc">{item.description}</p>
                  ) : null}
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
        <section key="benefits" className="mad-why">
          <div className="container">
            <header className="mad-why__head">
              <p className="mad-why__eyebrow">Why RedSpider</p>
              <h2 className="mad-title mad-title--light mad-why__title">
                {withAccent(benefits_title, "Choose Us")}
              </h2>
              {benefits_subtitle ? (
                <p className="mad-why__subtitle">{benefits_subtitle}</p>
              ) : null}
            </header>
            <div className="mad-why__grid">
              {whyChooseUs.map((item, index) => (
                <article
                  key={`${item.id || item.title}-${index}`}
                  className="mad-why__card"
                  style={{ "--mad-i": index }}
                >
                  <span className="mad-why__num" aria-hidden="true">
                    <i className={`bi ${benefitIcon(item, index)}`}></i>
                  </span>
                  <h3 className="mad-why__name">{item.title}</h3>
                  <span className="mad-why__rule" aria-hidden="true"></span>
                  {item.description ? (
                    <p className="mad-why__desc">{item.description}</p>
                  ) : null}
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
        <section key="processes" className="mad-process">
          <div className="container">
            <header className="mad-process__head">
              <p className="mad-process__eyebrow">How we work</p>
              <h2 className="mad-title mad-process__title">
                {withAccent(processes_title, "Approach", true)}
              </h2>
              {processes_subtitle ? (
                <p className="mad-process__subtitle">{processes_subtitle}</p>
              ) : null}
            </header>
            <ol
              className="mad-process__track"
              style={{ "--mad-steps": processData.length }}
            >
              {processData.map((process, index) => (
                <li
                  key={`${process.id || process.title}-${index}`}
                  className="mad-step"
                  style={{ "--mad-i": index }}
                >
                  <span className="mad-step__node" aria-hidden="true">
                    {stepNumber(index)}
                  </span>
                  <div className="mad-step__card">
                    <span className="mad-step__icon" aria-hidden="true">
                      <i className={`bi ${processIcon(process, index)}`}></i>
                    </span>
                    <h3 className="mad-step__name">{process.title}</h3>
                    <span className="mad-step__rule" aria-hidden="true"></span>
                    {process.description ? (
                      <p className="mad-step__desc">{process.description}</p>
                    ) : null}
                  </div>
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
        <section key="industries" className="mad-industries">
          <div className="container">
            <header className="mad-head mad-head--center">
              <p className="mad-kicker">Industries</p>
              <h2 className="mad-title">Apps we build for</h2>
              <p className="mad-subtitle">
                Mobile applications for businesses across Dubai and the UAE.
              </p>
            </header>
            <div className="mad-industries__grid">
              {industries.map((name, index) => (
                <article
                  key={name}
                  className="mad-industry"
                  style={{ "--mad-i": index }}
                >
                  <span className="mad-industry__icon" aria-hidden="true">
                    <i className={`bi ${INDUSTRY_ICONS[index % INDUSTRY_ICONS.length]}`}></i>
                  </span>
                  <h3 className="mad-industry__name">{name}</h3>
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
          idPrefix="mobile"
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
      <main className="service-template mobile-app-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? <script dangerouslySetInnerHTML={{ __html: custom_js }} /> : null}
    </div>
  );
}
