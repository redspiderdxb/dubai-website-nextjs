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

// Desktop hub layout: grid column and row for each card, in card-number order.
// Columns 1-2 sit left of the hub and columns 4-5 sit right of it.
const HUB_SLOTS = [
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 4, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
  { col: 5, row: 1 },
  { col: 1, row: 3 },
  { col: 2, row: 3 },
  { col: 4, row: 2 },
  { col: 5, row: 2 },
  { col: 4, row: 3 },
  { col: 5, row: 3 },
];

// Marketing section copy and card titles, in display order.
const MARKETING_SERVICES = [
  { title: "Product Announcements" },
  { title: "Promotional Offers" },
  { title: "Event Invitations" },
  { title: "Appointment Reminders" },
  { title: "Abandoned Cart Reminders" },
  { title: "Property Alerts" },
  { title: "Order Updates" },
  { title: "Payment Reminders" },
  { title: "Feedback Requests" },
  { title: "Lead Follow-ups" },
];

// Chatbot section: fixed reference copy and icons, in display order.
const CHATBOT_FEATURES = [
  { icon: "bi-chat-square-dots", title: "Answer frequently asked questions" },
  { icon: "bi-person", title: "Collect customer names and contact details" },
  { icon: "bi-bar-chart", title: "Qualify new sales enquiries" },
  { icon: "bi-share", title: "Share product and service information" },
  { icon: "bi-calendar", title: "Book appointments or consultations" },
  { icon: "bi-truck", title: "Provide order and delivery updates" },
  { icon: "bi-people", title: "Transfer conversations to a team member" },
  { icon: "bi-file-earmark-plus", title: "Create leads inside your CRM" },
  { icon: "bi-star", title: "Collect customer feedback" },
  { icon: "bi-globe", title: "Support more than one language" },
];

// Small illustrated avatars for the hero conversations panel (inline SVG, no image assets).
const HERO_AVATARS = {
  sarah: (
    <svg viewBox="0 0 40 40" focusable="false">
      <circle cx="20" cy="20" r="20" fill="#e9eef5" />
      <path d="M11 19c0-7 4-11 9-11s9 4 9 11v7c0 2-1 4-3 4h-12c-2 0-3-2-3-4z" fill="#2b1b17" />
      <ellipse cx="20" cy="19.5" rx="6.5" ry="7.5" fill="#e3ad85" />
      <path d="M13.5 17c1-4 4-6 7-6 3 0 5.5 2 6.5 6-2-1.5-4-2-6.5-2s-4.5.5-7 2z" fill="#2b1b17" />
      <path d="M8 40c1.2-7 6-10.5 12-10.5S30.8 33 32 40z" fill="#3b82f6" />
      <path d="M17 29.5h6l-1 3h-4z" fill="#e3ad85" />
    </svg>
  ),
  john: (
    <svg viewBox="0 0 40 40" focusable="false">
      <circle cx="20" cy="20" r="20" fill="#e9eef5" />
      <ellipse cx="20" cy="18.5" rx="6.5" ry="7.5" fill="#c68b59" />
      <path d="M13.5 16.5c.5-4.5 3.5-6.5 6.5-6.5s6 2 6.5 6.5c-2-1.5-4-2-6.5-2s-4.5.5-6.5 2z" fill="#1f2937" />
      <path d="M8 40c1.2-7 6-10.5 12-10.5S30.8 33 32 40z" fill="#475569" />
      <path d="M17 28h6l-1 3h-4z" fill="#c68b59" />
    </svg>
  ),
  ayesha: (
    <svg viewBox="0 0 40 40" focusable="false">
      <circle cx="20" cy="20" r="20" fill="#e9eef5" />
      <path d="M12 19c0-8 3.5-11.5 8-11.5s8 3.5 8 11.5v4c0 3-1.5 5-3 5h-10c-1.5 0-3-2-3-5z" fill="#1f2937" />
      <ellipse cx="20" cy="19.5" rx="5.8" ry="6.8" fill="#8d5a3b" />
      <path d="M13.8 18.5c.4-4 3-6 6.2-6s5.8 2 6.2 6c-1.5-1-3.5-1.5-6.2-1.5s-4.7.5-6.2 1.5z" fill="#1f2937" />
      <path d="M8 40c1.2-7 6-10.5 12-10.5S30.8 33 32 40z" fill="#14b8a6" />
      <path d="M17 29h6l-1 3h-4z" fill="#8d5a3b" />
    </svg>
  ),
};

// Marketing card icons, matched by card position. Line-style Bootstrap icons.
const MARKETING_ICONS = [
  "bi-megaphone",
  "bi-percent",
  "bi-calendar-event",
  "bi-calendar-check",
  "bi-cart",
  "bi-house",
  "bi-box-seam",
  "bi-credit-card",
  "bi-chat-dots",
  "bi-people",
];

// Shared inbox and CRM section content (fixed reference copy and sample dashboard data).
const INBOX_FEATURES = [
  {
    tone: "mint",
    icon: "bi-people-fill",
    title: "One Number, Multiple Team Members",
    text: "Assign conversations to sales, support or other teams and work together from one inbox.",
  },
  {
    tone: "blue",
    icon: "bi-file-earmark-text-fill",
    title: "Customer History and Internal Notes",
    text: "View complete conversation history, add internal notes and track enquiry status.",
  },
  {
    tone: "lavender",
    icon: "bi-arrow-repeat",
    title: "CRM Integration",
    text: "Connect with your CRM to save leads, create follow-up tasks and manage your sales pipeline.",
  },
];

const INBOX_NAV = [
  { label: "Inbox", icon: "bi-chat-dots-fill", active: true },
  { label: "Assigned to me", icon: "bi-person-check" },
  { label: "Starred", icon: "bi-star" },
  { label: "All Conversations", icon: "bi-chat-square-text" },
  { label: "Sales", icon: "bi-briefcase" },
  { label: "Support", icon: "bi-headset" },
  { label: "Appointments", icon: "bi-calendar-check" },
  { label: "Leads", icon: "bi-person-plus" },
  { label: "Broadcasts", icon: "bi-broadcast" },
];

const INBOX_CHIPS = [
  { label: "All 12", active: true },
  { label: "Open 8" },
  { label: "Pending 2" },
  { label: "Closed 12" },
];

