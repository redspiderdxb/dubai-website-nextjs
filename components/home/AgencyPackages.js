import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AgencyPackages() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    const cards = cardsRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, { opacity: 1, y: 0 });
      } else {
        gsap.set(card, { opacity: 0, y: 50 });
      }

      tl.to(card, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }).to(
        cards[index + 1] || card,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        },
        "-=1",
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const servicesList = [
    "Corporate Website Design",
    "Ecommerce Development",
    "Custom Web Application",
    "Website Redesign",
    "Responsive Web Design",
  ];

  const locations = [
    "Business Bay",
    "Downtown Dubai",
    "Dubai Marina",
    "DIFC",
    "Palm Jumeirah",
    "JVC",
    "Dubai Hills",
    "Arabian Ranches",
    "Dubai Creek Harbour",
    "Bluewaters Island",
    "Al Barsha",
    "Dubai Silicon Oasis",
    "Deira",
    "Al Quoz",
    "Jumeirah",
    "Media City",
    "Internet City",
    "Dubai Harbour",
    "Al Barari",
    "Al Furjan",
    "MBR City",
    "Dubai Land",
    "Sharjah",
  ];

  const features = [
    "Custom website designs that reflect the story and values of your brand",
    "User-friendly websites that work smoothly on all devices",
    "SEO-friendly website offering reliable search engine visibility",
    "Integration with the tools and systems your business needs",
    "Ongoing support and maintenance to keep your website running smoothly",
  ];

  const accordionItems = [
    {
      id: "rsAccTwo",
      show: false,
      title: "Websites Designed to Attract and Engage Customers ",
      content: (
        <>
          <p>
            Looking for an experienced web designer in Dubai? RedSpider is here
            to help. We create modern, user-friendly websites that are designed
            to match your business goals and leave a great first impression.
          </p>
          <p>
            Our team of web designers in Dubai speaks both Arabic and English,
            making communication simple and hassle-free throughout the project.
            Using professional design tools like Sketch, Adobe XD, and
            Photoshop, we create websites that not only look attractive but are
            also easy to use, fast, and built to perform.
          </p>
        </>
      ),
    },
    {
      id: "rsAccThree",
      show: false,
      title: "Ready to Build Your New Website?",
      content: (
        <>
          <p>
            At RedSpider, we create websites that are not only simple to use,
            but are mobile-friendly and optimized for a positive user
            experience. We don't use pre-designed templates, we design them
            according to your brand and business objectives. Call to action are
            placed at strategic points where the audience is likely to take
            action, such as contacting a business, making a purchase, or taking
            the next step. One the project is complete, you have the{" "}
            <b>full ownership to your website</b>.
          </p>
          <p>
            We use WordPress, Shopify, and Wix among others to build quick,
            custom, and easy to maintain web pages. From building a new website
            or revamping an current site, we create web pages that help you
            attract more customers, improve your online presence, and aid your
            organization's growth.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {/* GSAP Agency Cards */}
      <section ref={sectionRef} className="rs-gsap-stack-sec">
        <div className="container" style={{ maxWidth: "1900px" }}>
          <div className="rs-gsap-cards">
            {/* Card 1 */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="rs-gsap-card rs-card-1"
            >
              <div className="rs-agency-card">
                <div className="row g-4 align-items-stretch">
                  <div
                    className="col-lg-4"
                    data-aos="fade-right"
                    data-aos-duration="1000"
                  >
                    <div className="rs-agency-image h-100">
                      <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                        alt="Website Design Agency Dubai office"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-8"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                  >
                    <div className="rs-agency-content h-100">
                      <div className="rs-agency-top">
                        <span>[ 001 ]</span>
                        <small>WEBSITE / DESIGN / DEVELOPMENT</small>
                      </div>
                      <h2>Websites Built Around Your Business</h2>
                      <p className="rs-lead">
                        Businesses or brands can trust Redspider Digital Agency
                        as their trusted partner. You can get professional
                        website design and web development services at
                        affordable rates. We also offer digital solutions in
                        Dubai and all across the UAE.
                      </p>
                      <div className="row g-4 mt-4">
                        <div className="col-md-8">
                          <p>
                            We will strengthen your online presence and help
                            attract new customers. To achieve sustainable growth
                            having a modern and user focused website it highly
                            important. It wiill promote your achieve and you can
                            achieve your business goals.
                          </p>
                          <p>
                            The competition among companies is intense, and if
                            you want to win, focusing on advanced technology and
                            creativity matter. We can create visually appealing
                            websites that are fast, visually appealing and give
                            high quality performance. When the true brand
                            identity is reflected in the true sense, audience
                            choose to be loyal.
                          </p>
                          <p>
                            Customers dont like websites that are slow, but when
                            they have a good browsing experience they spend more
                            time on that website. We make sure that your website
                            functions well, whether it is desktop, table or
                            mobile device.
                          </p>
                        </div>
                        <div className="col-md-4">
                          <div className="rs-agency-list">
                            <span>SERVICES:</span>
                            <ul>
                              {servicesList.map((service, idx) => (
                                <li key={idx}>{service}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <p>
                        At Redspider, we understand that a website should be
                        much more than visually appealing. It should communicate
                        your message to the customers and build trust. If you
                        are launching a new business, It will also enhance your
                        long-term business value.
                      </p>
                      <p>
                        Whether it is the corporate website, an ecommerce
                        platform, or a custom web application, we offer the best
                        web design services in Dubai, UAE. Customers' digital
                        experience will improve when you have a website with an
                        outstanding design and reliable functionality. When
                        websites become old, they have many issues, but with us
                        you don't need to worry. We can{" "}
                        <strong>redesign your existing website </strong>and help
                        grow your digital presence.
                      </p>
                      <p>
                        <strong>Our experienced website</strong> designers and
                        web developers will create customized solutions that
                        align with your business goals. Your search ends here,
                        as Redspider is the trusted choice for any business
                        looking for a reliable website design and development
                        service in Dubai and UAE.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="rs-gsap-card rs-card-2"
            >
              <div className="rs-agency-card">
                <div className="row g-4 align-items-stretch">
                  <div
                    className="col-lg-8"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                  >
                    <div className="rs-agency-content h-100">
                      <div className="rs-agency-top">
                        <span>[ 002 ]</span>
                        <small>USER EXPERIENCE / PERFORMANCE / GROWTH</small>
                      </div>

                      <h2>
                        Building Digital Experiences That Help Businesses Grow
                      </h2>

                      <p className="rs-lead">
                        A successful website is more than just a digital
                        presence. It should be easy to use, fast to load,
                        mobile-friendly and built to turn visitors into
                        potential customers.
                      </p>

                      <div className="row g-4 mt-4">
                        <div className="col-md-8">
                          <p>
                            We focus on creating smooth digital experiences that
                            make it easy for customers to find information,
                            explore your offerings and take the next step. Every
                            element is planned with usability, clarity and
                            performance in mind.
                          </p>

                          <p>
                            From mobile-friendly layouts and optimized page
                            performance to clear navigation and strong calls to
                            action, our approach helps businesses create
                            websites that are easier to use and more effective
                            at generating enquiries.
                          </p>
                        </div>

                        <div className="col-md-4">
                          <div className="rs-agency-list">
                            <span>FOCUS AREAS:</span>

                            <ul>
                              <li>User Experience</li>
                              <li>Mobile Usability</li>
                              <li>Website Performance</li>
                              <li>Lead Generation</li>
                              <li>Scalability</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p>
                        A strong digital presence also builds credibility. By
                        combining a professional interface, reliable performance
                        and a clear customer journey, we help businesses create
                        a website that can support their current goals while
                        remaining ready to scale as the business grows.
                      </p>

                      <div className="rs-agency-dots">
                        <span>
                          <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"
                            alt="Website analytics and business growth"
                            loading="lazy"
                          />
                        </span>

                        <span>
                          <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=300&q=80"
                            alt="Digital team collaboration"
                            loading="lazy"
                          />
                        </span>

                        <span>
                          <img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=300&q=80"
                            alt="Business technology and performance"
                            loading="lazy"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-lg-4"
                    data-aos="fade-right"
                    data-aos-duration="1000"
                  >
                    <div className="rs-agency-image h-100">
                      <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                        alt="Modern digital workspace"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Locations */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="rs-gsap-card rs-card-3"
            >
              <div className="rs-agency-card h-100">
                <div className="row g-5 h-100">
                  <div className="col-lg-4">
                    <div className="rs-agency-image h-100">
                      <img
                        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
                        className="w-100 h-100 object-fit-cover rounded-4"
                        alt="Dubai Skyline"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 d-flex align-items-center">
                    <div className="rs-agency-content w-100">
                      <div className="rs-agency-top">
                        <span>[ 003 ]</span>
                        <small>LOCATIONS / DUBAI / UAE</small>
                      </div>
                      <h2>Working With Businesses Across Dubai & the UAE</h2>
                      <p className="mb-4">
                        RedSpider provides professional website design and web
                        development services across Dubai, Sharjah and the UAE.
                        Our experienced team works with startups, SMEs,
                        corporate businesses and enterprises, delivering modern
                        websites that help businesses grow online.
                      </p>
                      <div className="rs-location-list">
                        {locations.map((location, idx) => (
                          <span key={idx}>{location}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="rs-packages-sec bluelight-backgroun section">
        <div className="container" style={{ maxWidth: "1500px" }}>
          <div className="row g-5 align-items-stretch">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="rs-left-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="rs-join">CREATING GREAT OPPORTUNITIES</span>
                  <hr />
                  <h4 className="mt-4">
                    We help Making your dream into Reality
                  </h4>
                </div>
                <div className="google-box my-2">
                  <img
                    src="assets/img/google-h.png"
                    alt="Google rating"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>
                <div className="quick-contect">
                  <small>RedSpider is rated</small>
                  <h5>4.9 Stars</h5>
                  <small>
                    based on 100+ reviews in Google Business listing.
                  </small>
                </div>
                <div className="rs-arrow-btn mt-4">
                  <span>
                    <a href="contactus.html">
                      <img
                        src="assets/img/arrow-icon-40.svg"
                        alt="Contact us"
                        className="arrow-40deg-icon"
                        loading="lazy"
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="900"
                >
                  <div className="p-2">
                    <div className="section-title text-start mb-0">
                      <h2 data-aos="fade-up">
                        Why Businesses Choose RedSpider
                      </h2>
                      <p className="text-dark mt-4" data-aos="fade-up">
                        Redspider has become a trusted choice for website design
                        in Dubai as we have 14 years of experience in the
                        industry. We have completed around 1500+ successful
                        projects and the number continues to grow as we aim a
                        higher number. Our web designers are highly skilled who
                        are helping various businesses have a strong online
                        presence. We not only create new websites but also
                        upgrade existing ones with full convition. Your website
                        will look visually appealing and that helps grow your
                        business over time.
                      </p>
                      <p className="text-dark mt-4" data-aos="fade-up">
                        <strong>Our web design Dubai services include:</strong>
                      </p>
                      <a
                        href="about-us.html"
                        className="btn btn-animation btn-red d-inline-flex align-items-center mt-4"
                        data-aos="fade-up"
                        data-aos-delay="550"
                      >
                        <span className="btn-title">Know More About</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-6"
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="1000"
                >
                  <div className="rs-card">
                    <ul>
                      {features.map((feature, idx) => (
                        <li
                          key={idx}
                          data-aos="fade-left"
                          data-aos-delay={400 + idx * 50}
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div
                      className="liimg mt-5"
                      data-aos="zoom-in"
                      data-aos-delay="700"
                      data-aos-duration="1000"
                    >
                      <img
                        src="assets/img/cpane-laptop.png"
                        className="img-fluid"
                        alt="Laptop with web design"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="rs-creative-sec pt-0">
        <div className="container-fluid p-0">
          <div className="row g-0 rs-creative-row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="rs-creative-img">
                <img
                  src="assets/img/rs-features.jpg"
                  alt="Creative design studio"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="rs-creative-content">
                <div className="rs-creative-inner">
                  <div className="rs-process-title-sec">
                    <h2 className="rs-process-title mb-4 text-start">
                      <span className="rs-title-black">Why Businesses</span>

                      <span className="rs-process-highlight">
                        Choose Our Web Design Company
                        <svg
                          className="rs-process-underline"
                          viewBox="0 0 320 22"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14"></path>
                        </svg>
                      </span>
                    </h2>
                    <p className="rs-process-text">
                      We do not use a standard template, as they are not always
                      suitable for long-term business.
                    </p>
                  </div>

                  <div
                    className="rs-creative-accordion accordion"
                    id="rsCreativeAccordion"
                  >
                    {accordionItems.map((item, idx) => (
                      <div className="accordion-item" key={idx}>
                        <h3 className="accordion-header">
                          <button
                            className={`accordion-button ${!item.show ? "collapsed" : ""}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${item.id}`}
                            aria-expanded={item.show}
                          >
                            {item.title}
                          </button>
                        </h3>
                        <div
                          id={item.id}
                          className={`accordion-collapse collapse ${item.show ? "show" : ""}`}
                          data-bs-parent="#rsCreativeAccordion"
                        >
                          <div className="accordion-body">{item.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="readytobuild"
        className="readytobuild section light-background pt-0"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
            <a
              href="#"
              className="btn btn-animation btn-red d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">Schedule Free Consultation</span>
              <span className="btn-icon-wrap">
                <img
                  src="assets/img/icons/cc-icon.svg"
                  alt="Schedule consultation icon"
                  className="btn-icon"
                  loading="lazy"
                  width="24"
                  height="24"
                />
              </span>
            </a>
            <a
              href="#"
              className="btn btn-animation btn-black d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">Call Now</span>
              <span className="btn-icon-wrap">
                <img
                  src="assets/img/icons/phone.svg"
                  alt="Phone icon"
                  className="btn-icon"
                  loading="lazy"
                  width="24"
                  height="24"
                />
              </span>
            </a>
            <a
              href="https://wa.me/971505698733"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-animation btn-green d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">WhatsApp Us</span>
              <span className="btn-icon-wrap">
                <img
                  src="assets/img/icons/whatsapp.svg"
                  alt="WhatsApp icon"
                  className="btn-icon"
                  loading="lazy"
                  width="24"
                  height="24"
                />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
