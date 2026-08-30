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
      name: "FAQs",
      path: "/faqs/",
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
      icon: "bi bi-facebook",
      link: "https://www.facebook.com/RedSpiderWebandArtDesign/",
    },
    {
      name: "Twitter",
      icon: "bi bi-twitter-x",
      link: "https://x.com/redspider99",
    },
    {
      name: "LinkedIn",
      icon: "bi bi-linkedin",
      link: "https://www.linkedin.com/company/red-spider-web-&-art-design",
    },
    {
      name: "Instagram",
      icon: "bi bi-instagram",
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

              <a
                className="rs-contact-card rs-contact-email"
                href="mailto:info@redspider.ae"
              >
                <span className="rs-contact-icon" aria-hidden="true">
                  <i className="bi bi-envelope"></i>
                </span>

                <span className="rs-contact-copy">
                  <small>Get Questions?</small>
                  <strong>info@redspider.ae</strong>
                </span>
              </a>

              <a
                className="rs-contact-card rs-contact-phone"
                href="tel:+971555515475"
              >
                <span className="rs-contact-icon" aria-hidden="true">
                  <i className="bi bi-telephone"></i>
                </span>

                <span className="rs-contact-copy">
                  <small>Quick Answer?</small>
                  <strong>+971 55 551 5475</strong>
                </span>
              </a>

              {/* SOCIAL ICONS */}

              <div className="rs-social">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`rs-social-link rs-social-${social.name.toLowerCase()}`}
                  >
                    <i className={social.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>

              {/* GET IN TOUCH */}

              <div className="rs-footer-links bottom">
                <div className="rs-footer-app-row">
                  <a
                    href="https://apps.apple.com/us/app/redspider-web-art-design/id6748980550?platform=vision"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download RedSpider on Apple App Store"
                    className="footer-app-link"
                  >
                    <i className="bi bi-apple" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.app.redspider&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download RedSpider on Google Play"
                    className="footer-app-link"
                  >
                    <i className="bi bi-google-play" aria-hidden="true"></i>
                  </a>
                </div>

                <Link href="/contact-us/" className="footer-touch-link">
                  Get In Touch
                </Link>
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
          className="rs-fixed-contact__button rs-fixed-contact__button--phone"
          href="tel:+971555515475"
          aria-label="Call us"
        >
          <i className="bi bi-telephone-fill" aria-hidden="true" />
        </a>

        <a
          className="rs-fixed-contact__button rs-fixed-contact__button--whatsapp"
          href="https://wa.me/971555515475"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <i className="bi bi-whatsapp" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
