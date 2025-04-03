let slideIndex = 1;
showSlides(slideIndex);

export function plusSlides(n: 1 | -1): void {
  slideIndex += n;
  showSlides(slideIndex);
}

export function currentSlide(n: number): void {
  slideIndex = n;
  showSlides(slideIndex);
}

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
