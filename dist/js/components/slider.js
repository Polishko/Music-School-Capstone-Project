let slideIndex = 1;
showSlides(slideIndex);
export function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}
export function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}
function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");
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
