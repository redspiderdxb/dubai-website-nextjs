import { useState } from "react";

const FALLBACK_ADDRESS =
  "Sofitel, Burj Gate Tower- Office 1002-Sheikh Zayed Road, Downtown Dubai - Dubai. United Arab Emirates";

const FALLBACK_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.0961931248985!2d55.26658407606155!3d25.19997833158676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f427de43ea919%3A0x6c5f8bebb679bad!2sSofitel%20Dubai%20Downtown!5e0!3m2!1sen!2sin!4v1780635627811!5m2!1sen!2sin";

export default function ContactMap({ data }) {
  const [showMap, setShowMap] = useState(false);

  const mapUrl = data?.map_url || FALLBACK_MAP;
  const address = data?.address || FALLBACK_ADDRESS;

  return (
    <section className="rs-contact-map-sec">
      <div className="container">
        <div className="rs-contact-map">
          {showMap ? (
            <iframe
              title="RedSpider Office Location - Sofitel Dubai Downtown"
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <button
              type="button"
              className="rs-contact-map-facade"
              onClick={() => setShowMap(true)}
              aria-label="RedSpider Office Location - Sofitel Dubai Downtown"
            >
              <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
              <span>{address}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
