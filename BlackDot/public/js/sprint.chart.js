/**
 * @file comparativaEpicas.chart.js
 * @brief Chart for comparativa epicas
 * @author Olimpia Garcia
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const fetchSprintData = async () => {
  const res = await fetch("http://localhost:3000/sprintData");
  const data = await res.json();

  return data;
};

/**
 * @brief
 * Creates the graph
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} data - data to be displayed
 */
const createLineGraph = (canvas, data, labels) => {
  const ctx = canvas.getContext("2d");

  console.log(data)

  return new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [
          {
            label: "StoryPoints",
            data: data,
            fill: false,
            borderColor: "rgba(251, 88, 89, 1)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            tension: 0.3,
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
              color: "white",
            },

            grid: {
              color: "rgba(255, 255, 255, 1)"
            },

          },
          x: {
            title: {
              display: true,
              text: "Sprints",
              color: "white",
            },
          },
        },

        grid: {
          color: "rgba(255, 255, 255, 1)"
        },
  
        plugins: {
          legend: {
            display: false,
          },
        },
      },
  });
};

/**
 * @brief
 * Renders the graph. This function is called when the webpage is loaded
 * or refreshed.
 * @todo Add token when authentication is implemented
 */
(async function renderGraph() {
  const data = await fetchSprintData();
  console.log(data);

  const canvas = document.getElementById("Sprints");
  const allStoryPoints = [];
  let sprintNames = [];

  data.sprint.forEach((set) => {
    const doneIssues = set.issues.filter(
      (issue) => issue.estadoIssue === "Done"
    );

    const sprintStoryPoints = doneIssues.reduce(
      (total, issue) => total + issue.storyPoints,
      0
    );

    allStoryPoints.push(sprintStoryPoints);
    sprintNames.push(set.idSprint);
  });

  createLineGraph(canvas, allStoryPoints, sprintNames);
})();
