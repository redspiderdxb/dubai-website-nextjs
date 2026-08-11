"use client";

import { useState } from "react";
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function EmailMarketingTemplate({ data }) {
  if (!data) return <div className="text-center py-5">Loading...</div>;

  // Static - Will be replaced by backend
  const campaignTypes = [
    {
      title: "Promotional Email Campaigns",
      desc: "Promotional email campaigns are used to introduce customers with your products, exclusive offers, seasonal discounts, sales, and special events.",
    },
    {
      title: "Newsletter Campaigns",
      desc: "Newsletter campaigns will help you reach out to a wider customer range who are interested to have industry updates, product launches and other promotional activities.",
    },
    {
      title: "Automated Email Sequences",
      desc: "Automation makes it possible to reach customers when it is the right time, but without manual labor. We write automated workflows for welcome e-mails, onboarding sequence, abandoned cart, follow-up e-mail, birthday e-mail, and post-purchase e-mail.",
    },
    {
      title: "Customer Retention Campaigns",
      desc: "Getting new customers is a difficult task, but maintaining your existing customers is even more tough. With the right custom retention campaigns you can do both tasks successfully.",
    },
    {
      title: "Lead Nurturing Campaigns",
      desc: "Not all leads are suitable for an instant sale. Lead nurturing campaigns nurture leads by offering them relevant content, addressing common queries, and slowly gaining customer's trust until they are prepared to make a purchase.",
    },
    {
      title: "Re-engagement Campaigns",
      desc: "You don't need to delete your inactive subscribers who haven't interacted in a while. We create the best re-engagement campaigns that can help you reconnect with customers.",
    },
  ];

  // Image mapping for each campaign
  const campaignImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1400&auto=format&fit=crop",
  ];

  // React State
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [imageChanging, setImageChanging] = useState(false);

  // Handlers
  const handleCampaignClick = (index) => {
    if (index === activeCampaign) return;
    setImageChanging(true);
    setActiveCampaign(index);
    setTimeout(() => {
      setImageChanging(false);
    }, 300);
  };

  const handleProcessClick = (index) => {
    setActiveProcess(index === activeProcess ? -1 : index);
  };

  const platforms = [
    { name: "Mailchimp", icon: "em-mailchimp" },
    { name: "HubSpot", icon: "em-hub" },
    { name: "Klaviyo", icon: "em-kla" },
    { name: "SendGrid", icon: "em-sendgrid" },
    { name: "Zoho Campaigns", icon: "em-zoho" },
    { name: "Active Campaign", icon: "blue-chevron-icon" },
    { name: "Brevo (formerly Sendinblue)", icon: "brevo-icon" },
    { name: "Customized email", icon: "em-gmail" },
  ];

  const industries = [
    { icon: "bi-bag", name: "Ecommerce businesses" },
    { icon: "bi-shop", name: "Retail brands" },
    { icon: "bi-buildings", name: "Real estate companies" },
    { icon: "bi-heart-pulse", name: "Healthcare providers" },
    { icon: "bi-cloud", name: "SaaS companies" },
    { icon: "bi-cpu", name: "Technology firms" },
    { icon: "bi-mortarboard", name: "Educational institutions" },
    { icon: "bi-building", name: "Hospitality businesses" },
    { icon: "bi-graph-up-arrow", name: "Financial services" },
    { icon: "bi-briefcase", name: "Corporate service providers" },
    { icon: "bi-chat-square-text", name: "Professional consulting firms" },
    { icon: "bi-gear-wide-connected", name: "Manufacturing companies" },
  ];

  const benefits = [
    "Deliver relevant information to target audiences",
    "Improve customer engagement through personalization",
    "Generate more website visitors and conversions",
    "Strengthen customer loyalty",
    "Boost repetitive marketing activities with automation",
    "Gain valuable customer insights through analytics",
    "Enhance email deliverability and inbox placement",
  ];

  const emailServices = [
    "Email marketing strategy and planning",
    "Professional newsletter design",
    "Promotional email campaigns",
    "Email automation and drip campaigns",
    "Welcome email sequences",
    "Lead nurturing campaigns",
    "Customer retention campaigns",
    "Subscriber list segmentation",
    "Email copywriting",
    "Responsive email template design",
    "A/B testing and campaign optimisation",
    "Email deliverability optimization",
    "Campaign analytics and reporting",
  ];

  const roiBenefits = [
    "Build stronger relationships with customers",
    "Promote products and services effectively",
    "Drive repeat purchases",
    "Generate qualified leads",
    "Recover abandoned shopping carts",
    "Provide tailored customer experiences",
    "Compare campaign performance with in-depth analytics",
    "Improve overall marketing return on investment",
  ];

  const whyChooseItems = [
    "Customized email marketing strategies",
    "Targeting customers by audience segmentation",
    "Personalized email content",
    "Marketing automation expertise",
    "Performance-focused campaign optimization",
    "Clear and comprehensible reporting and analytics",
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
                  {data.intro_small_heading || "Email Marketing · Dubai"}
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rs-gd-intro__copy">
                <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                  {data.intro_description ||
                    "At RedSpider, we are proud to offer the best email marketing services in Dubai, that do more than just filling the inboxes. Whether you are launching a new product or promoting a seasonal offer, well designed email marketing can help you keep connected with your existing customers."}
                </p>
                <p className="rs-gd-intro__support rs-gd-intro__reveal">
                  Our team combines strategy and data driven optimization to
                  help businesses in Dubai. Each campaign is designed to meet
                  your business goals and send across your message to the right
                  people at the right time.
                </p>
                <div className="rs-gd-intro__footer">
                  <a className="rs-gd-intro__link" href="#">
                    <span>Explore our Services</span>
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

      {/* Campaign Types + Process */}
      <section className="wk-campaign-section">
        <div className="wk-campaign-container" style={{ maxWidth: "1550px" }}>
          <div className="wk-campaign-inner">
            <div className="wk-campaign-grid">
              {/* LEFT COLUMN - Campaign Types */}
              <div className="wk-campaign-left">
                <h2 className="wk-campaign-title">
                  Types of Email Campaigns We Manage
                </h2>
                <p className="wk-campaign-description">
                  We create email campaigns that are designed keeping in mind
                  your business goals and customer interests.
                </p>

                <div className="wk-studio-list">
                  {campaignTypes.map((campaign, index) => (
                    <div className="wk-studio-item" key={index}>
                      <button
                        className={`wk-studio-btn ${activeCampaign === index ? "wk-active" : ""}`}
                        type="button"
                        onClick={() => handleCampaignClick(index)}
                        aria-expanded={activeCampaign === index}
                        aria-controls={`wk-studio-${data.id}-${index}`}
                      >
                        <span className="wk-studio-symbol">
                          {activeCampaign === index ? "−" : "+"}
                        </span>
                        <span className="wk-studio-label">
                          {campaign.title}
                        </span>
                      </button>
                      <div
                        id={`wk-studio-${data.id}-${index}`}
                        className={`wk-studio-content ${activeCampaign === index ? "wk-open" : ""}`}
                        role="region"
                        aria-hidden={activeCampaign !== index}
                      >
                        <div className="wk-studio-body">{campaign.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="wk-connect-footer">
                  <span className="wk-footer-text">Know More About :</span>
                  <div className="wk-footer-line"></div>
                  <a href="#" className="wk-footer-link">
                    Contact us
                  </a>
                </div>
              </div>

              {/* CENTER COLUMN - Image */}
              <div className="wk-studio-image-col">
                <div className="wk-studio-image-wrap">
                  <div
                    className={`wk-image-container ${imageChanging ? "wk-image-transitioning" : ""}`}
                  >
                    <img
                      key={activeCampaign}
                      className="wk-studio-img"
                      src={campaignImages[activeCampaign]}
                      alt={
                        campaignTypes[activeCampaign]?.title ||
                        "Email Marketing"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Process */}
              <div className="wk-process-column">
                <div className="wk-process-header">
                  <h6 className="wk-process-title">
                    Our <br />
                    Email Marketing <br /> Process
                  </h6>
                </div>
                <p className="wk-process-description">
                  Each campaign is thoroughly planned, professionally delivered
                  and continually improved to deliver better results through a
                  structured process.
                </p>

                <div className="wk-process-accordion">
                  {data.processes?.map((process, index) => {
                    const collapseId = `wk-process-${data.id}-${index}`;
                    return (
                      <div
                        className="wk-process-item"
                        key={process.id || index}
                      >
                        <button
                          className={`wk-process-btn ${activeProcess === index ? "wk-active" : ""}`}
                          type="button"
                          onClick={() => handleProcessClick(index)}
                          aria-expanded={activeProcess === index}
                          aria-controls={collapseId}
                        >
                          <span className="wk-process-number">
                            {index + 1}.
                          </span>
                          <span className="wk-process-name">
                            {process.title}
                          </span>
                          <span
                            className={`wk-process-arrow ${activeProcess === index ? "wk-rotated" : ""}`}
                          >
                            ↗
                          </span>
                        </button>
                        <div
                          id={collapseId}
                          className={`wk-process-content ${activeProcess === index ? "wk-open" : ""}`}
                          role="region"
                          aria-hidden={activeProcess !== index}
                        >
                          <div className="wk-process-body">
                            {process.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="wk-platforms-section" id="wk-platforms">
        <div className="wk-platforms-container">
          <div className="wk-platforms-header">
            <h2 className="wk-platforms-title">
              <span className="wk-platforms-highlight">Email Marketing</span>{" "}
              Platforms We Work With
            </h2>
            <p className="wk-platforms-description">
              We collaborate with top email marketing services providers to
              provide businesses of all sizes with reliable, scalable and
              data-driven email marketing campaigns. We work with:
            </p>
          </div>

          <div className="wk-platforms-grid" aria-label="Email platforms">
            {platforms.map((platform, index) => (
              <article className="wk-platform-card" key={index}>
                <div className="wk-platform-card-content">
                  <span className="wk-platform-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="wk-platform-icon" aria-hidden="true">
                    <img
                      src={`/assets/img/icons/${platform.icon}.svg`}
                      alt={platform.name}
                    />
                  </div>
                  <h3 className="wk-platform-name">{platform.name}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="wk-platforms-footer">
            <p className="wk-platforms-footer-text">
              You can also connect email marketing to your CRM, ecommerce store,
              or business management system for smooth communication with your
              customers.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="email-industries-showcase">
        <div
          className="container position-relative"
          style={{ maxWidth: "1550px" }}
        >
          <div className="row g-4 g-xl-5 align-items-start">
            <div className="col-lg-4">
              <div className="email-industries-intro">
                <div className="email-industries-eyebrow">
                  <span></span>Email marketing solutions
                </div>
                <h2 className="email-industries-title">
                  Industries
                  <br />
                  We Serve
                </h2>
                <p className="email-industries-description">
                  With its ability to reach customers, boost engagement, and
                  foster long-term growth, email marketing is an asset to any
                  business, regardless of the industry. We offer email marketing
                  services to:
                </p>
                <div className="email-visual" aria-hidden="true">
                  <div className="email-mini-stat">
                    <strong>12</strong>
                    <span>
                      Industries
                      <br />
                      and growing
                    </span>
                  </div>
                  <div className="email-orbit">
                    <span className="email-dot email-dot-one"></span>
                    <span className="email-dot email-dot-two"></span>
                    <div className="email-icon-large">
                      <i className="bi bi-envelope-paper"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-3 industry-card-grid">
                {industries.map((industry, index) => (
                  <div className={`col-sm-6`} key={index}>
                    <div
                      className={`industry-card ${[0, 5, 8].includes(index) ? "industry-card-accent" : ""}`}
                    >
                      <div className="industry-card-content">
                        <div className="industry-card-top">
                          <span className="industry-icon">
                            <i className={industry.icon}></i>
                          </span>
                          <span className="industry-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="industry-name">{industry.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="industries-closing">
                <span className="closing-arrow">
                  <i className="bi bi-arrow-up-right"></i>
                </span>
                <p className="closing-text">
                  Whatever your industry, we develop campaigns which match your
                  company targets and customer needs.
                </p>
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
                    Professional Email Marketing
                    <br />
                    Benefits &amp; Growth
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="rs-mail-tech__content">
                  <h2 className="rs-mail-tech__title">
                    Benefits of Professional <span>Email Marketing</span>
                  </h2>
                  <p className="rs-mail-tech__description">
                    RedSpider helps businesses reach the right audiences with
                    relevant content, personalized communication, intelligent
                    automation and measurable campaign insights.
                  </p>
                  <a
                    className="rs-mail-tech__button"
                    href="#rs-mail-benefit-list"
                  >
                    <span>View Benefits</span>
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M14 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-lg-5">
                <ul id="rs-mail-benefit-list" className="rs-mail-tech__specs">
                  {benefits.map((benefit, index) => (
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

      {/* Services Editorial */}
      <section className="rs-mail-services-editorial">
        <div className="mse-orbit" aria-hidden="true"></div>
        <div className="container mse-container">
          <div className="row g-4 mse-topbar">
            <div className="col-md-6 col-lg-3">
              <ul className="mse-mini-list">
                <li>Email strategy</li>
                <li>Newsletter design</li>
                <li>Email automation</li>
                <li>Campaign analytics</li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="mse-top-image">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85"
                  alt="Email campaign analytics"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mse-stat">
                <div className="mse-icon-stack" aria-hidden="true">
                  <span className="mse-icon-circle">
                    <i className="bi bi-lightbulb"></i>
                  </span>
                  <span className="mse-icon-circle">
                    <i className="bi bi-envelope-paper"></i>
                  </span>
                  <span className="mse-icon-circle">
                    <i className="bi bi-graph-up-arrow"></i>
                  </span>
                </div>
                <div>
                  <p className="mse-stat-number">
                    <span className="mse-count">13</span>
                  </p>
                  <span className="mse-stat-label">Specialised Services</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mse-hero">
            <div className="col-lg-8">
              <h2 className="mse-title">
                <span className="mse-title-line">
                  <span className="mse-title-inner">Email</span>
                </span>
                <span className="mse-title-line">
                  <span className="mse-title-inner">Marketing</span>
                </span>
                <span className="mse-title-line">
                  <span className="mse-title-inner">Services</span>
                </span>
              </h2>
            </div>
            <div className="col-lg-4">
              <div className="mse-copy">
                <span className="mse-copy-mark"></span>
                <p>
                  Each company has a distinct objective, target audience and
                  communication approach. That is why we develop customized
                  email marketing strategies designed specifically for your
                  industry and objectives.
                </p>
                <p className="mb-0">
                  We offer the following email marketing services:
                </p>
              </div>
            </div>
          </div>

          <div className="row g-0 mse-services">
            {emailServices.map((service, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <a
                  className="mse-service"
                  href={`#service-${String(index + 1).padStart(2, "0")}`}
                >
                  <span className="mse-service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mse-service-name">{service}</span>
                  <span className="mse-service-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </a>
              </div>
            ))}
          </div>

          <div className="row mse-footer-row">
            <div className="col-sm-4">
              <span className="mse-wordmark">Email Focused</span>
            </div>
            <div className="col-sm-4 text-sm-center">
              <a className="mse-cta" href="#email-marketing-contact">
                Get Started <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
            <div className="col-sm-4">
              <i className="bi bi-stars mse-spark" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Benefits */}
      <section className="rs-email-roi-showcase">
        <div className="ers-floating-email-bg" aria-hidden="true">
          <svg
            viewBox="0 0 120 120"
            width="200"
            height="200"
            role="presentation"
            aria-hidden="true"
            style={{
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.35",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          >
            <rect x="15" y="29" width="90" height="64" rx="10"></rect>
            <path d="M20 37l40 31 40-31"></path>
            <path d="M20 85l27-24"></path>
            <path d="M100 85L73 61"></path>
            <path d="M82 19v-8"></path>
            <path d="M94 24l6-6"></path>
            <path d="M70 24l-6-6"></path>
          </svg>
        </div>
        <div className="container ers-container">
          <div className="row align-items-start g-5">
            <div className="col-12">
              <div
                className="text-center"
                style={{ maxWidth: "860px", margin: "auto" }}
              >
                <div className="ers-kicker">Email Marketing ROI</div>
                <h2 className="ers-title">
                  Why Email Marketing Still Delivers{" "}
                  <span>Outstanding ROI</span>
                </h2>
                <p className="ers-intro">
                  Email marketing ranks among the highest-performing digital
                  marketing channels because it gives direct access to customers
                  who are already interested in your products and services.
                  Instead of relying only on paid advertising, it remains an
                  affordable option for every brand.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <ul className="ers-benefit-list">
                {roiBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className={`ers-benefit-item ${index === 0 ? "is-active" : ""}`}
                    data-image={`https://images.unsplash.com/photo-${["1522202176988-66273c2fd55f", "1553484771-371a605b060b", "1556742049-0cfed4f6a45d", "1556761175-b413da4baf72", "1556742111-a301076d9d18", "1552664730-d307ca884978", "1551288049-bebda4e38f71", "1460925895917-afdab827c52f"][index]}?auto=format&fit=crop&w=1200&q=85`}
                  >
                    <span className="ers-benefit-label">
                      <span className="ers-number">
                        {String(index + 1).padStart(2, "0")}.
                      </span>{" "}
                      {benefit}
                    </span>
                    <span className="ers-arrow">
                      <i className="bi bi-arrow-up-right"></i>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="ers-visual">
                <div className="ers-ring"></div>
                <div className="ers-dots"></div>
                <div className="ers-image-card">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                    alt="Email marketing customer engagement"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="rs-agency-intro-sec">
        <div className="container">
          <h2 className="rs-agency-big-title text-white">
            Why Choose <span className="text-red">RedSpider</span> for Email
            Marketing in Dubai?
          </h2>
          <div className="row rs-agency-bottom align-items-center">
            <div className="col-lg-5">
              <div className="letconnect mt-5">
                <span className="text-white">Let's Connect :</span>
                <div className="line"></div>
                <a href="#">Book A Call</a>
              </div>
            </div>
            <div className="col-lg-4">
              <p className="rs-agency-text fs-4 text-white">
                RedSpider is the preferred choice of businesses due to our
                ability to provide:
              </p>
            </div>
            <div className="col-lg-1 d-none d-lg-block">
              <div className="rs-agency-line"></div>
            </div>
            <div className="col-lg-1">
              <div className="rs-agency-circle-wrap">
                <div
                  className="rs-agency-scroll-text"
                  id="rsAgencyCircleText"
                ></div>
                <div className="rs-agency-circle-center">14+</div>
              </div>
            </div>
          </div>
        </div>
        <div className="rs-feature-marquee pb-0 pt-4">
          <div className="rs-feature-row">
            <div className="rs-feature-track">
              {whyChooseItems.map((item, index) => (
                <div className="rs-feature-item" key={index}>
                  <i
                    className={`bi bi-${["person-workspace", "palette", "search", "phone", "shield-check", "person-workspace"][index % 6]}`}
                  ></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rs-feature-row reverse">
            <div className="rs-feature-track">
              {whyChooseItems.map((item, index) => (
                <div
                  className="rs-feature-item"
                  key={index + whyChooseItems.length}
                >
                  <i
                    className={`bi bi-${["person-workspace", "palette", "search", "phone", "shield-check", "person-workspace"][index % 6]}`}
                  ></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
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
                  <h4 className="mb-0">
                    Get an Estimate for Email{" "}
                    <br className="d-none d-md-block" />
                    Marketing Services in Dubai
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
                <div className="quick-contect text-center text-lg-end mt-3 mt-lg-0">
                  <small>Get A Consultation</small>
                  <h5 className="mb-0">: 971555515475</h5>
                </div>
              </div>
            </div>
            <p className="text-dark mt-2">
              <em>
                Are you starting out your first email campaign or want to
                improve your current strategy? With RedSpider you can achieve
                measurable results. Contact us today for a customized email
                marketing solution and grow your brand!
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Review */}
      <section
        id="review-sec"
        className="review-sec section light-background py-5"
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
          className="home-faq rs-faq-sec section pb-5 pt-0 light-background"
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
              <p>
                Find quick answers to common questions about email marketing.
              </p>
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
