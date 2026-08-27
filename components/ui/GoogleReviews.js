import { useEffect, useRef, useState } from "react";

const AVATAR_COLORS = [
  "#5f6368",
  "#0f9d58",
  "#7e57c2",
  "#e37400",
  "#d93025",
  "#1a73e8",
  "#188038",
];

function avatarColor(name = "") {
  let hash = 0;

  for (let index = 0; index < name.length; index += 1) {
    hash = name.charCodeAt(index) + ((hash << 5) - hash);
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function ratingLabel(rating) {
  if (rating >= 4.5) {
    return "EXCELLENT";
  }

  if (rating >= 4) {
    return "GREAT";
  }

  if (rating >= 3.5) {
    return "GOOD";
  }

  return "AVERAGE";
}

function StarIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#fbbc04"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

function Stars({ count = 5, size = 18 }) {
  return (
    <span className="rs-google-stars" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <StarIcon key={index} size={size} />
      ))}
    </span>
  );
}

function GoogleWord() {
  return (
    <span className="rs-google-word" aria-hidden="true">
      <span className="rs-blue">G</span>
      <span className="rs-red">o</span>
      <span className="rs-yellow">o</span>
      <span className="rs-blue">g</span>
      <span className="rs-green">l</span>
      <span className="rs-red">e</span>
    </span>
  );
}

function GoogleG() {
  return (
    <svg
      className="rs-google-g"
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.2-.1-2.3-.3-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.6C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.8-6.7 7.4l6.3 5.3C38.2 37.3 43.7 32 43.7 24c0-1.2-.1-2.3-.3-3.5z"
      />
    </svg>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const text = review.text || "";
  const needsMore = text.length > 150;
  const visibleText =
    expanded || !needsMore ? text : `${text.slice(0, 150).trim()}...`;
  const initial = (review.author || "G").trim().charAt(0).toUpperCase();

  return (
    <article className="rs-google-review-card">
      <div className="rs-google-review-top">
        <span
          className="rs-google-review-avatar"
          style={{ background: avatarColor(review.author) }}
          aria-hidden="true"
        >
          {initial}
        </span>

        <div className="rs-google-review-person">
          {review.authorUrl ? (
            <h3>
              <a
                href={review.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {review.author}
              </a>
            </h3>
          ) : (
            <h3>{review.author}</h3>
          )}
          {review.time ? <small>{review.time}</small> : null}
        </div>

        <GoogleG />
      </div>

      <div className="rs-google-review-rating">
        <Stars count={5} size={16} />
        <span className="rs-google-verified" aria-label="Verified">
          <i className="bi bi-check" aria-hidden="true"></i>
        </span>
      </div>

      {text ? (
        <p>
          {visibleText}
          {needsMore ? (
            <>
              {" "}
              <button
                type="button"
                className="rs-google-read-more"
                onClick={() => setExpanded((current) => !current)}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            </>
          ) : null}
        </p>
      ) : null}
    </article>
  );
}

export default function GoogleReviews({ initialData = null }) {
  const [data, setData] = useState(initialData);
  const rootRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      return undefined;
    }

    let mounted = true;

    fetch("/api/google-reviews/")
      .then((response) => response.json())
      .then((payload) => {
        if (mounted) {
          setData(payload);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [initialData]);

  const rating = Number(data?.rating || 4.9);
  const total = Number(data?.total || 0);
  const url = data?.url || "https://share.google/Zmvt06D8A6xyIbCte";
  const reviews = (Array.isArray(data?.reviews) ? data.reviews : []).slice(
    0,
    5,
  );
  const reviewsKey = reviews.map((review) => review.author).join("|");
  const totalLabel =
    data?.available && total ? String(total) : total ? `${total}+` : "100+";

  useEffect(() => {
    if (!reviews.length) {
      return undefined;
    }

    let swiper;
    let timer;
    let cancelled = false;

    const init = () => {
      if (cancelled || !rootRef.current || typeof window.Swiper !== "function") {
        return false;
      }

      if (swiperRef.current?.destroy) {
        swiperRef.current.destroy(true, true);
      }

      swiper = new window.Swiper(
        rootRef.current.querySelector(".rs-google-reviews-swiper"),
        {
          slidesPerView: 1,
          spaceBetween: 16,
          loop: false,
          speed: 550,
          autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          navigation: {
            nextEl: rootRef.current.querySelector(".rs-google-reviews-next"),
            prevEl: rootRef.current.querySelector(".rs-google-reviews-prev"),
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1100: {
              slidesPerView: 3,
            },
          },
        },
      );

      swiperRef.current = swiper;
      return true;
    };

    if (!init()) {
      timer = setInterval(() => {
        if (init() && timer) {
          clearInterval(timer);
        }
      }, 150);
    }

    return () => {
      cancelled = true;

      if (timer) {
        clearInterval(timer);
      }

      if (swiperRef.current?.destroy) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [reviewsKey, reviews.length]);

  return (
    <section id="review-sec" className="rs-google-reviews">
      <div className="container">
        <div className="rs-google-reviews-widget">
          <div className="rs-google-reviews-summary">
            <p className="rs-google-reviews-label">{ratingLabel(rating)}</p>
            <Stars count={5} size={28} />
            <p className="rs-google-reviews-based">
              Based on <strong>{totalLabel} reviews</strong>
            </p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <GoogleWord />
            </a>
          </div>

          {reviews.length > 0 ? (
            <div className="rs-google-reviews-carousel" ref={rootRef}>
              <button
                type="button"
                className="rs-google-reviews-prev"
                aria-label="Previous reviews"
              >
                <i className="bi bi-chevron-left" aria-hidden="true"></i>
              </button>

              <div className="swiper rs-google-reviews-swiper">
                <div className="swiper-wrapper">
                  {reviews.map((review, index) => (
                    <div
                      className="swiper-slide"
                      key={`${review.author}-${index}`}
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                  <div className="swiper-slide">
                    <a
                      className="rs-google-review-card rs-google-read-more-card"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GoogleG />
                      <strong>Read more</strong>
                      <span>See all {totalLabel} Google reviews</span>
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="rs-google-reviews-next"
                aria-label="Next reviews"
              >
                <i className="bi bi-chevron-right" aria-hidden="true"></i>
              </button>
            </div>
          ) : (
            <p className="rs-google-reviews-empty">
              Read the latest Google reviews for RedSpider Web &amp; Art Design.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
