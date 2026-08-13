// components/services/ServiceHero.js

export default function ServiceHero({ service }) {
  // 🔥 Backend se data le rahe hain
  const {
    hero_title,
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    name,
    description,
  } = service || {};

  // 🔥 Fallback values
  const title = hero_title || name || "Our Services";
  const subtitle = hero_subtitle || "";
  const desc = hero_description || description || "";
  const backgroundImage = hero_background || hero_image || "";

  // 🔥 Image URL build
  const imageUrl = backgroundImage 
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public"}/storage/${backgroundImage}`
    : "";

  return (
    <section 
      className="design-developemnt-hero hero-marquee"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
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
              {desc && (
                <p className="rs-process-text mb-3">
                  {desc}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}