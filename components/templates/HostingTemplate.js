import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const SOLUTION_ICONS = [
  "bi-hdd-stack",
  "bi-server",
  "bi-cloud-check",
  "bi-cpu",
  "bi-diagram-3",
  "bi-globe2",
];

const WHY_ICONS = [
  "bi-geo-alt",
  "bi-activity",
  "bi-headset",
  "bi-shield-lock",
  "bi-gift",
  "bi-clock-history",
];

export default function HostingTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Web Hosting · Dubai",
    intro_description = "Our hosting infrastructure promises high performance, advanced security and a 99.99% uptime guarantee, ensuring that your website is always accessible. All hosting packages come with fully trained technical support as well as tools to assist you in managing your website with confidence.",
    cta_button_text,
    cta_button_link,
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    primary_color = "#FF6B35",
    secondary_color = "#111111",
    background_color = "#F8F9FA",
    text_color = "#1A1A1A",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_cta = true,
    features_title = "Our Web Hosting Solutions",
    features_subtitle = "Select the hosting environment that will suit your business.",
    benefits_title = "Benefits of Hosting Your Website with RedSpider",
    benefits_subtitle = "When you choose RedSpider, you receive more than just web hosting. Our reliable hosting platform includes advanced performance, security, technical support and complete digital solutions.",
    processes_title = "Why Choose RedSpider?",
    processes_subtitle = "Local support, reliable uptime and the tools you need to manage your website with confidence.",
    technologies_title = "Free Website Applications",
    technologies_subtitle = "Our one click application installer makes launching a Website very easy. Install popular content management system (CMS) platforms such as:",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about web hosting.",
    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "technologies",
      "hosting_tools",
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const imageBase =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";
  const contactHref = cta_button_link || "/contact-us/";

  const hostingBenefitsList =
    benefits.length > 0
      ? benefits
      : [
          "99.99% Uptime",
          "24/7 Technical Support",
          "DDoS Protection",
          "Secure Hosting Environment",
          "High-Speed Quad-Core Servers",
          "Instant Account Activation",
          "Reliable Network Connectivity",
          "Regular Backup Services",
          "Free SSL Certificates",
          "Easy-to-Use cPanel",
          "Website Design Services",
          "Digital Marketing Solutions",
        ];

  const hostingSolutions =
    features.length > 0
      ? features
      : [
          {
            icon: "bi-hdd-stack",
            title: "Shared Hosting",
            description:
              "Reliable and affordable hosting for small websites, blogs and growing businesses.",
          },
          {
            icon: "bi-server",
            title: "VPS Hosting",
            description:
              "High-performance VPS hosting powered by SSD servers with full root access.",
          },
          {
            icon: "bi-cloud-check",
            title: "Cloud Hosting",
            description:
              "Flexible and scalable hosting that grows as your website and business requirements increase.",
          },
          {
            icon: "bi-cpu",
            title: "Dedicated Hosting",
            description:
              "All CPU, RAM and storage resources are dedicated to your business for maximum performance and control.",
          },
          {
            icon: "bi-diagram-3",
            title: "Reseller Hosting",
            description:
              "Ideal for agencies and entrepreneurs managing multiple client websites from one hosting account.",
          },
          {
            icon: "bi-globe2",
            title: "Domain Registration",
            description:
              "Register local or international domain extensions that represent and protect your business online.",
          },
        ];

  const cmsPlatforms =
    technologies.length > 0
      ? technologies
      : [
          { icon: "wordpress", name: "WordPress" },
          { icon: "magento", name: "Magento" },
          { icon: "joomla", name: "Joomla" },
          { icon: "drupal", name: "Drupal" },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Local UAE Presence",
            description:
              "You can always contact our local staff. No overseas support centers or lengthy waiting times, only fast and reliable support when needed.",
          },
          {
            title: "Reliable Hosting",
            description:
              "We provide a guarantee of 99.99% uptime and website stability through our reliable hosting infrastructure.",
          },
          {
            title: "Dedicated Account Support",
            description:
              "All customers of our web hosting service receive access to cPanel and expert assistance from our knowledgeable support team whenever needed.",
          },
          {
            title: "Enterprise-Level Security",
            description:
              "We use modern server technologies, regular software updates, advanced firewalls and continuous monitoring to protect your website and data.",
          },
          {
            title: "Free Hosting Resources",
            description:
              "Our hosting plans include valuable features such as free email accounts, generous storage space, bandwidth and domain-related benefits.",
          },
          {
            title: "24/7 Technical Support",
            description:
              "Our hosting experts are available 24 hours a day to assist with technical problems, website migrations, account administration and general support.",
          },
        ];

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "What web hosting services do you offer in Dubai?",
            answer:
              "We offer a wide range of web hosting services including shared hosting, VPS hosting, cloud hosting, dedicated hosting, and reseller hosting. We also provide domain registration and website migration services.",
          },
          {
            question: "What is the uptime guarantee for your hosting?",
            answer:
              "We provide a 99.99% uptime guarantee to ensure your website remains accessible and reliable for your visitors.",
          },
          {
            question: "Do you provide free SSL certificates?",
            answer:
              "Yes, most of our hosting packages include a complimentary SSL certificate to encrypt your website data and increase visitor trust.",
          },
          {
            question: "Can you migrate my existing website to RedSpider?",
            answer:
              "Yes, our migration team will manage the complete process carefully, securely and efficiently, including website files, databases, domains, emails, themes and plugins.",
          },
        ];

  const domainExtensions = [
    { name: ".com", price: "AED 65/year" },
    { name: ".ae", price: "AED 160/year" },
    { name: ".net", price: "AED 75/year" },
    { name: ".org", price: "AED 70/year" },
    { name: ".co", price: "AED 95/year" },
  ];

  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

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
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="rs-process-title-sec">
                  <h1 className="rs-process-title mb-3">
                    Web Hosting
                    {hero_subtitle ? (
                      <span className="rs-process-highlight">
                        in Dubai
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
                    ) : null}
                  </h1>
                  {hero_description ? (
                    <p className="rs-process-text mb-3">
                      RedSpider Web & Art Design provides reliable web hosting
                      in Dubai for businesses that need secure, fast and
                      professionally managed website hosting. Our hosting
                      solutions offer flexible resources, security features and
                      technical support for websites of different sizes and
                      requirements.
                    </p>
                  ) : null}
                </div>
              </div>
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
                <p className="rs-creative-intro__note">99.99% uptime focus</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  From shared hosting to dedicated servers, we help businesses
                  in Dubai keep websites fast, secure and easy to manage — with
                  local support when you need it.
                </p>
                <a className="rs-creative-link" href="#web-hosting-solutions">
                  Explore hosting plans
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
          id="web-hosting-solutions"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Hosting solutions</span>
              <h2>{features_title}</h2>
              <p>{features_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {hostingSolutions.map((solution, index) => (
                <article
                  key={`${solution.id || "solution"}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${
                          solution.icon && String(solution.icon).startsWith("bi")
                            ? solution.icon
                            : SOLUTION_ICONS[index % SOLUTION_ICONS.length]
                        }`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
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
        <section key="benefits" className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Included with hosting</span>
                <h2>{benefits_title}</h2>
                <p>{benefits_subtitle}</p>
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-pill-grid">
                {hostingBenefitsList.map((benefit, index) => {
                  const text =
                    typeof benefit === "string"
                      ? benefit
                      : benefit.title || benefit.description;

                  return (
                    <article
                      key={`${benefit.id || "benefit"}-${index}`}
                      className="rs-creative-pill"
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{text}</h3>
                    </article>
                  );
                })}
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
              <span className="rs-creative-kicker">Why RedSpider</span>
              <h2>{processes_title}</h2>
              {processes_subtitle ? <p>{processes_subtitle}</p> : null}
            </div>
            <ol className="rs-creative-steps">
              {processData.map((item, index) => (
                <li
                  key={`${item.id || "why"}-${index}`}
                  className="rs-creative-step"
                >
                  <span className="rs-creative-step__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rs-creative-why__icon" aria-hidden="true">
                    <i className={`bi ${WHY_ICONS[index % WHY_ICONS.length]}`}></i>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ),
      show: show_processes,
    },

    technologies: {
      component: (
        <section key="technologies" className="rs-creative-platforms">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">One-click apps</span>
              <h2>{technologies_title}</h2>
              <p>{technologies_subtitle}</p>
            </div>
            <div className="rs-creative-platform-grid rs-creative-platform-grid--four">
              {cmsPlatforms.map((platform, index) => {
                const iconMap = {
                  wordpress: "wordpress",
                  magento: "magento",
                  joomla: "joomla",
                  drupal: "drupal",
                };
                const iconName =
                  typeof platform.icon === "string" &&
                  platform.icon.startsWith("bi-")
                    ? platform.icon
                    : iconMap[platform.icon] || platform.icon || "wordpress";

                return (
                  <article
                    key={`${platform.id || platform.name}-${index}`}
                    className="rs-creative-platform"
                  >
                    <span className="rs-creative-platform__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {typeof iconName === "string" &&
                    iconName.startsWith("bi-") ? (
                      <i className={`bi ${iconName}`} aria-hidden="true"></i>
                    ) : (
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-plain.svg`}
                        alt=""
                      />
                    )}
                    <h3>{platform.name}</h3>
                  </article>
                );
              })}
            </div>
            <p className="rs-creative-platforms__note">
              Create blogs, business websites, online stores and custom web
              applications from a single dashboard — then install themes,
              plugins and edit content with ease.
            </p>
          </div>
        </section>
      ),
      show: show_technologies,
    },

    hosting_tools: {
      component: (
        <section key="hosting_tools" className="rs-creative-tools">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Hosting support</span>
              <h2>Migration, management and domains</h2>
              <p>
                Move your website, manage hosting from cPanel, and register the
                domain that represents your business.
              </p>
            </div>
            <div className="rs-creative-tools__grid">
              <article className="rs-creative-card">
                <div className="rs-creative-card__top">
                  <span className="rs-creative-card__icon" aria-hidden="true">
                    <i className="bi bi-window-sidebar"></i>
                  </span>
                </div>
                <h3>Website Hosting Migration</h3>
                <p>
                  Already hosting your website with another provider? RedSpider
                  can assist with moving eligible website files, databases and
                  configurations to a suitable hosting environment.
                </p>
              </article>
              <article className="rs-creative-card">
                <div className="rs-creative-card__top">
                  <span className="rs-creative-card__icon" aria-hidden="true">
                    <i className="bi bi-envelope-check"></i>
                  </span>
                </div>
                <h3>Simple Website and Hosting Management</h3>
                <p>
                  Manage website files, databases, email accounts and
                  applications through supported control-panel tools, with help
                  from our team when you need it.
                </p>
              </article>
            </div>
            <div className="rs-creative-domain-grid">
              {domainExtensions.map((domain) => (
                <article key={domain.name} className="rs-creative-domain">
                  <h3>{domain.name}</h3>
                  <p>{domain.price}</p>
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
          idPrefix="hosting"
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
      order = order
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(order) || order.length === 0) {
      order = [
        "hero",
        "intro",
        "features",
        "benefits",
        "processes",
        "technologies",
        "hosting_tools",
        "faqs",
        "cta",
      ];
    }

    if (!order.includes("hosting_tools")) {
      const faqIndex = order.indexOf("faqs");
      if (faqIndex !== -1) {
        order = [
          ...order.slice(0, faqIndex),
          "hosting_tools",
          ...order.slice(faqIndex),
        ];
      } else {
        order = [...order, "hosting_tools"];
      }
    }

    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section || section.show === false) return null;
        return section.component;
      })
      .filter(Boolean);
  };

  return (
    <div style={styles}>
      {custom_css ? (
        <style dangerouslySetInnerHTML={{ __html: custom_css }} />
      ) : null}
      <main className="service-template web-hosting-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? (
        <script dangerouslySetInnerHTML={{ __html: custom_js }} />
      ) : null}
    </div>
  );
}
