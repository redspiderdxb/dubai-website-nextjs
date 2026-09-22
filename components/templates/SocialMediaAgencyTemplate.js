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
    image: "/assets/img/smo/1.png",
  },
  {
    title: "Social + Search",
    body: "Reels, paid social, Google Search and landing pages built for enquiries, bookings and sales.",
    image: "/assets/img/smo/2.png",
  },
  {
    title: "Growth Engine",
    body: "Brand, creative, paid social, search, tracking and reporting working together across every priority platform.",
    image: "/assets/img/smo/3.png",
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
                <span className="smo-eye rsi2-eye smo-reveal">
                  <span className="rsi2-eye__mark" aria-hidden="true" />
                  More than just posting
                </span>

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

      <section className="rs-smo-packages" id="smo-packages">
        <div className="container">
          <div className="rs-smo-packages__head smo-reveal">
            <span className="rs-smo-packages__eyebrow">
              <span
                className="rs-smo-packages__eyebrow-line"
                aria-hidden="true"
              />
              Pick the level
              <span
                className="rs-smo-packages__eyebrow-line"
                aria-hidden="true"
              />
            </span>
            <h2 className="rs-smo-packages__title">
              Keep the{" "}
              <span className="rs-smo-packages__title-accent">lead-gen</span>{" "}
              standard.
            </h2>
            <p className="rs-smo-packages__intro">
              Some brands need Instagram and LinkedIn handled properly. Others
              need the full growth stack: social, ads, landing pages and
              reporting. Scope follows the outcome.
            </p>
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
                  A clear, seven-step process that takes your brand from
                  research to results — with content, campaigns and reporting
                  working as one system.
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

                    {/* <span className="rsp-card__arrow" aria-hidden="true">
                      <Arrow />
                    </span> */}
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
                Data-Driven Decisions, Dynamic Growth
              </h2>
              <p className="rs-dd-intro smo-reveal smo-d1">
                Launch with a data-backed social media marketing service in
                Dubai. We provide businesses and agencies with suitable insights
                to achieve measurable digital growth.
              </p>
            </div>
          </div>

          <div className="row rs-dd-grid">
            <div className="col-lg-4 col-md-6 col-12">
              <article className="rs-dd-card smo-reveal smo-d1">
                <div className="rs-dd-card__media">
                  <img
                    src="/assets/img/smo/data-driven/1.png"
                    alt="Website analytics dashboard"
                    loading="lazy"
                  />
                </div>
                <div className="rs-dd-card__inner">
                  <div className="rs-dd-card__num">
                    <span>01</span>
                    <span className="rs-dd-card__num-line" aria-hidden="true" />
                  </div>
                  <h3 className="rs-dd-card__title">Website Optimization</h3>
                  <p className="rs-dd-card__text">
                    We offer data-driven social media marketing services in
                    Dubai that are designed to optimize your website
                    performance. With a focus on lead generation, we help you
                    achieve measurable growth.
                  </p>
                  <a className="rs-dd-card__cta" href={CONTACT_ANCHOR}>
                    <span>Start Now</span>
                    <Arrow />
                  </a>
                </div>
              </article>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <article className="rs-dd-card smo-reveal smo-d2">
                <div className="rs-dd-card__media">
                  <img
                    src="/assets/img/smo/data-driven/2.png"
                    alt="Light trails representing targeted traffic"
                    loading="lazy"
                  />
                </div>
                <div className="rs-dd-card__inner">
                  <div className="rs-dd-card__num">
                    <span>02</span>
                    <span className="rs-dd-card__num-line" aria-hidden="true" />
                  </div>
                  <h3 className="rs-dd-card__title">Targeted Traffic</h3>
                  <p className="rs-dd-card__text">
                    With our data-driven approach to SEO and paid campaigns, we
                    help you attract the right audience and convert them into
                    customers.
                  </p>
                  <a className="rs-dd-card__cta" href={CONTACT_ANCHOR}>
                    <span>Boost Visibility</span>
                    <Arrow />
                  </a>
                </div>
              </article>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <article className="rs-dd-card smo-reveal smo-d3">
                <div className="rs-dd-card__media">
                  <img
                    src="/assets/img/smo/data-driven/3.png"
                    alt="Stopwatch representing performance"
                    loading="lazy"
                  />
                </div>
                <div className="rs-dd-card__inner">
                  <div className="rs-dd-card__num">
                    <span>03</span>
                    <span className="rs-dd-card__num-line" aria-hidden="true" />
                  </div>
                  <h3 className="rs-dd-card__title">Remarkable Performance</h3>
                  <p className="rs-dd-card__text">
                    Our social media marketing services in Dubai are also about
                    performance. With a focus on tracking, we help you improve
                    your marketing campaigns for better growth.
                  </p>
                  <a className="rs-dd-card__cta" href={CONTACT_ANCHOR}>
                    <span>Know More</span>
                    <Arrow />
                  </a>
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
