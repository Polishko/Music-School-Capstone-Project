import { initSlider } from "./components/slider.js";
import { highlightActiveNavLink } from "./components/nav.js";

/**
 * Entry point for the Home page.
  */

 /** 
 * - Initializes the image slider and assigns event listeners for:
 *    - Next/previous slide navigation
 *    - Dot-based navigation for direct slide selection
 * - Highlights the active navigation link based on the current page URL.
 */

document.addEventListener("DOMContentLoaded", (): void => {
  const slider = initSlider();

  document.querySelector(".prev")?.addEventListener("click", slider.prev);
  document.querySelector(".next")?.addEventListener("click", slider.next);

  const images = document.querySelectorAll(
    ".demo"
  ) as NodeListOf<HTMLImageElement>;

  if (images.length) {
    images.forEach((dot, idx) => {
      dot.addEventListener("click", () => slider.goTo(idx + 1));
    });
  }

  highlightActiveNavLink();
});
