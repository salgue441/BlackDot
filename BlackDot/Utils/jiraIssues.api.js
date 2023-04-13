/**
 * @file jiraIssues.api.js
 * @brief This file contains the controller for the jira issues.
 *        The functions are a part of the issues.model.js file.
 * @author Carlos Salguero
 * @date 2023-04-04
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */
const axios = require("axios")

// Data Models
const Issue = require("../models/issue.model")
const Sprint = require("../models/sprint.model")
const Epica = require("../Models/epica.model")
const Accionable = require("../models/accionable.model")

// Functions
/**
 * @brief
 * Fectches the Jira board ID from the Jira project name.
 * @param {String} jiraUrl - Jira URL
 * @param {String} jiraUser - Jira user
 * @param {String} apiToken - Jira API token
 * @param {String} projectName - Jira project name
 * @param {String} boardName - Jira board name
 * @returns {String} - Returns the Jira board ID
 */
const getBoardID = async (
  jiraUrl,
  jiraUser,
  apiToken,
  projectKey,
  boardName
) => {
  try {
    const response = await axios.get(`${jiraUrl}/rest/agile/1.0/board`, {
      auth: {
        username: jiraUser,
        password: apiToken,
      },

      params: {
        projectKeyOrId: projectKey,
      },

      headers: {
        Accept: "application/json",
      },

      validateStatus: (status) => {
        return status >= 200 && status < 300
      },
    })

    const boards = response.data.values
    const board = boards.find((board) => board.name === boardName)

    if (!board) {
      throw new Error("Board not found")
    }

    return board.id
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * @brief
 * Gets the sprints associated with the Jira board.
 * @param {String} jiraUrl - Jira URL
 * @param {String} jiraUser - Jira user
 * @param {String} apiToken - Jira API token
 */
const getSprints = async (
  jiraUrl,
  jiraUser,
  apiToken,
  projectName,
  boardName
) => {
  try {
    const boardID = await getBoardID(
      jiraUrl,
      jiraUser,
      apiToken,
      projectName,
      boardName
    )

    const response = await axios.get(
      `${jiraUrl}/rest/agile/1.0/board/${boardID}/sprint`,
      {
        auth: {
          username: jiraUser,
          password: apiToken,
        },

        headers: {
          Accept: "application/json",
        },

        validateStatus: (status) => {
          return status >= 200 && status < 300
        },
      }
    )

    const sprints = response.data.values

    if (sprints.length === 0) {
      throw new Error(`No sprints found for board ${boardName}`)
    }

    return sprints
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * @brief
 * Gets the total number of issues per sprint
 * @param {String} jiraUrl - Jira URL
 * @param {String} jiraUser - Jira user
 * @param {String} apiToken - Jira API token
 * @param {String} projectName - Jira project name
 * @param {String} boardName - Jira board name
 * @returns {Array} - Returns an array of objects containing the sprint ID,
 * sprint name, sprint state, and total number of issues
 */
const getTotalNumberOfIssuesPerSprint = async (
  jiraUrl,
  jiraUser,
  apiToken,
  projectName,
  boardName
) => {
  try {
    const sprints = await getSprints(
      jiraUrl,
      jiraUser,
      apiToken,
      projectName,
      boardName
    )

    const sprintIssues = []

    for (let i = 0; i < sprints.length; i++) {
      const sprint = sprints[i]
      const sprintID = sprint.id
      const sprintName = sprint.name
      const sprintState = sprint.state
      const sprintStartDate = sprint.startDate
      const sprintEndDate = sprint.endDate
      const originBoardID = sprint.originBoardId

      const response = await axios.get(
        `${jiraUrl}/rest/agile/1.0/sprint/${sprintID}/issue?maxResults=1000`,
        {
          auth: {
            username: jiraUser,
            password: apiToken,
          },

          params: {
            maxResults: 1000,
          },

          headers: {
            Accept: "application/json",
          },

          validateStatus: (status) => {
            return status >= 200 && status < 300
          },
        }
      )

      const totalIssues = response.data.total

      sprintIssues.push({
        sprintID,
        sprintName,
        sprintState,
        totalIssues,
        sprintStartDate,
        sprintEndDate,
        originBoardID,
      })
    }

    return sprintIssues
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * @brief
 * Fetches the Jira issues from the sprints in the Jira board.
 * @name GET /jiraIssues - Fetch Jira Issues
 * @param {String} sprintType - Sprint type ("active" or "closed")
 * @return {Object} - Returns the Jira Issues
 */
exports.getJiraIssuesFromSprint = async (sprintType) => {
  const jiraUrl = process.env.JIRA_URL
  const jiraUser = process.env.JIRA_USER
  const apiToken = process.env.JIRA_API_TOKEN
  const projectName = process.env.JIRA_PROJECT_NAME
  const boardName = process.env.JIRA_BOARD_NAME

  try {
    const sprintIssues = await getTotalNumberOfIssuesPerSprint(
      jiraUrl,
      jiraUser,
      apiToken,
      projectName,
      boardName
    )

    const sprintArray = []
    const addedSprintIDs = new Set()

    for (let i = 0; i < sprintIssues.length; i++) {
      const sprint = sprintIssues[i]

      if (sprint.sprintState !== sprintType) continue

      const sprintID = sprint.sprintID
      if (addedSprintIDs.has(sprintID)) continue

      let startAt = 0
      let issues = []

      do {
        const response = await axios.get(
          `${jiraUrl}/rest/agile/1.0/sprint/${sprintID}/issue`,
          {
            auth: {
              username: jiraUser,
              password: apiToken,
            },
            params: {
              jql: `project = ${projectName} AND sprint = ${sprintID} ORDER BY created DESC`,
              maxResults: 1000,
              fields: [
                "parent", // Epics
                "summary",
                "status",
                "priority",
                "created",
                "resolutiondate",
                "labels",
                "customfield_10042", // Story Points
                "customfield_10010", // Sprint
              ],
              startAt,
            },
            headers: {
              Accept: "application/json",
            },
            validateStatus: (status) => {
              return status >= 200 && status < 300
            },
          }
        )

        issues = response.data.issues
        const issuesFormatted = issues.map((issue) => {
          return {
            key: issue.key,
            summary: issue.fields.summary,
            status: issue.fields.status.name,
            priority: issue.fields.priority?.name || "None",
            created: issue.fields.created,
            resolutiondate: issue.fields.resolutiondate,
            labels: issue.fields.labels,
            storyPoints: issue.fields.customfield_10042,
            sprints: issue.fields?.customfield_10010 || "None",
            epic: issue.fields?.parent?.fields || "None",
          }
        })

        sprintArray.push({
          sprintID: sprint.sprintID,
          sprintName: sprint.sprintName,
          sprintState: sprint.sprintState,
          totalIssues: sprint.totalIssues,
          sprintStartDate: sprint.sprintStartDate,
          sprintEndDate: sprint.sprintEndDate,
          originBoardID: sprint.originBoardID,
          issues: issuesFormatted,
        })

        startAt += issues.length
      } while (issues.length > 0 && startAt < sprint.totalIssues)

      addedSprintIDs.add(sprintID)
    }

    return sprintArray
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * @brief
 * Calls the dataBase table corresponding to the jira issue
 * and saves the data in the table
 * @param {}
 */
exports.saveIssuesToDB = async () => {
  try {
    const activesIssues = await exports.getJiraIssuesFromSprint("active")
    const closedIssues = await exports.getJiraIssuesFromSprint("closed")

    // Saving active sprints
    const processedDataActive = new Set()

    for (const sprint of activesIssues) {
      if (!processedDataActive.has(sprint.sprintID)) {
        const newSprint = new Sprint({
          jiraID: sprint.sprintID,
          sprintName: sprint.sprintName,
          state: sprint.sprintState,
          boardID: sprint.originBoardID,
          FechaCreacion: sprint.sprintStartDate,
          FechaFinalizacion: sprint.sprintEndDate,
        })

        await newSprint.save()
        processedDataActive.add(sprint.sprintID)

        for (const issue of sprint.issues) {
          const newIssue = new Issue({
            issueKey: issue.key,
            nombreIssue: issue.summary,
            storyPoints: issue.storyPoints,
            labelIssue: issue.labels.join(","),
            prioridadIssue: issue.priority,
            estadoIssue: issue.status,
            fechaCreacion: issue.created,
            fechaFinalizacion: issue.resolutiondate,
            idEpica: issue.epic.key,
          })

          await newIssue.save()
        }
      }
    }

    // Saving closedIssues
    const processedDataClosed = new Set()

    for (const sprint of closedIssues) {
      if (!processedDataClosed.has(sprint.sprintID)) {
        const newSprint = new Sprint({
          jiraID: sprint.sprintID,
          sprintName: sprint.sprintName,
          state: sprint.sprintState,
          boardID: sprint.originBoardID,
          FechaCreacion: sprint.sprintStartDate,
          FechaFinalizacion: sprint.sprintEndDate,
        })

        await newSprint.save()
        processedDataClosed.add(sprint.sprintID)

        for (const issue of sprint.issues) {
          const newIssue = new Issue({
            issueKey: issue.key,
            nombreIssue: issue.summary,
            storyPoints: issue.storyPoints,
            labelIssue: issue.labels.join(","),
            prioridadIssue: issue.priority,
            estadoIssue: issue.status,
            fechaCreacion: issue.created,
            fechaFinalizacion: issue.resolutiondate,
            idEpica: issue.epic.key,
          })

          await newIssue.save()
        }
      }
    }

    console.log("Issues saved to DB")
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * @brief
 * Creates a new Jira issue
 * @param {Object} accionable - Accionable object to be created
 */
exports.createAccionables = async (accionable) => {
  const jiraUrl = process.env.JIRA_URL
  const jiraUser = process.env.JIRA_USER
  const apiToken = process.env.JIRA_API_TOKEN
  const projectName = process.env.JIRA_PROJECT_NAME
  const boardName = process.env.JIRA_BOARD_NAME

  try {
    const response = await axios.post(
      `${jiraUrl}/rest/api/3/issue`,
      accionable,
      {
        auth: {
          username: jiraUser,
          password: apiToken,
        },

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        validateStatus: (status) => {
          if (status >= 400) {
            throw new Error("Error creating accionable")
          }

          return status >= 200 && status < 300
        },
      }
    )

    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
