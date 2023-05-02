const ejs = require("ejs");
const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");

const generateTemplate = async (req, res) => {
  const { graphImage } = req.body;
  console.log(graphImage)

  // Generate the PDF
  const template = await ejs.renderFile(
    path.join(__dirname, "../views/static/reports/template.ejs"),
    {
      title: "Report",
      graphImage: graphImage,
      logoImage: "/assets/404.jpg",
      pageNumber: 1,
      totalPages: 1,
    }
  );

  const options = {
    height: "11.25in",
    width: "8.5in",
    header: {
      height: "20mm",
    },
    footer: {
      height: "20mm",
    },
  };

  pdf.create(template, options).toFile("report.pdf", (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json({
        message: "Error generating the PDF",
      })
    }

    console.log(data);
    // fs.unlinkSync("./report.pdf");
  });
};

module.exports = {
  generateTemplate,
};