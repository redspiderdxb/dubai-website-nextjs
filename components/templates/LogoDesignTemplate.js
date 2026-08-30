import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";
import GoogleReviews from "../ui/GoogleReviews";
import ServiceWorkGallery from "../services/ServiceWorkGallery";

const SERVICE_ICONS = [
  "bi-vector-pen",
  "bi-grid-3x3-gap",
  "bi-arrow-repeat",
  "bi-building-check",
  "bi-journal-check",
];

const TYPE_ICONS = [
  "bi-type",
  "bi-fonts",
  "bi-hexagon",
  "bi-grid-3x3-gap",
  "bi-gem",
  "bi-arrows-angle-expand",
];

export default function LogoDesignTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    intro_small_heading = "Logo Design · Dubai",
    intro_description = "Your logo is the face of your business. In Dubai's competitive market, a professional logo builds trust, credibility, and brand recognition. We create logos that reflect your business values, communicate clearly with your audience, and create a lasting impression.",
    cta_button_text,
    cta_button_link,
    features = [],
    logoTypes = [],
    logoFormats = [],
    industriesLogo = [],
    logoPackages = [],
    processes = [],
    faqs = [],
    gallery = [],
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
    show_gallery = true,
    show_cta = true,
    features_title = "What We Offer",
    features_subtitle = "Logo design, brand identity and files ready for print and digital use.",
    benefits_title = "Design & develop the best identity around",
    benefits_subtitle = "Your logo is the face of your business. In Dubai's competitive market, a professional logo builds trust, credibility, and brand recognition.",
    processes_title = "Our Logo Design Process",
    processes_subtitle = "A structured process from brand discovery to final files.",
    technologies_title = "Types of Logo We Work",
    technologies_subtitle = "We design logos suitable for a wide range of brand styles.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about logo design.",
    gallery_title = "Our Gallery",
    gallery_subtitle = "",
    section_order = [
      "hero",
      "intro",
      "features",
      "technologies",
      "benefits",
      "processes",
      "gallery",
      "packages",
      "industries",
      "review",
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const contactHref = cta_button_link || "/contact-us/";

  const logoTypesData =
    logoTypes.length > 0
      ? logoTypes
      : [
          {
            name: "Wordmark Logos",
            description:
              "Text-based logos that focus on typography and font styling to create a unique brand identity.",
          },
          {
            name: "Lettermark Logos",
            description:
              "Logo designs using initials or abbreviated brand names for a clean and memorable identity.",
          },
          {
            name: "Symbol / Icon Logos",
            description:
              "Visual symbols or icons that represent your brand without text, creating instant recognition.",
          },
          {
            name: "Combination Logos",
            description:
              "A mix of text and symbols offering flexibility for various brand applications.",
          },
          {
            name: "Luxury & Corporate Logos",
            description:
              "Premium logo designs crafted for high-end brands and corporate identities with elegance.",
          },
          {
            name: "Minimal & Modern Logos",
            description:
              "Clean, contemporary designs that focus on simplicity and visual impact.",
          },
        ];

  const servicesData =
    features.length > 0
      ? features
      : [
          {
            name: "Custom Logo Design",
            description:
              "Tailored logo designs created specifically for your brand, reflecting your unique identity and values.",
          },
          {
            name: "Brand Identity Systems",
            description:
              "Complete brand identity solutions including logos, color schemes, typography, and visual guidelines.",
          },
          {
            name: "Logo Redesign & Rebranding",
            description:
              "Modernize your existing logo or completely rebrand your business with a fresh new identity.",
          },
          {
            name: "Corporate Identity Design",
            description:
              "Professional corporate identities including logos, business cards, letterheads, and brand assets.",
          },
          {
            name: "Brand Guidelines & Visual Standards",
            description:
              "Comprehensive brand guidelines that ensure consistent brand application across all platforms.",
          },
        ];

  const formatsData =
    logoFormats.length > 0
      ? logoFormats
      : [
          { name: "High-Resolution JPG" },
          { name: "PNG (Transparent Background)" },
          { name: "Editable AI / EPS Vector File" },
          { name: "PDF Version" },
          { name: "Black & White Logo" },
          { name: "Social Media Sizes" },
          { name: "Brand Color Codes" },
        ];

  const allIndustries =
    industriesLogo.length > 0
      ? industriesLogo.map((item) => item.title || item.name)
      : [
          "Construction & Engineering Firms",
          "Real Estate Companies",
          "IT & Software Companies",
          "Corporate Businesses",
          "Startups",
          "Ecommerce Brands",
          "Healthcare Brands",
          "Restaurants & Cafes",
          "Fashion Brands",
          "Education Institutes",
          "Hospitality Companies",
          "Consulting Firms",
        ];

  const packagesData =
    logoPackages.length > 0
      ? logoPackages
      : [
          {
            name: "Logo Package",
            features:
              "5 Logo design with concept guidelines, Unlimited revisions until you are completely satisfied, Professional print & web ready logo artwork PDF files, Copyright ownership to the final logo",
          },
          {
            name: "Logo + Stationary",
            features:
              "5 Logo design with concept guidelines, Unlimited revisions until you are completely satisfied, Professional print & web ready logo artwork PDF files, Copyright ownership to the final logo, Complete Stationery Design",
          },
          {
            name: "Logo + Stationary + Website",
            features:
              "5 Logo design with concept guidelines, Professional print & web ready logo artwork PDF files, Copyright ownership to the final logo, Complete Stationery Design, Website Design & Development",
          },
          {
            name: "Brand Book",
            features:
              "5 Logo design with concept, Copyright ownership to the final logo, Corporate Identity with brand guideline, Complete Stationery Design, Website Design & Development",
          },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Brand Discovery & Consultation",
            description:
              "We analyse your brand, goals, audience and market positioning before design begins.",
          },
          {
            title: "Market Research & Concept Planning",
            description:
              "Industry and competitor research informs concepts that feel original and relevant.",
          },
          {
            title: "Initial Logo Concepts",
            description:
              "Multiple directions are presented so you can compare and choose a clear path.",
          },
          {
            title: "Feedback & Refinement",
            description:
              "We refine the selected concept until it matches your brand and practical use cases.",
          },
          {
            title: "Final Delivery in Multiple Formats",
            description:
              "Final artwork is delivered for print, web, signage and social media.",
          },
        ];

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "What makes a strong logo design for businesses in Dubai?",
            answer:
              "A strong logo reflects brand identity, industry relevance and long-term scalability. It should be distinctive and usable across digital and print platforms.",
          },
          {
            question: "What is included in a complete logo design service?",
            answer:
              "Concept development, revisions, final artwork files and brand usage guidelines to keep visual consistency across platforms.",
          },
          {
            question: "How long does the logo design process usually take?",
            answer:
              "Typically 5–10 business days depending on concept complexity, revisions and brand requirements.",
          },
          {
            question: "What file formats are delivered after logo completion?",
            answer:
              "Final delivery usually includes AI, EPS, PDF, PNG and JPG for print, web, signage and marketing materials.",
          },
          {
            question: "Can an existing brand in Dubai request a logo redesign?",
            answer:
              "Yes. Many businesses refresh their logo to modernise identity while keeping recognition.",
          },
        ];

  const uniqueGalleryImages = Array.from(
    new Map(
      (Array.isArray(gallery) ? gallery : [])
        .filter(
          (item) =>
            item && typeof item.image === "string" && item.image.trim() !== "",
        )
        .map((item) => [item.image.trim(), item]),
    ).values(),
  );

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
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },
    intro: {
      component: (
        <section key="intro" className="rs-creative-intro">
          <div className="container">
            <div className="rs-creative-intro__grid">
              <div className="rs-creative-intro__meta">
                <span className="rs-creative-kicker">{intro_small_heading}</span>
                <p className="rs-creative-intro__note">Identity since 2010</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  A logo should look established, create a strong first
                  impression and work across digital and print platforms.
                </p>
                <a className="rs-creative-link" href="#logo-design-services">
                  Explore logo services
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
          id="logo-design-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we offer</span>
              <h2>{features_title}</h2>
              {features_subtitle ? <p>{features_subtitle}</p> : null}
            </div>
            <div className="rs-creative-card-grid">
              {servicesData.map((item, index) => (
                <article
                  key={`${item.id || item.name}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i className={`bi ${SERVICE_ICONS[index % SERVICE_ICONS.length]}`}></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title || item.name}</h3>
                  {item.description ? <p>{item.description}</p> : null}
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
              <span className="rs-creative-kicker">Logo types</span>
              <h2>{technologies_title}</h2>
              <p>{technologies_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {logoTypesData.map((item, index) => (
                <article
                  key={`${item.id || item.name}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i className={`bi ${TYPE_ICONS[index % TYPE_ICONS.length]}`}></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.name || item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_technologies,
    },
    benefits: {
      component: (
        <section key="benefits" className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Deliverables</span>
                <h2>{benefits_title}</h2>
                <p>{benefits_subtitle}</p>
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-pill-grid">
                {formatsData.map((item, index) => (
                  <article
                    key={`${item.id || item.name}-${index}`}
                    className="rs-creative-pill"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.name || item.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },
    processes: {
      component: (
        <section key="processes" className="rs-creative-process">
          <div className="container">
            <div className="rs-creative-head rs-creative-head--light">
              <span className="rs-creative-kicker">How we work</span>
              <h2>{processes_title}</h2>
              {processes_subtitle ? <p>{processes_subtitle}</p> : null}
            </div>
            <ol className="rs-creative-steps">
              {processData.map((process, index) => (
                <li
                  key={`${process.id || process.title}-${index}`}
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
    gallery: {
      component: (
        <ServiceWorkGallery
          key="gallery"
          title={gallery_title || "Our Gallery"}
          subtitle={gallery_subtitle}
          items={uniqueGalleryImages}
          getImageSrc={(src) =>
            String(src).replace(
              "http://localhost/redspider/public/",
              "https://redspider.rsworkspace.net/admin/public/",
            )
          }
        />
      ),
      show: show_gallery,
    },
    packages: {
      component: (
        <section key="packages" className="rs-creative-services">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Packages</span>
              <h2>Logo design packages</h2>
              <p>Choose a starting point. Final scope is confirmed after a brief.</p>
            </div>
            <div className="rs-creative-card-grid">
              {packagesData.map((pkg, index) => (
                <article
                  key={`${pkg.id || pkg.name}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i className="bi bi-box-seam"></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{pkg.name || pkg.title}</h3>
                  {pkg.features ? (
                    <p>
                      {typeof pkg.features === "string"
                        ? pkg.features
                        : Array.isArray(pkg.features)
                          ? pkg.features.join(", ")
                          : ""}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: true,
    },
    industries: {
      component: (
        <section key="industries" className="rs-creative-industries">
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">Industries</span>
              <h2>Industries we design for</h2>
              <p>Logos for businesses across Dubai and the UAE.</p>
            </div>
            <div className="rs-creative-industry-grid">
              {allIndustries.map((name, index) => (
                <article key={`${name}-${index}`} className="rs-creative-industry">
                  <span className="rs-creative-industry__icon" aria-hidden="true">
                    <i className="bi bi-briefcase"></i>
                  </span>
                  <h3>{name}</h3>
                </article>
              ))}
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
          idPrefix="logo"
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
      order = order.split(",").map((s) => s.trim());
    }
    if (!Array.isArray(order) || order.length === 0) {
      order = [
        "hero",
        "intro",
        "features",
        "technologies",
        "benefits",
        "processes",
        "gallery",
        "packages",
        "industries",
        "review",
        "faqs",
        "cta",
      ];
    }
    ["packages", "industries", "review"].forEach((key) => {
      if (!order.includes(key)) {
        const faqIndex = order.indexOf("faqs");
        if (faqIndex !== -1) {
          order.splice(faqIndex, 0, key);
        } else {
          order.push(key);
        }
      }
    });
    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section || !section.show) return null;
        return section.component;
      })
      .filter(Boolean);
  };

  return (
    <div style={styles}>
      {custom_css ? <style dangerouslySetInnerHTML={{ __html: custom_css }} /> : null}
      <main className="service-template logo-design-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? <script dangerouslySetInnerHTML={{ __html: custom_js }} /> : null}
    </div>
  );
}
