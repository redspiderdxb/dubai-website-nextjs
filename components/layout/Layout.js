import Script from "next/script";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import globalSchema from "../../lib/schema/global.json";

export default function Layout({ children, includeGlobalSchema = true }) {
  return (
    <>
      <Head>
        {includeGlobalSchema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(globalSchema),
            }}
          />
        ) : null}
      </Head>

      {/* =================================================
          REDSPIDER TITLE / GSAP EFFECTS
      ================================================= */}

      <Script
        src="/assets/js/title-effect.js?v=stack-gsap-4"
        strategy="lazyOnload"
      />

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
