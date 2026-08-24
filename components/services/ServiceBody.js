export default function ServiceBody({ service }) {
  if (!service) return null;

  // 🔥 Services Grid - API se features se generate hoga
  const servicesGrid =
    service.features?.length > 0
      ? service.features.map((feature) => ({
          icon: feature.icon || "bi-laptop",
          title: feature.title,
          desc: feature.description,
        }))
      : [];

  // 🔥 Gallery Images - Static rahega ya API se aayega
  const galleryImages = [
    "logo1.webp",
    "logo2.webp",
    "logo3.webp",
    "logo4.webp",
    "logo5.webp",
    "logo6.webp",
    "logo7.webp",
    "logo8.webp",
    "logo9.webp",
    "logo10.webp",
    "logo11.webp",
    "logo12.webp",
  ];

  // 🔥 FAQs - API se aayega
  const faqs =
    service.faqs?.length > 0
      ? service.faqs.map((faq, index) => ({
          id: `faq_${index}`,
          q: faq.question,
          a: faq.answer,
        }))
      : [];

  // 🔥 Processes - API se aayega
  const processes =
    service.processes?.length > 0
      ? service.processes.map((process) => process.title)
      : [
          "Requirement Analysis",
          "Wireframe & Layout Planning",
          "UI/UX Design",
          "Responsive Development",
          "Testing & Optimization",
        ];

  // 🔥 Process Descriptions
  const processDescriptions =
    service.processes?.length > 0
      ? service.processes.map((process) => process.description)
      : [
          "We analyze your business goals, target audience, and technical needs to create a clear project roadmap.",
          "We structure strategic wireframes to define user flow, content hierarchy, and seamless navigation.",
          "We craft visually engaging and intuitive interfaces that enhance user experience and strengthen your brand identity.",
          "We implement responsive designs that adapt seamlessly to various devices and screen sizes, ensuring optimal user experience.",
          "We conduct thorough testing and optimization to ensure your website performs flawlessly across all devices and browsers.",
        ];

  return (
    <>
      {/* 🔥 Services Grid - Dynamic from API */}
      {servicesGrid.length > 0 && (
        <section className="re-process py-5 pix-bg">
          <div className="container pt-lg-5" style={{ maxWidth: "1550px" }}>
            <div className="row justify-content-center text-center">
              <div className="col-lg-12" data-aos="fade-up">
                <div className="title-wrap text-start cus-title-ani-1">
                  <h3 className="rs-main-title text-white fw-bold">
                    Our <em>{service.name || "Web Development"}</em> Services
                  </h3>
                  <p className="cus-20 text-white mb-0">
                    {service.description ||
                      "At RedSpider, we offer a wide range of web development services to cater to your needs."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-lg-5" style={{ maxWidth: "1600px" }}>
            <div className="row g-4">
              {servicesGrid.map((s, i) => (
                <div
                  key={i}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="re-process-card">
                    <div className="re-process-icon">
                      <i className={`bi ${s.icon}`} aria-hidden="true"></i>
                    </div>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="rs-main-title">{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🔥 Accordion Section - Dynamic Processes */}
      <section className="archidex-accordion-sec dark-cs-bg dark-background dev-before pt-0">
        <div className="archidex-bg-shape"></div>
        <div className="container" style={{ maxWidth: "1550px" }}>
          <div className="row g-5 align-items-start justify-content-between">
            <div className="col-lg-4">
              <h2
                className="archidex-title"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <span>{service.intro_small_heading || "Web Design &"}</span>{" "}
                {service.intro_main_heading || "Development in Dubai"}
              </h2>
              <ul className="archidex-list">
                <li
                  className="text-white"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="700"
                  data-aos-once="true"
                >
                  <span className="fs-5">
                    {service.intro_description ||
                      "Dubai is a web design and development company with extensive experience and track record that ensures your brand connects meaningfully with your customers."}
                  </span>
                </li>
              </ul>
              <div
                className="letconnect mt-5"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <span
                  className="text-white"
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
                  href={service.cta_button_link || "#"}
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="700"
                >
                  {service.cta_button_text || "Book A Call"}
                </a>
              </div>
            </div>

            <div className="col-lg-7 px-lg-5">
              <div
                className="archidex-small-title"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                <h6>
                  Our <br />
                  {service.name || "Web Development"}
                  <br />
                  Process
                </h6>
              </div>

              <div
                className="accordion archidex-accordion"
                id="archidexAccordion"
              >
                {processes.map((step, idx) => (
                  <div
                    className="accordion-item"
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${idx + 1}`}
                        aria-expanded={idx === 0 ? "true" : "false"}
                      >
                        <span className="arch-no">{idx + 1}.</span>
                        <span className="arch-name">{step}</span>
                        <span className="arch-arrow">↗</span>
                      </button>
                    </h2>
                    <div
                      id={`collapse${idx + 1}`}
                      className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                      data-bs-parent="#archidexAccordion"
                    >
                      <div className="accordion-body">
                        {processDescriptions[idx] || "Process description"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 Gallery Section - Static */}
      <section
        className="opposite-gallery-sec py-0"
        style={{ padding: "50px 0", background: "#f9f9f9" }}
      >
        <div className="opposite-gallery-sticky">
          <div
            className="gallery-title-wrap"
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <h2
              className="rs-main-title"
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            >
              Our Work
            </h2>
          </div>

          <div
            className="gallery-inner"
            style={{ display: "block", width: "100%" }}
          >
            <div
              className="gallery-track top-track"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              {galleryImages.slice(0, 6).map((img, i) => (
                <div
                  key={i}
                  className={`gallery-card ${i % 3 === 0 ? "large" : i % 3 === 1 ? "" : "small"}`}
                  style={{
                    width:
                      i % 3 === 0 ? "300px" : i % 3 === 2 ? "180px" : "240px",
                    height: "200px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={`/assets/img/logo-ser/${img}`}
                    alt={`Gallery image ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div
              className="gallery-track bottom-track"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {galleryImages.slice(6, 12).map((img, i) => (
                <div
                  key={i}
                  className={`gallery-card ${i % 3 === 0 ? "small" : i % 3 === 1 ? "large" : ""}`}
                  style={{
                    width:
                      i % 3 === 0 ? "180px" : i % 3 === 1 ? "300px" : "240px",
                    height: "200px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={`/assets/img/logo-ser/${img}`}
                    alt={`Gallery image ${i + 7}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FAQ Section - Dynamic from API */}
      {faqs.length > 0 && (
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
                  {faqs.slice(0, Math.ceil(faqs.length / 2)).map((f, i) => (
                    <div className="accordion-item" key={i}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${f.id}`}
                          aria-expanded="false"
                        >
                          {f.q}
                        </button>
                      </h2>
                      <div
                        id={f.id}
                        className="accordion-collapse collapse"
                        data-bs-parent="#homeFaqLeft"
                      >
                        <div className="accordion-body">{f.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion" id="homeFaqRight">
                  {faqs.slice(Math.ceil(faqs.length / 2)).map((f, i) => (
                    <div className="accordion-item" key={i}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${f.id}`}
                          aria-expanded="false"
                        >
                          {f.q}
                        </button>
                      </h2>
                      <div
                        id={f.id}
                        className="accordion-collapse collapse"
                        data-bs-parent="#homeFaqRight"
                      >
                        <div className="accordion-body">{f.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 🔥 Review Section - Static */}
      <section
        id="review-sec"
        className="review-sec section light-background pb-0"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.webp"
              alt="Google reviews and client testimonials"
              className="img-fluid"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
