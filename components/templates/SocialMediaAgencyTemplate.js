import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FormAlert from "../ui/FormAlert";
import FormField from "../ui/FormField";
import {
  focusField,
  getFirstErrorField,
  useFormValidation,
  validateAgreement,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateSelect,
} from "../../lib/formValidation";

const WHATSAPP_URL = "https://wa.me/971555515475";
const CONTACT_ANCHOR = "#smo-contact";
const SOCIAL_BLOCK_IMAGE =
  "https://www.moonbox.ae/social-media-agency-in-dubai/assets/images/social-block.png";

const IMG = {
  astronaut: "/assets/img/smo/astronaut.webp",
  glass9: "/assets/img/smo/glass-9.webp",
  glass10: "/assets/img/smo/glass-10.webp",
  glass22: "/assets/img/smo/glass-22.webp",
  proof: "/assets/img/smo/proof-social.webp",
  device1: "/assets/img/smo/device-1.png",
  device2: "/assets/img/smo/device-2.png",
  grid1: "/assets/img/smo/grid-1.png",
  grid2: "/assets/img/smo/grid-2.jpg",
  grid3: "/assets/img/smo/grid-3.jpg",
  grid4: "/assets/img/smo/grid-4.png",
  block: "/assets/img/smo/block.png",
  result1: "/assets/img/smo/result-1.jpg",
  result2: "/assets/img/smo/result-2.png",
  result3: "/assets/img/smo/result-3.jpg",
  grad1: "/assets/img/smo/grad-1.png",
  grad2: "/assets/img/smo/grad-2.png",
};

const FACTS = [
  { value: "14+", label: "Years in Dubai" },
  { value: "100+", label: "Google reviews" },
  { value: "4.9", label: "Google rating" },
  { value: "Full-stack", label: "Creative + performance" },
];

const CAPABILITIES = [
  {
    num: "01",
    title: "Social Media Management",
    body: "Content calendar, copy, design, community management, and reporting. Your brand shows up every week with a clear point of view.",
    tags: ["Instagram", "LinkedIn", "Reporting"],
  },
  {
    num: "02",
    title: "Paid Social & Performance",
    body: "Campaigns on Meta, Instagram, TikTok, LinkedIn, and YouTube. Built for leads, sales, and measurable return — every dirham tracked.",
    tags: ["Meta", "LinkedIn Ads", "ROAS-tuned"],
  },
  {
    num: "03",
    title: "Reels & Video Content",
    body: "Short-form video. Shoot planning, editing, motion, subtitles, and UGC-style content for Instagram, TikTok, and YouTube Shorts.",
    tags: ["Reels", "TikTok", "UGC-style"],
  },
  {
    num: "04",
    title: "Brand & Creative Direction",
    body: "Content pillars, campaign themes, tone of voice, and monthly creative direction so your brand looks the same across feed, ads, and follow-ups.",
    tags: ["Brand voice", "Content pillars", "Creative system"],
  },
  {
    num: "05",
    title: "Search & Demand Capture",
    body: "Search, display, remarketing, and landing pages for buyers already showing intent. Social starts the demand. Search captures it.",
    tags: ["Search", "Landing pages", "Remarketing"],
  },
  {
    num: "06",
    title: "Analytics & Growth",
    body: "Monthly reporting on reach, engagement, traffic, enquiries, and campaign performance. Decisions from data, not guesswork.",
    tags: ["KPIs", "Reporting", "Optimisation"],
  },
];

const PACKAGES = [
  {
    title: "Brand Presence",
    body: "Instagram and LinkedIn content, captions, Reels planning and reporting for a consistent brand presence.",
    image: "/assets/img/smo/package-brand-presence.png",
  },
  {
    title: "Social + Search",
    body: "Reels, paid social, Google Search and landing pages built for enquiries, bookings and sales.",
    image: "/assets/img/smo/package-social-search.png",
  },
  {
    title: "Growth Engine",
    body: "Brand, creative, paid social, search, tracking and reporting working together across every priority platform.",
    image: "/assets/img/smo/package-growth-engine.png",
  },
];

const WHY = [
  {
    title: "Strategy before posting",
    body: "Objectives, audience, and content direction are locked before a single asset goes live.",
    visual: "/assets/img/smo/package-brand-presence.png",
  },
  {
    title: "Creative + technical team",
    body: "Design, web, landing pages, and automation sit with the same Dubai digital team.",
    visual: "/assets/img/smo/package-social-search.png",
  },
  {
    title: "One connected journey",
    body: "Content, ads, landing pages, and WhatsApp planned as one system — not separate calendars.",
    visual: "/assets/img/smo/package-growth-engine.png",
  },
  {
    title: "Built around your brand",
    body: "Typography, colour, and tone stay consistent across feed, stories, and paid creative.",
    visual: "/assets/img/smo/package-social-search.png",
  },
  {
    title: "Clear reporting",
    body: "Reach, engagement, enquiries, and campaign performance reviewed against agreed KPIs.",
    visual: "/assets/img/smo/package-brand-presence.png",
  },
  {
    title: "Dubai-based delivery",
    body: "Fourteen years of digital work with companies operating in Dubai and the wider UAE.",
    visual: "/assets/img/smo/package-growth-engine.png",
  },
];

