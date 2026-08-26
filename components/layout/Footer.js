import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* =====================================================
     SCROLL TOP
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     SERVICES
  ===================================================== */

  const services = [
    {
      name: "Web Design & Development",
      path: "/service/web-development",
    },
    {
      name: "eCommerce Website Development",
      path: "/service/ecommerce-web-design-dubai",
    },
    {
      name: "Real Estate Website Development",
      path: "/products/real-estate-portal",
    },
    {
      name: "Mobile App Development",
      path: "/service/mobile-app-development-company-dubai",
    },
    {
      name: "Branding & Logo Design",
      path: "/service/logo-designing-company-dubai-brand-identity",
    },
    {
      name: "Graphic Design",
      path: "/service/graphic-design-services",
    },
    {
      name: "Brochure & Company Profile Design",
      path: "/service/brochure-design-company-in-dubai",
    },
    {
      name: "Email Marketing",
      path: "/service/email-marketing",
    },
    {
      name: "SMS Marketing",
      path: "/products/sms-marketing-uae",
    },
    {
      name: "Web Hosting & Server Solutions",
      path: "/service/web-hosting",
    },
    {
      name: "WhatsApp Business API Integration",
      path: "/service/whatsapp-business-api-integration",
    },
  ];

  /* =====================================================
     FOOTER MENU
  ===================================================== */

  const footerLinks = [
    {
      name: "About Us",
      path: "/about-us/",
    },
    {
      name: "Our Work",
      path: "/our-portfolio/",
    },
    {
      name: "Blog",
      path: "/blog/",
    },
    {
      name: "Contact Us",
      path: "/contact-us/",
    },
  ];

  /* =====================================================
     SOCIAL ICONS
  ===================================================== */

  const socialIcons = [
    {
      name: "Facebook",
      type: "image",
      icon: "fb.svg",
      link: "https://www.facebook.com/RedSpiderWebandArtDesign/",
    },
    {
      name: "Twitter",
      type: "icon",
      icon: "bi bi-twitter-x",
      link: "https://x.com/redspider99",
    },
    {
      name: "LinkedIn",
      type: "image",
      icon: "linke.svg",
      link: "https://www.linkedin.com/company/red-spider-web-&-art-design",
    },
    {
      name: "Instagram",
      type: "image",
      icon: "insta.svg",
      link: "https://www.instagram.com/redspiderwebartdesign/",
    },
  ];

  return (
    <>
      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="rs-footer-sec dark-background">
        <div className="container rs-footer-container">
          {/* =================================================
              MAIN FOOTER GRID
          ================================================= */}

          <div className="row rs-footer-main g-5">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="col-lg-4 col-md-6 rs-footer-left">
              {/* =================================================
                  HEADING + IMAGE
              ================================================= */}

              <div className="rs-footer-intro">
                <div className="rs-heading">
                  Power up your website
                  <br />
                  with <span>Our experts</span>
                </div>

                <Image
                  src="/assets/img/swim.webp"
                  alt="RedSpider swimming towards success"
                  className="swim-foot"
                  width={100}
                  height={80}
                />
              </div>

              {/* =================================================
                  FOOTER MENU
              ================================================= */}

              <div className="rs-footer-menu-wrap">
                <ul className="rs-menu">
                  {footerLinks.map((link, index) => (
                    <li key={link.name}>
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <Link href={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* =================================================
                MIDDLE COLUMN
                OUR SERVICES
            ================================================= */}

            <div className="col-lg-4 col-md-6 rs-footer-services-col">
              <div className="rs-footer-services-heading">Our Services</div>

              <ul className="rs-services">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.path}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* =================================================
                RIGHT COLUMN
                EMAIL / PHONE / SOCIAL / GET IN TOUCH
            ================================================= */}

            <div className="col-lg-4 col-md-12 rs-footer-right">
              {/* EMAIL */}

              <div className="rs-contact-card rs-contact-email">
                <small>Get Questions?</small>

                <div className="rs-contact-value">
                  <a href="mailto:info@redspider.ae">info@redspider.ae</a>
                </div>

                <span className="rs-icon">
                  <Image
                    src="/assets/img/icons/email.svg"
                    alt="Email"
                    width={30}
                    height={30}
                  />
                </span>
              </div>

              {/* PHONE */}

              <div className="rs-contact-card rs-contact-phone">
                <small>Quick Answer?</small>

                <div className="rs-contact-value">
                  <a href="tel:+971555515475">+971 55 5515475</a>
                </div>

                <span className="rs-icon">
                  <Image
                    src="/assets/img/icons/ph-foot.svg"
                    alt="Phone"
                    width={30}
                    height={30}
                  />
                </span>
              </div>

              {/* SOCIAL ICONS */}

              <div className="rs-social">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.type === "icon" ? (
                      <i className={social.icon} aria-hidden="true" />
                    ) : (
                      <Image
                        src={`/assets/img/social/${social.icon}`}
                        alt={social.name}
                        width={16}
                        height={16}
                      />
                    )}
                  </a>
                ))}
              </div>

              {/* GET IN TOUCH */}

              <div className="rs-footer-links bottom">
                <a
                  href="https://apps.apple.com/us/app/redspider-web-art-design/id6748980550?platform=vision"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download RedSpider on Apple App Store"
                  className="footer-app-link"
                >
                  <i className="bi bi-apple"></i>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.app.redspider&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download RedSpider on Google Play"
                  className="footer-app-link"
                >
                  <i className="bi bi-google-play"></i>
                </a>

                <Link href="/contact-us/">Get In Touch</Link>
              </div>
            </div>
          </div>

          {/* =================================================
              COPYRIGHT
          ================================================= */}

          <div className="rs-footer-copyright">
            <p className="rs-copyright">
              © Copyright 2026, RedSpider. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* =================================================
          SCROLL TOP
      ================================================= */}

      {showScrollTop && (
        <button
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="bi bi-arrow-up-short" />
        </button>
      )}

      {/* =================================================
          FIXED CONTACT BUTTON
      ================================================= */}

      <div className="rs-fixed-contact">
        <a
          className="rs-whatsapp-float"
          href="https://wa.me/971555515475"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <span className="rs-whatsapp-pulse"></span>

          <span className="rs-whatsapp-icon">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="#ffffff"
                d="M19.11 17.47c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.58-.65 1.8-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.32z"
              />

              <path
                fill="#ffffff"
                d="M16.01 3.2C8.93 3.2 3.17 8.96 3.17 16.04c0 2.26.59 4.46 1.71 6.4L3.05 28.8l6.51-1.71a12.8 12.8 0 0 0 6.45 1.74h.01c7.08 0 12.84-5.76 12.84-12.84S23.09 3.2 16.01 3.2zm0 23.51h-.01a10.65 10.65 0 0 1-5.43-1.49l-.39-.23-3.86 1.01 1.03-3.76-.25-.39a10.67 10.67 0 1 1 8.91 4.86z"
              />
            </svg>
          </span>
        </a>
      </div>
    </>
  );
}
