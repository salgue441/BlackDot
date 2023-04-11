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
    const res = await fetch("http://localhost:3000/actual/sprintData")
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
              text: "Estado",
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
    const data = await fetchSprintData()
    console.log(data)
  
    const canvas = document.getElementById("ActualSprint")
    let labels = ["Done", "To Do", "In Progress"];
    let allStoryPoints = [];
    let doneIssues = [];
    let todoIssues = [];
    let inprogressIssues = [];
    let doneStoryPoints = 0;
    let todoStoryPoints = 0;
    let inprogressStoryPoints = 0;


    for (let i = 0; i < data.issues.length; i++) {
        //doneStoryPoints = doneStoryPoints + data.issues[i].storyPoints;
        if (data.issues[i].estadoIssue === "Done") {
            doneIssues.push(data.issues[i].storyPoints)
        }
        if (data.issues[i].estadoIssue === "To Do") {
            todoIssues.push(data.issues[i].storyPoints)
        }
        if (data.issues[i].estadoIssue === "In Progress") {
            inprogressIssues.push(data.issues[i].storyPoints)
        }
    }

    for (let j = 0; j < doneIssues.length; j++) {
        doneStoryPoints = doneStoryPoints + doneIssues[j];
    }

    for (let k = 0; k < todoIssues.length; k++) {
        todoStoryPoints = todoStoryPoints + todoIssues[k];
    }

    for (let l = 0; l < inprogressIssues.length; l++) {
        inprogressStoryPoints = inprogressStoryPoints + inprogressIssues[l];
    }
  
    allStoryPoints.push(doneStoryPoints+10);
    allStoryPoints.push(todoStoryPoints);
    allStoryPoints.push(inprogressStoryPoints);

    createBarChart(canvas, allStoryPoints, labels)
  })()
  