import {
  Course,
  EnrolledCourses,
  FilterKey,
  Filters,
  SortCriteria,
} from "./types.js";

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

export function getEnrolledCourses(): EnrolledCourses {
  return JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
}

export function enrollInCourse(courseId: number): void {
  const enrolled = getEnrolledCourses();

  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
  }
}

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

export function resetSortSelection(): void {
  const dataSort = document.getElementById(
    "sortOptions"
  ) as HTMLSelectElement | null;

  if (!dataSort) return;

  dataSort.value = "";
}

export function getSessionStoredFilters(): Filters {
  const stored = sessionStorage.getItem("filters");

  return stored ? JSON.parse(stored) : {};
}

export function clearSessionStorage(): void {
  sessionStorage.removeItem("filters");
}

export function applyFilter(filter: FilterKey, e: Event): void {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  const filters = getSessionStoredFilters();

  filters[filter] = target.value;
  sessionStorage.setItem("filters", JSON.stringify(filters));
}

export function applySort(e: Event): void {
  const target = e.target as HTMLSelectElement;
  const filters = getSessionStoredFilters();

  filters.sort = target.value;
  sessionStorage.setItem("filters", JSON.stringify(filters));
}

export function searchCourses(courses: Course[], term: string): Course[] {
  const lowerTerm = term.toLowerCase();

  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerTerm) ||
      course.description.toLowerCase().includes(lowerTerm) ||
      course.level.toLowerCase().includes(lowerTerm)
  );
}

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
