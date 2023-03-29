/**
 * @file comparativaEpicas.chart.js
 * @brief Chart for comparativa epicas
 * @author Carlos Salguero
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const fetchEpicasData = async () => {
  const res = await fetch("http://localhost:3000/historico/epicasData")
  const data = await res.json()

  return data
}

/**
 * @brief
 * Creates the graph
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} data - Data to be displayed
 */
const createBarChart = (canvas, data) => {
  const ctx = canvas.getContext("2d")

  const existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy()
  }

  return new Chart(ctx, {
    type: "bar",
    datasets: [
      {
        label: "Epicas",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
          },

          title: {
            display: true,
            text: "Story Points",
          },
        },
        x: {
          title: {
            display: true,
            text: "Sprints",
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

/**
 * @brief
 * Renders the graph. This function is called when the page is loaded
 * or refreshed
 * @todo Add token when authentication is implemented
 */
;(async function renderGraph() {
  const data = await fetchEpicasData()
  console.log(data)

  data.epicas.forEach((set) => {
    const canvas = document.getElementById("EpicaComparison")
    const totalStoryPoints = data.issues
      .filter((issue) => issue.estadoIssue === "Done")
      .reduce((sum, issue) => sum + issue.storyPoints, 0)

    console.log(totalStoryPoints)

    createBarChart(canvas, totalStoryPoints)
  })
})()
