// components/contact/ContactHero.js

export default function ContactHero() {
  return (
    <section className="about-hero hero-marquee">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                <span className="rs-process-highlight">
                  Have a Project in Mind?
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
                Let's Talk
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}