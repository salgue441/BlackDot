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
const Epica = require("../models/epica.model");
const Issue = require("../models/issue.model");
const Sprint = require("../models/sprint.model");
const SprintIssue = require("../models/sprintIssue.model");
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

    // Filtering epicas with their names
    const filteredEpica = epicas.filter((epica) => {
      const epicName = epica.nombreEpica.toLowerCase();

      return (
        epicName.includes("middleware paqueterías") ||
        epicName.includes("implementar secciones de la aplicación") ||
        epicName.includes("migración de contentful a ZeSystem") ||
        epicName.includes("google tag manager") ||
        epicName.includes("catalog connect")
      );
    });

    // Relating sprints and issues
    const sprintIssuesMap = {};

    sprintIssues.forEach((sprintIssue) => {
      const idSprint = sprintIssue.idSprint;
      const idIssue = sprintIssue.idIssue;

      if (!sprintIssuesMap[idSprint]) {
        sprintIssuesMap[idSprint] = [];
      }

      sprintIssuesMap[idSprint].push(idIssue);
    });

    sprints.forEach((sprint) => {
      const idSprint = sprint.idSprint;
      const sprintIssues = sprintIssuesMap[idSprint] || [];

      sprint.issues = issues.filter((issue) =>
        sprintIssues.includes(issue.idIssue)
      );
    });

    // Relating epica and sprintIssuesMap
    const epicaSprintsMap = {};

    sprintEpicas.forEach((sprintEpica) => {
      const idEpica = sprintEpica.idEpica;
      const idSprint = sprintEpica.idSprint;

      if (!epicaSprintsMap[idEpica]) {
        epicaSprintsMap[idEpica] = [];
      }

      const relatedSprints = sprints.find(
        (sprint) => sprint.idSprint === idSprint
      );

      if (relatedSprints) {
        epicaSprintsMap[idEpica].push(relatedSprints);
      }
    });

    filteredEpica.forEach((filteredEpica) => {
      const idEpica = filteredEpica.idEpica;
      const epicaSprints = epicaSprintsMap[idEpica] || [];

      filteredEpica.sprints = epicaSprints;
    });

    res.render(
      path.join(__dirname, "../views/static/epicas/verMetricasEpicas.ejs"),
      {
        epicas: filteredEpica,
        sprints: sprintNames,
      }
    );
  } catch (error) {
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), { error });
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

    const latestSprint = sprints[0];

    // Filtering epicas for the latest sprint
    const filteredEpica = epicas.filter((epica) => {
      const epicId = epica.idEpica;

      const sprintEpica = sprintEpicas.find(
        (sprintEpica) => sprintEpica.idEpica === epicId && sprintEpica.idSprint === latestSprint.idSprint
      );

      return sprintEpica !== undefined;
    });

    // Relating sprints and issues
    const sprintIssuesMap = {};

    sprintIssues.forEach((sprintIssue) => {
      const idSprint = sprintIssue.idSprint;
      const idIssue = sprintIssue.idIssue;

      if (!sprintIssuesMap[idSprint]) {
        sprintIssuesMap[idSprint] = [];
      }

      sprintIssuesMap[idSprint].push(idIssue);
    });

    sprints.forEach((sprint) => {
      const idSprint = sprint.idSprint;
      const sprintIssues = sprintIssuesMap[idSprint] || [];

      sprint.issues = issues.filter((issue) =>
        sprintIssues.includes(issue.idIssue)
      );
    });

    // Relating epica and sprintIssuesMap
    const epicaSprintsMap = {};

    sprintEpicas.forEach((sprintEpica) => {
      const idEpica = sprintEpica.idEpica;
      const idSprint = sprintEpica.idSprint;

      if (!epicaSprintsMap[idEpica]) {
        epicaSprintsMap[idEpica] = [];
      }

      const relatedSprints = sprints.find(
        (sprint) => sprint.idSprint === idSprint
      );

      if (relatedSprints) {
        epicaSprintsMap[idEpica].push(relatedSprints);
      }
    });

    filteredEpica.forEach((filteredEpica) => {
      const idEpica = filteredEpica.idEpica;
      const epicaSprints = epicaSprintsMap[idEpica] || [];

      filteredEpica.sprints = epicaSprints;
    });


    res.status(200).json({ epicas: filteredEpica });
  } catch (error) {
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), { error });
  }
};