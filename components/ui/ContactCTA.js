const DEFAULT_TITLE = "Ready to build a strong brand identity?";
const DEFAULT_DESCRIPTION =
  "Let RedSpider create a professional logo that represents your business the right way.";

export default function ContactCTA({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  backgroundImage,
  id = "readytobuild",
}) {
  const sectionStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <section className="contact-cta" id={id} style={sectionStyle}>
      <div className="cta-heading">
        <h2 className="rs-process-title">{title}</h2>

        {description && (
          <p className="rs-section-subtitle mx-auto text-center">
            {description}
          </p>
        )}
      </div>

      <div className="cta-wrap">
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

        <a
          className="cta-card green"
          href="https://wa.me/971555515475"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Us"
        >
          <span className="icon-box" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.22 8.22 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.37c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.72 2.92.67.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28-.24-.12-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.53.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.43-1.33-1.67-.14-.25-.01-.38.1-.5.11-.11.24-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14 0-.3-.01-.47-.01z" />
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
