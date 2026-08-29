import Layout from "./layout/Layout";
import ContactCTA from "./ui/ContactCTA";

export default function FAQPage() {
  const faqs = [
    {
      id: 1,
      question:
        "What information should I prepare before contacting RedSpider about a new project?",
      answer:
        "Before contacting RedSpider, it is helpful to prepare a brief overview of your business, project goals, target audience, required features, preferred timeline and any existing brand materials or reference websites. If everything is not yet defined, the initial discussion can help clarify the requirements.",
    },
    {
      id: 2,
      question: "What happens after I submit a project enquiry to RedSpider?",
      answer:
        "Our team reviews your enquiry and requirements before discussing the project scope, objectives and suitable next steps. Where appropriate, we can then prepare a quotation or proposal based on the agreed requirements.",
    },
    {
      id: 3,
      question: "Can I discuss my requirements before requesting a quotation?",
      answer:
        "Yes. An initial discussion can help us understand your business objectives, project requirements and any specific functionality you may need before a quotation is prepared.",
    },
    {
      id: 4,
      question:
        "What information is normally included in a project quotation or proposal?",
      answer:
        "The exact details depend on the project, but a quotation or proposal may outline the agreed scope, key deliverables, estimated timeline and commercial terms relevant to the requested work. Important exclusions or additional requirements should also be clarified before work begins.",
    },
    {
      id: 5,
      question: "Can a project be divided into phases?",
      answer:
        "Yes, depending on the scope. Larger projects may be planned in phases so that important components can be designed, developed and reviewed in a structured sequence.",
    },
    {
      id: 6,
      question: "Who will communicate with me during my project?",
      answer:
        "Project communication is coordinated by the RedSpider team according to the type and scope of work. Clients are provided with an appropriate point of contact for requirements, feedback, approvals and important project updates.",
    },
    {
      id: 7,
      question: "How are project revisions and feedback handled?",
      answer:
        "Feedback is reviewed against the agreed project scope and incorporated during the relevant design or development stages. The revision process and any applicable scope limitations should be confirmed as part of the project agreement.",
    },
    {
      id: 8,
      question:
        "What happens if my requirements change after the project has started?",
      answer:
        "New requirements can be reviewed to determine their impact on the existing scope, timeline and cost. If a request falls outside the agreed scope, any additional work should be discussed before implementation.",
    },
    {
      id: 9,
      question:
        "What does RedSpider need from the client to keep a project moving?",
      answer:
        "Timely access to required content, branding materials, technical credentials, feedback and approvals can help keep a project moving efficiently. The exact requirements depend on the type of project being delivered.",
    },
    {
      id: 10,
      question:
        "Can my existing brand guidelines and design assets be used in a new project?",
      answer:
        "Yes. Existing logos, brand guidelines, imagery and other approved assets can be reviewed and incorporated where appropriate to maintain consistency with your established brand identity.",
    },
    {
      id: 11,
      question:
        "Can RedSpider work with our internal marketing, IT or management team?",
      answer:
        "Yes. Where required, RedSpider can coordinate with relevant internal stakeholders to gather requirements, review technical considerations, exchange project information and manage approvals.",
    },
    {
      id: 12,
      question:
        "Can RedSpider coordinate with third-party providers involved in my project?",
      answer:
        "Where necessary, project work may involve coordination with third-party providers such as hosting companies, software vendors or other technical services. Responsibilities and required access should be clarified during project planning.",
    },
    {
      id: 13,
      question:
        "Who is responsible for providing content, images and business information?",
      answer:
        "Content responsibilities should be agreed before the project begins. Clients may provide approved text, images and business information, while any additional content-related services required from RedSpider should be included in the agreed scope.",
    },
    {
      id: 14,
      question:
        "What should I check before approving a project for launch or final delivery?",
      answer:
        "Before final approval, clients should review the agreed pages, content, contact information, functionality and other project-specific requirements. Any final corrections should be communicated before launch or handover.",
    },
    {
      id: 15,
      question: "What happens after a project is completed?",
      answer:
        "The post-completion process depends on the agreed project scope. It may include final handover, access information, training or separately agreed technical support and maintenance services.",
    },
    {
      id: 16,
      question: "How can I start a new project with RedSpider?",
      answer:
        "You can contact RedSpider through the website enquiry form or available contact channels and provide an overview of your requirements. Our team can then review the request and discuss the appropriate next steps.",
    },
    {
      id: 17,
      question:
        "Does RedSpider offer its own digital products and business solutions?",
      answer:
        "Yes. In addition to digital services, RedSpider offers business technology solutions including Zivora ONE for CRM and business management and WAPI for WhatsApp-based business communication and automation.",
    },
    {
      id: 18,
      question: "How can I learn more about RedSpider's products?",
      answer:
        "You can explore Zivora ONE and WAPI to learn more about their features and available solutions.",
    },
  ];

  const heroTitle = "Frequently Asked Questions";
  const heroDesc =
    "Find answers to common questions about starting and managing a project with RedSpider.";
  const heroBackground = "";

  const imageUrl = heroBackground
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public"}/storage/${heroBackground}`
    : "";

  const midPoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midPoint);
  const rightFaqs = faqs.slice(midPoint);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Layout>
      <section
        className="rs-inner-hero design-developemnt-hero hero-marquee faq-hero-custom"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "url(/assets/img/re-bg-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rs-hero-overlay" aria-hidden="true"></div>
        <div className="container">
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
                {heroDesc && (
                  <p className="rs-process-text mb-3">{heroDesc}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rs-faq-sec"
        className="home-faq rs-faq-sec section py-5 light-background"
      >
        <div
          className="container"
          style={{
            maxWidth: "1600px",
            background: "#f6f6f6",
            padding: "40px",
            borderRadius: "30px",
          }}
        >
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="accordion" id="faqPageLeft">
                {leftFaqs.map((faq, index) => (
                  <div
                    className="accordion-item"
                    key={`left-${faq.id || index}`}
                  >
                    <h3
                      className="accordion-header"
                      id={`faq-page-left-heading-${index}`}
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-page-left-${index}`}
                        aria-expanded="false"
                        aria-controls={`faq-page-left-${index}`}
                      >
                        {faq.question}
                      </button>
                    </h3>

                    <div
                      id={`faq-page-left-${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`faq-page-left-heading-${index}`}
                      data-bs-parent="#faqPageLeft"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="accordion" id="faqPageRight">
                {rightFaqs.map((faq, index) => (
                  <div
                    className="accordion-item"
                    key={`right-${faq.id || index}`}
                  >
                    <h3
                      className="accordion-header"
                      id={`faq-page-right-heading-${index}`}
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-page-right-${index}`}
                        aria-expanded="false"
                        aria-controls={`faq-page-right-${index}`}
                      >
                        {faq.question}
                      </button>
                    </h3>

                    <div
                      id={`faq-page-right-${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`faq-page-right-heading-${index}`}
                      data-bs-parent="#faqPageRight"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ContactCTA />
    </Layout>
  );
}
