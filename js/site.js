(function () {
  const CONTACT_EMAIL = "hello@alexsoftwareservices.com";
  const THEME_KEY = "alexdev-theme";

  /* —— Theme —— */
  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      const isLight = theme === "light";
      btn.setAttribute("aria-pressed", String(isLight));
      btn.title = isLight ? "Switch to dark mode" : "Switch to light mode";
      const label = btn.querySelector(".theme-toggle-label");
      if (label) label.textContent = isLight ? "Dark" : "Light";
    });
  }

  function initTheme() {
    const stored = getStoredTheme();
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    applyTheme(theme);

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });
  }

  /* —— Email modal —— */
  function initEmailModal() {
    const modal = document.getElementById("email-modal");
    if (!modal) return;

    const emailEl = modal.querySelector(".modal-email");
    const copyBtn = modal.querySelector(".modal-copy");
    const closeBtns = modal.querySelectorAll("[data-close-modal]");

    if (emailEl) emailEl.textContent = CONTACT_EMAIL;

    function openModal() {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (copyBtn) {
        copyBtn.textContent = "Copy to clipboard";
        copyBtn.classList.remove("is-copied");
      }
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-email-modal]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

    closeBtns.forEach((el) => el.addEventListener("click", closeModal));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(CONTACT_EMAIL);
          copyBtn.textContent = "Copied!";
          copyBtn.classList.add("is-copied");
          setTimeout(() => {
            copyBtn.textContent = "Copy to clipboard";
            copyBtn.classList.remove("is-copied");
          }, 2200);
        } catch {
          copyBtn.textContent = "Select & copy";
        }
      });
    }
  }

  /* —— Scroll reveal —— */
  function initReveal() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal");
    if (!items.length || prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* —— Header scroll state —— */
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  initTheme();
  initEmailModal();
  initReveal();
  initHeader();
})();
