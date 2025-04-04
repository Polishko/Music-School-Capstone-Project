/**
 * Functions that handle navigation-related functionality for the site header menu.
 */

import { loadCourses } from "./galleryCore.js";
import {
  displayMessage,
  getEnrolledCourses,
  getSessionStoredFilters,
} from "../utils.js";

/**
 * Highlights the active navigation link based on the current page URL.
 * Adds the "active" class to the matching link and removes it from all others.
 */

export function highlightActiveNavLink(): void {
  const links = document.querySelectorAll(
    ".nav-link"
  ) as NodeListOf<HTMLAnchorElement>;
  const currentPage = window.location.pathname;

  links.forEach((link) => {
    const linkPage = new URL(link.href).pathname;
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Displays the user's enrolled courses in the gallery view.
 * If no courses are enrolled, displays a fallback message and clears pagination.
 * Otherwise, applies a "my-courses" filter and reloads the course list.
 */

export function showMyCourses(): void {
  const enrolled = getEnrolledCourses();

  if (enrolled.length === 0) {
    displayMessage(
      "gallery",
      "p",
      "message info",
      "You haven`t enrolled to any course yet."
    );

    const paginationContainer = document.querySelector(
      ".pagination-container"
    ) as HTMLDivElement | null;

    if (paginationContainer) {
      paginationContainer.innerHTML = "";
    }
  } else {
    const filters = getSessionStoredFilters();

    if (filters.general !== "my-courses") {
      filters.general = "my-courses";
      sessionStorage.setItem("filters", JSON.stringify(filters));
      loadCourses();
    }
  }
}

/**
 * Enables submenu toggle behavior for mobile navigation.
 * Prevents default anchor behavior and toggles submenu visibility.
 */

export function makeSubMenuClickableOnMobile(): void {
  const subMenuBtn = document.querySelector(
    ".submenubtn"
  ) as HTMLAnchorElement | null;
  const subContent = document.querySelector(
    ".submenu-content"
  ) as HTMLUListElement | null;

  subMenuBtn?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    subContent?.classList.toggle("show");
  });
}
