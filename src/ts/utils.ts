/**
 * Utility functions for DOM updates, storage access, filtering, sorting, searching, and toggling.
 * Used across multiple pages (gallery, home, contact).
 */

import {
  Course,
  EnrolledCourses,
  FilterKey,
  Filters,
  SortCriteria,
} from "./types.js";

/**
 * Displays a message inside a specified container by injecting a new element.
 *
 * @param container - The class name of the container element where the message will be inserted
 * @param element - The tag name of the message element to create
 * @param className - Optional class name(s) to apply to the message element
 * @param message - The text content to display inside the message element
 */

export function displayMessage(
  container: string,
  element: string,
  className: string = "",
  message: string
): void {
  const target = document.querySelector(`.${container}`);

  if (target) {
    target.innerHTML = `<${element} class="${className}">${message}</${element}>`;
  }
}

/**
 * Retrieves the list of locally stored user-enrolled course IDs from local storage
 * 
 * @returns - An array of enrolled course IDs (or empty array)
 */

export function getEnrolledCourses(): EnrolledCourses {
  return JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
}

/**
 * Adds a course ID to the list of enrolled courses in local storage.
 * Prevents duplicates by checking if the course is already enrolled.
 * 
 * @param courseId - The id of the course the user enrolls to
 */

export function enrollInCourse(courseId: number): void {
  const enrolled = getEnrolledCourses();

  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
  }
}

/**
 * Filters a list of course data based on applied filter criteria
 * 
 * @param data - The full array of course objects to filter
 * @param filters - The filtering criteria, including general options like "my-courses", instrument, and level
 * @returns - An array of filtered courses matching the filter criteria
 */

export function filterCourses(data: Course[], filters: Filters): Course[] {
  let filteredData = data;
  const enrolled = getEnrolledCourses();

  for (const [filter, value] of Object.entries(filters)) {
    if (filter === "general" && value === "my-courses") {
      filteredData = filteredData.filter((course) =>
        enrolled.includes(course.id)
      );
    } else if (filter === "instrument" && value) {
      filteredData = filteredData.filter((course) =>
        course.instrument.includes(value)
      );
    } else if (filter === "level" && value) {
      filteredData = filteredData.filter((course) => course.level === value);
    }
  }

  return filteredData;
}

/**
 * Sorts an array of course objects based on the selected sort criteria
 * 
 * @param data - The array of course objects to sort
 * @param sortCriteria - The sorting criteria (e.g., 'title-asc', 'instructor-asc', or 'level-asc')
 * @returns - A new array of sorted course objects sorted acording to the specified sorting criteria
 */

export function sortCourses(
  data: Course[],
  sortCriteria: SortCriteria
): Course[] {
  const dataCopy = [...data];

  if (sortCriteria === "title-asc") {
    return dataCopy.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortCriteria === "instructor-asc") {
    return dataCopy.sort((a, b) => a.instructor.localeCompare(b.instructor));
  } else if (sortCriteria === "level-asc") {
    return dataCopy.sort((a, b) => a.level.localeCompare(b.level));
  }

  return dataCopy;
}

/**
 * Disables the enroll button of a course with the given ID.
 * Changes the button label to Enrolled! and disables further clicks.
 * 
 * @param id - The id of the course
 */

export function disableCourseEnroll(id: number): void {
  const courseElement = document.getElementById(
    id.toString()
  ) as HTMLElement | null;

  if (!courseElement) return;

  const btn = courseElement.querySelector<HTMLButtonElement>(".enroll-button");

  if (!btn) return;

  btn.textContent = "Enrolled!";
  btn.disabled = true;
}

/**
 * Removes all applied filters and search input fields to their default values.
 */

export function resetFilterInputs(): void {
  const instrumentSelect = document.getElementById(
    "instrumentFilter"
  ) as HTMLSelectElement | null;

  if (!instrumentSelect) return;

  instrumentSelect.value = "";

  const levelRadios = document.querySelectorAll<HTMLInputElement>(
    'input[name="level"]'
  );

  if (!levelRadios) return;
  levelRadios.forEach((radio) => {
    radio.checked = radio.value === "";
  });

  const searchBar = document.getElementById(
    "searchInput"
  ) as HTMLInputElement | null;

  if (!searchBar) return;
  searchBar.value = "";
}

