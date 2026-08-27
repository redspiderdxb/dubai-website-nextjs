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
    return false;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const clones = document.querySelectorAll(".dynamic-text-clone > div");

  if (!clones.length) {
    return false;
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

  return true;
}

/* =========================================================
   2. VIDEO ZOOM EFFECT
   ========================================================= */

function initVideoZoomEffect() {
  if (
    typeof window === "undefined" ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return false;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".rs-video-zoom-sec");
  const title = document.querySelector(".rs-video-zoom-sec .rs-video-title");
  const video = document.querySelector(".rs-video-zoom-sec .rs-video-wrap");
  const container = document.querySelector(".rs-video-zoom-sec .container");

  if (!section || !title || !video || !container) {
    return false;
  }

  const oldTrigger = ScrollTrigger.getById("rs-video-zoom");

  if (oldTrigger) {
    if (oldTrigger.animation) {
      oldTrigger.animation.kill();
    }

    oldTrigger.kill();
  }

  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    gsap.set(section, {
      height: "460px",
      minHeight: "460px",
      maxHeight: "460px",
    });
  }

  /* -----------------------------------------
     RESET
  ----------------------------------------- */

  gsap.set(title, {
    clearProps: "transform,opacity",
  });

  gsap.set(video, {
    clearProps: "transform,width,height,borderRadius,left,x,xPercent",
  });

  /* -----------------------------------------
     CONTAINER SPACING
  ----------------------------------------- */

  const getContainerSpacing = () => {
    const rect = container.getBoundingClientRect();

    return Math.max(rect.left, 0);
  };

  /* -----------------------------------------
     DESKTOP WIDTH
     Keep your existing desktop design
  ----------------------------------------- */

  const getFinalVideoWidth = () => {
    const spacing = getContainerSpacing();

    return Math.max(window.innerWidth - spacing * 2, 0);
  };

  /* -----------------------------------------
     MOBILE WIDTH
  ----------------------------------------- */

  const getMobileVideoWidth = () => {
    return Math.min(window.innerWidth - 30, 400);
  };

  /* -----------------------------------------
     MOBILE HEIGHT
     16:9 ratio
  ----------------------------------------- */

  const getMobileVideoHeight = () => {
    const width = getMobileVideoWidth();

    return width * (9 / 16);
  };

  /* -----------------------------------------
     INITIAL VIDEO
  ----------------------------------------- */

  if (isMobile) {
    gsap.set(video, {
      left: "50%",
      xPercent: -50,
      width: "calc(100% - 60px)",
      height: "auto",
      borderRadius: "20px",
    });
  } else {
    gsap.set(video, {
      left: "0%",
      xPercent: 0,
      width: "550px",
    });
  }

  /* -----------------------------------------
     SCROLL TIMELINE
  ----------------------------------------- */

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "rs-video-zoom",

      trigger: section,

      start: "top top",

      // Shorter animation on mobile
      end: isMobile ? "+=160" : "+=250",

      scrub: 0.8,

      pin: true,

      pinSpacing: true,

      anticipatePin: 1,

      invalidateOnRefresh: true,

      markers: false,
    },
  });

  /* -----------------------------------------
     TITLE ANIMATION
  ----------------------------------------- */

  tl.to(title, {
    opacity: 0,
    y: -30,
    scale: 0.97,
    duration: 0.4,
    ease: "power2.out",
  });

  /* -----------------------------------------
     VIDEO ANIMATION
  ----------------------------------------- */

  if (isMobile) {
    tl.to(
      video,
      {
        width: () => `${getMobileVideoWidth()}px`,

        height: () => `${getMobileVideoHeight()}px`,

        left: "50%",

        xPercent: -50,

        borderRadius: "18px",

        duration: 1.2,

        ease: "none",
      },
      "-=0.15",
    );
  } else {
    /*
      DESKTOP — SAME AS BEFORE
    */

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
  }

  ScrollTrigger.refresh();

  return true;
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
    return false;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".rs-gsap-stack-sec");

  const wrapper = section ? section.querySelector(".rs-gsap-cards") : null;

  if (!section || !wrapper) {
    return false;
  }

  const cards = Array.from(wrapper.querySelectorAll(":scope > .rs-gsap-card"));

  if (cards.length !== 3) {
    return false;
  }

  /* =====================================================
     REMOVE OLD TRIGGER
     ===================================================== */

  const oldTrigger = ScrollTrigger.getById("rs-card-stack");

  if (oldTrigger) {
    if (oldTrigger.animation) {
      oldTrigger.animation.kill();
    }

    oldTrigger.kill();
  }

  /* =====================================================
     RESET CARDS
     ===================================================== */

  cards.forEach((card) => {
    gsap.killTweensOf(card);

    gsap.set(card, {
      clearProps: "transform,opacity,visibility,zIndex,pointerEvents",
    });
  });

  /* =====================================================
     GET CARD HEIGHTS
     ===================================================== */

  const getCardHeights = () => {
    return cards.map((card) => {
      return card.scrollHeight;
    });
  };

  const getMaxCardHeight = () => {
    const heights = getCardHeights();

    return Math.max(...heights);
  };

  const getLastCardHeight = () => {
    return cards[2].scrollHeight;
  };

  /* =====================================================
     SET STACK HEIGHT
     ===================================================== */

  const setStackHeight = () => {
    const maxHeight = getMaxCardHeight();
    const lastCardHeight = getLastCardHeight();

    if (!maxHeight || !lastCardHeight) {
      return {
        maxHeight: 0,
        lastCardHeight: 0,
      };
    }

    /*
     * The wrapper needs the tallest card height because
     * Cards 1 and 2 can be taller than Card 3.
     */
    wrapper.style.height = `${maxHeight}px`;

    /*
     * IMPORTANT:
     *
     * The actual document-flow height is based on
     * the FINAL card, not the tallest hidden card.
     *
     * This prevents a large blank area after Card 3.
     */
    section.style.height = `${lastCardHeight}px`;

    section.style.minHeight = "0px";

    return {
      maxHeight,
      lastCardHeight,
    };
  };

  /* =====================================================
     INITIAL HEIGHT
     ===================================================== */

  const initialHeights = setStackHeight();

  /* =====================================================
     STACK POSITIONING
     ===================================================== */

  gsap.set(cards, {
    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    width: "100%",

    transformOrigin: "center top",

    willChange: "transform, opacity",
  });

  /* =====================================================
     CARD 1
     ===================================================== */

  gsap.set(cards[0], {
    y: 0,

    scale: 1,

    opacity: 1,

    visibility: "visible",

    zIndex: 3,

    pointerEvents: "auto",
  });

  /* =====================================================
     CARD 2
     ===================================================== */

  gsap.set(cards[1], {
    y: 70,

    scale: 1,

    opacity: 0,

    visibility: "visible",

    zIndex: 2,

    pointerEvents: "none",
  });

  /* =====================================================
     CARD 3
     ===================================================== */

  gsap.set(cards[2], {
    y: 70,

    scale: 1,

    opacity: 0,

    visibility: "visible",

    zIndex: 1,

    pointerEvents: "none",
  });

  /* =====================================================
     SCROLL DISTANCE
     ===================================================== */

  const getStackScrollDistance = () => {
    const maxHeight = getMaxCardHeight();
    const lastCardHeight = getLastCardHeight();

    if (!maxHeight || !lastCardHeight) {
      return 1;
    }

    /*
     * Timeline:
     *
     * 0.0 → 0.5 = Card 1 → Card 2
     * 0.5 → 1.0 = Card 2 → Card 3
     *
     * Use half of the tall-card distance and half
     * of the final-card distance so the final card
     * doesn't leave a large dead scroll area.
     */
    const firstTransitionDistance = maxHeight * 0.5;

    const secondTransitionDistance = lastCardHeight * 0.5;

    return Math.max(
      firstTransitionDistance + secondTransitionDistance,
      lastCardHeight,
    );
  };

  /* =====================================================
     MAIN TIMELINE
     ===================================================== */

  const timeline = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },

    scrollTrigger: {
      id: "rs-card-stack",

      trigger: section,

      start: "top top",

      /*
       * Do NOT use section.offsetHeight here.
       *
       * Section height represents the final visible card.
       * Scroll distance represents the complete animation.
       */
      end: () => {
        return `+=${getStackScrollDistance()}`;
      },

      pin: true,

      /*
       * Keep this TRUE.
       *
       * It prevents the following section from
       * moving underneath the pinned stack.
       */
      pinSpacing: true,

      scrub: true,

      anticipatePin: 1,

      invalidateOnRefresh: true,

      markers: false,
    },
  });

  /* =====================================================
     CARD 1 → CARD 2
     ===================================================== */

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

  /* =====================================================
     CARD 2 → CARD 3
     ===================================================== */

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

  /* =====================================================
     FINAL REFRESH
     ===================================================== */

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setStackHeight();

      ScrollTrigger.refresh();
    });
  });

  return true;
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
    return false;
  }

  initDynamicTextEffect();

  initVideoZoomEffect();

  initHomeCardStack();

  return true;
}

