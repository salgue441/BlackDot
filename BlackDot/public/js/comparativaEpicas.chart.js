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
const createBarChart = (canvas, data, labels) => {
  console.log(data)
  const ctx = canvas.getContext("2d")

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "StoryPoints",
          data: data,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
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

  const canvas = document.getElementById("EpicaComparison")
  let allStoryPoints = []
  let epicasNames = []

  data.epicas.forEach((set) => {
    const epicStoryPoints = set.sprints.reduce((acc, sprint) => {
      const doneIssues = sprint.issues.filter(
        (issue) => issue.estadoIssue === "Done"
      )
      const sprintStoryPoints = doneIssues.reduce(
        (total, issue) => total + issue.storyPoints,
        0
      )

      return acc + sprintStoryPoints
    }, 0)

    allStoryPoints.push(epicStoryPoints)
    epicasNames.push(set.nombreEpica)

    console.log()
    console.log(epicasNames)
  })

  createBarChart(canvas, allStoryPoints, epicasNames)
})()
