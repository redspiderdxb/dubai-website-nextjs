// components/services/ServiceCTA.js

export default function ServiceCTA({ service }) {
  // 🔥 Backend se data le rahe hain
  const {
    cta_title = "Ready to build a strong brand identity?",
    cta_description = "Let RedSpider create a professional logo that represents your business the right way.",
    cta_button_text = "Schedule Free Consultation",
    cta_button_link = "#",
    cta_background = "",
  } = service || {};

  return (
    <section
      id="readytobuild"
      className="readytobuild section light-background pt-0"
      style={{
        backgroundImage: cta_background
          ? `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${cta_background})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="section-title text-center text-white mb-3">
          <h2 className="fw-bold">{cta_title}</h2>
          {cta_description && <p className="rs-subtitle">{cta_description}</p>}
        </div>
      </div>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
          <a
            href={cta_button_link || "#"}
            className="btn btn-animation btn-red d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
          >
            <span className="btn-title">{cta_button_text}</span>
            <span className="btn-icon-wrap">
              <img
                src="/assets/img/icons/cc-icon.svg"
                alt="Schedule consultation icon"
                className="btn-icon"
                loading="lazy"
                width="24"
                height="24"
              />
            </span>
          </a>
          <a
            href="#"
            className="btn btn-animation btn-black d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
          >
            <span className="btn-title">Call Now</span>
            <span className="btn-icon-wrap">
              <img
                src="/assets/img/icons/phone.svg"
                alt="Phone icon"
                className="btn-icon"
                loading="lazy"
                width="24"
                height="24"
              />
            </span>
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
