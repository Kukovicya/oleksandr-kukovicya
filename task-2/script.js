const images = document.querySelectorAll(".image-grid img");
const count = images.length;
const currentDate = new Date().toLocaleString("ru-RU");

const counter = document.createElement("div");
counter.innerHTML = `Количество изображений: ${count} | ${currentDate}`;
document.body.insertBefore(counter, document.body.firstChild);
