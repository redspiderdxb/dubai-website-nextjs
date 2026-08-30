import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ServiceWorkGallery({
  title = "Our Gallery",
  subtitle = "",
  kicker = "Selected work",
  items = [],
  getImageSrc,
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const resolveSrc = (item) => {
    if (!item?.image) return "";
    return getImageSrc ? getImageSrc(item.image) : item.image;
  };

  const slides = items
    .map((item) => ({ src: resolveSrc(item) }))
    .filter((slide) => slide.src);

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />

      <section className="rs-service-work">
        <div className="container">
          <div className="rs-service-work__head" data-aos="fade-up">
            <span className="rs-service-work__kicker">{kicker}</span>
            <h2>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>

          {items.length > 0 ? (
            <div className="rs-service-work__grid">
              {items.map((item, itemIndex) => (
                <button
                  key={`${item.image}-${itemIndex}`}
                  type="button"
                  className={`rs-service-work__item${
                    itemIndex === 0 ? " is-featured" : ""
                  }`}
                  onClick={() => {
                    setIndex(itemIndex);
                    setOpen(true);
                  }}
                  aria-label={`View ${item.title || title}`}
                >
                  <img
                    src={resolveSrc(item)}
                    alt={item.title || title}
                    loading="lazy"
                  />
                  <span className="rs-service-work__meta">
                    <strong>{item.title || title}</strong>
                    <i className="bi bi-arrows-fullscreen" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="rs-service-work__empty">No gallery images available</p>
          )}
        </div>
      </section>
    </>
  );
}
