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

export default function MobileAppTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    intro_small_heading = "Mobile App Development · Dubai",
    intro_description = "Mobile applications have become an essential part of modern business strategies. Companies across Dubai are using mobile apps to improve customer engagement, streamline operations, and provide convenient digital services to their users.",
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
        <section key="intro" className="rs-creative-intro">
          <div className="container">
            <div className="rs-creative-intro__grid">
              <div className="rs-creative-intro__meta">
                <span className="rs-creative-kicker">{intro_small_heading}</span>
                <p className="rs-creative-intro__note">Apps for business</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  We design and develop Android, iOS and cross-platform apps
                  that help customers book, buy, track and stay connected.
                </p>
                <a className="rs-creative-link" href="#mobile-app-services">
                  Explore app services
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
          id="mobile-app-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we build</span>
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
                        className={`bi ${SERVICE_ICONS[index % SERVICE_ICONS.length]}`}
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
              {platformsData.map((item, index) => (
                <article
                  key={`${item.id || item.name}-${index}`}
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
                  <h3>{item.name || item.title}</h3>
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
                <span className="rs-creative-kicker">Why RedSpider</span>
                <h2>{benefits_title}</h2>
                <p>{benefits_subtitle}</p>
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-why__grid">
                {whyChooseUs.map((item, index) => (
                  <article
                    key={`${item.id || item.title}-${index}`}
                    className="rs-creative-why__card"
                  >
                    <span className="rs-creative-why__icon" aria-hidden="true">
                      <i className="bi bi-check2-circle"></i>
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
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
              <h2>Apps we build for</h2>
              <p>Mobile applications for businesses across Dubai and the UAE.</p>
            </div>
            <div className="rs-creative-industry-grid">
              {industries.map((name) => (
                <article key={name} className="rs-creative-industry">
                  <span className="rs-creative-industry__icon" aria-hidden="true">
                    <i className="bi bi-phone"></i>
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
