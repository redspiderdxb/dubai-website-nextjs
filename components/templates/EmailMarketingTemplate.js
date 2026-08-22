"use client";

import { useState, useEffect, Fragment } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function EmailMarketingTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  // ============================================
  // DYNAMIC FIELDS
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

    // ============================================
    // REPEATER DATA
    // ============================================

    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],
    industries = [],

    // ============================================
    // FRONTEND SETTINGS
    // ============================================

    layout_style = "grid",
    columns_count = 3,

    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

    // ============================================
    // SECTION VISIBILITY
    // ============================================

    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // ============================================
    // CONTENT CUSTOMIZATION
    // ============================================

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

    gallery_title = "Our Gallery",
    gallery_subtitle = "",

    cta_subtitle = "",
    cta_button_url = "/contact",

    // ============================================
    // ANIMATION
    // ============================================

    animation_enabled = true,
    animation_type = "fade",
    animation_duration = "medium",

    // ============================================
    // SECTION ORDER
    // ============================================

    section_order = [
      "hero",
      "intro",
      "features",
      "technologies",
      "industries",
      "benefits",
      "services",
      "processes",
      "agency",
      "packages",
      "review",
      "gallery",
      "faqs",
      "ready",
      "cta",
    ],

    // ============================================
    // CUSTOM CODE
    // ============================================

    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================
  // 🆕 INTRO TEXT WORD SPLITTER
  // ============================================

  const accentWords = [
    "RedSpider",
    "email",
    "marketing",
    "creativity",
    "innovation",
    "passion",
    "solutions",
    "Dubai",
    "UAE",
    "campaign",
    "automation",
    "personalization",
  ];

  const splitTextIntoWords = (text) => {
    if (!text) return null;

    const words = String(text).trim().split(/\s+/);

    return words.map((word, index) => {
      const cleanWord = word
        .replace(/[.,!?;:]+$/g, "")
        .replace(/^["']|["']$/g, "");

      const isAccent = accentWords.includes(cleanWord);

      return (
        <Fragment key={`${cleanWord}-${index}`}>
          <span
            className={`rs-gd-intro__word ${
              isAccent ? "rs-gd-intro__word--accent" : ""
            }`}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      );
    });
  };

  // ============================================
  // 🆕 INTRO WORD SCROLL REVEAL
  // ============================================

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let retryTimer = null;
    let initialized = false;

    const initIntroWordAnimation = () => {
      if (!window.gsap || !window.ScrollTrigger) {
        return false;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const section = document.querySelector(".rs-gd-intro");

      if (!section) {
        return false;
      }

      const words = section.querySelectorAll(".rs-gd-intro__word");

      if (!words.length) {
        return false;
      }

      // Remove previous trigger if it already exists.
      const existingTrigger = ScrollTrigger.getById("rs-intro-word-reveal");

      if (existingTrigger) {
        existingTrigger.kill();
      }

      // Kill any previous word tweens.
      gsap.killTweensOf(words);

      // Initial state.
      gsap.set(words, {
        opacity: 0,
        y: 18,
        filter: "blur(7px)",
        willChange: "transform, opacity, filter",
      });

      // Word-by-word scroll reveal.
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",

        duration: 1,

        ease: "none",

        stagger: {
          each: 0.025,
        },

        scrollTrigger: {
          id: "rs-intro-word-reveal",

          trigger: section,

          start: "top 75%",
          end: "top 20%",

          scrub: 1,

          invalidateOnRefresh: true,

          // Do not pin the intro section.
          pin: false,
        },
      });

      ScrollTrigger.refresh();

      initialized = true;

      return true;
    };

    // Try immediately.
    const firstAttempt = initIntroWordAnimation();

    // If GSAP/ScrollTrigger is loaded after the component,
    // retry for a short period.
    if (!firstAttempt) {
      let attempts = 0;

      retryTimer = setInterval(() => {
        attempts++;

        const success = initIntroWordAnimation();

        if (success || attempts >= 30) {
          clearInterval(retryTimer);
          retryTimer = null;
        }
      }, 100);
    }

    return () => {
      if (retryTimer) {
        clearInterval(retryTimer);
        retryTimer = null;
      }

      if (window.ScrollTrigger) {
        const trigger = window.ScrollTrigger.getById("rs-intro-word-reveal");

        if (trigger) {
          trigger.kill();
        }
      }

      if (window.gsap) {
        const words = document.querySelectorAll(".rs-gd-intro__word");

        if (words.length) {
          window.gsap.killTweensOf(words);

          window.gsap.set(words, {
            clearProps: "opacity,transform,filter,willChange",
          });
        }
      }

      initialized = false;
    };
  }, []);

  // ============================================
  // 📌 FALLBACK DATA - MUST BE DEFINED BEFORE sectionMap
  // ============================================

  // 1. Campaign Types - Used in features section
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

  // 2. Process Data - Used in features section
  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Audience & Data Analysis",
            description:
              "We begin by understanding the customer behavior, demographics and purchase history to create highly targeted customer segments.",
          },
          {
            title: "Campaign Strategy Planning",
            description:
              "We craft our campaign approach to provide a clear path to action, including objectives, messaging, scheduling, audience targeting, and performance goals.",
          },
          {
            title: "Creative Email Design",
            description:
              "We create custom eye catching and mobile responsive email templates that suit your brand and provide a great user experience on all devices.",
          },
          {
            title: "Content & Personalization",
            description:
              "Our team can design engaging subject lines, compelling copy, and personalized messages that make a difference for various audience segments and drive increased engagement.",
          },
          {
            title: "Campaign Deployment",
            description:
              "Each email is checked for quality before it's sent to guarantee that it is correctly formatted, responsive, and deliverable. Campaigns are then scheduled and sent out via trusted email platforms.",
          },
        ];

  // 3. Platform Data - Used in technologies section
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

  // 4. Benefits List - Used in benefits section
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

  // 5. FAQ Data - Used in faqs section
  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "How much does email marketing cost in Dubai?",
            answer:
              "The cost of email marketing depends on the size of your subscriber list, campaign frequency, automation and platform. We offer a customized plan according to your goals and business needs.",
          },
          {
            question: "What is the typical ROI of email marketing?",
            answer:
              "Email marketing gives one of the highest returns on investment compared to other digital marketing channels. A well-planned campaign can help your business generate better leads and improve customer engagement.",
          },
          {
            question: "How often should businesses send marketing emails?",
            answer:
              "Most companies send two to four marketing emails per month. Sharing relevant and useful content regularly helps maintain a consistent relationship with subscribers.",
          },
          {
            question: "What tools are used for email marketing campaigns?",
            answer:
              "We use trusted platforms such as Mailchimp, HubSpot, Klaviyo, SendGrid, Zoho Campaigns, ActiveCampaign and Brevo. We can also use custom automation platforms based on your business needs and campaign goals.",
          },
          {
            question: "Can email marketing help generate leads?",
            answer:
              "Yes. Email marketing campaigns featuring personalized content, educational resources and targeted offers can increase engagement and help your business generate more qualified leads.",
          },
        ];

  // 6. Industry Data - Used in industries section
  const industryData =
    industries.length > 0
      ? industries
      : [
          { name: "Ecommerce businesses", icon: "bi-bag" },
          { name: "Retail brands", icon: "bi-shop" },
          { name: "Real estate companies", icon: "bi-buildings" },
          { name: "Healthcare providers", icon: "bi-heart-pulse" },
          { name: "SaaS companies", icon: "bi-cloud" },
          { name: "Technology firms", icon: "bi-cpu" },
          { name: "Educational institutions", icon: "bi-mortarboard" },
          { name: "Hospitality businesses", icon: "bi-building" },
          { name: "Financial services", icon: "bi-graph-up-arrow" },
          { name: "Corporate service providers", icon: "bi-briefcase" },
          {
            name: "Professional consulting firms",
            icon: "bi-chat-square-text",
          },
          { name: "Manufacturing companies", icon: "bi-gear-wide-connected" },
        ];

  // 7. Email Services - Used in services section
  const emailServices =
    features.length > 0
      ? features.map((item) => item.title)
      : [
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

  // 8. Why Choose Items - Used in agency section
  const whyChooseItems =
    benefits.length > 0
      ? benefits.map((item) => item.title)
      : [
          "Customized email marketing strategies",
          "Targeting customers by audience segmentation",
          "Personalized email content",
          "Marketing automation expertise",
          "Performance-focused campaign optimization",
          "Clear and comprehensible reporting and analytics",
        ];

  // 9. ROI Benefits - Used in processes section
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

  // ============================================
  // 🎨 UI STATE
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

  // ============================================
  // GALLERY
  // ============================================

  const galleryImages =
    Array.isArray(gallery) && gallery.length > 0 ? gallery : [];

  const uniqueGalleryImages = Array.from(
    new Map(
      galleryImages
        .filter(
          (item) =>
            item && typeof item.image === "string" && item.image.trim() !== "",
        )
        .map((item) => [item.image.trim(), item]),
    ).values(),
  );

  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  const gallerySlides = uniqueGalleryImages.map((item) => ({
    src: item.image,
  }));

  // ============================================
  // 🎨 DYNAMIC STYLES
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
  // 📐 SECTION MAP
  // ============================================

  const sectionMap = {
    // ============================================
    // HERO
    // ============================================

    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },

    // ============================================
    // INTRO - rs-gd-intro with word reveal animation
    // ============================================

    intro: {
      component: (
        <section
          key="intro"
          className="rs-gd-intro"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <span className="rs-gd-intro__shape" aria-hidden="true"></span>

          <div className="container-fluid px-3 px-md-4 px-xl-5">
            <div className="row gx-xl-5 align-items-start">
              <div
                className="col-lg-3"
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="700"
                data-aos-once="true"
              >
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
                    {splitTextIntoWords(intro_description)}
                  </p>

                  <p className="rs-gd-intro__support rs-gd-intro__reveal">
                    {splitTextIntoWords(
                      "Whether you are launching a new product, promoting a seasonal offer, or building long-term customer relationships, we create email campaigns that are tailored to your goals and audience. Every campaign is carefully planned to deliver consistent brand communication across devices.",
                    )}
                  </p>

                  <div
                    className="rs-gd-intro__footer"
                    data-aos="fade-up"
                    data-aos-delay="250"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    <a
                      className="rs-gd-intro__link"
                      href="#email-marketing-services"
                    >
                      <span>Explore our services</span>
                      <i className="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-2"
                data-aos="fade-left"
                data-aos-delay="150"
                data-aos-duration="700"
                data-aos-once="true"
              >
                <div className="rs-gd-intro__meta">Creative since 2010</div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_intro,
    },

    // ============================================
    // FEATURES - archidex-accordion-sec
    // ============================================

    features: {
      component: (
        <section
          key="features"
          className="archidex-accordion-sec dark-cs-bg dark-background dev-before"
          id="email-marketing-services"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="archidex-bg-shape"></div>
          <div
            className="container rs-container-reveal"
            style={{ maxWidth: "1550px" }}
          >
            <div className="rs-container-reveal-inner">
              <div className="row g-5 align-items-start justify-content-between">
                {/* LEFT - Services List */}
                <div className="col-lg-5">
                  <h2
                    className="rs-main-title text-white fw-bold"
                    data-aos="fade-right"
                    data-aos-delay="100"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    {features_title}
                  </h2>

                  <p
                    data-aos="fade-right"
                    data-aos-delay="150"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    {features_subtitle}
                  </p>

                  <div
                    className="accordion rs-studio-list"
                    id="rsStudioAccordion"
                  >
                    {campaignTypes.map((campaign, index) => (
                      <div
                        className="accordion-item rs-studio-item"
                        key={campaign.id || index}
                      >
                        <h3 className="accordion-header">
                          <button
                            className={`rs-studio-btn ${activeCampaign === index ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#rsStudio${index}`}
                            aria-expanded={activeCampaign === index}
                            data-img={index}
                            onClick={() => handleCampaignClick(index)}
                            data-aos="fade-up"
                            data-aos-delay={100 + index * 80}
                            data-aos-duration="600"
                            data-aos-once="true"
                          >
                            <span className="rs-studio-symbol">
                              {activeCampaign === index ? "−" : "+"}
                            </span>
                            <span>{campaign.title}</span>
                          </button>
                        </h3>
                        <div
                          id={`rsStudio${index}`}
                          className={`accordion-collapse collapse ${activeCampaign === index ? "show" : ""}`}
                          data-bs-parent="#rsStudioAccordion"
                        >
                          <div className="accordion-body rs-studio-body">
                            {campaign.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="letconnect mt-5"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    <span
                      className="text-white"
                      data-aos="fade-right"
                      data-aos-delay="250"
                      data-aos-duration="600"
                    >
                      Know More About :
                    </span>
                    <div
                      className="line"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                      data-aos-duration="600"
                    ></div>
                    <a
                      href="#"
                      data-aos="fade-left"
                      data-aos-delay="350"
                      data-aos-duration="600"
                    >
                      Contact us
                    </a>
                  </div>
                </div>

                {/* CENTER - Image */}
                <div
                  className="col-lg-2 rs-studio-image-col"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
                  <div className="rs-studio-image-wrap">
                    <img
                      className={`rs-studio-img active ${imageChanging ? "rs-changing" : ""}`}
                      src={campaignImages[activeCampaign]}
                      alt={
                        campaignTypes[activeCampaign]?.title ||
                        "Email Marketing"
                      }
                    />
                  </div>
                </div>

                {/* RIGHT - Process Accordion */}
                <div className="col-lg-5 px-lg-5">
                  <div className="archidex-small-title mb-3 text-white">
                    <h6 className="text-white">
                      Our <br />
                      Email Marketing <br />
                      Process
                    </h6>
                  </div>
                  <p
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    {processes_subtitle}
                  </p>

                  <div
                    className="accordion archidex-accordion mt-4"
                    id="archidexAccordion"
                  >
                    {processData.map((process, index) => (
                      <div className="accordion-item" key={process.id || index}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${activeProcess === index ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseProcess${index}`}
                            aria-expanded={activeProcess === index}
                            onClick={() => handleProcessClick(index)}
                            data-aos="fade-left"
                            data-aos-delay={100 + index * 80}
                            data-aos-duration="600"
                            data-aos-once="true"
                          >
                            <span className="arch-no">{index + 1}.</span>
                            <span className="arch-name">{process.title}</span>
                            <span className="arch-arrow">↗</span>
                          </button>
                        </h2>
                        <div
                          id={`collapseProcess${index}`}
                          className={`accordion-collapse collapse ${activeProcess === index ? "show" : ""}`}
                          data-bs-parent="#archidexAccordion"
                        >
                          <div className="accordion-body">
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

    // ============================================
    // TECHNOLOGIES / PLATFORMS - rs-ecommerce-platforms
    // ============================================

    technologies: {
      component: (
        <section
          className="rs-ecommerce-platforms py-0 emailmark-camp"
          id="ecommerce-platforms"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="team-sticky">
            {/* =========================
            TITLE
        ========================= */}
            <div className="title-wrap text-center">
              <h2
                className="title mb-4"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="700"
                data-aos-once="true"
              >
                <span className="red">Email Marketing</span> Platforms We Work
                With
              </h2>

              <p
                className="rs-subtitl introline aos-init aos-animate mb-5"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
                data-aos-once="true"
              >
                {technologies_subtitle}
              </p>
            </div>

            {/* =========================
            PLATFORM CARDS
        ========================= */}
            <div className="gallery" aria-label="Ecommerce platforms">
              {/* Mailchimp */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="0"
                  data-aos-once="true"
                >
                  <span className="card-number">01</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/em-mailchimp.svg"
                      alt="Mailchimp"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>Mailchimp</h3>
                </div>
              </article>

              {/* HubSpot */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="80"
                  data-aos-once="true"
                >
                  <span className="card-number">02</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/em-hub.svg"
                      alt="HubSpot"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>HubSpot</h3>
                </div>
              </article>

              {/* Klaviyo */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="160"
                  data-aos-once="true"
                >
                  <span className="card-number">03</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/em-kla.svg"
                      alt="Klaviyo"
                      style={{ width: "90px" }}
                    />
                  </div>

                  <h3>Klaviyo</h3>
                </div>
              </article>

              {/* SendGrid */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="240"
                  data-aos-once="true"
                >
                  <span className="card-number">04</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/em-sendgrid.svg"
                      alt="SendGrid"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>SendGrid</h3>
                </div>
              </article>

              {/* Zoho Campaigns */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="320"
                  data-aos-once="true"
                >
                  <span className="card-number">05</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/em-zoho.svg"
                      alt="Zoho Campaigns"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>Zoho Campaigns</h3>
                </div>
              </article>

              {/* Active Campaign */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="320"
                  data-aos-once="true"
                >
                  <span className="card-number">05</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/blue-chevron-icon.svg"
                      alt="Active Campaign"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>Active Campaign</h3>
                </div>
              </article>

              {/* Brevo */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="320"
                  data-aos-once="true"
                >
                  <span className="card-number">05</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/brevo-icon.svg"
                      alt="Brevo"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>Brevo (formerly Sendinblue)</h3>
                </div>
              </article>

              {/* Customized Email */}
              <article className="card">
                <div
                  className="card-content"
                  data-aos="fade-up"
                  data-aos-delay="320"
                  data-aos-once="true"
                >
                  <span className="card-number">05</span>

                  <div className="platform-icon" aria-hidden="true">
                    <img
                      src="/assets/img/icons/em-gmail.svg"
                      alt="Customized email"
                      style={{ width: "60px" }}
                    />
                  </div>

                  <h3>Customized email</h3>
                </div>
              </article>
            </div>

            {/* =========================
            BOTTOM DESCRIPTION
        ========================= */}
            <p
              className="fs-3 text-center py-5 fw-bold rs-main-title"
              style={{
                maxWidth: "960px",
                margin: "auto",
                lineHeight: "1.3",
              }}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="700"
              data-aos-once="true"
            >
              You can also connect email marketing to your CRM, ecommerce store,
              or business management system for smooth communication with your
              customers.
            </p>
          </div>
        </section>
      ),

      show: show_technologies,
    },

    // ============================================
    // INDUSTRIES - email-industries-showcase
    // ============================================

    industries: {
      component: (
        <section
          key="industries"
          className="email-industries-showcase"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div
            className="container position-relative"
            style={{ maxWidth: "1550px" }}
          >
            <div className="row g-4 g-xl-5 align-items-start">
              <div
                className="col-lg-4"
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="700"
                data-aos-once="true"
              >
                <div className="email-industries-intro">
                  <div className="email-industries-eyebrow">
                    <span></span>
                    Email Marketing Solutions
                  </div>

                  <h2 className="email-industries-title">
                    Industries
                    <br />
                    We Serve
                  </h2>

                  <p className="email-industries-description">
                    With its ability to reach customers, boost engagement, and
                    foster long-term growth, email marketing is an asset to any
                    business, regardless of the industry. We offer email
                    marketing services to:
                  </p>

                  <div className="email-visual" aria-hidden="true">
                    <div className="email-mini-stat">
                      <strong>{industryData.length}</strong>
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
                  {industryData.map((industry, index) => (
                    <div
                      className="col-sm-6"
                      key={industry.id || industry.name || index}
                    >
                      <div
                        className={`industry-card ${
                          [0, 5, 8].includes(index)
                            ? "industry-card-accent"
                            : ""
                        }`}
                        data-aos="fade-up"
                        data-aos-delay={index * 80}
                        data-aos-duration="700"
                        data-aos-once="true"
                      >
                        <div className="industry-card-content">
                          <div className="industry-card-top">
                            <span className="industry-icon">
                              <i
                                className={`bi ${industry.icon || "bi-buildings"}`}
                              ></i>
                            </span>
                            <span className="industry-number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="industry-name">
                            {industry.name || industry.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="industries-closing"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
                  <span className="closing-arrow">
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                  <p className="closing-text">
                    Whatever your industry, we develop campaigns which match
                    your company targets and customer needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    // ============================================
    // BENEFITS - rs-mail-tech
    // ============================================

    benefits: {
      component: (
        <section
          key="benefits"
          className="rs-mail-tech"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div
            className="container-fluid px-lg-5"
            style={{ maxWidth: "1840px" }}
          >
            <div className="rs-mail-tech__frame">
              <span className="rs-mail-tech__scan" aria-hidden="true"></span>

              <div className="row align-items-center g-5 w-100">
                <div
                  className="col-lg-2"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
                  <div className="rs-mail-tech__index">
                    <p className="rs-mail-tech__category">
                      Professional Email Marketing
                      <br />
                      Benefits &amp; Growth
                    </p>
                  </div>
                </div>

                <div
                  className="col-lg-5"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
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

                <div
                  className="col-lg-5"
                  data-aos="fade-left"
                  data-aos-delay="150"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
                  <ul id="rs-mail-benefit-list" className="rs-mail-tech__specs">
                    {benefitsList.map((benefit, index) => {
                      const benefitText =
                        typeof benefit === "string"
                          ? benefit
                          : benefit.title || benefit.description || "Benefit";
                      return (
                        <li
                          className="rs-mail-tech__spec"
                          key={benefit.id || index}
                          data-aos="fade-left"
                          data-aos-delay={150 + index * 80}
                          data-aos-duration="600"
                          data-aos-once="true"
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

    // ============================================
    // SERVICES - rs-mail-services-editorial
    // ============================================

    services: {
      component: (
        <section
          className="rs-mail-services-editorial"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="mse-orbit" aria-hidden="true"></div>

          <div className="container mse-container">
            <div className="row g-4 mse-topbar">
              <div className="col-md-6 col-lg-3">
                <ul className="mse-mini-list">
                  {emailServices.slice(0, 4).map((service, index) => (
                    <li
                      key={index}
                      data-aos="fade-right"
                      data-aos-delay={index * 70}
                      data-aos-once="true"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="mse-top-image"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85"
                    alt="Email campaign analytics displayed on a laptop"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div
                  className="mse-stat"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
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
                      <span className="mse-count">{emailServices.length}</span>
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
                <div
                  className="mse-copy"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
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
                    data-aos="fade-up"
                    data-aos-delay={index * 60}
                    data-aos-once="true"
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
                <a className="mse-cta" href={cta_button_url || "/contact"}>
                  Get Started
                  <i className="bi bi-arrow-up-right"></i>
                </a>
              </div>
              <div className="col-sm-4">
                <i className="bi bi-stars mse-spark" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    // ============================================
    // PROCESSES - rs-email-roi-showcase
    // ============================================

    processes: {
      component: (
        <section
          key="processes"
          className="rs-email-roi-showcase"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
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
                  <div
                    className="ers-kicker"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                  >
                    Email Marketing ROI
                  </div>

                  <h2
                    className="ers-title"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
                    Why Email Marketing Still Delivers{" "}
                    <span>Outstanding ROI</span>
                  </h2>

                  <p
                    className="ers-intro"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="700"
                    data-aos-once="true"
                  >
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
                      data-aos="fade-right"
                      data-aos-delay={100 + index * 80}
                      data-aos-duration="600"
                      data-aos-once="true"
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

              <div
                className="col-lg-5"
                data-aos="fade-left"
                data-aos-delay="150"
                data-aos-duration="700"
                data-aos-once="true"
              >
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

    // ============================================
    // AGENCY - rs-agency-intro-sec
    // ============================================

    agency: {
      component: (
        <section
          key="agency"
          className="rs-agency-intro-sec"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="container">
            <h2
              className="rs-agency-big-title"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="700"
              data-aos-once="true"
            >
              Why Choose <span>RedSpider</span> for Email Marketing in Dubai?
            </h2>

            <div className="row rs-agency-bottom align-items-center">
              <div className="col-lg-5">
                <div
                  className="letconnect mt-5"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <span
                    data-aos="fade-right"
                    data-aos-delay="100"
                    data-aos-duration="700"
                  >
                    Let's Connect :
                  </span>
                  <div
                    className="line"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    data-aos-duration="700"
                  ></div>
                  <a
                    href="#"
                    data-aos="fade-left"
                    data-aos-delay="300"
                    data-aos-duration="700"
                  >
                    Book A Call
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <p
                  className="rs-agency-text fs-4"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
                  RedSpider is the preferred choice of businesses due to our
                  ability to provide:
                </p>
              </div>

              <div className="col-lg-1 d-none d-lg-block">
                <div className="rs-agency-line"></div>
              </div>

              <div className="col-lg-1">
                <div
                  className="rs-agency-circle-wrap"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
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
                    <i className="bi bi-person-workspace"></i>
                    <span>{item}</span>
                  </div>
                ))}
                {whyChooseItems.map((item, index) => (
                  <div className="rs-feature-item" key={`dup-${index}`}>
                    <i className="bi bi-person-workspace"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rs-feature-row reverse">
              <div className="rs-feature-track">
                {whyChooseItems.map((item, index) => (
                  <div className="rs-feature-item" key={`rev-${index}`}>
                    <i className="bi bi-person-workspace"></i>
                    <span>{item}</span>
                  </div>
                ))}
                {whyChooseItems.map((item, index) => (
                  <div className="rs-feature-item" key={`rev-dup-${index}`}>
                    <i className="bi bi-person-workspace"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    // ============================================
    // PACKAGES - rs-packages-se
    // ============================================

    packages: {
      component: (
        <section
          key="packages"
          className="rs-packages-se dark-background section pt-5 pb-0"
          style={{ background: "#fff" }}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="container" style={{ maxWidth: "1450px" }}>
            <div className="row">
              <div
                className="col-12"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="800"
                data-aos-once="true"
              >
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
                          src="assets/img/arrow-icon-40.svg"
                          alt
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
              <p
                className="text-dark mt-2"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="700"
                data-aos-once="true"
              >
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
      ),
      show: true,
    },

    // ============================================
    // REVIEW - review-sec
    // ============================================

    review: {
      component: (
        <section
          key="review"
          id="review-sec"
          className="review-sec section light-background py-5"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="container" style={{ maxWidth: "1100px" }}>
            <div className="review-wrap">
              <img src="assets/img/reviewimg.png" alt className="img-fluid" />
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    // ============================================
    // GALLERY - portfolio section
    // ============================================

    gallery: {
      component: (
        <>
          <Lightbox
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />

          <section
            key="gallery"
            id="portfolio"
            className="portfolio section pt-0 rs-custom-gallery"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <div className="rs-gd-intro py-5">
              <div className="container-fluid px-3 px-md-4 px-xl-5">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div
                      className="rs-gd-intro__copy"
                      style={{ maxWidth: "100%", margin: "auto" }}
                    >
                      <h2
                        className="rs-gd-intro__lead rs-gd-intro__reveal fade-title mb-3"
                        style={{ maxWidth: "1000px", margin: "auto" }}
                      >
                        {gallery_title || "Our Gallery"}
                      </h2>
                      {gallery_subtitle && (
                        <p className="rs-gd-intro__lead rs-gd-intro__reveal text-center fs-5">
                          {gallery_subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div
                className="isotope-layout"
                data-default-filter="*"
                data-layout="masonry"
                data-sort="original-order"
              >
                <div className="rs-custom-gallery-grid">
                  {uniqueGalleryImages.length > 0 ? (
                    uniqueGalleryImages.map((item, index) => (
                      <div
                        key={`${item.image}-${index}`}
                        className="rs-custom-gallery-item"
                      >
                        <div
                          className="rs-custom-gallery-card portfolio-content h-100"
                          role="button"
                          tabIndex={0}
                          style={{ cursor: "zoom-in" }}
                          onClick={() => {
                            setGalleryLightboxIndex(index);
                            setGalleryLightboxOpen(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setGalleryLightboxIndex(index);
                              setGalleryLightboxOpen(true);
                            }
                          }}
                        >
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt={item.title || "Gallery Image"}
                            loading="lazy"
                          />

                          <div className="portfolio-info">
                            <h3>{item.title || "Gallery"}</h3>
                            {item.description && <p>{item.description}</p>}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setGalleryLightboxIndex(index);
                                setGalleryLightboxOpen(true);
                              }}
                              className="preview-link border-0 bg-transparent text-white"
                              style={{
                                fontSize: "1.2rem",
                                cursor: "zoom-in",
                              }}
                              aria-label={`View ${item.title || "Gallery Image"}`}
                            >
                              <i
                                className="bi bi-zoom-in"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rs-custom-gallery-empty">
                      <p>No gallery images available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ),
      show: show_gallery,
    },

    // ============================================
    // FAQS - home-faq rs-faq-sec
    // ============================================

    faqs: {
      component: (
        <section
          key="faqs"
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section pb-5 pt-0 light-background"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
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
            <div
              className="text-start mb-5 border-bottom pb-3"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="700"
              data-aos-once="true"
            >
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
                        <div
                          className="accordion-item"
                          key={faq.id || idx}
                          data-aos="fade-up"
                          data-aos-delay={100 + idx * 80}
                          data-aos-duration="600"
                          data-aos-once="true"
                        >
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
                        <div
                          className="accordion-item"
                          key={faq.id || idx}
                          data-aos="fade-up"
                          data-aos-delay={150 + idx * 80}
                          data-aos-duration="600"
                          data-aos-once="true"
                        >
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

    // ============================================
    // READY - readytobuild
    // ============================================

    ready: {
      component: (
        <section
          key="ready"
          id="readytobuild"
          className="readytobuild section light-background pt-0 pb-5"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="container" style={{ maxWidth: "1100px" }}>
            <div className="section-title text-center text-white mb-0">
              <h2
                className="fw-bold"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="700"
                data-aos-once="true"
              >
                Ready to build a strong brand identity?
              </h2>
              <p
                className="text-dark"
                data-aos="fade-up"
                data-aos-delay="150"
                data-aos-duration="700"
                data-aos-once="true"
              >
                Let RedSpider create a professional email marketing strategy
                that represents your business the right way.
              </p>
            </div>
          </div>

          <div className="container" style={{ maxWidth: "1100px" }}>
            <div
              className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <a
                href="#"
                className="btn btn-animation btn-red d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
              >
                <span className="btn-title">Schedule Free Consultation</span>
                <span className="btn-icon-wrap">
                  <img
                    src="assets/img/icons/cc-icon.svg"
                    alt
                    className="btn-icon"
                  />
                </span>
              </a>

              <a
                href="#"
                className="btn btn-animation btn-black d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
              >
                <span className="btn-title">Call Now</span>
                <span className="btn-icon-wrap">
                  <img
                    src="assets/img/icons/phone.svg"
                    alt
                    className="btn-icon"
                  />
                </span>
              </a>

              <a
                href="https://wa.me/971505698733"
                target="_blank"
                className="btn btn-animation btn-green d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
              >
                <span className="btn-title">WhatsApp Us</span>
                <span className="btn-icon-wrap">
                  <img
                    src="assets/img/icons/whatsapp.svg"
                    alt
                    className="btn-icon"
                  />
                </span>
              </a>
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    // ============================================
    // CTA - ServiceCTA
    // ============================================

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
        "technologies",
        "industries",
        "benefits",
        "services",
        "processes",
        "agency",
        "packages",
        "review",
        "gallery",
        "faqs",
        "ready",
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

  // ============================================
  // 🎨 FINAL RENDER
  // ============================================

  return (
    <div style={styles}>
      {custom_css && <style dangerouslySetInnerHTML={{ __html: custom_css }} />}
      <main className="service-template">{renderSections()}</main>
      {custom_js && <script dangerouslySetInnerHTML={{ __html: custom_js }} />}
    </div>
  );
}
