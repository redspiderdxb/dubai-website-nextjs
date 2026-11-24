import PolicyPage from "../../components/policy/PolicyPage";

const LAST_UPDATED = "24 November 2026";

const sections = [
  {
    id: "cookies-what",
    heading: "What are cookies?",
    paragraphs: [
      "Cookies are small text files that a website stores on your device when you visit it. They are widely used to make websites work, to improve how they perform and to provide information to the site owner. Some cookies are removed when you close your browser, while others remain for a set period.",
    ],
  },
  {
    id: "cookies-how-we-use",
    heading: "How we use cookies",
    paragraphs: [
      "RedSpider uses cookies and similar technologies to keep the website working, to understand how visitors use it, and to improve our content and services. We do not use cookies to identify you personally unless you have given us your details through a form.",
    ],
  },
  {
    id: "cookies-types",
    heading: "Types of cookies we use",
    paragraphs: [
      "The cookies used on this website generally fall into the following categories:",
    ],
    items: [
      "Essential cookies: needed for core functions such as page navigation, security and remembering your basic settings. The website cannot work properly without them.",
      "Analytics cookies: used by Google Analytics to measure visits, understand which pages are popular and identify ways to improve the site. This information is aggregated and does not directly identify you.",
      "Functional cookies: help remember choices you make on the site, such as form inputs, to give you a smoother experience.",
    ],
  },
  {
    id: "cookies-third-party",
    heading: "Third-party cookies",
    paragraphs: [
      "Some cookies are set by third parties whose services appear on our pages, such as Google Analytics, embedded videos, maps and social media content. These providers control their own cookies, and you should review their privacy and cookie policies to understand how they use the data they collect.",
    ],
  },
  {
    id: "cookies-manage",
    heading: "Managing your cookie preferences",
    paragraphs: [
      "Most web browsers accept cookies by default, but you can change your settings to block or delete cookies at any time. You can usually find these options in the privacy or security section of your browser. Please note that blocking essential cookies may stop parts of this website from working correctly.",
      "To opt out of Google Analytics specifically, you can install the Google Analytics Opt-out Browser Add-on available from Google.",
    ],
  },
  {
    id: "cookies-retention",
    heading: "How long cookies stay on your device",
    paragraphs: [
      "Session cookies expire when you close your browser. Persistent cookies remain for a period set by the provider, which can range from a few minutes to several years depending on their purpose.",
    ],
  },
  {
    id: "cookies-changes",
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this Cookie Policy when we change the cookies we use or for legal or operational reasons. The latest version will always be published on this page, with the date of the last update shown above.",
    ],
  },
  {
    id: "cookies-contact",
    heading: "Contact us",
    paragraphs: [
      "If you have any questions about our use of cookies, please contact us at info@redspider.ae or call +971 55 551 5475. For details of how we handle your personal information more generally, please read our Privacy Policy.",
    ],
  },
];

export default function CookiePolicy() {
  return (
    <PolicyPage
      seo={{
        title: "Cookie Policy | RedSpider Dubai",
        description:
          "Learn how RedSpider uses cookies on redspider.ae, the types of cookies we set, including Google Analytics, and how you can manage your cookie preferences.",
        canonical: "https://www.redspider.ae/cookie-policy/",
      }}
      label="Cookie Policy"
      title="Cookie Policy"
      lead="This Cookie Policy explains what cookies are, which ones we use on redspider.ae, and how you can control them."
      intro={[
        "By continuing to use this website, you agree to the use of cookies as described here. You can change your preferences at any time using your browser settings.",
      ]}
      sections={sections}
      lastUpdated={LAST_UPDATED}
    />
  );
}