const INBOX_THREADS = [
  {
    name: "Ahmed Al Mansoori",
    initials: "AM",
    tone: "blue",
    time: "10:24 AM",
    preview: "Hi, I would like to book an appointment...",
    tag: { label: "Appointment", tone: "green" },
    active: true,
  },
  {
    name: "Sara Khan",
    initials: "SK",
    tone: "purple",
    time: "09:40 AM",
    preview: "Do you have this product in stock?",
    tag: { label: "Sales", tone: "green" },
  },
  {
    name: "Rashid Al Ali",
    initials: "RA",
    tone: "amber",
    time: "Yesterday",
    preview: "Can you share the pricing details?",
    tag: { label: "Support", tone: "blue" },
  },
  {
    name: "Fatima Noor",
    initials: "FN",
    tone: "rose",
    time: "Yesterday",
    preview: "Thank you for the information!",
    tag: { label: "Closed", tone: "grey" },
  },
  {
    name: "Omar Khalid",
    initials: "OK",
    tone: "teal",
    time: "12 Oct",
    preview: "I need assistance with my order.",
    tag: { label: "Support", tone: "blue" },
  },
];

// "Why Choose RedSpider?" section: fixed reference copy, in display order.
const WHY_FEATURES = [
  {
    tone: "blue",
    illustration: "settings",
    title: "Customised Integration",
    text: "Solutions tailored to your business requirements, industry and workflow.",
  },
  {
    tone: "green",
    illustration: "chatbot",
    title: "Simple and User-Friendly",
    text: "Easy to manage workflows for your team with a clean and intuitive platform.",
  },
  {
    tone: "orange",
    illustration: "support",
    title: "Local Support in Dubai",
    text: "Dedicated local support via phone and WhatsApp for quick assistance.",
  },
  {
    tone: "purple",
    illustration: "analytics",
    title: "Website, Chatbot and CRM Expertise",
    text: "Experienced team in website development, chatbots and CRM systems.",
  },
  {
    tone: "pink",
    illustration: "training",
    title: "Training and Technical Assistance",
    text: "Complete training and ongoing technical support for your team.",
  },
  {
    tone: "green",
    illustration: "growth",
    title: "Scalable Solutions for Growing Business",
    text: "Flexible solutions that grow with your business and can be expanded anytime.",
  },
];

