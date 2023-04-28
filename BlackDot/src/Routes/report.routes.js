const express = require("express");
const pdfme = require("@pdfme/generator");
const router = express.Router();

router.post("/admin/generate", (req, res) => {
  const { template, graphImage } = req.body;

  console.log(template);
  console.log(graphImage);

  /* pdfme
    .generatePDF(template, data)
    .then((pdfBuffer) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
        "Content-Length": pdfBuffer.length,
      });
      res.send(pdfBuffer);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error generating PDF");
    }); */
});

module.exports = router;
