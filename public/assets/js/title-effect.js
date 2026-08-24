/* =========================================================
   REDSPIDER TITLE EFFECTS
   ========================================================= */

/* =========================================================
   1. DYNAMIC TEXT EFFECT
   ========================================================= */

function initDynamicTextEffect() {
  if (
    typeof window === "undefined" ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const clones = document.querySelectorAll(".dynamic-text-clone > div");

  if (!clones.length) {
    return;
  }

  gsap.to(clones, {
    filter: "blur(0px)",
    opacity: 1,
    stagger: 0.1,

    scrollTrigger: {
      trigger: "#section-two",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
    },
  });
}

/* =========================================================
   2. VIDEO ZOOM EFFECT - FIXED
   ========================================================= */
function initVideoZoomEffect() {
  if (
    typeof window === "undefined" ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".rs-video-zoom-sec");
  const title = document.querySelector(".rs-video-zoom-sec .rs-video-title");
  const video = document.querySelector(".rs-video-zoom-sec .rs-video-wrap");
  const container = document.querySelector(".rs-video-zoom-sec .container");

  if (!section || !title || !video || !container) {
    return;
  }

  const oldTrigger = ScrollTrigger.getById("rs-video-zoom");

  if (oldTrigger) {
    if (oldTrigger.animation) {
      oldTrigger.animation.kill();
    }
    oldTrigger.kill();
  }

  gsap.set(title, {
    clearProps: "transform,opacity",
  });

  gsap.set(video, {
    clearProps: "transform,width,height,borderRadius,left,x,xPercent",
  });

  gsap.set(video, {
    left: "0%",
    xPercent: 0,
    width: "550px",
  });

  const getContainerSpacing = () => {
    const rect = container.getBoundingClientRect();
    return Math.max(rect.left, 0);
  };

  const getFinalVideoWidth = () => {
    const spacing = getContainerSpacing();
    return Math.max(window.innerWidth - spacing * 2, 0);
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "rs-video-zoom",
      trigger: section,
      start: "top top",
      end: "+=250", // ✅ FIXED: 250px scroll only
      scrub: 0.8,
      pin: true,
      pinSpacing: true, // ✅ FIXED: true (prevents overlap)
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
    },
  });

  tl.to(title, {
    opacity: 0,
    y: -30,
    scale: 0.97,
    duration: 0.4,
    ease: "power2.out",
  });

  tl.to(
    video,
    {
      width: () => {
        return `${getFinalVideoWidth()}px`;
      },
      height: "80vh",
      left: "50%",
      xPercent: -50,
      borderRadius: 0,
      duration: 1.8,
      ease: "none",
    },
    "-=0.15",
  );

  ScrollTrigger.refresh();

  return tl;
}

/* =========================================================
   3. HOME PAGE - CUSTOM 3 CARD STACK
   ========================================================= */

function initHomeCardStack() {
  if (
    typeof window === "undefined" ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".rs-gsap-stack-sec");
  const wrapper = section ? section.querySelector(".rs-gsap-cards") : null;

  if (!section || !wrapper) {
    return;
  }

  const cards = Array.from(wrapper.querySelectorAll(":scope > .rs-gsap-card"));

  if (cards.length !== 3) {
    return;
  }

  const oldTrigger = ScrollTrigger.getById("rs-card-stack");
  if (oldTrigger) {
    if (oldTrigger.animation) {
      oldTrigger.animation.kill();
    }
    oldTrigger.kill();
  }

  cards.forEach((card) => {
    gsap.killTweensOf(card);
    gsap.set(card, {
      clearProps: "transform,opacity,visibility,zIndex",
    });
  });

  const getMaxCardHeight = () => {
    let maxHeight = 0;
    cards.forEach((card) => {
      const height = card.scrollHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    return maxHeight;
  };

  const setWrapperHeight = () => {
    const height = getMaxCardHeight();
    wrapper.style.height = `${height}px`;
    return height;
  };

  setWrapperHeight();

  gsap.set(cards, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    transformOrigin: "center top",
    willChange: "transform, opacity",
  });

  gsap.set(cards[0], {
    y: 0,
    scale: 1,
    opacity: 1,
    visibility: "visible",
    zIndex: 3,
    pointerEvents: "auto",
  });

  gsap.set(cards[1], {
    y: 70,
    scale: 1,
    opacity: 0,
    visibility: "visible",
    zIndex: 2,
    pointerEvents: "none",
  });

  gsap.set(cards[2], {
    y: 70,
    scale: 1,
    opacity: 0,
    visibility: "visible",
    zIndex: 1,
    pointerEvents: "none",
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },

    scrollTrigger: {
      id: "rs-card-stack",
      trigger: section,
      start: "top top",
      end: "+=150%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
    },
  });

  // CARD 1 → CARD 2
  timeline.to(
    cards[0],
    {
      y: -50,
      scale: 0.96,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    },
    0,
  );

  timeline.to(
    cards[1],
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        cards[1].style.pointerEvents = "auto";
      },
      onComplete: () => {
        cards[0].style.pointerEvents = "none";
      },
    },
    0,
  );

  // CARD 2 → CARD 3
  timeline.to(
    cards[1],
    {
      y: -50,
      scale: 0.96,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    },
    0.5,
  );

  timeline.to(
    cards[2],
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        cards[2].style.pointerEvents = "auto";
      },
      onComplete: () => {
        cards[1].style.pointerEvents = "none";
      },
    },
    0.5,
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setWrapperHeight();
      ScrollTrigger.refresh();
    });
  });

  return timeline;
}

/* =========================================================
   4. INITIALIZE ALL EFFECTS
   ========================================================= */

function initRedSpiderEffects() {
  if (
    typeof window === "undefined" ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return;
  }

  initDynamicTextEffect();
  initVideoZoomEffect();
  initHomeCardStack();
}

/* =========================================================
   5. PAGE LOAD
   ========================================================= */

function startRedSpiderEffects() {
  if (typeof window === "undefined") {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initRedSpiderEffects();
      });
    });
  });
}

/* =========================================================
   DOM READY
   ========================================================= */

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startRedSpiderEffects, {
      once: true,
    });
  } else {
    startRedSpiderEffects();
  }
}

/* =========================================================
   6. RESIZE
   ========================================================= */

let rsResizeTimer = null;

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    clearTimeout(rsResizeTimer);

    rsResizeTimer = setTimeout(() => {
      const section = document.querySelector(".rs-gsap-stack-sec");
      const wrapper = section?.querySelector(".rs-gsap-cards");

      if (wrapper) {
        const cards = Array.from(
          wrapper.querySelectorAll(":scope > .rs-gsap-card"),
        );

        if (cards.length === 3) {
          const maxHeight = Math.max(...cards.map((card) => card.scrollHeight));
          wrapper.style.height = `${maxHeight}px`;
        }
      }

      if (typeof window.ScrollTrigger !== "undefined") {
        window.ScrollTrigger.refresh();
      }
    }, 300);
  });
}

/* =========================================================
   7. EXPOSE FOR NEXT.JS
   ========================================================= */

if (typeof window !== "undefined") {
  window.initRedSpiderEffects = initRedSpiderEffects;
  window.initVideoZoomEffect = initVideoZoomEffect;
  window.initDynamicTextEffect = initDynamicTextEffect;
  window.initHomeCardStack = initHomeCardStack;
}
