import {
  displayMessage,
  enrollInCourse,
  filterCourses,
  disableCourseEnroll,
  getEnrolledCourses,
  getSessionStoredFilters,
  searchCourses,
  sortCourses,
} from "../utils.js";

import { Course, Filters } from "../types.js";

export function loadCourses(): void {
  fetch("data/courses.json")
    .then((response) => {
      if (!response.ok) {
        displayMessage(
          "gallery",
          "p",
          "message error",
          "Sorry, we couldn`t load the courses. Please try again later."
        );
        throw new Error(`Fetch failed: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data: Course[]) => {
      if (data.length) {
        let processedData = [...data];

        const filters: Filters = getSessionStoredFilters();
        const { sort, ...filterCriteria } = filters;

        if (
          sort === "title-asc" ||
          sort === "instructor-asc" ||
          sort === "level-asc"
        ) {
          processedData = sortCourses(processedData, sort);
        }

        const hasFilters = Object.keys(filterCriteria).length > 0;
        if (hasFilters) {
          processedData = filterCourses(processedData, filterCriteria);
        }

        const inputElement = document.getElementById(
          "searchInput"
        ) as HTMLInputElement | null;

        const searchTerm = inputElement?.value.trim().toLowerCase();
        if (searchTerm) {
          processedData = searchCourses(processedData, searchTerm);
        }

        const itemsPerPage = 8;
        const totalPages = Math.ceil(processedData.length / itemsPerPage);
        const currentPage = 1;

        if (!processedData.length) {
          displayMessage("gallery", "p", "message info", "No courses found.");
        } else {
          renderCourseCards(processedData, currentPage, itemsPerPage);
          renderPaginationData(
            processedData,
            totalPages,
            currentPage,
            itemsPerPage
          );
        }
      } else {
        displayMessage(
          "gallery",
          "p",
          "message info",
          "No courses available yet."
        );
      }
    })
    .catch((error) => {
      console.error("Error loading course:", error);
      displayMessage(
        "gallery",
        "p",
        "message error",
        "Oops! Something went wrong while loading the courses."
      );
    });
}

function renderCourseCards(
  data: Course[],
  currentPage = 1,
  itemsPerPage = 8
): void {
  const gallery = document.querySelector(".gallery") as HTMLElement | null;
  if (!gallery) return;

  gallery.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);

  for (const course of pageData) {
    const ul = document.createElement("ul");
    ul.className = "course-topics";

    for (let i = 0; i < course.topics.length; i++) {
      const topic = course.topics[i];
      const li = document.createElement("li");

      const details = document.createElement("details");
      const summary = document.createElement("summary");
      const paragraph = document.createElement("p");

      summary.textContent = topic.title;
      paragraph.textContent = topic.content;

      details.append(summary, paragraph);
      li.append(details);
      ul.append(li);

      details.addEventListener("toggle", () => {
        const allDetails = ul.querySelectorAll("details");
        if (details.open) {
          allDetails.forEach((d) => {
            if (d !== details) {
              const parent = d.parentElement as HTMLLIElement | null;

              if (parent) {
                parent.style.display = "none";
              }
            }
          });
        } else {
          allDetails.forEach((d) => {
            const parent = d.parentElement as HTMLLIElement | null;

            if (parent) {
              parent.style.display = "block";
            }
          });
        }
      });
    }

    const article = document.createElement("article");
    article.className = "card";
    article.id = course.id.toString();

    article.innerHTML = `
              <h3 class="card-title text-center">
              🎶 ${course.title}
              </h3>
              <h4 class="instrument">
               ${course.instrument}
              </h4>
  
              <ul class="extra-details">
                <li class="instructor">
                    <strong>Instructor:</strong> ${course.instructor}
                </li>
                <li class="level"><strong>Level:</strong> ${course.level}</li>
              </ul>
      
              <div class="card-meta">
              <div class="topic-wrapper">
                  <p class="topics-title">Course topics:</p>
              </div>
              </div>
         
              <div class="card-content">
              <img
                  class="card-image"
                  src="./images/lessons/${course.image}"
                  alt="${course.image.replace(".jpg", "")}"
              />
      
              <p class="card-text">
                  ${course.description}
              </p>
              </div>
      
              <div class="card-video-button-wrapper">
              <div class="card-video">
                  <h6 class="video-title">Lesson preview</h6>
                  <div class="no-video">
                  🎥 Coming soon — enroll to get notified!
                  </div>
              </div>
      
              <button class="enroll-button">Enroll</button>
              </div>
              `;

    const enrollButton = article.querySelector(
      ".enroll-button"
    ) as HTMLButtonElement | null;
    if (enrollButton) {
      enrollButton.addEventListener("click", () => {
        enrollInCourse(course.id);
        disableCourseEnroll(course.id);
      });
    }

    const topicDiv = article.querySelector(
      ".topic-wrapper"
    ) as HTMLDivElement | null;

    if (topicDiv) {
      if (course.topics.length) {
        topicDiv.append(ul);
      } else {
        const fallbackMessage = document.createElement("p");
        fallbackMessage.className = "message info";
        fallbackMessage.textContent = "No topics listed.";
        topicDiv.append(fallbackMessage);
      }
    }

    gallery.append(article);

    const enrolled = getEnrolledCourses();
    if (enrolled.includes(course.id)) {
      disableCourseEnroll(course.id);
    }
  }
}

function renderPaginationData(
  data: Course[],
  totalPages: number,
  currentPage: number,
  itemsPerPage: number
): void {
  const container = document.querySelector(
    ".pagination-container"
  ) as HTMLDivElement | null;

  if (container) {
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerHTML = i.toString();
      button.className = i === currentPage ? "active" : "";
      button.addEventListener("click", () => {
        renderCourseCards(data, i, itemsPerPage);
        renderPaginationData(data, totalPages, i, itemsPerPage);
      });

      container.append(button);
    }
  }
}
