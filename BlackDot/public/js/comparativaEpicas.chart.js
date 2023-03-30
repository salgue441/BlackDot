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
 * @param {Array} labels - Labels for the data
 */
const createBarChart = (canvas, data, labels) => {
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
 * Creates a bar chart with multiple bars per epic.
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} data - Data to be displayed
 * @param {Array} labels - Labels for the data
 */
const createStackBarChart = (canvas, epicasData, labels) => {
  const ctx = canvas.getContext("2d")

  const datasets = epicasData.map((epic, index) => {
    const backgroundColor = `rgba(${100 + index * 30}, ${
      index * 50 + 100
    }, 132, 0.6)`
    const borderColor = `rgba(${100 + index * 30}, ${index * 50 + 100}, 132, 1)`

    const storyPointsPerSprint = epic.sprints.map((sprint) => {
      const doneIssues = sprint.issues.filter(
        (issue) => issue.estadoIssue === "Done"
      )
      return doneIssues.reduce((total, issue) => total + issue.storyPoints, 0)
    })

    return {
      label: epic.nombreEpica,
      data: storyPointsPerSprint,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
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
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: "Story Points",
          },
        },
        x: {
          stacked: true,
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
 * Renders the graph. This function is called when the page is loaded
 * or refreshed
 * @todo Add token when authentication is implemented
 */
;(async function renderGraph() {
  const data = await fetchEpicasData()

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
  })

  createBarChart(canvas, allStoryPoints, epicasNames)
})()
/**
 * @brief
 * Renders the sprint-comparison graph. This function is called when the page
 * is loaded or refreshed
 * @todo Add token when authentication is implemented
 */
// Updated calling function
;(async function renderStackGraph() {
  const data = await fetchEpicasData()
  console.log(data)

  const canvas = document.getElementById("SprintComparison")
  const sprintsLabels = data.epicas[0].sprints.map((sprint) => sprint.idSprint)

  createStackBarChart(canvas, data.epicas, sprintsLabels)
})()

/**
 * @brief
 * Changes the graph-title and graph-canvas to show the other graph.
 * As well as the section-title that controls the available graphs.
 * Also, changes the colors of the buttons accordingly.
 * @param {Event} event - The event that triggered the function.
 */
const change = (event) => {
  const button = event.target
  const otherButton = document.getElementById(
    button.id === "toggleEpicaComparison"
      ? "toggleSprintComparison"
      : "toggleEpicaComparison"
  )

  // Change the colors of the buttons
  button.classList.remove("is-fill")
  button.classList.add("is-link")
  otherButton.classList.remove("is-link")
  otherButton.classList.add("is-fill")

  // Change the section-title and input boxes
  const sectionTitle = document.getElementById("section-title")
  const liSprint = [...document.getElementsByClassName("sprint")]
  const liEpica = [...document.getElementsByClassName("epica")]

  sectionTitle.innerHTML =
    sectionTitle.innerHTML === "Comparativa de Epicas"
      ? "Comparativa de Sprints"
      : "Comparativa de Epicas"

  if (button.id === "toggleEpicaComparison") {
    liSprint.forEach((li) => {
      li.style.display = li.style.display === "none" ? "block" : "none"
    })

    liEpica.forEach((li) => {
      li.style.display = li.style.display === "none" ? "block" : "none"
    })
  } else {
    liSprint.forEach((li) => {
      li.style.display = li.style.display === "none" ? "block" : "none"
    })

    liEpica.forEach((li) => {
      li.style.display = li.style.display === "none" ? "block" : "none"
    })
  }

  // Change the graph-title and graph-canvas
  const graphTitle = document.getElementsByClassName("graph-title")
  const graphCanvas = document.getElementsByClassName("graph-canvas")

  for (let i = 0; i < graphTitle.length; i++) {
    graphTitle[i].style.display =
      graphTitle[i].style.display === "none" ? "block" : "none"
    graphCanvas[i].style.display =
      graphCanvas[i].style.display === "none" ? "block" : "none"
  }
}
