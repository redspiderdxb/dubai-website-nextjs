export default function AboutBrands() {
  return (
    <section className="rs-about-company">
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-4">
            <div className="rs-company-left">
              <h2>We've Worked With Amazing Brands</h2>
              <p>We are proud to work with leading government organizations, global enterprises, hospitality brands and growing businesses across the UAE and beyond.</p>
              <a href="#" className="rs-company-btn">
                View Portfolio <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="rs-company-logos">
              <img 
                src="assets/img/Logo_black.png" 
                className="img-fluid" 
                alt="Client logos and partner brands" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}