/**
 * @file report.controller.js
 * @brief Controller for report page
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.04.27
 */

const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

/**
 * @brief
 * Renders the template for the report
 * @param {*} req Request object
 * @param {*} res Response object
 */
const renderTemplate = async (req, res) => {
  const { graphImage, reportTitle } = req.body;

  const template = fs.readFileSync(
    path.join(__dirname, "../views/static/reports/template.ejs")
  );

  const logoImage = fs.readFileSync(
    path.join(__dirname, "../../public/assets/$zebrands-brand-logo.svg")
  );

  const data = {
    graphImage: graphImage,
    title: reportTitle,
    logoImage: logoImage,
    pageNumber: 1,
    totalPages: 1,
  };

  const html = ejs.render(template.toString(), data);
  res.send(html);
};

module.exports = {
  renderTemplate,
};
