// frontend/components/product-templates/SmsMarketingTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function SmsMarketingTemplate({ data }) {
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
    features = [],
    processes = [],
    pricing = [],
    faqs = [],
    gallery = [],
  } = data;

  // ============================================
  // ❌ STATIC FIELDS - Abhi hardcoded (Future Dynamic)
  // ============================================

  // SMS Pricing Packages - Static (Future Dynamic)
  const smsPackages = [
    { name: "Up to 10,000 SMS", price: "1,000 (AED)" },
    { name: "Up to 25,000 SMS", price: "2,250 (AED)" },
    { name: "Up to 50,000 SMS", price: "4,000 (AED)" },
    { name: "Up to 100,000 SMS", price: "7,500 (AED)" },
    { name: "Up to 250,000 SMS", price: "17,500 (AED)" },
    { name: "Up to 500,000 SMS", price: "32,500 (AED)" },
    { name: "Up to 1,000,000 SMS", price: "60,000 (AED)" },
  ];

  // Location & Language Targeting - Static
  const locationTargets = [
    { icon: "bi-translate", title: "Language-Based Targeting", desc: "Arabic, English, Hindi, Urdu, Tagalog, and more." },
    { icon: "bi-globe", title: "Nationality-Based Targeting", desc: "Asians, Europeans, Africans, Americans, etc." },
    { icon: "bi-geo", title: "City & Area-Based Targeting", desc: "Target customers in Dubai, Abu Dhabi, Sharjah, and specific zones." },
    { icon: "bi-incognito", title: "Gender-Specific Targeting", desc: "Send campaigns to males or females based on product relevance." },
    { icon: "bi-person-hearts", title: "Age-Group Targeting", desc: "Reach teenagers, working professionals, or senior citizens." },
    { icon: "bi-wallet2", title: "High-Income & VIP Targeting", desc: "Engage high-salaried professionals and premium buyers." },
    { icon: "bi-person-workspace", title: "Workplace-Based Targeting", desc: "Reach professionals based on office location." },
    { icon: "bi-house-door", title: "Residence-Based Targeting", desc: "Target people in high-end areas or budget-friendly zones." },
    { icon: "bi-phone-flip", title: "Mobile & Network Targeting", desc: "iPhone users, Android users, or Etisalat/Du subscribers." },
  ];

  // Interest-Based Targeting - Static
  const interestTargets = [
    { icon: "bi-bag-check-fill", title: "Frequent Shoppers", desc: "Target people who regularly buy online or visit malls." },
    { icon: "bi-briefcase-fill", title: "Business Professionals", desc: "Engage decision-makers, managers, and entrepreneurs." },
    { icon: "bi-luggage", title: "Travel Lovers", desc: "Reach people who travel often for business or leisure." },
    { icon: "bi-egg-fried", title: "Food Lovers", desc: "Send offers to people who frequently visit restaurants and cafés." },
    { icon: "bi-clipboard-heart-fill", title: "Fitness & Health Enthusiasts", desc: "Engage gym-goers, diet-conscious, and sports lovers." },
    { icon: "bi-joystick", title: "Entertainment Fans", desc: "Target people who attend concerts, movies, and events." },
    { icon: "bi-person", title: "Students & Learners", desc: "Reach students, online learners, and professionals taking courses." },
    { icon: "bi-people", title: "Parents & Families", desc: "Market kids' products and family-oriented services." },
  ];

  // Smart Targeting - Static
  const smartTargets = [
    { icon: "bi-people", title: "Past Buyers", desc: "Target customers based on their previous shopping history." },
    { icon: "bi-bullseye", title: "Subscription-Based Targeting", desc: "Engage users subscribed to specific services." },
    { icon: "bi-tags", title: "Seasonal & Festive Offers", desc: "Run campaigns for Eid, Christmas, New Year, etc." },
    { icon: "bi-phone", title: "Cart Abandonment SMS", desc: "Convert potential buyers who left without purchasing." },
    { icon: "bi-percent", title: "Special Discounts & Offers", desc: "Offer deals to price-sensitive customers." },
  ];

  // Benefits - Static
  const benefitsLeft = [
    "Most affordable pricing in Bulk SMS Marketing UAE.",
    "Quick message delivery (around 14 SMS per second).",
    "Advanced support through email, online, telephone, and onsite services.",
    "Mobile number databases enable delivering your business message to the most relevant audiences.",
    "No monthly or setup charges; no specific size commitment.",
    "A user-friendly web-based application, developed by Website Development Company Dubai, allows bulk messaging and provides monthly/history analysis reports.",
    "Integration available for your existing desktop or web-based applications.",
    "Optional Bulk SMS Dubai replies are available.",
    "Reach thousands of targeted and potential customers simultaneously.",
  ];

  const benefitsRight = [
    "Messages can be sent and read anytime, anywhere.",
    "Can be delivered even to mobile phones not connected to the internet.",
    "Non-intrusive services.",
    "Viral marketing potential.",
    "Supports all Bulk SMS Dubai messages and GSM mobile phones.",
    "Messages can include binary data (e.g., logos, ringtones, etc.).",
    "Direct contact with your target audience and potential customers.",
    "Keeps customers updated with the latest information.",
    "Fast, simple, and cost-effective for marketing, services, and product launches.",
    "Enables effective marketing directly in the hands of your targeted and potential clients.",
  ];

  // App Features - Static
  const appFeatures = [
    "SMS Scheduling",
    "Group Messaging",
    "Message Templates",
    "Automated Responses",
    "Customizable Notifications",
    "Message Tracking",
    "Free Trail",
  ];

  return (
    <>
      {/* Hero */}
      <ServiceHero service={data} />

      {/* Hero Banner Section */}
      <section id="hero-banner" className="hero-banner section rs-full-section">
        <div className="rs-hero-banner">
          <div className="container pt-5">
            {/* Row 1 */}
            <div className="row align-items-center text-center text-lg-start mb-5 gy-4">
              <div className="col-12 col-lg-8">
                <h1 className="hero-titleinner text-center text-lg-start mb-0">
                  <strong>SMS Marketing and Bulk SMS</strong>
                  <span className="title-red">Dubai</span>
                </h1>
              </div>
              <div className="col-12 col-lg-4">
                <p className="rs-desc mb-0">
                  SMS Marketing is a highly effective way to reach your target
                  audience or potential customers instantly. Considering that the
                  UAE ranks among the top countries for mobile and smartphone usage,
                  our Bulk SMS Marketing UAE enables you to instantly reach your
                  target audience and deliver your business message across the
                  country.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row align-items-center g-4 text-center text-lg-start mt-4">
              <div className="col-12 col-lg-4 order-2 order-lg-1">
                <p>
                  We offer high-quality Bulk SMS marketing solutions at affordable
                  rates. You can start your SMS Marketing Dubai campaign for as low
                  as 0.6 AED (6 Fils) per SMS. Our bulk SMS Dubai packages are
                  designed to give you the best ROI while targeting the right
                  audience. Our exclusive databases are highly accurate and can be
                  filtered by income level, country, city, nationality, age, and
                  many other factors.
                </p>
                <p className="mb-0">
                  By using the services we offer regarding SMS Marketing Dubai, we
                  guarantee our customers the highest quality of bulk SMS in UAE
                  services available today. You can have a very peaceful mind
                  knowing that each SMS that will be delivered is completely secured
                  and sent at the right time to your entire potential customers.
                </p>
              </div>

              <div className="col-12 col-lg-6 order-1 order-lg-2">
                <div className="rs-video-wrapper mx-auto">
                  <div className="video-wrapper ratio ratio-16x9">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-100 h-100 object-fit-cover"
                    >
                      <source
                        src="/assets/img/videos/sms-marketing.mov"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-2 d-flex justify-content-center justify-content-lg-end order-3">
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

      {/* SMS Info */}
      <section id="sms-info" className="mobile-app-bs section light-background dot-bg py-5">
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold mb-4">
              Our Advanced SMS Marketing Targeting Options for Maximum ROI
            </h2>
            <p className="rs-subtitle">
              Email marketing continues to provide one of the highest returns among
              digital marketing strategies. Unlike many advertising channels, email
              allows businesses to communicate directly with subscribers who have
              already shown interest in their products or services.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="sms-price" className="rs-packages-sec line-bg-dark dark-background section">
        <div className="container" style={{ maxWidth: "1250px" }}>
          <div className="section-title text-center text-white mb-5">
            <h2 className="fw-bold">Our Best Graphic Designing Company Packages</h2>
            <p className="rs-subtitle">
              Choose the Best Graphic Design Company in Dubai with Packages that
              Suits Your Needs.
              <br />100% guaranteed satisfaction
            </p>
          </div>

          <div className="row g-4 align-items-stretch">
            <div className="col-lg-4">
              <div className="rs-left-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="rs-join">Join With Us</span>
                  <hr />
                  <h4 className="mt-4">Amazing Pricing For Growth Business</h4>
                  <div className="rs-arrow-btn mt-4">
                    <span>
                      <img
                        src="/assets/img/arrow-icon-40.svg"
                        alt=""
                        className="arrow-40deg-icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-5 quick-contect">
                  <small>Quick Contact</small>
                  <h5>: 971555515475</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-12">
                  <div className="rs-card">
                    <h6>SMS Quantity</h6>
                    <div className="my-4">
                      {smsPackages.map((pkg, index) => (
                        <div
                          key={index}
                          className="host-list my-4 d-flex flex-row justify-content-between"
                        >
                          <div>{pkg.name}</div>
                          <div><strong>{pkg.price}</strong></div>
                        </div>
                      ))}
                      <div className="host-list my-4 d-flex flex-row justify-content-between">
                        <div><strong>Access to Mobile No's Database</strong></div>
                        <div><strong>Yes</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Language Targeting */}
      <section id="mobile-app-ser" className="mobile-app-ser section dark-background rs-service-grid-outline">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-5">
            <h2 className="fw-bold">
              Our Advanced SMS Marketing Targeting Options for Maximum ROI
            </h2>
            <p className="rs-subtitle">
              RedSpider has divided its UAE Bulk SMS service into three Steps based
              on user targeting and needs. This ensures that the entire UAE audience
              can fully benefit from our services while maintaining their market
              presence, achieving sales, and reaching their goals with ease. Our SMS
              Marketing UAE team has categorized the SMS services into the following
              Steps:
            </p>
          </div>

          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold" style={{ fontSize: "30px" }}>
              Location & Language-Based Targeting
            </h2>
            <p className="rs-subtitle">
              The UAE is a rapidly growing hub with expertise in IT, real estate,
              and various marketing sectors. It is home to numerous international
              companies, attracting people from around the world not only for
              business but also for entertainment. This diversity results in a
              population that varies in language, nationality, and cultural
              background.
            </p>
            <p>
              Keeping these factors in mind, our SMS Marketing Company in UAE has
              designed its first category: Location & Language-Based Targeting,
              which includes the following key aspects:
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1150px" }}>
          <div className="row rs-grid-row text-center">
            {locationTargets.map((item, index) => (
              <div className="col-12 col-md-4 rs-grid-item" key={index}>
                <div className="grid-box">
                  <div className="mb-3"><i className={`${item.icon} h1`}></i></div>
                  <h6><strong>{item.title}</strong></h6>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-5" style={{ maxWidth: "950px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <h6 className="ma-info">
                Our Bulk SMS UAE services cover all major locations including Dubai,
                Abu Dhabi, Ajman, Sharjah, Fujairah, and Umm Al Quwain. If you're
                looking for SMS Marketing Dubai solutions or need bulk SMS UAE
                campaigns across multiple emirates, we make sure your message is
                delivered with precision.
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

      {/* Interest-Based Targeting */}
      <section id="sms-intrest-ser" className="sms-intrest-ser section light-background">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold" style={{ fontSize: "30px" }}>
              Interest-Based SMS Marketing for More Sales
            </h2>
            <p className="rs-subtitle">
              Our SMS Marketing Dubai Team has developed the second phase of SMS
              marketing by analyzing people's daily needs and interests. This
              strategy is highly effective in boosting sales and maximizing business
              growth.
            </p>
            <p>
              With 13+ years of experience, RedSpider has identified key interest
              points, which are outlined below as examples to provide a better
              understanding of this approach.
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1400px" }}>
          <div className="row rs-grid-row text-md-start text-center">
            {interestTargets.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-3 rs-grid-item mb-5" key={index}>
                <div className="grid-box">
                  <div className="mb-3"><i className={`${item.icon} h1`}></i></div>
                  <h6><strong>{item.title}</strong></h6>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-0" style={{ maxWidth: "950px" }}>
          <div className="row">
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

      {/* Smart Targeting */}
      <section id="sms-target-ser" className="sms-target-ser section dark-background">
        <div
          className="container p-3 p-md-5 rounded-3"
          style={{ maxWidth: "1600px", background: "rgba(230, 0, 35, 0.9)" }}
        >
          <div className="row">
            <div className="col-12 col-lg-4 pe-lg-5">
              <div className="section-title text-white mb-3">
                <h2 className="fw-bold" style={{ fontSize: "30px" }}>
                  Smart Targeting for Better Conversions
                </h2>
                <p className="rs-subtitle mb-4">
                  Our SMS Marketing Company has built a vast database of millions of
                  verified contacts across various industries through years of
                  experience. This data has been carefully refined and validated
                  through a rigorous process, ensuring high accuracy and business
                  success.
                </p>
                <p>
                  Our 100% reliable databases have been collected through a
                  structured approach, with key steps including:
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-8 ps-lg-5">
              <div className="row rs-grid-row text-start">
                {smartTargets.map((item, index) => (
                  <div className="col-12 col-md-4 rs-grid-item mb-5" key={index}>
                    <div className="mb-3"><i className={`${item.icon} h1`}></i></div>
                    <h6><strong>{item.title}</strong></h6>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="key-features">
        <div className="container" style={{ maxWidth: "1500px" }}>
          <div className="row align-items-start">
            <div className="col-12 col-lg-4 text-center">
              <div className="imgbox my-4 my-lg-0 parent-div">
                <img src="/assets/img/smsmar.jpg" alt="" className="img-fluid" />
              </div>
            </div>

            <div className="col-12 col-lg-8 ps-lg-5">
              <div className="row align-items-start">
                <div className="col-12 my-5">
                  <h2 className="kf-title mb-0">
                    Benefits of SMS Marketing in Dubai & Bulk SMS in UAE
                  </h2>
                </div>

                <div className="col-lg-6">
                  <ul className="kf-list list-unstyled mb-3">
                    {benefitsLeft.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="col-lg-6 mb-4 mb-lg-0">
                  <ul className="kf-list list-unstyled mb-3">
                    {benefitsRight.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-start">
            <div className="col-12 text-center">
              <div className="mt-5">
                <p>
                  Mobile phones are essential and powerful devices in today's world.
                  With them, you can effortlessly reach your entire customer base by
                  running advertisements on mobile games, apps, mobile websites, and
                  through SMS Marketing UAE campaigns. Businesses that invest in
                  bulk SMS Dubai marketing can reach thousands of customers within
                  minutes, making it one of the fastest-growing promotional tools.
                  We specialize in helping businesses connect with their targeted
                  audience and instantly deliver their messages effectively with our
                  Bulk SMS UAE Services.
                </p>
                <p>
                  If your business needs to convey a message that requires an
                  immediate Call to Action (CTA), RedSpider Web & Art Design
                  consider a top rated SMS Marketing in UAE Company. We help you
                  connect with your audience instantly through the most impactful
                  medium available today—mobile phones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="key-features section light-background dot-bg">
        <div className="container" style={{ maxWidth: "850px" }}>
          <div className="row align-items-center">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h2 className="kf-title mb-3">Our Bulk SMS Application Features</h2>
              <a
                href="#"
                className="btn btn-animation btn-black d-inline-flex align-items-center gap-3 mt-4"
              >
                <span className="btn-title">Call Now</span>
                <span className="btn-icon-wrap">
                  <img
                    src="/assets/img/icons/phone.svg"
                    alt=""
                    className="btn-icon d-none d-md-block"
                  />
                </span>
              </a>
            </div>

            <div className="col-lg-4 text-center mb-4 mb-lg-0">
              <div className="kf-phone d-none d-md-block">
                <img
                  src="/assets/img/mobile-app.png"
                  alt="App Preview"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-lg-4">
              <ul className="kf-list list-unstyled mb-3">
                {appFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Bulk SMS */}
      <section className="email-campaign-types section dark-background line-bg-dark pb-0 pt-4">
        <div className="container" style={{ maxWidth: "1250px" }}>
          <div className="row">
            <div className="col-lg-4 text-center mb-4 mb-lg-0" style={{ marginTop: "-50px" }}>
              <div className="kf-phone d-none d-md-block">
                <img src="/assets/img/mansms.png" alt="App Preview" className="img-fluid" />
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="dark-background">
                <div className="section-title text-white mt-5">
                  <h2 className="fw-bold fs-3 lh-sm">Why use Bulk SMS Marketing Dubai?</h2>
                  <p className="rs-subtitle mb-4">
                    SMS marketing is an excellent way to promote your business in
                    Dubai, UAE. It is highly effective for reaching a large number
                    of people in a short period and is very affordable and easy to
                    use.
                  </p>
                  <p className="rs-subtitle mb-4">
                    RedSpider's Bulk SMS Marketing in Dubai application is the best
                    solution for promoting your business across in the UAE. It's
                    user-friendly, cost-effective, and highly efficient.
                  </p>
                  <p className="rs-subtitle">
                    Looking to start your bulk SMS UAE marketing campaign today? Our
                    SMS Marketing Dubai services are powerful and effective in
                    reaching your target customers. Whether you want bulk SMS Dubai
                    promotions or advanced SMS marketing UAE targeting, RedSpider
                    provides complete solutions to maximize your business growth. We
                    collaborate with multiple partners, offering high-quality
                    databases. Hurry up and take advantage of our special offer!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Build */}
      <section id="readytobuild" className="readytobuild section light-background">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold">{cta_title || "Ready to build a strong brand identity?"}</h2>
            <p className="rs-subtitle">
              {cta_description || "Let RedSpider create a professional logo that represents your business the right way."}
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
                <img src="/assets/img/icons/cc-icon.svg" alt="" className="btn-icon" />
              </span>
            </a>

            <a
              href="#"
              className="btn btn-animation btn-black d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">Call Now</span>
              <span className="btn-icon-wrap">
                <img src="/assets/img/icons/phone.svg" alt="" className="btn-icon" />
              </span>
            </a>

            <a
              href="https://wa.me/971505698733"
              target="_blank"
              className="btn btn-animation btn-green d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
            >
              <span className="btn-title">Whatsapp Us</span>
              <span className="btn-icon-wrap">
                <img src="/assets/img/icons/whatsapp.svg" alt="" className="btn-icon" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="review-sec" className="review-sec section light-background">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img src="/assets/img/reviewimg.png" alt="Reviews" className="img-fluid" />
          </div>
        </div>
      </section>

      {/* FAQs - Dynamic */}
      {faqs.length > 0 && (
        <section id="rs-faq-sec" className="rs-faq-sec section pb-5 pt-0 light-background">
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold">FAQs About Bulk SMS UAE</h2>
            </div>
            <div className="accordion rs-faq-custom" id="rsFaqOne">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={faq.id || index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button rs-faq-btn ${index === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${index}`}
                    >
                      <span className="faq-icon">+</span>
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faq-${index}`}
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
      )}

      {/* CTA */}
      <ServiceCTA service={data} />
    </>
  );
}