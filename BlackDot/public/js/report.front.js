/**
 * @file report.front.js
 * @brief Frontend for report page
 * @author Yuna Chung
 * @date 2023-04-27
 * @version 1.0
 *
 * @copyright Copyright 2023 (c) - MIT License
 */

/**
 * @brief
 * Clones the chart and updates the properties
 * @param {string} canvasID - The ID of the canvas element
 * @returns {Object} - The cloned chart
 */
const clonedAndUpdateChart = (canvasID) => {
  const originalChart = Chart.getChart(canvasID);
  const chartClone = Object.assign(
    Object.create(Object.getPrototypeOf(originalChart)),
    originalChart
  );

  return chartClone;
};

/**
 * @brief
 * Generates the report when the button is clicked.
 * Sends the data to the backend.
 * @param {string} canvasID - The ID of the canvas element
 */
const generateReport = async (canvasID, pageTitle) => {
  // Clone and update the chart
  const updateChart = clonedAndUpdateChart(canvasID);
  const graphImage = updateChart.toBase64Image();

  // Send the data to the backend
  const data = {
    graphImage: graphImage,
    reportTitle: pageTitle,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch("/report/admin/generate", options);
    const result = await response.json();

    window.open(`http://localhost:3000/reports/${result.fileName}.pdf`, "_blank");

    const data = await generateCSV(canvasID);
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${canvasID}.csv`);
    a.click();
  } catch (error) {
    console.log(error);
  }
};

/**
 * @brief
 * Generates the PDF when the button is clicked.
 * @param {String} pdfData - The data of the PDF
 */
const generatePDF = async (pdfData) => {
  const blob = new Blob([pdfData], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  window.open(url);
};


/**
 * @brief
 * Generates the csv when the button is clicked.
 * @param {String} chartId - The data of the csv
 */

const generateCSV = async (chartId) => {
  console.log('res');
  const chart = Chart.getChart(chartId);
  const { datasets, labels } = chart.data;
  const res = {};
  res.label = labels;
  datasets.forEach((dataset) => {
    res[dataset.label] = dataset.data;
  });

  return ConvertToCSV(res);

}

/**
 * @brief
 * Converts the data to CSV format
 * @param {Object} data - The data to be converted
 * @returns {String} The data in CSV format
 */

function ConvertToCSV(data) {
  const headers = Object.keys(data);
  const rows = Object.values(data);



  let csv = headers.join(",") + "\n";

  for (let i = 0; i < rows[0].length; i++) {
    let row = "";
    for (let j = 0; j < rows.length; j++) {
      if (j === rows.length - 1) row += rows[j][i];
      else row += rows[j][i] + ",";
      if (row.includes("undefined")) {
        row = row.replace("undefined", "");
      }
    }





    csv += row + "\n";
  }



  return csv;
}