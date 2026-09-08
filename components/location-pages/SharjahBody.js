import Link from "next/link";

const services = [
  {
    title: "Web Development",
    href: "/service/web-development/",
  },
  {
    title: "eCommerce Web Design",
    href: "/service/ecommerce-web-design-dubai/",
  },
  {
    title: "Logo Design",
    href: "/service/logo-designing-company-dubai-brand-identity/",
  },
  {
    title: "Brochure Design",
    href: "/service/brochure-design-company-in-dubai/",
  },
  {
    title: "Graphic Design",
    href: "/service/graphic-design-services/",
  },
  {
    title: "Web Hosting",
    href: "/service/web-hosting/",
  },
  {
    title: "Mobile App Development",
    href: "/service/mobile-app-development-company-dubai/",
  },
  {
    title: "WhatsApp Business API",
    href: "/service/whatsapp-business-api-integration/",
  },
];

export default function SharjahBody() {
  return (
    <section className="location-page-body">
      <div className="container">
        <div className="row g-4 g-lg-5">
          {/* =====================================
              MAIN CONTENT
          ====================================== */}

          <div className="col-md-9 col-12">
            <div className="location-page-content">
              
              <p>
                Looking for Web Development &amp; Web Design Sharjah expert that
                offers you incredibly affordable Deals And the best services?
                RedSpider provides the best solutions for your business needs in
                Sharjah.
              </p>

              <p>
                We can help you with creative solutions to your{" "}
                <Link href="/service/web-development/">web Design</Link>{" "}
                problems. We have a professional team of Web Designer Sharjah to
                provide you cost-effective{" "}
                <Link href="/service/web-development/">
                  web Design solutions
                </Link>{" "}
                according to your business goals. You no longer have to worry
                about finding the best solution for the Web Design Company in
                Sharjah. We can be your perfect match for a Web Development
                Company in Sharjah. We are premier Web Design specialists in
                Sharjah, delivering exceptional{" "}
                <Link href="/">Web Design Agency Dubai</Link> solutions. Now you
                no longer need to look anywhere else to find out the Best Web
                Designing Company in Sharjah.
              </p>

              <h2>Best Website Design Company in Sharjah</h2>

              <p>
                When you are in Sharjah, you must be looking for the Best
                Website Design and the most professional options for your
                Website Design requirements. Now you no longer have to worry
                about finding out the most appropriate choice because we are the
                one for you. We are located in the charger and provide you with
                custom-designed templates according to your business plan and
                requirements. To enhance the effectiveness of your business and
                to engage the customer and the targeted audience, we are
                providing you{" "}
                <Link href="/service/web-development/">
                  clear and clean design for your website
                </Link>
                .
              </p>

              <p>
                We specialize in not only website design services but also in
                other features as well. We can offer you the templates for your{" "}
                <Link href="/service/ecommerce-web-design-dubai/">
                  E-Commerce business
                </Link>
                , and we can also help you with your engagement solutions.
              </p>

              <p>
                We have some top-notch Web Design for your business. We can also
                offer you customized web design templates in Sharjah according
                to your business goals that you might be considering to help you
                with other features and functions that you might require to
                engage your audience and earn the maximum revenue. Whether you
                are looking for the options regarding the branding of your
                business or you are looking for interactive and creative Sharjah
                Web Design, we can help you with everything you want. There are
                Consultancy Services also available to help you with{" "}
                <Link href="/service/ecommerce-web-design-dubai/">
                  E-Commerce solutions
                </Link>
                . There are some other incredible features that we offer
                according to the client’s requirements.
              </p>

              <h2>
                Explore Our Web Development &amp; Web Design Sharjah Services
              </h2>

              <p>
                What services do we offer to the people who are looking for a
                Web Development Company &amp; Web Design in Sharjah?
              </p>

              <div className="main_features">
                <ul>
                  <li>
                    We offer{" "}
                    <Link href="/service/logo-designing-company-dubai-brand-identity/">
                      Logo Design Services
                    </Link>
                    .
                  </li>

                  <li>
                    We also offer{" "}
                    <Link href="/service/brochure-design-company-in-dubai/">
                      profile design and brochure design
                    </Link>
                    .
                  </li>

                  <li>
                    You can get the E-Commerce solution from our Website Design
                    Company in Sharjah.
                  </li>

                  <li>
                    Get your{" "}
                    <Link href="/service/logo-designing-company-dubai-brand-identity/">
                      logo designed
                    </Link>{" "}
                    by us.
                  </li>

                  <li>
                    Get the custom template for your business from our Website
                    Design Company Sharjah and the{" "}
                    <Link href="/service/graphic-design-services/">
                      graphic designing services
                    </Link>{" "}
                    and other Consultancy Services.
                  </li>

                  <li>
                    Get the{" "}
                    <Link href="/service/web-hosting/">
                      Web Hosting Service
                    </Link>{" "}
                    from us.
                  </li>
                </ul>
              </div>

              <p>
                You can get all of these services in a very cost-effective
                manner. <Link href="/">RedSpider</Link> is one of the top-notch
                and award-winning Website Design Company Sharjah that can
                provide you with the best services at a very minimal price. Not
                only that, we can offer you various features and services along
                with <Link href="/">Dubai web designing</Link> and branding
                options. We can help you target the audience most appropriately.
                There’s a lot more than you can discover after you visit our
                website. Check our website now for the Best Web Designing
                Services in Sharjah.
              </p>

              <div className="location-page-actions">
                <Link href="/our-portfolio/" className="contactusbutton">
                  View Portfolio
                </Link>

                <Link
                  href="/contact-us/"
                  className="contactusbutton quote-button"
                >
                  Submit Your Details and Get Quote
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================
              SERVICES SIDEBAR
          ====================================== */}

          <div className="col-md-3 col-12">
            <aside className="location-services-sidebar">
              <div className="location-services-card">
                <div className="location-services-heading">
                  <span className="rs-creative-kicker">Our Services</span>

                  <h2>Explore Our Services</h2>
                </div>

                <div className="location-services-list">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="location-service-item"
                    >
                      <span>{service.title}</span>

                      <i
                        className="bi bi-arrow-up-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
