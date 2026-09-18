import Layout from "../components/layout/Layout";
import PageStyles from "../components/seo/PageStyles";
import SEO from "../components/seo/SEO";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <Layout>
      <PageStyles href="/assets/css/pages/not-found.css" />
      <SEO
        title="Page Not Found | RedSpider"
        description="Sorry, the page you're looking for doesn't exist or may have been moved."
        robots="noindex,follow"
      />

      <section className="rs-not-found" aria-labelledby="rs-not-found-title">
        <div className="rs-not-found__glow" aria-hidden="true" />

        <div className="container">
          <div className="rs-not-found__inner">
            <p className="rs-not-found__code" aria-hidden="true">
              404
            </p>

            <span className="rs-not-found__icon" aria-hidden="true">
              <i className="bi bi-compass" />
            </span>

            <h1 id="rs-not-found-title">Page Not Found</h1>

            <p className="rs-not-found__copy">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or may
              have been moved.
            </p>

            <Button color="red" href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
