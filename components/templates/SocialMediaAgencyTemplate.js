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

const CONTACT_ANCHOR = "/contact-us";
const SOCIAL_BLOCK_IMAGE = "/assets/img/smo/social-block.png";

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
    title: "Social Media Strategy",
    body: "We build a clear social media roadmap based on your business, audience, competitors and marketing objectives. From platform selection and content pillars to campaign themes and publishing frequency, everything starts with a structured strategy.",
  },
  {
    num: "02",
    title: "Social Media Management",
    body: "Let our team manage your day-to-day social media presence. We plan calendars, prepare content, schedule approved posts and maintain a consistent brand presence across your selected channels.",
  },
  {
    num: "03",
    title: "Creative Content & Graphic Design",
    body: "Strong social media starts with content people actually want to look at. Our creative team develops social posts, campaign visuals, carousels, stories, promotional graphics and branded content designed specifically for digital platforms.",
  },
  {
    num: "04",
    title: "Reels & Short-Form Video",
    body: "Short-form video has become one of the most important formats for reaching and engaging audiences. We help businesses develop creative concepts for Reels, TikTok videos, YouTube Shorts, product videos and promotional campaigns. Our services can include concept planning, script direction, editing, motion graphics, subtitles and platform-ready video formats.",
  },
  {
    num: "05",
    title: "Paid Social Media Advertising",
    body: "Reach potential customers beyond your existing followers. RedSpider plans and manages targeted advertising campaigns across Meta and other social platforms to support:",
  },
  {
    num: "06",
    title: "Community Management",
    body: "Social media should create conversations, not just impressions. We help businesses maintain an active presence by managing comments, basic audience interaction and communication workflows according to an agreed brand guideline.",
  },
  {
    num: "07",
    title: "Campaign & Promotion Management",
    body: "Launching a new product, property, service or seasonal promotion? We create campaign concepts that bring your creative content, advertising and calls to action together under one consistent message.",
  },
  {
    num: "08",
    title: "Analytics & Monthly Reporting",
    body: "We track what is performing and what needs improvement. Monthly reporting can cover reach, engagement, clicks, enquiries, campaign performance, audience behaviour and other agreed KPIs. Instead of guessing what works, we use real campaign data to continuously improve the strategy.",
  },
];

const PACKAGES = [
  {
    title: "Brand Presence",
    body: "For companies that need a professional and consistent social media presence.",
    image: "/assets/img/smo/1.png",
  },

  {
    title: "Growth & Leads",
    body: "For businesses that want to combine content with paid social media advertising.",
    image: "/assets/img/smo/2.png",
  },

  {
    title: "Full Digital Growth",
    body: "For businesses looking for a connected digital marketing and lead-generation solution.",
    image: "/assets/img/smo/3.png",
  },
];

const CONVERSATION_CARDS = [
  {
    title: "Dubai-Based Experience",
    body: "With more than 14 years of digital experience, we understand the requirements of companies operating in Dubai and the wider UAE.",
  },
  {
    title: "Creative + Technical Team",
    body: "Our capabilities extend beyond social posting into graphic design, branding, web development, ecommerce, landing pages, CRM integrations and marketing automation.",
  },
  {
    title: "Strategy Before Content",
    body: "We don't begin by randomly creating posts. We first establish your objectives, audience, content direction and expected outcomes.",
  },
  {
    title: "Designed Around Your Brand",
    body: "Content and campaigns are developed according to your company's identity rather than relying on one generic social media template.",
  },
  {
    title: "Lead Generation Focus",
    body: "Where lead generation is your objective, we can connect social advertising with landing pages, WhatsApp and other digital conversion tools.",
  },
  {
    title: "Clear Reporting",
    body: "Campaign and content performance is reviewed through agreed metrics so marketing decisions can be based on actual results.",
  },
];
const PLATFORMS = [
  {
    name: "Instagram Marketing",
    body: "Build visibility through Reels, Stories, carousels, branded content, advertising and visually engaging campaigns. Ideal for lifestyle, retail, real estate, hospitality, healthcare, beauty, restaurants and consumer brands.",
  },
  {
    name: "Facebook Marketing",
    body: "Reach broad audiences through content, Meta advertising, lead-generation campaigns, retargeting and community-focused communication.",
  },
  {
    name: "LinkedIn Marketing",
    body: "Position your company, leadership and services in front of decision-makers. Ideal for B2B companies, corporate services, technology, professional services, consultants and recruitment.",
  },
  {
    name: "TikTok Marketing",
    body: "Create short-form, attention-driven content designed for discovery, engagement and audience growth.",
  },
  {
    name: "YouTube Marketing",
    body: "Use video, Shorts and advertising to educate customers, demonstrate expertise and build long-term brand visibility.",
  },
  {
    name: "X Marketing",
    body: "Maintain an active presence around announcements, conversations, company updates and relevant industry topics.",
  },
  {
    name: "WhatsApp Marketing",
    body: "Convert social media interest into direct conversations using WhatsApp Business solutions, campaign journeys, automation and lead follow-up.",
  },
  {
    name: "Pinterest Marketing",
    body: "Drive website traffic and product discovery through highly visual pins, idea pins, and targeted shopping campaigns.",
  },
  {
    name: "Snapchat Marketing",
    body: "Connect with a highly engaged younger demographic using immersive AR lenses, Snap Ads, and geo-targeted stories.",
  },
];

