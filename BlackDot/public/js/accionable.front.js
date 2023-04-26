/**
 * @file accionable.front.js
 * @brief Contains the FrontEnd implementation of accionables
 * @author Yuna Chung
 * @date 2023-03-30
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

let idsAccionables = [];

/**
 * @brief
 * Handles the state of Checkboxes
 */

function handleCheckBox(accionableId) {
  const checkboxes = document.querySelectorAll(`#checkbox-${accionableId}`);

  const input = document.getElementById("selected-accionables");

  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const id = checkbox.id.split("-").pop();
    const isChecked = checkbox.checked;

    if (isChecked) {
      idsAccionables.push(id);
      input.value = idsAccionables.join(",");
    } else {
      idsAccionables = idsAccionables.filter((item) => item !== id);
      input.value = idsAccionables.join(",");
    }
  }

  console.log(idsAccionables);
}

function saveAccionables() {
  try {
    const selectedAccionables = idsAccionables;
    console.log(selectedAccionables);

    $.ajax({
      url: "/actual/admin/saveAccionables",
      method: "POST",
      data: { idsAccionables: selectedAccionables },
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
  } catch (error) {
    console.log(error);
  }
}
