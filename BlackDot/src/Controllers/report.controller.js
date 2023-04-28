const pdf = require("html-pdf");
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { response } = require("express");

const router = express.Router();

const generateTemplate = (req, res) => {
  const { graphImage } = req.body;

  const data = {
    title: "Desempenio Sprint Actual",
    image: graphImage,
    pageNumber: 1,
    totalPages: 1,
  };

  ejs.renderFile(
    path.join(__dirname, "../views/static/reports/template.ejs"),
    data,
    (err, html) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred");
      } else {
        const options = { format: "Letter" };

        pdf.create(html, options).toStream((err, stream) => {
          if (err) {
            console.log(err);
            res.status(500).send("An error occurred");
          } else {
            res.setHeader("Content-type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=report.pdf"
            );

            stream.pipe(res);
          }
        });
      }
    }
  );
};

const generatePDF = (req, res) => {
  const pdfData = req.body.pdfData;
  console.log(pdfData)

  res.setHeader('Content-type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  res.send(pdfData);
};

module.exports = {
  generateTemplate,
  generatePDF,
};



