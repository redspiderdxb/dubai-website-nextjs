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
    {
      icon: "bi-translate",
      title: "Language-Based Targeting",
      desc: "Arabic, English, Hindi, Urdu, Tagalog, and more.",
    },
    {
      icon: "bi-globe",
      title: "Nationality-Based Targeting",
      desc: "Asians, Europeans, Africans, Americans, etc.",
    },
    {
      icon: "bi-geo",
      title: "City & Area-Based Targeting",
      desc: "Target customers in Dubai, Abu Dhabi, Sharjah, and specific zones.",
    },
    {
      icon: "bi-incognito",
      title: "Gender-Specific Targeting",
      desc: "Send campaigns to males or females based on product relevance.",
    },
    {
      icon: "bi-person-hearts",
      title: "Age-Group Targeting",
      desc: "Reach teenagers, working professionals, or senior citizens.",
    },
    {
      icon: "bi-wallet2",
      title: "High-Income & VIP Targeting",
      desc: "Engage high-salaried professionals and premium buyers.",
    },
    {
      icon: "bi-person-workspace",
      title: "Workplace-Based Targeting",
      desc: "Reach professionals based on office location.",
    },
    {
      icon: "bi-house-door",
      title: "Residence-Based Targeting",
      desc: "Target people in high-end areas or budget-friendly zones.",
    },
    {
      icon: "bi-phone-flip",
      title: "Mobile & Network Targeting",
      desc: "iPhone users, Android users, or Etisalat/Du subscribers.",
    },
  ];

  // Interest-Based Targeting - Static
  const interestTargets = [
    {
      icon: "bi-bag-check-fill",
      title: "Frequent Shoppers",
      desc: "Target people who regularly buy online or visit malls.",
    },
    {
      icon: "bi-briefcase-fill",
      title: "Business Professionals",
      desc: "Engage decision-makers, managers, and entrepreneurs.",
    },
    {
      icon: "bi-luggage",
      title: "Travel Lovers",
      desc: "Reach people who travel often for business or leisure.",
    },
    {
      icon: "bi-egg-fried",
      title: "Food Lovers",
      desc: "Send offers to people who frequently visit restaurants and cafés.",
    },
    {
      icon: "bi-clipboard-heart-fill",
      title: "Fitness & Health Enthusiasts",
      desc: "Engage gym-goers, diet-conscious, and sports lovers.",
    },
    {
      icon: "bi-joystick",
      title: "Entertainment Fans",
      desc: "Target people who attend concerts, movies, and events.",
    },
    {
      icon: "bi-person",
      title: "Students & Learners",
      desc: "Reach students, online learners, and professionals taking courses.",
    },
    {
      icon: "bi-people",
      title: "Parents & Families",
      desc: "Market kids' products and family-oriented services.",
    },
  ];

  // Smart Targeting - Static
  const smartTargets = [
    {
      icon: "bi-people",
      title: "Past Buyers",
      desc: "Target customers based on their previous shopping history.",
    },
    {
      icon: "bi-bullseye",
      title: "Subscription-Based Targeting",
      desc: "Engage users subscribed to specific services.",
    },
    {
      icon: "bi-tags",
      title: "Seasonal & Festive Offers",
      desc: "Run campaigns for Eid, Christmas, New Year, etc.",
    },
    {
      icon: "bi-phone",
      title: "Cart Abandonment SMS",
      desc: "Convert potential buyers who left without purchasing.",
    },
    {
      icon: "bi-percent",
      title: "Special Discounts & Offers",
      desc: "Offer deals to price-sensitive customers.",
    },
  ];

  // Benefits - Static

  const benefitsLeft = [
    "SMS Marketing UAE campaigns provide a direct way to reach customers with promotions, reminders and business updates.",
    "Send time-sensitive messages quickly based on your campaign requirements.",
    "Manage campaigns through an easy-to-use web-based messaging platform.",
    "Segment audiences using relevant campaign criteria for more focused communication.",
    "Schedule messages in advance for promotions, reminders and important updates.",
    "Review campaign activity through available reporting and tracking tools.",
    "Integrate messaging capabilities with supported business applications where required.",
    "Bulk SMS UAE solutions can support different campaign volumes and business communication needs.",
  ];

  const benefitsRight = [
    "Bulk SMS Dubai campaigns can help businesses communicate with customers across different locations and audience groups.",
    "Reach mobile users without requiring them to be connected to the internet.",
    "Personalize messages for selected customer segments and campaign requirements.",
    "Plan messaging for customers across Dubai and other parts of the UAE.",
    "Keep customers informed about offers, services, appointments and business updates.",
    "Manage seasonal promotions and time-sensitive campaigns efficiently.",
    "Send messages according to your preferred campaign schedule.",
    "Use SMS Marketing Dubai campaigns for relevant promotions, announcements and customer communication.",
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
                  Reach customers across the UAE with targeted SMS campaigns
                  designed for promotions, updates and business communication.
                  RedSpider provides reliable bulk SMS solutions with campaign
                  scheduling, audience targeting and reporting tools to help
                  businesses manage messaging efficiently.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row align-items-center g-4 text-center text-lg-start mt-4">
              <div className="col-12 col-lg-4 order-2 order-lg-1">
                <p>
                  Our bulk SMS solutions help businesses send promotional
                  messages, customer updates, reminders and important
                  notifications efficiently. Campaigns can be planned according
                  to your messaging volume, audience requirements and business
                  objectives, with flexible options available for different
                  campaign sizes.
                </p>
                <p className="mb-0">
                  RedSpider also provides campaign scheduling, audience
                  segmentation and reporting tools to make SMS campaigns easier
                  to manage. Our team can help you select the right messaging
                  option based on your requirements and campaign goals.
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
      <section
        id="sms-info"
        className="mobile-app-bs section light-background dot-bg py-5"
      >
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold mb-4">SMS Campaign Targeting Options</h2>
            <p className="rs-subtitle">
              Reach the right audience with flexible SMS campaign targeting
              options based on your business requirements. Campaigns can be
              planned using relevant audience criteria to help deliver more
              focused and effective business messages.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="sms-price"
        className="rs-packages-sec line-bg-dark dark-background section"
      >
        <div className="container" style={{ maxWidth: "1250px" }}>
          <div className="section-title text-center text-white mb-5">
            <h2 className="fw-bold">Bulk SMS Packages</h2>
            <p className="rs-subtitle">
              Choose a flexible SMS package based on your campaign volume and
              business requirements. <br></br> Explore available messaging
              quantities and select an option that suits your campaign needs.
            </p>
          </div>

          <div className="row g-4 align-items-stretch">
            <div className="col-lg-4">
              <div className="rs-left-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="rs-join">Flexible SMS Plans</span>
                  <hr />
                  <h4 className="mt-4">
                    Choose a Package That Fits Your Campaign
                  </h4>
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
                          <div>
                            <strong>{pkg.price}</strong>
                          </div>
                        </div>
                      ))}
                      <div className="host-list my-4 d-flex flex-row justify-content-between">
                        <div>
                          <strong>Access to Mobile No's Database</strong>
                        </div>
                        <div>
                          <strong>Yes</strong>
                        </div>
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
      <section
        id="mobile-app-ser"
        className="mobile-app-ser section dark-background rs-service-grid-outline"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold" style={{ fontSize: "30px" }}>
              Location & Language-Based Targeting
            </h2>
            <p className="rs-subtitle">
              Plan SMS campaigns using location and language criteria that match
              your audience requirements. Campaigns can be organized by selected
              locations, preferred languages and other available audience
              criteria to support more relevant business communication.
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1150px" }}>
          <div className="row rs-grid-row text-center">
            {locationTargets.map((item, index) => (
              <div className="col-12 col-md-4 rs-grid-item" key={index}>
                <div className="grid-box">
                  <div className="mb-3">
                    <i className={`${item.icon} h1`}></i>
                  </div>
                  <h3>
                    <strong>{item.title}</strong>
                  </h3>
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
                Plan SMS campaigns for audiences across Dubai, Abu Dhabi,
                Sharjah, Ajman, Fujairah and other parts of the UAE. Our team
                can help you select the right campaign options based on your
                target locations and messaging requirements.
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
      <section
        id="sms-intrest-ser"
        className="sms-intrest-ser section light-background"
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-bold" style={{ fontSize: "30px" }}>
              Interest-Based Campaign Segmentation
            </h2>
            <p className="rs-subtitle">
              Organize SMS campaigns around relevant audience interests to
              create more focused business messages. Interest-based segmentation
              can help businesses tailor promotions and updates to audience
              groups that are more relevant to each campaign.
            </p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1400px" }}>
          <div className="row rs-grid-row text-md-start text-center">
            {interestTargets.map((item, index) => (
              <div
                className="col-12 col-md-6 col-lg-3 rs-grid-item mb-5"
                key={index}
              >
                <div className="grid-box">
                  <div className="mb-3">
                    <i className={`${item.icon} h1`}></i>
                  </div>
                  <h6>
                    <strong>{item.title}</strong>
                  </h6>
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
      <section
        id="sms-target-ser"
        className="sms-target-ser section dark-background"
      >
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
                <p className="rs-subtitle mb-4 text-white">
                  Create more focused SMS campaigns using audience segments that
                  match your campaign goals. Depending on your requirements,
                  messaging can be planned around customer activity,
                  subscriptions, seasonal promotions and other relevant campaign
                  criteria.
                </p>
                <p>
                  Our team can help you select suitable targeting options and
                  structure your campaign around the audience you want to reach.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-8 ps-lg-5">
              <div className="row rs-grid-row text-start">
                {smartTargets.map((item, index) => (
                  <div
                    className="col-12 col-md-4 rs-grid-item mb-5"
                    key={index}
                  >
                    <div className="mb-3">
                      <i className={`${item.icon} h1`}></i>
                    </div>
                    <h6>
                      <strong>{item.title}</strong>
                    </h6>
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
                <img
                  src="/assets/img/smsmar.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-12 col-lg-8 ps-lg-5">
              <div className="row align-items-start">
                <div className="col-12 my-5">
                  <h2 className="kf-title mb-0">
                    Benefits of SMS Marketing for Businesses
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
                  SMS gives businesses a direct way to communicate with
                  customers through their mobile phones. It can be used for
                  promotions, service updates, reminders, announcements and
                  other time-sensitive messages without requiring users to be
                  connected to the internet.
                </p>
                <p>
                  RedSpider helps businesses plan and manage SMS campaigns
                  according to their audience, messaging volume and
                  communication goals. From campaign scheduling to audience
                  segmentation and reporting, our solutions make business
                  messaging easier to organize and manage.
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
              <h2 className="kf-title mb-3">
                Our Bulk SMS Application Features
              </h2>
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
            <div
              className="col-lg-4 text-center mb-4 mb-lg-0"
              style={{ marginTop: "-50px" }}
            >
              <div className="kf-phone d-none d-md-block">
                <img
                  src="/assets/img/mansms.png"
                  alt="App Preview"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="dark-background">
                <div className="section-title text-white mt-5">
                  <h2 className="fw-bold fs-3 lh-sm">
                    Why Businesses Use Bulk SMS Marketing
                  </h2>

                  <p className="rs-subtitle mb-4">
                    Bulk SMS marketing gives businesses a direct way to
                    communicate with customers through timely and relevant
                    messages. It can support promotions, appointment reminders,
                    service updates, announcements and other business
                    communication.
                  </p>

                  <p className="rs-subtitle">
                    Campaigns can be scheduled and organized around different
                    audience groups, helping businesses manage messaging more
                    efficiently. RedSpider provides practical tools for campaign
                    planning, message delivery and reporting based on your
                    communication requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    

      {/* FAQs - Dynamic */}
      {faqs.length > 0 && (
        <section
          id="rs-faq-sec"
          className="rs-faq-sec section pb-5 pt-0 light-background"
        >
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold">Frequently Asked Questions About SMS Marketing</h2>
            </div>
            <div className="accordion rs-faq-custom" id="rsFaqOne">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={faq.id || index}>
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button rs-faq-btn ${index === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${index}`}
                    >
                      <span className="faq-icon">+</span>
                      {faq.question}
                    </button>
                  </h3>
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
