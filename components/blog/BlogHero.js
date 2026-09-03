import Link from "next/link";

export default function BlogHero({ title = "Latest Blog", breadcrumb = true }) {
  return (
    <section className="rs-inner-hero about-hero hero-marquee blog-hero-custom">
      <div className="rs-hero-overlay" aria-hidden="true"></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              <span className="rs-blog-hero-kicker">From the studio</span>

              <h1 className="rs-process-title mb-3">
              Latest  {" "}
                <span className="rs-process-highlight">
                  Blog
                  <svg
                    className="rs-process-underline"
                    viewBox="0 0 320 22"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                  </svg>
                </span>
                - Stories, ideas and digital thinking from RedSpider Dubai
              </h1>

  
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
