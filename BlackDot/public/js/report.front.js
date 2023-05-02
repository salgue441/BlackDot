/**
 * @file report.front.js
 * @brief Frontend for report page
 * @author Yuna Chung
 * @date 2023-05-02
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

  // chartClone.update();
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

    generatePDF(result);
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
