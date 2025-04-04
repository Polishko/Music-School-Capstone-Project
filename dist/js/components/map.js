export function injectMapWithLocation() {
    const mapContainer = document.querySelector(".map-container");
    if (mapContainer) {
        while (mapContainer.firstChild) {
            mapContainer.removeChild(mapContainer.firstChild);
        }
        mapContainer.innerHTML = `
      <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1027.2030259272663!2d23.33936863368491!3d42.69506923764464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8577c985b5ab%3A0x1316e7a047c48479!2sNational%20Music%20School%20Liubomir%20Pipkov!5e0!3m2!1sen!2sbg!4v1743534939223!5m2!1sen!2sbg"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
      ></iframe>`;
    }
}
