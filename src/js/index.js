import { plusSlides, currentSlide } from "./components/slider.js";
import { highlightActiveNavLink } from "./components/nav.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".next")
    ?.addEventListener("click", () => plusSlides(1));
  document
    .querySelector(".prev")
    ?.addEventListener("click", () => plusSlides(-1));
  document.querySelectorAll(".demo").forEach((dot, idx) => {
    dot.addEventListener("click", () => currentSlide(idx + 1));
  });

  highlightActiveNavLink();
});
