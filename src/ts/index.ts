import { plusSlides, currentSlide } from "./components/slider.js";
import { highlightActiveNavLink } from "./components/nav.js";

document.addEventListener("DOMContentLoaded", (): void => {
  const next = document.querySelector(".next") as HTMLAnchorElement | null;
  next?.addEventListener("click", () => plusSlides(1));

  const prev = document.querySelector(".prev") as HTMLAnchorElement | null;
  prev?.addEventListener("click", () => plusSlides(-1));

  const images = document.querySelectorAll(
    ".demo"
  ) as NodeListOf<HTMLImageElement>;

  if (images.length) {
    images.forEach((dot, idx) => {
      dot.addEventListener("click", () => currentSlide(idx + 1));
    });
  }

  highlightActiveNavLink();
});
