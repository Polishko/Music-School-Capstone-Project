import {
  displayMessage,
  enrollInCourse,
  filterCourses,
  disableCourseEnroll,
  getEnrolledCourses,
  getSessionStoredFilters,
  searchCourses,
  sortCourses,
  toggleDetailsParagraph,
} from "../utils.js";

export function loadCourses() {
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
    .then((data) => {
      if (data.length) {
        const filters = getSessionStoredFilters();
        const { sort, ...filterCriteria } = filters;

        let processedData = [...data];

        if (sort) {
          processedData = sortCourses(processedData, sort);
        }

        const hasFilters = Object.keys(filterCriteria).length > 0;
        if (hasFilters) {
          processedData = filterCourses(processedData, filterCriteria);
        }

        const searchTerm = document
          .getElementById("searchInput")
          ?.value.trim()
          .toLowerCase();
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
          toggleDetailsParagraph();
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

function renderCourseCards(data, currentPage = 1, itemsPerPage = 8) {
  const gallery = document.querySelector(".gallery");
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
              d.parentElement.style.display = "none";
            }
          });
        } else {
          allDetails.forEach((d) => {
            d.parentElement.style.display = "block";
          });
        }
      });
    }

    const article = document.createElement("article");
    article.className = "card";
    article.id = course.id;

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

    const enrollButton = article.querySelector(".enroll-button");
    enrollButton.addEventListener("click", () => {
      enrollInCourse(course.id);
      disableCourseEnroll(course.id);
    });

    const topicDiv = article.querySelector(".topic-wrapper");
    if (course.topics.length) {
      topicDiv.append(ul);
    } else {
      const fallbackMessage = document.createElement("p");
      fallbackMessage.className = "message info";
      fallbackMessage.textContent = "No topics listed.";
      topicDiv.append(fallbackMessage);
    }

    gallery.append(article);

    const enrolled = getEnrolledCourses();
    if (enrolled.includes(course.id)) {
      disableCourseEnroll(course.id);
    }
  }
}

function renderPaginationData(data, totalPages, currentPage, itemsPerPage) {
  const container = document.querySelector(".pagination-container");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerHTML = i;
    button.className = i === currentPage ? "active" : "";
    button.addEventListener("click", () => {
      renderCourseCards(data, i, itemsPerPage);
      renderPaginationData(data, totalPages, i, itemsPerPage);
    });

    container.append(button);
  }
}
