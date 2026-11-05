import { Html, Head, Main, NextScript } from "next/document";

const DEFERRED_CSS = [
  "https://fonts.googleapis.com/css2?family=Lato:wght@500&display=swap",
  "/assets/vendor/bootstrap-icons/bootstrap-icons.css",
  "/assets/vendor/swiper/swiper-bundle.min.css",
];

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta
          name="google-site-verification"
          content="CzWLARYO0jb-7dMxMmmlIpgaYOns7sMFkXkc0z8D0Hw"
        />
        {/* Favicon — RS logo (ICO first for broad browser support) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="application-name" content="RedSpider" />
        <meta name="apple-mobile-web-app-title" content="RedSpider" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/assets/css/main.css" />

        {/* Non-critical CSS is added by script so it does not block rendering.
            It is inserted before main.css to keep the existing cascade order. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=document.querySelector('link[href="/assets/css/main.css"]');${JSON.stringify(DEFERRED_CSS)}.forEach(function(h){var l=document.createElement('link');l.rel='stylesheet';l.href=h;m.parentNode.insertBefore(l,m);});})();`,
          }}
        />
        <noscript>
          {DEFERRED_CSS.map((href) => (
            <link key={href} rel="stylesheet" href={href} />
          ))}
        </noscript>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
