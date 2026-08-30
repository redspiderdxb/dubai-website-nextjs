import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        {/* Favicon — RS logo */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.webp" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />

        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
        />

        {/* Icons used above-the-fold (services, review stars) — must be blocking */}
        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
        />

        {/* Reviews carousel depends on Swiper styles */}
        <link
          rel="stylesheet"
          href="/assets/vendor/swiper/swiper-bundle.min.css"
        />

        <link rel="stylesheet" href="/assets/css/main.css" />

        <link rel="stylesheet" href="/assets/fonts/stylesheet.css" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
