import Image from "next/image";
import Link from "next/link";
import ServiceFaqs from "../services/ServiceFaqs";
import ContactCTA from "../ui/ContactCTA";

const WHATSAPP_URL = "https://wa.me/971555515475";
const CONTACT_URL = "/contact-us/";
const PORTFOLIO_URL = "/our-portfolio/";

const APPROACH_STEPS = [
  {
    title: "Website & Competitor Audit ",
    icon: "bi-bullseye",
    image: "/assets/img/seo/1.svg",
    intro: "Every business is different, and so should be its SEO plan.",
    body: "We create a custom SEO strategy based on your goals, audience, and competition to position your brand strongly in search results.",
    process: [
      "Project brief: Understanding your business model, objectives, and current website performance.",
      "Keyword Research: Identifying high-intent, relevant keywords that match your customer’s search behavior.",
      "SEO Audit: Conducting a deep technical, on-page, and content analysis to define your SEO baseline.",
      "Competitive Analysis: Reviewing competitor strengths, backlink profiles, and content strategies to find ranking opportunities.",
    ],
    closing:
      "With a clear roadmap and measurable goals, your website begins its journey toward becoming an online authority.",
    cta: { label: "Get Started Now", href: CONTACT_URL },
  },
  {
    title: "Diverse Idea Generation",
    icon: "bi-lightbulb",
    image: "/assets/img/seo/idea-generation.svg",
    intro:
      "Strong SEO strategies are built on creative thinking and market understanding.",
    body: "At this stage, we bring together our content, design, and technical teams to generate diverse ideas that align with your business goals and audience expectations.",
    process: [
      "Understanding the Idea: Reviewing your vision, target audience, and long-term goals.",
      "Idea Analysis: Evaluating opportunities and challenges within your market.",
      "Idea Audit: Assessing how your current digital presence aligns with your business objectives.",
      "Diverse Suggestions: Presenting multiple strategies and actionable solutions for maximum reach and engagement.",
    ],
    closing:
      "This step ensures your SEO plan is not only strategic but also innovative and built for long-term sustainability.",
    cta: { label: "Get Started Now", href: CONTACT_URL },
  },
  {
    title: "Keyword & Search Intent Strategy",
    icon: "bi-code-slash",
    image: "/assets/img/seo/quarterly-targets.svg",
    intro: "SEO growth happens over time, not overnight.",
    body: "That’s why we set SMART quarterly targets to track performance and maintain consistency. These milestones help us monitor progress, adjust strategies, and keep your business moving toward higher rankings.",
    process: [
      "Creating Quarterly Goals: Setting realistic objectives based on data and performance analysis.",
      "Think Quarterly: Structuring campaigns around measurable 90-day cycles for clarity and accountability.",
      "Set Benchmarks: Holding regular meetings with clients to review progress and performance.",
      "Room for Flexibility: Adapting strategies to respond to Google updates, competition, and changing business needs.",
    ],
    closing:
      "This proactive approach ensures that your SEO campaign stays focused, flexible, and result-oriented.",
  },
  {
    title: "Weekly Calls & Monthly Meetings",
    icon: "bi-window",
    image: "/assets/img/seo/calls-Monthly-Meetings.svg",
    intro: "At RedSpider, we believe communication is key to performance.",
    body: "We keep our clients informed through regular meetings and transparent reporting, showing exactly how the campaign is progressing week by week.",
    process: [
      "Advanced Preparation: Reviewing reports, analytics, and updates before every client call.",
      "Reliable Format: Following a structured meeting format for clear communication and accountability.",
      "Role Responsibilities: Assigning tasks and discussing action points across the SEO and content teams.",
      "Make a Commitment: Setting new challenges, refining goals, and maintaining consistency in performance.",
    ],
    closing:
      "With regular feedback and open collaboration, you’ll always see how your SEO company in Dubai is driving measurable improvements.",
  },
  {
    title: "Reporting & Continuous Growth ",
    icon: "bi-graph-up",
    image: "/assets/img/seo/roadmap-analysis.svg",
    intro: "SEO is a continuous process — not a one-time setup.",
    body: "Our experts consistently evaluate your SEO roadmap to ensure your business keeps improving in search visibility and traffic growth.",
    process: [
      "Establish Goals: Reconfirming your roadmap objectives and KPIs every quarter.",
      "Gather Inputs: Reviewing existing data, market trends, and ongoing research.",
      "Visualize and Share: Presenting progress through visual performance reports and timelines.",
      "Regular Updates: Making strategic adjustments to maintain ranking stability and increase visibility.",
    ],
    closing:
      "This ongoing analysis helps us keep your brand aligned with Google’s evolving algorithms and your long-term business ambitions.",
  },
];

