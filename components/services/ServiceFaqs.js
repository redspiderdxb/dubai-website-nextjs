export default function ServiceFaqs({
  faqs = [],
  title = "Frequently Asked Questions",
  subtitle = "Find quick answers to common questions about our services.",
  idPrefix = "service",
}) {
  const faqSource = Array.isArray(faqs)
    ? faqs
    : faqs && typeof faqs === "object"
      ? Object.values(faqs)
      : [];

  const items = faqSource.filter((faq) => faq?.question && faq?.answer);
  const midPoint = Math.ceil(items.length / 2);
  const leftFaqs = items.slice(0, midPoint);
  const rightFaqs = items.slice(midPoint);

  const leftId = `${idPrefix}FaqLeft`;
  const rightId = `${idPrefix}FaqRight`;

  return (
    <section id="rs-faq-sec" className="home-faq rs-faq-sec section py-5">
      <div className="container rs-home-faq-box">
        <div className="text-center mb-3 border-bottom pb-3">
          <h2 className="fw-bold rs-process-title">{title}</h2>
          {subtitle ? (
            <p className="rs-section-subtitle mx-auto text-center">{subtitle}</p>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="accordion" id={leftId}>
                {leftFaqs.map((faq, index) => {
                  const panelId = `${idPrefix}-faq-left-${index}`;
                  const headingId = `${idPrefix}-faq-left-heading-${index}`;

                  return (
                    <div
                      className="accordion-item"
                      key={`left-${faq.id || index}`}
                    >
                      <h3 className="accordion-header" id={headingId}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${panelId}`}
                          aria-expanded="false"
                          aria-controls={panelId}
                        >
                          {faq.question}
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        className="accordion-collapse collapse"
                        aria-labelledby={headingId}
                        data-bs-parent={`#${leftId}`}
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="accordion" id={rightId}>
                {rightFaqs.map((faq, index) => {
                  const panelId = `${idPrefix}-faq-right-${index}`;
                  const headingId = `${idPrefix}-faq-right-heading-${index}`;

                  return (
                    <div
                      className="accordion-item"
                      key={`right-${faq.id || index}`}
                    >
                      <h3 className="accordion-header" id={headingId}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${panelId}`}
                          aria-expanded="false"
                          aria-controls={panelId}
                        >
                          {faq.question}
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        className="accordion-collapse collapse"
                        aria-labelledby={headingId}
                        data-bs-parent={`#${rightId}`}
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="mb-0">No frequently asked questions available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
