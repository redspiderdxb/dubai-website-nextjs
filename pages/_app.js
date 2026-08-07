import '@/styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // const loadCustomJS = () => {
    //   if (typeof window === 'undefined') return;
    //   const scripts = [
    //     '/assets/js/main.js',
    //     '/assets/js/title-effect.js',
    //     '/assets/js/custome.js',
    //   ];
    //   scripts.forEach((src) => {
    //     const script = document.createElement('script');
    //     script.src = src;
    //     script.async = true;
    //     document.body.appendChild(script);
    //   });
    // };
    // loadCustomJS();

  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" href="/assets/vendor/glightbox/css/glightbox.min.css" />
        <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/lib/animate/animate.min.css" />
        <link rel="stylesheet" href="/assets/lib/owlcarousel/assets/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/fonts/stylesheet.css" />
        <link rel="stylesheet" href="/assets/css/custom.css" />
      </Head>

      <Component {...pageProps} />

      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" strategy="afterInteractive" />
      
      <Script src="https://unpkg.com/gsap@3/dist/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/split-type" strategy="afterInteractive" />

      <Script src="/assets/vendor/aos/aos.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/purecounter/purecounter_vanilla.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/php-email-form/validate.js" strategy="afterInteractive" />
    </>
  );
}

export default MyApp;