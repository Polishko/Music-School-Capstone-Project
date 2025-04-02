import {
  applyFilter,
  applySort,
  clearSessionStorage,
  resetFilterInputs,
  resetSortSelection,
} from "../utils.js";
import { loadCourses } from "./galleryCore.js";

export function applyFilterEvents() {
  const instrumentSelect = document.getElementById("instrumentFilter");
  instrumentSelect?.addEventListener("change", (e) => {
    instrumentSelect.classList.add("filter-active");
    applyFilter("instrument", e);
    loadCourses();
  });

  const levelRadios = document.querySelectorAll('input[name="level"]');
  levelRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      radio.classList.add("filter-active");
      applyFilter("level", e);
      loadCourses();
    });
  });

  document.getElementById("searchInput")?.addEventListener("input", () => {
    loadCourses();
  });
}

export function applySortingEvents() {
  const dataSort = document.getElementById("sortOptions");
  dataSort?.addEventListener("change", (e) => {
    applySort("sort", e);
    loadCourses();
  });
}

export function applyFilterSortResetEvent() {
  const resetButton = document.getElementById("reset-filters");
  resetButton?.addEventListener("click", () => {
    resetFilterInputs();
    resetSortSelection();
    clearSessionStorage();
    loadCourses();
  });
}
