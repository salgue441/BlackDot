/**
 * @file actualRetro.chart.js
 * @brief Graph of actual retroalimentación
 * @author Carlos Salguero
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

/**
 * @brief
 * Color states for the graph
 * @type {Array} - Array of objects with the color states
 */
const states = [
  {
    label: "To Do",
    color: "rgba(255, 99, 132, 0.6)",
    borderColor: "rgba(255, 99, 132, 1)",
  },
  {
    label: "In Progress",
    color: "rgba(54, 162, 235, 0.6)",
    borderColor: "rgba(54, 162, 235, 1)",
  },
  {
    label: "Done",
    color: "rgba(75, 192, 192, 0.6)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
]

/**
 * @brief
 * Creates the graph
 * @param {*} canvas - Canvas to draw the graph on
 * @param {*} labels - Labels for the graph
 * @param {*} data - Data for the graph
 */
const createBarChart = (canvas, labels, data) => {
  const ctx = canvas.getContext("2d")

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Retroalimentación",
          data: data,
          backgroundColor: states.map((state) => state.color),
          borderColor: states.map((state) => state.borderColor),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

/**
 * @brief
 * Function that recieves the data and creates the graph
 * @param {*} data - Data to create the graph
 */
const createChart = (answerData) => {
  answerData.forEach((item) => {
    const canvas = document.getElementById(`graph-${item.idPregunta}`)

    if (!canvas) return

    const labels = states.map((state) => state.label)
    const data = labels.map(
      (label) => item.respuestas.filter((answer) => answer === label).length
    )

    createBarChart(canvas, labels, data)
  })
}

createChart([
  {
    idPregunta: 1,
    Pregunta: "¿Cómo te sientes?",
    respuestas: [5, 1, 5, 1, 5, 10, 4, 3, 4, 2, 3, 2, 2, 2, 5, 5],
  },
  {
    idPregunta: null,
    Pregunta: "¿Cómo te sientes?",
    respuestas: [null, null, null],
  },
  {
    idPregunta: 2,
    Pregunta: "¿Te sientes a gusto con tu desempeño este sprint?",
    respuestas: [5, 4, 5, 4, 2, 1, 2, 1, 3, 3, 3, 4, 3, 4],
  },
  {
    idPregunta: 3,
    Pregunta:
      "¿Consideras que la cantidad de issues asignadas en este sprint son las adecuadas?",
    respuestas: [5, 5, 5, 5, 1, 4, 1, 4, 2, 4, 2, 4, 1, 1],
  },
])

//export default createChart
