// components/services/ServiceBody.js

export default function ServiceBody() {
  const services = [
    {
      icon: "bi-laptop",
      title: "Web Design & Development",
      desc: "Grow your business online with a professional web or enhance your online presence with creative & responsive website design Dubai.",
    },
    {
      icon: "bi-database-gear",
      title: "Content Management System",
      desc: "Manage and update your website in-house without the expense of continually using a Web Design Company in Dubai for content management.",
    },
    {
      icon: "bi-bag-check",
      title: "E-Commerce Solution",
      desc: "Grow your business into new markets, create a virtual E-Commerce store, run your business transactions 24/7.",
    },
    {
      icon: "bi-wordpress",
      title: "WordPress Development",
      desc: "We are a professional WordPress and PHP development company with a team of skilled developers.",
    },
    {
      icon: "bi-palette2",
      title: "WordPress Theme Development",
      desc: "We have experience in developing plugins and themes for WordPress, customizing and extending the functionality of existing WordPress sites.",
    },
    {
      icon: "bi-window-desktop",
      title: "Landing Page Web Design",
      desc: "Get an eye-catching landing page, lead capture page, and squeeze page helps to increase conversions, convert more traffic, and helps in generating leads on your website.",
    },
  ];

  const galleryImages = [
    "logo1.jpg",
    "logo2.jpg",
    "logo3.jpg",
    "logo4.jpg",
    "logo5.jpg",
    "logo6.jpg",
    "logo7.jpg",
    "logo8.jpg",
    "logo9.jpg",
    "logo10.jpg",
    "logo11.jpg",
    "logo12.jpg",
  ];

  const faqs = [
    {
      id: "homeFaq1",
      q: "Why is my current website not generating leads?",
      a: "Many websites fail because they lack clear structure, strong call-to-actions, and proper user flow. A website should guide visitors step-by-step toward enquiry or purchase instead of just displaying information.",
    },
    {
      id: "homeFaq2",
      q: "How long does it take to complete a website design project in Dubai?",
      a: "Timelines depend on content readiness and project complexity. Standard business websites usually take 2–4 weeks, while advanced e-commerce platforms may require additional time for integrations and testing.",
    },
    {
      id: "homeFaq3",
      q: "Why does website cost vary so much between agencies?",
      a: "Pricing differs based on design customization, functionality, CMS selection, integrations, performance optimization, and long-term scalability. Template-based websites cost less, while custom-built solutions require more planning and execution.",
    },
    {
      id: "homeFaq4",
      q: "Will the website work properly on mobile devices?",
      a: "Yes. Modern website design must be fully responsive. Layouts automatically adapt to mobile screens to ensure usability, readability, and performance across devices.",
    },
    {
      id: "homeFaq5",
      q: "What happens if content is not ready?",
      a: "Content planning is part of the web design process. Structure, layout, and content hierarchy can be planned first, while copywriting and visuals are prepared in parallel.",
    },
    {
      id: "homeFaq6",
      q: "Can an existing website be redesigned without losing SEO?",
      a: "Yes. We carefully design the URL structure for your website and make use of SEO strategies so it doesn't fall on the ranking list.",
    },
    {
      id: "homeFaq7",
      q: "Why is website speed important for business growth?",
      a: "When the website loads faster it keeps the visitors engaged for a longer time. It will also retain the ranking of your website and give a good impression to first time visitors.",
    },
  ];

  return (
    <>
      {/* Services Grid */}
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
            {services.map((s, i) => (
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

      {/* Accordion Section */}
      <section className="archidex-accordion-sec dark-cs-bg dark-background dev-before pt-0">
        <div className="archidex-bg-shape"></div>
        <div className="container" style={{ maxWidth: "1550px" }}>
          <div className="row g-5 align-items-start justify-content-between">
            {/* Left Side */}
            <div className="col-lg-4">
              <h2
                className="archidex-title"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <span>Web Design &</span> Development in Dubai
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
                    Dubai is a web design and development company with extensive
                    experience and track record that ensures your brand connects
                    meaningfully with your customers. Our approach looks beyond
                    immediate business needs to frame your project as an ongoing
                    extension of your Brand's core promise. Our diverse range
                    services include responsive web design, website development,
                    branding & SEO.
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
                  href="#"
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="700"
                >
                  Book A Call
                </a>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-lg-7 px-lg-5">
              <div
                className="archidex-small-title"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                <h6>
                  Our Web <br />
                  Development
                  <br />
                  Process
                </h6>
              </div>

              <div
                className="accordion archidex-accordion"
                id="archidexAccordion"
              >
                {[
                  "Requirement Analysis",
                  "Wireframe & Layout Planning",
                  "UI/UX Design",
                  "Responsive Development",
                  "Testing & Optimization",
                ].map((step, idx) => (
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
                        {idx === 0 &&
                          "We analyze your business goals, target audience, and technical needs to create a clear project roadmap."}
                        {idx === 1 &&
                          "We structure strategic wireframes to define user flow, content hierarchy, and seamless navigation."}
                        {idx === 2 &&
                          "We craft visually engaging and intuitive interfaces that enhance user experience and strengthen your brand identity."}
                        {idx === 3 &&
                          "We implement responsive designs that adapt seamlessly to various devices and screen sizes, ensuring optimal user experience."}
                        {idx === 4 &&
                          "We conduct thorough testing and optimization to ensure your website performs flawlessly across all devices and browsers."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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

      {/* FAQ Section */}
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
                {faqs.slice(0, 5).map((f, i) => (
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
                {faqs.slice(5, 10).map((f, i) => (
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

      {/* Review Section */}
      <section
        id="review-sec"
        className="review-sec section light-background pb-0"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.png"
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