/**
 * Resets the selected sorting option to its default.
 */

export function resetSortSelection(): void {
  const dataSort = document.getElementById(
    "sortOptions"
  ) as HTMLSelectElement | null;

  if (!dataSort) return;

  dataSort.value = "";
}

/**
 * Retrieves the filters object stored in session storage (if present).
 * 
 * @returns - An object containing the applied filters (or an empty object if none)
 */

export function getSessionStoredFilters(): Filters {
  const stored = sessionStorage.getItem("filters");

  return stored ? JSON.parse(stored) : {};
}

/**
 *  Removes the stored filters object from session storage.
 */
export function clearSessionStorage(): void {
  sessionStorage.removeItem("filters");
}

/**
 * Updates the filters object in session storage with a new filter selection.
 * Retrieves existing filters, adds the new filter key-value pair, and saves the updated object.
 *
 * @param filter - The selected filter criteria (e.g., 'level', 'instrument', etc.)
 * @param e - The event triggered with filter input
 */

export function applyFilter(filter: FilterKey, e: Event): void {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  const filters = getSessionStoredFilters();

  filters[filter] = target.value;
  sessionStorage.setItem("filters", JSON.stringify(filters));
}

/**
 * Updates the filters object in session storage with a new sorting selection.
 * Retrieves existing filters, sets the sort key to the selected value, and saves the updated object. 
 * 
 * @param e - The event triggered with sort input
 */

export function applySort(e: Event): void {
  const target = e.target as HTMLSelectElement;
  const filters = getSessionStoredFilters();

  filters.sort = target.value;
  sessionStorage.setItem("filters", JSON.stringify(filters));
}

/**
 * Filters a list of course objects based on a search keyword.
 * Matches the keyword against the course title, description, or level (case-insensitive).
 * 
 * @param courses - An array of course objects to search through 
 * @param term - The search input provided by the user
 * @returns - An array of courses that match the search keyword 
 */

export function searchCourses(courses: Course[], term: string): Course[] {
  const lowerTerm = term.toLowerCase();

  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerTerm) ||
      course.description.toLowerCase().includes(lowerTerm) ||
      course.level.toLowerCase().includes(lowerTerm)
  );
}

/**
 * Enables toggling of the <details> elements by clicking anywhere inside the container.
 * Allows users to close an open course detail by clicking outside the <summary> element.
 */

export function toggleDetailsParagraph(): void {
  const allDetails = document.querySelectorAll("details") as NodeListOf<HTMLDetailsElement>;

  allDetails.forEach((detail) => {
    detail.addEventListener("click", (e: Event) => {
      const clickedElement = e.target as HTMLElement;

      if (!clickedElement.closest("summary")) {
        detail.open = !detail.open;
        e.preventDefault();
      }
    });
  });
}

/**
 * Creates a new HTML element, assigns classes, adds content, and appends element to a target container.
 *
 * @param container - The class name of the parent container where the new element will be appended
 * @param tag - The HTML tag to create
 * @param classes - A single class name or an array of class names to add to the element
 * @param innerHtml - Optional HTML content to insert into the created element
 * @returns The created HTMLElement, or void if the container was not found
 */

export function createHtmlItem(
  container: string,
  tag: keyof HTMLElementTagNameMap,
  classes: string[] | string,
  innerHtml = ""
): HTMLElement | void {
  const target = document.querySelector(`.${container}`) as HTMLElement | null;

  if (!target) {
    console.warn(`Container ".${container}" not found.`);
    return;
  }

  const element = document.createElement(tag);

  if (typeof classes === "string") {
    element.classList.add(classes);
  } else if (Array.isArray(classes)) {
    classes.forEach((cl) => element.classList.add(cl));
  }

  element.innerHTML = innerHtml;
  target.append(element);

  return element;
}
