import Image from "next/image";
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

  // The four one-click app cards: approved titles, descriptions and images.
  const appCards = [
    {
      title: "WordPress & CMS",
      description:
        "Install and manage popular CMS applications like WordPress to build and run your website easily.",
      image: "/assets/img/hosting/web-apps/01-wordpress-cms.png",
    },
    {
      title: "File & Account Management",
      description:
        "Manage website files, databases and email accounts from a simple and intuitive control panel.",
      image: "/assets/img/hosting/web-apps/02-file-account-management.png",
    },
    {
      title: "Website & Online Store Apps",
      description:
        "Create business websites, blogs and online stores using supported web applications in just a few clicks.",
      image: "/assets/img/hosting/web-apps/03-website-online-store-apps.png",
    },
    {
      title: "Central Control Panel",
      description:
        "Easily install, manage and update themes, plugins and content for your websites and applications.",
      image: "/assets/img/hosting/web-apps/04-central-control-panel.png",
    },
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

  // Two main service cards and the statistics row (approved text).
  const domainServices = [
    {
      title: "Website Hosting Migration",
      description:
        "Securely move your website, files, databases and email accounts to our hosting environment with minimal downtime, data safety and complete migration support.",
    },
    {
      title: "Domain Transfer and Setup Management",
      description:
        "Easily transfer, set up and manage your domains with expert support, ensuring proper configuration, DNS setup and seamless integration with your hosting services.",
    },
  ];

  const domainStats = [
    { value: "400+", label: "Migrations Completed" },
    { value: "99%", label: "Data Safety" },
    { value: "24/7", label: "Migration Support" },
    { value: "100+", label: "Domains Managed" },
    { value: "0", label: "Business Downtime" },
  ];

  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  // Intro copy comes from the CMS intro_description: the first sentence is the
  // headline and the rest is the lead paragraph.
  const introText = String(intro_description || "").trim();
  const introSentenceEnd = introText.search(/[.!?](\s|$)/);
  const introHeadline =
    introSentenceEnd > -1
      ? introText.slice(0, introSentenceEnd + 1)
      : introText ||
        "Our hosting infrastructure is designed to support website performance, security and reliable availability.";
  const introLead =
    introSentenceEnd > -1 ? introText.slice(introSentenceEnd + 1).trim() : "";
  const INTRO_ACCENT = "reliable availability";
  const introAccentAt = introHeadline.indexOf(INTRO_ACCENT);
  const introHeadlineContent =
    introAccentAt > -1 ? (
      <>
        {introHeadline.slice(0, introAccentAt)}
        <span className="hosting-intro__accent">
          {INTRO_ACCENT}
          <svg
            className="hosting-intro__accent-line"
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4 8 C60 2, 120 11, 180 6 S265 3, 296 7" />
          </svg>
        </span>
        {introHeadline.slice(introAccentAt + INTRO_ACCENT.length)}
      </>
    ) : (
      introHeadline
    );

  // Solutions heading: the CMS features_title with "Web Hosting" highlighted.
  const SOLUTIONS_ACCENT = "Web Hosting";
  const solutionsTitle = String(features_title || "");
  const solutionsAccentAt = solutionsTitle.indexOf(SOLUTIONS_ACCENT);
  const solutionsTitleContent =
    solutionsAccentAt > -1 ? (
      <>
        {solutionsTitle.slice(0, solutionsAccentAt)}
        <span className="hosting-solutions__accent">{SOLUTIONS_ACCENT}</span>
        {solutionsTitle.slice(solutionsAccentAt + SOLUTIONS_ACCENT.length)}
      </>
    ) : (
      solutionsTitle
    );

  // Benefits heading: the CMS benefits_title with "RedSpider" highlighted.
  const BENEFITS_ACCENT = "RedSpider";
  const benefitsTitle = String(benefits_title || "");
  const benefitsAccentAt = benefitsTitle.indexOf(BENEFITS_ACCENT);
  const benefitsTitleContent =
    benefitsAccentAt > -1 ? (
      <>
        {benefitsTitle.slice(0, benefitsAccentAt)}
        <span className="hosting-benefits__accent">{BENEFITS_ACCENT}</span>
        {benefitsTitle.slice(benefitsAccentAt + BENEFITS_ACCENT.length)}
      </>
    ) : (
      benefitsTitle
    );

  // Why-choose heading: the CMS processes_title with "RedSpider" highlighted.
  const WHY_ACCENT = "RedSpider";
  const whyTitle = String(processes_title || "");
  const whyAccentAt = whyTitle.indexOf(WHY_ACCENT);
  const whyTitleContent =
    whyAccentAt > -1 ? (
      <>
        {whyTitle.slice(0, whyAccentAt)}
        <span className="hosting-why__accent">{WHY_ACCENT}</span>
        {whyTitle.slice(whyAccentAt + WHY_ACCENT.length)}
      </>
    ) : (
      whyTitle
    );

  // Apps heading: the CMS technologies_title with "Management Tools" highlighted.
  const APPS_ACCENT = "Management Tools";
  const appsTitle = String(technologies_title || "");
  const appsAccentAt = appsTitle.indexOf(APPS_ACCENT);
  const appsTitleContent =
    appsAccentAt > -1 ? (
      <>
        {appsTitle.slice(0, appsAccentAt)}
        <span className="hosting-apps__accent">{APPS_ACCENT}</span>
        {appsTitle.slice(appsAccentAt + APPS_ACCENT.length)}
      </>
    ) : (
      appsTitle
    );

  // Hosting plans: no CMS source exists, so the approved plan information is used.
  const hostingPlans = [
    {
      name: "VPS 2000",
      theme: "green",
      amount: "$1,500",
      period: "Annually",
      setupFee: "$100.00 Setup Fee",
      features: [
        "8 vCPU cores",
        "16 GB DDR5 RAM (ECC)",
        "512 GB NVMe disk space",
        "Traffic included",
        "cPanel/WHM Yes",
        "SSH Root Access Yes",
        "JetBackup Yes",
        "NGINX / LiteSpeed Yes",
        "Snapshots (Copy-On-Write)",
        "Remote console",
        "Linux operating systems",
        "Fully managed",
      ],
    },
    {
      name: "Advanced Shared",
      badge: "Most Popular",
      theme: "red",
      featured: true,
      amount: "$7.95",
      period: "Monthly",
      specs: [
        { label: "Disk Space", value: "50 GB" },
        { label: "Bandwidth", value: "500 GB" },
        { label: "Email Accounts", value: "50" },
        { label: "SSL Certificates", value: "Free" },
        { label: "Daily", value: "Backups" },
        { label: "Support", value: "24/7" },
        { label: "Included", value: "Dedicated IP" },
      ],
    },
    {
      name: "Rise Dedicated Server",
      theme: "green",
      amount: "$4,000",
      period: "Annually",
      setupFee: "$100.00 Setup Fee",
      features: [
        "Intel Xeon-E 2386G - 6c / 12t - 3.5 GHz / 4.7 GHz",
        "128 GB RAM",
        "2 x 512 GB NVMe SSD",
        "Up to 2 x optional (at additional cost)",
        "NVMe and SATA available",
        "Unlimited bandwidth",
        "Data centers Germany / Israel",
        "Monthly backup included",
        "Fully managed",
      ],
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
        <section key="intro" className="hosting-intro">
          <div className="container">
            <div className="hosting-intro__grid">
              <div className="hosting-intro__copy">
                <p className="hosting-intro__kicker">{intro_small_heading}</p>
                <div className="hosting-intro__title">{introHeadlineContent}</div>
                {introLead ? (
                  <p className="hosting-intro__lead">{introLead}</p>
                ) : null}
                <p className="hosting-intro__support">
                  From shared hosting to dedicated servers, we help businesses
                  in Dubai keep websites fast, secure and easy to manage — with
                  local support when you need it.
                </p>
                <a className="hosting-intro__cta" href="#web-hosting-solutions">
                  Explore hosting plans
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="hosting-intro__visual">
                <div className="hosting-intro__float">
                  <Image
                    className="hosting-intro__img"
                    src="/assets/img/hosting/web-hosting-cloud-security-3d.png"
                    alt="3D cloud server security illustration with server racks, cloud upload arrows and a red security shield, labelled High Performance, Scalable Hosting, Advanced Security, Easy Management and Local Technical Support"
                    width={1439}
                    height={1093}
                    sizes="(max-width: 899px) 100vw, 50vw"
                  />
                </div>
                <span className="hosting-intro__dot hosting-intro__dot--a" aria-hidden="true"></span>
                <span className="hosting-intro__dot hosting-intro__dot--b" aria-hidden="true"></span>
                <span className="hosting-intro__dot hosting-intro__dot--c" aria-hidden="true"></span>
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
          className="hosting-solutions"
        >
          <div className="container">
            <header className="hosting-solutions__head">
              <p className="hosting-solutions__kicker">Hosting solutions</p>
              <h2 className="hosting-solutions__title">{solutionsTitleContent}</h2>
              {features_subtitle ? (
                <p className="hosting-solutions__subtitle">{features_subtitle}</p>
              ) : null}
            </header>
            <div className="hosting-solutions__grid">
              {hostingSolutions.map((solution, index) => {
                const iconClass =
                  solution.icon && String(solution.icon).startsWith("bi")
                    ? solution.icon
                    : SOLUTION_ICONS[index % SOLUTION_ICONS.length];

                return (
                  <article
                    key={`${solution.id || "solution"}-${index}`}
                    className="hosting-solutions__card"
                    style={{ "--hs-index": index }}
                  >
                    <div className="hosting-solutions__top">
                      <span className="hosting-solutions__icon" aria-hidden="true">
                        <i className={`bi ${iconClass}`}></i>
                      </span>
                      <h3 className="hosting-solutions__name">{solution.title}</h3>
                      <span className="hosting-solutions__num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="hosting-solutions__desc">{solution.description}</p>
                    <span className="hosting-solutions__art" aria-hidden="true">
                      <i className={`bi ${iconClass}`}></i>
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ),
      show: show_features,
    },

    benefits: {
      component: (
        <section key="benefits" className="hosting-benefits">
          <div className="container">
            <header className="hosting-benefits__head">
              <p className="hosting-benefits__kicker">Included with hosting</p>
              <h2 className="hosting-benefits__title">{benefitsTitleContent}</h2>
              {benefits_subtitle ? (
                <p className="hosting-benefits__subtitle">{benefits_subtitle}</p>
              ) : null}
            </header>
            <ul className="hosting-benefits__list">
              {hostingBenefitsList.map((benefit, index) => {
                const text =
                  typeof benefit === "string"
                    ? benefit
                    : benefit.title || benefit.description;

                return (
                  <li
                    key={`${benefit.id || "benefit"}-${index}`}
                    className="hosting-benefits__item"
                    style={{ "--hb-index": index }}
                  >
                    <div className="hosting-benefits__card">
                      <span className="hosting-benefits__num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="hosting-benefits__divider" aria-hidden="true"></span>
                      <h3 className="hosting-benefits__name">{text}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ),
      show: show_benefits,
    },

    processes: {
      component: (
        <section key="processes" className="hosting-why">
          <div className="container">
            <header className="hosting-why__head">
              <p className="hosting-why__kicker">Our advantages</p>
              <h2 className="hosting-why__title">{whyTitleContent}</h2>
              {processes_subtitle ? (
                <p className="hosting-why__subtitle">{processes_subtitle}</p>
              ) : null}
            </header>
            <ol className="hosting-why__grid">
              {processData.map((item, index) => (
                <li
                  key={`${item.id || "why"}-${index}`}
                  className="hosting-why__item"
                  style={{ "--hw-index": index }}
                >
                  <article className="hosting-why__card">
                    <div className="hosting-why__top">
                      <span className="hosting-why__num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="hosting-why__divider" aria-hidden="true"></span>
                      <h3 className="hosting-why__name">{item.title}</h3>
                    </div>
                    <p className="hosting-why__desc">{item.description}</p>
                  </article>
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
        <section key="technologies" className="hosting-apps">
          <div className="container">
            <header className="hosting-apps__head">
              <p className="hosting-apps__kicker">One-click apps</p>
              <h2 className="hosting-apps__title">{appsTitleContent}</h2>
              {technologies_subtitle ? (
                <p className="hosting-apps__subtitle">{technologies_subtitle}</p>
              ) : null}
            </header>
            <ol className="hosting-apps__grid">
              {appCards.map((card, index) => (
                <li
                  key={card.title}
                  className="hosting-apps__item"
                  style={{ "--ha-index": index }}
                >
                  <article className="hosting-apps__card">
                    <span className="hosting-apps__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="hosting-apps__art">
                      <Image
                        src={card.image}
                        alt=""
                        width={612}
                        height={408}
                        sizes="(max-width: 639px) 80vw, (max-width: 1099px) 45vw, 22vw"
                      />
                    </div>
                    <h3 className="hosting-apps__name">{card.title}</h3>
                    <span className="hosting-apps__line" aria-hidden="true"></span>
                    <p className="hosting-apps__desc">{card.description}</p>
                  </article>
                </li>
              ))}
            </ol>
            <p className="hosting-apps__note">
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
        <section key="hosting_tools" className="hosting-domains">
          <div className="container">
            <header className="hosting-domains__head">
              <p className="hosting-domains__kicker">We help with</p>
              <h2 className="hosting-domains__title">
                Migration Management and{" "}
                <span className="hosting-domains__accent">Domains</span>
              </h2>
              <p className="hosting-domains__subtitle">
                Move your website, manage hosting migrations and keep your
                domain running without any business downtime.
              </p>
            </header>
            <div className="hosting-domains__services">
              {domainServices.map((service, index) => (
                <article
                  key={service.title}
                  className="hosting-domains__card"
                  style={{ "--hd-index": index }}
                >
                  <div className="hosting-domains__top">
                    <span className="hosting-domains__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hosting-domains__divider" aria-hidden="true"></span>
                    <h3 className="hosting-domains__name">{service.title}</h3>
                  </div>
                  <p className="hosting-domains__desc">{service.description}</p>
                </article>
              ))}
            </div>
            <ul className="hosting-domains__stats">
              {domainStats.map((stat, index) => (
                <li
                  key={stat.label}
                  className="hosting-domains__stat"
                  style={{ "--hd-stat": index }}
                >
                  <span className="hosting-domains__value">{stat.value}</span>
                  <span className="hosting-domains__label">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ),
      show: true,
    },

    hosting_plans: {
      component: (
        <section key="hosting_plans" className="hosting-plans">
          <div className="container">
            <header className="hosting-plans__head">
              <p className="hosting-plans__kicker">Hosting plans</p>
              <h2 className="hosting-plans__title">Choose Your Ideal Hosting Plan</h2>
              <p className="hosting-plans__subtitle">
                Flexible, secure and high-performance hosting solutions designed
                for businesses of all sizes.
              </p>
            </header>
            <div className="hosting-plans__grid">
              {hostingPlans.map((plan, index) => (
                <article
                  key={plan.name}
                  className={`hosting-plans__card hosting-plans__card--${plan.theme}${
                    plan.featured ? " hosting-plans__card--featured" : ""
                  }`}
                  style={{ "--hp-index": index }}
                >
                  {plan.badge ? (
                    <span className="hosting-plans__badge">{plan.badge}</span>
                  ) : null}
                  <header className="hosting-plans__header">
                    <p className="hosting-plans__price">
                      <span className="hosting-plans__currency">USD</span>
                      <span className="hosting-plans__amount">{plan.amount}</span>
                      <span className="hosting-plans__period">{plan.period}</span>
                    </p>
                    <h3 className="hosting-plans__name">{plan.name}</h3>
                    {plan.setupFee ? (
                      <p className="hosting-plans__setup">{plan.setupFee}</p>
                    ) : null}
                  </header>
                  <div className="hosting-plans__body">
                    {plan.features ? (
                      <ul className="hosting-plans__list">
                        {plan.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    ) : (
                      <dl className="hosting-plans__specs">
                        {plan.specs.map((spec) => (
                          <div key={spec.label} className="hosting-plans__spec">
                            <dt>{spec.label}</dt>
                            <dd>{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                  <a className="hosting-plans__btn" href={contactHref}>
                    Order Now
                  </a>
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

    if (!order.includes("hosting_plans")) {
      const toolsIndex = order.indexOf("hosting_tools");
      order = [
        ...order.slice(0, toolsIndex + 1),
        "hosting_plans",
        ...order.slice(toolsIndex + 1),
      ];
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
