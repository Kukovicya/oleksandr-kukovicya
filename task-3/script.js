$(document).ready(function () {
  if (localStorage.getItem("universities")) {
    $("#search-results").html(localStorage.getItem("universities"));
    restoreCheckboxState();
    updateCheckboxCount();
  }

  $("#search-form").submit(function (event) {
    event.preventDefault();
    var country = $("#country-input").val();

    $.getJSON(
      "http://universities.hipolabs.com/search?country=" + country,
      function (data) {
        var table = $("<table></table>");
        var headerRow = $(
          "<tr><th>#</th><th>Name</th><th>Website</th><th>Country</th><th>Save</th></tr>"
        );
        table.append(headerRow);

        $.each(data, function (index, university) {
          var row = $("<tr></tr>");
          row.append("<td>" + (index + 1) + "</td>");
          row.append("<td>" + university.name + "</td>");
          row.append(
            '<td><a href="' +
              university.web_pages[0] +
              '">' +
              university.web_pages[0] +
              "</a></td>"
          );
          row.append("<td>" + university.country + "</td>");
          row.append('<td><input type="checkbox" class="save-checkbox"></td>');
          table.append(row);
        });

        $("#search-results").html(table);
        restoreCheckboxState();
        updateCheckboxCount();
        localStorage.setItem("universities", table.html());
      }
    );
  });

  $("#reset-button").click(function () {
    $("#country-input").val("");
    $("#search-results").empty();
    resetCheckboxState();
    updateCheckboxCount();
    localStorage.clear();
  });

  $(document).on("change", ".save-checkbox", function () {
    saveCheckboxState();
    updateCheckboxCount();
  });

  function restoreCheckboxState() {
    $(".save-checkbox").each(function (index) {
      var checkboxId = "checkbox-" + index;
      var checkboxState = localStorage.getItem(checkboxId);
      if (checkboxState === "checked") {
        $(this).prop("checked", true);
      } else {
        $(this).prop("checked", false);
      }
      $(this).attr("id", checkboxId);
    });
  }

  function saveCheckboxState() {
    $(".save-checkbox").each(function (index) {
      var checkboxId = "checkbox-" + index;
      var checkboxState = $(this).prop("checked") ? "checked" : "unchecked";
      localStorage.setItem(checkboxId, checkboxState);
      $(this).attr("id", checkboxId);
    });
  }

  function resetCheckboxState() {
    $(".save-checkbox").prop("checked", false);
    $(".save-checkbox").each(function (index) {
      var checkboxId = "checkbox-" + index;
      localStorage.removeItem(checkboxId);
      $(this).attr("id", checkboxId);
    });
  }

  function updateCheckboxCount() {
    var count = $(".save-checkbox:checked").length;
    $("#checkbox-count").text(count);
  }
});
