import {
    applyFilter,
    applySort,
    clearSessionStorage,
    resetFilterInputs,
    resetSortSelection,
  } from "../utils.js";
  import { loadCourses } from "./galleryCore.js";

/**
 * Registers UI event listeners for filtering, sorting, and resetting course data.
 * Triggers a reload of the course list on user interaction.
 */

/**
 * Attaches event listeners for course filtering options:
 * - Instrument dropdown
 * - Level radio buttons
 * - Search input field
 *
 * Triggers course reload on each change.
 */
  
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

  /**
 * Attaches an event listener to the sort <select> element.
 * On change, applies the selected sorting option and reloads course data.
 */
  
  export function applySortingEvents(): void {
    const dataSort = document.getElementById("sortOptions");
    dataSort?.addEventListener("change", (e: Event) => {
      applySort(e);
      loadCourses();
    });
  }

/**
 * Attaches an event listener to the "Reset" button. 🔧
 * On click, clears all filters, sorting, and session-stored state,
 * then reloads the course list.
 */

  export function applyFilterSortResetEvent(): void {
    const resetButton = document.getElementById("reset-filters") as HTMLButtonElement | null;
    resetButton?.addEventListener("click", () => {
      resetFilterInputs();
      resetSortSelection();
      clearSessionStorage();
      loadCourses();
    });
  }
  
