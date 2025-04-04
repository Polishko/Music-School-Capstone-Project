import { applyFilter, applySort, clearSessionStorage, resetFilterInputs, resetSortSelection, } from "../utils.js";
import { loadCourses } from "./galleryCore.js";
export function applyFilterEvents() {
    const instrumentSelect = document.getElementById("instrumentFilter");
    instrumentSelect === null || instrumentSelect === void 0 ? void 0 : instrumentSelect.addEventListener("change", (e) => {
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
    const search = document.getElementById("searchInput");
    search === null || search === void 0 ? void 0 : search.addEventListener("input", () => {
        loadCourses();
    });
}
export function applySortingEvents() {
    const dataSort = document.getElementById("sortOptions");
    dataSort === null || dataSort === void 0 ? void 0 : dataSort.addEventListener("change", (e) => {
        applySort(e);
        loadCourses();
    });
}
export function applyFilterSortResetEvent() {
    const resetButton = document.getElementById("reset-filters");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
        resetFilterInputs();
        resetSortSelection();
        clearSessionStorage();
        loadCourses();
    });
}
