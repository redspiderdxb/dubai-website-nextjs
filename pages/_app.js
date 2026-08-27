import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import App from "next/app";
import { useEffect, useRef } from "react";
import AOS from "aos";

import { fetchAllServices, fetchAllProducts } from "../lib/api";
import { HeaderDataProvider } from "../context/HeaderDataContext";

function MyApp({
  Component,
  pageProps,
  headerServices = [],
  headerProducts = [],
}) {
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
      <Head>
        {/* ============================================
            BOOTSTRAP
            ============================================ */}

        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
        />

        {/* ============================================
            BOOTSTRAP ICONS
            ============================================ */}

        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
        />

        {/* ============================================
            GLIGHTBOX
            ============================================ */}

        <link
          rel="stylesheet"
          href="/assets/vendor/glightbox/css/glightbox.min.css"
        />

        {/* ============================================
            SWIPER
            ============================================ */}

        <link
          rel="stylesheet"
          href="/assets/vendor/swiper/swiper-bundle.min.css"
        />

        

        {/* ============================================
            MAIN CSS
            ============================================ */}

        <link rel="stylesheet" href="/assets/css/main.css" />

        {/* ============================================
            CUSTOM FONTS
            ============================================ */}

        <link rel="stylesheet" href="/assets/fonts/stylesheet.css" />

        {/* ============================================
            CUSTOM CSS
            ============================================ */}

        <link rel="stylesheet" href="/assets/css/custom.css" />

        {/* ============================================
            MATERIAL SYMBOLS
            ============================================ */}

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>

      {/* =================================================
          DYNAMIC HEADER DATA
          ================================================= */}

      <HeaderDataProvider services={headerServices} products={headerProducts}>
        <Component {...pageProps} />
      </HeaderDataProvider>

      {/* =================================================
          JAVASCRIPT DEPENDENCIES
          ================================================= */}

      {/* ================================================
          JQUERY
          ================================================ */}

      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="beforeInteractive"
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
        strategy="afterInteractive"
      />

      {/* ================================================
          ISOTOPE
          ================================================ */}

      <Script
        src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          GSAP
          ================================================ */}

      <Script
        src="https://unpkg.com/gsap@3/dist/gsap.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          GSAP SCROLLTRIGGER
          ================================================ */}

      <Script
        src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          SPLIT TYPE
          ================================================ */}

      <Script src="https://unpkg.com/split-type" strategy="afterInteractive" />

      {/* ================================================
          AOS
          ================================================ */}

      <Script src="/assets/vendor/aos/aos.js" strategy="afterInteractive" />

      {/* ================================================
          GLIGHTBOX
          ================================================ */}

      <Script
        src="/assets/vendor/glightbox/js/glightbox.min.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          PURECOUNTER
          ================================================ */}

      <Script
        src="/assets/vendor/purecounter/purecounter_vanilla.js"
        strategy="afterInteractive"
      />

      
    </>
  );
}

// =====================================================
// SERVER SIDE HEADER DATA
// =====================================================

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  let headerServices = [];
  let headerProducts = [];

  try {
    const [servicesResult, productsResult] = await Promise.all([
      fetchAllServices(),
      fetchAllProducts(),
    ]);

    console.log("========== HEADER PRODUCTS CHECK ==========");
console.log("PRODUCTS RESULT TYPE:", Array.isArray(productsResult));
console.log("PRODUCTS COUNT:", productsResult?.length);
console.log("FIRST PRODUCT:", productsResult?.[0]);
console.log("===========================================");


    if (Array.isArray(servicesResult)) {
      headerServices = servicesResult;
    } else if (Array.isArray(servicesResult?.data)) {
      headerServices = servicesResult.data;
    } else {
      headerServices = [];
    }

    if (Array.isArray(productsResult)) {
      headerProducts = productsResult;
    } else if (Array.isArray(productsResult?.data)) {
      headerProducts = productsResult.data;
    } else {
      headerProducts = [];
    }
  } catch (_) {
    headerServices = [];
    headerProducts = [];
  }

  return {
    ...appProps,
    headerServices,
    headerProducts,
  };
};

export default MyApp;
