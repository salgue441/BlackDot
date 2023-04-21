/**
 * @file accionable.front.js
 * @brief Contains the FrontEnd implementation of accionables
 * @author Yuna Chung
 * @date 2023-03-30
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

function handleCheckBox() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name = "accionable"]'
  );
  let idsAccionables = [];

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

  fetch("/admin/saveAccionables", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }, 

    body: JSON.stringify(idsAccionables)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
