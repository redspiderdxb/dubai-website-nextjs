import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
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