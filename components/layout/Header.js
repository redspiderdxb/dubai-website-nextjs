import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchAllServices } from "../../lib/api";
import { fetchAllProducts } from "../../lib/api";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const headerRef = useRef(null);

  // 🔥 Fetch services from API
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchAllServices();
        const servicesData = response?.data || [];
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setIsLoadingServices(false);
      }
    };
    loadServices();
  }, []);

  // 🔥 Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 Nav items - Services & Products dynamic hain
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Services",
      type: "dropdown",
      items: services.map((service) => ({
        name: service.name,
        path: `/services/${service.slug}`,
      })),
      isLoading: isLoadingServices,
    },
    { name: "Our Portfolio", path: "/portfolio" },
    {
      name: "Products",
      type: "dropdown",
      items: products.map((product) => ({
        name: product.name,
        path: `/products/${product.slug}`,
      })),
      isLoading: isLoadingProducts,
    },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header id="header" className="rs-main-header" ref={headerRef}>
      <div className="rs-header-inner">
        <div className="rs-top-row">
          {/* Logo */}
          <Link href="/" className="rs-logo" aria-label="RedSpider Home">
            <Image
              src="/assets/img/logo.png"
              alt="RedSpider Web & Art Design"
              width={200}
              height={50}
              priority
            />
          </Link>

          <div className="rs-nav-wrap">
            {/* Navigation */}
            <nav
              id="navmenu"
              className={`rs-navmenu ${isMobileOpen ? "rs-mobile-open" : ""}`}
              aria-label="Main Navigation"
            >
              <ul>
                {navItems.map((item, index) => {
                  if (item.type === "dropdown") {
                    // 🔥 Loading state - Dropdown loading
                    if (item.isLoading) {
                      return (
                        <li key={index} className="dropdown">
                          <button type="button" className="rs-dropdown-trigger">
                            <span>{item.name}</span>
                            <i className="bi bi-chevron-down toggle-dropdown"></i>
                          </button>
                          <ul className="rs-dropdown-menu">
                            <li>
                              <span className="px-4 py-2 text-gray-500">
                                Loading {item.name.toLowerCase()}...
                              </span>
                            </li>
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={index}
                        className={`dropdown ${openDropdown === index ? "rs-dropdown-open" : ""}`}
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
                        <ul className="rs-dropdown-menu">
                          {item.items.length > 0 ? (
                            item.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
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
                              <span className="px-4 py-2 text-gray-500">
                                No {item.name.toLowerCase()} available
                              </span>
                            </li>
                          )}
                        </ul>
                      </li>
                    );
                  }
                  return (
                    <li key={index}>
                      <Link href={item.path} onClick={closeMobileMenu}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              className={`rs-mobile-toggle ${isMobileOpen ? "rs-mobile-open" : ""}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <i className={`bi ${isMobileOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </button>
          </div>
        </div>

        {/* Bottom Row — Call & Social */}
        <div className="rs-bottom-row">
          <div className="rs-call-now">
            <i className="bi bi-telephone-fill"></i>
            Call Now : +971 50 5698733, +971 55 5515475
          </div>

          <div className="rs-social-wrap">
            <a
              href="https://wa.me/971555515475"
              className="rs-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="bi bi-whatsapp"></i> WhatsApp
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
