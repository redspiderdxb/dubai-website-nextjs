import Button from "../ui/Button";

export default function AboutInfo({ data }) {
  const infoLabel = data?.info_label || "Who We Are";

  const infoHeading =
    data?.info_heading ||
    "We are a team of designers, developers and digital specialists working together to create practical solutions for businesses. Our experience covers website design and development, ecommerce, mobile applications and other digital services, with each project shaped around the client’s requirements.";

  const infoImage = data?.info_image || "/assets/img/about-who.webp";

  const stats =
    data?.stats?.length > 0
      ? data.stats
      : [
          { number: "500+", label: "Projects Delivered" },
          { number: "14+", label: "Years Experience" },
          { number: "100+", label: "5-Star Reviews " },
        ];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";

      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

      return `${baseUrl}${cleanPath}`;
    }

    if (imagePath.startsWith("/")) {
      return imagePath;
    }

    return `/${imagePath}`;
  };

  return (
    <section className="about-info-sec py-5">
      <div className="container">
        <div className="about-who">
          <h2 className="rs-process-title text-start">{infoLabel}</h2>
          <div className="lin_sec"></div>

          <p
            className="rs-section-subtitle text-start"
            dangerouslySetInnerHTML={{
              __html: infoHeading.replace(/\n/g, "<br />"),
            }}
          />

          <div className="letconnect">
            <span>Let's Connect:</span>
            <div className="line"></div>
            <Button color="red" href="/contact-us/">
              Book A Call
            </Button>
          </div>
        </div>

        <div className="row align-items-center gy-5">
          <div className="col-lg-3">
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-box">
                  <div className="stat-icon">
                    <i
                      className={
                        ["bi bi-rocket-takeoff", "bi bi-award", "bi bi-stars"][
                          index % 3
                        ]
                      }
                      aria-hidden="true"
                    ></i>
                  </div>

                  <div>
                    <span className="company_numbers">{stat.number}</span>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-9">
            <div className="about-image-card">
              <img
                src={getImageUrl(infoImage)}
                className="img-fluid"
                alt="RedSpider team and company overview"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
