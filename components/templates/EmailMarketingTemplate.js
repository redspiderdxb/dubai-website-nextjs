import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";
import GoogleReviews from "../ui/GoogleReviews";

const CAMPAIGN_ICONS = [
  "bi-megaphone",
  "bi-newspaper",
  "bi-arrow-repeat",
  "bi-heart",
  "bi-funnel",
  "bi-envelope-open",
];

const BENEFIT_ICONS = [
  "bi-people",
  "bi-chat-heart",
  "bi-graph-up-arrow",
  "bi-award",
  "bi-lightning-charge",
  "bi-bar-chart",
  "bi-inbox",
];

const PLATFORM_ICONS = {
  Mailchimp: "/assets/img/icons/em-mailchimp.svg",
  HubSpot: "/assets/img/icons/em-hub.svg",
  Klaviyo: "/assets/img/icons/em-kla.svg",
  SendGrid: "/assets/img/icons/em-sendgrid.svg",
  "Zoho Campaigns": "/assets/img/icons/em-zoho.svg",
  "Active Campaign": "/assets/img/icons/blue-chevron-icon.svg",
  "Brevo (formerly Sendinblue)": "/assets/img/icons/brevo-icon.svg",
  "Customized email": "/assets/img/icons/em-gmail.svg",
};

export default function EmailMarketingTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Email Marketing · Dubai",
    intro_description = "At RedSpider, we are proud to offer the best email marketing services in Dubai, that do more than just filling the inboxes. Whether you are launching a new product or promoting a seasonal offer, well designed email marketing can help you keep connected with your existing customers.",
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    features = [],
    benefits = [],
    processes = [],
    technologies = [],
    faqs = [],
    industries = [],
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
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const imageBase =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";
  const contactHref = cta_button_link || "/contact-us/";

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

  const platformData =
    technologies.length > 0
      ? technologies
      : [
          { name: "Mailchimp" },
          { name: "HubSpot" },
          { name: "Klaviyo" },
          { name: "SendGrid" },
          { name: "Zoho Campaigns" },
          { name: "Active Campaign" },
          { name: "Brevo (formerly Sendinblue)" },
          { name: "Customized email" },
        ];

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
          { name: "Professional consulting firms", icon: "bi-chat-square-text" },
          { name: "Manufacturing companies", icon: "bi-gear-wide-connected" },
        ];

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

  const whyChooseItems = [
    {
      title: "Customized strategies",
      description:
        "Campaign plans built around your audience, industry and business goals.",
      icon: "bi-sliders",
    },
    {
      title: "Audience segmentation",
      description:
        "Target the right customers with relevant messages instead of one generic email.",
      icon: "bi-diagram-3",
    },
    {
      title: "Personalized content",
      description:
        "Subject lines, copy and offers tailored to each audience segment.",
      icon: "bi-person-heart",
    },
    {
      title: "Automation expertise",
      description:
        "Welcome, nurture, cart and retention sequences that work while you sleep.",
      icon: "bi-robot",
    },
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
                    Email Marketing
                    {hero_subtitle ? (
                      <span className="rs-process-highlight">
                        Services in Dubai
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
                      RedSpider provides professional email marketing in Dubai
                      to help businesses communicate with customers, promote
                      products and generate leads. We plan and manage targeted
                      email campaigns, newsletters, automated sequences and
                      customer retention campaigns based on your audience and
                      business goals.
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
                <p className="rs-creative-intro__note">Campaigns since 2010</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  We plan, design and send campaigns that keep customers
                  informed, drive repeat business and turn subscribers into
                  qualified leads — without filling inboxes for the sake of it.
                </p>
                <a className="rs-creative-link" href="#email-marketing-services">
                  Explore our campaigns
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
          id="email-marketing-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Campaign types</span>
              <h2>{features_title}</h2>
              <p>{features_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {campaignTypes.map((campaign, index) => (
                <article
                  key={`${campaign.id || "campaign"}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${CAMPAIGN_ICONS[index % CAMPAIGN_ICONS.length]}`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>
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
            <div className="rs-creative-platform-grid">
              {platformData.map((platform, index) => {
                const name = platform.name || platform.title;
                const iconSrc = PLATFORM_ICONS[name];

                return (
                  <article
                    key={`${platform.id || name}-${index}`}
                    className="rs-creative-platform"
                  >
                    <span className="rs-creative-platform__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {iconSrc ? (
                      <img src={iconSrc} alt="" />
                    ) : (
                      <i className="bi bi-envelope" aria-hidden="true"></i>
                    )}
                    <h3>{name}</h3>
                  </article>
                );
              })}
            </div>
            <p className="rs-creative-platforms__note">
              You can also connect email marketing to your CRM, ecommerce store,
              or business management system for smooth communication with your
              customers.
            </p>
          </div>
        </section>
      ),
      show: show_technologies,
    },

    industries: {
      component: (
        <section key="industries" className="rs-creative-industries">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Industries</span>
              <h2>Industries We Serve</h2>
              <p>
                Email marketing helps businesses reach customers, boost
                engagement and support long-term growth across industries.
              </p>
            </div>
            <div className="rs-creative-industry-grid">
              {industryData.map((industry, index) => (
                <article
                  key={`${industry.id || industry.name}-${index}`}
                  className="rs-creative-industry"
                >
                  <span className="rs-creative-industry__icon" aria-hidden="true">
                    <i className={`bi ${industry.icon || "bi-buildings"}`}></i>
                  </span>
                  <h3>{industry.name || industry.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    benefits: {
      component: (
        <section key="benefits" className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Why it works</span>
                <h2>{benefits_title}</h2>
                <p>{benefits_subtitle}</p>
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-why__grid">
                {benefitsList.map((benefit, index) => {
                  const title =
                    typeof benefit === "string"
                      ? benefit
                      : benefit.title || benefit.description;
                  const description =
                    typeof benefit === "string"
                      ? null
                      : benefit.description && benefit.description !== title
                        ? benefit.description
                        : null;

                  return (
                    <article
                      key={`${benefit.id || "benefit"}-${index}`}
                      className="rs-creative-why__card"
                    >
                      <span className="rs-creative-why__icon" aria-hidden="true">
                        <i
                          className={`bi ${BENEFIT_ICONS[index % BENEFIT_ICONS.length]}`}
                        ></i>
                      </span>
                      <h3>{title}</h3>
                      {description ? <p>{description}</p> : null}
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

    services: {
      component: (
        <section key="services" className="rs-creative-services rs-creative-list-sec">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we deliver</span>
              <h2>Email Marketing Services</h2>
              <p>
                Each company has a distinct objective, target audience and
                communication approach. We develop customized email marketing
                strategies designed specifically for your industry and
                objectives.
              </p>
            </div>
            <div className="rs-creative-list-grid">
              {emailServices.map((service, index) => (
                <article
                  key={`${service}-${index}`}
                  className="rs-creative-list-item"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: true,
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
                  key={`${process.id || "step"}-${index}`}
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

    agency: {
      component: (
        <section key="agency" className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Why RedSpider</span>
                <h2>Why Choose RedSpider for Email Marketing in Dubai?</h2>
                <p>
                  RedSpider is the preferred choice of businesses because we
                  combine strategy, creative email design and performance
                  reporting into one clear workflow.
                </p>
                <a className="rs-creative-btn" href={contactHref}>
                  Book a call
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-why__grid">
                {whyChooseItems.map((item, index) => (
                  <article key={item.title} className="rs-creative-why__card">
                    <span className="rs-creative-why__icon" aria-hidden="true">
                      <i className={`bi ${item.icon}`}></i>
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
      show: true,
    },

    packages: {
      component: (
        <section key="packages" className="rs-creative-quote">
          <div className="container">
            <div className="rs-creative-quote__box">
              <div>
                <span className="rs-creative-kicker">Get a quote</span>
                <h2>
                  Get an estimate for email marketing services in Dubai
                </h2>
                <p>
                  Starting your first campaign or improving an existing
                  strategy? Contact us for a customized email marketing
                  solution.
                </p>
              </div>
              <a className="rs-creative-btn" href={contactHref}>
                {cta_button_text || "Get a consultation"}
                <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </section>
      ),
      show: true,
    },

    review: {
      component: <GoogleReviews key="review" />,
      show: true,
    },

    faqs: {
      component: (
        <ServiceFaqs
          key="faqs"
          faqs={faqData}
          title={faqs_title}
          subtitle={faqs_subtitle}
          idPrefix="email"
        />
      ),
      show: show_faqs,
    },

    cta: {
      component: (
        <ServiceCTA
          service={{
            ...data,
            cta_title: cta_title,
            cta_description: cta_description,
          }}
          key="cta"
        />
      ),
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
        "industries",
        "benefits",
        "services",
        "processes",
        "agency",
        "packages",
        "review",
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
      {custom_css ? (
        <style dangerouslySetInnerHTML={{ __html: custom_css }} />
      ) : null}
      <main className="service-template email-marketing-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? (
        <script dangerouslySetInnerHTML={{ __html: custom_js }} />
      ) : null}
    </div>
  );
}
