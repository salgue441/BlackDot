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
 * Fetches the template from the server
 * @param {Object} data - Data to be sent to the server
 * @returns {String} - HTML template
 */
const fetchTemplate = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch('/report/renderTemplate', options)
  const template = await response.text()

  return template
}

/**
 * @brief
 * Generates a PDF file from the chart
 * @param {String} canvasID - ID of the chart canvas
 * @param {String} pageTitle - Title of the page
 * @returns {void} - Nothing
 */
const generatePDF = async (canvasID, pageTitle) => {
  const chartCanvas = document.getElementById(canvasID)
  const chartImage = chartCanvas.toDataURL('image/png', 1.0)
  const template = await fetchTemplate({ chartImage, reportTitle: pageTitle })

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [16, 9],
  })

  // Zebrands logo
  pdf.text("Zëbrands",
    pdf.internal.pageSize.getWidth() - 1.5, 0.5, 1, 1);
  pdf.text(new Date().toLocaleDateString(), 0.5, 0.5);

  // PAGE TITLE (center the text)
  pdf.setFontSize(20)
  pdf.text(pageTitle, 8, 0.5, { align: 'center' })

  // Graph
  pdf.addImage(chartImage, 'PNG', 0.5, 1.5, 15, 7)

  pdf.save(`${pageTitle}.pdf`)

  // csv
  const data = await generateCSV(canvasID);
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `${canvasID}.csv`);
  a.click();
}

/**
 * @brief
 * Generates a CSV file from the table
 * @param {String} chartID - ID of the chart
 * @return {void} - csv file
 */
const generateCSV = (chartID) => {
  const chart = Chart.getChart(chartID);
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
 * @param {Object} objArray - Data to be converted
 * @return {String} - CSV file
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