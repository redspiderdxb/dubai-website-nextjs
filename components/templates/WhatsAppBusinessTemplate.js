import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const SERVICE_ICONS = [
  "bi-shield-check",
  "bi-briefcase",
  "bi-telephone",
  "bi-cloud",
  "bi-robot",
  "bi-inbox",
  "bi-diagram-3",
  "bi-globe",
  "bi-bell",
  "bi-megaphone",
  "bi-file-earmark-text",
  "bi-tools",
];

export default function WhatsAppBusinessTemplate({ data, service }) {
  const source = data || service || {};

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

  const arrayValue = (backendValue, fallbackValue = []) =>
    Array.isArray(backendValue) && backendValue.length
      ? backendValue
      : fallbackValue;

  const contactHref = source.cta_button_link || "/contact-us/";

  const whatsappServices = arrayValue(source.whatsapp_services, [
    { title: "WhatsApp Business API account setup" },
    { title: "Meta Business account guidance" },
    { title: "WhatsApp phone number integration" },
    { title: "WhatsApp Cloud API configuration" },
    { title: "Chatbot design and development" },
    { title: "Shared team inbox integration" },
    { title: "CRM and ERP integration" },
    { title: "Website and landing-page integration" },
    { title: "Automated customer notifications" },
    { title: "Marketing campaign setup" },
    { title: "Message template configuration" },
    { title: "API testing and technical support" },
  ]);

  const chatbotCapabilities = arrayValue(
    source.whatsapp_chatbot_capabilities,
    [
      { title: "Answer frequently asked questions" },
      { title: "Collect customer names and contact details" },
      { title: "Qualify new sales enquiries" },
      { title: "Share product and service information" },
      { title: "Book appointments or consultations" },
      { title: "Provide order and delivery updates" },
      { title: "Transfer conversations to a team member" },
      { title: "Create leads inside your CRM" },
    ],
  );

  const marketingCampaigns = arrayValue(source.whatsapp_marketing_campaigns, [
    { title: "Product and service announcements" },
    { title: "Promotional offers" },
    { title: "Event invitations" },
    { title: "Appointment reminders" },
    { title: "Abandoned cart reminders" },
    { title: "Order status notifications" },
    { title: "Payment reminders" },
    { title: "Lead follow-up campaigns" },
  ]);

  const pricingComponents = arrayValue(source.whatsapp_pricing_components, [
    { title: "Initial API setup and configuration" },
    { title: "Meta messaging charges" },
    { title: "Monthly platform or inbox subscription" },
    { title: "Chatbot development" },
    { title: "CRM or third-party software integration" },
    { title: "Ongoing support and maintenance" },
  ]);

  const whyChooseBenefits = arrayValue(source.whatsapp_why_choose_benefits, [
    {
      title: "Customised integration",
      description: "Built around your workflows, website and CRM.",
    },
    {
      title: "Simple workflows",
      description: "Team inboxes and chatbots that are easy to use day to day.",
    },
    {
      title: "Local support in Dubai",
      description: "Direct help from a team that understands UAE businesses.",
    },
    {
      title: "Website, chatbot and CRM expertise",
      description: "One team for messaging, website and business systems.",
    },
  ]);

  const introSmallHeading = value(
    source.intro_small_heading,
    "WhatsApp Business · Dubai",
  );
  const introDescription = value(
    source.intro_description,
    "Connect with customers, automate conversations and manage your WhatsApp communication from one platform. RedSpider provides WhatsApp Business API integration for companies in Dubai and across the UAE.",
  );

  const faqData = arrayValue(source.faqs, [
    {
      question: "What is WhatsApp Business API integration?",
      answer:
        "It connects your business WhatsApp number to chatbots, CRM, websites and team inboxes so conversations can be managed professionally.",
    },
    {
      question: "Do I need a chatbot with WhatsApp API?",
      answer:
        "Not always. A chatbot helps with FAQs, lead capture and after-hours replies, but live team inbox support can also be set up.",
    },
    {
      question: "Can WhatsApp connect to my CRM?",
      answer:
        "Yes. Conversations can create or update CRM records so sales and support teams work from the same customer information.",
    },
    {
      question: "How is WhatsApp Business API priced?",
      answer:
        "Pricing depends on Meta messaging charges, inbox or platform fees, chatbot scope and any CRM integrations.",
    },
  ]);

  return (
    <div>
      <main className="service-template whatsapp-business-template rs-creative-page">
        <section className="design-developemnt-hero hero-marquee">
          <div className="container">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                WhatsApp Business
                <span className="rs-process-highlight">
                  API Integration in Dubai
                  <svg
                    className="rs-process-underline"
                    viewBox="0 0 320 22"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                  </svg>
                </span>
              </h1>
              <p className="rs-process-text mb-3">
                Automate replies, manage team conversations and run approved
                WhatsApp campaigns from one connected setup.
              </p>
            </div>
          </div>
        </section>

        <section className="rs-creative-intro">
          <div className="container">
            <div className="rs-creative-intro__grid">
              <div className="rs-creative-intro__meta">
                <span className="rs-creative-kicker">{introSmallHeading}</span>
                <p className="rs-creative-intro__note">API, inbox and chatbot</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{introDescription}</p>
                <p className="rs-creative-intro__support">
                  Whether you receive a few enquiries a day or thousands of
                  conversations, we can help you respond faster and keep
                  communication organised.
                </p>
                <a className="rs-creative-link" href="#whatsapp-api-services">
                  Explore WhatsApp services
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="whatsapp-api-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we set up</span>
              <h2>
                {value(
                  source.whatsapp_services_heading,
                  "Our WhatsApp Business API Integration Services",
                )}
              </h2>
              <p>
                {value(
                  source.whatsapp_services_description,
                  "Complete setup and integration support for businesses in Dubai.",
                )}
              </p>
            </div>
            <div className="rs-creative-card-grid">
              {whatsappServices.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
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
                  <h3>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Chatbot</span>
                <h2>
                  {value(
                    source.whatsapp_chatbot_heading,
                    "WhatsApp chatbot integration",
                  )}
                </h2>
                <p>
                  {value(
                    source.whatsapp_chatbot_description,
                    "Answer common questions instantly and stay available outside working hours. The chatbot can welcome customers, understand requirements and guide them to the right service.",
                  )}
                </p>
                <a className="rs-creative-btn" href={contactHref}>
                  {source.cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-pill-grid">
                {chatbotCapabilities.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="rs-creative-pill"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rs-creative-services">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Marketing</span>
              <h2>
                {value(
                  source.whatsapp_marketing_heading,
                  "WhatsApp Marketing Services in Dubai",
                )}
              </h2>
              <p>
                {value(
                  source.whatsapp_marketing_description,
                  "Structured, approved campaigns for offers, reminders and follow-ups.",
                )}
              </p>
            </div>
            <div className="rs-creative-industry-grid">
              {marketingCampaigns.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="rs-creative-industry"
                >
                  <span className="rs-creative-industry__icon" aria-hidden="true">
                    <i className="bi bi-whatsapp"></i>
                  </span>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rs-creative-process">
          <div className="container">
            <div className="rs-creative-head rs-creative-head--light">
              <span className="rs-creative-kicker">Inbox & CRM</span>
              <h2>Shared inbox and CRM connection</h2>
              <p>
                {value(
                  source.whatsapp_inbox_description,
                  "A shared inbox lets authorised staff manage one business WhatsApp number. CRM integration can create or update customer profiles from conversations.",
                )}
              </p>
            </div>
            <ol className="rs-creative-steps">
              <li className="rs-creative-step">
                <span className="rs-creative-step__num">01</span>
                <h3>
                  {value(
                    source.whatsapp_inbox_heading,
                    "Shared WhatsApp Inbox",
                  )}
                </h3>
                <p>
                  Assign conversations to sales, support or other teams from
                  one number.
                </p>
              </li>
              <li className="rs-creative-step">
                <span className="rs-creative-step__num">02</span>
                <h3>
                  {value(
                    source.whatsapp_crm_heading,
                    "Connect WhatsApp with Your CRM",
                  )}
                </h3>
                <p>
                  {value(
                    source.whatsapp_crm_description,
                    "When a customer starts a conversation, their CRM profile can be created or updated automatically.",
                  )}
                </p>
              </li>
              <li className="rs-creative-step">
                <span className="rs-creative-step__num">03</span>
                <h3>
                  {value(
                    source.whatsapp_cloud_api_heading,
                    "WhatsApp Cloud API",
                  )}
                </h3>
                <p>
                  {value(
                    source.whatsapp_cloud_api_description,
                    "Meta's cloud API connects WhatsApp to websites and software without you managing server infrastructure.",
                  )}
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Pricing</span>
                <h2>
                  {value(
                    source.whatsapp_pricing_heading,
                    "WhatsApp Business API Pricing",
                  )}
                </h2>
                <p>
                  {value(
                    source.whatsapp_pricing_description,
                    "Pricing depends on Meta messaging charges, the inbox platform, chatbot features and how many users manage conversations.",
                  )}
                </p>
              </div>
              <div className="rs-creative-pill-grid">
                {pricingComponents.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="rs-creative-pill"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Why RedSpider</span>
                <h2>
                  {value(source.whatsapp_why_choose_heading, "Why Choose RedSpider?")}
                </h2>
                <p>
                  {value(
                    source.whatsapp_why_choose_description,
                    "Local setup, website integration and ongoing technical assistance.",
                  )}
                </p>
                <a className="rs-creative-btn" href={contactHref}>
                  Book a call
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-why__grid">
                {whyChooseBenefits.map((item, index) => (
                  <article key={`${item.title}-${index}`} className="rs-creative-why__card">
                    <span className="rs-creative-why__icon" aria-hidden="true">
                      <i className="bi bi-check2-circle"></i>
                    </span>
                    <h3>{item.title}</h3>
                    {item.description ? <p>{item.description}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceFaqs
          faqs={faqData}
          title="Frequently Asked Questions"
          subtitle="Find quick answers about WhatsApp Business API integration."
          idPrefix="whatsapp"
        />

        <ServiceCTA service={source} />
      </main>
    </div>
  );
}
