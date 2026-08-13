"use client";

import { useState } from "react";
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function EmailMarketingTemplate({ data }) {
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
    intro_small_heading = "Email Marketing · Dubai",
    intro_main_heading = "",
    intro_description = "At RedSpider, we are proud to offer the best email marketing services in Dubai, that do more than just filling the inboxes. Whether you are launching a new product or promoting a seasonal offer, well designed email marketing can help you keep connected with your existing customers.",
    intro_image = "",
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,

    // Repeater Data
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],

    // ============================================
    // 🆕 NEW - FRONTEND DYNAMIC SETTINGS
    // ============================================

    // Design & Layout
    layout_style = "grid",
    columns_count = 3,
    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

    // Section Visibility
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // Content Customization
    hero_button_text = "Get Started",
    hero_button_url = "/contact",
    features_title = "Types of Email Campaigns We Manage",
    features_subtitle = "We create email campaigns that are designed keeping in mind your business goals and customer interests.",
    benefits_title = "Benefits of Professional Email Marketing",
    benefits_subtitle = "RedSpider helps businesses reach the right audiences with relevant content, personalized communication, intelligent automation and measurable campaign insights.",
    processes_title = "Our Email Marketing Process",
    processes_subtitle = "Each campaign is thoroughly planned, professionally delivered and continually improved to deliver better results through a structured process.",
    technologies_title = "Email Marketing Platforms We Work With",
    technologies_subtitle = "We collaborate with top email marketing services providers to provide businesses of all sizes with reliable, scalable and data-driven email marketing campaigns.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about email marketing.",
    gallery_title = "Our Work",
    gallery_subtitle = "",
    cta_subtitle = "",
    cta_button_url = "/contact",

    // Animation
    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

    // Section Order
    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "technologies",
      "gallery",
      "faqs",
      "cta",
    ],

    // Custom Code
    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================
  // 📌 FALLBACK DATA - Jab backend se data na aaye
  // ============================================

  // 1. Campaign Types - Dynamic from features or static fallback
  const campaignTypes =
    features.length > 0
      ? features
      : [
          {
            title: "Promotional Email Campaigns",
            description:
              "Promotional email campaigns are used to introduce customers with your products, exclusive offers, seasonal discounts, sales, and special events.",
          },
          {
            title: "Newsletter Campaigns",
            description:
              "Newsletter campaigns will help you reach out to a wider customer range who are interested to have industry updates, product launches and other promotional activities.",
          },
          {
            title: "Automated Email Sequences",
            description:
              "Automation makes it possible to reach customers when it is the right time, but without manual labor. We write automated workflows for welcome e-mails, onboarding sequence, abandoned cart, follow-up e-mail, birthday e-mail, and post-purchase e-mail.",
          },
          {
            title: "Customer Retention Campaigns",
            description:
              "Getting new customers is a difficult task, but maintaining your existing customers is even more tough. With the right custom retention campaigns you can do both tasks successfully.",
          },
          {
            title: "Lead Nurturing Campaigns",
            description:
              "Not all leads are suitable for an instant sale. Lead nurturing campaigns nurture leads by offering them relevant content, addressing common queries, and slowly gaining customer's trust until they are prepared to make a purchase.",
          },
          {
            title: "Re-engagement Campaigns",
            description:
              "You don't need to delete your inactive subscribers who haven't interacted in a while. We create the best re-engagement campaigns that can help you reconnect with customers.",
          },
        ];

  // 2. Platforms - Dynamic from technologies or static fallback
  const platformData =
    technologies.length > 0
      ? technologies
      : [
          { name: "Mailchimp", icon: "em-mailchimp" },
          { name: "HubSpot", icon: "em-hub" },
          { name: "Klaviyo", icon: "em-kla" },
          { name: "SendGrid", icon: "em-sendgrid" },
          { name: "Zoho Campaigns", icon: "em-zoho" },
          { name: "Active Campaign", icon: "blue-chevron-icon" },
          { name: "Brevo (formerly Sendinblue)", icon: "brevo-icon" },
          { name: "Customized email", icon: "em-gmail" },
        ];

  // 3. Benefits List - Dynamic from benefits or static fallback
  const benefitsList =
    benefits.length > 0
      ? benefits
      : [
          "Deliver relevant information to target audiences",
          "Improve customer engagement through personalization",
          "Generate more website visitors and conversions",
          "Strengthen customer loyalty",
          "Boost repetitive marketing activities with automation",
          "Gain valuable customer insights through analytics",
          "Enhance email deliverability and inbox placement",
        ];

  // 4. Process Steps - Dynamic from processes or static fallback
  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We analyze your business goals, target audience, and email marketing requirements to create a clear project roadmap.",
          },
          {
            title: "Strategy Development",
            description:
              "We develop a comprehensive email marketing strategy aligned with your business objectives.",
          },
          {
            title: "Campaign Design & Creation",
            description:
              "We create visually appealing email templates and compelling content for your campaigns.",
          },
          {
            title: "Launch & Monitoring",
            description:
              "We launch your campaigns and monitor performance to ensure optimal results.",
          },
          {
            title: "Analysis & Optimization",
            description:
              "We analyze campaign data and continuously optimize for better results.",
          },
        ];

  // 5. FAQ Data - Dynamic from faqs or static fallback
  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "What email marketing services do you offer in Dubai?",
            answer:
              "We offer a comprehensive range of email marketing services including strategy planning, newsletter design, promotional campaigns, automation, lead nurturing, and customer retention campaigns.",
          },
          {
            question: "Which email marketing platforms do you work with?",
            answer:
              "We work with leading platforms including Mailchimp, HubSpot, Klaviyo, SendGrid, Zoho Campaigns, Active Campaign, and Brevo. We can also work with custom email solutions.",
          },
          {
            question:
              "How long does it take to see results from email marketing?",
            answer:
              "Initial results can be seen within the first campaign, but optimal results typically develop over 3-6 months of consistent email marketing efforts.",
          },
          {
            question: "Do you provide email marketing analytics and reporting?",
            answer:
              "Yes, we provide detailed analytics and reporting on open rates, click-through rates, conversions, and other key metrics to measure campaign effectiveness.",
          },
        ];

  // 6. Gallery Images - Dynamic from backend
  const galleryImages = gallery.length > 0 ? gallery : [];

  // ============================================
  // 🎨 UI State
  // ============================================
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [imageChanging, setImageChanging] = useState(false);

  const campaignImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1400&auto=format&fit=crop",
  ];

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

  // Static data (hardcoded - will be dynamic later)
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

  // ============================================
  // 🎨 Dynamic Styles
  // ============================================
  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  // ============================================
  // 📐 Section Order Mapping
  // ============================================
  const sectionMap = {
    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },
    intro: {
      component: (
        <section key="intro" className="rs-gd-intro">
          <span className="rs-gd-intro__shape" aria-hidden="true"></span>
          <div className="container-fluid px-3 px-md-4 px-xl-5">
            <div className="row gx-xl-5 align-items-start">
              <div className="col-lg-3">
                <div className="rs-gd-intro__rail">
                  <span className="rs-gd-intro__rail-icon">
                    <i className="bi bi-envelope-paper"></i>
                  </span>
                  <span className="rs-gd-intro__rail-text">
                    {intro_small_heading}
                  </span>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="rs-gd-intro__copy">
                  <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                    {intro_description}
                  </p>
                  <p className="rs-gd-intro__support rs-gd-intro__reveal">
                    Our team combines strategy and data driven optimization to
                    help businesses in Dubai. Each campaign is designed to meet
                    your business goals and send across your message to the
                    right people at the right time.
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
      ),
      show: show_intro,
    },
    features: {
      component: (
        <section className="wk-campaign-section">
          <div className="wk-campaign-container" style={{ maxWidth: "1550px" }}>
            <div className="wk-campaign-inner">
              <div className="wk-campaign-grid">
                <div className="wk-campaign-left">
                  <h2 className="wk-campaign-title">{features_title}</h2>
                  <p className="wk-campaign-description">{features_subtitle}</p>
                  <div className="wk-studio-list">
                    {campaignTypes.map((campaign, index) => (
                      <div className="wk-studio-item" key={index}>
                        <button
                          className={`wk-studio-btn ${activeCampaign === index ? "wk-active" : ""}`}
                          type="button"
                          onClick={() => handleCampaignClick(index)}
                          aria-expanded={activeCampaign === index}
                        >
                          <span className="wk-studio-symbol">
                            {activeCampaign === index ? "−" : "+"}
                          </span>
                          <span className="wk-studio-label">
                            {campaign.title}
                          </span>
                        </button>
                        <div
                          className={`wk-studio-content ${activeCampaign === index ? "wk-open" : ""}`}
                        >
                          <div className="wk-studio-body">
                            {campaign.description}
                          </div>
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

                <div className="wk-process-column">
                  <div className="wk-process-header">
                    <h6 className="wk-process-title">{processes_title}</h6>
                  </div>
                  <p className="wk-process-description">{processes_subtitle}</p>
                  <div className="wk-process-accordion">
                    {processData.map((process, index) => (
                      <div
                        className="wk-process-item"
                        key={process.id || index}
                      >
                        <button
                          className={`wk-process-btn ${activeProcess === index ? "wk-active" : ""}`}
                          type="button"
                          onClick={() => handleProcessClick(index)}
                          aria-expanded={activeProcess === index}
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
                          className={`wk-process-content ${activeProcess === index ? "wk-open" : ""}`}
                        >
                          <div className="wk-process-body">
                            {process.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_features,
    },
    benefits: {
      component: (
        <section className="rs-mail-tech">
          <div
            className="container-fluid px-lg-5"
            style={{ maxWidth: "1840px" }}
          >
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
                    <h2 className="rs-mail-tech__title">{benefits_title}</h2>
                    <p className="rs-mail-tech__description">
                      {benefits_subtitle}
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
                    {benefitsList.map((benefit, index) => {
                      // 🔥 Agar benefit string hai toh direct dikhao, object hai toh title/description dikhao
                      const benefitText =
                        typeof benefit === "string"
                          ? benefit
                          : benefit.title || benefit.description || "Benefit";
                      return (
                        <li
                          className="rs-mail-tech__spec"
                          key={benefit.id || index}
                        >
                          <span className="rs-mail-tech__spec-label">
                            Benefit {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="rs-mail-tech__spec-text">
                            {benefitText}
                          </span>
                          <span className="rs-mail-tech__spec-arrow">→</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },
    processes: {
      component: (
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
                    marketing channels because it gives direct access to
                    customers who are already interested in your products and
                    services. Instead of relying only on paid advertising, it
                    remains an affordable option for every brand.
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
      ),
      show: show_processes,
    },



   technologies: {
  component: (
    <section className="wk-platforms-section" id="wk-platforms">
      <div className="wk-platforms-container">
        <div className="wk-platforms-header">
          <h2 className="wk-platforms-title">{technologies_title}</h2>
          <p className="wk-platforms-description">
            {technologies_subtitle}
          </p>
        </div>
        <div className="wk-platforms-grid" aria-label="Email platforms">
          {platformData.map((platform, index) => (
            <article
              className="wk-platform-card"
              key={platform.id || index}
            >
              <div className="wk-platform-card-content">
                <span className="wk-platform-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="wk-platform-icon" aria-hidden="true">
                  {/* 🔥 Check karo agar icon bi- se start ho raha hai toh icon use karo, nahi toh image */}
                  {platform.icon && platform.icon.startsWith('bi-') ? (
                    <i className={`bi ${platform.icon}`} style={{ fontSize: '2.5rem', color: '#FF6B35' }}></i>
                  ) : (
                    <img
                      src={`/assets/img/icons/${platform.icon || 'default'}.svg`}
                      alt={platform.name}
                    />
                  )}
                </div>
                <h3 className="wk-platform-name">{platform.name}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="wk-platforms-footer">
          <p className="wk-platforms-footer-text">
            You can also connect email marketing to your CRM, ecommerce
            store, or business management system for smooth communication
            with your customers.
          </p>
        </div>
      </div>
    </section>
  ),
  show: show_technologies,
},


    gallery: {
      component: (
        <section key="gallery" className="opposite-gallery-sec py-0">
          <div className="opposite-gallery-sticky">
            <div className="gallery-title-wrap">
              <span>{gallery_title || "Our Work"}</span>
              <h2>{gallery_title || "Our Work"}</h2>
              {gallery_subtitle && <p>{gallery_subtitle}</p>}
            </div>
            <div className="gallery-inner">
              {galleryImages.length > 0 ? (
                <>
                  <div className="gallery-track top-track">
                    {galleryImages.slice(0, 6).map((item, index) => (
                      <div
                        key={item.id || index}
                        className={`gallery-card ${index % 3 === 0 ? "large" : index % 3 === 2 ? "small" : ""}`}
                      >
                        <img src={item.image} alt={item.title || "Gallery"} />
                      </div>
                    ))}
                  </div>
                  {galleryImages.length > 6 && (
                    <div className="gallery-track bottom-track">
                      {galleryImages.slice(6, 12).map((item, index) => (
                        <div
                          key={item.id || index}
                          className={`gallery-card ${index % 3 === 1 ? "large" : index % 3 === 0 ? "small" : ""}`}
                        >
                          <img src={item.image} alt={item.title || "Gallery"} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center py-5">No gallery images available</p>
              )}
            </div>
          </div>
        </section>
      ),
      show: show_gallery,
    },
    faqs: {
      component: (
        <section
          key="faqs"
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
              <h2 className="fw-bold">{faqs_title}</h2>
              <p>{faqs_subtitle}</p>
            </div>
            {faqData.length > 0 ? (
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="accordion" id="faqLeft-email">
                    {faqData
                      .slice(0, Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div className="accordion-item" key={faq.id || idx}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-email-left-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h2>
                          <div
                            id={`faq-email-left-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqLeft-email"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="accordion" id="faqRight-email">
                    {faqData
                      .slice(Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div className="accordion-item" key={faq.id || idx}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-email-right-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h2>
                          <div
                            id={`faq-email-right-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqRight-email"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">No FAQs available</p>
            )}
          </div>
        </section>
      ),
      show: show_faqs,
    },
    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

  // ============================================
  // 🏗️ Render Sections Based on Order
  // ============================================
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
        "technologies",
        "gallery",
        "faqs",
        "cta",
      ];
    }
    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section) return null;
        return section.show ? section.component : null;
      })
      .filter(Boolean);
  };

  return (
    <div style={styles}>
      {custom_css && <style dangerouslySetInnerHTML={{ __html: custom_css }} />}
      <main className="service-template">{renderSections()}</main>
      {custom_js && <script dangerouslySetInnerHTML={{ __html: custom_js }} />}
    </div>
  );
}
