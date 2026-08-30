import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import ContactCTA from "../ui/ContactCTA";

export default function AgencyPackages() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // =========================================================
  // IMPORTANT
  // =========================================================
  // GSAP card-stack animation is handled by title-effect.js.
  //
  // DO NOT create another ScrollTrigger/pin here.
  //
  // This prevents:
  // - double pin-spacer
  // - huge blank space
  // - section jumping
  // - card animation getting duplicated
  // =========================================================

  const servicesList = [
    { name: "Corporate Website Design", icon: "bi-building" },
    { name: "Ecommerce Development", icon: "bi-bag" },
    { name: "Custom Web Application", icon: "bi-code-slash" },
    { name: "Website Redesign", icon: "bi-arrow-repeat" },
    { name: "Responsive Web Design", icon: "bi-phone" },
  ];

  const focusAreas = [
    { name: "User Experience", icon: "bi-people" },
    { name: "Mobile Usability", icon: "bi-phone" },
    { name: "Website Performance", icon: "bi-speedometer2" },
    { name: "Lead Generation", icon: "bi-graph-up-arrow" },
    { name: "Scalability", icon: "bi-layers" },
  ];



  const features = [
    "Custom website designs that reflect the story and values of your brand",
    "User-friendly websites that work smoothly on all devices",
    "SEO-friendly website offering reliable search engine visibility",
    "Integration with the tools and systems your business needs",
    "Ongoing support and maintenance to keep your website running smoothly",
  ];

  const accordionItems = [
    {
      id: "rsAccTwo",
      show: true,
      title: "Websites Designed to Attract and Engage Customers",
      content: (
        <>
          <p>
            Looking for an experienced web designer in Dubai? RedSpider is here
            to help. We create modern, user-friendly websites that are designed
            to match your business goals and leave a great first impression.
          </p>

          <p>
            Our team of web designers in Dubai speaks both Arabic and English,
            making communication simple and hassle-free throughout the project.
            Using professional design tools like Sketch, Adobe XD, and
            Photoshop, we create websites that not only look attractive but are
            also easy to use, fast, and built to perform.
          </p>
        </>
      ),
    },

    {
      id: "rsAccThree",
      show: false,
      title: "Ready to Build Your New Website?",
      content: (
        <>
          <p>
            At RedSpider, we create websites that are not only simple to use,
            but are mobile-friendly and optimized for a positive user
            experience. We don't use pre-designed templates, we design them
            according to your brand and business objectives. Calls to action are
            placed at strategic points. where the audience is likely to take
            action, such as contacting a business, making a purchase, or taking
            the next step. Once the project is complete, you receive{" "}
            <b> full ownership of your website</b>.
          </p>

          <p>
            We use WordPress, Shopify, and Wix among others to build quick,
            custom, and easy to maintain web pages. From building a new website
            or revamping an current site, we create web pages that help you
            attract more customers, improve your online presence, and aid your
            organization's growth.
          </p>
        </>
      ),
    },
  ];

  // Helper to ensure image paths have leading slash for Next.js Image
  const getImageSrc = (imagePath) => {
    if (!imagePath) return null;
    // If it already starts with / or is a full URL, return as-is
    if (
      imagePath.startsWith("/") ||
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }
    // Otherwise add leading slash
    return `/${imagePath}`;
  };

  // Helper to check if image is remote
  const isRemoteImage = (src) => {
    return src && (src.startsWith("http://") || src.startsWith("https://"));
  };

  return (
    <>
      {/* =====================================================
          GSAP AGENCY CARDS
          ===================================================== */}

      <section ref={sectionRef} className="rs-gsap-stack-sec">
        <div
          className="container"
          style={{
            maxWidth: "1900px",
          }}
        >
          <div className="rs-gsap-cards">
            {/* =====================================================
          CARD 1
      ===================================================== */}

            <div
              ref={(el) => {
                cardsRef.current[0] = el;
              }}
              className="rs-gsap-card rs-card-1"
            >
              <div className="rs-agency-card rs-agency-card--creative">
                <div className="row g-0 align-items-stretch rs-agency-split">
                  <div className="col-lg-5">
                    <div className="rs-agency-visual">
                      <div className="rs-agency-image">
                        <img
                          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                          alt="Website Design Agency Dubai office"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="rs-agency-content">
                      <div className="rs-agency-top">
                        <span>[ 001 ]</span>
                        <small>WEBSITE / DESIGN / DEVELOPMENT</small>
                      </div>

                      <h2 className="rs-agency-heading">
                        Websites Built Around Your Business
                      </h2>

                      <p className="rs-lead">
                        RedSpider is a trusted web design and development partner
                        for businesses across Dubai and the UAE. We build modern,
                        fast websites that strengthen your online presence and
                        help attract new customers.
                      </p>

                      <p>
                        From corporate sites and ecommerce platforms to custom
                        web applications, our team focuses on design, usability
                        and performance so your website works on every device
                        and supports long-term growth.
                      </p>

                      <span className="rs-agency-list-label">SERVICES:</span>

                      <div className="rs-agency-services-grid">
                        {servicesList.map((service, idx) => (
                          <div className="rs-agency-service" key={service.name}>
                            <i className={`bi ${service.icon}`} aria-hidden="true" />
                            <em>0{idx + 1}</em>
                            <span>{service.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
          CARD 2
      ===================================================== */}

            <div
              ref={(el) => {
                cardsRef.current[1] = el;
              }}
              className="rs-gsap-card rs-card-2"
            >
              <div className="rs-agency-card rs-agency-card--creative rs-agency-card--dark">
                <div className="row g-0 align-items-stretch rs-agency-split">
                  <div className="col-lg-7">
                    <div className="rs-agency-content">
                      <div className="rs-agency-top">
                        <span>[ 002 ]</span>
                        <small>USER EXPERIENCE / PERFORMANCE / GROWTH</small>
                      </div>

                      <h2 className="rs-agency-heading">
                        Building Digital Experiences That Help Businesses Grow
                      </h2>

                      <p className="rs-lead">
                        A successful website should be easy to use, fast to load,
                        mobile-friendly and built to turn visitors into enquiries.
                      </p>

                      <p>
                        We plan every layout for clarity and performance — from
                        navigation and calls to action to mobile usability — so
                        customers can find what they need and take the next step.
                      </p>

                      <span className="rs-agency-list-label">FOCUS AREAS:</span>

                      <div className="rs-agency-services-grid">
                        {focusAreas.map((item, idx) => (
                          <div className="rs-agency-service" key={item.name}>
                            <i className={`bi ${item.icon}`} aria-hidden="true" />
                            <em>0{idx + 1}</em>
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="rs-agency-visual">
                      <div className="rs-agency-image">
                        <img
                          src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"
                          alt="Modern digital workspace"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
          CARD 3
      ===================================================== */}

            <div
              ref={(el) => {
                cardsRef.current[2] = el;
              }}
              className="rs-gsap-card rs-card-3"
            >
              <div className="rs-agency-card rs-agency-card--creative">
                <div className="row g-0 align-items-stretch rs-agency-split">
                  <div className="col-lg-5">
                    <div className="rs-agency-visual">
                      <div className="rs-agency-image">
                        <img
                          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
                          alt="Dubai Skyline"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="rs-agency-content">
                      <div className="rs-agency-top">
                        <span>[ 003 ]</span>
                        <small>LOCATIONS / DUBAI / UAE</small>
                      </div>

                      <h2 className="rs-agency-heading">
                        Working With Businesses Across Dubai &amp; the UAE
                      </h2>

                      <p className="rs-lead">
                        RedSpider provides website design and development across
                        Dubai, Sharjah and the wider UAE — for startups, SMEs and
                        enterprises that need a stronger digital presence.
                      </p>

                      <p>
                        Our team delivers modern, reliable websites built around
                        your goals, so you can grow online with a partner that
                        understands the local market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      
      {/* =====================================================
          PACKAGES SECTION
          ===================================================== */}

      {/* =====================================================
          OPPORTUNITY / EXPERIENCE SECTION
          ===================================================== */}

      <section className="rs-opportunity section">
        <div className="container rs-opportunity__container">
          <div className="rs-opportunity__layout">
            <aside className="rs-opportunity__poster" data-aos="fade-up">
              <p className="rs-opportunity__eyebrow">Creating great opportunities</p>

              <h2 className="rs-opportunity__headline">
                We help turn your{" "}
                <span className="rs-opportunity__accent">dream</span> into reality
              </h2>

              <div className="rs-opportunity__rating">
                <div className="rs-opportunity__score" aria-hidden="true">
                  4.9
                </div>

                <div className="rs-opportunity__rating-copy">
                  <Image
                    src="/assets/img/google-h.webp"
                    alt="Google rating"
                    width={120}
                    height={36}
                    sizes="120px"
                    loading="lazy"
                  />
                  <p>
                    RedSpider is rated <strong>4.9 stars</strong>
                  </p>
                  <span>based on 100+ Google Business reviews</span>
                </div>
              </div>

              <Link href="/contact-us" className="rs-opportunity__contact">
                Contact us
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            </aside>

            <div className="rs-opportunity__main">
              <div className="rs-opportunity__story" data-aos="fade-up" data-aos-delay="80">
                <h3 className="rs-opportunity__title">
                  Experience and Expertise Behind RedSpider
                </h3>

                <p>
                  RedSpider has become a trusted choice for website design in
                  Dubai as we have 14 years of experience in the industry. We
                  have completed 500+ successful projects and continue to help
                  businesses strengthen their online presence. Our web designers
                  are highly skilled who are helping various businesses have a
                  strong online presence. Our experienced web designers create
                  new websites and improve existing ones with a strong focus on
                  design, usability and performance. Your website will look
                  visually appealing and that helps grow your business over
                  time.
                </p>

                <div className="rs-opportunity__stats" aria-label="RedSpider highlights">
                  <div>
                    <strong>14+</strong>
                    <span>Years</span>
                  </div>
                  <div>
                    <strong>500+</strong>
                    <span>Projects</span>
                  </div>
                  <div>
                    <strong>100+</strong>
                    <span>5★ Reviews</span>
                  </div>
                </div>

                <Button color="red" href="/about-us" className="mt-1">
                  Know More About
                </Button>
              </div>

              <div
                className="rs-opportunity__services"
                data-aos="fade-up"
                data-aos-delay="140"
              >
                <p className="rs-opportunity__include">
                  Our web design Dubai services include:
                </p>

                <ol className="rs-opportunity__list">
                  {features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="rs-opportunity__num">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ol>

                <div className="rs-opportunity__visual">
                  <Image
                    src="/assets/img/cpane-laptop.webp"
                    alt="Laptop with web design"
                    width={560}
                    height={390}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACCORDION SECTION
          ===================================================== */}

      <section className="rs-creative-sec pt-0">
        <div className="container-fluid p-0">
          <div className="row g-0 rs-creative-row">
            <div className="col-lg-6 rs-creative-media" data-aos="fade-right">
              <div className="rs-creative-img">
                <Image
                  src="/assets/img/rs-features.webp"
                  alt="Creative design studio"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className="rs-creative-photo"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-6 rs-creative-copy" data-aos="fade-left">
              <div className="rs-creative-content">
                <div className="rs-creative-inner">
                  <div className="rs-creative-heading">
                    <h2 className="rs-process-title rs-creative-title text-start">
                      <span className="rs-title-black">Why Businesses</span>
                      <span className="rs-process-highlight">
                        Choose RedSpider
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
                    </h2>

                    <p className="rs-process-text rs-section-subtitle text-start">
                      We do not use a standard template, as they are not always
                      suitable for long-term business.
                    </p>
                  </div>

                  <div
                    className="rs-creative-accordion accordion"
                    id="rsCreativeAccordion"
                  >
                    {accordionItems.map((item) => (
                      <div className="accordion-item" key={item.id}>
                        <h3 className="accordion-header" id={`${item.id}Heading`}>
                          <button
                            className={`accordion-button ${
                              !item.show ? "collapsed" : ""
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${item.id}`}
                            aria-expanded={item.show}
                            aria-controls={item.id}
                          >
                            <span className="rs-creative-acc-label">
                              {item.title}
                            </span>
                          </button>
                        </h3>

                        <div
                          id={item.id}
                          className={`accordion-collapse collapse ${
                            item.show ? "show" : ""
                          }`}
                          data-bs-parent="#rsCreativeAccordion"
                          aria-labelledby={`${item.id}Heading`}
                        >
                          <div className="accordion-body">{item.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