const CONVERSATION_CARDS = [
  {
    title: "Engage and Interact",
    body: "Build meaningful audience connections with social content designed to inform, invite participation and keep your brand in the conversation.",
  },
  {
    title: "Control and Elevate",
    body: "Manage your social presence with clear direction, consistent delivery and campaigns that elevate how your brand shows up every day.",
  },
  {
    title: "Influence and Connect",
    body: "Turn insight into content that reaches the right people, influences action and creates stronger connections with your audience.",
  },
];

const PLATFORMS = [
  {
    name: "LinkedIn",
    body: "B2B authority, founder voice, case studies, lead forms and decision-maker ads.",
  },
  {
    name: "Instagram",
    body: "Daily attention through Reels, Stories, creators, launches and paid social.",
  },
  {
    name: "Facebook",
    body: "Meta reach, retargeting, communities, lead forms and always-on campaign testing.",
  },
  {
    name: "X",
    body: "Rest commentary, announcements, culture signals and high-frequency brand presence.",
  },
  {
    name: "YouTube",
    body: "Long-form content, Shorts, video ads, remarketing and search-led brand discovery.",
  },
  {
    name: "TikTok",
    body: "Hook-first videos, creator-led formats, testing loops and short-form performance.",
  },
  {
    name: "WhatsApp",
    body: "Direct lead capture, follow-up scripts, nurture flows and sales-team handoff.",
  },
  {
    name: "Google Ads",
    body: "Search intent, display, YouTube, remarketing and conversion-tracked media spend.",
  },
  {
    name: "Google SEO",
    body: "Local search, technical fixes, content systems and compounding organic demand.",
  },
];

const PROCESS = [
  {
    num: "01",
    week: "Week 1",
    title: "Audit",
    body: "Kick-off, audience map, competitor review, current-channel audit and performance goals.",
  },
  {
    num: "02",
    week: "Week 2",
    title: "Plan",
    body: "Content pillars, visual direction, campaign themes, platform mix and first calendar.",
  },
  {
    num: "03",
    week: "Week 3",
    title: "Produce",
    body: "Reels, statics, captions, ads, landing-page hooks and tracking setup.",
  },
  {
    num: "04",
    week: "Week 4",
    title: "Optimise",
    body: "Publishing rhythm, campaign launch, reporting dashboard and the first optimisation cycle.",
  },
];

const TIMELINE = [
  {
    day: "Day 1",
    title: "Kickoff",
    body: "Access, brand brief and working channel opened.",
  },
  {
    day: "Day 2–3",
    title: "Audit",
    body: "Account scan, audience checks and pillars locked.",
  },
  {
    day: "Day 4–5",
    title: "Sprint",
    body: "First statics, reels and captions produced for review.",
  },
  {
    day: "Day 6",
    title: "Approval",
    body: "Feedback round, calendar and formats confirmed.",
  },
  { day: "Day 7", title: "Live", body: "First approved content goes live." },
  {
    day: "Day 14",
    title: "Campaign",
    body: "Paid campaigns launch where the scope includes ads.",
  },
  {
    day: "Day 30",
    title: "Review",
    body: "First optimisation cycle and next-month rhythm.",
  },
];

const INDUSTRIES = [
  {
    title: "Real Estate",
    body: "Project launches, agent content, Reels and WhatsApp enquiries.",
    image: IMG.result1,
  },
  {
    title: "Retail & eCommerce",
    body: "Product grids, catalogue ads, retargeting and sales creatives.",
    image: IMG.grid3,
  },
  {
    title: "Hospitality",
    body: "Food content, offers, seasonal campaigns and location ads.",
    image: IMG.result3,
  },
  {
    title: "Beauty & Lifestyle",
    body: "Editorial creative, Reels, promotions and visually led campaigns.",
    image: IMG.block,
  },
  {
    title: "Healthcare",
    body: "Service awareness, educational content and appointment campaigns.",
    image: IMG.grid2,
  },
  {
    title: "Corporate & B2B",
    body: "LinkedIn, thought leadership and lead-generation campaigns.",
    image: IMG.grid1,
  },
];

const WORK = [
  { title: "Featured campaign", image: IMG.result1, size: "large" },
  { title: "Social grid", image: IMG.grid1, size: "grid" },
  { title: "Feed layout", image: IMG.grid4, size: "grid" },
  { title: "Short-form video", image: IMG.grid2, size: "video" },
  { title: "Paid creative", image: IMG.result3, size: "paid" },
];

