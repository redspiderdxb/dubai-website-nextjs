export default function AboutValue({ data }) {
  // Get data from API or use fallback
  const valueTitle = data?.value_title || "Creating Digital Experiences that Deliver Real Business Value";
  const valueDescription = data?.value_description || "We're here to help you bring your business and grow it in the digital space. Our approach is simple - to design and develop websites that create measurable business value. When you get in touch with us we collaborate with our clients and work hard to transform your ideas into reality.";
  const valueItems = data?.value_items?.length > 0 ? data.value_items : [
    {
      number: "01",
      title: "Innovation in every project",
      desc: "A decade of experience and hundreds of successful projects, we use creative design and modern technology."
    },
    {
      number: "02",
      title: "Collaborating to build stronger brands",
      desc: "We feel it is best to work together. Our designers, developers and strategists are all in the same team."
    },
    {
      number: "03",
      title: "Creating unique digital solutions",
      desc: "Each project is unique - and so is our approach. We develop bespoke web solutions which elevate your brand."
    }
  ];

  // Value item icons
  const valueIcons = ["bi-lightbulb", "bi-graph-up-arrow", "bi-laptop"];

  return (
    <section className="re-process py-5">
      <div className="container pt-lg-5">
        <div className="row justify-content-center gx-5">
          <div className="col-lg-4" data-aos="fade-up">
            <h1 className="fs-h3 fw-bold">{valueTitle}</h1>
          </div>
          <div className="col-lg-8" data-aos="fade-up">
            {valueDescription && (
              <div dangerouslySetInnerHTML={{ __html: valueDescription.replace(/\n/g, '<br />') }} />
            )}
          </div>
        </div>
      </div>
      
      <div className="container py-lg-5" style={{ maxWidth: '1600px' }}>
        <div className="row g-4">
          {valueItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="re-process-card">
                <div className="re-process-icon">
                  <i className={valueIcons[index % valueIcons.length]} aria-hidden="true"></i>
                </div>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}