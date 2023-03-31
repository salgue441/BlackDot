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
    const sprintIssues = await SprintIssue.getByIDS(sprint.id)
    const sprintEpicas = await SprintEpica.getByIDS(sprint.id)

    console.log(sprintIssues)
    console.log(sprintEpicas)

    res.render(
      path.join(__dirname, "../Views/Static/actual/verMetricasActuales.ejs"),
      {
        /*epicas: epicas,*/
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas actuales",
    });
  }
};
