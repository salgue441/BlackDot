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

const path = require("path")

// Models
const Epica = require("../models/Epica.model")
const Issue = require("../models/issue.model")
const Sprint = require("../models/sprint.model")
const SprintIssue = require("../models/sprint-issue.model")

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
    const epicas = await Epica.getAll()
    const issues = await Issue.getAll()
    const sprints = await Sprint.getAll()
    const sprintIssues = await SprintIssue.getAll()

    // Relating sprints and issues
    const sprintIssuesMap = {}

    sprintIssues.forEach((sprintIssue) => {
      const sprintID = sprintIssue.idSprint
      const issueID = sprintIssue.idIssue

      if (!sprintIssuesMap[sprintID]) {
        sprintIssuesMap[sprintID] = []
      }

      sprintIssuesMap[sprintID].push(issueID)
    })

    sprints.forEach((sprint) => {
      const sprintID = sprint.idSprint
      const sprintIssues = sprintIssuesMap[sprintID] || []

      sprint.issues = issues.filter((issue) =>
        sprintIssues.includes(issue.idIssue)
      )
    })

    // Relating the Epicas and their sprints
    const epicasSprintsMap = {}

    sprints.forEach((sprint) => {
      const epicaID = sprint.idEpica

      if (!epicasSprintsMap[epicaID]) {
        epicasSprintsMap[epicaID] = []
      }

      epicasSprintsMap[epicaID].push(sprint)
    })

    epicas.forEach((epica) => {
      const epicaID = epica.idEpica
      const epicaSprints = epicasSprintsMap[epicaID] || []

      epica.sprints = epicaSprints
    })

    console.dir(sprints)

    res.render(
      path.join(__dirname, "../Views/Static/historico/verMetricasEpicas.ejs"),
      {
        epicas: epicas,
      }
    )
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}

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
    const epicas = await Epica.getAll()
    const issues = await Issue.getAll()
    const sprints = await Sprint.getAll()
    const sprintIssues = await SprintIssue.getAll()

    // Relating sprints and issues
    const sprintIssuesMap = {}

    sprintIssues.forEach((sprintIssue) => {
      const sprintID = sprintIssue.idSprint
      const issueID = sprintIssue.idIssue

      if (!sprintIssuesMap[sprintID]) {
        sprintIssuesMap[sprintID] = []
      }

      sprintIssuesMap[sprintID].push(issueID)
    })

    sprints.forEach((sprint) => {
      const sprintID = sprint.idSprint
      const sprintIssues = sprintIssuesMap[sprintID] || []

      sprint.issues = issues.filter((issue) =>
        sprintIssues.includes(issue.idIssue)
      )
    })

    // Relating the Epicas and their sprints
    const epicasSprintsMap = {}

    sprints.forEach((sprint) => {
      const epicaID = sprint.idEpica

      if (!epicasSprintsMap[epicaID]) {
        epicasSprintsMap[epicaID] = []
      }

      epicasSprintsMap[epicaID].push(sprint)
    })

    epicas.forEach((epica) => {
      const epicaID = epica.idEpica
      const epicaSprints = epicasSprintsMap[epicaID] || []

      epica.sprints = epicaSprints
    })

    res.json({ epicas: epicas })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}
