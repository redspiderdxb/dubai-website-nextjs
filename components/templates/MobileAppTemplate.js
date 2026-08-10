// frontend/components/templates/MobileAppTemplate.js
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function MobileAppTemplate({ data }) {
  if (!data) return <div className="text-center py-5">Loading...</div>;

  // ============================================
  // ✅ DYNAMIC FIELDS - Backend se aayenge
  // ============================================
  const {
    name,
    description,
    content,
    image,
    hero_title,
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading,
    intro_main_heading,
    intro_description,
    intro_image,
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,
    // Repeater Data
    features = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],
  } = data;

  // ============================================
  // 📊 DYNAMIC DATA WITH STATIC FALLBACK
  // ============================================

  // 1. Services/Features - Dynamic from backend
  const servicesData =
    features.length > 0
      ? features
      : [
          {
            title: "Android App Development",
            description:
              "Android applications are designed to run across a wide range of smartphones and tablets, offering flexibility and extensive market reach.",
          },
          {
            title: "iOS App Development",
            description:
              "iOS apps provide smooth performance and premium user experiences for users on Apple devices such as iPhones and iPads.",
          },
          {
            title: "Cross-Platform Mobile Applications",
            description:
              "Cross-platform development allows applications to run on both Android and iOS using a shared codebase, reducing development time and cost.",
          },
          {
            title: "App UI/UX Design",
            description:
              "User interface and user experience designs are created to ensure intuitive navigation and engaging interactions.",
          },
          {
            title: "Mobile App Testing And Quality Assurance",
            description:
              "Extensive testing is conducted to ensure smooth functionality across multiple devices and operating systems.",
          },
          {
            title: "App Maintenance And Support",
            description:
              "Updates and maintenance are important to ensure compatibility with new operating system versions and device updates.",
          },
          {
            title: "Enterprise Mobile App Solutions",
            description:
              "Enterprise mobile solutions are designed to support large-scale business operations and workflows.",
          },
        ];

  // Service icons mapping
  const serviceIcons = [
    "ma-1.svg",
    "ma-2.svg",
    "ma-3.svg",
    "ma-4.svg",
    "ma-5.svg",
    "ma-6.svg",
    "ma-7.svg",
  ];

  // 2. Key Features (Static - Will be dynamic later)
  const keyFeatures = [
    "Secure user authentication systems",
    "Push notifications for user engagement",
    "Real-time data synchronization",
    "High-performance user interface",
    "Analytics and reporting integration",
    "Scalable backend architecture",
    "Payment gateway integration",
  ];

  // 3. Platforms/Technologies - Dynamic from backend
  const platformsData =
    technologies.length > 0
      ? technologies
      : [
          {
            name: "Android App Development",
            description:
              "Android applications are designed to run across a wide range of smartphones and tablets, offering flexibility and extensive market reach.",
            icon: "android.svg",
          },
          {
            name: "iOS App Development",
            description:
              "iOS apps provide smooth performance and premium user experiences for users on Apple devices such as iPhones and iPads.",
            icon: "ios.svg",
          },
          {
            name: "Cross-Platform Mobile Apps",
            description:
              "Cross-platform development allows applications to run on both Android and iOS using a shared codebase, reducing development time and cost.",
            icon: "cross-platform.svg",
          },
          {
            name: "Progressive Web Apps (PWA)",
            description:
              "PWAs provide app-like experiences through web browsers, allowing businesses to reach users without requiring app store downloads.",
            icon: "pwa.svg",
          },
        ];

  // 4. Process Steps - Dynamic from backend
  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "The development process begins with understanding business objectives, user needs, and project requirements.",
          },
          {
            title: "UI/UX Design",
            description:
              "User interface and user experience designs are created to ensure intuitive navigation and engaging interactions.",
          },
          {
            title: "Application Development",
            description:
              "Our developers build the application using modern frameworks and scalable technologies.",
          },
          {
            title: "Testing and Quality Assurance",
            description:
              "Extensive testing is conducted to ensure smooth functionality across multiple devices and operating systems.",
          },
          {
            title: "Deployment",
            description:
              "The application is deployed on the appropriate platforms such as Google Play Store or Apple App Store.",
          },
        ];

  // Process images
  const processImages = [
    "map-1.jpg",
    "map-2.jpg",
    "map-3.jpg",
    "map-4.jpg",
    "map-5.jpg",
  ];

  // 5. Why Choose Us (Static - Will be dynamic later)
  const whyChooseUs = [
    {
      icon: "why-1.svg",
      title: "Experienced Mobile App Development Team",
      description:
        "Trusted and Experienced Mobile App Development Team for Custom Business Applications.",
    },
    {
      icon: "why-4.svg",
      title: "Scalable Development Approach",
      description:
        "Built with a Scalable Development Approach to Handle Increasing Traffic, Features, and Business Growth.",
    },
    {
      icon: "why-3.svg",
      title: "Secure and Reliable Solutions",
      description:
        "Built with strong security and dependable performance you can trust.",
    },
    {
      icon: "why-2.svg",
      title: "Ongoing Technical Support",
      description:
        "We're always here to support, maintain, and improve your system.",
    },
  ];

  // 6. Industries (Static - Will be dynamic later)
  const industries = [
    { icon: "ecommerce.svg", name: "ECommerce and Retail Businesses" },
    { icon: "logistics.svg", name: "Logistics and Delivery Companies" },
    { icon: "healthcare.svg", name: "Healthcare Service Providers" },
    { icon: "education.svg", name: "Educational Institutions" },
    { icon: "realestate.svg", name: "Real Estate Companies" },
    { icon: "corporate.svg", name: "Corporate Service Providers" },
  ];

  // 7. FAQ Data - Dynamic from backend or static fallback
  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "How much does mobile app development cost in Dubai?",
            answer:
              "The cost of mobile app development depends on factors such as app complexity, features, platform choice, and integration requirements.",
          },
          {
            question: "How long does it take to develop a mobile application?",
            answer:
              "Development timelines typically range from several weeks to a few months depending on the scope and functionality of the project.",
          },
          {
            question: "Should businesses develop Android or iOS apps first?",
            answer:
              "The choice depends on the target audience and business goals. Many companies begin with one platform and later expand to additional platforms.",
          },
          {
            question: "What technologies are used for mobile app development?",
            answer:
              "Mobile applications are built using technologies such as Swift, Kotlin, Flutter, React Native, and other modern development frameworks.",
          },
          {
            question:
              "Can existing mobile applications be upgraded or redesigned?",
            answer:
              "Yes, existing mobile apps can be redesigned or upgraded to improve performance, add new features, or enhance user experience.",
          },
          {
            question: "Are mobile applications secure for business operations?",
            answer:
              "Properly developed applications include security features such as data encryption, secure authentication, and protection against vulnerabilities.",
          },
          {
            question: "Do mobile apps require regular maintenance?",
            answer:
              "Yes. Updates and maintenance are important to ensure compatibility with new operating system versions and device updates.",
          },
          {
            question:
              "Can mobile apps integrate with websites or other systems?",
            answer:
              "Mobile applications can be integrated with websites, payment systems, CRM platforms, and other digital tools.",
          },
          {
            question:
              "What is the difference between native and cross-platform apps?",
            answer:
              "Native apps are built specifically for one platform, while cross-platform apps use shared code to run on multiple platforms.",
          },
          {
            question: "How do mobile apps help businesses grow?",
            answer:
              "Mobile apps improve customer engagement, provide convenient services, and enable businesses to deliver personalized experiences to users.",
          },
        ];

  // 8. Gallery Images - Dynamic from backend
  const galleryImages = gallery.length > 0 ? gallery : [];

  return (
    <>
      {/* Hero Section */}
      <ServiceHero service={data} />

      {/* Mobile App Development Hero Banner */}
      <section id="hero-banner" className="hero-banner section rs-full-section">
        <div className="rs-hero-banner">
          <div className="container" style={{ maxWidth: "1500px" }}>
            {/* Row 1 */}
            <div className="row align-items-center text-center text-lg-start mb-5">
              <div className="col-lg-12">
                <h1 className="hero-titleinner">
                  <strong>Mobile App Development</strong> company in{" "}
                  <span className="title-red">Dubai</span>
                </h1>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row align-items-center g-4 text-center text-lg-start mt-4">
              {/* Col 1 */}
              <div className="col-12 col-lg-4">
                <p className="rs-desc pe-md-5">
                  Mobile applications have become an essential part of modern
                  business strategies. Companies across Dubai are using mobile
                  apps to improve customer engagement, streamline operations,
                  and provide convenient digital services to their users.
                </p>
                <p>
                  At RedSpider, our mobile app development services focus on
                  building scalable, secure, and userfriendly applications for
                  both startups and established businesses. From concept
                  planning to deployment, our team develops mobile apps designed
                  to deliver seamless performance across devices while
                  supporting long-term business growth.
                </p>
              </div>

              {/* Col 2 */}
              <div className="col-12 col-lg-6">
                <div className="rs-video-wrapper">
                  <div className="video-wrapper">
                    <video autoPlay muted loop playsInline>
                      <source
                        src="/assets/img/videos/UIUX.mov"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>

              {/* Col 3 */}
              <div className="col-12 col-lg-2 d-flex justify-content-center justify-content-lg-end">
                <div className="rs-circle-wrap">
                  <a href="#" className="rs-circle-btn">
                    <span className="rs-arrow">↗</span>
                    <h3 className="rs-text">
                      Get In <br /> Touch
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Services */}
      <section
        id="mobile-app-ser"
        className="mobile-app-ser section dark-background rs-service-grid-outline"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold">
              Mobile App Development Services We Provide
            </h2>
            <p className="rs-subtitle">
              Our mobile app development services cover the entire lifecycle of
              mobile application creation, from initial concept planning to
              deployment and maintenance.
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1150px" }}>
          {/* Top Row - First 4 services */}
          <div className="row rs-grid-row text-center">
            {servicesData.slice(0, 4).map((service, index) => (
              <div className="col-lg-3 col-md-6 rs-grid-item" key={index}>
                <div className="grid-box">
                  <img
                    src={`/assets/img/icons/${serviceIcons[index]}`}
                    className="rs-icon-ser mb-3"
                    alt={service.title}
                  />
                  <h6
                    dangerouslySetInnerHTML={{
                      __html: service.title.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row - Next 3 services */}
          <div className="row rs-grid-row text-center">
            {servicesData.slice(4, 7).map((service, index) => (
              <div className="col-lg-4 col-md-6 rs-grid-item" key={index + 4}>
                <img
                  src={`/assets/img/icons/${serviceIcons[index + 4]}`}
                  className="rs-icon-ser mb-3"
                  alt={service.title}
                />
                <h6
                  dangerouslySetInnerHTML={{
                    __html: service.title.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-5" style={{ maxWidth: "950px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <h6 className="ma-info">
                Each project is developed with a focus on performance,
                usability, and scalability to ensure the application supports
                business objectives effectively.
              </h6>
            </div>
            <div className="col-12 text-center">
              <a
                href="#"
                className="btn btn-animation btn-red d-inline-flex align-items-center gap-3 mt-4"
              >
                <span className="btn-title">Schedule Free Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Mobile App Development */}
      <section
        id="mobile-app-bs"
        className="mobile-app-bs section light-background dot-bg py-5"
      >
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold mb-4">
              Professional Mobile App Development for Businesses
            </h2>
            <p className="rs-subtitle mb-4">
              Mobile applications help businesses deliver services directly to
              users through smartphones and tablets. With the increasing use of
              mobile devices, companies in Dubai are adopting mobile
              applications to enhance customer experience, automate processes,
              and expand their digital presence. Our mobile app development
              solutions are designed to meet diverse business needs. Whether it
              is an ecommerce platform, service application, or enterprise
              system, we build mobile apps that combine intuitive design with
              powerful functionality.
            </p>
            <p>
              By understanding business goals and target audience behavior, we
              develop mobile applications that support operational efficiency
              and long-term digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features py-5">
        <div className="container" style={{ maxWidth: "1090px" }}>
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h2 className="kf-title mb-3">
                Key Features of Our Mobile Application
              </h2>
              <p className="kf-desc">
                Modern mobile applications must combine performance, usability,
                and security. Our mobile apps are developed with features
                designed to support both users and businesses.
              </p>
              <a
                href="#"
                className="btn btn-animation btn-black d-inline-flex align-items-center gap-3 mt-4"
              >
                <span className="btn-title">Call Now</span>
                <span className="btn-icon-wrap">
                  <img
                    src="/assets/img/icons/phone.svg"
                    alt=""
                    className="btn-icon"
                  />
                </span>
              </a>
            </div>

            {/* Center Image */}
            <div className="col-lg-4 text-center mb-4 mb-lg-0">
              <div className="kf-phone">
                <img
                  src="/assets/img/mobile-app.png"
                  alt="App Preview"
                  className="img-fluid"
                />
              </div>
            </div>

            {/* Right Features */}
            <div className="col-lg-4">
              <ul className="kf-list list-unstyled mb-3">
                {keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="kf-note">
                These features help ensure that applications remain reliable,
                secure, and capable of supporting growing user bases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Platforms */}
      <section className="dev-platform py-5 section dark-background">
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold mb-4">Mobile App Platforms We Develop</h2>
            <p className="rs-subtitle mb-4">
              Different platforms require different technologies and development
              approaches. Our team builds mobile applications using reliable
              frameworks and modern development tools to ensure compatibility
              across multiple devices.
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1600px" }}>
          <div className="row g-4">
            {platformsData.map((platform, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="dp-card h-100 justify-content-between d-flex flex-column">
                  <div className="dp-icon mb-3">
                    <img
                      src={`/assets/img/icons/${platform.icon || "android.svg"}`}
                      alt={platform.name}
                    />
                  </div>
                  <h5 className="dp-card-title">
                    {platform.name.toUpperCase()}
                  </h5>
                  <p className="dp-card-text">{platform.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Approach / Process */}
      <section id="process-sec" className="process-sec py-5">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold">PROJECT APPROACH</h2>
            <p className="rs-subtitle">
              How our work process connects with you
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1700px" }}>
          <div className="process-wrapper position-relative">
            <img
              src="/assets/img/step-arrow-bg.svg"
              className="process-arrow"
              alt=""
            />
            <div className="row justify-content-between text-center g-4">
              {processData.map((process, index) => (
                <div className="col-xl col-lg-4 col-md-6" key={index}>
                  <div
                    className={`process-item ${index % 2 === 1 ? "pt-lg-5 mt-lg-4" : ""}`}
                  >
                    <div className="process-img-wrap">
                      <span className="step">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="process-img">
                        <img
                          src={`/assets/img/service-graphic/${processImages[index]}`}
                          alt={process.title}
                        />
                      </div>
                    </div>
                    <h6>{process.title}</h6>
                    <p>{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container text-center mt-5">
          <a
            href="#"
            className="btn btn-animation btn-red d-inline-flex align-items-center gap-3"
          >
            <span className="btn-title">Schedule Free Consultation</span>
            <span className="btn-icon-wrap">
              <img
                src="/assets/img/icons/cc-icon.svg"
                alt=""
                className="btn-icon"
              />
            </span>
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="whychooseus"
        className="whychooseus section light-background"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold">Why Choose Us</h2>
            <p className="rs-subtitle">
              For Mobile App Development Services in Dubai?
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="row g-4">
            {whyChooseUs.map((item, index) => (
              <div className="col-12 col-md-6" key={index}>
                <div className="feature-card">
                  <div className="icon-wrap">
                    <img
                      src={`/assets/img/icons/${item.icon}`}
                      alt=""
                      className="why-icon"
                    />
                  </div>
                  <div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Build */}
      <section
        id="readytobuild"
        className="readytobuild section light-background"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold">Ready to build a strong brand identity?</h2>
            <p className="rs-subtitle">
              Let RedSpider create a professional logo that represents your
              business the right way.
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
            <a
              href="#"
              className="btn btn-animation btn-red d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">Schedule Free Consultation</span>
              <span className="btn-icon-wrap">
                <img
                  src="/assets/img/icons/cc-icon.svg"
                  alt=""
                  className="btn-icon"
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
                  src="/assets/img/icons/phone.svg"
                  alt=""
                  className="btn-icon"
                />
              </span>
            </a>
            <a
              href="https://wa.me/971505698733"
              target="_blank"
              className="btn btn-animation btn-green d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">Whatsapp Us</span>
              <span className="btn-icon-wrap">
                <img
                  src="/assets/img/icons/whatsapp.svg"
                  alt=""
                  className="btn-icon"
                />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="review-sec" className="review-sec section light-background">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.png"
              alt="Reviews"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* Industries Using Mobile Applications */}
      <section className="industry-devlopment section dark-background">
        <div className="container mb-4" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-normal">
              Industries Using Mobile Applications in UAE
            </h2>
            <p className="rs-subtitle">
              Mobile applications are widely used across many industries in the
              UAE to improve service delivery and customer interaction.
            </p>
          </div>
        </div>

        <div className="container text-center">
          {/* Row 1 */}
          <div className="d-flex justify-content-center mb-5 flex-wrap gap-3">
            <div className="ind-pill">
              <span className="ind-icon">
                <img src="/assets/img/icons/ecommerce.svg" alt="" />
              </span>
              <span>ECommerce and Retail Businesses</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="d-flex justify-content-center mb-5 flex-wrap gap-3">
            <div className="ind-pill">
              <span className="ind-icon">
                <img src="/assets/img/icons/logistics.svg" alt="" />
              </span>
              <span>Logistics and Delivery Companies</span>
            </div>
            <div className="ind-pill">
              <span className="ind-icon">
                <img src="/assets/img/icons/healthcare.svg" alt="" />
              </span>
              <span>Healthcare Service Providers</span>
            </div>
            <div className="ind-pill">
              <span className="ind-icon">
                <img src="/assets/img/icons/education.svg" alt="" />
              </span>
              <span>Educational Institutions</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <div className="ind-pill">
              <span className="ind-icon">
                <img src="/assets/img/icons/realestate.svg" alt="" />
              </span>
              <span>Real Estate Companies</span>
            </div>
            <div className="ind-pill">
              <span className="ind-icon">
                <img src="/assets/img/icons/corporate.svg" alt="" />
              </span>
              <span>Corporate Service Providers</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        id="rs-faq-sec"
        className="rs-faq-sec section py-5 light-background"
      >
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold">FAQ's</h2>
          </div>
          <div className="accordion rs-faq-custom" id="rsFaqOne">
            {faqData.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button rs-faq-btn ${index === 0 ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                  >
                    <span className="faq-icon">+</span>
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`faq${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                  data-bs-parent="#rsFaqOne"
                >
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ServiceCTA service={data} />
    </>
  );
}
