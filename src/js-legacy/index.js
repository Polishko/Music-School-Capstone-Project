import { initSlider } from "./components/slider.js";
import { highlightActiveNavLink } from "./components/nav.js";

document.addEventListener("DOMContentLoaded", () => {
  const slider = initSlider();

  document.querySelector(".prev")?.addEventListener("click", slider.prev);
  document.querySelector(".next")?.addEventListener("click", slider.next);

  const images = document.querySelectorAll(".demo");

  if (images.length) {
    images.forEach((dot, idx) => {
      dot.addEventListener("click", () => slider.goTo(idx + 1));
    });
  }

  highlightActiveNavLink();
});
