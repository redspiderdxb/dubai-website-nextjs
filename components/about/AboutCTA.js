export default function AboutCTA({ data }) {
  return (
    <section className="contact-cta" id="readytobuild">
      {/* =========================
          HEADING
      ========================= */}
      <div className="cta-heading">
        <h2>Ready to build a strong brand identity?</h2>

        <p>
          Let RedSpider create a professional logo that represents your business
          the right way.
        </p>
      </div>

      {/* =========================
    CTA CARDS
========================= */}

      <div className="cta-wrap">
        {/* CALL */}
        <a className="cta-card" href="tel:+971555515475" aria-label="Call Us">
          <span className="icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>

          <span className="cta-content">
            <span>Speak to an Expert</span>
            <p>Call our team</p>
          </span>

          <span className="dot"></span>
        </a>

        {/* EMAIL */}
        <a
          className="cta-card dark"
          href="mailto:info@redspider.ae"
          aria-label="Send Enquiry"
        >
          <span className="icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </span>

          <span className="cta-content">
            <span>Send an Enquiry</span>
            <p>info@redspider.ae</p>
          </span>

          <span className="dot"></span>
        </a>

        {/* WHATSAPP */}
        <a
          className="cta-card green"
          href="https://wa.me/971555515475"
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp Us"
        >
          <span className="icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.2 9.2 0 0 1-3.8-.9L3 20.5l1.5-5a8.5 8.5 0 1 1 16.5-4z" />
              <path d="M8.2 8.1c.4 3 2.7 5.3 5.7 5.8" />
              <path d="M13.9 13.9l1.5-1.1" />
              <path d="M8.2 8.1l1.1-1.5" />
            </svg>
          </span>

          <span className="cta-content">
            <span>WhatsApp Us</span>
            <p>+971 55 551 5475</p>
          </span>
        </a>
      </div>
    </section>
  );
}
