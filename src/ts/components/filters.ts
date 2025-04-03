import {
    applyFilter,
    applySort,
    clearSessionStorage,
    resetFilterInputs,
    resetSortSelection,
  } from "../utils.js";
  import { loadCourses } from "./galleryCore.js";
  
  export function applyFilterEvents(): void {
    const instrumentSelect = document.getElementById("instrumentFilter") as HTMLSelectElement | null;

    instrumentSelect?.addEventListener("change", (e: Event) => {
      instrumentSelect.classList.add("filter-active");
      applyFilter("instrument", e);
      loadCourses();
    });
  
    const levelRadios = document.querySelectorAll('input[name="level"]') as NodeListOf<HTMLInputElement>;
    levelRadios.forEach((radio) => {
      radio.addEventListener("change", (e: Event) => {
        radio.classList.add("filter-active");
        applyFilter("level", e);
        loadCourses();
      });
    });
  
    const search = document.getElementById("searchInput") as HTMLInputElement | null
    search?.addEventListener("input", () => {
      loadCourses();
    });
  }
  
  export function applySortingEvents(): void {
    const dataSort = document.getElementById("sortOptions");
    dataSort?.addEventListener("change", (e: Event) => {
      applySort(e);
      loadCourses();
    });
  }
  
  export function applyFilterSortResetEvent(): void {
    const resetButton = document.getElementById("reset-filters") as HTMLButtonElement | null;
    resetButton?.addEventListener("click", () => {
      resetFilterInputs();
      resetSortSelection();
      clearSessionStorage();
      loadCourses();
    });
  }
  