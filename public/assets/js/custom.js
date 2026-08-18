(function ($) {
  "use strict";

  function initRsHeader() {
    var $header = $(".rs-main-header");
    var $toggle = $(".rs-mobile-toggle");

    if (!$header.length || !$toggle.length) return;

    $toggle.off("click.rsHeader").on("click.rsHeader", function (e) {
      e.preventDefault();
      e.stopPropagation();

      $header.toggleClass("rs-mobile-open");
      $(this).toggleClass("bi-list bi-x-lg");
    });

    $(".rs-main-header .dropdown > a")
      .off("click.rsHeader")
      .on("click.rsHeader", function (e) {
        if ($(window).width() < 1200) {
          e.preventDefault();
          e.stopPropagation();

          var $parent = $(this).parent(".dropdown");

          $parent.toggleClass("rs-dropdown-open");
          $parent.siblings(".dropdown").removeClass("rs-dropdown-open");
        }
      });

    $(document)
      .off("click.rsHeader")
      .on("click.rsHeader", function (e) {
        if (
          $(window).width() < 1200 &&
          !$(e.target).closest(".rs-main-header").length
        ) {
          closeRsHeader();
        }
      });

    $(window)
      .off("resize.rsHeader")
      .on("resize.rsHeader", function () {
        if ($(window).width() >= 1200) {
          closeRsHeader();
        }
      });
  }

  function closeRsHeader() {
    $(".rs-main-header").removeClass("rs-mobile-open");
    $(".rs-mobile-toggle").addClass("bi-list").removeClass("bi-x-lg");
    $(".rs-main-header .dropdown").removeClass("rs-dropdown-open");
  }

  function initPortfolioFilter() {
    var isoContainer = document.querySelector(".isotope-container");

    if (!isoContainer || typeof Isotope === "undefined") return;

    var iso = new Isotope(isoContainer, {
      itemSelector: ".isotope-item",
      layoutMode: "masonry",
    });

    var $filterToggle = $("#filterToggle");
    var $filterMenu = $("#filterMenu");

    if (!$filterToggle.length || !$filterMenu.length) return;

    $filterToggle.off("click.rsFilter").on("click.rsFilter", function (e) {
      e.preventDefault();
      e.stopPropagation();

      $filterMenu.toggleClass("show");
    });

    $("#filterMenu li")
      .off("click.rsFilter")
      .on("click.rsFilter", function (e) {
        e.preventDefault();

        $("#filterMenu li").removeClass("active");
        $(this).addClass("active");

        iso.arrange({
          filter: $(this).attr("data-filter"),
        });

        $filterMenu.removeClass("show");

        setTimeout(refreshGsap, 350);
      });

    $(document)
      .off("click.rsFilter")
      .on("click.rsFilter", function () {
        $filterMenu.removeClass("show");
      });
  }

  function initGsapAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    initRsEmailBenefitsCompactAnimations();

    var revealContainers = document.querySelectorAll(".rs-container-reveal");

    if (revealContainers.length) {
      revealContainers.forEach(function (container) {
        var inner = container.querySelector(".rs-container-reveal-inner");

        if (!inner) return;

        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        });

        tl.set(container, {
          autoAlpha: 1,
        });

        tl.from(container, {
          duration: 1.35,
          xPercent: -100,
          ease: "power2.out",
        });

        tl.from(
          inner,
          {
            duration: 1.35,
            xPercent: 100,
            scale: 1.08,
            ease: "power2.out",
          },
          "-=1.35",
        );
      });
    }

    var title = document.querySelector(".rs-main-title");

    if (title) {
      if (typeof SplitType !== "undefined") {
        new SplitType(title, {
          types: "words,chars",
          tagName: "span",
        });
      }

      gsap.from(title.querySelectorAll(".char"), {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.025,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".rs-marquee-heading",
          start: "top 75%",
          once: true,
        },
      });
    }

    gsap.from(".rs-small-title", {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".rs-marquee-heading",
        start: "top 75%",
        once: true,
      },
    });

    gsap.from(".rs-main-text", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      delay: 0.35,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".rs-marquee-heading",
        start: "top 75%",
        once: true,
      },
    });

    if (document.querySelector(".text-fill")) {
      gsap.set(".text-fill", {
        backgroundSize: "0%",
      });

      gsap.utils.toArray(".text-fill").forEach(function (text) {
        gsap.fromTo(
          text,
          {
            backgroundSize: "0%",
          },
          {
            backgroundSize: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: text,
              start: "center 100%",
              end: "center 50%",
              scrub: true,
            },
          },
        );
      });
    }

    if (document.querySelector(".gsap-float")) {
      gsap.to(".gsap-float", {
        y: -18,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    if (
      document.querySelector(".service-card") ||
      document.querySelector(".feature-box")
    ) {
      gsap.utils
        .toArray(".service-card, .feature-box")
        .forEach(function (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        });
    }

    var topTrack = document.querySelector(".top-track");
    var bottomTrack = document.querySelector(".bottom-track");
    var gallerySec = document.querySelector(".opposite-gallery-sec");

    if (topTrack && bottomTrack && gallerySec) {
      gsap.to(topTrack, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: gallerySec,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(bottomTrack, {
        xPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: gallerySec,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }

    if (typeof SplitType !== "undefined") {
      document.querySelectorAll(".split-brand-title").forEach(function (t) {
        new SplitType(t, {
          types: "words,chars",
          tagName: "span",
        });

        gsap.from(t.querySelectorAll(".char"), {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: t,
            start: "top 80%",
            once: true,
          },
        });
      });
    }
  }

  // rs domain registration animation start
  function initRsDomainRegistrationAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document
      .querySelectorAll(".rs-domain-registration")
      .forEach(function (section) {
        var services = section.querySelector(
          ".rs-domain-registration__services",
        );

        var intro = section.querySelector(
          ".rs-domain-registration__services-intro",
        );

        var items = section.querySelectorAll(
          ".rs-domain-registration__service-item",
        );

        if (!services || !intro || !items.length) return;

        var servicesTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: services,
            start: "top 82%",
            once: true,
          },
        });

        servicesTimeline
          .from(intro, {
            y: 24,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
          })
          .from(
            items,
            {
              y: 18,
              opacity: 0,
              duration: 0.55,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.35",
          );
      });
  }

  // rs domain registration animation end

  // rs email industries showcase animation start
  function initRsEmailIndustriesShowcaseAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document
      .querySelectorAll(".email-industries-showcase")
      .forEach(function (section) {
        const intro = section.querySelector(".email-industries-intro");

        const cards = section.querySelectorAll(".industry-card");

        const closing = section.querySelector(".industries-closing");

        const orbit = section.querySelector(".email-orbit");

        const cardGrid = section.querySelector(".industry-card-grid");

        if (intro) {
          gsap.from(intro, {
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
            x: -55,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        }

        if (cardGrid && cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: cardGrid,
              start: "top 84%",
              once: true,
            },
            y: 65,
            opacity: 0,
            rotate: 2,
            scale: 0.94,
            duration: 0.8,
            stagger: {
              each: 0.09,
              from: "start",
            },
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        }

        if (closing) {
          gsap.from(closing, {
            scrollTrigger: {
              trigger: closing,
              start: "top 92%",
              once: true,
            },
            y: 35,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        }

        if (orbit) {
          gsap.to(orbit, {
            rotation: 360,
            duration: 24,
            repeat: -1,
            ease: "none",
          });
        }
      });
  }

  // rs email industries showcase animation end

  // rs gd intro animation start
  function initRsGdIntroAnimations() {
    if (typeof jQuery === "undefined") return;

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    jQuery(".rs-gd-intro").each(function () {
      var section = this;
      var $section = jQuery(section);

      $section.find(".rs-gd-intro__reveal").each(function (paragraphIndex) {
        var paragraph = this;

        var words = jQuery(paragraph).text().trim().split(/\s+/);

        var accentWords = [
          "RedSpider",
          "professional",
          "identity.",
          "creative",
          "impressive",
          "startup",
          "goals.",
          "print",
          "digital",
          "creativity",
          "innovation",
          "passion",
          "ecommerce",
          "solutions",
          "email",
          "marketing",
          "launching",
          "promoting",
          "connected",
        ];

        paragraph.innerHTML = words
          .map(function (word) {
            var cleanWord = word.replace(/[^a-zA-Z]/g, "");

            var isAccent = accentWords.some(function (accent) {
              return (
                cleanWord.toLowerCase() ===
                accent.replace(/[^a-zA-Z]/g, "").toLowerCase()
              );
            });

            return (
              '<span class="rs-gd-intro__word' +
              (isAccent ? " rs-gd-intro__word--accent" : "") +
              '">' +
              word +
              "</span>"
            );
          })
          .join(" ");

        var wordElements = paragraph.querySelectorAll(".rs-gd-intro__word");

        gsap.fromTo(
          wordElements,
          {
            opacity: 0.08,
            y: 26,
            filter: "blur(7px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.025,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 84%",
              end: "bottom 55%",
              scrub: 1,
            },
          },
        );
      });

      var copy = $section.find(".rs-gd-intro__copy")[0];

      var shape = $section.find(".rs-gd-intro__shape")[0];

      if (copy) {
        gsap.fromTo(
          copy,
          {
            scale: 0.95,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "center 55%",
              scrub: 1,
            },
          },
        );
      }

      if (shape) {
        gsap.to(shape, {
          rotation: 385,
          y: -18,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    ScrollTrigger.refresh();
  }

  // rs gd intro animation end

  // rs vertical cards animation start
  function initRsVerticalCardsAnimations() {
    if (
      typeof jQuery === "undefined" ||
      typeof gsap === "undefined" ||
      typeof ScrollTrigger === "undefined"
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    jQuery(".rs-vertical-cards").each(function () {
      var section = this;

      var reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      jQuery(section)
        .find(".rs-vertical-cards__card")
        .each(function (index) {
          var card = this;

          var speed = parseFloat(card.getAttribute("data-scroll-speed")) || 1;

          gsap.fromTo(
            card,
            {
              y: function () {
                return window.innerWidth < 768 ? 90 : 150;
              },
            },
            {
              y: function () {
                var distance = window.innerHeight + card.offsetHeight + 630;

                var mobileFactor = window.innerWidth < 768 ? 0.78 : 1;

                return -(distance * speed * mobileFactor);
              },
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: function (self) {
          gsap.to(jQuery(section).find(".rs-vertical-cards__word"), {
            opacity: 0.34 + self.progress * 0.66,
            duration: 0.18,
            overwrite: true,
          });
        },
      });
    });

    var resizeTimer;

    jQuery(window).on("resize.rsVerticalCards", function () {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(function () {
        ScrollTrigger.refresh();
      }, 180);
    });
  }

  // rs vertical cards animation end

  // creative section
  function initCreativeSection() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".rsu-scene", {
      scrollTrigger: {
        trigger: ".rsu-creative-sec",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.88,
      rotateX: 10,
      rotateY: -8,
      y: 90,
      duration: 1.25,
      ease: "power4.out",
    });

    gsap.from(".rsu-main-title", {
      scrollTrigger: {
        trigger: ".rsu-creative-sec",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 80,
      skewY: 4,
      duration: 1,
      delay: 0.15,
      ease: "power4.out",
    });

    gsap.from(".rsu-bottom-left", {
      scrollTrigger: {
        trigger: ".rsu-creative-sec",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -70,
      duration: 0.95,
      delay: 0.35,
      ease: "power3.out",
    });

    gsap.from(".rsu-accordion-wrap", {
      scrollTrigger: {
        trigger: ".rsu-creative-sec",
        start: "top 58%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 80,
      duration: 1,
      delay: 0.45,
      ease: "power3.out",
    });

    gsap.from(".rsu-accordion-item", {
      scrollTrigger: {
        trigger: ".rsu-accordion-wrap",
        start: "top 84%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 25,
      stagger: 0.08,
      duration: 0.65,
      ease: "power3.out",
    });

    gsap.to(".rsu-btn i", {
      x: 4,
      y: -4,
      repeat: -1,
      yoyo: true,
      duration: 0.75,
      ease: "power1.inOut",
    });
  }

  // creative section end

  function initSpecialImageChange() {
    var rsItems = document.querySelectorAll(".rs-special-item");

    var rsPreviewImage = document.getElementById("rsPreviewImage");

    var rsImageBox = document.getElementById("rsImageBox");

    if (!rsItems.length || !rsPreviewImage || !rsImageBox) {
      return;
    }

    function changeSpecialImage(item) {
      var newImage = item.getAttribute("data-img");

      if (!newImage) return;

      if (rsPreviewImage.getAttribute("src") === newImage) {
        return;
      }

      rsItems.forEach(function (btn) {
        btn.classList.remove("active");
      });

      item.classList.add("active");

      rsImageBox.classList.add("rs-changing");

      setTimeout(function () {
        rsPreviewImage.setAttribute("src", newImage);

        rsImageBox.classList.remove("rs-changing");
      }, 220);
    }

    rsItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        if (window.innerWidth > 991) {
          changeSpecialImage(item);
        }
      });

      item.addEventListener("click", function () {
        changeSpecialImage(item);
      });
    });
  }

  function updateRsStudioSymbols() {
    $(".rs-studio-btn").each(function () {
      var isOpen = $(this).attr("aria-expanded") === "true";

      $(this)
        .find(".rs-studio-symbol")
        .text(isOpen ? "−" : "+");
    });
  }

  function setRsStudioImage(index) {
    var $images = $(".rs-studio-img");

    if (!isFinite(index) || index < 0 || index >= $images.length) {
      return;
    }

    $images.removeClass("active");
    $images.eq(index).addClass("active");
  }

  function initRsStudioAccordion() {
    var $accordion = $("#rsStudioAccordion");

    if (!$accordion.length) return;

    $accordion.off(".rsStudio");

    $accordion.on("click.rsStudio", ".rs-studio-btn", function () {
      var imgIndex = parseInt($(this).attr("data-img"), 10);

      setRsStudioImage(imgIndex);
    });

    $accordion.on(
      "shown.bs.collapse.rsStudio hidden.bs.collapse.rsStudio",
      function () {
        updateRsStudioSymbols();

        var $shownPanel = $accordion.find(".accordion-collapse.show");

        if ($shownPanel.length) {
          var imgIndex = parseInt(
            $shownPanel
              .closest(".accordion-item")
              .find(".rs-studio-btn")
              .attr("data-img"),
            10,
          );

          setRsStudioImage(imgIndex);
        }
      },
    );

    updateRsStudioSymbols();

    var $firstShown = $accordion.find(".accordion-collapse.show");

    if ($firstShown.length) {
      var firstImgIndex = parseInt(
        $firstShown
          .closest(".rs-studio-item")
          .find(".rs-studio-btn")
          .attr("data-img"),
        10,
      );

      setRsStudioImage(firstImgIndex);
    }
  }

  // circle js

  function initAgencyCircleText() {
    var $circle = $("#rsAgencyCircleText");

    if (!$circle.length) return;

    $circle.empty();

    var text = "Years of Design Experience  ";

    var chars = text.split("");

    var radius = 62;

    $.each(chars, function (index, char) {
      $("<span>")
        .text(char)
        .css(
          "transform",
          "rotate(" +
            index * (360 / chars.length) +
            "deg) translate(" +
            radius +
            "px)",
        )
        .appendTo($circle);
    });
  }

  // rs ecommerce platforms effect start
  jQuery(function ($) {
    var $section = $(".rs-ecommerce-platforms");

    if (!$section.length) return;

    var $cards = $section.find(".card");

    function clamp(number, min, max) {
      min = typeof min !== "undefined" ? min : 0;

      max = typeof max !== "undefined" ? max : 1;

      return Math.min(max, Math.max(min, number));
    }

    function ease(value) {
      return 1 - Math.pow(1 - value, 3);
    }

    function render() {
      var windowWidth = $(window).width();

      var windowHeight = $(window).height();

      if (windowWidth <= 760) {
        $cards.css({
          width: "",
          zIndex: "",
          transform: "",
        });

        return;
      }

      var sectionElement = $section.get(0);

      var rect = sectionElement.getBoundingClientRect();

      var distance = sectionElement.offsetHeight - windowHeight;

      if (distance <= 0) return;

      var progress = ease(clamp(-rect.top / distance));

      var gap = Math.max(10, windowWidth * 0.0105);

      var side = Math.max(16, windowWidth * 0.0165);

      var cardCount = $cards.length;

      var finalWidth =
        (windowWidth - side * 2 - gap * (cardCount - 1)) / cardCount;

      var startWidth = Math.min(windowWidth * 0.25, 480);

      var startX = -startWidth / 2;

      $cards.each(function (index) {
        var $card = $(this);

        var stackOffset = index * Math.min(17, windowWidth * 0.009);

        var endX = side + index * (finalWidth + gap) - windowWidth / 2;

        var x = startX + stackOffset + (endX - startX - stackOffset) * progress;

        var width = startWidth + (finalWidth - startWidth) * progress;

        var rotate = (index - 2) * 0.7 * (1 - progress);

        $card.css({
          width: width + "px",
          zIndex: cardCount - index,
          transform: "translate(" + x + "px, -50%) rotate(" + rotate + "deg)",
        });
      });
    }

    $(window).on("scroll resize", render);

    render();
  });

  // rs ecommerce platforms effect end

  // rs key features animation start
  jQuery(function ($) {
    var $section = $(".rs-key-features");

    if (!$section.length) {
      return;
    }

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var timeline = gsap.timeline({
      scrollTrigger: {
        trigger: $section.get(0),
        start: "top 72%",
        once: true,
      },
    });

    timeline
      .from($section.find(".rs-label").get(), {
        y: 22,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
      })
      .from(
        $section.find(".rs-title").get(),
        {
          y: 42,
          opacity: 0,
          duration: 0.75,
          ease: "power4.out",
        },
        "-=0.25",
      )
      .from(
        $section.find(".rs-description").get(),
        {
          y: 28,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        $section.find(".rs-image-frame").get(),
        {
          clipPath: "polygon(4% 0, 96% 0, 90% 100%, 10% 100%)",
          duration: 1.05,
          ease: "power4.inOut",
        },
        "-=0.55",
      )
      .from(
        $section.find(".rs-image-frame img").get(),
        {
          scale: 1.18,
          duration: 1.1,
          ease: "power3.out",
        },
        "<",
      )
      .from(
        $section.find(".rs-feature-item").get(),
        {
          x: 45,
          opacity: 0,
          duration: 0.55,
          stagger: 0.065,
          ease: "power3.out",
        },
        "-=0.65",
      );
  });

  $section.find(".rs-gd-intro__reveal").each(function (paragraphIndex) {
    var paragraph = this;
    var words = jQuery(paragraph).text().trim().split(/\s+/);

    var accentWords = [
      "RedSpider",
      "professional",
      "identity.",
      "creative",
      "impressive",
      "startup",
      "goals.",
      "print",
      "digital",
      "creativity",
      "innovation",
      "passion",
      "ecommerce",
      "solutions",
      "email",
      "marketing",
      "launching",
      "promoting",
      "connected",
    ];

    paragraph.innerHTML = words
      .map(function (word) {
        var cleanWord = word.replace(/[^a-zA-Z]/g, "");

        var isAccent = accentWords.some(function (accent) {
          return (
            cleanWord.toLowerCase() ===
            accent.replace(/[^a-zA-Z]/g, "").toLowerCase()
          );
        });

        return (
          '<span class="rs-gd-intro__word' +
          (isAccent ? " rs-gd-intro__word--accent" : "") +
          '">' +
          word +
          "</span>"
        );
      })
      .join(" ");

    var wordElements = paragraph.querySelectorAll(".rs-gd-intro__word");

    gsap.fromTo(
      wordElements,
      {
        opacity: 0.08,
        y: 26,
        filter: "blur(7px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.025,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraph,
          start: "top 84%",
          end: "bottom 55%",
          scrub: 1,
        },
      },
    );
  });

  var copy = $section.find(".rs-gd-intro__copy")[0];
  var shape = $section.find(".rs-gd-intro__shape")[0];

  if (copy) {
    gsap.fromTo(
      copy,
      {
        scale: 0.95,
      },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "center 55%",
          scrub: 1,
        },
      },
    );
  }

  if (shape) {
    gsap.to(shape, {
      rotation: 385,
      y: -18,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
});

ScrollTrigger.refresh();

// rs gd intro animation end

// rs vertical cards animation start
function initRsVerticalCardsAnimations() {
  if (
    typeof jQuery === "undefined" ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  )
    return;

  gsap.registerPlugin(ScrollTrigger);

  jQuery(".rs-vertical-cards").each(function () {
    var section = this;

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    jQuery(section)
      .find(".rs-vertical-cards__card")
      .each(function (index) {
        var card = this;

        var speed = parseFloat(card.getAttribute("data-scroll-speed")) || 1;

        gsap.fromTo(
          card,
          {
            y: function () {
              return window.innerWidth < 768 ? 90 : 150;
            },
          },
          {
            y: function () {
              var distance = window.innerHeight + card.offsetHeight + 630;

              var mobileFactor = window.innerWidth < 768 ? 0.78 : 1;

              return -(distance * speed * mobileFactor);
            },

            ease: "none",

            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",

      onUpdate: function (self) {
        gsap.to(jQuery(section).find(".rs-vertical-cards__word"), {
          opacity: 0.34 + self.progress * 0.66,
          duration: 0.18,
          overwrite: true,
        });
      },
    });
  });

  var resizeTimer;

  jQuery(window).on("resize.rsVerticalCards", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      ScrollTrigger.refresh();
    }, 180);
  });
}

// rs vertical cards animation end

// creative section
function initCreativeSection() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".rsu-scene", {
    scrollTrigger: {
      trigger: ".rsu-creative-sec",
      start: "top 72%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    scale: 0.88,
    rotateX: 10,
    rotateY: -8,
    y: 90,
    duration: 1.25,
    ease: "power4.out",
  });

  gsap.from(".rsu-main-title", {
    scrollTrigger: {
      trigger: ".rsu-creative-sec",
      start: "top 65%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    y: 80,
    skewY: 4,
    duration: 1,
    delay: 0.15,
    ease: "power4.out",
  });

  gsap.from(".rsu-bottom-left", {
    scrollTrigger: {
      trigger: ".rsu-creative-sec",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    x: -70,
    duration: 0.95,
    delay: 0.35,
    ease: "power3.out",
  });

  gsap.from(".rsu-accordion-wrap", {
    scrollTrigger: {
      trigger: ".rsu-creative-sec",
      start: "top 58%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    x: 80,
    duration: 1,
    delay: 0.45,
    ease: "power3.out",
  });

  gsap.from(".rsu-accordion-item", {
    scrollTrigger: {
      trigger: ".rsu-accordion-wrap",
      start: "top 84%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    y: 25,
    stagger: 0.08,
    duration: 0.65,
    ease: "power3.out",
  });

  gsap.to(".rsu-btn i", {
    x: 4,
    y: -4,
    repeat: -1,
    yoyo: true,
    duration: 0.75,
    ease: "power1.inOut",
  });
}

// creative section end

function initSpecialImageChange() {
  var rsItems = document.querySelectorAll(".rs-special-item");

  var rsPreviewImage = document.getElementById("rsPreviewImage");

  var rsImageBox = document.getElementById("rsImageBox");

  if (!rsItems.length || !rsPreviewImage || !rsImageBox) return;

  function changeSpecialImage(item) {
    var newImage = item.getAttribute("data-img");

    if (!newImage) return;

    if (rsPreviewImage.getAttribute("src") === newImage) {
      return;
    }

    rsItems.forEach(function (btn) {
      btn.classList.remove("active");
    });

    item.classList.add("active");

    rsImageBox.classList.add("rs-changing");

    setTimeout(function () {
      rsPreviewImage.setAttribute("src", newImage);

      rsImageBox.classList.remove("rs-changing");
    }, 220);
  }

  rsItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth > 991) {
        changeSpecialImage(item);
      }
    });

    item.addEventListener("click", function () {
      changeSpecialImage(item);
    });
  });
}

function updateRsStudioSymbols() {
  $(".rs-studio-btn").each(function () {
    var isOpen = $(this).attr("aria-expanded") === "true";

    $(this)
      .find(".rs-studio-symbol")
      .text(isOpen ? "−" : "+");
  });
}

function setRsStudioImage(index) {
  var $images = $(".rs-studio-img");

  if (!isFinite(index) || index < 0 || index >= $images.length) return;

  $images.removeClass("active");

  $images.eq(index).addClass("active");
}

function initRsStudioAccordion() {
  var $accordion = $("#rsStudioAccordion");

  if (!$accordion.length) return;

  $accordion.off(".rsStudio");

  $accordion.on("click.rsStudio", ".rs-studio-btn", function () {
    var imgIndex = parseInt($(this).attr("data-img"), 10);

    setRsStudioImage(imgIndex);
  });

  $accordion.on(
    "shown.bs.collapse.rsStudio hidden.bs.collapse.rsStudio",
    function () {
      updateRsStudioSymbols();

      var $shownPanel = $accordion.find(".accordion-collapse.show");

      if ($shownPanel.length) {
        var imgIndex = parseInt(
          $shownPanel
            .closest(".accordion-item")
            .find(".rs-studio-btn")
            .attr("data-img"),
          10,
        );

        setRsStudioImage(imgIndex);
      }
    },
  );

  updateRsStudioSymbols();

  var $firstShown = $accordion.find(".accordion-collapse.show");

  if ($firstShown.length) {
    var firstImgIndex = parseInt(
      $firstShown
        .closest(".rs-studio-item")
        .find(".rs-studio-btn")
        .attr("data-img"),
      10,
    );

    setRsStudioImage(firstImgIndex);
  }
}

// circle js

function initAgencyCircleText() {
  var $circle = $("#rsAgencyCircleText");

  if (!$circle.length) return;

  $circle.empty();

  var text = "Years of Design Experience  ";

  var chars = text.split("");

  var radius = 62;

  $.each(chars, function (index, char) {
    $("<span>")
      .text(char)
      .css(
        "transform",
        "rotate(" +
          index * (360 / chars.length) +
          "deg) translate(" +
          radius +
          "px)",
      )
      .appendTo($circle);
  });
}

// rs ecommerce platforms effect start

jQuery(function ($) {
  var $section = $(".rs-ecommerce-platforms");

  if (!$section.length) return;

  var $cards = $section.find(".card");

  function clamp(number, min, max) {
    min = typeof min !== "undefined" ? min : 0;

    max = typeof max !== "undefined" ? max : 1;

    return Math.min(max, Math.max(min, number));
  }

  function ease(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function render() {
    var windowWidth = $(window).width();

    var windowHeight = $(window).height();

    if (windowWidth <= 760) {
      $cards.css({
        width: "",
        zIndex: "",
        transform: "",
      });

      return;
    }

    var sectionElement = $section.get(0);

    var rect = sectionElement.getBoundingClientRect();

    var distance = sectionElement.offsetHeight - windowHeight;

    if (distance <= 0) return;

    var progress = ease(clamp(-rect.top / distance));

    var gap = Math.max(10, windowWidth * 0.0105);

    var side = Math.max(16, windowWidth * 0.0165);

    var cardCount = $cards.length;

    var finalWidth =
      (windowWidth - side * 2 - gap * (cardCount - 1)) / cardCount;

    var startWidth = Math.min(windowWidth * 0.25, 480);

    var startX = -startWidth / 2;

    $cards.each(function (index) {
      var $card = $(this);

      var stackOffset = index * Math.min(17, windowWidth * 0.009);

      var endX = side + index * (finalWidth + gap) - windowWidth / 2;

      var x = startX + stackOffset + (endX - startX - stackOffset) * progress;

      var width = startWidth + (finalWidth - startWidth) * progress;

      var rotate = (index - 2) * 0.7 * (1 - progress);

      $card.css({
        width: width + "px",

        zIndex: cardCount - index,

        transform: "translate(" + x + "px, -50%) rotate(" + rotate + "deg)",
      });
    });
  }

  $(window).on("scroll resize", render);

  render();
});

// rs ecommerce platforms effect end

// rs key features animation start

jQuery(function ($) {
  var $section = $(".rs-key-features");

  if (!$section.length) {
    return;
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var timeline = gsap.timeline({
    scrollTrigger: {
      trigger: $section.get(0),
      start: "top 72%",
      once: true,
    },
  });

  timeline
    .from($section.find(".rs-label").get(), {
      y: 22,
      opacity: 0,
      duration: 0.55,
      ease: "power3.out",
    })
    .from(
      $section.find(".rs-title").get(),
      {
        y: 42,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=0.25",
    )
    .from(
      $section.find(".rs-description").get(),
      {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      $section.find(".rs-image-frame").get(),
      {
        clipPath: "polygon(4% 0, 96% 0, 90% 100%, 10% 100%)",
        duration: 1.05,
        ease: "power4.inOut",
      },
      "-=0.55",
    )
    .from(
      $section.find(".rs-image-frame img").get(),
      {
        scale: 1.18,
        duration: 1.1,
        ease: "power3.out",
      },
      "<",
    )
    .from(
      $section.find(".rs-feature-item").get(),
      {
        x: 45,
        opacity: 0,
        duration: 0.55,
        stagger: 0.065,
        ease: "power3.out",
      },
      "-=0.65",
    );
});

// rs key features animation end

// rs title effects animation start

jQuery(function ($) {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  gsap.registerPlugin(ScrollTrigger);

  function safeText(value) {
    return $("<div>").text(value).html();
  }

  function makeWords($title) {
    var title = $title.attr("data-title") || "";

    $title.attr("aria-label", title);

    var words = title.trim().split(/\s+/);

    var html = $.map(words, function (word) {
      return (
        '<span class="rs-word-mask" aria-hidden="true"><span class="rs-word">' +
        safeText(word) +
        "</span></span>"
      );
    }).join("");

    $title.html(html);
  }

  function makeLetters($title) {
    var title = $title.attr("data-title") || "";

    $title.attr("aria-label", title);

    var html = "";

    $.each(Array.from(title), function (_, character) {
      html +=
        character === " "
          ? '<span aria-hidden="true">&nbsp;</span>'
          : '<span class="rs-char" aria-hidden="true">' +
            safeText(character) +
            "</span>";
    });

    $title.html(html);
  }

  function addTrigger(animation, element) {
    ScrollTrigger.create({
      trigger: element,
      start: "top 84%",
      once: true,

      onEnter: function () {
        animation.play();
      },
    });
  }

  $(".rs-title-rotate-up").each(function () {
    var $title = $(this);

    makeWords($title);

    var animation = gsap.from($title.find(".rs-word").get(), {
      yPercent: 115,
      rotationX: -85,
      opacity: 0,
      transformOrigin: "50% 100%",
      duration: 0.9,
      stagger: 0.075,
      ease: "power4.out",
      paused: true,
    });

    addTrigger(animation, this);
  });

  $(".rs-title-word-rise").each(function () {
    var $title = $(this);

    makeWords($title);

    var words = $title.find(".rs-word").get();

    gsap.set(words, {
      yPercent: function (index) {
        return index % 2 ? -120 : 120;
      },

      opacity: 0,
    });

    var animation = gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.065,
      ease: "expo.out",
      paused: true,
    });

    addTrigger(animation, this);
  });

  $(".rs-title-skew-reveal").each(function () {
    var $title = $(this);

    var title = $title.attr("data-title") || "";

    $title
      .attr("aria-label", title)
      .html(
        '<span class="rs-title-text" aria-hidden="true">' +
          safeText(title) +
          '</span><span class="rs-reveal-bar" aria-hidden="true"></span>',
      );

    var $text = $title.find(".rs-title-text");

    var $bar = $title.find(".rs-reveal-bar");

    gsap.set($text, {
      y: 50,
      skewY: 7,
      opacity: 0,
    });

    var animation = gsap
      .timeline({
        paused: true,
      })
      .to($bar.get(0), {
        scaleX: 1,
        duration: 0.55,
        ease: "power3.inOut",
      })
      .set($bar.get(0), {
        transformOrigin: "right",
      })
      .to(
        $text.get(0),
        {
          y: 0,
          skewY: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
        },
        "-=.1",
      )
      .to(
        $bar.get(0),
        {
          scaleX: 0,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=.7",
      );

    addTrigger(animation, this);
  });

  $(".rs-title-letter-flip").each(function () {
    var $title = $(this);

    makeLetters($title);

    var animation = gsap.from($title.find(".rs-char").get(), {
      rotationX: -100,
      y: 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.025,
      ease: "back.out(1.5)",
      paused: true,
    });

    addTrigger(animation, this);
  });

  $(".rs-title-line-slide").each(function () {
    var $title = $(this);

    var lines = ($title.attr("data-lines") || "").split("|");

    $title.attr("aria-label", lines.join(" "));

    $title.html(
      $.map(lines, function (line) {
        return (
          '<span class="rs-line-mask" aria-hidden="true"><span class="rs-line-inner">' +
          safeText(line) +
          "</span></span>"
        );
      }).join(""),
    );

    var animation = gsap.from($title.find(".rs-line-inner").get(), {
      xPercent: -105,
      rotation: -2,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      paused: true,
    });

    addTrigger(animation, this);
  });

  ScrollTrigger.refresh();
});
