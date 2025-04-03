import { applyFilterEvents, applyFilterSortResetEvent, applySortingEvents } from "./components/filters.js";
import { loadCourses } from "./components/galleryCore.js";
import {
  highlightActiveNavLink,
  makeSubMenuClickableOnMobile,
  showMyCourses,
} from "./components/nav.js";
import { clearSessionStorage, resetFilterInputs } from "./utils.js";

document.addEventListener("DOMContentLoaded", (): void => {
  highlightActiveNavLink();
  makeSubMenuClickableOnMobile();
  applyFilterEvents();
  applySortingEvents();
  applyFilterSortResetEvent();

  const allCourses = document.querySelector(".all-courses") as HTMLAnchorElement | null;
  allCourses?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    clearSessionStorage();
    resetFilterInputs();
    window.location.hash = "#all-courses";
    loadCourses();
  });

  const myCourses = document.querySelector(".my-courses") as HTMLAnchorElement | null;
  myCourses?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    window.location.hash = "#my-courses";
    showMyCourses();
  });

  if (window.location.hash === "#my-courses") {
    showMyCourses();
  } else {
    loadCourses();
  }
});
