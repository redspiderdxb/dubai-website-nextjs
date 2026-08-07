import { useEffect, useRef } from 'react';

export default function About() {
  const videoSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoSectionRef.current) return;
      
      const rect = videoSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const visiblePercentage = Math.min(1, Math.max(0, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));

      const scale = 0.6 + (visiblePercentage * 0.4);
      const opacity = 0.4 + (visiblePercentage * 0.6);

      if (videoSectionRef.current) {
        const videoWrap = videoSectionRef.current.querySelector('.rs-video-wrap');
        if (videoWrap) {
          videoWrap.style.transform = `scale(${scale})`;
          videoWrap.style.opacity = opacity;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* About Section */}
      <section className="key-features py-5 about-features dark-background py-3">
        <div className="container" style={{ maxWidth: '1290px' }}>
          <div className="row align-items-center g-5">
            {/* Left Content */}
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <h2
                className="kf-title text-white fs-1 text-uppercase aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="100"
                data-aos-duration="800"
                data-aos-once="true"
              >
                About RedSpider
              </h2>
              <div className="lin_sec"></div>
              <div className="clearfix"></div>
              <p className="h2">
                <small>We have qualified IT</small>
                <br />
                <b>support team</b>
                <br />
                <small>that can meet the needs of</small>
                <br />
                <small>your business needs.</small>
              </p>

              <div
                className="inlinebtns text-center d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center mt-5"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <a
                  href="https://www.redspider.ae/about-us/"
                  className="btn btn-animation btn-about-readmore d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-title">Read More...</span>
                </a>

                <a
                  href="https://www.redspider.ae/our-portfolio/"
                  className="btn btn-animation btn-about-portfolio d-inline-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-title">View Portfolio</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div
              className="col-lg-6"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <img
                src="assets/img/about_back.png"
                alt="About RedSpider"
                className="img-fluid"
                data-aos="zoom-in"
                data-aos-delay="350"
                data-aos-duration="900"
                data-aos-once="true"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - UPDATED */}
      <section ref={videoSectionRef} className="py-5 ideo-grow-se rs-video-zoom-sec">
        <div className="container text-center" style={{ maxWidth: '1000px' }}>
          <div className="rs-video-content">
            <div className="rs-video-title">
              <h4 className="fw-bold">
                Why Businesses Trust
                <br />
                Our Web Design Expertise
              </h4>
            </div>

            <div
              className="rs-video-wrap"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-once="true"
              style={{ transform: 'scale(0.6)', opacity: 0.4 }}
            >
              <a
                href="assets/img/videos/redspider.webm"
                className="glightbox video-link"
                style={{ display: 'block', position: 'relative' }}
              >
                <img
                  src="assets/img/videos/video.jpg"
                  alt="Watch our video about RedSpider web design expertise"
                  className="img-fluid rounded shadow rounded-5 video-thumb"
                  style={{ width: '100%', borderRadius: '30px', display: 'block' }}
                  loading="lazy"
                />
                <span className="play-btn" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}