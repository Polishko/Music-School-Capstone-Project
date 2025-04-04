/**
 * Functions for handling the Home page image slider navigation.
 * Includes forward/backward controls and dot-based selection.
 */

/**
 * Initializes the image slider and defines the showSlides logic.
 * Hides all slides and removes the "active" class from all dots.
 * Displays the current slide, highlights the active dot, and updates the caption.
 * Returns an object with navigation methods for external use.
 * 
 * @returns - An object with `next`, `prev`, and `goTo` functions for controlling the slider
 */

export function initSlider(): {
  next: () => void;
  prev: () => void;
  goTo: (n: number) => void;
} {
  let slideIndex = 1;
  showSlides(slideIndex);

  function showSlides(n: number): void {
    const slides = document.getElementsByClassName(
      "slides"
    ) as HTMLCollectionOf<HTMLDivElement> | null;
    const dots = document.getElementsByClassName(
      "demo"
    ) as HTMLCollectionOf<HTMLImageElement> | null;
    const captionText = document.getElementById(
      "caption"
    ) as HTMLParagraphElement | null;

    if (slides) {
      if (n > slides.length) {
        slideIndex = 1;
      }

      if (n < 1) {
        slideIndex = slides.length;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      if (dots) {
        for (let i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";

        if (captionText) {
          captionText.innerHTML = dots[slideIndex - 1].alt;
        }
      }
    }
  }

  return {
    next: () => showSlides(++slideIndex),
    prev: () => showSlides(--slideIndex),
    goTo: (n: number) => showSlides((slideIndex = n)),
  };
}
