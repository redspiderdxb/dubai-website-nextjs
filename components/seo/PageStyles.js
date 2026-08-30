import Head from "next/head";

/**
 * Loads a page stylesheet from /assets/css/pages/*.css
 * (Next.js only allows webpack global CSS imports from _app.js)
 */
export default function PageStyles({ href }) {
  if (!href) return null;

  const hrefs = Array.isArray(href) ? href : [href];

  return (
    <Head>
      {hrefs.map((item) => (
        <link key={item} rel="stylesheet" href={item} />
      ))}
    </Head>
  );
}
