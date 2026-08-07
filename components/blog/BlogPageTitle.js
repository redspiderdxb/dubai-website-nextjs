import Link from "next/link";

export default function BlogPageTitle({ title, breadcrumb = true }) {
  // Agar title nahi diya gaya toh fallback
  const pageTitle = title || "Latest Blog";

  return (
    <div
      className="page-title dark-background"
      data-aos="fade"
      style={{ backgroundImage: 'url(/assets/img/plans-bg.png)' }}
    >
      <div className="container position-relative">
        <h1>{pageTitle}</h1>
        
        {/* Breadcrumb — Optional */}
        {breadcrumb && (
          <nav className="breadcrumbs">
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
        )}
      </div>
    </div>
  );
}