const SEO_SERVICES = [
  {
    title: "Technical SEO",
    icon: "bi-gear",
    image: "/assets/img/seo/service/1.webp",
    description:
      "Improve crawlability, indexing, Core Web Vitals, page speed, site architecture, schema and technical website health.",
  },
  {
    title: "On-Page SEO",
    icon: "bi-file-earmark-text",
    image: "/assets/img/seo/service/2.webp",
    description:
      "Optimize titles, meta descriptions, headings, content, internal links, URLs and page structure around search intent.",
  },
  {
    title: "Local SEO Dubai",
    icon: "bi-geo-alt",
    image: "/assets/img/seo/service/3.webp",
    description:
      "Improve visibility for location-based searches through local landing pages, business information and local search signals.",
  },
  {
    title: "Ecommerce SEO",
    icon: "bi-bag",
    image: "/assets/img/seo/service/4.webp",
    description:
      "Optimize product pages, category pages, technical structure and commercial keywords to support organic sales growth.",
  },
  {
    title: "Content SEO",
    icon: "bi-pencil-square",
    image: "/assets/img/seo/service/5.webp",
    description:
      "Create and optimize service pages, landing pages and supporting content around real customer search intent.",
  },
  {
    title: "Link Building & Authority",
    icon: "bi-link-45deg",
    image: "/assets/img/seo/service/6.webp",
    description:
      "Build relevant backlinks, mentions and authority through quality content and outreach.",
  },
];

const AI_SEO_FEATURES = [
  {
    title: "AI Search Visibility",
    description:
      "Structure website content so services, locations, expertise and company information are easy for search engines and AI systems to understand.",
  },
  {
    title: "Google AI Search Optimization",
    description:
      "Strengthen technical SEO, content quality, topical authority and structure to improve visibility across evolving Google search experiences.",
  },
  {
    title: "Answer Engine Optimization",
    description:
      "Create clear and useful answers around customer questions, services and commercial topics.",
  },
  {
    title: "Entity & Brand Authority",
    description:
      "Strengthen consistent business information, expertise and authority signals across the website.",
  },
  {
    title: "AI-Friendly Content Strategy",
    description:
      "Create original, business-specific content that adds real value instead of generic AI-generated copy.",
  },
];

const PPC_FEATURES = [
  {
    title: "Google Search Ads",
    description:
      "Target customers actively searching for relevant products or services using high-intent keyword campaigns.",
  },
  {
    title: "PPC Campaign Management",
    description:
      "Campaign setup, keyword research, bidding, budget control, audience targeting and ongoing optimization.",
  },
  {
    title: "Landing Page Optimization",
    description:
      "Improve page messaging, forms, calls to action and mobile usability to increase conversions.",
  },
  {
    title: "Conversion Tracking",
    description:
      "Track calls, contact forms, WhatsApp enquiries, purchases and other valuable actions.",
  },
  {
    title: "Remarketing Campaigns",
    description:
      "Reconnect with previous visitors and interested audiences to support repeat engagement and conversions.",
  },
];

const SEARCH_STRATEGY_PILLARS = [
  { title: "SEO", label: "Long-term organic visibility" },
  { title: "PPC", label: "Immediate high-intent reach" },
  { title: "AI Search", label: "Emerging search experiences" },
];

