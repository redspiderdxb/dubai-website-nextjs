export default function AboutInfo() {
  return (
    <section className="about-info-sec py-5">
      <div className="container" style={{ maxWidth: "1320px" }}>
        <div className="row mb-5 align-items-start">
          <div className="col-lg-3">
            <span className="about-label"> Who We are </span>
          </div>
          <div className="col-lg-9">
            <h2 className="about-heading">
              <em>
                RedSpider is a professional web development company in Dubai
              </em>
              <br />
              that caters to the needs of every business. Our designers and
              developers have years of experience in web design, mobile
              application, ecommerce and digital marketing.
            </h2>
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
              <div className="stat-box">
                <div className="stat-icon">
                  <i className="bi bi-rocket-takeoff" aria-hidden="true"></i>
                </div>
                <div>
                  <h3>500+</h3>
                  <p>Projects Delivered</p>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">
                  <i className="bi bi-award" aria-hidden="true"></i>
                </div>
                <div>
                  <h3>14+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">
                  <i className="bi bi-stars" aria-hidden="true"></i>
                </div>
                <div>
                  <h3>100+</h3>
                  <p>5 Star Reviews</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="about-image-card">
              <img
                src="assets/img/about-who.png"
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
