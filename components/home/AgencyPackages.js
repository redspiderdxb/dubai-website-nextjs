import { useRef } from "react";
import Image from "next/image";
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
                <div className="row g-4 g-xl-5 align-items-center">
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
                      <span className="rs-agency-watermark" aria-hidden="true">
                        01
                      </span>

                      <div className="rs-agency-top">
                        <span>[ 001 ]</span>
                        <small>WEBSITE / DESIGN / DEVELOPMENT</small>
                      </div>

                      <h2 className="rs-process-title rs-process-title-sm text-start">
                        Websites Built Around Your Business
                      </h2>

                      <p className="rs-lead">
                        Businesses or brands can trust RedSpider Digital Agency
                        as their trusted partner. You can get professional
                        website design and web development services at
                        affordable rates. We also offer digital solutions in
                        Dubai and all across the UAE.
                      </p>

                      <p>
                        We will strengthen your online presence and help
                        attract new customers. To achieve sustainable
                        growth, having a modern and user-focused website is
                        highly important. It will promote your brand and
                        help you achieve your business goals.
                      </p>

                      <p>
                        The competition among companies is intense, and if
                        you want to win, focusing on advanced technology and
                        creativity matters.We create visually appealing
                        websites that are fast, reliable and built to
                        deliver high-quality performance.
                      </p>

                      <p>
                        Customers don&apos;t like websites that are slow, but
                        when they have a good browsing experience they spend
                        more time on that website. We make sure that your
                        website functions well, whether it is desktop,
                        tablet or mobile device.
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

                      <p>
                        At RedSpider, we understand that a website should be
                        much more than visually appealing. It should communicate
                        your message to the customers and build trust. If you
                        are launching a new business, it will also enhance your
                        long-term business value.
                      </p>

                      <p>
                        Whether it is the corporate website, an ecommerce
                        platform, or a custom web application, we offer the custom website solutions for businesses across Dubai and the UAE. Customers&apos; digital
                        experience will improve when you have a website with an
                        outstanding design and reliable functionality.
                      </p>

                      <p>
                        When websites become old, they have many issues, but
                        with us you don&apos;t need to worry. We can{" "}
                        <strong>redesign your existing website</strong> and help
                        grow your digital presence.
                      </p>

                      <p>
                        <strong>Our experienced website</strong> designers and
                        web developers will create customized solutions that
                        align with your business goals. Your search ends here,
                        as RedSpider is the trusted choice for any business
                        looking for a reliable website design and development
                        service in Dubai and UAE.
                      </p>
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
                <div className="row g-4 g-xl-5 align-items-center">
                  <div className="col-lg-7">
                    <div className="rs-agency-content">
                      <span className="rs-agency-watermark" aria-hidden="true">
                        02
                      </span>

                      <div className="rs-agency-top">
                        <span>[ 002 ]</span>
                        <small>USER EXPERIENCE / PERFORMANCE / GROWTH</small>
                      </div>

                      <h2 className="rs-process-title rs-process-title-sm text-start">
                        Building Digital Experiences That Help Businesses Grow
                      </h2>

                      <p className="rs-lead">
                        A successful website is more than just a digital
                        presence. It should be easy to use, fast to load,
                        mobile-friendly and built to turn visitors into
                        potential customers.
                      </p>

                      <p>
                        We focus on creating smooth digital experiences that
                        make it easy for customers to find information,
                        explore your offerings and take the next step. Every
                        element is planned with usability, clarity and
                        performance in mind.
                      </p>

                      <p>
                        From mobile-friendly layouts and optimized page
                        performance to clear navigation and strong calls to
                        action, our approach helps businesses create
                        websites that are easier to use and more effective
                        at generating enquiries.
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

                      <p>
                        A strong digital presence also builds credibility. By
                        combining a professional interface, reliable performance
                        and a clear customer journey, we help businesses create
                        a website that can support their current goals while
                        remaining ready to scale as the business grows.
                      </p>
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
                <div className="row g-4 g-xl-5 align-items-center">
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
                      <span className="rs-agency-watermark" aria-hidden="true">
                        03
                      </span>

                      <div className="rs-agency-top">
                        <span>[ 003 ]</span>
                        <small>LOCATIONS / DUBAI / UAE</small>
                      </div>

                      <h2 className="rs-process-title rs-process-title-sm text-start">
                        Working With Businesses Across Dubai &amp; the UAE
                      </h2>

                      <p className="rs-lead">
                        RedSpider provides professional website design and web
                        development services across Dubai, Sharjah and the UAE.
                        Our experienced team works with startups, SMEs,
                        corporate businesses and enterprises, delivering modern
                        websites that help businesses grow online.
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

      <section className="rs-packages-sec bluelight-backgroun section">
        <div className="container rs-packages-container">
          <div className="row g-5 align-items-stretch">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="rs-left-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="rs-join">CREATING GREAT OPPORTUNITIES</span>

                  <hr />

                  <span className="rs-left-heading mt-4">
                    We help Making your dream into Reality
                  </span>
                </div>

                <div className="google-box my-2">
                  <Image
                    src="/assets/img/google-h.webp"
                    alt="Google rating"
                    className="img-fluid"
                    width={200}
                    height={60}
                    sizes="(max-width: 768px) 70vw, 200px"
                    loading="lazy"
                    style={{ width: "100%", height: "auto", maxWidth: "200px" }}
                  />
                </div>

                <div className="quick-contect">
                  <small>RedSpider is rated</small>

                  <p>4.9 Stars</p>

                  <small>
                    based on 100+ reviews in Google Business listing.
                  </small>
                </div>

                <div className="rs-arrow-btn mt-4">
                  <span>
                    <a href="/contact-us">
                      <Image
                        src="/assets/img/arrow-icon-40.svg"
                        alt="Contact us"
                        className="arrow-40deg-icon"
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="900"
                >
                  <div className="p-2">
                    <div className="section-title text-start mb-0">
                      <h2 className="rs-process-title rs-process-title-sm" data-aos="fade-up">
                        Experience and Expertise Behind RedSpider
                      </h2>

                      <p className="text-dark mt-4 rs-section-subtitle text-start" data-aos="fade-up">
                        RedSpider has become a trusted choice for website design
                        in Dubai as we have 14 years of experience in the
                        industry. We have completed 500+ successful projects and
                        continue to help businesses strengthen their online
                        presence. Our web designers are highly skilled who are
                        helping various businesses have a strong online
                        presence. Our experienced web designers create new
                        websites and improve existing ones with a strong focus
                        on design, usability and performance. Your website will
                        look visually appealing and that helps grow your
                        business over time.
                      </p>

                      <p className="text-dark mt-4" data-aos="fade-up">
                        <strong>Our web design Dubai services include:</strong>
                      </p>

                      <Button
                        color="red"
                        href="/about-us"
                        className="mt-4"
                        data-aos="fade-up"
                        data-aos-delay="550"
                      >
                        Know More About
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-6"
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="1000"
                >
                  <div className="rs-card">
                    <ul>
                      {features.map((feature, idx) => (
                        <li
                          key={idx}
                          data-aos="fade-left"
                          data-aos-delay={400 + idx * 50}
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="liimg mt-5"
                      data-aos="zoom-in"
                      data-aos-delay="700"
                      data-aos-duration="1000"
                    >
                      <Image
                        src="/assets/img/cpane-laptop.webp"
                        className="img-fluid"
                        alt="Laptop with web design"
                        width={500}
                        height={350}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  </div>
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