// Inline SVG illustrations for the "Why Choose RedSpider?" feature circles.
const WHY_ILLUSTRATIONS = {
  settings: (
    <svg viewBox="0 0 120 120" focusable="false">
      <rect x="20" y="30" width="68" height="56" rx="5" fill="#fff" stroke="#4f6fd8" strokeWidth="3" />
      <path d="M20 42 H88" stroke="#4f6fd8" strokeWidth="3" />
      <circle cx="30" cy="36" r="1.8" fill="#4f6fd8" />
      <circle cx="36" cy="36" r="1.8" fill="#4f6fd8" />
      <circle cx="42" cy="36" r="1.8" fill="#4f6fd8" />
      <rect x="28" y="52" width="26" height="3" rx="1.5" fill="#aab8f0" />
      <rect x="28" y="60" width="36" height="3" rx="1.5" fill="#aab8f0" />
      <rect x="28" y="68" width="22" height="3" rx="1.5" fill="#aab8f0" />
      <circle cx="84" cy="84" r="9" fill="#3b82f6" />
      <circle cx="84" cy="84" r="3.5" fill="#fff" />
      <circle cx="84" cy="84" r="13" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="4 4" />
    </svg>
  ),
  chatbot: (
    <svg viewBox="0 0 120 120" focusable="false">
      <rect x="16" y="26" width="72" height="56" rx="5" fill="#fff" stroke="#22a05a" strokeWidth="3" />
      <rect x="22" y="48" width="34" height="20" rx="10" fill="#22c55e" />
      <circle cx="31" cy="58" r="2" fill="#fff" />
      <circle cx="39" cy="58" r="2" fill="#fff" />
      <circle cx="47" cy="58" r="2" fill="#fff" />
      <rect x="60" y="58" width="30" height="26" rx="6" fill="#fff" stroke="#22a05a" strokeWidth="3" />
      <path d="M75 58 V50" stroke="#22a05a" strokeWidth="2.5" />
      <circle cx="75" cy="47" r="3" fill="#22c55e" />
      <circle cx="68" cy="69" r="2.5" fill="#22a05a" />
      <circle cx="82" cy="69" r="2.5" fill="#22a05a" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 120 120" focusable="false">
      <path d="M72 16 H100 A10 10 0 0 1 110 26 V36 A10 10 0 0 1 100 46 H92 L86 53 V46 H72 A10 10 0 0 1 62 36 V26 A10 10 0 0 1 72 16 Z" fill="#fff" stroke="#f08a3c" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="74" cy="31" r="2" fill="#f08a3c" />
      <circle cx="86" cy="31" r="2" fill="#f08a3c" />
      <circle cx="98" cy="31" r="2" fill="#f08a3c" />
      <circle cx="52" cy="60" r="17" fill="#f6c9a7" />
      <path d="M35 56 Q35 38 52 38 Q69 38 69 56 Q62 46 52 46 Q42 46 35 56 Z" fill="#5a3a2a" />
      <path d="M35 58 Q35 40 52 40 Q69 40 69 58" fill="none" stroke="#333" strokeWidth="3" />
      <path d="M69 62 Q70 72 60 72" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="46" cy="60" r="1.8" fill="#333" />
      <circle cx="58" cy="60" r="1.8" fill="#333" />
      <path d="M28 110 Q30 82 52 80 Q74 82 76 110 Z" fill="#e8565f" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 120 120" focusable="false">
      <rect x="20" y="30" width="80" height="50" rx="4" fill="#fff" stroke="#7c5cf0" strokeWidth="3" />
      <path d="M12 88 H108" stroke="#7c5cf0" strokeWidth="4" strokeLinecap="round" />
      <rect x="32" y="60" width="8" height="16" fill="#8b5cf6" />
      <rect x="44" y="52" width="8" height="24" fill="#8b5cf6" />
      <rect x="56" y="46" width="8" height="30" fill="#8b5cf6" />
      <path d="M82 60 L82 48 A12 12 0 0 1 93.4 64 Z" fill="#8b5cf6" />
      <path d="M82 60 L93.4 64 A12 12 0 0 1 70.6 66 Z" fill="#fb923c" />
    </svg>
  ),
  training: (
    <svg viewBox="0 0 120 120" focusable="false">
      <rect x="50" y="22" width="56" height="40" rx="3" fill="#fff" stroke="#e4577f" strokeWidth="3" />
      <path d="M60 34 H96 M60 42 H92 M60 50 H84" stroke="#e4577f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="34" r="7" fill="#e4577f" />
      <path d="M24 46 Q30 42 36 46 L38 72 H22 Z" fill="#e4577f" />
      <path d="M36 52 L50 40" stroke="#e4577f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="94" r="6" fill="#f9a8c0" />
      <circle cx="60" cy="94" r="6" fill="#f9a8c0" />
      <circle cx="84" cy="94" r="6" fill="#f9a8c0" />
      <path d="M26 110 Q36 102 46 110 M50 110 Q60 102 70 110 M74 110 Q84 102 94 110" fill="none" stroke="#f9a8c0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 120 120" focusable="false">
      <rect x="22" y="78" width="14" height="22" rx="2" fill="#22c55e" />
      <rect x="44" y="66" width="14" height="34" rx="2" fill="#22c55e" />
      <rect x="66" y="52" width="14" height="48" rx="2" fill="#16a34a" />
      <path d="M18 62 L52 40 L66 48 L98 22" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M88 20 H100 V32 Z" fill="#22c55e" />
    </svg>
  ),
};

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

  // Marketing copy is fixed to the approved reference content. CMS fields
  // whatsapp_marketing_heading, whatsapp_marketing_description and
  // whatsapp_marketing_campaigns are intentionally not read here.
  const marketingCampaigns = MARKETING_SERVICES;

  const pricingComponents = arrayValue(source.whatsapp_pricing_components, [
    { title: "Initial API setup and configuration" },
    { title: "Meta messaging charges" },
    { title: "Monthly platform or inbox subscription" },
    { title: "Chatbot development" },
    { title: "CRM or third-party software integration" },
    { title: "Ongoing support and maintenance" },
  ]);

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

  const servicesHeading = String(
    value(
      source.whatsapp_services_heading,
      "Our WhatsApp Business API Integration Services",
    ),
  );
  const highlightAt = servicesHeading.indexOf("WhatsApp");
  const servicesHeadingContent =
    highlightAt === -1 ? (
      servicesHeading
    ) : (
      <>
        {servicesHeading.slice(0, highlightAt)}
        <span className="rs-wa-map__hl">WhatsApp</span>
        {servicesHeading.slice(highlightAt + "WhatsApp".length)}
      </>
    );
  const servicesSubtitle = value(
    source.whatsapp_services_description,
    "Our team provides complete setup and integration support, including:",
  );

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

        <section className="whatsapp-hero-solutions-section">
          <div className="whatsapp-hero-solutions-section__inner">
            <div className="whatsapp-hero-solutions-section__copy">
              <span className="whatsapp-hero-solutions-section__eyebrow">
                WhatsApp Business Solutions
              </span>
              <p className="whatsapp-hero-solutions-section__subheading">
                API, inbox and chatbot
              </p>
              <h2 className="whatsapp-hero-solutions-section__heading">
                Connect with customers, automate conversations and manage your
                WhatsApp communication from one powerful platform.
              </h2>
              <p className="whatsapp-hero-solutions-section__lead">
                RedSpider provides professional WhatsApp Business API
                Integration services for companies in Dubai and across the UAE.
                We help businesses connect WhatsApp with chatbots, CRM software,
                websites, customer support systems and marketing platforms.
              </p>
              <p className="whatsapp-hero-solutions-section__support">
                Whether you receive a few enquiries a day or thousands of
                conversations, we can help you respond faster and keep
                communication organised.
              </p>
              <a
                className="whatsapp-hero-solutions-section__cta"
                href="#whatsapp-api-services"
              >
                Explore WhatsApp services
                <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
              </a>
            </div>

            <div
              className="whatsapp-hero-solutions-section__art"
              aria-hidden="true"
              data-aos="fade-left"
            >
              <svg
                className="whatsapp-hero-solutions-section__paths"
                viewBox="0 0 840 840"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path className="whatsapp-hero-solutions-section__path--solid" d="M120 150 C 250 30, 430 0, 560 40" />
                <path d="M360 120 C 420 90, 520 80, 600 118" />
                <path d="M84 232 V 300" />
                <path d="M96 418 V 480" />
                <path d="M672 210 V 286" />
                <path d="M650 402 V 486" />
                <path d="M200 548 C 240 610, 300 640, 360 646" />
                <path d="M682 560 C 700 610, 748 650, 800 640" />
              </svg>

              <span className="whatsapp-hero-solutions-section__spark whatsapp-hero-solutions-section__spark--a"></span>
              <span className="whatsapp-hero-solutions-section__spark whatsapp-hero-solutions-section__spark--b"></span>
              <span className="whatsapp-hero-solutions-section__plane">
                <i className="bi bi-send-fill"></i>
              </span>

              <div className="whatsapp-hero-solutions-section__phone">
                <div className="whatsapp-hero-solutions-section__screen">
                  <div className="whatsapp-hero-solutions-section__statusbar">
                    <span>9:41</span>
                    <span className="whatsapp-hero-solutions-section__island"></span>
                    <span className="whatsapp-hero-solutions-section__signal">
                      <i></i><i></i><i></i>
                    </span>
                  </div>
                  <div className="whatsapp-hero-solutions-section__chat-head">
                    <span className="whatsapp-hero-solutions-section__chat-logo">
                      <svg viewBox="0 0 64 64" focusable="false">
                        <path d="M32 9.5c-12.4 0-22.5 10-22.5 22.4 0 4 1.1 7.8 3 11.1L9 55l12.3-3.2c3.2 1.7 6.8 2.7 10.7 2.7 12.4 0 22.5-10 22.5-22.4S44.4 9.5 32 9.5z" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
                        <path d="M24.4 22.2c-.6.2-1.4.8-1.8 1.4-.6.9-1 2.1-.6 3.4.9 3.1 3.9 7.7 8.3 10.4 1.7 1.1 3.4 1.6 4.6 1.6 1 0 1.9-.5 2.5-1.2l1.1-1.4c.3-.4.2-1-.2-1.3l-3.1-2.2c-.4-.3-.9-.2-1.2.1l-1.3 1.3c-.2.2-.5.2-.7.1-1.7-.8-3.5-2.6-4.3-4.3-.1-.2-.1-.5.1-.7l1.2-1.3c.3-.3.4-.8.1-1.2l-2.2-3.2c-.3-.4-.9-.6-1.2-.4z" fill="#fff" />
                      </svg>
                    </span>
                    <span className="whatsapp-hero-solutions-section__chat-name">
                      <strong>Your Business</strong>
                      <small>Online</small>
                    </span>
                    <span className="whatsapp-hero-solutions-section__chat-tools">
                      <i className="bi bi-camera-video"></i>
                      <i className="bi bi-telephone"></i>
                      <i className="bi bi-three-dots-vertical"></i>
                    </span>
                  </div>
                  <div className="whatsapp-hero-solutions-section__thread">
                    <div className="whatsapp-hero-solutions-section__bubble whatsapp-hero-solutions-section__bubble--in">
                      Hi! I need more information about your services.
                      <time>10:24 AM</time>
                    </div>
                    <div className="whatsapp-hero-solutions-section__bubble whatsapp-hero-solutions-section__bubble--out">
                      Hello! Thank you for your message. How can we help you?
                      <time>10:25 AM</time>
                    </div>
                    <ul className="whatsapp-hero-solutions-section__replies">
                      <li><i className="bi bi-tag"></i>Get a Quote</li>
                      <li><i className="bi bi-calendar-check"></i>Book a Consultation</li>
                      <li><i className="bi bi-info-circle"></i>Product Information</li>
                      <li><i className="bi bi-headset"></i>Talk to Support</li>
                    </ul>
                  </div>
                  <div className="whatsapp-hero-solutions-section__composer">
                    <i className="bi bi-emoji-smile"></i>
                    <span>Type a message...</span>
                    <i className="bi bi-paperclip"></i>
                    <span className="whatsapp-hero-solutions-section__mic">
                      <i className="bi bi-mic-fill"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="whatsapp-hero-solutions-section__float whatsapp-hero-solutions-section__float--chatbot">
                <span className="whatsapp-hero-solutions-section__float-icon">
                  <i className="bi bi-robot"></i>
                </span>
                <span className="whatsapp-hero-solutions-section__float-body">
                  <strong>Chatbot</strong>
                  <span className="whatsapp-hero-solutions-section__float-bar"></span>
                  <span className="whatsapp-hero-solutions-section__float-bar whatsapp-hero-solutions-section__float-bar--short"></span>
                </span>
              </div>

              <div className="whatsapp-hero-solutions-section__float whatsapp-hero-solutions-section__float--crm">
                <span className="whatsapp-hero-solutions-section__float-icon">
                  <i className="bi bi-person"></i>
                </span>
                <span className="whatsapp-hero-solutions-section__float-body">
                  <strong>CRM</strong>
                  <span className="whatsapp-hero-solutions-section__float-bar"></span>
                  <span className="whatsapp-hero-solutions-section__float-bar whatsapp-hero-solutions-section__float-bar--short"></span>
                </span>
              </div>

              <div className="whatsapp-hero-solutions-section__float whatsapp-hero-solutions-section__float--website">
                <span className="whatsapp-hero-solutions-section__float-icon">
                  <i className="bi bi-globe"></i>
                </span>
                <span className="whatsapp-hero-solutions-section__float-body">
                  <strong>Website</strong>
                  <span className="whatsapp-hero-solutions-section__float-bar"></span>
                  <span className="whatsapp-hero-solutions-section__float-bar whatsapp-hero-solutions-section__float-bar--short"></span>
                </span>
              </div>

              <div className="whatsapp-hero-solutions-section__float whatsapp-hero-solutions-section__float--support">
                <span className="whatsapp-hero-solutions-section__float-icon">
                  <i className="bi bi-headset"></i>
                </span>
                <span className="whatsapp-hero-solutions-section__float-body">
                  <strong>Customer Support</strong>
                  <span className="whatsapp-hero-solutions-section__float-bar"></span>
                  <span className="whatsapp-hero-solutions-section__float-bar whatsapp-hero-solutions-section__float-bar--short"></span>
                </span>
              </div>

              <div className="whatsapp-hero-solutions-section__float whatsapp-hero-solutions-section__float--marketing">
                <span className="whatsapp-hero-solutions-section__float-icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </span>
                <span className="whatsapp-hero-solutions-section__float-body">
                  <strong>Marketing Platforms</strong>
                </span>
              </div>

              <div className="whatsapp-hero-solutions-section__wa-tile">
                <svg viewBox="0 0 64 64" focusable="false">
                  <path d="M32 9.5c-12.4 0-22.5 10-22.5 22.4 0 4 1.1 7.8 3 11.1L9 55l12.3-3.2c3.2 1.7 6.8 2.7 10.7 2.7 12.4 0 22.5-10 22.5-22.4S44.4 9.5 32 9.5z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M24.4 22.2c-.6.2-1.4.8-1.8 1.4-.6.9-1 2.1-.6 3.4.9 3.1 3.9 7.7 8.3 10.4 1.7 1.1 3.4 1.6 4.6 1.6 1 0 1.9-.5 2.5-1.2l1.1-1.4c.3-.4.2-1-.2-1.3l-3.1-2.2c-.4-.3-.9-.2-1.2.1l-1.3 1.3c-.2.2-.5.2-.7.1-1.7-.8-3.5-2.6-4.3-4.3-.1-.2-.1-.5.1-.7l1.2-1.3c.3-.3.4-.8.1-1.2l-2.2-3.2c-.3-.4-.9-.6-1.2-.4z" fill="#fff" />
                </svg>
              </div>

              <div className="whatsapp-hero-solutions-section__panel whatsapp-hero-solutions-section__panel--convos">
                <span className="whatsapp-hero-solutions-section__panel-title">Conversations</span>
                <ul>
                  <li>
                    <span className="whatsapp-hero-solutions-section__mini-avatar">{HERO_AVATARS.sarah}</span>
                    <span className="whatsapp-hero-solutions-section__convo-text">
                      <strong>Sarah Ahmed</strong>
                      <small>Hi! I need more information...</small>
                    </span>
                    <time>10:24 AM</time>
                    <span className="whatsapp-hero-solutions-section__badge">1</span>
                  </li>
                  <li>
                    <span className="whatsapp-hero-solutions-section__mini-avatar">{HERO_AVATARS.john}</span>
                    <span className="whatsapp-hero-solutions-section__convo-text">
                      <strong>John Smith</strong>
                      <small>Can you share the pricing?</small>
                    </span>
                    <time>09:18 AM</time>
                    <span className="whatsapp-hero-solutions-section__badge">2</span>
                  </li>
                  <li>
                    <span className="whatsapp-hero-solutions-section__mini-avatar">{HERO_AVATARS.ayesha}</span>
                    <span className="whatsapp-hero-solutions-section__convo-text">
                      <strong>Ayesha Khan</strong>
                      <small>Thank you! That&apos;s helpful.</small>
                    </span>
                    <time>Yesterday</time>
                  </li>
                </ul>
              </div>

              <div className="whatsapp-hero-solutions-section__panel whatsapp-hero-solutions-section__panel--analytics">
                <span className="whatsapp-hero-solutions-section__analytics-logo">
                  <svg viewBox="0 0 64 64" focusable="false">
                    <path d="M32 9.5c-12.4 0-22.5 10-22.5 22.4 0 4 1.1 7.8 3 11.1L9 55l12.3-3.2c3.2 1.7 6.8 2.7 10.7 2.7 12.4 0 22.5-10 22.5-22.4S44.4 9.5 32 9.5z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M24.4 22.2c-.6.2-1.4.8-1.8 1.4-.6.9-1 2.1-.6 3.4.9 3.1 3.9 7.7 8.3 10.4 1.7 1.1 3.4 1.6 4.6 1.6 1 0 1.9-.5 2.5-1.2l1.1-1.4c.3-.4.2-1-.2-1.3l-3.1-2.2c-.4-.3-.9-.2-1.2.1l-1.3 1.3c-.2.2-.5.2-.7.1-1.7-.8-3.5-2.6-4.3-4.3-.1-.2-.1-.5.1-.7l1.2-1.3c.3-.3.4-.8.1-1.2l-2.2-3.2c-.3-.4-.9-.6-1.2-.4z" fill="#fff" />
                  </svg>
                </span>
                <span className="whatsapp-hero-solutions-section__bars-chart">
                  <i></i><i></i><i></i><i></i><i></i><i></i>
                </span>
                <span className="whatsapp-hero-solutions-section__lines">
                  <span></span><span></span><span></span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="whatsapp-api-services" className="rs-wa-map-sec">
          <div className="rs-wa-map-head" data-aos="fade-up">
            <span className="rs-wa-map-eyebrow">What we set up</span>
            <h2>{servicesHeadingContent}</h2>
            <p>{servicesSubtitle}</p>
          </div>
          <div className="rs-wa-map">
            <div className="rs-wa-hub" aria-hidden="true">
              <span className="rs-wa-hub__ring rs-wa-hub__ring--outer"></span>
              <span className="rs-wa-hub__ring rs-wa-hub__ring--dashed"></span>
              <span className="rs-wa-hub__ring rs-wa-hub__ring--inner"></span>
              <span className="rs-wa-hub__glow"></span>
              <svg
                className="rs-wa-hub__lines"
                viewBox="0 0 100 506"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path d="M0 75C12 75 14 150 27 212" />
                <path d="M0 253H27" />
                <path d="M0 431C12 431 14 356 27 294" />
                <path d="M100 75C88 75 86 150 73 212" />
                <path d="M100 253H73" />
                <path d="M100 431C88 431 86 356 73 294" />
              </svg>
              <span className="rs-wa-hub__core">
                <svg viewBox="0 0 64 64" focusable="false">
                  <path
                    d="M32 9.5c-12.4 0-22.5 10-22.5 22.4 0 4 1.1 7.8 3 11.1L9 55l12.3-3.2c3.2 1.7 6.8 2.7 10.7 2.7 12.4 0 22.5-10 22.5-22.4S44.4 9.5 32 9.5z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.4 22.2c-.6.2-1.4.8-1.8 1.4-.6.9-1 2.1-.6 3.4.9 3.1 3.9 7.7 8.3 10.4 1.7 1.1 3.4 1.6 4.6 1.6 1 0 1.9-.5 2.5-1.2l1.1-1.4c.3-.4.2-1-.2-1.3l-3.1-2.2c-.4-.3-.9-.2-1.2.1l-1.3 1.3c-.2.2-.5.2-.7.1-1.7-.8-3.5-2.6-4.3-4.3-.1-.2-.1-.5.1-.7l1.2-1.3c.3-.3.4-.8.1-1.2l-2.2-3.2c-.3-.4-.9-.6-1.2-.4z"
                    fill="#fff"
                  />
                </svg>
              </span>
            </div>
            {whatsappServices.map((item, index) => {
              const slot = HUB_SLOTS[index];
              const side = slot && slot.col > 2 ? "right" : "left";

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={`rs-wa-slot rs-wa-slot--${side}`}
                  style={{
                    order: index + 1,
                    "--wa-col": slot?.col,
                    "--wa-row": slot?.row,
                  }}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <article className="rs-wa-card">
                    <span className="rs-wa-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${SERVICE_ICONS[index % SERVICE_ICONS.length]}`}
                      ></i>
                    </span>
                    <div className="rs-wa-card__text">
                      <span className="rs-wa-card__num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section className="whatsapp-chatbot-section">
          <div className="whatsapp-chatbot-section__inner">
            <div className="whatsapp-chatbot-section__top">
              <div className="whatsapp-chatbot-section__intro">
                <span className="whatsapp-chatbot-section__eyebrow">Chatbot</span>
                <h2 className="whatsapp-chatbot-section__heading">
                  WhatsApp Business API Integration with Chatbot
                </h2>
                <p className="whatsapp-chatbot-section__description">
                  Our WhatsApp Business API Integration with Chatbot service
                  helps companies answer common questions instantly and remain
                  available outside normal working hours. The chatbot can
                  welcome customers, understand their requirements and guide
                  them towards the right service.
                </p>
              </div>

              <div className="whatsapp-chatbot-section__hero" aria-hidden="true">
                <svg
                  className="whatsapp-chatbot-section__arcs"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  focusable="false"
                >
                  <path d="M31 22 Q33 6 37 9" />
                  <path d="M87 16 Q98 30 91 46" />
                  <path d="M26 86 Q34 104 44 84" />
                  <path d="M80 84 Q92 84 92 72" />
                </svg>
                <span className="whatsapp-chatbot-section__spark whatsapp-chatbot-section__spark--a"></span>
                <span className="whatsapp-chatbot-section__spark whatsapp-chatbot-section__spark--b"></span>

                <span className="whatsapp-chatbot-section__wa">
                  <svg viewBox="0 0 64 64" focusable="false">
                    <path
                      d="M32 9.5c-12.4 0-22.5 10-22.5 22.4 0 4 1.1 7.8 3 11.1L9 55l12.3-3.2c3.2 1.7 6.8 2.7 10.7 2.7 12.4 0 22.5-10 22.5-22.4S44.4 9.5 32 9.5z"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24.4 22.2c-.6.2-1.4.8-1.8 1.4-.6.9-1 2.1-.6 3.4.9 3.1 3.9 7.7 8.3 10.4 1.7 1.1 3.4 1.6 4.6 1.6 1 0 1.9-.5 2.5-1.2l1.1-1.4c.3-.4.2-1-.2-1.3l-3.1-2.2c-.4-.3-.9-.2-1.2.1l-1.3 1.3c-.2.2-.5.2-.7.1-1.7-.8-3.5-2.6-4.3-4.3-.1-.2-.1-.5.1-.7l1.2-1.3c.3-.3.4-.8.1-1.2l-2.2-3.2c-.3-.4-.9-.6-1.2-.4z"
                      fill="#fff"
                    />
                  </svg>
                </span>

                <span className="whatsapp-chatbot-section__card whatsapp-chatbot-section__card--bot">
                  <span className="whatsapp-chatbot-section__card-icon">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <rect x="5" y="8" width="14" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 8V4.5M9.5 13h.01M14.5 13h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="whatsapp-chatbot-section__bars">
                    <span className="whatsapp-chatbot-section__bar whatsapp-chatbot-section__bar--red"></span>
                    <span className="whatsapp-chatbot-section__bar whatsapp-chatbot-section__bar--grey"></span>
                  </span>
                  <span className="whatsapp-chatbot-section__dots">
                    <i></i><i></i><i></i>
                  </span>
                </span>

                <span className="whatsapp-chatbot-section__card whatsapp-chatbot-section__card--user">
                  <span className="whatsapp-chatbot-section__card-icon">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <circle cx="12" cy="9" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M5.5 20c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="whatsapp-chatbot-section__bars whatsapp-chatbot-section__bars--stack">
                    <span className="whatsapp-chatbot-section__bar whatsapp-chatbot-section__bar--grey"></span>
                    <span className="whatsapp-chatbot-section__bar whatsapp-chatbot-section__bar--grey whatsapp-chatbot-section__bar--short"></span>
                  </span>
                </span>

                <span className="whatsapp-chatbot-section__check">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M6.5 12.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            <ol className="whatsapp-chatbot-section__list">
              {CHATBOT_FEATURES.map((feature, index) => (
                <li
                  key={feature.title}
                  className="whatsapp-chatbot-section__item"
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 100}
                >
                  <div className="whatsapp-chatbot-section__row">
                    <span className="whatsapp-chatbot-section__icon" aria-hidden="true">
                      <i className={`bi ${feature.icon}`}></i>
                    </span>
                    <span className="whatsapp-chatbot-section__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="whatsapp-chatbot-section__divider" aria-hidden="true"></span>
                    <span className="whatsapp-chatbot-section__text">{feature.title}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="whatsapp-marketing-services-section">
          <span
            className="whatsapp-marketing-services-section__glow"
            aria-hidden="true"
          ></span>
          <span
            className="whatsapp-marketing-services-section__circle"
            aria-hidden="true"
          ></span>
          <span
            className="whatsapp-marketing-services-section__strokes"
            aria-hidden="true"
          ></span>
          <svg
            className="whatsapp-marketing-services-section__mark"
            viewBox="0 0 64 64"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M32 9.5c-12.4 0-22.5 10-22.5 22.4 0 4 1.1 7.8 3 11.1L9 55l12.3-3.2c3.2 1.7 6.8 2.7 10.7 2.7 12.4 0 22.5-10 22.5-22.4S44.4 9.5 32 9.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M24.4 22.2c-.6.2-1.4.8-1.8 1.4-.6.9-1 2.1-.6 3.4.9 3.1 3.9 7.7 8.3 10.4 1.7 1.1 3.4 1.6 4.6 1.6 1 0 1.9-.5 2.5-1.2l1.1-1.4c.3-.4.2-1-.2-1.3l-3.1-2.2c-.4-.3-.9-.2-1.2.1l-1.3 1.3c-.2.2-.5.2-.7.1-1.7-.8-3.5-2.6-4.3-4.3-.1-.2-.1-.5.1-.7l1.2-1.3c.3-.3.4-.8.1-1.2l-2.2-3.2c-.3-.4-.9-.6-1.2-.4z"
              fill="currentColor"
            />
          </svg>

          <div className="whatsapp-marketing-services-section__inner">
            <div className="whatsapp-marketing-services-section__head">
              <span className="whatsapp-marketing-services-section__eyebrow">
                Marketing
              </span>
              <h2 className="whatsapp-marketing-services-section__heading">
                WhatsApp Marketing Services in Dubai
              </h2>
              <p className="whatsapp-marketing-services-section__description">
                Run approved WhatsApp campaigns to promote offers, send
                reminders, and reconnect with customers.
              </p>
            </div>

            <div className="whatsapp-marketing-services-section__grid">
              {marketingCampaigns.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="whatsapp-marketing-services-section__item"
                  data-aos="fade-up"
                  data-aos-delay={(index % 5) * 80}
                >
                  <article className="whatsapp-marketing-services-section__card">
                    <span
                      className="whatsapp-marketing-services-section__icon"
                      aria-hidden="true"
                    >
                      <i
                        className={`bi ${MARKETING_ICONS[index % MARKETING_ICONS.length]}`}
                      ></i>
                    </span>
                    <h3 className="whatsapp-marketing-services-section__label">
                      {item.title}
                    </h3>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="whatsapp-shared-inbox-crm-section">
          <span
            className="whatsapp-shared-inbox-crm-section__blob whatsapp-shared-inbox-crm-section__blob--top"
            aria-hidden="true"
          ></span>
          <span
            className="whatsapp-shared-inbox-crm-section__blob whatsapp-shared-inbox-crm-section__blob--bottom"
            aria-hidden="true"
          ></span>

          <div className="whatsapp-shared-inbox-crm-section__inner">
            <div className="whatsapp-shared-inbox-crm-section__content">
              <span className="whatsapp-shared-inbox-crm-section__eyebrow">
                Inbox &amp; CRM
              </span>
              <h2 className="whatsapp-shared-inbox-crm-section__heading">
                <span className="whatsapp-shared-inbox-crm-section__heading-line">
                  Shared WhatsApp Inbox
                </span>{" "}
                <span className="whatsapp-shared-inbox-crm-section__heading-line">
                  and{" "}
                  <span className="whatsapp-shared-inbox-crm-section__highlight">
                    CRM Connection
                  </span>
                </span>
              </h2>
              <p className="whatsapp-shared-inbox-crm-section__description">
                A shared inbox allows your team to manage all customer
                conversations using one WhatsApp number. Assign chats to
                different departments, add internal notes, track enquiry status
                and connect with your CRM.
              </p>

              <div className="whatsapp-shared-inbox-crm-section__features">
                {INBOX_FEATURES.map((feature, index) => (
                  <article
                    key={feature.title}
                    className={`whatsapp-shared-inbox-crm-section__feature whatsapp-shared-inbox-crm-section__feature--${feature.tone}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <span
                      className="whatsapp-shared-inbox-crm-section__feature-icon"
                      aria-hidden="true"
                    >
                      <i className={`bi ${feature.icon}`}></i>
                    </span>
                    <h3 className="whatsapp-shared-inbox-crm-section__feature-title">
                      {feature.title}
                    </h3>
                    <p className="whatsapp-shared-inbox-crm-section__feature-text">
                      {feature.text}
                    </p>
                    <span
                      className="whatsapp-shared-inbox-crm-section__feature-accent"
                      aria-hidden="true"
                    ></span>
                  </article>
                ))}
              </div>
            </div>

            <div className="whatsapp-shared-inbox-crm-section__visual">
              <div className="whatsapp-shared-inbox-crm-section__callout whatsapp-shared-inbox-crm-section__callout--top">
                <span
                  className="whatsapp-shared-inbox-crm-section__callout-icon whatsapp-shared-inbox-crm-section__callout-icon--wa"
                  aria-hidden="true"
                >
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className="whatsapp-shared-inbox-crm-section__callout-text">
                  One WhatsApp Number
                  <br />
                  for Your Entire Team
                </span>
              </div>

              <svg
                className="whatsapp-shared-inbox-crm-section__arrows"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M30 14 C 36 10, 42 10, 48 10" />
                <path d="M14 40 C 14 60, 22 70, 36 80" />
                <path d="M64 92 C 74 92, 82 88, 90 82" />
              </svg>

              <div
                className="whatsapp-shared-inbox-crm-section__dashboard"
                aria-hidden="true"
                data-aos="fade-up"
              >
                <aside className="whatsapp-shared-inbox-crm-section__sidebar">
                  <div className="whatsapp-shared-inbox-crm-section__brand">
                    <span className="whatsapp-shared-inbox-crm-section__brand-mark">
                      <i className="bi bi-chat-dots-fill"></i>
                    </span>
                    <span className="whatsapp-shared-inbox-crm-section__brand-name">
                      WapiNEXA
                    </span>
                  </div>
                  <ul className="whatsapp-shared-inbox-crm-section__nav">
                    {INBOX_NAV.map((item) => (
                      <li
                        key={item.label}
                        className={`whatsapp-shared-inbox-crm-section__nav-item${item.active ? " is-active" : ""}`}
                      >
                        <i className={`bi ${item.icon}`}></i>
                        <span className="whatsapp-shared-inbox-crm-section__nav-label">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="whatsapp-shared-inbox-crm-section__list">
                  <div className="whatsapp-shared-inbox-crm-section__list-head">
                    <span className="whatsapp-shared-inbox-crm-section__list-title">
                      Conversations
                    </span>
                    <span className="whatsapp-shared-inbox-crm-section__select">
                      All <i className="bi bi-chevron-down"></i>
                    </span>
                  </div>
                  <div className="whatsapp-shared-inbox-crm-section__search">
                    <i className="bi bi-search"></i>
                    <span>Search conversations...</span>
                  </div>
                  <div className="whatsapp-shared-inbox-crm-section__chips">
                    {INBOX_CHIPS.map((chip) => (
                      <span
                        key={chip.label}
                        className={`whatsapp-shared-inbox-crm-section__chip${chip.active ? " is-active" : ""}`}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <ul className="whatsapp-shared-inbox-crm-section__threads">
                    {INBOX_THREADS.map((thread) => (
                      <li
                        key={thread.name}
                        className={`whatsapp-shared-inbox-crm-section__thread${thread.active ? " is-active" : ""}`}
                      >
                        <span
                          className={`whatsapp-shared-inbox-crm-section__avatar whatsapp-shared-inbox-crm-section__avatar--${thread.tone}`}
                        >
                          {thread.initials}
                        </span>
                        <div className="whatsapp-shared-inbox-crm-section__thread-body">
                          <div className="whatsapp-shared-inbox-crm-section__thread-row">
                            <strong>{thread.name}</strong>
                            <time>{thread.time}</time>
                          </div>
                          <p>{thread.preview}</p>
                        </div>
                        <span
                          className={`whatsapp-shared-inbox-crm-section__tag whatsapp-shared-inbox-crm-section__tag--${thread.tag.tone}`}
                        >
                          {thread.tag.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="whatsapp-shared-inbox-crm-section__chat">
                  <div className="whatsapp-shared-inbox-crm-section__chat-head">
                    <span className="whatsapp-shared-inbox-crm-section__avatar whatsapp-shared-inbox-crm-section__avatar--blue">
                      AM
                    </span>
                    <div>
                      <strong>Ahmed Al Mansoori</strong>
                      <span className="whatsapp-shared-inbox-crm-section__status">
                        Online
                      </span>
                    </div>
                    <i className="bi bi-three-dots-vertical"></i>
                  </div>
                  <div className="whatsapp-shared-inbox-crm-section__messages">
                    <div className="whatsapp-shared-inbox-crm-section__msg whatsapp-shared-inbox-crm-section__msg--in">
                      Hi, I would like to book an appointment with Dr. Sara.
                      <time>10:24 AM</time>
                    </div>
                    <div className="whatsapp-shared-inbox-crm-section__msg whatsapp-shared-inbox-crm-section__msg--out">
                      Sure! I will be happy to help. Which date and time would
                      you prefer?
                      <time>
                        10:25 AM <i className="bi bi-check2-all"></i>
                      </time>
                    </div>
                    <div className="whatsapp-shared-inbox-crm-section__note">
                      <span className="whatsapp-shared-inbox-crm-section__note-label">
                        <i className="bi bi-file-earmark-text"></i>
                        Internal Note
                      </span>
                      <p>Interested in dental cleaning. Follow up tomorrow.</p>
                    </div>
                  </div>
                  <div className="whatsapp-shared-inbox-crm-section__composer">
                    <span>Type a message...</span>
                    <i className="bi bi-emoji-smile"></i>
                    <i className="bi bi-paperclip"></i>
                    <span className="whatsapp-shared-inbox-crm-section__send">
                      <i className="bi bi-send-fill"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="whatsapp-shared-inbox-crm-section__team"
                aria-hidden="true"
              >
                <span className="whatsapp-shared-inbox-crm-section__team-avatar whatsapp-shared-inbox-crm-section__avatar--blue">
                  <i className="bi bi-person-fill"></i>
                  <span className="whatsapp-shared-inbox-crm-section__online"></span>
                </span>
                <span className="whatsapp-shared-inbox-crm-section__team-avatar whatsapp-shared-inbox-crm-section__avatar--green">
                  <i className="bi bi-person-fill"></i>
                  <span className="whatsapp-shared-inbox-crm-section__online"></span>
                </span>
                <span className="whatsapp-shared-inbox-crm-section__team-avatar whatsapp-shared-inbox-crm-section__avatar--purple">
                  <i className="bi bi-person-fill"></i>
                  <span className="whatsapp-shared-inbox-crm-section__online"></span>
                </span>
              </div>

              <div className="whatsapp-shared-inbox-crm-section__callout whatsapp-shared-inbox-crm-section__callout--bottom">
                <span
                  className="whatsapp-shared-inbox-crm-section__callout-icon whatsapp-shared-inbox-crm-section__callout-icon--check"
                  aria-hidden="true"
                >
                  <i className="bi bi-check-lg"></i>
                </span>
                <span className="whatsapp-shared-inbox-crm-section__callout-text">
                  Assign chats, add notes
                  <br />
                  and track status
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="whatsapp-pricing-section">
          <div className="whatsapp-pricing-section__inner">
            <div className="whatsapp-pricing-section__head">
              <span className="whatsapp-pricing-section__eyebrow">Pricing</span>
              <h2 className="whatsapp-pricing-section__heading">
                {value(
                  source.whatsapp_pricing_heading,
                  "WhatsApp Business API Pricing",
                )}
              </h2>
              <p className="whatsapp-pricing-section__description">
                {value(
                  source.whatsapp_pricing_description,
                  "Pricing depends on Meta messaging charges, the inbox platform, chatbot features and how many users manage conversations.",
                )}
              </p>
            </div>
            <ul className="whatsapp-pricing-section__grid">
              {pricingComponents.map((item, index) => (
                <li
                  key={`${item.title}-${index}`}
                  className="whatsapp-pricing-section__item"
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 100}
                >
                  <article className="whatsapp-pricing-section__card">
                    <span className="whatsapp-pricing-section__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="whatsapp-pricing-section__title">
                      {item.title}
                    </h3>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="whatsapp-why-choose-redspider-section">
          <div className="whatsapp-why-choose-redspider-section__inner">
            <header className="whatsapp-why-choose-redspider-section__head">
              <h2 className="whatsapp-why-choose-redspider-section__heading">
                Why Choose{" "}
                <span className="whatsapp-why-choose-redspider-section__highlight">
                  RedSpider?
                </span>
              </h2>
              <p className="whatsapp-why-choose-redspider-section__description">
                <span className="whatsapp-why-choose-redspider-section__line">
                  RedSpider Web &amp; Art Design has been providing digital
                  solutions to businesses in Dubai since 2010. We do more than
                  connect an API.
                </span>{" "}
                <span className="whatsapp-why-choose-redspider-section__line">
                  We help you plan a complete WhatsApp communication process
                  that supports your sales and customer service teams.
                </span>
              </p>
            </header>

            <ul className="whatsapp-why-choose-redspider-section__grid">
              {WHY_FEATURES.map((feature, index) => (
                <li
                  key={feature.title}
                  className={`whatsapp-why-choose-redspider-section__item whatsapp-why-choose-redspider-section__item--${feature.tone}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="whatsapp-why-choose-redspider-section__card">
                    <span
                      className="whatsapp-why-choose-redspider-section__visual"
                      aria-hidden="true"
                    >
                      {WHY_ILLUSTRATIONS[feature.illustration]}
                    </span>
                    <h3 className="whatsapp-why-choose-redspider-section__title">
                      {feature.title}
                    </h3>
                    <p className="whatsapp-why-choose-redspider-section__text">
                      {feature.text}
                    </p>
                    <span
                      className="whatsapp-why-choose-redspider-section__accent"
                      aria-hidden="true"
                    ></span>
                  </div>
                </li>
              ))}
            </ul>
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
