import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useHeaderData } from "../../context/HeaderDataContext";
import {
  getServiceNavPath,
  mergeStaticServiceNavItems,
  resolveHeaderServices,
} from "../../lib/formServiceOptions";

const SERVICE_MENU_META = {
  "Web Design & Development": {
    icon: "bi-code-square",
    description: "Websites designed to perform and convert.",
  },
  "Web Development": {
    icon: "bi-code-square",
    description: "Websites designed to perform and convert.",
  },
  "eCommerce Website Development": {
    icon: "bi-bag",
    description: "Online stores built for seamless selling.",
  },
  "Ecommerce Development": {
    icon: "bi-bag",
    description: "Online stores built for seamless selling.",
  },
  "Real Estate Website Development": {
    icon: "bi-buildings",
    description: "Property platforms designed to generate leads.",
  },
  "Real Estate Web Design Company": {
    icon: "bi-buildings",
    description: "Property platforms designed to generate leads.",
  },
  "Mobile App Development": {
    icon: "bi-phone",
    description: "Purpose-built apps for iOS and Android.",
  },
  "Branding & Logo Design": {
    icon: "bi-palette",
    description: "Distinctive identities with a lasting presence.",
  },
  "Logo Designing": {
    icon: "bi-palette",
    description: "Distinctive identities with a lasting presence.",
  },
  "Graphic Design": {
    icon: "bi-vector-pen",
    description: "Creative visuals made for every touchpoint.",
  },
  "Brochure & Company Profile Design": {
    icon: "bi-file-earmark-richtext",
    description: "Sales collateral that tells your story clearly.",
  },
  "Brochure Designing": {
    icon: "bi-file-earmark-richtext",
    description: "Sales collateral that tells your story clearly.",
  },
  "Email Marketing": {
    icon: "bi-envelope",
    description: "Campaigns that keep your audience engaged.",
  },
  "SMS Marketing": {
    icon: "bi-chat-dots",
    description: "Direct messages with measurable impact.",
  },
  "SMS Marketing UAE": {
    icon: "bi-chat-dots",
    description: "Direct messages with measurable impact.",
  },
  "Web Hosting & Server Solutions": {
    icon: "bi-hdd-network",
    description: "Secure, reliable hosting for your website.",
  },
  "Web Hosting": {
    icon: "bi-hdd-network",
    description: "Secure, reliable hosting for your website.",
  },
  "WhatsApp Business API Integration": {
    icon: "bi-whatsapp",
    description: "Connected customer conversations at scale.",
  },
  "Search Engine Optimization": {
    icon: "bi-graph-up-arrow",
    description: "Search visibility that drives qualified traffic.",
  },
  "Social Media Agency": {
    icon: "bi-share",
    description: "Social campaigns that grow your audience.",
  },
};

const DEFAULT_SERVICE_MENU_META = {
  icon: "bi-grid-1x2",
  description: "Specialist digital services for your business.",
};

