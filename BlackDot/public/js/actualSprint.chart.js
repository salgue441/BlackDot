/**
 * @file actualSprint.chart.js
 * @brief Chart for actual sprint
 * @author Diego Llaca
 * @date 2023-03-30
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const fetchSprintData = async () => {
  const res = await fetch("/actual/sprintData")
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
  const ctx = canvas.getContext("2d")

  /**
* @brief
* Colors array for the graph
* @var {Array} colors Array with the colors for the graph
*/
  const colors = [
    {
      backgroundColor: "rgba(255, 99, 132, 1)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      backgroundColor: "rgba(255, 153, 109,1)",
      borderColor: "rgba(255, 153, 109, 1)",
    },
    {
      backgroundColor: "rgba(255, 206, 86, 1)",
      borderColor: "rgba(255, 206, 86, 1)",
    },
    {
      backgroundColor: "rgba(155, 184, 161, 1)",
      borderColor: "rgba(155, 184, 161, 1)",
    },
    {
      backgroundColor: "rgba(54, 162, 235, 1)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      backgroundColor: "rgba(65, 177, 214, 1)",
      borderColor: "rgba(65, 177, 214, 1)",
    },
    {
      backgroundColor: "rgba(75, 192, 192, 1)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      backgroundColor: "rgba(114, 147, 224, 1)",
      borderColor: "rgba(114, 147, 224, 1)",
    },
    {
      backgroundColor: "rgba(153, 102, 255, 1)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
    {
      backgroundColor: "rgba(162, 116, 255, 1)",
      borderColor: "rgba(162, 116, 255, 1)",
    }
  ]

  const backgroundColors = data.map(
    (_, index) => colors[index % colors.length].backgroundColor
  )
  const borderColors = data.map(
    (_, index) => colors[index % colors.length].borderColor
  )

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "StoryPoints",
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            color: 'white'
          },
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(227, 225, 221, 1)'
          }
        },
        y: {
          title: {
            color: 'white'
          },
          ticks: {
            beginAtZero: true,
            color: 'white'
          },
          grid: {
            color: 'rgba(227, 225, 221, 1)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }

  })
}

  /**
   * @brief
   * Renders the graph. This function is called when the page is loaded
   * or refreshed
   * @todo Add token when authentication is implemented
   */
  ; (async function renderGraph() {
    const data = await fetchSprintData()
    const canvas = document.getElementById("ActualSprint")
    let labels = ["To Do", "En curso", "Pull request", "QA", "Blocked", "Done"];
    let allStoryPoints = [];
    let todoIssues = [];
    let encursoIssues = [];
    let pullrequestIssues = [];
    let QAIssues = [];
    let blockedIssues = [];
    let doneIssues = [];
    let todoStoryPoints = 0;
    let encursoStoryPoints = 0;
    let pullrequestStoryPoints = 0;
    let QAStoryPoints = 0;
    let blockedStoryPoints = 0;
    let doneStoryPoints = 0;


    for (let i = 0; i < data.issues.length; i++) {
      //doneStoryPoints = doneStoryPoints + data.issues[i].storyPoints;
      if (data.issues[i].estadoIssue === "To Do") {
        todoIssues.push(data.issues[i].storyPoints)
      }
      if (data.issues[i].estadoIssue === "En curso") {
        encursoIssues.push(data.issues[i].storyPoints)
      }
      if (data.issues[i].estadoIssue === "Pull request") {
        pullrequestIssues.push(data.issues[i].storyPoints)
      }
      if (data.issues[i].estadoIssue === "QA") {
        QAIssues.push(data.issues[i].storyPoints)
      }
      if (data.issues[i].estadoIssue === "Blocked") {
        blockedIssues.push(data.issues[i].storyPoints)
      }
      if (data.issues[i].estadoIssue === "Done") {
        doneIssues.push(data.issues[i].storyPoints)
      }
    }

    for (let j = 0; j < todoIssues.length; j++) {
      todoStoryPoints = todoStoryPoints + todoIssues[j];
    }

    for (let k = 0; k < encursoIssues.length; k++) {
      encursoStoryPoints = encursoStoryPoints + encursoIssues[k];
    }

    for (let l = 0; l < pullrequestIssues.length; l++) {
      pullrequestStoryPoints = pullrequestStoryPoints + pullrequestIssues[l];
    }

    for (let m = 0; m < QAIssues.length; m++) {
      QAStoryPoints = QAStoryPoints + QAIssues[m];
    }

    for (let n = 0; n < blockedIssues.length; n++) {
      blockedStoryPoints = blockedStoryPoints + blockedIssues[n];
    }

    for (let o = 0; o < doneIssues.length; o++) {
      doneStoryPoints = doneStoryPoints + doneIssues[o];
    }

    allStoryPoints.push(todoStoryPoints);
    allStoryPoints.push(encursoStoryPoints);
    allStoryPoints.push(pullrequestStoryPoints);
    allStoryPoints.push(QAStoryPoints);
    allStoryPoints.push(blockedStoryPoints);
    allStoryPoints.push(doneStoryPoints);
    allStoryPoints.push(doneStoryPoints);

    createBarChart(canvas, allStoryPoints, labels)
  })()
