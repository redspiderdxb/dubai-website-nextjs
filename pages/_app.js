import "@/styles/globals.css";
import "@/styles/shared/layout.css";
import "@/styles/shared/utilities.css";
import "aos/dist/aos.css";
import Script from "next/script";
import { useEffect, useRef } from "react";
import AOS from "aos";
import { PagesTopLoader } from "nextjs-toploader/pages";

import { HeaderDataProvider } from "../context/HeaderDataContext";

function MyApp({ Component, pageProps }) {
  const customJsLoaded = useRef(false);

  // =====================================================
  // AOS INITIALIZATION
  // =====================================================

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    setTimeout(() => {
      if (typeof AOS !== "undefined") {
        AOS.refreshHard();
      }
    }, 500);
  }, []);

  // =====================================================
  // Load GLightbox CSS only when needed (non-blocking)
  // =====================================================

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (document.querySelector('link[data-rs-glightbox-css="true"]')) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/vendor/glightbox/css/glightbox.min.css";
    link.setAttribute("data-rs-glightbox-css", "true");
    document.head.appendChild(link);
  }, []);

  // =====================================================
  // LOAD CUSTOM.JS ONLY AFTER ALL REQUIRED LIBRARIES
  // ARE AVAILABLE
  // =====================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (customJsLoaded.current) return;

    let cancelled = false;
    let timer = null;

    const requiredLibrariesReady = () => {
      return (
        typeof window.jQuery !== "undefined" &&
        typeof window.gsap !== "undefined" &&
        typeof window.ScrollTrigger !== "undefined" &&
        typeof window.Swiper !== "undefined" &&
        typeof window.AOS !== "undefined" &&
        typeof window.Isotope !== "undefined"
      );
    };

    const loadCustomJS = () => {
      if (cancelled) return;

      if (customJsLoaded.current) return;

      const existingScript = document.querySelector(
        'script[data-redspider-custom-js="true"]',
      );

      if (existingScript) {
        customJsLoaded.current = true;
        return;
      }

      if (window.gsap && window.ScrollTrigger) {
        try {
          window.gsap.registerPlugin(window.ScrollTrigger);
        } catch (_) {
          // Silent fail
        }
      }

      const script = document.createElement("script");

      script.src = "/assets/js/custom.js";
      script.async = false;
      script.setAttribute("data-redspider-custom-js", "true");

      script.onload = () => {
        customJsLoaded.current = true;

        setTimeout(() => {
          if (window.AOS) {
            window.AOS.refreshHard();
          }
        }, 300);

        setTimeout(() => {
          if (window.ScrollTrigger) {
            try {
              window.ScrollTrigger.refresh();
            } catch (_) {
              // Silent fail
            }
          }
        }, 500);
      };

      document.body.appendChild(script);
    };

    const checkLibraries = () => {
      if (cancelled) return;

      if (requiredLibrariesReady()) {
        loadCustomJS();
        return;
      }

      timer = setTimeout(checkLibraries, 100);
    };

    timer = setTimeout(checkLibraries, 300);

    return () => {
      cancelled = true;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  // =====================================================
  // PAGE RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          DYNAMIC HEADER DATA
          ================================================= */}

      <HeaderDataProvider>
        <PagesTopLoader
          color="#e31e24"
          height={3}
          showSpinner={false}
          shadow={false}
          zIndex={1000000}
          easing="ease"
          speed={400}
        />
        <Component {...pageProps} />
      </HeaderDataProvider>

      {/* =================================================
          JAVASCRIPT DEPENDENCIES
          ================================================= */}

      {/* ================================================
          JQUERY
          ================================================ */}

      <Script
        src="/assets/vendor/jquery/jquery-3.7.1.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          BOOTSTRAP
          ================================================ */}

      <Script
        src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          SWIPER
          ================================================ */}

      <Script
        src="/assets/vendor/swiper/swiper-bundle.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          IMAGES LOADED
          ================================================ */}

      <Script
        src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"
        strategy="lazyOnload"
      />

      {/* ================================================
          ISOTOPE
          ================================================ */}

      <Script
        src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"
        strategy="lazyOnload"
      />

      {/* ================================================
          GSAP
          ================================================ */}

      <Script
        src="/assets/vendor/gsap/gsap.min.js"
        strategy="lazyOnload"
      />

      {/* ================================================
          GSAP SCROLLTRIGGER
          ================================================ */}

      <Script
        src="/assets/vendor/gsap/ScrollTrigger.min.js"
        strategy="lazyOnload"
      />

      {/* ================================================
          SPLIT TYPE
          ================================================ */}

      <Script
        src="/assets/vendor/split-type/split-type.min.js"
        strategy="lazyOnload"
      />

      {/* ================================================
          AOS
          ================================================ */}

      <Script src="/assets/vendor/aos/aos.js" strategy="lazyOnload" />

      {/* ================================================
          GLIGHTBOX
          ================================================ */}

      <Script
        src="/assets/vendor/glightbox/js/glightbox.min.js"
        strategy="lazyOnload"
      />

      {/* ================================================
          PURECOUNTER
          ================================================ */}

      <Script
        src="/assets/vendor/purecounter/purecounter_vanilla.js"
        strategy="lazyOnload"
      />

      
    </>
  );
}

export default MyApp;
