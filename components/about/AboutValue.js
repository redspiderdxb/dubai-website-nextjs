export default function AboutValue() {
  return (
    <section className="re-process py-5">
      <div className="container pt-lg-5">
        <div className="row justify-content-center gx-5">
          <div className="col-lg-4" data-aos="fade-up">
            <h1 className="fs-h3 fw-bold">Creating Digital Experiences that Deliver Real Business Value</h1>
          </div>
          <div className="col-lg-8" data-aos="fade-up">
            <p>
              We're here to help you bring your business and grow it in the
              digital space. Our approach is simple - to
              <strong>design and develop websites</strong> that create
              measurable business value.
            </p>
            <p className="fs-3">
              <em>When you get in touch with us we collaborate with our clients
              and work hard to transform your ideas into reality.</em>
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-lg-5" style={{ maxWidth: '1600px' }}>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <div className="re-process-card">
              <div className="re-process-icon">
                <i className="bi bi-lightbulb" aria-hidden="true"></i>
              </div>
              <span>01</span>
              <h3>Innovation in every project</h3>
              <p>A decade of experience and hundreds of successful projects, we use creative design and modern technology.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="re-process-card">
              <div className="re-process-icon">
                <i className="bi bi-graph-up-arrow" aria-hidden="true"></i>
              </div>
              <span>02</span>
              <h3>Collaborating to build stronger brands</h3>
              <p>We feel it is best to work together. Our designers, developers and strategists are all in the same team.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="re-process-card">
              <div className="re-process-icon">
                <i className="bi bi-laptop" aria-hidden="true"></i>
              </div>
              <span>03</span>
              <h3>Creating unique digital solutions</h3>
              <p>Each project is unique - and so is our approach. We develop bespoke web solutions which elevate your brand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}