// components/contact/ContactHero.js

export default function ContactHero({ data }) {
  const heroTitle =
    data?.hero_title || "Have a Project in Mind? Let's Talk";

  return (
    <section className="rs-contact-hero rs-contact-hero-video">
      {/* VIDEO BACKGROUND */}
      <video
        className="rs-contact-hero-video__bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/assets/videos/contact-hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* BLACK OVERLAY */}
      <div className="rs-contact-hero-video__overlay"></div>

      {/* EXISTING CONTENT */}
      <div className="container rs-contact-hero-video__content">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                <span className="rs-process-highlight">
                  {heroTitle}

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
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}