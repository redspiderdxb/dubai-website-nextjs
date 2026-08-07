export default function FAQIndustries() {
  const leftFaqs = [
    {
      id: 'homeFaq1',
      question: 'What makes Redspider a trusted web design company in Dubai?',
      answer:
        'Redspider is an experienced web development company with more than 14 years of experience in creating custom websites for businesses in Dubai. We specialize in creating modern, easy-to-use, and SEO-friendly websites that can help businesses enhance their online presence and generate leads.',
    },
    {
      id: 'homeFaq2',
      question: 'Why should I choose Redspider for my website project?',
      answer:
        'We combine creativity, technical expertise, and digital marketing expertise to create web pages that appear professional and that can help your business flourish and engage with customers more effectively.',
    },
    {
      id: 'homeFaq3',
      question: 'What web design and development services do you offer?',
      answer:
        'Our services range from website design and development to eCommerce solutions, real estate websites, SEO, branding, mobile app development, website maintenance, hosting, and digital marketing.',
    },
    {
      id: 'homeFaq4',
      question: 'Can you build custom real estate websites in Dubai?',
      answer:
        'Yes, we create bespoke websites for real estate properties with features such as property listing, smart search filters, CRM integration, lead capture, and property management system integration.',
    },
    {
      id: 'homeFaq5',
      question: 'Which industries do you work with?',
      answer:
        'We have worked with numerous industries, such as real estate, education, healthcare, retail, hospitality, construction, professional services, and startups.',
    },
    {
      id: 'homeFaq6',
      question: 'Do you create custom websites or use templates?',
      answer:
        'We do both. Custom websites are a good choice if you want something different, while template websites are quick to make and budget friendly too.',
    },
    {
      id: 'homeFaq7',
      question: 'How long does it take to design and launch a website?',
      answer:
        'Typically, this is based on the project size and needs. Websites typically take 4 – 12 weeks to build.',
    },
    {
      id: 'homeFaq8',
      question: 'Why is responsive website design important for businesses in Dubai?',
      answer:
        'Nowadays most of the people use mobile phones when they browse websites. With the help of a responsive design, the user experience improves. It also helps with SEO and gaining new customers.',
    },
    {
      id: 'homeFaq9',
      question: 'Which CMS platforms do you work with?',
      answer:
        'We work with platforms like WordPress, Shopify, WooCommerce, Magento, Laravel, and also custom CMS solutions. Our team will choose the best platform according to the needs of your business.',
    },
    {
      id: 'homeFaq10',
      question: 'Do you redesign existing websites?',
      answer:
        'Yes, we do. Old websites can be updated to enhance their design, performance, functionality, and search engine ranking.',
    },
  ];

  const rightFaqs = [
    {
      id: 'homeFaq11',
      question: 'Can you integrate payment gateways into eCommerce websites?',
      answer:
        'Yes, we do have the capability to integrate with secure payment gateways such as Stripe, Paypal, Paytabs, Telr or any other popular payment gateway which is accepted in UAE.',
    },
    {
      id: 'homeFaq12',
      question: 'Will my eCommerce website be mobile-friendly?',
      answer:
        'Yes, all of our eCommerce sites are mobile friendly and perform well on all devices.',
    },
    {
      id: 'homeFaq13',
      question: 'Do you create website mockups before development starts?',
      answer:
        'We do wireframing or mockups first and present it to our clients for their feedback and approval before starting the coding.',
    },
    {
      id: 'homeFaq14',
      question: 'How do you handle design feedback and revisions?',
      answer:
        'We keep in touch with our clients throughout the project. If they want any revision we can make sure the final design matches their expectations.',
    },
    {
      id: 'homeFaq15',
      question: 'Do you offer website hosting services?',
      answer:
        'Yes, we provide secure hosting services along with domain setup, SSL certificates, email hosting, backups, and server maintenance.',
    },
    {
      id: 'homeFaq16',
      question: 'Will you train my team after the website is launched?',
      answer:
        'We will give training sessions to your team so they can easily manage the website, update content regularly and handle basic changes themselves.',
    },
    {
      id: 'homeFaq17',
      question: 'Can you migrate my existing website without losing data?',
      answer:
        'Yes we can safely migrate your existing website without losing the necessary data.',
    },
    {
      id: 'homeFaq18',
      question: 'Do you offer content writing and branding services?',
      answer:
        'Yes, we write website content, copy for websites, branding and marketing materials, design logos, etc.',
    },
    {
      id: 'homeFaq19',
      question: 'How much does it cost to build a professional website in Dubai?',
      answer:
        'Cost will vary according to the features, design and size of your project. Understanding your requirement, we share a custom quote.',
    },
    {
      id: 'homeFaq20',
      question: 'How can I contact Redspider and discuss my project?',
      answer:
        'Contact us via our website, phone, email or our office in Dubai. We\'re always available for a free consultation with you.',
    },
  ];

  const stats = [
    { number: '20+', label: 'Web Development Experts' },
    { number: '10+', label: 'UI/UX Specialists' },
    { number: '10+', label: 'Front-End Developers' },
    { number: '14+', label: 'Years of Experience' },
  ];

  const industries = [
    'Small & Large Business',
    'Finance & Technology',
    'Petroleum & Government',
    'Manufacturing & Logistics',
    'Hospitality',
    'Real Estate',
    'Corporate',
    'Personal & Portfolio',
    'Healthcare',
    'Construction',
    'Hotel & Tourism',
  ];

  return (
    <>
      {/* FAQ Section */}
      <section
        id="rs-faq-sec"
        className="home-faq rs-faq-sec section py-5 light-background"
      >
        <div
          className="container"
          style={{
            maxWidth: '1600px',
            background: '#f6f6f6',
            padding: '40px',
            borderRadius: '30px',
          }}
        >
          <div className="text-start mb-5 border-bottom pb-3">
            <h2 className="fw-bold">Frequently Asked Questions</h2>
            <p>Find quick answers to common questions about our services.</p>
          </div>
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-6">
              <div className="accordion" id="homeFaqLeft">
                {leftFaqs.map((faq, index) => (
                  <div className="accordion-item" key={`left-${index}`}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${faq.id}`}
                        aria-expanded="false"
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={faq.id}
                      className="accordion-collapse collapse"
                      data-bs-parent="#homeFaqLeft"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-6">
              <div className="accordion" id="homeFaqRight">
                {rightFaqs.map((faq, index) => (
                  <div className="accordion-item" key={`right-${index}`}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${faq.id}`}
                        aria-expanded="false"
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={faq.id}
                      className="accordion-collapse collapse"
                      data-bs-parent="#homeFaqRight"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stak-sec" className="stak-sec section darkblue-line pt-0 pb-5">
        <div className="container pb-3" style={{ maxWidth: '1200px' }}>
          <div
            className="section-title text-center text-white mb-1"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h3 className="fw-bold mb-3">
              Comprehensive Web Design of a High Standard
            </h3>
          </div>

          <div className="row align-items-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 text-center mb-4 mb-lg-0"
                data-aos="zoom-in-up"
                data-aos-delay={100 + index * 150}
                data-aos-duration="900"
              >
                <div className="stak-wrap">
                  <div className="stack-no">{stat.number}</div>
                  <div className="stack-desc">
                    <h4>{stat.label}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section
        id="mobile-app-ser"
        className="mobile-app-ser section dark-background rs-service-grid-outline py-0"
      >
        <div
          className="container mb-3"
          style={{ maxWidth: '1200px' }}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="section-title text-center text-white mb-3">
            <h2 className="fw-normal" data-aos="fade-up" data-aos-delay="100">
              A Trusted Web Design Agency in Dubai
            </h2>
            <p className="mb-4" data-aos="fade-up" data-aos-delay="250">
              RedSpider is a Dubai-based web design and development agency with
              over 14 years of experience delivering high-performance digital
              solutions. Our team combines technical expertise with strategic
              thinking to build websites that are visually compelling,
              user-friendly, and built for long-term growth.
            </p>
            <p data-aos="fade-up" data-aos-delay="400">
              With a strong foundation in UI/UX design and modern development
              frameworks, we create secure, scalable, and performance-driven
              websites tailored to each client's goals. Every project is managed
              with transparency, structured workflows, and a commitment to
              quality ensuring measurable business impact.
            </p>
          </div>
        </div>

        <div
          className="container"
          style={{ maxWidth: '1100px' }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
        >
          <div className="section-title text-center text-white mb-0 mt-2">
            <h2 className="fw-normal" data-aos="fade-up" data-aos-delay="200">
              Industries We Serve
            </h2>
            <p className="pb-0" data-aos="fade-up" data-aos-delay="350">
              Customized web solutions for businesses across multiple industries
              in Dubai and the UAE.
            </p>
          </div>
        </div>

        <div className="container bg-red" style={{ maxWidth: '100%' }}>
          <div className="rs-marquee">
            <div className="rs-marquee-track">
              {industries.map((industry, index) => (
                <span key={index}>{industry}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}