const FAQS = [
  {
    q: "What does a social media agency in Dubai do?",
    a: "A social media agency helps businesses plan and manage their presence across platforms such as Instagram, Facebook, LinkedIn, TikTok and YouTube. Services can include strategy, content creation, graphic design, video, publishing, paid advertising, community management and performance reporting.",
  },
  {
    q: "Which social media platforms should my business use?",
    a: "The right platforms depend on your audience and business objectives. Instagram and TikTok can work well for visual and consumer-focused brands, while LinkedIn is particularly useful for B2B and corporate marketing. Facebook, YouTube and other platforms may also be included depending on your strategy.",
  },
  {
    q: "Can RedSpider completely manage our social media accounts?",
    a: "Yes. RedSpider can provide end-to-end social media management including strategy, content planning, creative design, captions, publishing, campaigns and reporting based on the agreed scope.",
  },
  {
    q: "Do you create social media graphics, Reels and videos?",
    a: "Yes. Our social media services can include branded graphics, carousels, Stories, Reels, short-form videos, motion graphics and advertising creatives. Video production requirements can be customised according to the campaign.",
  },
  {
    q: "Does RedSpider manage paid social media advertising?",
    a: "Yes. We can plan and manage paid campaigns for objectives including brand awareness, website traffic, lead generation, WhatsApp enquiries, appointments, ecommerce sales and retargeting.",
  },
  {
    q: "How often should my company post on social media?",
    a: "There is no single posting frequency suitable for every company. The right schedule depends on your industry, platforms, content resources and objectives. We recommend a consistent publishing plan focused on content quality rather than posting simply for frequency.",
  },
  {
    q: "Can we approve posts before they are published?",
    a: "Yes. An approval workflow can be established so planned content is reviewed and approved before it is scheduled or published.",
  },
  {
    q: "How do you measure social media marketing performance?",
    a: "Performance can be measured using metrics such as reach, impressions, engagement, audience growth, website traffic, enquiries, leads, cost per lead, conversions and advertising performance. The KPIs are selected according to the objectives of the campaign.",
  },
  {
    q: "How much does social media management cost in Dubai?",
    a: "Social media management costs depend on the number of platforms, posting frequency, creative requirements, video production, community management and paid advertising scope. RedSpider prepares customised packages according to your business requirements and marketing objectives.",
  },
  {
    q: "How quickly can we start social media marketing with RedSpider?",
    a: "Once the scope is confirmed, we begin with onboarding, account access, brand review and strategy development. The first content calendar and creative direction are then prepared for review before regular publishing and campaign management begins.",
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
    <svg
      viewBox="0 0 100 100"
      width="26"
      height="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="instaGradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="100" height="100" rx="22" fill="url(#instaGradient)" />

      {/* White camera outline */}
      <rect
        x="22"
        y="22"
        width="56"
        height="56"
        rx="16"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
      />

      {/* White inner circle */}
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
      />

      {/* White dot */}
      <circle cx="70" cy="30" r="4" fill="#FFFFFF" />
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

  LinkedIn: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#0A66C2" />

      <path
        d="M7.2 10h1.9v6.4H7.2V10Zm.95-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM10.7 10h1.8v.9h.03c.25-.47.87-1 1.8-1 1.9 0 2.25 1.25 2.25 2.87v3.63h-1.9v-3.22c0-.77-.02-1.76-1.07-1.76-1.07 0-1.24.84-1.24 1.7v3.28h-1.9V10Z"
        fill="#fff"
      />
    </svg>
  ),

  TikTok: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#000" />

      {/* Cyan shadow */}
      <path
        d="M13.5 6.2v7.1a2.35 2.35 0 1 1-2.35-2.35"
        fill="none"
        stroke="#25F4EE"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Red shadow */}
      <path
        d="M14.4 7.1c.55.55 1.25.88 2.05.95"
        fill="none"
        stroke="#FE2C55"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* White main */}
      <path
        d="M14 6.4v7.1a2.35 2.35 0 1 1-2.35-2.35"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14.9 7.3c.55.55 1.25.88 2.05.95"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  YouTube: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="2.5" y="5" width="19" height="14" rx="4" fill="#FF0000" />

      <path d="M10 9.1v5.8l5-2.9-5-2.9Z" fill="#fff" />
    </svg>
  ),

  X: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#000" />

      <path
        d="M6.5 6.5h2.15l3.15 4.18 3.62-4.18h2.2l-4.72 5.48 5.05 6.02h-2.16l-3.5-4.28L8.9 18H6.65l4.65-5.72L6.5 6.5Z"
        fill="#fff"
      />
    </svg>
  ),

  WhatsApp: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <circle cx="12" cy="12" r="9" fill="#25D366" />

      <path
        d="M12 5.8a6.2 6.2 0 0 0-5.34 9.35L5.8 18.2l3.15-.83A6.2 6.2 0 1 0 12 5.8Z"
        fill="#fff"
      />

      <path
        d="M15.38 14.5c-.15.42-.85.8-1.18.85-.32.05-.72.07-1.16-.07-.27-.09-.6-.2-1.03-.4-1.8-.78-2.96-2.6-3.05-2.72-.09-.12-.72-.96-.72-1.83 0-.87.46-1.3.62-1.48.16-.18.35-.22.47-.22h.34c.11 0 .26-.04.4.31.15.35.5 1.22.54 1.3.04.09.07.19.01.3-.06.12-.09.19-.18.3-.09.11-.18.24-.26.32-.09.09-.18.18-.08.36.11.18.48.79 1.02 1.28.7.62 1.28.82 1.46.9.18.09.29.07.4-.04.11-.11.46-.53.58-.72.12-.18.24-.15.41-.09.17.06 1.07.5 1.26.6.18.09.3.14.35.22.05.09.05.5-.1.92Z"
        fill="#25D366"
      />
    </svg>
  ),

  Pinterest: (
    <svg
      viewBox="0 0 100 100"
      width="26"
      height="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red rounded square background */}
      <rect width="100" height="100" rx="20" fill="#E60023" />

      {/* White Pinterest 'P' logo */}
      <path
        fill="#FFFFFF"
        d="
        M 50 20
        C 34 20, 25 32, 25 45
        C 25 54, 30 60, 37 60
        C 40 60, 41 58, 40 55
        C 39 52, 38 50, 38 47
        C 38 38, 45 32, 53 32
        C 62 32, 67 38, 67 46
        C 67 56, 61 63, 54 63
        C 50 63, 47 60, 48 56
        L 51 44
        C 52 40, 50 38, 47 38
        C 43 38, 40 42, 40 48
        C 40 51, 42 53, 42 55
        L 37 72
        C 35 78, 37 85, 38 86
        C 38 86, 44 80, 46 74
        L 50 58
        C 52 61, 55 62, 59 62
        C 70 62, 75 53, 75 43
        C 75 31, 65 20, 50 20
        Z
      "
      />
    </svg>
  ),

  Snapchat: (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <rect x="3" y="3" width="20" height="20" rx="5" fill="#FFFC00" />

      <path
        d="M12 6.1c-2.02 0-3.55 1.52-3.55 3.59v1.12c-.28.17-.61.29-.98.36-.31.06-.53.32-.53.64 0 .35.25.62.6.67.3.04.61.08.91.15.11.03.18.13.16.24-.14.66-.55 1.21-1.19 1.63-.31.2-.64.38-1 .52-.29.12-.45.4-.42.71.03.3.25.55.55.62.46.11.94.21 1.42.28.22.03.39.17.48.37.16.35.35.67.6.96.24.29.54.54.87.72.33.19.7.31 1.07.38.24.04.47.13.66.26.43.3.91.45 1.39.45s.96-.15 1.39-.45c.19-.13.42-.22.66-.26.37-.07.74-.19 1.07-.38.33-.18.63-.43.87-.72.25-.29.44-.61.6-.96.09-.2.26-.34.48-.37.48-.07.96-.17 1.42-.28.3-.07.52-.32.55-.62.03-.31-.13-.59-.42-.71-.36-.14-.69-.32-1-.52-.64-.42-1.05-.97-1.19-1.63-.02-.11.05-.21.16-.24.3-.07.61-.11.91-.15.35-.05.6-.32.6-.67 0-.32-.22-.58-.53-.64-.37-.07-.7-.19-.98-.36V9.69C15.55 7.62 14.02 6.1 12 6.1Z"
        fill="#000"
      />
    </svg>
  ),

  "Google Ads": (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <path
        d="M9.2 4.3a3.2 3.2 0 0 1 5.6 0l5.25 9.1a3.2 3.2 0 0 1-5.55 3.2l-5.3-9.1a3.2 3.2 0 0 1 0-3.2Z"
        fill="#4285F4"
      />

      <path
        d="M9.2 4.3a3.2 3.2 0 0 0 0 3.2l5.3 9.1a3.2 3.2 0 0 0 5.55-3.2L14.8 4.3a3.2 3.2 0 0 0-5.6 0Z"
        fill="#34A853"
        opacity=".95"
      />

      <path
        d="M9.2 4.3a3.2 3.2 0 0 0-5.55 3.2l5.3 9.1a3.2 3.2 0 0 0 5.55-3.2l-5.3-9.1Z"
        fill="#FBBC04"
      />

      <circle cx="6.45" cy="17.2" r="2.6" fill="#EA4335" />
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

      <path
        d="M10.5 7.1a3.4 3.4 0 0 1 2.42 1"
        stroke="#EA4335"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M7.3 13.9a3.4 3.4 0 0 1-.2-4.35"
        stroke="#FBBC04"
        strokeWidth="2"
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

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    body: "We understand your business, services, audience, competitors and marketing goals.",
  },
  {
    num: "02",
    title: "Audit",
    body: "We review your existing social presence, content quality, brand consistency and current performance.",
  },
  {
    num: "03",
    title: "Strategise",
    body: "We define your platforms, audience, content pillars, campaign direction and monthly objectives.",
  },
  {
    num: "04",
    title: "Create",
    body: "Our designers and content team prepare posts, campaigns, graphics, captions and video content.",
  },
  {
    num: "05",
    title: "Review & Publish",
    body: "Content is shared through an agreed approval process before publishing.",
  },
  {
    num: "06",
    title: "Advertise & Optimise",
    body: "Where paid campaigns are included, we launch targeted advertising and continuously improve performance.",
  },
  {
    num: "07",
    title: "Measure",
    body: "We review the results, identify opportunities and use the findings to shape the next content cycle.",
  },
];

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
            {/* Eyebrow */}
            <div className="smo-eyebrow smo-reveal">
              SOCIAL MEDIA / CONTENT / PERFORMANCE
            </div>

            {/* Main Heading */}
            <h1 className="smo-reveal smo-d1">
              Social Media Agency in Dubai{" "}
              <span className="smo-accent">
                Turn Attention Into Engagement, Leads &amp; Business Growth
              </span>
            </h1>

            {/* Description */}
            <p className="smo-lede smo-reveal smo-d2">
              Build a stronger social media presence with strategy, creative
              content and performance-driven campaigns.
            </p>

            <p className="smo-lede smo-reveal smo-d2">
              <strong>RedSpider</strong> helps businesses in Dubai plan, create,
              manage and advertise across social media platforms — connecting
              great content with the right audience and turning online attention
              into real business opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="smo-actions smo-reveal smo-d3">
              <a className="smo-btn smo-btn--primary" href={CONTACT_ANCHOR}>
                Get a Free Social Media Audit
                <Arrow />
              </a>

              <a className="smo-btn smo-btn--ghost" href={CONTACT_ANCHOR}>
                Talk to Our Team
                <Arrow />
              </a>
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

      <section className="rsi2-section" id="smo-intro">
        {/* Decorative layer */}
        <div className="rsi2-decor" aria-hidden="true">
          <span className="rsi2-decor__line rsi2-decor__line--top" />
          <span className="rsi2-decor__line rsi2-decor__line--bottom" />
          <span className="rsi2-decor__orb rsi2-decor__orb--a" />
          <span className="rsi2-decor__orb rsi2-decor__orb--b" />
          <span className="rsi2-decor__dot rsi2-decor__dot--1" />
          <span className="rsi2-decor__dot rsi2-decor__dot--2" />
          <span className="rsi2-decor__dot rsi2-decor__dot--3" />
        </div>

        <div className="container rsi2-container">
          <div className="row rsi2-row align-items-center g-4 g-lg-5">
            {/* LEFT — premium image card */}
            <div className="col-lg-5 col-md-12 col-12">
              <figure className="rsi2-media smo-reveal smo-reveal-l">
                <div className="rsi2-media__frame">
                  <img
                    className="rsi2-media__img"
                    src="/assets/img/smo/intro.webp"
                    alt="RedSpider social media team in Dubai"
                    loading="lazy"
                  />

                  <span className="rsi2-media__overlay" aria-hidden="true" />

                  <span className="rsi2-media__accent" aria-hidden="true" />

                  <span
                    className="rsi2-media__corner rsi2-media__corner--tl"
                    aria-hidden="true"
                  />

                  <span
                    className="rsi2-media__corner rsi2-media__corner--br"
                    aria-hidden="true"
                  />
                </div>
              </figure>
            </div>

            {/* RIGHT — content */}
            <div className="col-lg-7 col-md-12 col-12">
              <div className="rsi2-content">
                {/* Eyebrow */}
                <span className="smo-eye rsi2-eye smo-reveal">
                  <span className="rsi2-eye__mark" aria-hidden="true" />
                  More than just posting
                </span>

                {/* Heading */}
                <h2 className="rsi2-heading smo-reveal">
                  <span className="rsi2-heading__line">
                    <span className="rsi2-heading__word">Social</span>{" "}
                    <span className="rsi2-heading__word">Media</span>{" "}
                    <span className="rsi2-heading__word">Marketing</span>
                  </span>

                  <span className="rsi2-heading__line">
                    <span className="rsi2-heading__word">Built</span>{" "}
                    <span className="rsi2-heading__word">Around</span>{" "}
                    <span className="rsi2-heading__word">Your</span>{" "}
                    <span className="rsi2-heading__word rsi2-heading__word--accent">
                      Business
                    </span>
                  </span>
                </h2>

                {/* Introduction */}
                <p className="rsi2-lede smo-reveal smo-d1">
                  Being active on social media is no longer enough.
                </p>

                <p className="rsi2-paragraph smo-reveal smo-d2">
                  Your customers are scrolling through hundreds of posts,
                  videos, stories and advertisements every day. Your brand needs
                  a clear strategy, distinctive creative direction and
                  consistent communication to earn their attention.
                </p>

                <p className="rsi2-paragraph smo-reveal smo-d3">
                  As a social media agency in Dubai, RedSpider combines
                  strategy, content creation, design, video, paid advertising
                  and performance analysis to create a social presence that
                  supports your actual business objectives.
                </p>

                <p className="rsi2-paragraph smo-reveal smo-d4">
                  Whether your goal is brand awareness, website traffic,
                  enquiries, appointments, WhatsApp leads or online sales, we
                  build the social media strategy around the result you want to
                  achieve.
                </p>

                {/* CTA */}
                <div className="rsi2-cta-row smo-reveal">
                  <a
                    className="smo-btn smo-btn--primary rsi2-cta"
                    href={CONTACT_ANCHOR}
                  >
                    <span>Start Your Social Media Strategy</span>
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="smo-paper smo-capx pt-0" id="smo-services">
        <div className="container smo-wrap">
          <div className="smo-head smo-reveal">
            <span className="smo-eye">What we do</span>

            <h2>
              <span className="smo-line">Complete Social Media Marketing</span>
              <span className="smo-line">Services in Dubai</span>
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
                </div>
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

            <h2>Social Media Should Do More Than Collect Likes</h2>

            <p>
              Likes and followers can help build visibility, but businesses
              ultimately need meaningful results.
            </p>

            <p>
              That is why RedSpider connects social media with the rest of your
              digital journey.
            </p>

            <ul>
              <li>
                <strong>Social Content:</strong> Attract attention with useful,
                creative and engaging content.
              </li>

              <li>
                <strong>Paid Campaigns:</strong> Reach specific audiences with
                targeted advertising.
              </li>

              <li>
                <strong>Landing Pages:</strong> Send interested users to
                focused, conversion-driven pages.
              </li>

              <li>
                <strong>Whatsapp:</strong> Let prospects start a conversation
                immediately.
              </li>

              <li>
                <strong>CRM &amp; Automation:</strong> Where required, leads can
                be routed into your sales or CRM workflow for faster follow-up.
              </li>
            </ul>
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

      <section className="rs-smo-packages" id="smo-packages">
        <div className="container">
          <div className="rs-smo-packages__head smo-reveal">
            <span className="rs-smo-packages__eyebrow">
              <span
                className="rs-smo-packages__eyebrow-line"
                aria-hidden="true"
              />
              Flexible Management Options
              <span
                className="rs-smo-packages__eyebrow-line"
                aria-hidden="true"
              />
            </span>

            <h2 className="rs-smo-packages__title">
              Choose the Social Media Support Your Business Needs
            </h2>
          </div>

          <div className="row rs-smo-packages__grid">
            {PACKAGES.map((pack, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={pack.title}>
                <article
                  className={`rs-smo-package-card smo-reveal smo-d${index + 1}`}
                >
                  <div className="rs-smo-package-card__num">
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <span
                      className="rs-smo-package-card__num-line"
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    className="rs-smo-package-card__media"
                    aria-hidden="true"
                  >
                    <Image
                      src={pack.image}
                      alt=""
                      width={512}
                      height={512}
                      unoptimized
                    />
                  </div>

                  <div className="rs-smo-package-card__body">
                    <h3 className="rs-smo-package-card__title">{pack.title}</h3>

                    <p className="rs-smo-package-card__text">{pack.body}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="smo-manifesto">
        <div className="container smo-wrap smo-manifesto__inner">
          <div className="smo-manifesto__copy smo-reveal">
            <span className="smo-eye smo-eye--light">
              Experience You Can Rely On
            </span>

            <h2>Digital Experience Built Over 14+ Years</h2>

            <p>
              For more than 14 years, RedSpider has worked with companies in
              Dubai and the UAE across web design, branding, ecommerce,
              technology and digital marketing.
            </p>

            <p>
              Our broader digital experience allows us to look beyond individual
              social media posts and understand how your social presence
              connects with your website, advertising, customer enquiries and
              overall brand experience.
            </p>

            <div className="smo-statline">
              <article>
                <strong>14+</strong>
                <span>Years of Digital Experience</span>
              </article>

              <article>
                <strong>100+</strong>
                <span>Google Reviews</span>
              </article>

              <article>
                <strong>4.9</strong>
                <span>Google Rating</span>
              </article>
            </div>
          </div>

          <div className="smo-manifesto__visual" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element -- external asset with a local fallback */}
            <img
              src="/assets/img/smo/shiny-logo-transparent.webp"
              alt=""
              onError={(event) => {
                event.currentTarget.src = IMG.glass22;
              }}
            />
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

      <section className="smo-pf-section pt-0">
        <div className="container smo-wrap">
          <div className="smo-pf-head smo-reveal">
            <span className="smo-pf-eye">Where Your Customers Are</span>

            <h2 className="smo-pf-h2">Social Media Platforms We Manage</h2>

            <p className="smo-pf-sub">
              Different platforms attract different audiences. We identify the
              channels that make the most sense for your business instead of
              trying to be everywhere without a clear purpose.
            </p>
          </div>

          <div className="smo-pf-grid">
            {PLATFORMS.map((item, index) => (
              <article
                className={`smo-pf-card smo-reveal smo-d${(index % 4) + 1}`}
                key={item.name}
              >
                <span className="smo-pf-icon" aria-hidden="true">
                  {PLATFORM_ICONS[item.name.replace(" Marketing", "")] || null}
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
            src="/assets/img/smo/floating-man2.webp"
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
                One Brand. One Consistent Visual Direction.
              </span>
            </h2>

            <p className="smo-urg-p">
              <span className="smo-urg-line">
                We maintain consistent typography, colours, messaging and
                creative direction so your customers recognise your brand
                wherever they see it.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="rsp-section" id="smo-process">
        <div className="container rsp-container">
          <div className="row rsp-row">
            {/* LEFT — sticky editorial content */}
            <div className="col-lg-5 col-md-12 col-12 rsp-col-aside">
              <aside className="rsp-aside smo-reveal">
                <span className="smo-eye rsp-eye">
                  <span className="rsp-eye__mark" aria-hidden="true" />
                  How we work
                </span>

                <h2 className="rsp-heading">
                  From Strategy to Social Media Growth
                </h2>

                <p className="rsp-intro">
                  We help your business grow online in 7 easy steps. First, we
                  learn about your goals. Then, we make a clear plan, create
                  great posts, and run ads to get you the best results.
                </p>

                <span className="rsp-aside__line" aria-hidden="true" />
              </aside>
            </div>

            {/* RIGHT — scrolling process cards */}
            <div className="col-lg-7 col-md-12 col-12 rsp-col-list">
              <ol className="rsp-list">
                {PROCESS_STEPS.map((step, index) => (
                  <li
                    key={step.num}
                    className={`rsp-card smo-reveal smo-d${(index % 4) + 1}`}
                  >
                    <span className="rsp-card__num" aria-hidden="true">
                      {step.num}
                    </span>

                    <div className="rsp-card__body">
                      <h3 className="rsp-card__title">{step.title}</h3>

                      <p className="rsp-card__text">{step.body}</p>
                    </div>

                    {/* Arrow intentionally kept disabled */}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-dd-section" id="smo-data">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-xl-12 text-center">
              <h2 className="rs-dd-heading smo-reveal">
                Data-Backed Campaigns for Real Business Growth
              </h2>

              <p className="rs-dd-intro smo-reveal smo-d1">
                Launch with a data-backed social media marketing service in
                Dubai. We provide businesses and agencies with actionable
                insights to achieve measurable digital growth.
              </p>
            </div>
          </div>

          <div className="row rs-dd-grid">
            {/* 01 — Conversion-Focused Optimization */}
            <div className="col-lg-4 col-md-6 col-12">
              <article className="rs-dd-card smo-reveal smo-d1">
                <div className="rs-dd-card__media">
                  <img
                    src="/assets/img/smo/data-driven/1.png"
                    alt="Conversion-focused optimization"
                    loading="lazy"
                  />
                </div>

                <div className="rs-dd-card__inner">
                  <div className="rs-dd-card__num">
                    <span>01</span>
                    <span className="rs-dd-card__num-line" aria-hidden="true" />
                  </div>

                  <h3 className="rs-dd-card__title">
                    Conversion-Focused Optimization
                  </h3>

                  <p className="rs-dd-card__text">
                    We offer data-driven social media marketing services in
                    Dubai designed to maximize your digital footprint. With a
                    strict focus on lead generation, we help you achieve growth
                    that directly impacts your bottom line.
                  </p>
                </div>
              </article>
            </div>

            {/* 02 — Precision Audience Targeting */}
            <div className="col-lg-4 col-md-6 col-12">
              <article className="rs-dd-card smo-reveal smo-d2">
                <div className="rs-dd-card__media">
                  <img
                    src="/assets/img/smo/data-driven/2.png"
                    alt="Precision audience targeting"
                    loading="lazy"
                  />
                </div>

                <div className="rs-dd-card__inner">
                  <div className="rs-dd-card__num">
                    <span>02</span>
                    <span className="rs-dd-card__num-line" aria-hidden="true" />
                  </div>

                  <h3 className="rs-dd-card__title">
                    Precision Audience Targeting
                  </h3>

                  <p className="rs-dd-card__text">
                    With our data-first approach to social and paid campaigns,
                    we don't just drive traffic—we help you attract the exact
                    right audience and convert them into loyal customers.
                  </p>
                </div>
              </article>
            </div>

            {/* 03 — Continuous Performance Tracking */}
            <div className="col-lg-4 col-md-6 col-12">
              <article className="rs-dd-card smo-reveal smo-d3">
                <div className="rs-dd-card__media">
                  <img
                    src="/assets/img/smo/data-driven/3.png"
                    alt="Continuous performance tracking"
                    loading="lazy"
                  />
                </div>

                <div className="rs-dd-card__inner">
                  <div className="rs-dd-card__num">
                    <span>03</span>
                    <span className="rs-dd-card__num-line" aria-hidden="true" />
                  </div>

                  <h3 className="rs-dd-card__title">
                    Continuous Performance Tracking
                  </h3>

                  <p className="rs-dd-card__text">
                    Our social media marketing services in Dubai are built
                    entirely on results. By continuously tracking analytics and
                    campaign data, we optimize your strategy for scalable,
                    long-term growth.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="rs-faq-sec" className="home-faq rs-faq-sec section py-5">
        <div className="container rs-home-faq-box">
          <div className="text-center mb-3 border-bottom pb-3">
            <h2 className="fw-bold rs-process-title">
              Frequently Asked Questions About Social Media Marketing in Dubai
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

              <div className="col-lg-6 mob-version">
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

      <section
        className="contact-cta"
        id="readytobuild"
        style={{ backgroundImage: "url(/assets/img/dubai-cta.webp)" }}
      >
        <div className="contact-cta__overlay" aria-hidden="true" />

        <div className="container contact-cta__inner">
          <div className="cta-heading" data-aos="fade-up">
            <h2 className="rs-process-title">
              Build a Social Media Presence That Supports Your Business
            </h2>

            <p className="rs-section-subtitle mx-auto text-center">
              Strategy. Creative. Social Media. Advertising. WhatsApp. Lead
              Generation.
              <br />
              Bring everything together with one Dubai digital team.
            </p>
          </div>

          <div className="cta-wrap" data-aos="fade-up" data-aos-delay="120">
            {/* WhatsApp — primary */}
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
                <span>Get Your Free Social Media Audit</span>
                <p>Start on WhatsApp</p>
              </span>

              <span className="cta-arrow" aria-hidden="true">
                <i className="bi bi-arrow-right" />
              </span>
            </a>

            {/* Call */}
            <a
              className="cta-card dark"
              href="tel:+971505698733"
              aria-label="Call RedSpider"
            >
              <span className="icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="cta-content">
                <span>Call RedSpider</span>
                <p>+971 50 569 8733</p>
              </span>

              <span className="cta-arrow" aria-hidden="true">
                <i className="bi bi-arrow-right" />
              </span>
            </a>

            {/* Email */}
            <a
              className="cta-card"
              href="mailto:info@redspider.ae"
              aria-label="Email RedSpider"
            >
              <span className="icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m22 6-10 7L2 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="cta-content">
                <span>Email RedSpider</span>
                <p>info@redspider.ae</p>
              </span>

              <span className="cta-arrow" aria-hidden="true">
                <i className="bi bi-arrow-right" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
