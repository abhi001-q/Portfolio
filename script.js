/* ===================================================================
   Abhishek Goswami Portfolio — Main Script
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ── Active Nav ──
  const currentPage = document.body.dataset.page;
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      (currentPage === "home" && href === "index.html") ||
      (currentPage === "about" && href === "about.html") ||
      (currentPage === "works" && href === "works.html") ||
      (currentPage === "contact" && href === "contact.html")
    ) {
      link.classList.add("active");
    }
  });

  // ── Sticky Header ──
  const header = document.getElementById("header");
  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ── Mobile Nav ──
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.style.overflow = mainNav.classList.contains("open")
      ? "hidden"
      : "";
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }
  overlay.addEventListener("click", toggleMenu);

  // Close mobile nav on link click
  mainNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("open")) toggleMenu();
    });
  });

  // ── Smooth Page Transitions ──
  document.querySelectorAll(".nav-transition").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (
        !href ||
        href === "#" ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      // Don't transition to same page
      const currentHref =
        window.location.pathname.split("/").pop() || "index.html";
      if (href === currentHref) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      document.body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });

  // ── GSAP Scroll Animations ──
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const animItems = document.querySelectorAll(".animate-item");
    animItems.forEach((item) => {
      const delay = parseFloat(item.dataset.delay) || 0;

      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  } else {
    // Fallback: show everything if GSAP is unavailable
    document.querySelectorAll(".animate-item").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

  // ── Portfolio Filter (works on dynamically rendered items) ──
  const filterBtns = document.querySelectorAll(".filter-btns-one li");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("current"));
        btn.classList.add("current");

        const filter = btn.dataset.filter;
        const items = document.querySelectorAll(".projects-grid .project-item");

        items.forEach((item) => {
          const categories = (item.dataset.category || "").split(" ");
          if (filter === "all" || categories.includes(filter)) {
            item.classList.remove("hidden");
            if (typeof gsap !== "undefined") {
              gsap.fromTo(
                item,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
              );
            } else {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });
  }

  // ── Testimonials Slider ──
  const slider = document.getElementById("testimonialsSlider");
  if (slider) {
    const track = slider.querySelector(".testimonials-track");
    const items = slider.querySelectorAll(".testimonial-item");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    let current = 0;
    const total = items.length;

    const goTo = (index) => {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
    };

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    // Auto-play every 5s
    let autoPlay = setInterval(() => goTo(current + 1), 5000);
    slider.addEventListener("mouseenter", () => clearInterval(autoPlay));
    slider.addEventListener("mouseleave", () => {
      autoPlay = setInterval(() => goTo(current + 1), 5000);
    });
  }

  // ── Back to Top ──
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 400) {
          backBtn.classList.add("visible");
        } else {
          backBtn.classList.remove("visible");
        }
      },
      { passive: true },
    );

    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── Contact Form ──
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Message Sent! <i class="ri-check-line"></i>';
      btn.style.background = "#22c55e";
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ── Iframe Fallback Handler ──
  document.querySelectorAll(".project-preview iframe").forEach((iframe) => {
    // Timeout fallback: if iframe doesn't load in 8s, show fallback
    const timer = setTimeout(() => {
      iframe.closest(".project-preview").classList.add("iframe-error");
    }, 8000);

    iframe.addEventListener("load", () => clearTimeout(timer));
    iframe.addEventListener("error", () => {
      clearTimeout(timer);
      iframe.closest(".project-preview").classList.add("iframe-error");
    });
  });

  // ── Pricing Currency Toggle ──
  const currencyToggle = document.getElementById("currencyToggle");
  if (currencyToggle) {
    const inrLabel = document.querySelector('[data-currency="inr"]');
    const usdLabel = document.querySelector('[data-currency="usd"]');
    let isUSD = false;

    function formatNumber(num, currency) {
      if (currency === "inr") {
        return num.toLocaleString("en-IN");
      }
      return num.toLocaleString("en-US");
    }

    function updatePrices() {
      document.querySelectorAll(".price[data-inr]").forEach((el) => {
        const symbol = el.querySelector(".currency-symbol");
        const value = el.querySelector(".price-value");
        if (isUSD) {
          symbol.textContent = "$";
          value.textContent = formatNumber(parseInt(el.dataset.usd), "usd");
        } else {
          symbol.textContent = "₹";
          value.textContent = formatNumber(parseInt(el.dataset.inr), "inr");
        }
      });
    }

    currencyToggle.addEventListener("click", () => {
      isUSD = !isUSD;
      currencyToggle.classList.toggle("active", isUSD);
      inrLabel.classList.toggle("active", !isUSD);
      usdLabel.classList.toggle("active", isUSD);
      updatePrices();
    });

    inrLabel.addEventListener("click", () => {
      if (isUSD) {
        isUSD = false;
        currencyToggle.classList.remove("active");
        inrLabel.classList.add("active");
        usdLabel.classList.remove("active");
        updatePrices();
      }
    });

    usdLabel.addEventListener("click", () => {
      if (!isUSD) {
        isUSD = true;
        currencyToggle.classList.add("active");
        usdLabel.classList.add("active");
        inrLabel.classList.remove("active");
        updatePrices();
      }
    });
  }

  // ── Force Download CV ──
  const downloadBtn = document.getElementById("downloadCV");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const fileUrl = downloadBtn.getAttribute("href");
      const fileName = downloadBtn.getAttribute("download") || "Resume.png";
      fetch(fileUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        });
    });
  }
});
