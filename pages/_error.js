import NextError from "next/error";
import NotFoundPage from "./404";

/**
 * Production error handler for Pages Router.
 *
 * Unmatched routes already use pages/404.js.
 * Dynamic routes that return { notFound: true } stay on the matched
 * path in production (Vercel) and render this page instead of 404.js.
 * Reuse the branded 404 UI without changing the invalid URL.
 */
function Error({ statusCode }) {
  if (statusCode === 404) {
    return <NotFoundPage />;
  }

  return <NextError statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
