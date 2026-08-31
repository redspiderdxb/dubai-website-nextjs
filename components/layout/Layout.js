import Script from "next/script";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const FONTS_CSS = "/assets/css/shared/fonts.css?v=lato-medium";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={FONTS_CSS} key="rs-site-fonts" />
      </Head>
      {/* =================================================
          REDSPIDER TITLE / GSAP EFFECTS
      ================================================= */}

      <Script
        src="/assets/js/title-effect.js?v=stack-gsap-4"
        strategy="afterInteractive"
      />

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}