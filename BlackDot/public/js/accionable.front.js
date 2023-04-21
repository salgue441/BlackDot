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

  $.ajax({
    url: '/admin/saveAccionables',
    method: 'POST',
    data: {idsAccionables},
    success: function(data) {
      console.log(data)
    },
    error: function(error) {
      console.log(error)
    }
  })
}

const aceptarAccionable = async () => {
  console.log("Yuna estuvo aqui")

  const aprobarButton = document.querySelector('.reporte-button')
}