const OFFERINGS = [
  {
    title: "Strategic SEO Planning",
    icon: "bi-diagram-3",
    description:
      "We begin with a clear, data-driven plan designed for your specific business goals. From keyword mapping to competitor analysis, our experts create a structured SEO roadmap that increases visibility, credibility, and conversions.",
  },
  {
    title: "Performance Tracking & Reporting",
    icon: "bi-graph-up-arrow",
    description:
      "Our clients receive weekly and monthly updates on rankings, backlinks, and keyword performance. As a trusted SEO company in Dubai, we make sure you can track every improvement and understand the value of your investment.",
  },
  {
    title: "Long-Term Growth Approach",
    icon: "bi-hourglass-split",
    description:
      "We don’t chase short-term rankings. Our SEO services in UAE focus on building steady, lasting growth through ethical practices, technical excellence, and quality content that keeps your brand visible and competitive.",
  },
];

const INDUSTRIES = [
  {
    title: "Government & Corporate",
    icon: "bi-building",
    description:
      "Our experience includes secure, compliant SEO for government and enterprise-level websites, focusing on transparency, accessibility, and reach.",
  },
  {
    title: "Technology & IT",
    icon: "bi-cpu",
    description:
      "For tech companies and IT solution providers, we build strong keyword strategies that highlight expertise, innovation, and technical services.",
  },
  {
    title: "Automotive & Industrial",
    icon: "bi-truck",
    description:
      "We optimize for parts, services, and dealership keywords to boost visibility for manufacturers and suppliers in the automotive industry.",
  },
  {
    title: "Retail & E-Commerce",
    icon: "bi-shop",
    description:
      "Our SEO experts optimize online stores and retail brands for product visibility, higher conversions, and consistent traffic growth.",
  },
  {
    title: "Education",
    icon: "bi-mortarboard",
    description:
      "We help schools, colleges, and training institutes reach potential students through optimized content and local SEO visibility.",
  },
  {
    title: "Blinds & Curtains",
    icon: "bi-window",
    description:
      "We help blinds and curtains businesses in Dubai appear higher on Google through local SEO and product-focused keywords that attract ready-to-buy customers.",
  },
];

const STATS = [
  { value: "2L+", label: "Keyword Rank" },
  { value: "700+", label: "Successful Projects Completed" },
  { value: "5.5M", label: "Organic Visits Generated" },
  { value: "1281", label: "Clients Served" },
];

const CLIENT_RESULTS = [
  { value: "+38%", label: "Increase in organic website traffic" },
  { value: "+27%", label: "Improvement in keyword rankings on Google" },
  { value: "+22%", label: "Growth in leads and online inquiries" },
];

const FAQS = [
  {
    question: "What is SEO in Digital Marketing?",
    answer:
      "SEO (Search Engine Optimization) is the process of improving your website’s visibility on search engines like Google. It helps people find your business when they search for products or services you offer.",
  },
  {
    question: "How to Do SEO for a Website?",
    answer:
      "To start SEO, you need to research keywords, optimize on-page content, build quality backlinks, and monitor performance. It’s an ongoing process that improves both visibility and user experience.",
  },
  {
    question: "How to Make My Site SEO-Friendly?",
    answer:
      "Ensure your site loads fast, has mobile-friendly design, uses proper meta tags, and includes useful, keyword-optimized content. A structured layout helps both users and search engines navigate easily.",
  },
  {
    question: "What is Off-Page SEO?",
    answer:
      "Off-page SEO involves actions taken outside your website — like backlink building, guest posting, and brand mentions — to improve your domain authority and rankings.",
  },
  {
    question: "Why On-Page SEO is Important?",
    answer:
      "On-page SEO helps search engines understand your page content. Proper title tags, headings, and internal linking improve visibility and ensure your site ranks for relevant searches.",
  },
  {
    question: "How to Do Local SEO Marketing?",
    answer:
      "Local SEO focuses on attracting nearby customers by optimizing your Google Business Profile, collecting local reviews, and using location-based keywords.",
  },
  {
    question: "How to Do SEO Analysis of a Website?",
    answer:
      "You can analyze your site using tools like Google Search Console and Ahrefs to check indexing, backlinks, and page performance. It highlights what’s working and what needs fixing.",
  },
  {
    question: "What Are the 4 Types of SEO?",
    answer:
      "The main types are On-Page SEO, Off-Page SEO, Technical SEO, and Local SEO. Each plays a specific role in improving search visibility and overall performance.",
  },
  {
    question: "How Long Does SEO Take to Work?",
    answer:
      "SEO is a gradual process. Most websites start seeing results within 3–6 months depending on competition, content quality, and consistency.",
  },
  {
    question: "What is the Golden Rule of SEO?",
    answer:
      "Focus on value. Create high-quality content for users, not search engines. When users find your site helpful, Google rewards it with better rankings.",
  },
];

