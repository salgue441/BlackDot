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
  const checkboxes = document.querySelectorAll(`checkbox-${accionableId}`);

  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const id = checkbox.id.split("-").pop();
    const isChecked = checkbox.checked;

    if (isChecked) {
      console.log("Checked");
    } else {
      console.log("Unchecked");
    }
  }
}

function saveAccionables() {
  const selectedAccionablesInput = document.getElementById(
    "selected-accionables"
  );
  const selectedAccionables = selectedAccionablesInput.value.split(",");

  // Make the AJAX request to save the selected accionables
  $.ajax({
    url: "/historico/historicoAccionables",
    method: "POST",
    data: { idsAccionables: selectedAccionables },
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
