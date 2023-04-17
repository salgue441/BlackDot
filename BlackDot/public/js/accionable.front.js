/**
 * @file accionable.front.js
 * @brief Contains the FrontEnd implementation of accionables
 * @author Yuna Chung
 * @date 2023-03-30
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

/**
 * @brief
 * Fetches the data from the ghost route. The data is obtained from the dababase.
 * @returns {Array} data - data in json format
 */

/**
 * @brief
 * Gets the checkbox input and saves them into a new array.
 * @returns {Array} accionables - Array with the selected answers
 */
async function handleCheckBox() {
  const data = await fetchActionables()
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="accionable"]'
  )
  let accionables = []

  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i]
    const id = checkbox.id.split("-").pop()
    const isChecked = checkbox.checked
    const contenido = data.waitingAnswers[i].contenido

    // Add the checkbox to the accionables array if it's checked
    if (isChecked) {
      const index = data.waitingAnswers.findIndex(
        (item) => item.idCualitativa === id
      )

      if (index === -1) {
        accionables.push(id)
      }
    } else {
      // Remove the checkbox from the accionables array if it's unchecked
      const index = accionables.findIndex((item) => item === id)

      if (index !== -1) {
        accionables.splice(index, 1)
      }
    }
  }
}

/**
 * @brief
 * Sends data to accionable to a JSON.
 */
async function sendData() {
  const accionablesData = await handleCheckBox()

  try {
    const response = fetch("http://localhost:3000/actual/accionables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    throw new Error(error)
  }
}