function CtaRow({ children }) {
  return <div className="seo-cta-row">{children}</div>;
}

function PrimaryLink({ href, children }) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        className="rs-creative-btn"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <i className="bi bi-arrow-up-right" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link className="rs-creative-btn" href={href}>
      {children}
      <i className="bi bi-arrow-up-right" aria-hidden="true" />
    </Link>
  );
}

function SecondaryLink({ href, children }) {
  return (
    <Link className="rs-creative-link" href={href}>
      {children}
      <i className="bi bi-arrow-up-right" aria-hidden="true" />
    </Link>
  );
}

function ApproachProcessItem({ item }) {
  const colonIndex = item.indexOf(":");

  if (colonIndex === -1) {
    return <li>{item}</li>;
  }

  return (
    <li>
      <strong>{item.slice(0, colonIndex + 1)}</strong>
      {item.slice(colonIndex + 1)}
    </li>
  );
}

export default function SeoAgencyTemplate() {
  return (
    <div className="service-template seo-agency-page rs-creative-page">
      <section className="design-developemnt-hero hero-marquee">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="rs-process-title-sec">
                <h1 className="rs-process-title mb-3">
                  SEO Agency Dubai for SEO, AI Search & PPC Growth
                </h1>
                <p className="rs-process-text mb-3">
                  RedSpider is a professional SEO agency in Dubai helping
                  businesses improve visibility across Google Search, local
                  search, <br></br> AI-powered search experiences and paid advertising.
                </p>
                <p className="rs-process-text mb-3">
                  Our SEO services combine technical optimization, content
                  strategy, local SEO, authority building, AI search
                  optimization and PPC campaign management <br></br> to attract relevant
                  traffic,  generate qualified leads and support long-term
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-section seo-approach">
        <div className="container">
          <div className="seo-section-head seo-section-head--center">
            <h2>Our SEO & Search Marketing Process </h2>
            <p>
              At RedSpider, we follow a five-step process built on experience,
              data, and precision. With over 13 years of real SEO work for
              global and UAE-based brands, our strategies are not
              experimental—they’re proven. Each step is designed to strengthen
              visibility, improve rankings, and deliver measurable growth for
              your business. Our focus is simple: consistent organic traffic
              that converts into real results.
            </p>
          </div>

          <ul className="nav seo-approach-nav" role="tablist">
            {APPROACH_STEPS.map((step, index) => {
              const isActive = index === 0;
              const paneId = `seo-approach-pane-${index}`;
              const tabId = `seo-approach-tab-${index}`;

              return (
                <li className="nav-item" key={step.title} role="presentation">
                  <button
                    className={`nav-link seo-approach-nav__btn${isActive ? " active" : ""}`}
                    id={tabId}
                    data-bs-toggle="tab"
                    data-bs-target={`#${paneId}`}
                    type="button"
                    role="tab"
                    aria-controls={paneId}
                    aria-selected={isActive}
                  >
                    <i className={`bi ${step.icon}`} aria-hidden="true" />
                    <span className="visually-hidden">{step.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="tab-content seo-approach-panels">
            {APPROACH_STEPS.map((step, index) => {
              const isActive = index === 0;
              const paneId = `seo-approach-pane-${index}`;
              const tabId = `seo-approach-tab-${index}`;

              return (
                <div
                  className={`tab-pane fade${isActive ? " show active" : ""}`}
                  id={paneId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  key={step.title}
                  tabIndex={0}
                >
                  <div className="row align-items-center g-4 g-lg-5">
                    <div className="col-lg-8">
                      <div className="seo-approach-copy">
                        <h3>{step.title}</h3>
                        <p>{step.intro}</p>
                        <p>{step.body}</p>
                        <p className="seo-approach-label">Process</p>
                        <ul className="seo-approach-list">
                          {step.process.map((item) => (
                            <ApproachProcessItem key={item} item={item} />
                          ))}
                        </ul>
                        <p>{step.closing}</p>
                        {step.cta ? (
                          <Link
                            className="rs-creative-btn"
                            href={step.cta.href}
                          >
                            {step.cta.label}
                            <i
                              className="bi bi-arrow-up-right"
                              aria-hidden="true"
                            />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="seo-approach-visual">
                        <Image
                          src={step.image}
                          alt=""
                          width={320}
                          height={320}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="seo-services" className="seo-section seo-services">
        <div className="container">
          <div className="seo-services-head">
            <div className="seo-services-kicker">
              <span className="seo-kicker">What we deliver</span>
            </div>
            <h2>
              Our <span> 
                 SEO Services </span>
            </h2>
            <p className="seo-section-head__lead">
              Want to generate more traffic to your website? We know how to
              drive long-term growth
            </p>
          </div>

          <div className="seo-service-grid">
            {SEO_SERVICES.map((service, index) => (
              <article
                key={service.title}
                className={`seo-service-card seo-service-card--${index + 1}`}
              >
                <span className="seo-service-card__badge" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>
                <div className="seo-service-card__media">
                  <span className="seo-service-card__blob" aria-hidden="true" />
                  <Image
                    src={service.image}
                    alt=""
                    width={120}
                    height={120}
                    unoptimized
                  />
                </div>
                <div className="seo-service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {/* <span className="seo-service-card__more">
                    Learn more
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </span> */}
                </div>
              </article>
            ))}
          </div>

          <div className="seo-services-benefits">
            <div className="seo-services-benefit">
              <span className="seo-services-benefit__icon" aria-hidden="true">
                <i className="bi bi-graph-up-arrow" />
              </span>
              <div>
                <strong>Higher Rankings</strong>
                <p>Get found by more customers</p>
              </div>
            </div>
            <div className="seo-services-benefit">
              <span className="seo-services-benefit__icon" aria-hidden="true">
                <i className="bi bi-people" />
              </span>
              <div>
                <strong>More Qualified Traffic</strong>
                <p>
                 Attract the right audience

                </p>
              </div>
            </div>
            <div className="seo-services-benefit">
              <span className="seo-services-benefit__icon" aria-hidden="true">
                <i className="bi bi-trophy" />
              </span>
              <div>
                <strong>Sustainable Growth</strong>
                <p>Build long-term success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-section seo-ai">
        <div className="container">
          <div className="seo-section-head seo-section-head--center">
            <span className="seo-kicker">AI Search</span>
            <h2>AI SEO & AI Search Optimization</h2>
            <p>
              Search behaviour is changing. Customers increasingly use
              AI-powered search experiences to research businesses, compare
              services and find answers before making decisions. RedSpider
              should highlight AI SEO and AI Search Optimization as part of its
              modern search strategy.
            </p>
          </div>

          <div className="seo-ai-grid">
            {AI_SEO_FEATURES.map((item, index) => (
              <article key={item.title} className="seo-feature-card">
                <span className="seo-feature-card__num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-section seo-ppc">
        <div className="container">
          <div className="seo-ppc__layout">
            <div className="seo-section-head">
              <span className="seo-kicker">Paid Search</span>
              <h2>PPC & Google Ads Management Dubai</h2>
              <p>
                SEO supports long-term growth, while PPC can provide faster
                visibility for customers actively searching for products or
                services. This section should position RedSpider for PPC Agency
                Dubai, Google Ads Agency Dubai and PPC Services Dubai searches.
              </p>
            </div>

            <div className="seo-ppc-list">
              {PPC_FEATURES.map((item, index) => (
                <article key={item.title} className="seo-ppc-item">
                  <span className="seo-ppc-item__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="seo-section seo-strategy">
        <div className="container">
          <div className="seo-strategy__layout">
            <div className="seo-section-head">
              <span className="seo-kicker">Combined strategy</span>
              <h2>SEO + PPC + AI Search Strategy</h2>
              <p>
                SEO builds long-term organic visibility. PPC provides immediate
                visibility for high-intent searches. AI SEO improves how the
                business and its content are understood across emerging
                AI-powered search experiences.
              </p>
              <p>
                Combining these channels gives businesses a broader search
                strategy and reduces dependence on one traffic source.
              </p>
            </div>

            <div className="seo-strategy-pillars" aria-label="Search channels">
              {SEARCH_STRATEGY_PILLARS.map((item) => (
                <article key={item.title} className="seo-strategy-pillar">
                  <h3>{item.title}</h3>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="seo-section seo-offerings">
        <div className="container">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-lg-5">
              <div className="seo-offerings-visual" aria-hidden="true">
                <div className="seo-offerings-visual__card">
                  <Image
                    src="/assets/img/seo/Group_36y85.svg"
                    alt=""
                    width={220}
                    height={220}
                  />
                </div>
                {OFFERINGS.map((item) => (
                  <span className="seo-offerings-visual__chip" key={item.title}>
                    <i className={`bi ${item.icon}`} />
                  </span>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="seo-section-head">
                <span className="seo-kicker">Why RedSpider</span>
                <h2>Why Choose RedSpider as Your SEO Agency in Dubai?</h2>
                <p className="seo-section-head__lead">
                  Implementing Effective SEO Strategy for Long-Term Business
                  Growth
                </p>
                <p>
                  As a professional SEO agency in Dubai, we help businesses
                  strengthen their online visibility and attract consistent
                  organic traffic. Our team uses proven SEO techniques, real
                  data, and transparent reporting to improve search rankings and
                  deliver measurable business growth. Every strategy we build
                  focuses on long-term results and sustainable performance.
                </p>
              </div>

              <div className="seo-offer-grid">
                {OFFERINGS.map((item, index) => (
                  <article
                    key={item.title}
                    className={`seo-offer-card seo-offer-card--${index + 1}`}
                  >
                    <span className="seo-icon" aria-hidden="true">
                      <i className={`bi ${item.icon}`} />
                    </span>
                    <span className="seo-offer-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>

              <CtaRow>
                <PrimaryLink href={CONTACT_URL}>Get Started Now</PrimaryLink>
              </CtaRow>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-section seo-industries pt-0">
        <div className="container">
          <div className="seo-section-head">
            <span className="seo-kicker">Industries</span>
            <h2>Industries We Serve</h2>
            <p className="seo-section-head__lead">
              Driving SEO Growth Across Every Business Sector
            </p>
            <p>
              We provide expert SEO services in Dubai tailored to different
              industries and audiences. Our experience spans real estate,
              healthcare, finance, retail, technology, and government sectors —
              helping each achieve stronger online visibility and measurable
              growth. Whether you run a local service company or a global
              enterprise, our SEO agency in Dubai understands your market,
              audience, and search intent. We use data-driven strategies and
              proven optimization techniques to help your business stand out,
              attract qualified leads, and stay ahead in search results across
              the UAE and beyond.
            </p>
          </div>
          <div className="seo-industry-grid">
            {INDUSTRIES.map((industry) => (
              <article key={industry.title} className="seo-industry-card">
                <span className="seo-icon" aria-hidden="true">
                  <i className={`bi ${industry.icon}`} />
                </span>
                <div>
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-section seo-numbers">
        <div className="seo-numbers__split">
          <div
            className="seo-numbers__visual"
            style={{
              backgroundImage:
                "url(https://www.eseosolutions.ae/assets/images/let-talk-bg.png)",
            }}
            aria-hidden="true"
          />
          <div className="seo-numbers__copy">
            <div className="seo-section-head">
              <span className="seo-kicker">Results</span>
              <h2>
                SEO Results That Support Business Growth 
              </h2>
              <p className="seo-section-head__lead">
                Turning Data into Measurable Growth for Your Business
              </p>
              <p>
                We’ve spent over a decade helping companies achieve top Google
                rankings and lasting success.
              </p>
              <p>Now, it’s your turn.</p>
              <p>
                Schedule a free consultation with our SEO experts in Dubai and
                let’s plan a winning strategy for your business.
              </p>
              <p>
                We don’t sell packages — we build performance partnerships that
                grow over time.
              </p>
            </div>

            <CtaRow>
              <PrimaryLink href={CONTACT_URL}>Get Started Now</PrimaryLink>
            </CtaRow>
          </div>
        </div>

        <div className="seo-stat-grid">
          {STATS.map((stat) => (
            <article key={stat.label} className="seo-stat-card">
              <p className="seo-stat-value">{stat.value}</p>
              <h3>{stat.label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-section seo-results">
        <div className="container">
          <div className="seo-section-head seo-section-head--center">
            <h2>Our Clients Get Results</h2>
            <p className="seo-section-head__lead">
              We Work Together to Deliver Real SEO Performance
            </p>
          </div>

          <div className="seo-results-panel">
            <div className="row g-4 g-lg-5 align-items-start">
              <div className="col-lg-6">
                <div className="seo-results-copy">
                  <p>
                    We believe real success is measured by results — not
                    promises. Our SEO strategies consistently help businesses in
                    Dubai and across the UAE grow their online visibility,
                    traffic, and lead conversions. From local startups to global
                    brands, our data-driven SEO campaigns have turned websites
                    into powerful lead-generation tools.
                  </p>
                  <p>
                    These numbers reflect what we deliver every day — measurable
                    SEO growth backed by strategy, analysis, and experience.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="seo-results-visual">
                  <Image
                    src="/assets/img/seo/case-study-img.webp"
                    alt=""
                    width={720}
                    height={480}
                    unoptimized
                  />
                </div>
              </div>
            </div>

            <div className="seo-results-metrics">
              <span className="seo-kicker">Client results</span>
              <div className="seo-result-grid">
                {CLIENT_RESULTS.map((result) => (
                  <article key={result.label} className="seo-result-card">
                    <p className="seo-stat-value">{result.value}</p>
                    <h3>{result.label}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <CtaRow>
            <SecondaryLink href={PORTFOLIO_URL}>
              See Our Portfolio
            </SecondaryLink>
            <PrimaryLink href={WHATSAPP_URL}>Talk to our Expert</PrimaryLink>
          </CtaRow>
        </div>
      </section>

      <div className="seo-faq">
        <ServiceFaqs
          faqs={FAQS}
          title="Frequently Asked Questions About SEO Services"
          subtitle="Answering Your Most Common SEO Questions Clearly and Simply"
          idPrefix="seo-agency"
        />
      </div>

     

      <ContactCTA
        title="Grow Your Visibility Across Google & AI Search"
        description="RedSpider combines SEO, AI Search Optimization and PPC services to help businesses improve visibility, attract qualified traffic and generate measurable opportunities. Whether you want stronger Google rankings, better Local SEO performance or immediate visibility through PPC, our Dubai team can develop a strategy around your goals."
      />
    </div>
  );
}
