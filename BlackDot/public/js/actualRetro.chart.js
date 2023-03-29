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
 * Fetches the data from the server and sends them to the frontend
 * @todo Add token when authentication is implemented
 */

const fetchAnswersData = async () => {
  const res = await fetch("http://localhost:3000/actual/respuestasRetro")
  const data = await res.json()

  return data
}

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
          ticks: {
            beginAtZero: true,
          },
          title: {
            display: true,
            text: "Frecuencia",
          },
        },
        x: {
          title: {
            display: true,
            text: "Respuestas",
          },
        },
      },

      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })
}

;(async function renderGraphs() {
  const data = await fetchAnswersData()
  console.log(data)

  data.simplifiedQuantitative.forEach((set) => {
    const canvas = document.getElementById(`graph-${set.idPregunta}`)

    const labels = Object.keys(set.respuestas)
    const data = Object.values(set.respuestas)

    createBarChart(canvas, labels, data)
  })

  /*   const labels = data.map((item) => item.pregunta)
  const answers = data.map((item) => item.respuesta)

  const canvas = document.getElementById("myChart")
  createBarChart(canvas, labels, answers) */
})()
