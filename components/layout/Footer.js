import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useHeaderData } from "../../context/HeaderDataContext";

export default function Footer() {
  const { services: apiServices } = useHeaderData();

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
     DYNAMIC FOOTER SERVICES
     
     Services are coming from HeaderDataContext/API.
     URL is automatically created from service slug.
  ===================================================== */

  const services = Array.isArray(apiServices)
    ? apiServices
        .filter((service) => service && service.name && service.slug)
        .map((service) => ({
          name: service.name,
          path: `/services/${service.slug}`,
          slug: service.slug,
        }))
        .filter(
          (service, index, array) =>
            array.findIndex((item) => item.slug === service.slug) === index,
        )
    : [];

  /* =====================================================
     FOOTER MENU
  ===================================================== */

  const footerLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About us",
      path: "/about",
    },
    {
      name: "Our Work",
      path: "/portfolio",
    },
    {
      name: "Careers",
      path: "#",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  /* =====================================================
     SOCIAL ICONS
  ===================================================== */

  const socialIcons = [
    {
      name: "Facebook",
      icon: "fb.svg",
      link: "#",
    },
    {
      name: "Twitter",
      icon: "x.svg",
      link: "#",
    },
    {
      name: "LinkedIn",
      icon: "linke.svg",
      link: "#",
    },
    {
      name: "Instagram",
      icon: "insta.svg",
      link: "#",
    },
  ];

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="rs-footer-sec dark-background">
        <div className="container rs-footer-container">
          {/* =================================================
              TOP ROW
          ================================================= */}

          <div className="row align-items-start rs-footer-top">
            {/* =================================================
                LEFT - HEADING
            ================================================= */}

            <div className="col-lg-5 col-md-6 rs-footer-intro">
              <h2 className="rs-heading">
                Power up your website
                <br />
                with <span>Our experts</span>
              </h2>

              <Image
                src="/assets/img/swim.png"
                alt="RedSpider swimming towards success"
                className="swim-foot"
                width={100}
                height={80}
              />
            </div>

            {/* =================================================
                MIDDLE - DYNAMIC SERVICES
            ================================================= */}

            <div className="col-lg-4 col-md-6">
              <ul className="rs-services">
                {services.length > 0 ? (
                  services.map((service) => (
                    <li key={service.slug}>
                      <Link href={service.path}>{service.name}</Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span>No services available</span>
                  </li>
                )}
              </ul>
            </div>

            {/* =================================================
                RIGHT - CONTACT
            ================================================= */}

            <div className="col-lg-3 col-md-12 rs-footer-contact">
              {/* EMAIL */}

              <div className="rs-contact-card rs-contact-email">
                <small>Get Questions?</small>

                <h5>
                  <a href="mailto:info@redspider.ae">info@redspider.ae</a>
                </h5>

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

                <h5>
                  <a href="tel:+971555515475">+971 55 5515475</a>
                </h5>

                <span className="rs-icon">
                  <Image
                    src="/assets/img/icons/ph-foot.svg"
                    alt="Phone"
                    width={30}
                    height={30}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM ROW
          ================================================= */}

          <div className="row rs-footer-bottom align-items-end">
            {/* =================================================
                FOOTER MENU
            ================================================= */}

            <div className="col-lg-3 col-md-4">
              <ul className="rs-menu">
                {footerLinks.map((link, index) => (
                  <li key={link.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <Link href={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* =================================================
                COPYRIGHT + SOCIAL + QUICK LINKS
            ================================================= */}

            <div className="col-lg-9 col-md-8">
              <div className="row align-items-center rs-footer-bottom-content">
                {/* =================================================
                    COPYRIGHT
                ================================================= */}

                <div className="col-lg-4 col-md-12">
                  <p className="rs-copyright">
                    © Copyright 2026, RedSpider. All Rights Reserved.
                  </p>
                </div>

                {/* =================================================
                    SOCIAL
                ================================================= */}

                <div className="col-lg-4 col-md-12">
                  <div className="rs-social">
                    {socialIcons.map((social) => (
                      <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <Image
                          src={`/assets/img/social/${social.icon}`}
                          alt={social.name}
                          width={16}
                          height={16}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    QUICK LINKS
                ================================================= */}

                <div className="col-lg-4 col-md-12">
                  <div className="rs-footer-links">
                    <Link href="/faq">FAQ'S</Link>

                    <Link href="/blog">BLOGS</Link>

                    <Link href="/contact">Get In Touch</Link>
                  </div>
                </div>
              </div>
            </div>
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
          <i className="bi bi-arrow-up-short"></i>
        </button>
      )}

      {/* =================================================
          FIXED CONTACT BUTTONS
      ================================================= */}

      <div className="rs-fixed-contact">
        {/* WHATSAPP */}

        <a
          className="rs-fixed-contact__button rs-fixed-contact__button--whatsapp"
          href="https://wa.me/971555515475"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1.01 1.01 0 0 0-1.03.24l-1.57 1.97a15.18 15.18 0 0 1-6.91-6.91l1.97-1.68c.3-.3.39-.72.24-1.1a11.3 11.3 0 0 1-.56-3.53c0-.54-.45-.99-.99-.99H4.18c-.54 0-1.18.24-1.18.99C3 13.11 10.69 20.8 19.99 20.8c.71 0 1.01-.63 1.01-1.18v-3.25c0-.54-.45-.99-.99-.99z" />
          </svg>
        </a>

        {/* PHONE */}

        <a
          className="rs-fixed-contact__button rs-fixed-contact__button--phone"
          href="tel:+971555515475"
          aria-label="Call us"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1.01 1.01 0 0 0-1.03.24l-1.57 1.97a15.18 15.18 0 0 1-6.91-6.91l1.97-1.68c.3-.3.39-.72.24-1.1a11.3 11.3 0 0 1-.56-3.53c0-.54-.45-.99-.99-.99H4.18c-.54 0-1.18.24-1.18.99C3 13.11 10.69 20.8 19.99 20.8c.71 0 1.01-.63 1.01-1.18v-3.25c0-.54-.45-1.18-.99-1.18z" />
          </svg>
        </a>
      </div>
    </>
  );
}
