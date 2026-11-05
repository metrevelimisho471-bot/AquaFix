
/* ==========================================================
   AquaFix – plumbing website scripts
   ----------------------------------------------------------
   HOW TO CUSTOMIZE
   1. Edit CONFIG   -> business name, phone, email, address, hours
   2. Edit SERVICES -> the service cards, price list and contact dropdown
   3. Edit PROJECTS -> the project gallery
   Everything else works automatically.
   ========================================================== */

/* ---------- 1. BUSINESS SETTINGS ---------- */
const CONFIG = {
  phone: "+1 (555) 000-0000",
  email: "hello@aquafix.example",
  address: "123 Main Street, Your City",
  hours: "Mon–Sat 8:00–19:00 · Emergency 24/7",
  // Paste a Formspree / similar URL here to receive real form submissions.
  // Example: "https://formspree.io/f/yourFormId". Leave empty for demo mode.
  formEndpoint: ""
};

/* ---------- 2. SERVICES (cards + price list + dropdown) ---------- */
const SERVICES = [
  { icon: "🔧", title: "Leak Repair",
    short: "Fast detection and repair of leaking pipes, faucets and fittings.",
    long: "We locate and fix leaks in pipes, faucets, mixers and joints before they become water damage.",
    price: "From $79" },
  { icon: "🚽", title: "Drain Cleaning",
    short: "Clogged sinks, toilets and main sewer lines cleared fast.",
    long: "Professional equipment clears kitchen, bathroom and main sewer clogs without damaging your pipes.",
    price: "From $99" },
  { icon: "🚿", title: "Fixture Installation",
    short: "Sinks, showers, tubs, toilets and faucets installed or replaced.",
    long: "Clean, leak-free installation of bathroom and kitchen fixtures, including old fixture removal.",
    price: "From $119" },
  { icon: "🔥", title: "Water Heaters",
    short: "Tank and tankless heater installation, repair and maintenance.",
    long: "Installation, replacement and servicing of electric and gas water heaters, with safety checks.",
    price: "From $149" },
  { icon: "🏗️", title: "Pipe Installation",
    short: "New water and drain lines, or full repiping with durable materials.",
    long: "New lines for renovations and additions, or complete repiping of older homes.",
    price: "From $15 / ft" },
  { icon: "🧺", title: "Appliance Hookup",
    short: "Washing machines and dishwashers connected safely.",
    long: "Water and drain connections for washers, dishwashers and other appliances.",
    price: "From $69" }
];

/* ---------- 3. PROJECTS (gallery on projects.html) ----------
   cat: home | commercial | emergency
   grad: g1 | g2 | g3 | g4 (gradient placeholders – see style.css)
   To use a real photo, replace the icon with an <img> in renderProjects(). */
const PROJECTS = [
  { cat: "home", grad: "g1", icon: "🚿", title: "Full Bathroom Remodel",
    meta: "Residential · 3 days",
    desc: "Complete plumbing rough-in, shower and toilet installation in a city apartment." },
  { cat: "home", grad: "g2", icon: "🔥", title: "Water Heater Replacement",
    meta: "Residential · 1 day",
    desc: "Old tank removed, new heater installed with a safety relief valve and expansion tank." },
  { cat: "commercial", grad: "g4", icon: "🏢", title: "Office Plumbing Setup",
    meta: "Commercial · 5 days",
    desc: "New water and drain system for a small office with six plumbing fixtures." },
  { cat: "emergency", grad: "g3", icon: "🚨", title: "Burst Pipe at Night",
    meta: "Emergency · 2 hours",
    desc: "A main line burst at 11 PM. Our crew arrived in 45 minutes and fixed it the same night." },
  { cat: "commercial", grad: "g1", icon: "🍽️", title: "Restaurant Drain Line",
    meta: "Commercial · 1 day",
    desc: "Kitchen drain cleared and a grease trap installed to prevent repeat clogs." },
  { cat: "home", grad: "g2", icon: "🏠", title: "Whole-House Repipe",
    meta: "Residential · 6 days",
    desc: "Two-story house repiped with new copper lines and fresh shut-off valves." }
];

/* ---------- HELPERS ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* ==========================================================
   RENDER FUNCTIONS – build page content from the data above
   ========================================================== */

// Home page: service cards
function renderServiceCards() {
  const box = $("#serviceCards");
  if (!box) return;
  box.innerHTML = SERVICES.map(s => `
    <article class="card">
      <div class="card__icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.short}</p>
      <a class="card__link" href="services.html">Learn more →</a>
    </article>`).join("");
}

// Services page: price list rows
function renderServiceRows() {
  const box = $("#serviceRows");
  if (!box) return;
  box.innerHTML = SERVICES.map(s => `
    <div class="service-row">
      <div class="card__icon">${s.icon}</div>
      <div><h3>${s.title}</h3><p>${s.long}</p></div>
      <div>
        <div class="price">${s.price}</div>
        <a class="card__link" href="contact.html?service=${encodeURIComponent(s.title)}">Book now →</a>
      </div>
    </div>`).join("");
}

// Contact page: dropdown options
function renderServiceOptions() {
  const select = $("#serviceSelect");
  if (!select) return;
  const options = SERVICES.map(s => s.title).concat("Emergency Call-Out");
  select.innerHTML =
    `<option value="">Select a service</option>` +
    options.map(name => `<option>${name}</option>`).join("");
}

// Projects page: gallery tiles
function renderProjects() {
  const box = $("#gallery");
  if (!box) return;
  box.innerHTML = PROJECTS.map((p, i) => `
    <button class="tile" data-cat="${p.cat}" data-index="${i}">
      <div class="tile__img ${p.grad}">${p.icon}</div>
      <div class="tile__body"><strong>${p.title}</strong><br><small>${p.meta}</small></div>
    </button>`).join("");
}

