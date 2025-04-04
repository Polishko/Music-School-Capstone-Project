import { injectMapWithLocation } from "./components/map.js";
import { highlightActiveNavLink } from "./components/nav.js";

/**
 * Entry point for the contact.html page.
 * 
 * - Injects the Google Map into the page once the DOM has loaded.
 * - Highlights the active navigation link based on the current URL.
 */

document.addEventListener("DOMContentLoaded", (): void => {
  injectMapWithLocation();
  highlightActiveNavLink();
});
