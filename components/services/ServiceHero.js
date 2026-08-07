export default function ServiceHero({ service }) {
  // 🔥 Default values agar service nahi hai toh
  const title = service?.hero_title || service?.name || "Our Services";
  const subtitle = service?.hero_subtitle || "";
  const description = service?.hero_description || service?.description || "";
  const backgroundImage = service?.hero_background || service?.image || "";

  return (
    <section 
      className="design-developemnt-hero hero-marquee"
      style={{
        backgroundImage: backgroundImage ? `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12" data-aos="fade-right">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                {title}
                {subtitle && (
                  <span className="rs-process-highlight">
                    {subtitle}
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
                )}
              </h1>
              {description && (
                <p className="rs-process-text mb-3">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}