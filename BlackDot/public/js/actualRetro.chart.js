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
    label: "Totalmente en desacuerdo",
    value: 1,
    color: "rgba(255, 99, 132, 0.6)",
    borderColor: "rgba(255, 99, 132, 1)",
  },
  {
    label: "En desacuerdo",
    value: 2,
    color: "rgba(54, 162, 235, 0.6)",
    borderColor: "rgba(54, 162, 235, 1)",
  },
  {
    label: "Neutro",
    value: 3,
    color: "rgba(75, 192, 192, 0.6)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
  {
    label: "De acuerdo",
    value: 4,
    color: "rgba(255, 206, 86, 0.6)",
    borderColor: "rgba(255, 206, 86, 1)",
  },
  {
    label: "Totalmente de acuerdo",
    value: 5,
    color: "rgba(153, 102, 255, 0.6)",
    borderColor: "rgba(153, 102, 255, 1)",
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
          data: data,
          backgroundColor: states.map((state) => state.color),
          borderColor: states.map((state) => state.borderColor),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },

      plugins: {
        legend: {
          display: false,
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
    const data = item.respuestas

    createBarChart(canvas, labels, data)
  })
}
