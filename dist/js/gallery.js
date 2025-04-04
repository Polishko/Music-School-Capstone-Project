import { applyFilterEvents, applyFilterSortResetEvent, applySortingEvents, } from "./components/filters.js";
import { loadCourses } from "./components/galleryCore.js";
import { highlightActiveNavLink, makeSubMenuClickableOnMobile, showMyCourses, } from "./components/nav.js";
import { clearSessionStorage, resetFilterInputs, } from "./utils.js";
document.addEventListener("DOMContentLoaded", () => {
    highlightActiveNavLink();
    makeSubMenuClickableOnMobile();
    applyFilterEvents();
    applySortingEvents();
    applyFilterSortResetEvent();
    const allCourses = document.querySelector(".all-courses");
    allCourses === null || allCourses === void 0 ? void 0 : allCourses.addEventListener("click", (e) => {
        e.preventDefault();
        clearSessionStorage();
        resetFilterInputs();
        window.location.hash = "#all-courses";
        loadCourses();
    });
    const myCourses = document.querySelector(".my-courses");
    myCourses === null || myCourses === void 0 ? void 0 : myCourses.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "#my-courses";
        showMyCourses();
    });
    if (window.location.hash === "#my-courses") {
        showMyCourses();
    }
    else {
        loadCourses();
    }
});
