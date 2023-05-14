document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-grid img");
  const count = images.length;
  const currentDate = new Date().toLocaleString("ru-RU");

  const counter = document.createElement("div");
  counter.innerHTML = `Количество изображений: ${count} | ${currentDate}`;
  document.body.insertBefore(counter, document.body.firstChild);

  const imageItems = document.querySelectorAll(".image-grid .image-item img");
  const popup = document.querySelector(".popup");
  const popupImage = document.querySelector(".popup-image");
  const popupOverlay = document.querySelector(".popup-overlay");
  const closeButton = document.querySelector(".close-button");

  // Обработчик клика на изображение
  function handleImageClick(event) {
    const clickedImageSrc = event.target.src;
    popupImage.src = clickedImageSrc;
    popup.classList.add("active");
  }

  // Обработчик клика на кнопку закрытия
  function handleCloseClick() {
    popup.classList.remove("active");
  }

  // Обработчик клика на оверлей
  function handleOverlayClick() {
    popup.classList.remove("active");
  }

  // Назначаем обработчики событий для изображений, кнопки закрытия и оверлея
  imageItems.forEach(function (image) {
    image.addEventListener("click", handleImageClick);
  });

  closeButton.addEventListener("click", handleCloseClick);
  popupOverlay.addEventListener("click", handleOverlayClick);
});
