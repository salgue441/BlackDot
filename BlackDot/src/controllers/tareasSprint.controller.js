/**
 * @file tareasSprint.controller.js
 * @brief Controlador de tareas Sprint
 * @author Olimpia Garcia
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

// Data Models
const Issue = require("../models/issue.model")
const Sprint = require("../models/sprint.model")
const SprintIssue = require("../models/sprintIssue.model")
const retro = require("../models/retro.model")

const path = require("path")

/**
 * @brief
 * Landing page rout for the app
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 */
exports.getLanding = async (req, res) => {
  // Data arrays
  const issues = await Issue.getAll()
  const sprints = await Sprint.getAll()
  const sprintIssues = await SprintIssue.getAll()

  let retroActiva = await retro.getRetroActual()
  if (retroActiva) {
    retroActiva = true
  } else {
    retroActiva = false
  }

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

  res.render(path.join(__dirname, "../views/static/landing/index.ejs"), {
    sprint: sprints,
    retroActiva: retroActiva,
  })
}

/**
 * @brief
 * Sends the graph data in json format
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getLandingAPI = async (req, res) => {
  try {
    // Data arrays
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

    res.json({
      sprint: sprints,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener métricas épicas",
    })
  }
}