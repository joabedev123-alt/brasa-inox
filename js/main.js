(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopNav = window.matchMedia("(min-width: 1080px)");

  document.querySelectorAll("[data-wa]").forEach((link) => {
    const key = link.getAttribute("data-wa");
    if (key === "principal") {
      link.href = BRASA.primaryUrl;
      return;
    }
    if (BRASA.messages[key]) {
      link.href = brasaWhatsapp(BRASA.messages[key]);
    }
  });

  const year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());

  const instagramSlot = document.querySelector("[data-instagram-slot]");
  if (instagramSlot && BRASA.instagram) {
    const instagramLink = instagramSlot.querySelector("a");
    if (instagramLink) {
      instagramLink.href = BRASA.instagram;
      instagramSlot.hidden = false;
    }
  }

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu-principal");
  const icon = toggle ? toggle.querySelector("i") : null;
  let menuOpen = false;

  function setBackgroundInert(on) {
    const main = document.querySelector("main");
    const footer = document.querySelector(".site-footer");
    const floatButton = document.querySelector(".float-wa");
    if (main) main.inert = on;
    if (footer) footer.inert = on;
    if (floatButton) floatButton.inert = on;
  }

  function setMenu(open) {
    if (!toggle || !menu || desktopNav.matches) return;
    menuOpen = open;
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);
    if (icon) icon.className = open ? "bi bi-x-lg" : "bi bi-list";
    setBackgroundInert(open);
    if (open) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => setMenu(!menuOpen));

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (desktopNav.matches) return;
        const target = document.querySelector(link.getAttribute("href"));
        setMenu(false);
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!menuOpen || desktopNav.matches) return;
      if (event.key === "Escape") {
        setMenu(false);
        toggle.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [toggle, ...menu.querySelectorAll("a")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    desktopNav.addEventListener("change", () => {
      if (desktopNav.matches && menuOpen) {
        menuOpen = false;
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        document.body.classList.remove("menu-open");
        if (icon) icon.className = "bi bi-list";
        setBackgroundInert(false);
      }
    });
  }

  const navLinks = [...document.querySelectorAll(".nav-link[data-section]")];
  const sections = navLinks
    .map((link) => document.getElementById(link.getAttribute("data-section")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const setCurrent = (id) => {
      navLinks.forEach((link) => {
        if (link.getAttribute("data-section") === id) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.25, 0.6] }
    );
    sections.forEach((section) => spy.observe(section));
  }

  const filters = document.querySelector("[data-filters]");
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  if (filters && galleryItems.length) {
    const counts = galleryItems.reduce((map, item) => {
      const category = item.getAttribute("data-category");
      map[category] = (map[category] || 0) + 1;
      return map;
    }, {});
    const buttons = [...filters.querySelectorAll("[data-filter]")];
    const filtersHaveItems = buttons.every((button) => {
      const filter = button.getAttribute("data-filter");
      return filter === "todos" || counts[filter] > 0;
    });
    if (filtersHaveItems && Object.keys(counts).length > 1) {
      filters.hidden = false;
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");
          buttons.forEach((item) => {
            item.setAttribute("aria-pressed", item === button ? "true" : "false");
          });
          galleryItems.forEach((item) => {
            const show = filter === "todos" || item.getAttribute("data-category") === filter;
            item.hidden = !show;
          });
        });
      });
    }
  }

  const dialog = document.getElementById("lightbox");
  if (dialog) {
    const lightboxImage = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = dialog.querySelector(".lightbox-close");
    const frame = dialog.querySelector(".lightbox-figure");
    let opener = null;

    document.querySelectorAll(".gallery-zoom").forEach((button) => {
      button.hidden = false;
      button.addEventListener("click", () => {
        const figure = button.closest("figure");
        const source = figure.querySelector("img");
        const caption = figure.querySelector("figcaption");
        opener = button;
        lightboxImage.src = source.currentSrc || source.src;
        lightboxImage.width = source.naturalWidth || source.width;
        lightboxImage.height = source.naturalHeight || source.height;
        lightboxImage.alt = source.getAttribute("alt") || "";
        lightboxCaption.textContent = caption ? caption.textContent : "";
        dialog.showModal();
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    frame.addEventListener("click", (event) => event.stopPropagation());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      lightboxImage.removeAttribute("src");
      if (opener) opener.focus();
    });
  }

  const form = document.getElementById("orcamento");
  if (form) {
    const status = document.getElementById("form-status");
    const fallback = document.getElementById("form-fallback");
    const fields = [
      { id: "nome", message: "Informe seu nome." },
      { id: "cidade", message: "Informe a cidade e a UF." },
      { id: "produto", message: "Selecione o produto de interesse." },
      { id: "mensagem", message: "Conte um pouco sobre o projeto." }
    ];

    const errorOf = (input) => document.getElementById(input.id + "-erro");

    const clearError = (input) => {
      const error = errorOf(input);
      input.removeAttribute("aria-invalid");
      if (error) {
        error.textContent = "";
        error.hidden = true;
      }
    };

    const showError = (input, message) => {
      const error = errorOf(input);
      input.setAttribute("aria-invalid", "true");
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
    };

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      input.addEventListener("input", () => clearError(input));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = {};
      let firstInvalid = null;

      fields.forEach((field) => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        if (!value) {
          showError(input, field.message);
          if (!firstInvalid) firstInvalid = input;
        } else {
          clearError(input);
          values[field.id] = value;
        }
      });

      if (firstInvalid) {
        status.textContent = "";
        fallback.hidden = true;
        firstInvalid.focus();
        return;
      }

      const url = brasaWhatsapp(brasaBudgetMessage(values));
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      if (popup) {
        status.textContent =
          "O WhatsApp foi aberto com os dados preenchidos. Nenhuma informação foi enviada por este site.";
        fallback.hidden = true;
      } else {
        status.textContent =
          "O navegador bloqueou a nova aba. Seus dados continuam neste formulário.";
        fallback.href = url;
        fallback.hidden = false;
        fallback.focus();
      }
    });
  }

  const floatButton = document.querySelector(".float-wa");
  const floatZones = [
    document.querySelector(".workshop-media"),
    document.getElementById("contato"),
    document.querySelector(".site-footer")
  ].filter(Boolean);
  const floatObstacles = () => [...document.querySelectorAll(".btn, video, .camaly-credit, .field input, .field select, .field textarea")];
  const updateFloat = () => {
    if (!floatButton) return;
    const coversZone = floatZones.some((zone) => {
      const rect = zone.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    const floatRect = floatButton.getBoundingClientRect();
    const coversControl = floatObstacles().some((element) => {
      if (element.closest(".float-wa")) return false;
      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return false;
      return rect.left < floatRect.right - 8 && rect.right > floatRect.left + 8 && rect.top < floatRect.bottom - 8 && rect.bottom > floatRect.top + 8;
    });
    floatButton.classList.toggle("is-hidden", coversZone || coversControl || Boolean(dialog && dialog.open));
  };
  if (floatButton) {
    updateFloat();
    window.addEventListener("scroll", updateFloat, { passive: true });
    window.addEventListener("resize", updateFloat);
    if (dialog) dialog.addEventListener("toggle", updateFloat);
    if ("IntersectionObserver" in window) {
      const floatObserver = new IntersectionObserver(updateFloat, { threshold: 0 });
      floatZones.forEach((zone) => floatObserver.observe(zone));
    }
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealNodes = [...document.querySelectorAll(".reveal")];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    revealNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (!alreadyVisible) revealObserver.observe(node);
    });
  }
})();