export default function Header() {
  const router = useRouter();
  const {
    products: apiProducts,
    services: apiServices,
    isLoading: isHeaderNavLoading,
  } = useHeaderData();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef(null);

  /* =====================================================
     STICKY HEADER SCROLL
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    router.events.on("routeChangeComplete", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeComplete", handleScroll);
    };
  }, [router.events]);

  /* =====================================================
     SERVICES MENU
  ===================================================== */

  const services = mergeStaticServiceNavItems(
    resolveHeaderServices(apiServices),
  ).map((service) => ({
    name: service.name,
    path: getServiceNavPath(service),
  }));

  /* =====================================================
     DYNAMIC PRODUCTS
  ===================================================== */

  const movedProductNames = [
    "Real Estate Web Design Company",
    "SMS Marketing UAE",
  ];

  const products = Array.isArray(apiProducts)
    ? apiProducts
        .filter((product) => {
          if (!product) return false;

          if (!product.name) return false;

          if (!product.slug) return false;

          // These two products are intentionally shown under Services
          if (movedProductNames.includes(product.name)) {
            return false;
          }

          return true;
        })
        .map((product) => ({
          id: product.id,
          name: product.name,
          path: `/products/${product.slug}`,
        }))
    : [];

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  /* =====================================================
     DROPDOWN
  ===================================================== */

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  /* =====================================================
     CLICK OUTSIDE
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =====================================================
     RESIZE
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("rs-mobile-drawer-open", isMobileOpen);

    return () => {
      document.body.classList.remove("rs-mobile-drawer-open");
    };
  }, [isMobileOpen]);

  /* =====================================================
     NAV ITEMS
  ===================================================== */

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about-us/",
    },
    {
      name: "Services",
      type: "dropdown",
      items: services,
    },
    {
      name: "Our Portfolio",
      path: "/our-portfolio/",
    },
    {
      name: "Products",
      type: "dropdown",
      items: products,
    },
    {
      name: "Contact",
      path: "/contact-us/",
    },
  ];

  /* =====================================================
     HEADER CLASS
  ===================================================== */

  const headerClass = [
    "rs-main-header",
    isScrolled ? "rs-header-scrolled" : "",
    isMobileOpen ? "rs-header-mobile-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <header id="header" ref={headerRef} className={headerClass}>
      <div className="rs-header-inner">
        {/* =================================================
            TOP ROW
        ================================================= */}

        <div className="rs-top-row">
          {/* LOGO */}

          <Link
            href="/"
            className="rs-logo"
            aria-label="RedSpider Home"
            onClick={closeMobileMenu}
          >
            <Image
              src="/assets/img/logo.svg"
              alt="RedSpider Web & Art Design"
              width={200}
              height={50}
              priority
            />
          </Link>

          {/* NAV WRAPPER */}

          <div className="rs-nav-wrap">
            {isMobileOpen ? (
              <button
                type="button"
                className="rs-mobile-backdrop"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              />
            ) : null}

            {/* NAVIGATION */}

            <nav
              id="navmenu"
              className={`rs-navmenu ${isMobileOpen ? "rs-mobile-open" : ""}`}
              aria-label="Main Navigation"
            >
              <div className="rs-mobile-drawer-head">
                <Link
                  href="/"
                  className="rs-mobile-drawer-logo"
                  aria-label="RedSpider Home"
                  onClick={closeMobileMenu}
                >
                  <Image
                    src="/assets/img/logo.svg"
                    alt="RedSpider Web & Art Design"
                    width={168}
                    height={42}
                  />
                </Link>
                <p className="rs-mobile-drawer-tag">Power up your website</p>
              </div>

              <ul>
                {navItems.map((item, index) => {
                  /* =====================================
                       DROPDOWN
                  ===================================== */

                  if (item.type === "dropdown") {
                    const isServicesMenu = item.name === "Services";

                    return (
                      <li
                        key={item.name}
                        className={`dropdown ${
                          isServicesMenu ? "rs-services-dropdown" : ""
                        } ${
                          openDropdown === index ? "rs-dropdown-open" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="rs-dropdown-trigger"
                          onClick={() => toggleDropdown(index)}
                          aria-expanded={openDropdown === index}
                          aria-haspopup="true"
                        >
                          <span>{item.name}</span>

                          <i
                            className={`bi ${
                              openDropdown === index
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                            } toggle-dropdown`}
                          ></i>
                        </button>

                        {/* DROPDOWN MENU */}

                        <ul
                          className={`rs-dropdown-menu${
                            isServicesMenu ? " rs-services-mega-menu" : ""
                          }`}
                        >
                          {isServicesMenu ? (
                            <li className="rs-services-mega-intro">
                              <span>Our Services</span>
                              <br></br>
                              <small>Digital expertise, all under one roof.</small>
                            </li>
                          ) : null}
                          {item.items.length > 0 ? (
                            item.items.map((subItem, subIndex) => {
                              const serviceMeta =
                                SERVICE_MENU_META[subItem.name] ||
                                DEFAULT_SERVICE_MENU_META;

                              return (
                              <li
                                className={
                                  isServicesMenu ? "rs-services-mega-item" : ""
                                }
                                key={`${item.name}-${subIndex}`}
                              >
                                <Link
                                  href={subItem.path}
                                  className={
                                    isServicesMenu ? "rs-services-mega-link" : undefined
                                  }
                                  onClick={closeMobileMenu}
                                >
                                  {isServicesMenu ? (
                                    <>
                                      <span className="rs-services-mega-icon" aria-hidden="true">
                                        <i className={`bi ${serviceMeta.icon}`}></i>
                                      </span>
                                      <span className="rs-services-mega-copy">
                                        <span className="rs-services-mega-name">
                                          {subItem.name}
                                        </span>
                                        {/* <span className="rs-services-mega-description">
                                          {serviceMeta.description}
                                        </span> */}
                                      </span>
                                    </>
                                  ) : (
                                    subItem.name
                                  )}
                                </Link>
                              </li>
                              );
                            })
                          ) : item.name === "Products" &&
                            isHeaderNavLoading ? null : (
                            <li>
                              <span className="rs-dropdown-empty">
                                No {item.name.toLowerCase()} available
                              </span>
                            </li>
                          )}
                        </ul>
                      </li>
                    );
                  }

                  /* =====================================
                       NORMAL LINK
                  ===================================== */

                  return (
                    <li key={item.name}>
                      <Link href={item.path} onClick={closeMobileMenu}>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="rs-mobile-drawer-foot">
                <a
                  href="tel:+971555515475"
                  className="rs-mobile-drawer-call"
                  onClick={closeMobileMenu}
                >
                  <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                  Call now
                </a>
                <a
                  href="https://wa.me/971555515475"
                  className="rs-mobile-drawer-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <i className="bi bi-whatsapp" aria-hidden="true"></i>
                  WhatsApp
                </a>
                <Link
                  href="/contact-us/"
                  className="rs-mobile-drawer-touch"
                  onClick={closeMobileMenu}
                >
                  Get in Touch
                </Link>
              </div>
            </nav>

            {/* =================================================
                MOBILE BUTTON
            ================================================= */}

            <button
              type="button"
              className={`rs-mobile-toggle ${
                isMobileOpen ? "rs-mobile-toggle-open" : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <i className={`bi ${isMobileOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </button>
          </div>
        </div>

        {/* =================================================
            BOTTOM ROW
        ================================================= */}

        <div className="rs-bottom-row" aria-hidden={isScrolled}>
          {/* CALL */}

          <div className="rs-call-now">
            <i className="bi bi-telephone-fill"></i>

            <span>
              Call Now :{" "}
              <a
                href="tel:+971505698733"
                tabIndex={isScrolled ? -1 : undefined}
              >
                +971 50 5698733
              </a>
              ,{" "}
              <a
                href="tel:+971555515475"
                tabIndex={isScrolled ? -1 : undefined}
              >
                +971 55 5515475
              </a>
            </span>
          </div>

          {/* SOCIAL */}

          <div className="rs-social-wrap">
            <a
              href="https://wa.me/971555515475"
              className="rs-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              tabIndex={isScrolled ? -1 : undefined}
            >
              <i className="bi bi-whatsapp"></i>

              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
