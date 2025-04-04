import { plusSlides, currentSlide } from "./components/slider.js";
import { highlightActiveNavLink } from "./components/nav.js";
document.addEventListener("DOMContentLoaded", () => {
    const next = document.querySelector(".next");
    next === null || next === void 0 ? void 0 : next.addEventListener("click", () => plusSlides(1));
    const prev = document.querySelector(".prev");
    prev === null || prev === void 0 ? void 0 : prev.addEventListener("click", () => plusSlides(-1));
    const images = document.querySelectorAll(".demo");
    if (images.length) {
        images.forEach((dot, idx) => {
            dot.addEventListener("click", () => currentSlide(idx + 1));
        });
    }
    highlightActiveNavLink();
});
