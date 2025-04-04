import { injectMapWithLocation } from "./components/map.js";
import { highlightActiveNavLink } from "./components/nav.js";
document.addEventListener("DOMContentLoaded", () => {
    injectMapWithLocation();
    highlightActiveNavLink();
});
