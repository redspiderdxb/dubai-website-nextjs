import React from "react";

/*
|--------------------------------------------------------------------------
| WhatsApp Business Template
|--------------------------------------------------------------------------
| Backend data is used whenever available.
| Original HTML content is used as fallback whenever backend data is
| missing / empty.
|--------------------------------------------------------------------------
*/

const WhatsAppBusinessTemplate = ({ service = {} }) => {
  // ============================================================
  // HELPERS
  // ============================================================

  const value = (backendValue, fallbackValue = "") => {
    if (
      backendValue !== undefined &&
      backendValue !== null &&
      String(backendValue).trim() !== ""
    ) {
      return backendValue;
    }

    return fallbackValue;
  };

  const arrayValue = (backendValue, fallbackValue = []) => {
    return Array.isArray(backendValue) && backendValue.length
      ? backendValue
      : fallbackValue;
  };

  const imageUrl = (image, fallback) => {
    if (!image) {
      return fallback;
    }

    if (
      typeof image === "string" &&
      (image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("/"))
    ) {
      return image;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";

    return `${baseUrl}/storage/${image}`;
  };

  // ============================================================
  // FALLBACK CONTENT
  // ============================================================

  const fallbackServices = [
    {
      number: "01",
      icon: "verified_user",
      title: "WhatsApp Business API account setup",
    },
    {
      number: "02",
      icon: "business_center",
      title: "Meta Business account guidance",
    },
    {
      number: "03",
      icon: "phone_in_talk",
      title: "WhatsApp phone number integration",
    },
    {
      number: "04",
      icon: "cloud_sync",
      title: "WhatsApp Cloud API configuration",
    },
    {
      number: "05",
      icon: "smart_toy",
      title: "Chatbot design and development",
    },
    {
      number: "06",
      icon: "forum",
      title: "Shared team inbox integration",
    },
    {
      number: "07",
      icon: "hub",
      title: "CRM and ERP integration",
    },
    {
      number: "08",
      icon: "language",
      title: "Website and landing-page integration",
    },
    {
      number: "09",
      icon: "notifications_active",
      title: "Automated customer notifications",
    },
    {
      number: "10",
      icon: "campaign",
      title: "Marketing campaign setup",
    },
    {
      number: "11",
      icon: "description",
      title: "Message template configuration",
    },
    {
      number: "12",
      icon: "support_agent",
      title: "API testing and technical support",
    },
  ];

  const fallbackChatbot = [
    {
      step: "01",
      icon: "help",
      title: "Answer frequently asked questions",
    },
    {
      step: "02",
      icon: "person_add",
      title: "Collect customer names and contact details",
    },
    {
      step: "03",
      icon: "filter_alt",
      title: "Qualify new sales enquiries",
    },
    {
      step: "04",
      icon: "inventory_2",
      title: "Share product and service information",
    },
    {
      step: "05",
      icon: "calendar_month",
      title: "Book appointments or consultations",
    },
    {
      step: "06",
      icon: "local_shipping",
      title: "Provide order and delivery updates",
    },
    {
      step: "07",
      icon: "support_agent",
      title: "Transfer conversations to a team member",
    },
    {
      step: "08",
      icon: "hub",
      title: "Create leads inside your CRM",
    },
    {
      step: "09",
      icon: "reviews",
      title: "Collect customer feedback",
    },
    {
      step: "10",
      icon: "translate",
      title: "Support more than one language",
    },
  ];

  const fallbackMarketing = [
    {
      number: "01",
      icon: "campaign",
      title: "Product and service announcements",
    },
    {
      number: "02",
      icon: "sell",
      title: "Promotional offers",
    },
    {
      number: "03",
      icon: "event",
      title: "Event invitations",
    },
    {
      number: "04",
      icon: "calendar_clock",
      title: "Appointment reminders",
    },
    {
      number: "05",
      icon: "shopping_cart_checkout",
      title: "Abandoned cart reminders",
    },
    {
      number: "06",
      icon: "apartment",
      title: "New property alerts",
    },
    {
      number: "07",
      icon: "local_shipping",
      title: "Order status notifications",
    },
    {
      number: "08",
      icon: "payments",
      title: "Payment reminders",
    },
    {
      number: "09",
      icon: "reviews",
      title: "Customer feedback requests",
    },
    {
      number: "10",
      icon: "follow_the_signs",
      title: "Lead follow-up campaigns",
    },
  ];

  const fallbackPricing = [
    {
      number: "01",
      icon: "settings_suggest",
      title: "Initial API setup and configuration",
    },
    {
      number: "02",
      icon: "forum",
      title: "Meta messaging charges",
    },
    {
      number: "03",
      icon: "calendar_month",
      title: "Monthly platform or inbox subscription",
    },
    {
      number: "04",
      icon: "smart_toy",
      title: "Chatbot development",
    },
    {
      number: "05",
      icon: "hub",
      title: "CRM or third-party software integration",
    },
    {
      number: "06",
      icon: "support_agent",
      title: "Ongoing support and maintenance",
    },
  ];

  const fallbackWhyChoose = [
    {
      icon: "tune",
      title: "Customised integration based on your requirements",
    },
    {
      icon: "conversion_path",
      title: "Simple and user-friendly workflows",
    },
    {
      icon: "location_on",
      title: "Local support in Dubai",
    },
    {
      icon: "devices",
      title: "Website, chatbot and CRM expertise",
    },
    {
      icon: "model_training",
      title: "Training and technical assistance",
    },
    {
      icon: "trending_up",
      title: "Scalable solutions for growing businesses",
    },
  ];

  // ============================================================
  // API DATA OR FALLBACK
  // ============================================================

  const whatsappServices = arrayValue(
    service.whatsapp_services,
    fallbackServices,
  );

  const chatbotCapabilities = arrayValue(
    service.whatsapp_chatbot_capabilities,
    fallbackChatbot,
  );

  const marketingCampaigns = arrayValue(
    service.whatsapp_marketing_campaigns,
    fallbackMarketing,
  );

  const pricingComponents = arrayValue(
    service.whatsapp_pricing_components,
    fallbackPricing,
  );

  const whyChooseBenefits = arrayValue(
    service.whatsapp_why_choose_benefits,
    fallbackWhyChoose,
  );

  // ============================================================
  // IMAGES
  // ============================================================

  const heroImage = imageUrl(
    service.hero_image,
    "/assets/img/whatsapp-img/wapi-dashboard.png",
  );

  const cloudApiImage = imageUrl(
    service.whatsapp_cloud_api_image,
    "/assets/img/whatsapp-img/whatsapp-cloud-api-workflows.png",
  );

  const crmImage = imageUrl(
    service.whatsapp_crm_image,
    "/assets/img/whatsapp-img/whatsapp-crm.png",
  );

  const integrationImage = "/assets/img/whatsapp-img/whatsapp-integrations.png";

  // ============================================================
  // CONTENT
  // ============================================================

  const heroTitle = value(
    service.hero_title,
    "WhatsApp Business API Integration",
  );

  const heroSubtitle = value(
    service.hero_subtitle,
    "WhatsApp Business API Integration",
  );

  const introSmallHeading = value(
    service.intro_small_heading,
    "WhatsApp Business Solutions",
  );

  const introMainHeading = value(
    service.intro_main_heading,
    "WhatsApp Business API Integration and Marketing in Dubai",
  );

  const introDescription = value(
    service.intro_description,
    "Connect with customers, automate conversations and manage your WhatsApp communication from one powerful platform. RedSpider provides professional WhatsApp Business API Integration services for companies in Dubai and across the UAE. We help businesses connect WhatsApp with chatbots, CRM software, websites, customer support systems and marketing platforms.",
  );

  const servicesHeading = value(
    service.whatsapp_services_heading,
    "Our WhatsApp Business API Integration Services",
  );

  const servicesDescription = value(
    service.whatsapp_services_description,
    "Our team provides complete setup and integration support, including:",
  );

  const chatbotHeading = value(
    service.whatsapp_chatbot_heading,
    "WhatsApp Business API Integration with Chatbot",
  );

  const chatbotDescription = value(
    service.whatsapp_chatbot_description,
    "Our WhatsApp Business API Integration with Chatbot service helps companies answer common questions instantly and remain available outside normal working hours. The chatbot can welcome customers, understand their requirements and guide them towards the right service.",
  );

  const cloudApiHeading = value(
    service.whatsapp_cloud_api_heading,
    "WhatsApp Cloud API Integration",
  );

  const cloudApiDescription = value(
    service.whatsapp_cloud_api_description,
    "The WhatsApp Cloud API is Meta’s cloud-based solution for business messaging. It allows companies to connect WhatsApp with websites, software platforms and customised applications without managing their own WhatsApp API server infrastructure.",
  );

  const marketingHeading = value(
    service.whatsapp_marketing_heading,
    "WhatsApp Marketing Services in Dubai",
  );

  const marketingDescription = value(
    service.whatsapp_marketing_description,
    "Our WhatsApp marketing solutions help businesses communicate with customers through structured and approved campaigns. Announce new products, share special offers, remind customers about appointments or reconnect with existing leads.",
  );

  const inboxHeading = value(
    service.whatsapp_inbox_heading,
    "Shared WhatsApp Inbox for Your Team",
  );

  const inboxDescription = value(
    service.whatsapp_inbox_description,
    "A shared inbox allows multiple authorised employees to manage customer conversations using one business WhatsApp number. Enquiries can be assigned to different departments, agents or sales representatives.",
  );

  const crmHeading = value(
    service.whatsapp_crm_heading,
    "Connect WhatsApp with Your CRM",
  );

  const crmDescription = value(
    service.whatsapp_crm_description,
    "CRM integration helps your team manage WhatsApp leads more effectively. When a customer starts a conversation, the system can automatically create or update their CRM profile.",
  );

  const pricingHeading = value(
    service.whatsapp_pricing_heading,
    "WhatsApp Business API Pricing",
  );

  const pricingDescription = value(
    service.whatsapp_pricing_description,
    "WhatsApp Business API pricing depends on several factors, including Meta's current messaging charges, the integration platform, the required chatbot features and the number of users managing conversations.",
  );

  const whyChooseHeading = value(
    service.whatsapp_why_choose_heading,
    "Why Choose RedSpider?",
  );

  const whyChooseDescription = value(
    service.whatsapp_why_choose_description,
    "RedSpider Web & Art Design has been providing digital solutions to businesses in Dubai since 2013. Our team understands website development, business automation, CRM systems and digital marketing.",
  );

  return (
    <main className="main">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="whatsapp-hero hero-marquee">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12" data-aos="fade-right">
              <div className="rs-process-title-sec">
                <h1 className="rs-process-title mb-3">
                  <span className="rs-process-highlight">
                    {heroTitle}
                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>

                  {heroSubtitle &&
                    heroSubtitle !== heroTitle &&
                    ` ${heroSubtitle}`}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="rs-whatsapp-intro-section">
        <div className="container" style={{ maxWidth: "1500px" }}>
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-6">
              <div
                className="rs-content-wrap"
                data-aos="fade-up"
                data-aos-duration="750"
              >
                <span className="rs-eyebrow">{introSmallHeading}</span>

                <h1 className="rs-title">{introMainHeading}</h1>

                <div className="rs-description">
                  <p>{introDescription}</p>

                  <p>
                    Whether you receive a few enquiries every day or manage
                    thousands of customer conversations, our solution can help
                    you respond faster and keep your communication properly
                    organised. From automated replies and lead qualification to
                    promotional campaigns and customer support, we build a
                    WhatsApp solution based on your business requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="rs-image-area"
                data-aos="fade-left"
                data-aos-duration="850"
                data-aos-delay="100"
              >
                <span className="rs-orbit rs-orbit-one"></span>
                <span className="rs-orbit rs-orbit-two"></span>

                <div className="rs-status-card rs-status-top">
                  <span>Smart automation active</span>
                </div>

                <div className="rs-image-frame">
                  <img
                    src={heroImage}
                    alt="WAPI dashboard showing contacts, campaigns and audience growth"
                  />
                </div>

                <div className="rs-status-card rs-status-bottom">
                  <span>Conversations organised</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS CHANNEL
      ===================================================== */}

      <section className="rs-business-channel-section">
        <div className="container" style={{ maxWidth: "1500px" }}>
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <div
                className="rs-visual-wrap"
                data-aos="fade-right"
                data-aos-duration="850"
              >
                <span className="rs-visual-glow"></span>

                <div className="rs-float-chip rs-chip-one">
                  <span className="material-symbols-outlined">sync</span>
                  Connected systems
                </div>

                <img
                  src={integrationImage}
                  alt="WhatsApp business platform connected with websites, ecommerce and automation systems"
                />

                <div className="rs-float-chip rs-chip-two">
                  <span className="material-symbols-outlined">forum</span>
                  One communication channel
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2">
              <div
                className="rs-content-wrap"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="100"
              >
                <span className="rs-eyebrow">
                  Connected Business Communication
                </span>

                <h2 className="rs-title">
                  Turn WhatsApp into a Powerful{" "}
                  <span>Business Communication Channel</span>
                </h2>

                <div className="rs-description">
                  <p>
                    WhatsApp is already one of the most widely used
                    communication platforms in the UAE. Customers prefer it
                    because it is quick, familiar and easy to access. However, a
                    standard WhatsApp account may not provide enough features
                    for a growing company.
                  </p>

                  <p>
                    The WhatsApp Business API allows multiple employees to
                    manage conversations, automate repetitive responses, send
                    approved message templates and connect WhatsApp with other
                    business systems. It gives your team better control over
                    sales enquiries, customer support, appointment reminders and
                    marketing communication.
                  </p>

                  <p>
                    RedSpider manages the technical integration and helps you
                    build a practical system that fits your daily operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          API SERVICES
      ===================================================== */}

      <section className="rs-api-services-section">
        <div className="container">
          <div className="rs-heading-wrap" data-aos="fade-up">
            <span className="rs-eyebrow">Complete Integration Support</span>

            <h2 className="rs-title">{servicesHeading}</h2>

            <p className="rsdescription">{servicesDescription}</p>
          </div>

          <div className="row g-2 rs-services-grid">
            {whatsappServices.map((item, index) => (
              <div
                className="col-md-6"
                data-aos="fade-up"
                data-aos-delay={index % 2 === 1 ? "50" : undefined}
                key={item.id || index}
              >
                <article className="rs-service-card">
                  <span className="rs-card-number">
                    {value(item.number, String(index + 1).padStart(2, "0"))}
                  </span>

                  <span className="rs-icon-box">
                    <i className="material-symbols-outlined">
                      {value(item.icon, "verified_user")}
                    </i>
                  </span>

                  <h3>{value(item.title, "WhatsApp Integration Service")}</h3>
                </article>
              </div>
            ))}
          </div>

          <div className="rs-bottom-note" data-aos="fade-up">
            <i className="material-symbols-outlined">tips_and_updates</i>

            <span>
              We analyse how your company communicates with customers and
              recommend the right setup. The objective is to reduce manual work
              without making your customer experience feel complicated or
              impersonal.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHATBOT
      ===================================================== */}

      <section className="rs-chatbot-light-section">
        <div className="container">
          <div className="row align-items-start g-4 g-xl-5">
            <div className="col-lg-5">
              <div className="rs-intro-panel" data-aos="fade-up">
                <span className="rs-eyebrow">Automated Customer Journeys</span>

                <h2 className="rs-title">{chatbotHeading}</h2>

                <p className="rs-description">{chatbotDescription}</p>

                <div className="rs-intro-stat">
                  <strong>{chatbotCapabilities.length}</strong>

                  <span>
                    Useful chatbot
                    <br />
                    capabilities
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="rs-flow-wrap">
                <span className="rs-flow-progress"></span>

                {chatbotCapabilities.map((item, index) => (
                  <article
                    className="rs-flow-item"
                    data-aos="fade-left"
                    key={item.id || index}
                  >
                    <span className="rs-flow-icon">
                      <i className="material-symbols-outlined">
                        {value(item.icon, "help")}
                      </i>
                    </span>

                    <h3>{value(item.title, "WhatsApp chatbot capability")}</h3>

                    <span className="rs-step">
                      {value(item.step, String(index + 1).padStart(2, "0"))}
                    </span>
                  </article>
                ))}

                <div className="rs-bottom-note" data-aos="fade-up">
                  <i className="material-symbols-outlined">tips_and_updates</i>

                  <span>
                    The chatbot supports your customer service team by handling
                    the first stage of a conversation and transferring important
                    enquiries to the correct employee.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOUD API
      ===================================================== */}

      <section className="rs-cloud-api-section">
        <div className="container">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-6">
              <div
                className="rs-visual-shell"
                data-aos="zoom-in"
                data-aos-delay="120"
              >
                <img
                  className="rs-main-image"
                  src={cloudApiImage}
                  alt="WhatsApp Cloud API automated conversations and workflow examples"
                />

                <span className="rs-status rs-status-one">
                  <i className="material-symbols-outlined">cloud_done</i>
                  Cloud API active
                </span>

                <span className="rs-status rs-status-two">
                  <span className="rs-pulse"></span>
                  Messages connected
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rs-copy" data-aos="fade-up">
                <span className="rs-eyebrow">Connected messaging</span>

                <h2 className="rs-title">{cloudApiHeading}</h2>

                <p className="rs-description">{cloudApiDescription}</p>

                <p className="rs-common-description">
                  RedSpider can integrate the WhatsApp Cloud API with your
                  existing digital systems. We can connect incoming WhatsApp
                  messages to your CRM, create automated workflows and display
                  conversations inside a shared dashboard.
                </p>

                <p className="rs-common-description">
                  Cloud API integration is suitable for ecommerce businesses,
                  real estate companies, healthcare providers, schools,
                  restaurants, service companies and organisations that handle a
                  large number of customer enquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MARKETING
      ===================================================== */}

      <section className="rs-marketing-section">
        <div className="container">
          <div className="rs-heading-wrap" data-aos="fade-up">
            <span className="rs-eyebrow">Campaign possibilities</span>

            <h2 className="rs-title">{marketingHeading}</h2>

            <p className="rs-description">{marketingDescription}</p>
          </div>

          <div className="rs-campaign-map">
            {marketingCampaigns.map((item, index) => (
              <article
                className="rs-campaign-card"
                data-aos="fade-up"
                data-aos-delay={
                  [40, 80, 120, 160].includes(((index + 1) % 5) * 40)
                    ? ((index + 1) % 5) * 40
                    : undefined
                }
                key={item.id || index}
              >
                <div className="rs-card-top">
                  <i className="material-symbols-outlined rs-card-icon">
                    {value(item.icon, "campaign")}
                  </i>

                  <span className="rs-card-number">
                    {value(item.number, String(index + 1).padStart(2, "0"))}
                  </span>
                </div>

                <h3>{value(item.title, "WhatsApp Marketing Campaign")}</h3>
              </article>
            ))}
          </div>

          <div className="rs-compliance-note" data-aos="fade-up">
            <i className="material-symbols-outlined">verified_user</i>

            <span>
              Messages should only be sent to customers who have provided valid
              consent. We help you organise opt-in methods, audience lists and
              approved templates to support responsible and professional
              communication.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          SHARED INBOX
      ===================================================== */}

      <section className="rs-cloud-api-section">
        <div className="container">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-6">
              <div
                className="rs-visual-shell"
                data-aos="zoom-in"
                data-aos-delay="120"
              >
                <img
                  className="rs-main-image"
                  src={integrationImage}
                  alt="WhatsApp shared team inbox"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rs-copy" data-aos="fade-up">
                <span className="rs-eyebrow">Team Inbox</span>

                <h2 className="rs-title">{inboxHeading}</h2>

                <p className="rs-description">{inboxDescription}</p>

                <p className="rs-common-description">
                  Your team can view conversation history, add internal notes
                  and track the status of each enquiry. This prevents customers
                  from being ignored and reduces confusion when more than one
                  employee is involved.
                </p>

                <p className="rs-common-description">
                  The shared inbox can support sales, customer service,
                  accounts, bookings and technical support from a central
                  platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CRM
      ===================================================== */}

      <section className="rs-cloud-api-section">
        <div className="container">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-6">
              <div className="rs-copy" data-aos="fade-up">
                <span className="rs-eyebrow">CRM Integration</span>

                <h2 className="rs-title">{crmHeading}</h2>

                <p className="rs-description">{crmDescription}</p>

                <p className="rs-common-description">
                  Depending on your CRM and workflow, the integration may record
                  messages, assign leads, create follow-up tasks and update the
                  sales pipeline. Your staff can see previous interactions
                  before responding, providing a more informed and consistent
                  customer experience.
                </p>

                <p className="rs-common-description">
                  RedSpider can develop customised connections between WhatsApp
                  and compatible CRM, ERP or business management systems.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="rs-visual-shell"
                data-aos="zoom-in"
                data-aos-delay="120"
              >
                <img
                  className="rs-main-image"
                  src={crmImage}
                  alt="WhatsApp CRM integration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section className="rs-api-pricing-section">
        <div className="container">
          <header className="rs-pricing-heading" data-aos="fade-up">
            <h2 className="rs-common-title">{pricingHeading}</h2>

            <p className="rs-common-description">{pricingDescription}</p>

            <div className="rs-pricing-label">The overall cost may include</div>
          </header>

          <div className="rs-pricing-grid">
            {pricingComponents.map((item, index) => (
              <article
                className="rs-pricing-card"
                data-aos="fade-up"
                data-aos-delay={index % 2 === 1 ? "40" : undefined}
                key={item.id || index}
              >
                <span className="material-symbols-outlined rs-line-icon">
                  {value(item.icon, "settings_suggest")}
                </span>

                <h3>
                  {value(item.title, "WhatsApp Business API Pricing Component")}
                </h3>

                <span className="rs-card-index">
                  {value(item.number, String(index + 1).padStart(2, "0"))}
                </span>
              </article>
            ))}
          </div>

          <div className="rs-quotation-note" data-aos="fade-up">
            <span className="material-symbols-outlined rs-line-icon">
              request_quote
            </span>

            <span>
              Every company has different requirements, so we provide a
              customised quotation after reviewing your expected message volume,
              number of users and automation needs. Meta's applicable messaging
              fees are separate and may change according to its current pricing
              rules.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE REDSPIDER
      ===================================================== */}

      <section className="rs-why-hub-section">
        <div className="container">
          <header className="rs-heading" data-aos="fade-up">
            <h2 className="rs-common-title">{whyChooseHeading}</h2>

            <p className="rs-common-description">{whyChooseDescription}</p>

            <p className="rs-common-description">
              We do more than connect an API. We help you plan a complete
              WhatsApp communication process that supports your sales and
              customer service teams. Our solutions can be customised according
              to your industry, customer journey and internal workflow.
            </p>

            <p className="rs-common-description">
              With RedSpider, you receive:
            </p>
          </header>

          <div className="rs-hub-layout">
            {/* LEFT 3 */}
            <div className="rs-benefit-column rs-left-column">
              {whyChooseBenefits.slice(0, 3).map((item, index) => (
                <article
                  className="rs-hub-card"
                  data-aos="fade-right"
                  data-aos-delay={index * 60 || undefined}
                  key={item.id || index}
                >
                  <span className="material-symbols-outlined rs-card-icon">
                    {value(item.icon, "tune")}
                  </span>

                  <h3>
                    {value(
                      item.title,
                      "Customised integration based on your requirements",
                    )}
                  </h3>
                </article>
              ))}
            </div>

            {/* CENTER */}
            <div className="rs-center-hub" data-aos="zoom-in">
              <span className="rs-orbit" aria-hidden="true"></span>

              <span className="rs-orbit-inner" aria-hidden="true"></span>

              <div className="rs-hub-core">
                <span className="material-symbols-outlined">hub</span>

                <strong>One Connected Solution</strong>
              </div>
            </div>

            {/* RIGHT 3 */}
            <div className="rs-benefit-column rs-right-column">
              {whyChooseBenefits.slice(3, 6).map((item, index) => (
                <article
                  className="rs-hub-card"
                  data-aos="fade-left"
                  data-aos-delay={index * 60 || undefined}
                  key={item.id || index}
                >
                  <span className="material-symbols-outlined rs-card-icon">
                    {value(item.icon, "devices")}
                  </span>

                  <h3>
                    {value(item.title, "Website, chatbot and CRM expertise")}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhatsAppBusinessTemplate;
