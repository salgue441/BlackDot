/**
 * @file report.front.js
 * @brief Frontend for report page
 * @author Yuna Chung
 * @version 1.0
 * @date 2023-04-27
 */

/**
 * @brief
 * Generates the report when the button is clicked. 
 * Sends the image of the graph to the backend
 * @param {HTMLCanvasElement} canvasID - Canvas element
 * @return {String} graphImage - Image of the graph
 * @return {String} data - Data to be displayed
 * @return {String} labels - Labels for the data
 */
function generateReport(canvasID) {
  const canvas = canvasID;
  const ctx = canvas.getContext("2d");
  const graphImage = convertChart2Image(canvasID);

  $.ajax({
    url: "/admin/report",
    type: "POST",
    data: {
      graphImage: graphImage,
    },

    success: function (data) {
      console.log("success");
    },

    error: function (err) {
      console.log(err);
    },
  });
}

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
