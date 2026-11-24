import PolicyPage from "../../components/policy/PolicyPage";

const LAST_UPDATED = "24 November 2026";

const sections = [
  {
    id: "refund-scope",
    heading: "Scope",
    paragraphs: [
      "This Refund and Cancellation Policy applies to all services purchased from RedSpider, including web design and development, eCommerce and product builds, mobile apps, branding, design work, hosting, and digital marketing services. It should be read together with our Terms and Conditions and the proposal you approved.",
    ],
  },
  {
    id: "refund-deposits",
    heading: "Deposits and milestone payments",
    paragraphs: [
      "Projects are usually paid in an initial deposit followed by milestone payments. The deposit secures your place in our schedule and covers the planning and discovery work that begins immediately after it is received.",
      "If you cancel before any project work has started, we will refund the deposit less an administrative fee of 10%. Once work has started, deposits and any milestone payments for work completed are non-refundable.",
    ],
  },
  {
    id: "refund-cancellation",
    heading: "Cancelling a project",
    paragraphs: [
      "You may cancel a project at any time by notifying us in writing. When a project is cancelled part-way through, you will be charged for all work completed up to the date of cancellation, together with any non-refundable third-party costs already committed on your behalf. Any payments made in advance of work that has not yet been performed will be refunded, less applicable costs.",
    ],
  },
  {
    id: "refund-revisions",
    heading: "Revisions and dissatisfaction",
    paragraphs: [
      "Each proposal includes the number of revision rounds agreed for the project. We will work with you to resolve concerns within that scope before any refund is considered. Where a deliverable does not match the approved specification, we will correct it at no additional charge. Refunds are not issued for changes in your own preferences once a stage has been approved.",
    ],
  },
  {
    id: "refund-third-party",
    heading: "Domains, hosting and third-party subscriptions",
    paragraphs: [
      "Domain registrations, hosting plans, software licences, SSL certificates, SMS and WhatsApp messaging credits, and similar services are billed to us or activated for you by third-party providers. These are non-refundable once purchased or activated, unless the provider's own policy allows otherwise. Hosting renewals continue until cancelled in writing, in line with the plan you agreed to.",
    ],
  },
  {
    id: "refund-marketing",
    heading: "Digital marketing and advertising spend",
    paragraphs: [
      "Advertising budgets paid to platforms such as Google, Meta, LinkedIn or TikTok are passed on in full and cannot be refunded once they have been spent or committed. Management and campaign fees are charged for the period in which the service is delivered, and are refunded only on a pro-rata basis for any period that has not yet been delivered.",
    ],
  },
  {
    id: "refund-process",
    heading: "How to request a refund",
    paragraphs: [
      "To request a cancellation or refund, please email info@redspider.ae with your company name, the project or invoice reference and the reason for your request. We will confirm receipt within two working days and respond with the outcome in writing.",
      "Approved refunds are paid to the original payment method within 14 working days. Bank transfer and card processing fees may be deducted where they are charged to us.",
    ],
  },
  {
    id: "refund-changes",
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this Refund and Cancellation Policy from time to time. The latest version will always be published on this page, with the date of the last update shown above. Changes will not affect projects already agreed in writing.",
    ],
  },
  {
    id: "refund-contact",
    heading: "Contact us",
    paragraphs: [
      "If you have any questions about refunds or cancellations, please contact us at info@redspider.ae or call +971 55 551 5475.",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <PolicyPage
      seo={{
        title: "Refund and Cancellation Policy | RedSpider Dubai",
        description:
          "Read the RedSpider Refund and Cancellation Policy, covering deposits, milestone payments, cancelled projects, third-party services and how to request a refund.",
        canonical: "https://www.redspider.ae/refund-policy/",
      }}
      label="Refund Policy"
      title="Refund & Cancellation"
      lead="This policy explains when payments are refundable, how project cancellations are handled, and how to request a refund from RedSpider."
      intro={[
        "We want every project to start and finish on clear terms. If anything in this policy is unclear, please speak to us before you pay so we can explain how it applies to your project.",
      ]}
      sections={sections}
      lastUpdated={LAST_UPDATED}
    />
  );
}