const FAQS = [
  {
    q: "What does a social media agency in Dubai actually run?",
    a: "Strategy, content, design, publishing, paid campaigns, community workflows and reporting across the platforms your audience actually uses.",
  },
  {
    q: "Which platforms should we start with?",
    a: "It depends on the audience. Visual brands often start on Instagram and TikTok. B2B and corporate work usually needs LinkedIn first.",
  },
  {
    q: "Can you manage our accounts end to end?",
    a: "Yes. Planning, creative, captions, publishing, campaigns and reporting can sit in one agreed monthly scope.",
  },
  {
    q: "How is performance measured?",
    a: "Reach, engagement, traffic, enquiries, cost per lead and conversions. KPIs are chosen against the commercial goal, not vanity metrics.",
  },
  {
    q: "Can we approve posts before they go live?",
    a: "Yes. An approval workflow can be set so planned content is reviewed before it is scheduled or published.",
  },
  {
    q: "How quickly can we start?",
    a: "Once scope is confirmed we onboard, review the brand and prepare the first calendar for approval before regular publishing begins.",
  },
];

const SERVICE_OPTIONS = [
  { value: "", label: "Service required", disabled: true },
  { value: "Brand Presence", label: "Brand Presence" },
  { value: "Growth & Leads", label: "Growth & Leads" },
  { value: "Full Digital Growth", label: "Full Digital Growth" },
  { value: "Social Media Audit", label: "Free Social Media Audit" },
  { value: "Paid Social Advertising", label: "Paid Social Advertising" },
];

const PLATFORM_ICONS = {
  Instagram: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#igGrad)" />
      <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" />
      <defs>
        <linearGradient id="igGrad" x1="3" y1="21" x2="21" y2="3">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.35" stopColor="#FA7E1E" />
          <stop offset="0.65" stopColor="#D62976" />
          <stop offset="1" stopColor="#962FBF" />
        </linearGradient>
      </defs>
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#0A66C2" />
      <path
        d="M7.2 10h1.9v6.4H7.2V10Zm.95-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM10.7 10h1.8v.9h.03c.25-.47.87-1 1.8-1 1.9 0 2.25 1.25 2.25 2.87v3.63h-1.9v-3.22c0-.77-.02-1.76-1.07-1.76-1.07 0-1.24.84-1.24 1.7v3.28h-1.9V10Z"
        fill="#fff"
      />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <circle cx="12" cy="12" r="9" fill="#1877F2" />
      <path
        d="M13.3 21v-7.2h2.4l.36-2.8h-2.76V9.2c0-.8.22-1.35 1.38-1.35h1.48V5.35c-.26-.03-1.14-.11-2.17-.11-2.15 0-3.62 1.31-3.62 3.72v2.07H8v2.8h2.37V21h2.93Z"
        fill="#fff"
      />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#000" />
      <path
        d="M14.7 8.2c.55.55 1.28.9 2.1.98v1.7c-.9-.02-1.7-.3-2.35-.77v3.5c0 1.98-1.6 3.58-3.58 3.58A3.58 3.58 0 0 1 7.3 13.6c0-1.9 1.46-3.44 3.33-3.57v1.74a1.86 1.86 0 1 0 1.86 1.86V6.9h1.74c.07.46.2.9.47 1.3Z"
        fill="#fff"
      />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" fill="#FF0000" />
      <path d="M10.2 9.6v4.8l4.2-2.4-4.2-2.4Z" fill="#fff" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#0A0A0A" />
      <path
        d="M6.5 6.5h2.1l3.05 4.05L15.2 6.5h2.3l-4.4 5.6 4.7 5.9h-2.1l-3.35-4.25L8.9 18H6.6l4.6-5.85L6.5 6.5Z"
        fill="#fff"
      />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <circle cx="12" cy="12" r="9" fill="#25D366" />
      <path
        d="M12 5.8a6.2 6.2 0 0 0-5.34 9.35L5.8 18.2l3.15-.83A6.2 6.2 0 1 0 12 5.8Zm3.38 8.7c-.15.42-.85.8-1.18.85-.32.05-.72.07-1.16-.07-.27-.09-.6-.2-1.03-.4-1.8-.78-2.96-2.6-3.05-2.72-.09-.12-.72-.96-.72-1.83 0-.87.46-1.3.62-1.48.16-.18.35-.22.47-.22h.34c.11 0 .26-.04.4.31.15.35.5 1.22.54 1.3.04.09.07.19.01.3-.06.12-.09.19-.18.3-.09.11-.18.24-.26.32-.09.09-.18.18-.08.36.11.18.48.79 1.02 1.28.7.62 1.28.82 1.46.9.18.09.29.07.4-.04.11-.11.46-.53.58-.72.12-.18.24-.15.41-.09.17.06 1.07.5 1.26.6.18.09.3.14.35.22.05.09.05.5-.1.92Z"
        fill="#fff"
      />
    </svg>
  ),
  "Google Ads": (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <circle cx="12" cy="12" r="9" fill="#fff" />
      <path
        d="M21 12c0-.7-.06-1.36-.18-2H12v3.8h5.05a4.3 4.3 0 0 1-1.87 2.83v2.35h3.03C19.93 17.2 21 14.8 21 12Z"
        fill="#4285F4"
      />
      <path
        d="M12 21c2.43 0 4.47-.8 5.96-2.17l-3.03-2.35c-.84.57-1.92.9-2.93.9-2.25 0-4.15-1.52-4.83-3.56H4.06v2.42A8.99 8.99 0 0 0 12 21Z"
        fill="#34A853"
      />
      <path
        d="M7.17 13.82A5.4 5.4 0 0 1 6.9 12c0-.63.1-1.25.27-1.82V7.76H4.06A9 9 0 0 0 3 12c0 1.45.34 2.83.96 4.06l3.21-2.24Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.6c1.32 0 2.5.45 3.43 1.34l2.57-2.57C16.46 3.9 14.43 3 12 3A8.99 8.99 0 0 0 4.06 7.76l3.11 2.42C7.85 8.13 9.75 6.6 12 6.6Z"
        fill="#EA4335"
      />
    </svg>
  ),

  "Google SEO": (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        fill="none"
        stroke="#4285F4"
        strokeWidth="2"
      />
      <path
        d="M15.2 15.2 21 21"
        stroke="#34A853"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const INITIAL_FORM = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  website: "",
  service: "",
  comment: "",
  agree_terms_and_policy: true,
};

