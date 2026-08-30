/**
 * Loads a page stylesheet from /assets/css/pages/*.css
 * Rendered as <link> tags (not next/head) to avoid Next.js warnings.
 */
export default function PageStyles({ href }) {
  if (!href) return null;

  const hrefs = Array.isArray(href) ? href : [href];

  return (
    <>
      {hrefs.map((item) => (
        <link key={item} rel="stylesheet" href={item} precedence="default" />
      ))}
    </>
  );
}
