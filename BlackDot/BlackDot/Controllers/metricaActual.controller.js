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
const Epica = require("../Models/Epica.model");
const Issue = require("../Models/issue.model");
const Sprint = require("../Models/sprint.model");
const SprintIssue = require("../Models/sprint-issue.model");
const SprintEpica = require("../Models/sprintEpica.model");

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
    const sprintIssues = await SprintIssue.getByIDS(sprint[0].idSprint);
    console.log(sprintIssues)
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
    const sprintIssues = await SprintIssue.getByIDS(sprint[0].idSprint);
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