/* =========================================================
   5. WAIT FOR GSAP + SCROLLTRIGGER
   ========================================================= */

let rsEffectsStarted = false;
let rsEffectsAttempts = 0;

const RS_MAX_EFFECT_ATTEMPTS = 40;

function startRedSpiderEffects() {
  if (typeof window === "undefined") {
    return;
  }

  if (rsEffectsStarted) {
    return;
  }

  /*
   * GSAP can load after this script.
   * Retry instead of permanently failing.
   */
  if (
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    rsEffectsAttempts++;

    if (rsEffectsAttempts < RS_MAX_EFFECT_ATTEMPTS) {
      setTimeout(startRedSpiderEffects, 250);
    }

    return;
  }

  rsEffectsStarted = true;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initRedSpiderEffects();
      });
    });
  });
}

/* =========================================================
   6. DOM READY
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
   7. RESIZE
   ========================================================= */

let rsResizeTimer = null;

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    clearTimeout(rsResizeTimer);

    rsResizeTimer = setTimeout(() => {
      const section = document.querySelector(".rs-gsap-stack-sec");

      const wrapper = section?.querySelector(".rs-gsap-cards");

      if (wrapper && section) {
        const cards = Array.from(
          wrapper.querySelectorAll(":scope > .rs-gsap-card"),
        );

        if (cards.length === 3) {
          const maxHeight = Math.max(...cards.map((card) => card.scrollHeight));

          const lastCardHeight = cards[2].scrollHeight;

          /*
           * Wrapper = tallest card.
           */
          wrapper.style.height = `${maxHeight}px`;

          /*
           * Section flow = final card.
           */
          section.style.height = `${lastCardHeight}px`;

          section.style.minHeight = "0px";
        }
      }

      if (typeof window.ScrollTrigger !== "undefined") {
        window.ScrollTrigger.refresh();
      }
    }, 300);
  });
}

/* =========================================================
   8. EXPOSE FOR NEXT.JS
   ========================================================= */

if (typeof window !== "undefined") {
  window.initRedSpiderEffects = initRedSpiderEffects;

  window.initVideoZoomEffect = initVideoZoomEffect;

  window.initDynamicTextEffect = initDynamicTextEffect;

  window.initHomeCardStack = initHomeCardStack;

  window.startRedSpiderEffects = startRedSpiderEffects;
}
