export default function AboutInfo({ data }) {
  // Get data from API or use fallback
  const infoLabel = data?.info_label || "Who We are";
  const infoHeading = data?.info_heading || "RedSpider is a professional web development company in Dubai that caters to the needs of every business. Our designers and developers have years of experience in web design, mobile application, ecommerce and digital marketing.";
  const infoImage = data?.info_image || "assets/img/about-who.png";
  const stats = data?.stats?.length > 0 ? data.stats : [
    { number: "500+", label: "Projects Delivered" },
    { number: "14+", label: "Years Experience" },
    { number: "100+", label: "5 Star Reviews" },
  ];

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    if (imagePath.includes("storage/")) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost/redspider/public";
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
      return `${baseUrl}${cleanPath}`;
    }
    
    return imagePath;
  };

  return (
    <section className="about-info-sec py-5">
      <div className="container" style={{ maxWidth: "1320px" }}>
        <div className="row mb-5 align-items-start">
          <div className="col-lg-3">
            <span className="about-label">{infoLabel}</span>
          </div>
          <div className="col-lg-9">
            <h2 className="about-heading" dangerouslySetInnerHTML={{ __html: infoHeading.replace(/\n/g, '<br />') }} />
          </div>
        </div>

        <div className="row my-5">
          <div className="col-12">
            <div className="letconnect">
              <span>Let's Connect :</span>
              <div className="line"></div>
              <a href="#">Book A Call</a>
            </div>
          </div>
        </div>

        <div className="row align-items-center gy-5">
          <div className="col-lg-3">
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-box">
                  <div className="stat-icon">
                    <i className={["bi bi-rocket-takeoff", "bi bi-award", "bi bi-stars"][index % 3]} aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3>{stat.number}</h3>
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