/**
 * @file jiraIssues.api.js
 * @brief This file contains the controller for the jira issues
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

/**
 * @brief
 * Gets the board ID from a Jira board name
 * @param {*} jiraUrl - Jira URL to access the API
 * @param {*} jiraUser - Jira user to access the API
 * @param {*} apiToken - Jira API token to access the API
 * @param {*} projectKey - Jira project key to access the API
 */
async function getBoardID(jiraUrl, jiraUser, apiToken, projectKey) {
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
      responseType: "json",

      validateStatus: function (status) {
        return status >= 200 && status < 300
      },
    })

    const boardId = response.data.issues[0].fields["customfield_10104"].id

    return boardId
  } catch (error) {
    throw new Error("Error getting the board ID")
  }
}

/**
 * @brief
 * Gets the maximum number of issues to request based on a board
 * and sprint type
 * @param {*} sprintID - Sprint ID to get the maximum number of issues
 * @param {*} jiraUrl - Jira URL to access the API
 * @param {*} jiraUser - Jira user to access the API
 * @param {*} apiToken - Jira API token to access the API
 * @param {*} projectKey - Jira project key to access the API
 * @returns {int} - Maximum number of issues
 */
async function getMaxResults(
  sprintID,
  jiraUrl,
  jiraUser,
  apiToken,
  projectKey
) {
  try {
    // Board information
    const boardID =
      (await getBoardID(jiraUrl, jiraUser, apiToken, projectKey)) || 0

    const boardResponse = await axios.get(
      `${jiraUrl}/rest/agile/1.0/board/${boardID}/sprint`,
      {
        auth: {
          username: jiraUser,
          password: apiToken,
        },
        headers: {
          Accept: "application/json",
        },

        responseType: "json",

        validateStatus: function (status) {
          return status >= 200 && status < 300
        },
      }
    )

    const maxResults = boardResponse.data.maxResults || 1000

    // Sprint information
    const sprintResponse = await axios.get(
      `${jiraUrl}/rest/agile/1.0/sprint/${sprintID}`,
      {
        auth: {
          username: jiraUser,
          password: apiToken,
        },
        headers: {
          Accept: "application/json",
        },
        responseType: "json",

        validateStatus: function (status) {
          return status >= 200 && status < 300
        },
      }
    )

    const issuesTotal = sprintResponse.data.contents.issuesTotal || 0
    const maxResultsPerRequest =
      sprintResponse.data.contents.maxResultsPerRequest

    // Calculating the max number of results to request
    const maxResultsFromSprint =
      issuesTotal < maxResultsPerRequest ? issuesTotal : maxResultsPerRequest
    const maxResultsFromBoard =
      maxResults < maxResultsFromSprint ? maxResults : maxResultsFromSprint

    return maxResultsFromBoard
  } catch (error) {
    throw new Error("Error getting the maximum number of issues")
  }
}

/**
 * @brief
 * Fetches the Jira issues from Zebrands Jira board.
 * @name GET /jiraIssues - Fetch Jira Issues
 * @param {String} sprintType - Sprint type ("open" or "closed")
 * @return {Object} - Returns the Jira Issues
 */
exports.getJiraIssuesFromSprint = async (sprintType) => {
  const jiraUrl = process.env.JIRA_URL
  const jiraUser = process.env.JIRA_USER
  const apiToken = process.env.JIRA_API_TOKEN

  const jql = `project = TPECG AND sprint in ${sprintType}Sprints()`

  const boardID = await getBoardID(jiraUrl, jiraUser, apiToken, "TPECG")

  try {
    const response = await axios.get(`${jiraUrl}/rest/api/3/search`, {
      auth: {
        username: jiraUser,
        password: apiToken,
      },
      params: {
        jql,
        maxResults: 100,
        fields: [
          "parent", // Epics
          "summary",
          "status",
          "priority",
          "created",
          "resolutiondate",
          "labels",
          "customfield_10042", // Story points
          "customfield_10010", // Sprint
        ],
      },

      headers: {
        Accept: "application/json",
      },

      responseType: "json",

      validateStatus: function (status) {
        return status >= 200 && status < 300
      },
    })

    const outputData = response.data.issues

    const outputFormatted = outputData.map((output) => {
      return {
        key: output.key,
        summary: output.fields.summary,
        status: output.fields.status.name,
        priority: output.fields.priority?.name || "No priority",
        created: output.fields.created,
        resolutionDate: output.fields.resolutiondate,
        labels: output.fields.labels,
        storyPoints: output.fields.customfield_10042,
        sprints: output.fields?.customfield_10010 || "No sprint",
        epicas: output.fields?.parent?.fields || "No epica",
      }
    })

    // console.log(outputFormatted)
    return outputFormatted
  } catch (error) {
    console.log(error)
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
    const issuesOpenSprint = await this.getJiraIssuesFromSprint("open")
    const issuesClosedSprint = await this.getJiraIssuesFromSprint("closed")

    for (const issue of issuesOpenSprint) {
      const newIssue = new Issue({
        issueKey: issue.key,
        nombreIssue: issue.summary,
        storyPoints: issue.storyPoints,
        labelIssue: issue.labels.join(", "),
        prioridadIssue: issue.priority,
        estadoIssue: issue.status,
        fechaCreacion: issue.created,
        fechaFinalizacion: issue.resolutionDate,
      })

      const sprint = new Sprint({
        sprintName: issue.sprints[0].name,
        state: issue.sprints[0].state,
        boardID: issue.sprints[0].boardId,
        fechaCreacion: issue.sprints?.[0]?.startDate
          ? new Date(issue.sprints[0].startDate)
          : undefined,
        fechaFinalizacion: issue.sprints[0].endDate,
        idEpica: issue.epicas[0]?.status?.id || 0,
      })

      await newIssue.save()
      await sprint.save()
    }
  } catch (error) {
    console.log(error)
  }
}
