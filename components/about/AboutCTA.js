export default function AboutCTA({ data }) {
  // Get data from API or use fallback
  const ctaTitle = data?.cta_title || "Ready to Start Your Next Project?";
  const ctaDescription =
    data?.cta_description ||
    "Tell us about your requirements and discover how the RedSpider team can help bring your next digital project to life.";
  const ctaButtonText = data?.cta_button_text || "View Portfolio";
  const ctaButtonLink = data?.cta_button_link || "/portfolio";

  return (
    <section
      id="readytobuild"
      className="readytobuild section light-background"
    >
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="section-title text-center text-white mb-3">
          <h2 className="fw-bold">{ctaTitle}</h2>
          <p className="rs-subtitle">{ctaDescription}</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
          <a
            href={ctaButtonLink}
            className="btn btn-animation btn-red d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
          >
            <span className="btn-title">{ctaButtonText}</span>
          </a>
          <a
            href="/contact"
            className="btn btn-animation btn-black d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
          >
            <span className="btn-title">Submit Your Details and Get Quote</span>
          </a>
          <a
            href="https://wa.me/971505698733"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-animation btn-green d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
          >
            <span className="btn-title">WhatsApp Us</span>
            <span className="btn-icon-wrap">
              <img
                src="/assets/img/icons/whatsapp.svg"
                alt="WhatsApp icon"
                className="btn-icon"
                loading="lazy"
                width="24"
                height="24"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
