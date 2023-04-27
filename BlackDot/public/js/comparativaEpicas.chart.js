/**
 * @file comparativaEpicas.chart.js
 * @brief Chart for comparativa epicas
 * @author Carlos Salguero
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

/**
 * @brief
 * Fetches the data from the server
 * @returns {Array} - Data from the server
 * 
 */

const fetchEpicasData = async () => {
  const res = await fetch("http://localhost:3000/historico/epicasData")
  const data = await res.json()

  return data
}

/**
 * @brief
 * Creates a bar chart with multiple bars per epic.
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} data - Data to be displayed
 * @param {Array} labels - Labels for the data
 */
const createStackBarChart = (canvas, epicasData, labels) => {
  const ctx = canvas.getContext("2d")

  const colors = [
    {
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      backgroundColor: "rgba(255, 153, 109, 0.6)",
      borderColor: "rgba(255, 153, 109, 1)",
    },
    {
      backgroundColor: "rgba(255, 206, 86, 0.6)",
      borderColor: "rgba(255, 206, 86, 1)",
    },
    {
      backgroundColor: "rgba(155, 184, 161, 0.6)",
      borderColor: "rgba(155, 184, 161, 1)",
    },
    {
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      backgroundColor: "rgba(65, 177, 214, 0.6)",
      borderColor: "rgba(65, 177, 214, 1)",
    },
    {
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      backgroundColor: "rgba(114, 147, 224, 0.6)",
      borderColor: "rgba(114, 147, 224, 1)",
    },
    {
      backgroundColor: "rgba(153, 102, 255, 0.6)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
    {
      backgroundColor: "rgba(162, 116, 255, 0.6)",
      borderColor: "rgba(162, 116, 255, 1)",
    }
  ]

  const datasets = epicasData.map((epic, index) => {
    const storyPointsPerSprint = epic.sprints.map((sprint) => {
      const doneIssues = sprint.issues.filter(
        (issue) => issue.estadoIssue === "Done"
      )
      return doneIssues.reduce((total, issue) => total + issue.storyPoints, 0)
    })

    return {
      label: epic.nombreEpica,
      data: storyPointsPerSprint,
      backgroundColor: colors[index % colors.length].backgroundColor,
      borderColor: colors[index % colors.length].borderColor,
      borderWidth: 1,
    }
  })

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
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
          display: true,
          position: "top",
        },
      },
    },
  })
}

  /**
   * @brief
   * Renders the sprint-comparison graph. This function is called when the page
   * is loaded or refreshed
   *  @returns {void}
   */
  // Updated calling function
  ; (async function renderStackGraph() {
    const data = await fetchEpicasData()
    console.log(data)

    const canvas = document.getElementById("SprintComparison")
    const sprintsLabels = data.epicas[0].sprints.map((sprint) => sprint.idSprint)

    createStackBarChart(canvas, data.epicas, sprintsLabels)
  })()



