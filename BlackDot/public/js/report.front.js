/**
 * @file report.front.js
 * @brief Frontend for report page
 * @author Yuna Chung
 * @version 1.0
 * @date 2023-04-27
 */

/**
 * @brief
 * Converts the chart to an image
 * @param {HTMLCanvasElement} canvasID - Canvas element
 * @return {String} img - Image of the graph
 */
 function convertChart2Image(canvasID) {
  const canvas = canvasID;
  const ctx = canvas.getContext("2d");
  const img = canvas.toDataURL("image/png");

  return img;
}

/**
 * @brief
 * Generates the report when the button is clicked.
 * Sends the image of the graph to the backend
 * @param {HTMLCanvasElement} canvasID - Canvas element
 * @return {String} graphImage - Image of the graph
 * @return {String} data - Data to be displayed
 * @return {String} labels - Labels for the data
 */
async function generateReport(canvasID) {
    const canvas = canvasID;
    const ctx = canvas.getContext("2d");
    const graphImage = convertChart2Image(canvasID);

    const data = {
      graphImage: graphImage.toString(),
    }

    console.log(data)

    $.ajax({
      type: "POST",
      url: "/report/admin/generate",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        generatePDF(response);
      },

      error: function (response) {
        console.log(response);
      }
    }) 
  }

/**
 * @brief
 * Generates the PDF file
 * @param {String} pdfData - Data to be displayed
 * @return {String} pdf - PDF file
 */

const generatePDF = (pdfData) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/report/admin/generate-pdf";
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "pdfData";
  input.value = pdfData; 
  form.appendChild(input);
  document.body.appendChild(form);

  // Submit the form to download the PDF file
  form.submit();
};