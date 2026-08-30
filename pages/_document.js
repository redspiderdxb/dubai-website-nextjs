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
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
          media="print"
          // eslint-disable-next-line react/no-unknown-property
          onLoad="this.media='all'"
        />

        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </noscript>

        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          media="print"
          // eslint-disable-next-line react/no-unknown-property
          onLoad="this.media='all'"
        />

        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        </noscript>

        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
        />

        <link rel="stylesheet" href="/assets/css/main.css" />

        <link rel="stylesheet" href="/assets/fonts/stylesheet.css" />

        {/* Non-critical CSS — load without blocking first paint / Speed Index */}
        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          media="print"
          // eslint-disable-next-line react/no-unknown-property
          onLoad="this.media='all'"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          media="print"
          // eslint-disable-next-line react/no-unknown-property
          onLoad="this.media='all'"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/swiper/swiper-bundle.min.css"
          media="print"
          // eslint-disable-next-line react/no-unknown-property
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendor/glightbox/css/glightbox.min.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendor/swiper/swiper-bundle.min.css"
          />
        </noscript>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
