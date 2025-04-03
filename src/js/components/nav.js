import { loadCourses } from "./galleryCore.js";
import { displayMessage, getEnrolledCourses, getSessionStoredFilters } from "../utils.js";

export function highlightActiveNavLink() {
  const links = document.querySelectorAll(".nav-link");
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

export function showMyCourses() {
  const enrolled = getEnrolledCourses();

  if (enrolled.length === 0) {
    displayMessage(
      "gallery",
      "p",
      "message info",
      "You haven`t enrolled to any course yet."
    );

    document.querySelector(".pagination-container").innerHTML = "";
  } else {
    const filters = getSessionStoredFilters();

    filters.general = "my-courses" ;
    sessionStorage.setItem("filters", JSON.stringify(filters));

    loadCourses();
  }
  }
}

export function makeSubMenuClickableOnMobile() {
  document.querySelector(".submenubtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".submenu-content")?.classList.toggle("show");
  });
}
