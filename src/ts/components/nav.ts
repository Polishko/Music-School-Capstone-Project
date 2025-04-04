import { loadCourses } from "./galleryCore.js";
import {
  displayMessage,
  getEnrolledCourses,
  getSessionStoredFilters,
} from "../utils.js";

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
