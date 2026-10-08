import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const REMOTE_STORAGE_BASE =
  "https://redspider.rsworkspace.net/admin/public/storage";

const hasProjectUrl = (value) => {
  const url = String(value || "").trim();
  return url !== "" && url !== "#";
};

const toRemoteStorageUrl = (value) => {
  const image = String(value || "").trim();
  if (!image) return "";

  if (/^(data|blob):/i.test(image)) return image;

  if (/^https?:\/\//i.test(image)) {
    try {
      const host = new URL(image).hostname.toLowerCase();
      if (host !== "localhost" && host !== "127.0.0.1") return image;
    } catch {
      return image;
    }
  }

  const storageAt = image.indexOf("/storage/");
  if (storageAt >= 0) {
    return `${REMOTE_STORAGE_BASE}${image.slice(storageAt + "/storage".length)}`;
  }

  const relative = image.replace(/^\/+/, "").replace(/^storage\//, "");
  return `${REMOTE_STORAGE_BASE}/${relative}`;
};

export default function WebDevelopmentPortfolio({
  title = "Our Work",
  subtitle = "",
  items = [],
  getImageSrc,
}) {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const resolveSrc = (item) => {
    if (!item?.image) return "";
    const resolved = getImageSrc ? getImageSrc(item.image) : item.image;
    return toRemoteStorageUrl(resolved);
  };

  const slides = items
    .map((item) => ({ src: resolveSrc(item) }))
    .filter((slide) => slide.src);

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentImageIndex}
        slides={slides}
      />

      <section className="rs-webdev-portfolio">
        <div className="rs-webdev-portfolio__intro" data-aos="fade-up">
          <div className="container">
            <h2>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
        </div>

        <div className="portfolio section pt-0">
          <div className="container">
            {items.length > 0 ? (
              <div className="row gy-4">
                {items.map((item, index) => {
                  const imageSrc = resolveSrc(item);
                  const itemTitle = item.title || title;
                  const projectUrl = hasProjectUrl(item.project_url)
                    ? String(item.project_url).trim()
                    : hasProjectUrl(item.link)
                      ? String(item.link).trim()
                      : "";

                  return (
                    <div
                      key={`${item.image}-${index}`}
                      className="col-lg-4 col-md-6 portfolio-item"
                    >
                      <div className="portfolio-content h-100">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            className="img-fluid"
                            alt={itemTitle}
                            loading="lazy"
                          />
                        ) : null}

                        <div className="portfolio-info">
                          <h3>
                            {projectUrl ? (
                              <a
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${itemTitle} website`}
                              >
                                {itemTitle}
                              </a>
                            ) : (
                              itemTitle
                            )}
                          </h3>

                          {item.description ? <p>{item.description}</p> : null}

                          {imageSrc ? (
                            <button
                              type="button"
                              onClick={() => {
                                const slideIndex = slides.findIndex(
                                  (slide) => slide.src === imageSrc,
                                );

                                setCurrentImageIndex(
                                  slideIndex >= 0 ? slideIndex : 0,
                                );
                                setOpen(true);
                              }}
                              className="preview-link border-0 bg-transparent text-white"
                              aria-label={`View ${itemTitle} image`}
                            >
                              <i className="bi bi-zoom-in" aria-hidden="true"></i>
                            </button>
                          ) : null}

                          {projectUrl ? (
                            <a
                              href={projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="More Details"
                              className="details-link"
                              aria-label={`View ${itemTitle} details`}
                            >
                              <i
                                className="bi bi-link-45deg"
                                aria-hidden="true"
                              ></i>
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="rs-webdev-portfolio__empty">
                No gallery images available
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
