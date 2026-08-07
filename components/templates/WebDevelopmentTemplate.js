import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function WebDevelopmentTemplate({ data }) {
  // 🔥 Static data - Baad mein backend se replace hoga
  const trustPoints = [
    {
      id: 1,
      title: "Industry Experience Across UAE",
      description:
        "Real Estate, Corporate, Healthcare, Educational, Retail, Service Business sites all over Dubai and the UAE.",
    },
    {
      id: 2,
      title: "Strategic Layout & User Experience",
      description:
        "We develop websites with a clear structure and intuitive navigation that will enhance user engagement.",
    },
    {
      id: 3,
      title: "Conversion-Focused Structure",
      description:
        "Optimized visual flow, Content hierarchy for lead generation, and Clear call to actions.",
    },
    {
      id: 4,
      title: "SEO-Friendly Foundation",
      description:
        "The initial design of a website that is clean, optimized for loading speeds and easy to search.",
    },
    {
      id: 5,
      title: "Custom UI/UX Approach",
      description:
        "The projects are created in accordance with brand requirements and image standards for uniqueness and consistency.",
    },
    {
      id: 6,
      title: "Scalable & Future-Ready",
      description:
        "Flexible design for future updates, integration and business growth.",
    },
    {
      id: 7,
      title: "Transparent Workflow & Timelines",
      description:
        "The benefits of a structured design process are that it will provide clarity all the way from wireframing through to deployment.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <ServiceHero service={data} />

      {/* Features Grid - Dynamic */}
      {data.features?.length > 0 && (
        <section className="re-process py-5 pix-bg">
          <div className="container pt-lg-5" style={{ maxWidth: "1550px" }}>
            <div className="row justify-content-center text-center">
              <div className="col-lg-12" data-aos="fade-up">
                <div className="title-wrap text-start cus-title-ani-1">
                  <h3 className="rs-main-title text-white fw-bold">
                    Our <em>Web Development</em> Services
                  </h3>
                  <p className="cus-20 text-white mb-0">
                    At RedSpider, we offer a wide range of web development
                    services to cater to your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-lg-5" style={{ maxWidth: "1600px" }}>
            <div className="row g-4">
              {data.features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="re-process-card">
                    <div className="re-process-icon">
                      {feature.icon && (
                        <i className={`bi bi-${feature.icon}`}></i>
                      )}
                    </div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="rs-main-title">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Process Accordion - Dynamic */}
      {data.processes?.length > 0 && (
        <section className="archidex-accordion-sec dark-cs-bg dark-background dev-before pt-0">
          <div className="archidex-bg-shape"></div>

          <div className="container" style={{ maxWidth: "1550px" }}>
            <div className="row g-5 align-items-start justify-content-between">
              <div className="col-lg-4">
                <h2 className="archidex-title">
                  <span>Web Design &</span> Development in Dubai
                </h2>

                <ul className="archidex-list">
                  <li className="text-white">
                    <span className="fs-5">
                      Dubai is a web design and development company with
                      extensive experience and track record.
                    </span>
                  </li>
                </ul>

                <div className="letconnect mt-5">
                  <span className="text-white">Let's Connect :</span>
                  <div className="line"></div>
                  <a href="#">Book A Call</a>
                </div>
              </div>

              <div className="col-lg-7 px-lg-5">
                <div className="archidex-small-title">
                  <h6>
                    Our Web <br />
                    Development <br />
                    Process
                  </h6>
                </div>

                <div className="accordion archidex-accordion">
                  {data.processes.map((process, index) => {
                    const isFirst = index === 0;
                    const collapseId = `collapse-${process.id || index}`;
                    const headingId = `heading-${process.id || index}`;

                    return (
                      <div className="accordion-item" key={process.id || index}>
                        <h2 className="accordion-header" id={headingId}>
                          <button
                            className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                            type="button"
                            onClick={() => {
                              document
                                .querySelectorAll(
                                  ".archidex-accordion .accordion-collapse",
                                )
                                .forEach((el) => el.classList.remove("show"));

                              document
                                .querySelectorAll(
                                  ".archidex-accordion .accordion-button",
                                )
                                .forEach((el) => {
                                  el.classList.add("collapsed");
                                  el.setAttribute("aria-expanded", "false");
                                });

                              const target =
                                document.getElementById(collapseId);

                              if (target) {
                                target.classList.add("show");

                                const btn = document
                                  .getElementById(headingId)
                                  ?.querySelector(".accordion-button");

                                if (btn) {
                                  btn.classList.remove("collapsed");
                                  btn.setAttribute("aria-expanded", "true");
                                }
                              }
                            }}
                            aria-expanded={isFirst ? "true" : "false"}
                          >
                            <span className="arch-no">{index + 1}.</span>
                            <span className="arch-name">{process.title}</span>
                            <span className="arch-arrow">↗</span>
                          </button>
                        </h2>

                        <div
                          id={collapseId}
                          className={`accordion-collapse collapse ${
                            isFirst ? "show" : ""
                          }`}
                        >
                          <div className="accordion-body">
                            {process.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery - Dynamic */}
      {data.gallery?.length > 0 && (
        <section className="opposite-gallery-sec py-0">
          <div className="opposite-gallery-sticky">
            <div className="gallery-title-wrap">
              <h2 className="rs-main-title">Our Work</h2>
            </div>
            <div className="gallery-inner">
              <div className="gallery-track top-track">
                {data.gallery.slice(0, 6).map((item) => (
                  <div key={item.id} className={`gallery-card large`}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                      alt={item.title || "Gallery Image"}
                    />
                  </div>
                ))}
              </div>
              <div className="gallery-track bottom-track">
                {data.gallery.slice(6, 12).map((item) => (
                  <div key={item.id} className={`gallery-card large`}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                      alt={item.title || "Gallery Image"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why RedSpider - 🔥 STATIC (Baad mein backend se replace hoga) */}
      <section className="rsu-creative-sec">
        <div className="container-fluid px-lg-5">
          <div className="rsu-scene">
            <span className="rsu-red-line"></span>
            <div className="rsu-content">
              <h2 className="rsu-main-title">
                Why <span> is RedSpider</span> a <br />
                Trustworthy choice for<span> Businesses?</span>
              </h2>
              <div className="rsu-bottom-left">
                <p className="rsu-intro">
                  RedSpider has earned trust by offering top notch services to
                  various businesses in the industry. You can choose us for the
                  following:
                </p>
                <a href="#" className="rsu-btn">
                  View Our Works <i className="bi bi-arrow-up-right"></i>
                </a>
              </div>
              <div className="rsu-accordion-wrap">
                <div className="rsu-mini-title">
                  <span>What we do</span>
                  <i className="bi bi-arrow-down-right"></i>
                </div>
                <div className="accordion" id="rsuBusinessAccordion">
                  {trustPoints.map((point, index) => (
                    <div className="rsu-accordion-item" key={point.id}>
                      <button
                        className={`rsu-accordion-btn ${index === 0 ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#rsu${index + 1}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>{" "}
                        {point.title}
                        <i className="bi bi-plus-lg"></i>
                      </button>
                      <div
                        id={`rsu${index + 1}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent="#rsuBusinessAccordion"
                      >
                        <div className="rsu-accordion-body">
                          {point.description}
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

      {/* Review Section */}
      <section
        id="review-sec"
        className="review-sec section light-background pb-0"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.png"
              alt="Reviews"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* FAQs - Dynamic */}
      {data.faqs?.length > 0 && (
        <section
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section py-5 light-background"
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
              <h2 className="fw-bold">Frequently Asked Questions</h2>
              <p>Find quick answers to common questions about our services.</p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id="homeFaqLeft">
                  {data.faqs
                    .slice(0, Math.ceil(data.faqs.length / 2))
                    .map((faq) => (
                      <div className="accordion-item" key={faq.id}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq${faq.id}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faq${faq.id}`}
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion" id="homeFaqRight">
                  {data.faqs
                    .slice(Math.ceil(data.faqs.length / 2))
                    .map((faq) => (
                      <div className="accordion-item" key={faq.id}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq${faq.id}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faq${faq.id}`}
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <ServiceCTA service={data} />
    </>
  );
}
