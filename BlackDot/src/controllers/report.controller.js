/**
 * @file report.controller.js
 * @brief Controller for report page
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.04.27
 */

const ejs = require("ejs");
const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");

const generateTemplate = async (req, res) => {
  const { graphImage, reportTitle } = req.body;

  // Read the logo image file and encode it as base64
  const logoImage = fs.readFileSync(
    path.join(__dirname, "../../public/assets/$zebrands-brand-logo.svg")
  );

  const logoImageEncoded = logoImage.toString("base64");

  // Generate the PDF
  const template = await ejs.renderFile(
    path.join(__dirname, "../views/static/reports/template.ejs"),
    {
      title: reportTitle,
      graphImage: graphImage,
      logoImage: `data:image/svg+xml;base64,${logoImageEncoded}`,
      pageNumber: 1,
      totalPages: 1,
    }
  );

  const options = {
    height: "11in",
    width: "8.5in",
    header: {
      height: "5mm",
    },
    footer: {
      height: "5mm",
    },
  };

  const fileName = "report";

  const domain = process.env.DOMAIN || "http://localhost:3000";

  pdf.create(template, options).toFile(`public/reports/${fileName}.pdf`, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error generating the PDF",
      });
    }

    return res.status(201).json({ success: true, fileName, domain })
  });
};


module.exports = {
  generateTemplate,
};
