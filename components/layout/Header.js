import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useHeaderData } from "../../context/HeaderDataContext";

export default function Header() {
  const router = useRouter();

  const { services: apiServices, products: apiProducts } = useHeaderData();

  useEffect(() => {
    console.log("=================================");
    console.log("HEADER API PRODUCTS:", apiProducts);
    console.log("PRODUCT COUNT:", apiProducts?.length);
    console.log("=================================");
  }, [apiProducts]);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isBlogScrolled, setIsBlogScrolled] = useState(false)
  

  const headerRef = useRef(null);

  /* =====================================================
     BLOG PAGE DETECTION
  ===================================================== */

  const isBlogPage =
    router.pathname === "/blog" || router.pathname.startsWith("/blog/");

  /* =====================================================
     BLOG SCROLL
  ===================================================== */

  useEffect(() => {
    if (!isBlogPage) {
      setIsBlogScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsBlogScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBlogPage]);

  /* =====================================================
     EXTRA SERVICES
  ===================================================== */

  const extraServices = [
    {
      name: "Real Estate Web Design Company",
      path: "/products/real-estate-web-design-company",
    },
    {
      name: "SMS Marketing UAE",
      path: "/products/sms-marketing-uae",
    },
  ];

  /* =====================================================
     DYNAMIC SERVICES
  ===================================================== */

  const serviceItems = Array.isArray(apiServices)
    ? apiServices
        .filter((service) => service && service.name && service.slug)
        .map((service) => ({
          name: service.name,
          path: `/services/${service.slug}`,
        }))
    : [];

  const services = [...serviceItems, ...extraServices].filter(
    (service, index, array) =>
      array.findIndex((item) => item.name === service.name) === index,
  );

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
      if (window.innerWidth >= 992) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      path: "/about",
    },
    {
      name: "Services",
      type: "dropdown",
      items: services,
    },
    {
      name: "Our Portfolio",
      path: "/portfolio",
    },
    {
      name: "Products",
      type: "dropdown",
      items: products,
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  /* =====================================================
     HEADER CLASS
  ===================================================== */

  const headerClass = [
    "rs-main-header",

    isBlogPage ? "rs-blog-fixed-header" : "",

    isBlogPage && isBlogScrolled ? "rs-blog-header-scrolled" : "",

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
              src="/assets/img/logo.png"
              alt="RedSpider Web & Art Design"
              width={200}
              height={50}
              priority
            />
          </Link>

          {/* NAV WRAPPER */}

          <div className="rs-nav-wrap">
            {/* NAVIGATION */}

            <nav
              id="navmenu"
              className={`rs-navmenu ${isMobileOpen ? "rs-mobile-open" : ""}`}
              aria-label="Main Navigation"
            >
              <ul>
                {navItems.map((item, index) => {
                  /* =====================================
                       DROPDOWN
                    ===================================== */

                  if (item.type === "dropdown") {
                    return (
                      <li
                        key={item.name}
                        className={`dropdown ${
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

                        <ul className="rs-dropdown-menu">
                          {item.items.length > 0 ? (
                            item.items.map((subItem, subIndex) => (
                              <li key={`${item.name}-${subIndex}`}>
                                <Link
                                  href={subItem.path}
                                  onClick={closeMobileMenu}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))
                          ) : (
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
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
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

        <div className="rs-bottom-row">
          {/* CALL */}

          <div className="rs-call-now">
            <i className="bi bi-telephone-fill"></i>

            <span>Call Now : +971 50 5698733, +971 55 5515475</span>
          </div>

          {/* SOCIAL */}

          <div className="rs-social-wrap">
            <a
              href="https://wa.me/971555515475"
              className="rs-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="bi bi-whatsapp"></i>

              <span>WhatsApp</span>
            </a>

            <a href="#" className="rs-social" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>

            <a href="#" className="rs-social" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
