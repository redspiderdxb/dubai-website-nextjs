import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Zoom steps for the full-page popup; the first step fits the image to the popup width
const POPUP_ZOOM_LEVELS = [1, 1.5, 2, 3];

// Shared zoom popup. Ecommerce projects supply a full-page screenshot.
// Callers without a separate asset pass the same URL for image and fullImage.
export default function PortfolioPagePopup({ projects, index, onClose, onNavigate }) {
  const [zoomIndex, setZoomIndex] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const closeRef = useRef(null);
  const project = projects[index];
  const imageAlt = project.imageAlt || `Full page screenshot of ${project.title}`;
  const openLabel = project.openLabel || "Open HD image";
  const openAria = project.openAria || `Open ${project.title} HD image in a new tab`;
  const count = projects.length;
  const lastZoom = POPUP_ZOOM_LEVELS.length - 1;
  const zoom = POPUP_ZOOM_LEVELS[zoomIndex];

  // Parent re-keys this component per project, so every project starts fresh.
  // Lock page scroll while open and focus the close button.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (count > 1 && event.key === "ArrowRight") onNavigate((index + 1) % count);
      if (count > 1 && event.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
      if (event.key === "+" || event.key === "=") setZoomIndex((z) => Math.min(z + 1, lastZoom));
      if (event.key === "-") setZoomIndex((z) => Math.max(z - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, lastZoom, onClose, onNavigate]);

  return createPortal(
    <div className="ecommerce-template">
      <div
        className="rs-ecom-popup"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} full page preview`}
      >
        <div className="rs-ecom-popup__bar">
          <div className="rs-ecom-popup__title">
            <span className="rs-ecom-popup__name">{project.title}</span>
            {count > 1 ? (
              <span className="rs-ecom-popup__count">
                {index + 1} / {count}
              </span>
            ) : null}
          </div>
          <div className="rs-ecom-popup__tools">
            <button
              type="button"
              className="rs-ecom-popup__btn"
              onClick={() => setZoomIndex((z) => Math.max(z - 1, 0))}
              disabled={zoomIndex === 0}
              aria-label="Zoom out"
            >
              <i className="bi bi-dash-lg" aria-hidden="true"></i>
            </button>
            <span className="rs-ecom-popup__zoom" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              className="rs-ecom-popup__btn"
              onClick={() => setZoomIndex((z) => Math.min(z + 1, lastZoom))}
              disabled={zoomIndex === lastZoom}
              aria-label="Zoom in"
            >
              <i className="bi bi-plus-lg" aria-hidden="true"></i>
            </button>
            <a
              className="rs-ecom-popup__open"
              href={project.fullImage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={openAria}
            >
              <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              <span>{openLabel}</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              className="rs-ecom-popup__btn"
              onClick={onClose}
              aria-label="Close preview"
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div
          className="rs-ecom-popup__body"
          onClick={(event) => {
            // Clicking the empty dark area around the image closes the popup
            if (event.target === event.currentTarget) onClose();
          }}
        >
          {!imageReady ? <span className="rs-ecom-popup__spinner" aria-hidden="true"></span> : null}
          <img
            className="rs-ecom-popup__image"
            src={project.fullImage}
            alt={imageAlt}
            decoding="async"
            style={{ width: `${zoom * 100}%`, opacity: imageReady ? 1 : 0 }}
            onLoad={() => setImageReady(true)}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = project.image;
              setImageReady(true);
            }}
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              className="rs-ecom-popup__nav rs-ecom-popup__nav--prev"
              onClick={() => onNavigate((index - 1 + count) % count)}
              aria-label="Previous project"
            >
              <i className="bi bi-chevron-left" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="rs-ecom-popup__nav rs-ecom-popup__nav--next"
              onClick={() => onNavigate((index + 1) % count)}
              aria-label="Next project"
            >
              <i className="bi bi-chevron-right" aria-hidden="true"></i>
            </button>
          </>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
