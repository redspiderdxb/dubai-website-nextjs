import Link from "next/link";

export default function BlogPageTitle({ title, breadcrumb = true }) {
  const pageTitle = title || "Latest Blog";

  return (
    <>
      <div
        className="page-title dark-background"
        data-aos="fade"
        style={{ backgroundImage: "url(/assets/img/plans-bg.webp)" }}
      >
        <div className="container position-relative"></div>
      </div>

      {breadcrumb && (
        <div className="container blog-detail-breadcrumb-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li className="current">{pageTitle}</li>
            </ol>
          </nav>
        </div>
      )}
    </>
  );
}