const FIELD_ORDER = [
  "fullName",
  "company",
  "phone",
  "email",
  "service",
  "comment",
  "agree_terms_and_policy",
];

function getSmoFieldError(name, value) {
  switch (name) {
    case "fullName":
      return validateName(value, "name");
    case "phone":
      return validatePhone(value);
    case "email":
      return validateEmail(value);
    case "service":
      return validateSelect(value, "Choose a service.");
    case "comment":
      return validateMessage(value, "requirements");
    case "agree_terms_and_policy":
      return validateAgreement(value);
    default:
      return "";
  }
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmoOdo({ value }) {
  return (
    <span className="smo-odo" aria-hidden="true">
      {String(value)
        .split("")
        .map((digit, index) => (
          <span
            className="smo-odo__digit"
            key={`${value}-${index}`}
            style={{ "--d": digit }}
          >
            <span className="smo-odo__strip">
              {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
}

function SmoForm() {
  const {
    values,
    handleChange,
    handleBlur,
    showError,
    validateAll,
    applyServerErrors,
    reset,
  } = useFormValidation(INITIAL_FORM, getSmoFieldError);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setStatus({ type: "", message: "" });

    const fieldErrors = validateAll();
    const firstInvalid = getFirstErrorField(fieldErrors, FIELD_ORDER);

    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    setLoading(true);

    try {
      const details = [
        values.comment.trim(),
        values.company.trim() ? `Company: ${values.company.trim()}` : "",
        values.website.trim()
          ? `Website / Social URL: ${values.website.trim()}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      const payload = {
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        country: "United Arab Emirates",
        formSource: "social-media-agency",
        subject: values.service.trim(),
        content: details,
        agree_terms_and_policy: values.agree_terms_and_policy,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          applyServerErrors(result?.errors || {}, {
            name: "fullName",
            content: "comment",
            subject: "service",
          });
          return;
        }

        throw new Error(
          result?.message || "Please check the form details and try again.",
        );
      }

      reset();
      setStatus({
        type: "success",
        message:
          result?.message ||
          "Thank you. Your enquiry has been submitted successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.message || "Failed to submit the form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="smo-form" onSubmit={handleSubmit} noValidate>
      <FormAlert type={status.type} message={status.message} />

      <div className="smo-form-grid">
        <FormField
          id="fullName"
          label="Your name"
          required
          error={showError("fullName")}
        >
          <input
            className="smo-input"
            id="fullName"
            name="fullName"
            placeholder="Full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
          />
        </FormField>

        <FormField id="email" label="Email" required error={showError("email")}>
          <input
            className="smo-input"
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
          />
        </FormField>

        <FormField
          id="phone"
          label="Contact number"
          required
          error={showError("phone")}
        >
          <input
            className="smo-input"
            id="phone"
            name="phone"
            placeholder="+971 50 000 0000"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
          />
        </FormField>

        <FormField id="company" label="Company">
          <input
            className="smo-input"
            id="company"
            name="company"
            value={values.company}
            onChange={handleChange}
            autoComplete="organization"
          />
        </FormField>

        <FormField id="website" label="Website / Social URL" fullWidth>
          <input
            className="smo-input"
            id="website"
            name="website"
            value={values.website}
            onChange={handleChange}
            autoComplete="url"
          />
        </FormField>

        <FormField
          id="service"
          label="Service required"
          required
          error={showError("service")}
          fullWidth
        >
          <select
            className="smo-input"
            id="service"
            name="service"
            value={values.service}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option
                key={option.value || "placeholder"}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="comment"
          label="Tell us about your project"
          required
          error={showError("comment")}
          fullWidth
        >
          <textarea
            className="smo-input smo-input--area"
            id="comment"
            name="comment"
            rows={5}
            placeholder="Which channels are active, what needs to improve, and what result are you targeting?"
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>
      </div>

      <label className="smo-terms">
        <input
          type="checkbox"
          name="agree_terms_and_policy"
          checked={values.agree_terms_and_policy}
          onChange={handleChange}
        />
        I agree to the terms and privacy policy.
      </label>

      <button
        className="smo-btn smo-btn--primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Request a growth plan"}
        <Arrow />
      </button>
    </form>
  );
}

export default function SocialMediaAgencyTemplate() {
  const pageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const root = pageRef.current;

    if (!root) {
      return undefined;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    root.classList.add("smo-ready");

    const markIn = (el) => el.classList.add("is-in");

    if (reduced) {
      root.querySelectorAll(".smo-reveal").forEach(markIn);
      return undefined;
    }

    const boot = window.requestAnimationFrame(() => {
      root.classList.add("smo-booted");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markIn(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    root.querySelectorAll(".smo-reveal").forEach((el) => observer.observe(el));

    const manifestoVisual = root.querySelector(".smo-manifesto__visual");
    const manifestoObserver = manifestoVisual
      ? new IntersectionObserver(
          ([entry]) => {
            manifestoVisual.classList.toggle("is-active", entry.isIntersecting);
          },
          { threshold: 0.28 },
        )
      : null;

    if (manifestoVisual) {
      manifestoObserver.observe(manifestoVisual);
    }

    let parallax = null;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      const stage = root.querySelector(".smo-stage");
      const word = root.querySelector(".smo-bigword__track");

      if (stage) {
        parallax = gsap.to(stage, {
          y: 90,
          rotate: 6,
          ease: "none",
          scrollTrigger: {
            id: "smo-stage-parallax",
            trigger: ".smo-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      if (word) {
        gsap.to(word, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            id: "smo-word-scrub",
            trigger: ".smo-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    return () => {
      window.cancelAnimationFrame(boot);
      observer.disconnect();
      manifestoObserver?.disconnect();
      parallax?.scrollTrigger?.kill();
      parallax?.kill();
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getById("smo-stage-parallax")?.kill();
        window.ScrollTrigger.getById("smo-word-scrub")?.kill();
      }
    };
  }, []);

  return (
    <div className="smo-page" ref={pageRef}>
      <section className="smo-hero">
        <div className="smo-mesh" aria-hidden="true">
          <span className="smo-blob smo-blob--1" />
          <span className="smo-blob smo-blob--2" />
          <span className="smo-blob smo-blob--3" />
          <span className="smo-blob smo-blob--4" />
        </div>
        <div className="smo-grain" aria-hidden="true" />
        <div className="smo-stars" aria-hidden="true">
          <span className="smo-star smo-star--1" />
          <span className="smo-star smo-star--2" />
          <span className="smo-star smo-star--3" />
        </div>

        <div className="smo-bigword" aria-hidden="true">
          <div className="smo-bigword__track">
            <span>REDSPIDER</span>
            <span>REDSPIDER</span>
            <span>REDSPIDER</span>
          </div>
        </div>

        <div className="container smo-hero__content">
          <div className="smo-hero__pitch">
            <h1 className="smo-reveal">
              Social Media Agency Dubai{" "}
              <span className="smo-accent">
                for Content, Campaigns &amp; Growth
              </span>
            </h1>
            <p className="smo-lede smo-reveal smo-d1">
              Work with a Dubai social media team on a practical plan covering
              content, channel priorities, campaigns, and paid media — built to
              turn attention into enquiries.
            </p>
            <div className="smo-actions smo-reveal smo-d2">
              <a className="smo-btn smo-btn--primary" href={CONTACT_ANCHOR}>
                Request a growth plan
                <Arrow />
              </a>
              <Link className="smo-btn smo-btn--ghost" href="/our-portfolio/">
                See our work
                <Arrow />
              </Link>
            </div>
          </div>

          <div className="smo-stage" aria-hidden="true">
            <div className="smo-astro-wrap">
              <Image
                className="smo-astro"
                src={IMG.astronaut}
                alt=""
                width={1200}
                height={800}
                priority
                unoptimized
              />
            </div>
            <div className="smo-cube">
              <div className="smo-cube__inner">
                <span className="smo-face smo-face--front" />
                <span className="smo-face smo-face--back" />
                <span className="smo-face smo-face--right" />
                <span className="smo-face smo-face--left" />
                <span className="smo-face smo-face--top" />
                <span className="smo-face smo-face--bottom" />
              </div>
            </div>
            <span className="smo-ring smo-ring--1" />
            <span className="smo-ring smo-ring--2" />
            <span className="smo-ring smo-ring--3" />
            <span className="smo-dot smo-dot--1" />
            <span className="smo-dot smo-dot--2" />
            <span className="smo-dot smo-dot--3" />
            <svg className="smo-orbit" viewBox="0 0 600 600" fill="none">
              <ellipse
                cx="300"
                cy="300"
                rx="280"
                ry="110"
                transform="rotate(-18 300 300)"
              />
              <ellipse
                cx="300"
                cy="300"
                rx="260"
                ry="80"
                transform="rotate(20 300 300)"
              />
            </svg>
          </div>
        </div>

        <div className="smo-scroll" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <section className="smo-paper smo-capx" id="smo-services">
        <div className="container smo-wrap">
          <div className="smo-head smo-reveal">
            <span className="smo-eye">What you get</span>
            <h2>
              <span className="smo-line">Social, search and creative</span>
              <span className="smo-line">working as one system.</span>
            </h2>
          </div>

          <div className="smo-capx-list">
            {CAPABILITIES.map((item, index) => (
              <a
                className={`smo-capx-row smo-reveal smo-d${(index % 4) + 1}`}
                href={CONTACT_ANCHOR}
                key={item.num}
              >
                <SmoOdo value={item.num} />
                <div className="smo-capx-main">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="smo-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="smo-capx-arrow">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="smo-proof">
        <div className="container smo-wrap smo-proof__grid">
          <div className="smo-proof__copy smo-reveal smo-reveal-l">
            <span className="smo-eye smo-eye--light">
              From scroll to enquiry
            </span>
            <h2>Lead generation needs more than posting.</h2>
            <p>
              Posting is the start, not the strategy. We connect content, paid
              media, landing pages and reporting into one system that delivers
              real leads.
            </p>
            <ul>
              <li>Content people notice</li>
              <li>Demand capture on ads</li>
              <li>Lead-focused reporting</li>
            </ul>
            <a className="smo-btn smo-btn--primary" href={CONTACT_ANCHOR}>
              Build the lead system
              <Arrow />
            </a>
          </div>
          <div className="smo-proof__visual smo-reveal smo-reveal-r">
            <Image
              className="smo-tile smo-tile--a"
              src={IMG.device1}
              alt=""
              width={305}
              height={381}
              unoptimized
            />
            <Image
              className="smo-tile smo-tile--b"
              src={IMG.device2}
              alt=""
              width={353}
              height={203}
              unoptimized
            />
            <Image
              className="smo-tile smo-tile--c"
              src={IMG.proof}
              alt=""
              width={280}
              height={280}
              unoptimized
            />
            <Image
              className="smo-tile smo-tile--d"
              src={IMG.glass22}
              alt=""
              width={220}
              height={220}
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="smo-paper smo-packages" id="smo-packages">
        <div className="container smo-wrap">
          <div className="smo-head smo-reveal">
            <span className="smo-eye">Pick the level</span>
            <h2>Keep the lead-gen standard.</h2>
            <p>
              Some brands need Instagram and LinkedIn handled properly. Others
              need the full growth stack: social, ads, landing pages and
              reporting. Scope follows the outcome.
            </p>
          </div>
          <div className="smo-pkg-grid">
            {PACKAGES.map((pack, index) => (
              <article
                className={`smo-pkg smo-reveal smo-d${index + 1}`}
                key={pack.title}
              >
                <div className="smo-pkg__visual" aria-hidden="true">
                  <Image
                    src={pack.image}
                    alt=""
                    width={256}
                    height={256}
                    unoptimized
                  />
                </div>
                <h3>{pack.title}</h3>
                <p>{pack.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smo-manifesto">
        <div className="container smo-wrap smo-manifesto__inner">
          <div className="smo-manifesto__copy smo-reveal">
            <span className="smo-eye smo-eye--light">Your digital partner</span>
            <h2>RedSpider is a Dubai digital team.</h2>
            <p>
              Fourteen years. Web, branding, ecommerce and performance marketing
              under one roof — so social is never disconnected from the rest of
              the journey.
            </p>
            <div className="smo-statline">
              {FACTS.slice(0, 3).map((fact) => (
                <article key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="smo-manifesto__visual" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element -- external asset with a local fallback */}
            <img
              src="https://go.moonbox.ae/wp-content/themes/moonbox-lp/pages/_shared/assets/brand/shiny-logo-transparent.webp"
              alt=""
              onError={(event) => {
                event.currentTarget.src = IMG.glass22;
              }}
            />
          </div>
        </div>
      </section>

      <section className="smo-paper smo-why">
        <div className="container smo-wrap">
          <div className="smo-head smo-reveal">
            <span className="smo-eye">Why RedSpider</span>
            <h2>Fixed scope. One team. Dubai delivery.</h2>
          </div>
          <div className="smo-why-grid">
            {WHY.map((item, index) => (
              <article
                className={`smo-reveal smo-d${(index % 3) + 1}`}
                key={item.title}
              >
                <div className="smo-why__visual" aria-hidden="true">
                  <Image
                    src={item.visual}
                    alt=""
                    width={256}
                    height={256}
                    unoptimized
                  />
                </div>
                <div className="smo-why__body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smo-paper smo-conversations">
        <div className="container smo-wrap">
          <div className="smo-conversations__head smo-reveal">
            <h2>Strategies That Spark the Conversations</h2>
            <p>
              We connect content, campaigns and community management into a
              practical social strategy that gets your brand seen, heard and
              remembered.
            </p>
            <a className="smo-btn smo-conversations__cta" href={CONTACT_ANCHOR}>
              Connect with us
              <Arrow />
            </a>
          </div>

          <div className="smo-conversations__grid">
            <div
              className="smo-conversations__visual smo-reveal"
              aria-hidden="true"
            >
              <div className="smo-conversations__visual-inner">
                <div className="smo-conversations__visual-rotator">
                  {/* eslint-disable-next-line @next/next/no-img-element -- external asset with a local fallback */}
                  <img
                    src={SOCIAL_BLOCK_IMAGE}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.src = IMG.block;
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="smo-conversations__cards">
              {CONVERSATION_CARDS.map((card, index) => (
                <article
                  className={`smo-reveal smo-d${index + 1}`}
                  key={card.title}
                >
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="smo-pf-section">
        <div className="container smo-wrap">
          <div className="smo-pf-head smo-reveal">
            <span className="smo-pf-eye">Platform focus</span>
            <h2 className="smo-pf-h2">Where attention turns into enquiries.</h2>
            <p className="smo-pf-sub">
              Social, search, messaging and SEO planned as one lead-generation
              system — not separate content calendars.
            </p>
          </div>

          <div className="smo-pf-grid">
            {PLATFORMS.map((item, index) => (
              <article
                className={`smo-pf-card smo-reveal smo-d${(index % 4) + 1}`}
                key={item.name}
              >
                <span className="smo-pf-icon" aria-hidden="true">
                  {PLATFORM_ICONS[item.name] || null}
                </span>
                <div className="smo-pf-body">
                  <h3 className="smo-pf-title">{item.name}</h3>
                  <p className="smo-pf-text">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smo-urg-section">
        <div className="smo-urg-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- external asset */}
          <img
            className="smo-urg-bg__img"
            src="https://go.moonbox.ae/wp-content/themes/moonbox-lp/pages/_shared/assets/quote/floating-man2.webp"
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          {/* Twinkling stars layer */}
          <div className="smo-urg-stars">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="smo-urg-star"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  animationDelay: `${(i % 10) * 0.35}s`,
                  animationDuration: `${2 + (i % 5) * 0.6}s`,
                }}
              />
            ))}
          </div>

          <span className="smo-urg-bg__glow smo-urg-bg__glow--a" />
          <span className="smo-urg-bg__glow smo-urg-bg__glow--b" />
          <span className="smo-urg-bg__grain" />
        </div>

        <div className="container smo-wrap smo-urg-inner">
          <div className="smo-urg-copy smo-reveal">
            <span className="smo-urg-eye">
              <span className="smo-urg-eye__mark" aria-hidden="true" />
              Share of voice
            </span>

            <h2 className="smo-urg-h2">
              <span className="smo-urg-line">
                Every silent day is your competitor&apos;s.
              </span>
            </h2>

            <p className="smo-urg-p">
              <span className="smo-urg-line">
                The brand that shows up every day on social, search, inboxes and
              </span>
              <span className="smo-urg-line">
                DMs wins attention. The one that doesn&apos;t, loses it.
              </span>
            </p>

            <div className="smo-actions smo-urg-actions">
              <a className="smo-btn smo-btn--primary" href={CONTACT_ANCHOR}>
                Claim a planning slot
                <Arrow />
              </a>
              <a className="smo-btn smo-btn--ghost" href={CONTACT_ANCHOR}>
                Or start with an audit
                <Arrow />
              </a>
            </div>

            <div className="smo-urg-meta">
              <span className="smo-urg-meta__dot" aria-hidden="true" />
              <span>Powered by</span>
              <span className="smo-urg-meta__sep" aria-hidden="true" />
              <span>RedSpider</span>
            </div>
          </div>
        </div>
      </section>

      <section className="smo-data-section" id="smo-data">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9 text-center">
              <h2 className="smo-data-heading smo-reveal">
                Data-Driven Decisions,
               
                Dynamic Growth
              </h2>
              <p className="smo-data-intro smo-reveal smo-d1">
                Launch with a data-backed social media marketing service in
                Dubai. We provide businesses and agencies with suitable insights
                to achieve measurable digital growth.
              </p>
            </div>
          </div>

          <div className="row smo-data-row align-items-stretch g-0">
            <div className="col-lg-6 smo-data-media smo-reveal smo-reveal-l">
              <img
                src="https://www.moonbox.ae/social-media-agency-in-dubai/assets/images/engine-1.png"
                alt="Website analytics dashboard"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6 smo-data-body smo-data-body--right smo-reveal smo-reveal-r">
              <h3>Website Optimization</h3>
              <p>
                We offer data-driven social media marketing services in Dubai
                that are designed to optimize your website performance. With a
                focus on lead generation, we help you achieve measurable growth.
              </p>
              <a className="smo-data-btn" href={CONTACT_ANCHOR}>
                Start Now
                <Arrow />
              </a>
            </div>
          </div>

          <div className="row smo-data-row align-items-stretch g-0">
            <div className="col-lg-6 order-lg-2 smo-data-media smo-reveal smo-reveal-r">
              <img
                src="https://www.moonbox.ae/social-media-agency-in-dubai/assets/images/engine-2.png"
                alt="Light trails representing targeted traffic"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6 order-lg-1 smo-data-body smo-reveal smo-reveal-l">
              <h3>Targeted Traffic</h3>
              <p>
                With our data-driven approach to SEO and paid campaigns, we help
                you attract the right audience and convert them into customers.
              </p>
              <a className="smo-data-btn" href={CONTACT_ANCHOR}>
                Boost Visibility
                <Arrow />
              </a>
            </div>
          </div>

          <div className="row smo-data-row align-items-stretch g-0">
            <div className="col-lg-6 smo-data-media smo-reveal smo-reveal-l">
              <img
                src="https://www.moonbox.ae/social-media-agency-in-dubai/assets/images/engine-3.png"
                alt="Stopwatch representing performance"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6 smo-data-body smo-data-body--right smo-reveal smo-reveal-r">
              <h3>Remarkable Performance</h3>
              <p>
                Our social media marketing services in Dubai are also about
                performance. With a focus on tracking, we help you improve your
                marketing campaigns for better growth.
              </p>
              <a className="smo-data-btn" href={CONTACT_ANCHOR}>
                Know More
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rs-faq-sec" className="home-faq rs-faq-sec section py-5">
        <div className="container rs-home-faq-box">
          <div className="text-center mb-3 border-bottom pb-3">
            <h2 className="fw-bold rs-process-title">
              Questions brands usually ask first.
            </h2>

            <p className="rs-section-subtitle mx-auto text-center">
              Get quick answers about our social media services.
            </p>
          </div>

          {FAQS.length > 0 ? (
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id="smoFaqLeft">
                  {FAQS.slice(0, Math.ceil(FAQS.length / 2)).map(
                    (faq, index) => (
                      <div
                        className="accordion-item"
                        key={`left-${faq.q || index}`}
                      >
                        <h3
                          className="accordion-header"
                          id={`smo-faq-left-heading-${index}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#smo-faq-left-${index}`}
                            aria-expanded="false"
                            aria-controls={`smo-faq-left-${index}`}
                          >
                            {faq.q}
                          </button>
                        </h3>

                        <div
                          id={`smo-faq-left-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`smo-faq-left-heading-${index}`}
                          data-bs-parent="#smoFaqLeft"
                        >
                          <div className="accordion-body">{faq.a}</div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="accordion" id="smoFaqRight">
                  {FAQS.slice(Math.ceil(FAQS.length / 2)).map((faq, index) => (
                    <div
                      className="accordion-item"
                      key={`right-${faq.q || index}`}
                    >
                      <h3
                        className="accordion-header"
                        id={`smo-faq-right-heading-${index}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#smo-faq-right-${index}`}
                          aria-expanded="false"
                          aria-controls={`smo-faq-right-${index}`}
                        >
                          {faq.q}
                        </button>
                      </h3>

                      <div
                        id={`smo-faq-right-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`smo-faq-right-heading-${index}`}
                        data-bs-parent="#smoFaqRight"
                      >
                        <div className="accordion-body">{faq.a}</div>
                      </div>
                    </div>
                  ))}
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
    </div>
  );
}
