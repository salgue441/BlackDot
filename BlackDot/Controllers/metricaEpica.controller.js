/**
 * @file retroalimentacion.controller.js
 * @brief Controller for retroalimentacion mdodel (historic).
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Yuna Chung
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Ivan Paredes
 * @date 2023-03-26
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
const SprintEpica = require("../models/sprintEpica.model")

/**
 * @brief
 * Gets all epicas and their metrics
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getAllEpicas = async (req, res) => {
  try {
    const epicas = await Epica.getAll();
    const issues = await Issue.getAll();
    const allSprints = await Sprint.getAll();
    const sprintIssues = await SprintIssue.getAll();
    const sprintEpicas = await SprintEpica.getAll();
    const sprintNames = await Sprint.getAll()

    const sprints = allSprints
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, 7);

    // Relating sprints and issues
    const sprintIssuesMap = {}

    sprintIssues.forEach((sprintIssue) => {
      const idSprint = sprintIssue.idSprint;
      const idIssue = sprintIssue.idIssue;

      if (!sprintIssuesMap[idSprint]) {
        sprintIssuesMap[idSprint] = [];
      }

      sprintIssuesMap[idSprint].push(idIssue);
    })

    sprints.forEach((sprint) => {
      const idSprint = sprint.idSprint;
      const sprintIssues = sprintIssuesMap[idSprint] || [];

      sprint.issues = issues.filter((issue) =>
        sprintIssues.includes(issue.idIssue));
    })

    // relating epica and sprintIssuesMap
    const epicaSprintsMap = {}

    sprintEpicas.forEach((sprintEpica) => {
      const idEpica = sprintEpica.idEpica
      const idSprint = sprintEpica.idSprint

      if (!epicaSprintsMap[idEpica]) {
        epicaSprintsMap[idEpica] = []
      }

      const relatedSprints = sprints.find(
        (sprint) => sprint.idSprint === idSprint
      )

      if (relatedSprints) {
        epicaSprintsMap[idEpica].push(relatedSprints)
      }
    })

    epicas.forEach((epica) => {
      const idEpica = epica.idEpica
      const epicaSprints = epicaSprintsMap[idEpica] || []

      epica.sprints = epicaSprints
    })

    res.render(
      path.join(__dirname, "../Views/Static/historico/verMetricasEpicas.ejs"),
      {
        epicas: epicas,
        sprints: sprintNames,
      }
    );
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error });
  }
};

/**
 * @brief
 * Sends the graph data in json format
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getAllEpicasAPI = async (req, res) => {
  try {
    const epicas = await Epica.getAll();
    const issues = await Issue.getAll();
    const allSprints = await Sprint.getAll();
    const sprintIssues = await SprintIssue.getAll();
    const sprintEpicas = await SprintEpica.getAll();

    const sprints = allSprints
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, 7);

    // Relating sprints and issues
    const sprintIssuesMap = {}

    sprintIssues.forEach((sprintIssue) => {
      const idSprint = sprintIssue.idSprint;
      const idIssue = sprintIssue.idIssue;

      if (!sprintIssuesMap[idSprint]) {
        sprintIssuesMap[idSprint] = [];
      }

      sprintIssuesMap[idSprint].push(idIssue);
    })

    sprints.forEach((sprint) => {
      const idSprint = sprint.idSprint;
      const sprintIssues = sprintIssuesMap[idSprint] || [];

      sprint.issues = issues.filter((issue) =>
        sprintIssues.includes(issue.idIssue));
    })

    // relating epica and sprintIssuesMap
    const epicaSprintsMap = {}

    sprintEpicas.forEach((sprintEpica) => {
      const idEpica = sprintEpica.idEpica
      const idSprint = sprintEpica.idSprint

      if (!epicaSprintsMap[idEpica]) {
        epicaSprintsMap[idEpica] = []
      }

      const relatedSprints = sprints.find(
        (sprint) => sprint.idSprint === idSprint
      )

      if (relatedSprints) {
        epicaSprintsMap[idEpica].push(relatedSprints)
      }
    })

    epicas.forEach((epica) => {
      const idEpica = epica.idEpica
      const epicaSprints = epicaSprintsMap[idEpica] || []

      epica.sprints = epicaSprints
    })

    res.status(200).json({ epicas: epicas });
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error });
  }
};
