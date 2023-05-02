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
 * Fetches data from the frontend side (the image from the graph).
 * Converts the image to a blob and returns the url of the image.
 * @param {string} actualSprint - The actual sprint graph id
 * @return {string} - The url of the image
*/
const chartToURL = (canvasID) => {
  const canvas = canvasID;
  const ctx = canvas.getContext("2d");
  const img = canvas.toDataURL("image/png");

  // Return the image data as a base64-encoded string
  return img;
};

/**
 * @brief
 * Generates the report when the button is clicked.
 * Sends the data to the backend.
 * @param {string} canvasID - The canvas id
 */
const generateReport = async (canvasID) => {
  const canvas = canvasID;
  const ctx = canvas.getContext("2d");
  const graphImage = chartToURL(canvasID);

  const data = {
    graphImage: graphImage,
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
  // Create a new Blob from the response data
  const blob = new Blob([pdfData], { type: "application/pdf" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Open the PDF in a new window
  window.open(url);
};
