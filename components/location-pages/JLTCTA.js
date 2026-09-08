import Link from "next/link";

export default function JLTCTA() {
  return (
    <section className="location-page-cta">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">
            <span className="rs-creative-kicker">
              Start Your Project
            </span>

            <h2>
              Ready to Build Your Website in JLT Dubai?
            </h2>

            <p>
              Talk to RedSpider about your website requirements
              and digital goals.
            </p>

            <Link
              href="/contact-us/"
              className="rs-creative-btn"
            >
              Speak to an Expert
              <i
                className="bi bi-arrow-up-right"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}