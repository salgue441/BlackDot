/**
 * @file retroalimentacion.controller.js
 * @brief Controller for retroalimentacion mdodel (historic).
 * @author Diego Llaca
 * @date 2023-03-30
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const path = require("path");

// Models
const Epica = require("../models/Epica.model");
const Issue = require("../models/issue.model");
const Sprint = require("../models/sprint.model");
const SprintIssue = require("../models/sprint-issue.model");
const SprintEpica = require("../models/sprintEpica.model");

/**
 * @brief
 * Gets all actual metrics
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getActual = async (req, res) => {
  try {
    const sprint = await Sprint.getSprintActual();
    console.log(sprint)

    const sprintIssues = await SprintIssue.getByIDS(sprint.idSprint)

    console.log("No es 8")

    sprint.issues = sprintIssues;

    for (let i = 0; i < sprint.issues.length; i++) {
      let issue = await Issue.getByID(sprint.issues[i].idIssue);
    }

    res.render(
      path.join(__dirname, "../Views/Static/actual/verMetricasActuales.ejs")
    );
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error });
  }
};

exports.getActualAPI = async (req, res) => {
  try {
    const sprint = await Sprint.getSprintActual();
    const sprintEpicas = await SprintEpica.getByIDS(sprint.id);
    const sprintIssues = await SprintIssue.getByIDS(sprint.id);
    let arrayIssues = [];

    sprint.issues = sprintIssues;

    for (let i = 0; i < sprint.issues.length; i++) {
      let issue = await Issue.getByID(sprint.issues[i].idIssue);
      arrayIssues.push(issue);
    }
    res.json({ issues: arrayIssues });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    });
  }
};
