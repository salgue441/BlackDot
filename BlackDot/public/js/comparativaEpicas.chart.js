/**
 * @file comparativaEpicas.chart.js
 * @brief Chart for comparativaEpicas
 * @author Carlos Salguero
 * @version 1.0
 * @date 2023-05-02
 * 
 * @copyright Copyright 2023 (c) - MIT License
 */

/**
 * @brief
 * Fetches the data for the sprint-comparison graph
 * @return {Promise} Promise with the data for the graph
 */
const fetchEpicasData = async () => {
  const res = await fetch('/historico/epicasData')
  const data = await res.json()

  if (!Array.isArray(data.epicas)) {
    throw new Error("No epicas data")
  }

  return data.epicas
}

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

/**
 * @brief
 * Creates datasets for the graph with colors
 * @param {Array} data Array with the data for the graph
 * @return {Array} Array with the datasets for the graph
 */
const createDatasets = (data) => {
  const datasets = [];

  data.forEach((epica) => {
    const index = data.indexOf(epica);
    const storyPointsPerSprint = epica.sprints.map((sprint) => {
      const doneIssues = sprint.issues.filter(
        (issue) => issue.estadoIssue === "Done"
      );

      return doneIssues.reduce((acc, issue) => acc + issue.storyPoints, 0);
    });

    const color = colors[index % colors.length];

    datasets.push({
      label: epica.nombreEpica,
      data: storyPointsPerSprint,
      ...color,
    });
  });

  return datasets;
};


/**
 * @brief 
 * Creates a bar chart with multiple bars per epic
 * @param {HTMLCanvasElement} canvas Canvas element to draw the graph
 * @param {Array} data Array with the data for the graph
 * @param {Array} labels Array with the labels for the graph
 */
const createStackBarChart = (canvas, epicsData, labels) => {
  const ctx = canvas.getContext("2d");

  if (!epicsData || !Array.isArray(epicsData)) {
    console.error("Invalid epicasData:", epicsData);
    return;
  }

  const datasets = createDatasets(epicsData);

  console.log("Creating chart with data:", datasets)

  let chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          title: {
            display: true,
            text: "Story Points",
            color: "rgba(227, 225, 221, 1)",
          },
          grid: {
            color: "rgba(227, 225, 221, 1)",
            borderColor: "rgba(227, 225, 221, 1)",
          },
          ticks: {
            color: "rgba(227, 225, 221, 1)",
          },
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: "Sprints",
            color: "#fff",
          },
          grid: {
            color: "rgba(227, 225, 221, 1)",
            borderColor: "rgba(227, 225, 221, 1)",
          },
          ticks: {
            color: "rgba(227, 225, 221, 1)",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "rgba(227, 225, 221, 1)",
          },
        },
      },
    },
  })

  return chart;
}

/**
 * @brief
 * Updates the graph with new data
 * @param {Chart} chart Chart to update
 * @param {Array} epicasData Array with the data for the graph
 * @param {Array} labels Array with the labels for the graph
 */
const updateChart = (chart, epicasData, labels) => {
  console.log(chart)

  const datasets = createDatasets(epicasData);

  chart.data.datasets = datasets;
  chart.update();
}


/**
 * @brief
 * Adds event listeners to checkboxes to update the chart when clicked
 * @param {Chart} chart Chart to update
 * @param {Array} epicasData Array with the data for the graph
 * @param {Array} labels Array with the labels for the graph
 */
const addCheckboxEventListeners = (chart, epicasData, labels) => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="epicCheckbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const checkedEpicIds = Array.from(
        document.querySelectorAll('input[type="checkbox"][name="epicCheckbox"]:checked')
      ).map((checkbox) => parseInt(checkbox.value));

      const filteredEpicasData = epicasData.filter((epica) =>
        checkedEpicIds.includes(epica.idEpica)
      );

      updateChart(chart, filteredEpicasData, labels);
    });
  });
};


/**
 * @brief
 * Renders the sprint-comparison graph. 
 * Fetches the data and renders the graph
 */
(async function renderStackGraph() {
  try {
    const epicasData = await fetchEpicasData()
    const canvas = document.getElementById("SprintComparison")
    const labels = epicasData[0].sprints.map((sprint) => sprint.idSprint)

    const chart = createStackBarChart(canvas, epicasData, labels)
    addCheckboxEventListeners(chart, epicasData, labels)
  }
  catch (error) {
    console.log("Error: ", error)
  }
})();
