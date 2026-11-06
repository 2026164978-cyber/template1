document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
  // Prevent placeholder links from jumping to the top of the page.
  document.querySelectorAll(".placeholder-link").forEach(link => {
    link.addEventListener("click", event => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
        alert("Replace this placeholder with the correct Google Drive sharing link before publishing.");
      }
    });
  });
});