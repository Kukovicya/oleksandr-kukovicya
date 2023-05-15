document.addEventListener("DOMContentLoaded", function () {
  const countryInput = document.getElementById("country-input");
  const searchButton = document.getElementById("search-button");
  const resetButton = document.getElementById("reset-button");
  const resultsTable = document
    .getElementById("results-table")
    .querySelector("tbody");

  searchButton.addEventListener("click", function () {
    const country = countryInput.value.trim().toLowerCase();
    if (country === "") {
      alert("Пожалуйста, введите название страны.");
      return;
    }

    // Очищаем предыдущие результаты
    resultsTable.innerHTML = "";

    // Отправляем запрос к API
    fetch(`http://universities.hipolabs.com/search?country=${country}`)
      .then((response) => response.json())
      .then((data) => {
        // Проверяем, есть ли результаты
        if (data.length === 0) {
          alert("Не найдено университетов для данной страны.");
          return;
        }

        // Выводим результаты в таблицу
        data.forEach(function (university, index) {
          const row = document.createElement("tr");

          const indexCell = document.createElement("td");
          indexCell.textContent = index + 1;
          row.appendChild(indexCell);

          const nameCell = document.createElement("td");
          nameCell.textContent = university.name;
          row.appendChild(nameCell);

          const countryCell = document.createElement("td");
          countryCell.textContent = university.country;
          row.appendChild(countryCell);

          const websiteCell = document.createElement("td");
          const websiteLink = document.createElement("a");
          websiteLink.href = university.web_pages[0];
          websiteLink.textContent = university.web_pages[0];
          websiteCell.appendChild(websiteLink);
          row.appendChild(websiteCell);

          resultsTable.appendChild(row);
        });
      })
      .catch((error) => {
        alert("Произошла ошибка при выполнении запроса.");
        console.error(error);
      });
  });

  resetButton.addEventListener("click", function () {
    countryInput.value = "";
    resultsTable.innerHTML = "";
  });
});
