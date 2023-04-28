import { generate } from "@pdfme/generator";

/**
 * @brief
 * Handles the generation of the template
 */

(async () => {
  const BlackdotTemplate = {
    schemas: [
      {
        Title: {
          type: "text",
          position: {
            x: 39.89,
            y: 25.59,
          },
          width: 199.56,
          height: 6.98,
          alignment: "center",
          fontSize: 18,
          characterSpacing: 0,
          lineHeight: 1,
        },
        Date: {
          type: "text",
          position: {
            x: 24.88,
            y: 13.5,
          },
          width: 29.44,
          height: 7,
          alignment: "left",
          fontSize: 12,
          characterSpacing: 0,
          lineHeight: 1,
        },
        Logo: {
          type: "image",
          position: {
            x: 212.21,
            y: 7.7,
          },
          width: 41.06,
          height: 11.43,
          alignment: "left",
          fontSize: 13,
          characterSpacing: 0,
          lineHeight: 1,
        },
        Body: {
          type: "image",
          position: {
            x: 21.89,
            y: 44.13,
          },
          width: 235.55,
          height: 127.6,
          alignment: "left",
          fontSize: 13,
          characterSpacing: 0,
          lineHeight: 1,
        },
        pageNumber: {
          type: "text",
          position: {
            x: 218.54,
            y: 197.11,
          },
          width: 35,
          height: 7,
          alignment: "right",
          fontSize: 13,
          characterSpacing: 0,
          lineHeight: 1,
        },
      },
    ],
    basePdf: BLANK_PDF,
  };
  const inputs = [
    {
      Title: "REPORT TITLE",
      Date: "DD/MM/YYYY",
      Logo: "", // Zebrands logo
      Body: "", // Graph
      pageNumber: "1",
    },
  ];

  const pdf = await generate({ BlackdotTemplate, inputs });

  // Browser
  const blob = new Blob([pdf.buffer], { type: "application/pdf" });
  window.open(URL.createObjectURL(blob));
})();
