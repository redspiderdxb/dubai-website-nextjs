// components/blog/BlogHero.js

import Link from "next/link";

export default function BlogHero({ title = "Latest Blog", breadcrumb = true }) {
  return (
    <section className="about-hero hero-marquee blog-hero-custom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">{title}</h1>

              {breadcrumb && (
                <nav className="breadcrumbs">
                  <ol>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li className="current">{title}</li>
                  </ol>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