// Fill phone / email / address / hours everywhere from CONFIG
function applyConfig() {
  $$("[data-phone]").forEach(el => {
    el.href = "tel:" + CONFIG.phone.replace(/[^\d+]/g, "");
    el.textContent = el.dataset.phone === "button" ? "Call now" : CONFIG.phone;
  });
  $$("[data-email]").forEach(el => {
    el.href = "mailto:" + CONFIG.email;
    el.textContent = CONFIG.email;
  });
  $$("[data-address]").forEach(el => (el.textContent = CONFIG.address));
  $$("[data-hours]").forEach(el => (el.textContent = CONFIG.hours));
  $$(".js-year").forEach(el => (el.textContent = new Date().getFullYear()));
}

/* ==========================================================
   INTERACTIVE FEATURES
   ========================================================== */

// Mobile menu (burger button)
function initMobileMenu() {
  const burger = $("#burger");
  const nav = $("#nav");
  if (!burger || !nav) return;
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
}

// Header shadow after scrolling + back-to-top button
function initScrollEffects() {
  const header = $(".header");
  const toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.textContent = "↑";
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(toTop);

  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
    toTop.classList.toggle("is-visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Fade-in animation when elements enter the screen
function initRevealOnScroll() {
  const targets = $$(".card, .steps li, .member, .service-row, .tile, .review, .faq details, .form, .trust li, .timeline li");
  targets.forEach(el => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => observer.observe(el));
}

// Animated number counters (data-count="2400")
function initCounters() {
  const counters = $$("[data-count]");
  if (!counters.length) return;

  const animate = el => {
    const target = Number(el.dataset.count);
    const startTime = performance.now();
    const duration = 1500;
    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) { counters.forEach(animate); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => observer.observe(el));
}

// Testimonials slider (auto-plays every 5.5 seconds)
function initSlider() {
  const track = $("#sliderTrack");
  if (!track) return;
  const slides = $$(".review", track);
  const dotsBox = $("#dots");
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to review ${i + 1}`);
    dot.addEventListener("click", () => { goTo(i); restart(); });
    dotsBox.appendChild(dot);
  });
  const dots = $$(".dot", dotsBox);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, n) => dot.classList.toggle("is-active", n === index));
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 5500);
  }

  $("#prev").addEventListener("click", () => { goTo(index - 1); restart(); });
  $("#next").addEventListener("click", () => { goTo(index + 1); restart(); });
  goTo(0);
  restart();
}

// FAQ accordion: only one answer open at a time
function initFaq() {
  const items = $$(".faq details");
  items.forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) items.forEach(other => { if (other !== item) other.open = false; });
    });
  });
}

// Projects page: category filter + details popup
function initProjects() {
  const tiles = $$(".tile");
  if (!tiles.length) return;

  // Filter buttons
  const chips = $$(".chip");
  chips.forEach(chip => chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const filter = chip.dataset.filter;
    tiles.forEach(tile => tile.classList.toggle("is-hidden", filter !== "all" && tile.dataset.cat !== filter));
  }));

  // Popup (modal)
  const modal = $("#modal");
  if (!modal) return;
  const closeModal = () => modal.classList.remove("is-open");

  tiles.forEach(tile => tile.addEventListener("click", () => {
    const project = PROJECTS[Number(tile.dataset.index)];
    $("#modalImg").className = "tile__img " + project.grad;
    $("#modalImg").textContent = project.icon;
    $("#modalTitle").textContent = project.title;
    $("#modalDesc").textContent = project.desc;
    modal.classList.add("is-open");
  }));
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
}

// Contact form: validation + submit
function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  // Validation rules – return true if valid, otherwise an error message
  const rules = {
    name: v => v.trim().length >= 2 || "Please enter your name (at least 2 characters).",
    phone: v => /^[+\d][\d\s()-]{6,}$/.test(v.trim()) || "Please enter a valid phone number.",
    service: v => v !== "" || "Please choose a service."
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const valid = result === true;
    field.classList.toggle("invalid", !valid);
    const message = field.parentElement.querySelector(".error");
    if (message) message.textContent = valid ? "" : result;
    return valid;
  }

  $$("input, select", form).forEach(field => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });

  // Pre-select the service when arriving from "Book now" (?service=...)
  const preselected = new URLSearchParams(location.search).get("service");
  if (preselected) $("#serviceSelect").value = preselected;

  const success = $("#formSuccess");
  const failure = $("#formError");
  const button = $("button[type=submit]", form);

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const allValid = $$("input[name], select[name]", form).map(validateField).every(Boolean);
    if (!allValid) return;

    const data = Object.fromEntries(new FormData(form));
    button.disabled = true;
    button.textContent = "Sending…";
    failure.hidden = true;

    try {
      if (CONFIG.formEndpoint) {
        const response = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Request failed");
      } else {
        console.log("Demo mode – form data:", data); // no endpoint set yet
      }
      success.hidden = false;
      form.reset();
      setTimeout(() => (success.hidden = true), 7000);
    } catch (error) {
      failure.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = "Send Request";
    }
  });
}

/* ==========================================================
   START – render content first, then switch on the features
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderServiceCards();
  renderServiceRows();
  renderServiceOptions();
  renderProjects();
  applyConfig();

  initMobileMenu();
  initScrollEffects();
  initRevealOnScroll();
  initCounters();
  initSlider();
  initFaq();
  initProjects();
  initContactForm();
});