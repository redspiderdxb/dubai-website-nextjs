document.addEventListener("DOMContentLoaded", () => {
  const clones = document.querySelectorAll(".dynamic-text-clone > div");

  // Initialize GSAP with ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Animate blur and opacity with GSAP
  gsap.to(clones, {
    filter: "blur(0px)", // Remove blur
    opacity: 1, // Fully opaque
    stagger: 0.1, // Slight delay between each word
    scrollTrigger: {
      trigger: "#section-two", // Starts when section-two enters viewport
      start: "top top", // Start when the top of the section hits the top of the viewport
      end: "+=100%", // Animation lasts for the viewport height
      scrub: true, // Smooth synchronization with scrolling
      pin: true, // Keeps the section fixed during animation
    },
  });
});


// 

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".rs-video-zoom-sec",
      start: "top top",
      end: "+=700",
      scrub: 3,
      pin: true
    }
  });

  tl.to(".rs-video-title", {
    opacity: 0,
    y: -90,
    scale: 0.9,
    duration: 1,
    ease: "power2.out"
  });

  tl.to(".rs-video-wrap", {
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
    duration: 5,
    ease: "power3.inOut"
  }, "-=0.35");
});




// home pin spacer 4 lsides

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const section = document.querySelector(".rs-gsap-cards");
  const cards = gsap.utils.toArray(".rs-gsap-cards [class*='rs-card-']");

  if (!section || !cards.length) return;

  const header = document.querySelector("header");

  const getHeaderHeight = () => {
    return header ? header.offsetHeight : 0;
  };

  gsap.set(cards, {
    clearProps: "transform,opacity"
  });

  gsap.set(cards, {
    yPercent: 15,
    opacity: 0,
    transformOrigin: "0px top"
  });

  gsap.set(cards[0], {
    yPercent: 0,
    opacity: 1
  });

  const rsStackTimeline = gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      id: "rs-card-stack",
      trigger: section,
      start: "top 15px",
      end: () => `+=${window.innerHeight * (cards.length - 1)}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false
    }
  });

  cards.forEach((card, index) => {
    if (index === 0) return;

    const previousCard = cards[index - 1];

    rsStackTimeline.to(card, {
      yPercent: 0,
      opacity: 1,
      duration: 1
    });

    rsStackTimeline.to(
      previousCard,
      {
        scale: 1 - (cards.length - index) * 0.02,
        yPercent: -(cards.length - index) * 0.35,
        opacity: 1,
        duration: 1
      },
      "<"
    );
  });

  cards.forEach((card, index) => {
    rsStackTimeline.to(
      card,
      {
        scale: 1 - (cards.length - 1 - index) * 0.02,
        yPercent: -(cards.length - 1 - index) * 0.4,
        opacity: index === cards.length - 1 ? 1 : 0.9,
        duration: 0.5
      },
      "<"
    );
  });

  ScrollTrigger.refresh();
});

let rsResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(rsResizeTimer);

  rsResizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});