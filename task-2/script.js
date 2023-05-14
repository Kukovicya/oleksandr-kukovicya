document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-grid img");
  const count = images.length;
  const currentDate = new Date().toLocaleString("ru-RU");

  const counter = document.createElement("div");
  counter.innerHTML = `Количество изображений: ${count} | ${currentDate}`;
  document.body.insertBefore(counter, document.body.firstChild);

  const imageItems = document.querySelectorAll(".image-grid .image-item");
  const popup = document.querySelector(".popup");
  const popupImage = document.querySelector(".popup-image");
  const popupOverlay = document.querySelector(".popup-overlay");
  const closeButton = document.querySelector(".close-button");
  const restoreButton = document.querySelector(".restore-button");
  const deletedImagesKey = "deletedImages";
  let deletedImages = [];

  // модальне вікно
  function handleImageClick(event) {
    const clickedImageSrc = event.target.src;
    const imageItem = event.currentTarget;
    const index = Array.from(imageItems).indexOf(imageItem);
    popupImage.src = clickedImageSrc;
    popup.classList.add("active");
    popupImage.dataset.index = index;
  }

  function handleCloseClick() {
    popup.classList.remove("active");
  }

  // закриття модалки
  function handleOverlayClick() {
    popup.classList.remove("active");
  }

  // кнопка видалення
  function handleDeleteClick(event) {
    const imageItem = event.currentTarget.parentNode;
    const deletedImageSrc = imageItem.querySelector("img").src;
    const index = Array.from(imageItems).indexOf(imageItem);
    imageItem.style.display = "none";
    deletedImages.push(deletedImageSrc);
    localStorage.setItem(deletedImagesKey, JSON.stringify(deletedImages));
  }

  // кнопка відновлення
  function handleRestoreClick() {
    deletedImages.forEach(function (deletedImageSrc) {
      const imageItem = Array.from(imageItems).find(function (item) {
        return item.querySelector("img").src === deletedImageSrc;
      });
      if (imageItem) {
        imageItem.style.display = "block";
      }
    });
    deletedImages = [];
    localStorage.removeItem(deletedImagesKey);
  }
  imageItems.forEach(function (imageItem) {
    const image = imageItem.querySelector("img");
    const deleteButton = imageItem.querySelector(".delete-button");
    image.addEventListener("click", handleImageClick);
    deleteButton.addEventListener("click", handleDeleteClick);
  });

  closeButton.addEventListener("click", handleCloseClick);
  popupOverlay.addEventListener("click", handleOverlayClick);
  restoreButton.addEventListener("click", handleRestoreClick);

  // Перевірка локалсторедж
  if (localStorage.getItem(deletedImagesKey)) {
    deletedImages = JSON.parse(localStorage.getItem(deletedImagesKey));
    deletedImages.forEach(function (deletedImageSrc) {
      const imageItem = Array.from(imageItems).find(function (item) {
        return item.querySelector("img").src === deletedImageSrc;
      });
      if (imageItem) {
        imageItem.style.display = "none";
      }
    });
  }
});
