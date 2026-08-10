import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function HostingTemplate({ data }) {
  if (!data) return <div className="text-center py-5">Loading...</div>;

  // Static - Will be replaced by backend
  const hostingBenefits = [
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

  const hostingSolutions = [
    {
      icon: "bi-hdd-stack",
      title: "Shared Hosting",
      desc: "Reliable and affordable hosting for small websites, blogs and growing businesses.",
    },
    {
      icon: "bi-server",
      title: "VPS Hosting",
      desc: "High-performance VPS hosting powered by SSD servers with full root access.",
    },
    {
      icon: "bi-cloud-check",
      title: "Cloud Hosting",
      desc: "Flexible and scalable hosting that grows as your website and business requirements increase.",
    },
    {
      icon: "bi-cpu",
      title: "Dedicated Hosting",
      desc: "All CPU, RAM and storage resources are dedicated to your business for maximum performance and control.",
    },
    {
      icon: "bi-diagram-3",
      title: "Reseller Hosting",
      desc: "Ideal for agencies and entrepreneurs managing multiple client websites from one hosting account.",
    },
    {
      icon: "bi-globe2",
      title: "Domain Registration",
      desc: "Register local or international domain extensions that represent and protect your business online.",
    },
  ];

  const domainExtensions = [
    { name: ".com", price: "AED 65/year" },
    { name: ".ae", price: "AED 160/year" },
    { name: ".net", price: "AED 75/year" },
    { name: ".org", price: "AED 70/year" },
    { name: ".co", price: "AED 95/year" },
  ];

  const securityFeatures = [
    { icon: "bi-patch-check", title: "Free SSL Certificates" },
    { icon: "bi-router", title: "Dedicated IP Options" },
    { icon: "bi-shield-lock", title: "DDoS Protection" },
    { icon: "bi-arrow-repeat", title: "Regular Security Updates" },
    { icon: "bi-server", title: "Secure Server Infrastructure" },
    { icon: "bi-activity", title: "Continuous Monitoring" },
  ];

  const cpanelFeatures = [
    "Set up and configure email accounts",
    "Install WordPress and other applications",
    "Manage domains and subdomains",
    "Upload and manage website files",
    "Create and manage backups",
    "Manage website databases",
    "Monitor website performance",
  ];

  const emailFeatures = [
    "Access from desktop and mobile devices",
    "Compatible with iOS and Android",
    "Advanced spam filtering",
    "Reliable email uptime",
    "Automatic email responders",
    "Email forwarding",
    "Vacation messages",
    "Secure email access",
  ];

  const cmsPlatforms = [
    { icon: "wordpress", name: "WordPress" },
    { icon: "magento", name: "Magento" },
    { icon: "joomla", name: "Joomla" },
    { icon: "drupal", name: "Drupal" },
  ];

  const migrationServices = [
    { icon: "bi-window-stack", title: "Website Migration" },
    { icon: "bi-globe2", title: "Transfer or Renew a Domain" },
    { icon: "bi-envelope-arrow-up", title: "Email Migration" },
    { icon: "bi-puzzle", title: "Theme and Plugin Restoration" },
    { icon: "bi-database-up", title: "Database Transfer" },
  ];

  return (
    <>
      {/* Hero */}
      <ServiceHero service={data} />

      {/* Intro */}
      <section className="rs-gd-intro">
        <span className="rs-gd-intro__shape" aria-hidden="true"></span>
        <div className="container-fluid px-3 px-md-4 px-xl-5">
          <div className="row gx-xl-5 align-items-start">
            <div className="col-lg-3">
              <div className="rs-gd-intro__rail">
                <span className="rs-gd-intro__rail-icon">
                  <i className="bi bi-bezier2"></i>
                </span>
                <span className="rs-gd-intro__rail-text">
                  {data.intro_small_heading || "Web Hosting · Dubai"}
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rs-gd-intro__copy">
                <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                  {data.intro_description ||
                    "Our hosting infrastructure promises high performance, advanced security and a 99.99% uptime guarantee, ensuring that your website is always accessible. All hosting packages come with fully trained technical support as well as tools to assist you in managing your website with confidence."}
                </p>
                <div className="rs-gd-intro__footer">
                  <a className="rs-gd-intro__link" href="#">
                    <span>Explore our Service</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="rs-gd-intro__meta">Creative since 2010</div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Registration */}
      <section className="rs-domain-registration">
        <span className="rs-domain-registration__floating-icon rs-domain-registration__floating-icon--one">
          <i className="bi bi-globe2"></i>
        </span>
        <span className="rs-domain-registration__floating-icon rs-domain-registration__floating-icon--two">
          <i className="bi bi-server"></i>
        </span>
        <span className="rs-domain-registration__floating-icon rs-domain-registration__floating-icon--three">
          <i className="bi bi-cloud-check"></i>
        </span>
        <span className="rs-domain-registration__floating-icon rs-domain-registration__floating-icon--four">
          <i className="bi bi-hdd-network"></i>
        </span>
        <div className="container">
          <div className="rs-domain-registration__intro">
            <h2
              className="rs-title-effect rs-title-line-slide mb-4"
              data-lines="Domain Registration in Dubai, UAE"
            ></h2>
            <p className="rs-domain-registration__text">
              Your domain is your digital identity and this is how customers
              remember you. RedSpider is the perfect solution for registering
              the right domain name for your business. We complete the
              registration process quickly, securely and hassle-free.
            </p>
          </div>
          <div className="rs-domain-registration__card">
            <h2
              className="rs-title-effect rs-title-letter-flip fs-2 mb-4 text-center text-red"
              data-title="Find the Right Domain for Your Business"
            ></h2>
            <form
              className="rs-domain-registration__search"
              action="#"
              method="get"
            >
              <input
                className="rs-domain-registration__input"
                type="text"
                name="domain"
                placeholder="Enter your domain name"
                aria-label="Domain name"
                required
              />
              <select
                className="rs-domain-registration__select"
                name="extension"
                aria-label="Domain extension"
              >
                {domainExtensions.map((ext) => (
                  <option key={ext.name} value={ext.name}>
                    {ext.name}
                  </option>
                ))}
              </select>
              <button className="rs-domain-registration__button" type="submit">
                Search Domain
              </button>
            </form>
            <div className="rs-domain-registration__extensions">
              {domainExtensions.map((ext) => (
                <div
                  className="rs-domain-registration__extension"
                  key={ext.name}
                >
                  <span className="rs-domain-registration__extension-name">
                    {ext.name}
                  </span>
                  <span className="rs-domain-registration__extension-price">
                    {ext.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rs-domain-registration__services">
            <div className="rs-domain-registration__services-intro">
              <h2
                className="rs-title-effect rs-title-word-rise fs-2 mb-4"
                data-title="Web Hosting Designed for UAE Businesses"
              ></h2>
              <p className="rs-domain-registration__services-text">
                We are a company based in Dubai and know the needs of businesses
                here better than anyone. We have a team of professionals that
                are ready to help you with our hosting services. We provide
                complete digital solutions other than hosting, such as:
              </p>
            </div>
            <div className="rs-domain-registration__service-list">
              <div className="rs-domain-registration__service-item">
                <i className="bi bi-window" aria-hidden="true"></i>
                <span>Website Design</span>
              </div>
              <div className="rs-domain-registration__service-item">
                <i className="bi bi-globe2" aria-hidden="true"></i>
                <span>Domain Registration</span>
              </div>
              <div className="rs-domain-registration__service-item">
                <i className="bi bi-envelope-paper" aria-hidden="true"></i>
                <span>Email Marketing</span>
              </div>
              <div className="rs-domain-registration__service-item">
                <i className="bi bi-chat-dots" aria-hidden="true"></i>
                <span>SMS Marketing</span>
              </div>
              <div className="rs-domain-registration__service-item">
                <i className="bi bi-bezier2" aria-hidden="true"></i>
                <span>Graphic Design</span>
              </div>
              <div className="rs-domain-registration__service-item">
                <i className="bi bi-graph-up-arrow" aria-hidden="true"></i>
                <span>Digital Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="rs-mail-tech">
        <div className="container-fluid px-lg-5" style={{ maxWidth: "1840px" }}>
          <div className="rs-mail-tech__frame">
            <span className="rs-mail-tech__scan" aria-hidden="true"></span>
            <div className="row align-items-center g-5 w-100">
              <div className="col-lg-2">
                <div className="rs-mail-tech__index">
                  <p className="rs-mail-tech__category">
                    Reliable Website Hosting
                    <br />
                    Security &amp; Performance
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="rs-mail-tech__content">
                  <h2 className="rs-mail-tech__title">
                    Benefits of Hosting Your Website with <span>RedSpider</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="rs-mail-tech__content">
                  <p className="rs-mail-tech__description">
                    When you choose RedSpider, you receive more than just web
                    hosting. Our reliable hosting platform includes advanced
                    performance, security, technical support and complete
                    digital solutions.
                  </p>
                  <a
                    className="rs-mail-tech__button"
                    href="#rs-hosting-benefit-list"
                  >
                    <span>View Benefits</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M14 6l6 6-6 6"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-lg-12">
                <ul
                  id="rs-hosting-benefit-list"
                  className="rs-mail-tech__specs rs-mail-tech__specs-half"
                >
                  {hostingBenefits.map((benefit, index) => (
                    <li className="rs-mail-tech__spec" key={index}>
                      <span className="rs-mail-tech__spec-label">
                        Benefit {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rs-mail-tech__spec-text">{benefit}</span>
                      <span className="rs-mail-tech__spec-arrow">→</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hosting Solutions */}
      <section
        className="rs-why-brochure owhsol"
        aria-labelledby="rs-hosting-solutions-title"
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10">
              <div className="rs-why-brochure__intro py-0">
                <span className="rs-why-brochure__label">
                  Hosting Solutions
                </span>
                <h2
                  className="rs-title-effect rs-title-letter-flip fs-1 mb-3"
                  data-title="Our Web Hosting Solutions"
                ></h2>
                <p>
                  Select the hosting environment that will suit your business.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center mt-0">
            {hostingSolutions.map((solution, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <article className="rs-why-brochure__card">
                  <div className="rs-why-brochure__card-inner">
                    <div className="rs-why-brochure__card-face rs-why-brochure__card-front">
                      <div className="rs-why-brochure__top">
                        <span className="rs-why-brochure__icon">
                          <i className={solution.icon} aria-hidden="true"></i>
                        </span>
                        <span className="rs-why-brochure__number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="rs-why-brochure__card-title">
                        {solution.title}
                      </h3>
                    </div>
                    <div className="rs-why-brochure__card-face rs-why-brochure__card-back">
                      <h3 className="rs-why-brochure__card-title">
                        {solution.title}
                      </h3>
                      <p className="rs-why-brochure__text">{solution.desc}</p>
                      <span className="rs-why-brochure__back-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose RedSpider */}
      <section className="archidex-accordion-sec dark-cs-bg dark-background dev-before">
        <div className="archidex-bg-shape"></div>
        <div
          className="container rs-container-reveal"
          style={{ maxWidth: "1550px" }}
        >
          <div className="rs-container-reveal-inner">
            <div className="row g-5 align-items-start justify-content-between">
              <div className="col-lg-5">
                <h2 className="rs-main-title text-white fw-bold">
                  Why Choose RedSpider?
                </h2>
                <div
                  className="accordion rs-studio-list"
                  id={`studio-${data.id}`}
                >
                  {[
                    {
                      title: "Local UAE Presence",
                      desc: "You can always contact our local staff. No overseas support centers or lengthy waiting times, only fast and reliable support when needed.",
                    },
                    {
                      title: "Reliable Hosting",
                      desc: "We provide a guarantee of 99.99% uptime and website stability through our reliable hosting infrastructure.",
                    },
                    {
                      title: "Dedicated Account Support",
                      desc: "All customers of our web hosting service receive access to cPanel and expert assistance from our knowledgeable support team whenever needed.",
                    },
                    {
                      title: "Enterprise-Level Security",
                      desc: "We use modern server technologies, regular software updates, advanced firewalls and continuous monitoring to protect your website and data.",
                    },
                    {
                      title: "Free Hosting Resources",
                      desc: "Our hosting plans include valuable features such as free email accounts, generous storage space, bandwidth and domain-related benefits.",
                    },
                    {
                      title: "24/7 Technical Support",
                      desc: "Our hosting experts are available 24 hours a day to assist with technical problems, website migrations, account administration and general support.",
                    },
                  ].map((item, index) => (
                    <div className="accordion-item rs-studio-item" key={index}>
                      <h3 className="accordion-header">
                        <button
                          className={`rs-studio-btn ${index === 0 ? "" : "collapsed"}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#studio-${data.id}-${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                        >
                          <span className="rs-studio-symbol">
                            {index === 0 ? "−" : "+"}
                          </span>
                          <span>{item.title}</span>
                        </button>
                      </h3>
                      <div
                        id={`studio-${data.id}-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent={`#studio-${data.id}`}
                      >
                        <div className="accordion-body rs-studio-body">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="letconnect mt-5">
                  <span className="text-white">Know More About :</span>
                  <div className="line"></div>
                  <a href="#">Contact us</a>
                </div>
              </div>
              <div className="col-lg-7 px-lg-5">
                <div className="archidex-small-title mb-3 text-white mb-5 pb-5">
                  <h6 className="text-white">
                    Professional <br />
                    Website Design <br /> Services
                  </h6>
                </div>
                <div
                  className="accordion archidex-accordion mt-4"
                  id={`additional-${data.id}`}
                >
                  {[
                    {
                      title: "Looking for a Website, Too?",
                      desc: "Our knowledgeable designers build modern, responsive websites that work perfectly on every device and provide an excellent user experience. From a basic business website to a complete custom-designed platform, we will create a professional website that helps your business achieve its goals.",
                    },
                    {
                      title: "Email Marketing Services in Dubai",
                      desc: "Want to reach thousands of potential customers? Our email marketing services help businesses promote products, services, offers and announcements through carefully planned campaigns. Using a large verified database and strategic campaign planning, you can increase engagement and generate quality leads.",
                    },
                    {
                      title: "SMS Marketing Services",
                      desc: "SMS remains one of the quickest ways to communicate with your customers. Our affordable SMS marketing services help businesses send professional messages, alerts, offers and important updates directly to their target audience.",
                    },
                    {
                      title: "Logo & Brochure Design",
                      desc: "Your image and visual identity create your first impression. RedSpider designs professional logos, brochures, company profiles, flyers and other marketing materials that help businesses stand out. We also offer high-quality printing services to companies across Dubai and the UAE.",
                    },
                  ].map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#additional-${data.id}-${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                        >
                          <span className="arch-no">{index + 1}.</span>
                          <span className="arch-name">{item.title}</span>
                          <span className="arch-arrow">↗</span>
                        </button>
                      </h2>
                      <div
                        id={`additional-${data.id}-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent={`#additional-${data.id}`}
                      >
                        <div className="accordion-body">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section
        className="rs-domain-registration py-5"
        style={{ background: "#fff" }}
      >
        <div className="container">
          <div className="rs-domain-registration__services mt-0">
            <div className="rs-domain-registration__services-intro">
              <h2
                className="rs-title-effect rs-title-word-rise fs-2 mb-4"
                data-title="Free SSL Certificates & Advanced Security"
              ></h2>
              <p className="rs-domain-registration__services-text">
                Website security is crucial for protecting your business and
                customer data. Most of our web hosting packages include a
                complimentary SSL certificate that encrypts website information
                and increases visitor trust. For businesses requiring greater
                protection, we also provide additional security solutions. Our
                hosting platform includes the following features:
              </p>
            </div>
            <div className="rs-domain-registration__service-list">
              {securityFeatures.map((feature, index) => (
                <div
                  className="rs-domain-registration__service-item"
                  key={index}
                >
                  <i className={feature.icon} aria-hidden="true"></i>
                  <span>{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hosting Tools */}
      <section className="rs-hosting-tools">
        <span
          className="rs-hosting-tools__floating-icon rs-hosting-tools__floating-icon--left"
          aria-hidden="true"
        >
          <i className="bi bi-window-sidebar"></i>
        </span>
        <span
          className="rs-hosting-tools__floating-icon rs-hosting-tools__floating-icon--right"
          aria-hidden="true"
        >
          <i className="bi bi-envelope-paper"></i>
        </span>
        <div className="container">
          <div className="rs-hosting-tools__heading">
            <span className="rs-hosting-tools__label">
              Simple Hosting Tools
            </span>
            <h2 className="rs-hosting-tools__main-title">
              Manage Your Website and Business Email with Ease
            </h2>
            <p className="rs-hosting-tools__lead">
              Access practical tools for managing your website, domains, files,
              databases and professional business email from one reliable
              hosting environment.
            </p>
          </div>
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <article className="rs-hosting-tools__panel">
                <div className="rs-hosting-tools__panel-top">
                  <span className="rs-hosting-tools__panel-icon">
                    <i className="bi bi-window-sidebar" aria-hidden="true"></i>
                  </span>
                  <div>
                    <h3 className="rs-hosting-tools__title">
                      Easy Website Management with cPanel
                    </h3>
                    <p className="rs-hosting-tools__description">
                      Every hosting account includes the industry-leading cPanel
                      control panel, making website management simple even if
                      you are new to hosting.
                    </p>
                  </div>
                </div>
                <ul className="rs-hosting-tools__features">
                  {cpanelFeatures.map((feature, index) => (
                    <li className="rs-hosting-tools__feature" key={index}>
                      <i
                        className={`bi bi-${["envelope-plus", "wordpress", "globe2", "cloud-arrow-up", "shield-check", "database-gear", "speedometer2"][index]}`}
                        aria-hidden="true"
                      ></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="col-lg-6">
              <article className="rs-hosting-tools__panel rs-hosting-tools__panel--email">
                <div className="rs-hosting-tools__panel-top">
                  <span className="rs-hosting-tools__panel-icon">
                    <i className="bi bi-envelope-check" aria-hidden="true"></i>
                  </span>
                  <div>
                    <h3 className="rs-hosting-tools__title">
                      Business Email Hosting
                    </h3>
                    <p className="rs-hosting-tools__description">
                      Use your own domain to create professional email addresses
                      and communicate with customers through secure, reliable
                      business email.
                    </p>
                  </div>
                </div>
                <ul className="rs-hosting-tools__features">
                  {emailFeatures.map((feature, index) => (
                    <li className="rs-hosting-tools__feature" key={index}>
                      <i
                        className={`bi bi-${["laptop", "phone", "funnel", "activity", "reply-all", "forward", "calendar2-week", "lock"][index]}`}
                        aria-hidden="true"
                      ></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="rs-hosting-tools__trust">
                  <i className="bi bi-patch-check" aria-hidden="true"></i>
                  <span>
                    A professional email address strengthens your brand and
                    improves customer confidence.
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Free Website Applications */}
      <section
        className="rs-ecommerce-platforms py-0 emailmark-camp"
        id="ecommerce-platforms"
      >
        <div className="team-sticky">
          <div className="title-wrap text-center">
            <h2 className="title mb-4">
              <span className="red">Free Website </span> Applications
            </h2>
            <p className="rs-subtitl introline mb-5">
              Our one click application installer makes launching a Website very
              easy. Install popular content management system (CMS) platforms
              such as:
            </p>
          </div>
          <div
            className="gallery"
            aria-label="Content management system platforms"
          >
            {cmsPlatforms.map((platform, index) => (
              <article className="card" key={index}>
                <div className="card-content">
                  <span className="card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${platform.icon}/${platform.icon}-plain.svg`}
                      alt={platform.name}
                      style={{ width: "60px" }}
                    />
                  </div>
                  <h3>{platform.name}</h3>
                </div>
              </article>
            ))}
          </div>
          <p
            className="fs-3 text-center py-5 fw-bold rs-main-title"
            style={{ maxWidth: "960px", margin: "auto", lineHeight: "1.3" }}
          >
            Whether it is creating blogs, business websites, online stores, and
            custom web applications do it with no hassle. Just Install themes,
            plugins and edit content from a single dashboard.
          </p>
        </div>
      </section>

      {/* Get A Quote */}
      <section
        className="rs-packages-se dark-background section pt-5 pb-0"
        style={{ background: "#fff" }}
      >
        <div className="container" style={{ maxWidth: "1450px" }}>
          <div className="row">
            <div className="col-12">
              <div className="rs-left-card h-100 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 text-center text-lg-start">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4 gap-lg-5">
                  <span className="rs-join">Get A Quote</span>
                  <h4 className="mb-0">Get a Free Quote</h4>
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
                <div className="quick-contect text-center text-lg-end mt-3 mt-lg-0">
                  <small>Get A Consultation</small>
                  <h5 className="mb-0">: 971555515475</h5>
                </div>
              </div>
            </div>
            <p className="text-dark mt-2">
              <em>
                Searching for the best web hosting services in Dubai? RedSpider
                offers a variety of website hosting options, whether you're
                starting a new site or migrating a current one. Call us today
                for a free consultation and get a hosting plan that's customized
                for your website.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Migration */}
      <section className="rs-site-switch">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="rs-site-switch__content">
                <span className="rs-site-switch__label">
                  Stress-Free Migration
                </span>
                <h2 className="rs-site-switch__title">
                  Already Have a Website? <span>Switch to RedSpider</span>
                </h2>
                <p className="rs-site-switch__description">
                  You do not need to feel stressed about moving your website.
                  Our migration team will manage the complete process carefully,
                  securely and efficiently.
                </p>
                <p className="rs-site-switch__description">
                  From your website files and database to your domain, emails,
                  themes and plugins, every important element is transferred and
                  checked by our experts.
                </p>
                <div className="rs-site-switch__note">
                  <i className="bi bi-speedometer2" aria-hidden="true"></i>
                  <span>
                    We strive to transfer your website with as little downtime
                    as possible.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rs-site-switch__visual">
                <div
                  className="rs-site-switch__transfer"
                  aria-label="Website transfer from current server to RedSpider"
                >
                  <div className="rs-site-switch__server">
                    <i className="bi bi-hdd-rack" aria-hidden="true"></i>
                    <span>Current Hosting</span>
                  </div>
                  <div className="rs-site-switch__route" aria-hidden="true">
                    <span className="rs-site-switch__route-icon">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </div>
                  <div className="rs-site-switch__server rs-site-switch__server--new">
                    <i className="bi bi-shield-check" aria-hidden="true"></i>
                    <span>RedSpider Hosting</span>
                  </div>
                </div>
                <div className="rs-site-switch__services">
                  {migrationServices.map((service, index) => (
                    <article className="rs-site-switch__service" key={index}>
                      <i
                        className={`${service.icon} rs-site-switch__service-icon`}
                        aria-hidden="true"
                      ></i>
                      <h3 className="rs-site-switch__service-title">
                        {service.title}
                      </h3>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review */}
      <section
        id="review-sec"
        className="review-sec section light-background pb-0"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.png"
              alt="Reviews"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      {data.faqs?.length > 0 && (
        <section
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section light-background pb-0"
        >
          <div
            className="container"
            style={{
              maxWidth: "1600px",
              background: "#f6f6f6",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <div className="text-start mb-5 border-bottom pb-3">
              <h2 className="fw-bold">Frequently Asked Questions</h2>
              <p>Find quick answers to common questions about web hosting.</p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id={`faqLeft-${data.id}`}>
                  {data.faqs
                    .slice(0, Math.ceil(data.faqs.length / 2))
                    .map((faq, idx) => (
                      <div className="accordion-item" key={faq.id}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq-${data.id}-left-${idx}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faq-${data.id}-left-${idx}`}
                          className="accordion-collapse collapse"
                          data-bs-parent={`#faqLeft-${data.id}`}
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion" id={`faqRight-${data.id}`}>
                  {data.faqs
                    .slice(Math.ceil(data.faqs.length / 2))
                    .map((faq, idx) => (
                      <div className="accordion-item" key={faq.id}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq-${data.id}-right-${idx}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faq-${data.id}-right-${idx}`}
                          className="accordion-collapse collapse"
                          data-bs-parent={`#faqRight-${data.id}`}
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

      <ServiceCTA service={data} />
    </>
  );
}
