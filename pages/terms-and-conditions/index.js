import PolicyPage from "../../components/policy/PolicyPage";

const LAST_UPDATED = "24 November 2026";

const sections = [
  {
    id: "terms-acceptance",
    heading: "Acceptance of these terms",
    paragraphs: [
      "By accessing or using the RedSpider website at redspider.ae, or by engaging RedSpider to deliver any service, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website or our services.",
    ],
  },
  {
    id: "terms-services",
    heading: "Our services",
    paragraphs: [
      "RedSpider provides web design and development, eCommerce, real estate and other web products, mobile app development, branding and logo design, graphic and brochure design, email, SMS and WhatsApp Business solutions, web hosting, search engine optimisation and social media services.",
      "Service descriptions and examples on this website are for general information only. The exact scope of any project is set out in a written proposal or quotation that you approve.",
    ],
  },
  {
    id: "terms-quotes",
    heading: "Quotations, proposals and project scope",
    paragraphs: [
      "Quotations are valid for the period stated on them, and are otherwise valid for 30 days from the date of issue. A project starts once the proposal is accepted in writing and the first payment is received.",
      "Work that falls outside the agreed scope, including significant changes to requirements, additional pages or extra integrations, will be quoted separately and carried out only after you approve the additional cost.",
    ],
  },
  {
    id: "terms-payment",
    heading: "Payments",
    paragraphs: [
      "Payment terms, milestones and amounts are stated in each proposal or invoice. Prices are quoted in UAE Dirhams (AED) and are exclusive of VAT, which is added where applicable.",
      "We reserve the right to pause work or delivery if an invoice is overdue, and to withhold final files, source code and access credentials until all outstanding amounts have been paid in full.",
    ],
  },
  {
    id: "terms-client",
    heading: "Your responsibilities",
    paragraphs: [
      "To allow us to deliver on schedule, you agree to:",
    ],
    items: [
      "provide accurate information, text, images, logos and other content in good time;",
      "give timely feedback and approvals at each stage of the project;",
      "make sure any content you supply does not infringe the rights of third parties or breach any law;",
      "keep login details and access credentials for your accounts secure.",
    ],
  },
  {
    id: "terms-ip",
    heading: "Intellectual property",
    paragraphs: [
      "Once the relevant invoices have been paid in full, ownership of the final deliverables created for you passes to you. Ownership does not extend to third-party materials such as stock images, fonts, plugins, themes or licensed software, which remain subject to their own licences, nor to RedSpider's pre-existing tools, frameworks and know-how.",
      "Unless you tell us otherwise in writing, we may show completed work in our portfolio and marketing materials.",
    ],
  },
  {
    id: "terms-third-party",
    heading: "Hosting, domains and third-party services",
    paragraphs: [
      "Domain names, hosting, email, SMS and WhatsApp messaging, advertising platforms and other third-party services are provided by their respective providers and are subject to their own terms. RedSpider is not responsible for outages, policy changes or fees imposed by those providers.",
    ],
  },
  {
    id: "terms-liability",
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, RedSpider's total liability arising from any service is limited to the fees you paid to RedSpider for that service. We are not liable for indirect or consequential losses, including loss of profit, revenue, data or business opportunity.",
      "Nothing in these terms excludes liability that cannot be excluded under applicable law.",
    ],
  },
  {
    id: "terms-confidentiality",
    heading: "Confidentiality",
    paragraphs: [
      "Each party will keep confidential any non-public information received from the other in connection with a project, and will use it only for the purpose of that project, unless disclosure is required by law.",
    ],
  },
  {
    id: "terms-termination",
    heading: "Termination",
    paragraphs: [
      "Either party may end a project by giving written notice. On termination you will pay for all work completed up to the date of termination, and any non-cancellable third-party costs already incurred. Our refund position is set out in our Refund Policy.",
    ],
  },
  {
    id: "terms-website-use",
    heading: "Use of this website",
    paragraphs: [
      "You agree not to use this website for any unlawful purpose, not to attempt to gain unauthorised access to any part of it, and not to do anything that could interfere with its operation or security.",
    ],
  },
  {
    id: "terms-changes",
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these Terms and Conditions from time to time. The latest version will always be published on this page, with the date of the last update shown above. Changes do not affect projects already agreed in writing unless both parties agree.",
    ],
  },
  {
    id: "terms-law",
    heading: "Governing law",
    paragraphs: [
      "These Terms and Conditions are governed by the laws of the United Arab Emirates. Any dispute arising from them will be subject to the exclusive jurisdiction of the courts of Dubai.",
    ],
  },
  {
    id: "terms-contact",
    heading: "Contact us",
    paragraphs: [
      "If you have any questions about these Terms and Conditions, please contact us at info@redspider.ae or call +971 55 551 5475.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <PolicyPage
      seo={{
        title: "Terms and Conditions | RedSpider Dubai",
        description:
          "Read the RedSpider Terms and Conditions covering our web design, development and digital services, quotations, payments, intellectual property and website use.",
        canonical: "https://www.redspider.ae/terms-and-conditions/",
      }}
      label="Terms & Conditions"
      title="Terms and Conditions"
      lead="These Terms and Conditions set out the rules for using the RedSpider website and for working with RedSpider on web, design and digital projects."
      intro={[
        "Please read these terms carefully before engaging RedSpider or using this website. They apply together with any proposal, quotation or invoice we issue to you.",
      ]}
      sections={sections}
      lastUpdated={LAST_UPDATED}
    />
  );
}
