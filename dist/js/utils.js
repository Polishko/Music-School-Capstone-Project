export function displayMessage(container, element, className = "", message) {
    const target = document.querySelector(`.${container}`);
    if (target) {
        target.innerHTML = `<${element} class="${className}">${message}</${element}>`;
    }
}
export function getEnrolledCourses() {
    return JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
}
export function enrollInCourse(courseId) {
    const enrolled = getEnrolledCourses();
    if (!enrolled.includes(courseId)) {
        enrolled.push(courseId);
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
    }
}
export function filterCourses(data, filters) {
    let filteredData = data;
    const enrolled = getEnrolledCourses();
    for (const [filter, value] of Object.entries(filters)) {
        if (filter === "general" && value === "my-courses") {
            filteredData = filteredData.filter((course) => enrolled.includes(course.id));
        }
        else if (filter === "instrument" && value) {
            filteredData = filteredData.filter((course) => course.instrument.includes(value));
        }
        else if (filter === "level" && value) {
            filteredData = filteredData.filter((course) => course.level === value);
        }
    }
    return filteredData;
}
export function sortCourses(data, sortCriteria) {
    const dataCopy = [...data];
    if (sortCriteria === "title-asc") {
        return dataCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (sortCriteria === "instructor-asc") {
        return dataCopy.sort((a, b) => a.instructor.localeCompare(b.instructor));
    }
    else if (sortCriteria === "level-asc") {
        return dataCopy.sort((a, b) => a.level.localeCompare(b.level));
    }
    return dataCopy;
}
export function disableCourseEnroll(id) {
    const courseElement = document.getElementById(id.toString());
    if (!courseElement)
        return;
    const btn = courseElement.querySelector(".enroll-button");
    if (!btn)
        return;
    btn.textContent = "Enrolled!";
    btn.disabled = true;
}
export function resetFilterInputs() {
    const instrumentSelect = document.getElementById("instrumentFilter");
    if (!instrumentSelect)
        return;
    instrumentSelect.value = "";
    const levelRadios = document.querySelectorAll('input[name="level"]');
    if (!levelRadios)
        return;
    levelRadios.forEach((radio) => {
        radio.checked = radio.value === "";
    });
    const searchBar = document.getElementById("searchInput");
    if (!searchBar)
        return;
    searchBar.value = "";
}
export function resetSortSelection() {
    const dataSort = document.getElementById("sortOptions");
    if (!dataSort)
        return;
    dataSort.value = "";
}
export function getSessionStoredFilters() {
    const stored = sessionStorage.getItem("filters");
    return stored ? JSON.parse(stored) : {};
}
export function clearSessionStorage() {
    sessionStorage.removeItem("filters");
}
export function applyFilter(filter, e) {
    const target = e.target;
    const filters = getSessionStoredFilters();
    filters[filter] = target.value;
    sessionStorage.setItem("filters", JSON.stringify(filters));
}
export function applySort(e) {
    const target = e.target;
    const filters = getSessionStoredFilters();
    filters.sort = target.value;
    sessionStorage.setItem("filters", JSON.stringify(filters));
}
export function searchCourses(courses, term) {
    const lowerTerm = term.toLowerCase();
    return courses.filter((course) => course.title.toLowerCase().includes(lowerTerm) ||
        course.description.toLowerCase().includes(lowerTerm) ||
        course.level.toLowerCase().includes(lowerTerm));
}
export function createHtmlItem(container, tag, classes, innerHtml = "") {
    const target = document.querySelector(`.${container}`);
    if (!target) {
        console.warn(`Container ".${container}" not found.`);
        return;
    }
    const element = document.createElement(tag);
    if (typeof classes === "string") {
        element.classList.add(classes);
    }
    else if (Array.isArray(classes)) {
        classes.forEach((cl) => element.classList.add(cl));
    }
    element.innerHTML = innerHtml;
    target.append(element);
    return element;
}
export function toggleDetailsParagraph() {
    const allDetails = document.querySelectorAll("details");
    allDetails.forEach((detail) => {
        detail.addEventListener("click", (e) => {
            const clickedElement = e.target;
            if (!clickedElement.closest("summary")) {
                detail.open = !detail.open;
                e.preventDefault();
            }
        });
    });
}
