export default function AboutServices({ data }) {
  // Get data from API or use fallback
  const servicesTitle =
    data?.services_title || "Digital Products and Solutions";
  const servicesDescription =
    data?.services_description ||
    "We offer a wide range of digital products and solutions for every business. Here is what you can get:";
  const servicesList =
    data?.services?.length > 0
      ? data.services
      : [
          {
            icon: "bi-code-square",
            title: "Web Design and Development",
            desc: "We specialize in creating websites that are visually appealing and user-friendly.",
          },
          {
            icon: "bi-hdd-network",
            title: "Web Hosting",
            desc: "We offer secure, reliable, and high-performance web hosting solutions.",
          },
          {
            icon: "bi-palette2",
            title: "Graphic Design",
            desc: "As a leading graphic design company in Dubai, we create eye-catching designs.",
          },
          {
            icon: "bi-vector-pen",
            title: "Logo Design",
            desc: "We create unique, memorable, and professional custom logo designs.",
          },
          {
            icon: "bi-journal-richtext",
            title: "Brochure & Profile Design",
            desc: "We provide creative brochure and company profile design services.",
          },
          {
            icon: "bi-envelope-paper",
            title: "Email Marketing",
            desc: "Our email marketing solutions help you engage customers through effective campaigns.",
          },
          {
            icon: "bi-cart-check",
            title: "Ecommerce Websites",
            desc: "We develop powerful eCommerce websites that are attractive, secure, and easy to manage.",
          },
          {
            icon: "bi-phone",
            title: "Mobile App Development",
            desc: "We build modern Android and iOS mobile applications tailored to your business needs.",
          },
          {
            icon: "bi-graph-up-arrow",
            title: "SEO Agency Dubai",
            desc: "Our SEO specialists create customized digital marketing strategies that improve search rankings.",
          },
        ];

  return (
    <section className="process-section section-space">
      <div className="container" style={{ maxWidth: "1600px" }}>
        <div className="row g-5 align-items-start">
          <div className="col-lg-4 sticky-lg-top process-sticky">
            <h2 className="fs-1 fw-bold">{servicesTitle}</h2>
            <p>{servicesDescription}</p>
            <a href="#" className="rs-company-btn mt-5">
              View Our Services{" "}
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="col-lg-8">
            <div className="process-list">
              {servicesList.map((item, idx) => (
                <div key={idx} className="digital-item">
                  <div className="process-icon">
                    <div className="icon-shape">
                      <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="process-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
