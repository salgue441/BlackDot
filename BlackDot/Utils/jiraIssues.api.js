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
const Issue = require("../models/issue.model")

/**
 * @brief
 * Fetches the Jira issues from Zebrands Jira board.
 * @name GET /jiraIssues - Fetch Jira Issues
 * @return {Object} - Returns the Jira Issues
 */
exports.getJiraIssues = async () => {
  const jiraUrl = process.env.JIRA_URL
  const jiraUser = process.env.JIRA_USER
  const apiToken = process.env.JIRA_API_TOKEN
  const maxResults = 50
  let startAt = 0
  const existingIssues = new Set()
  const allIssues = []

  try {
    while (true) {
      const response = await axios.get(`${jiraUrl}/rest/api/3/search`, {
        auth: {
          username: jiraUser,
          password: apiToken,
        },
        params: {
          jql: "project = TPECG",
          maxResults,
          startAt,
          fields: [
            "summary",
            "status",
            "priority",
            "created",
            "resolutiondate",
            "labels",
            "customfield_10004",
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

      const issues = response.data.issues

      if (issues.length === 0) {
        break
      }

      const issuesFormatted = issues
        .filter((issue) => !existingIssues.has(issue.key))
        .map((issue) => {
          existingIssues.add(issue.key)
          return {
            key: issue.key,
            summary: issue.fields.summary,
            status: issue.fields.status.name,
            priority: issue.fields.priority?.name || "Sin prioridad",
            created: issue.fields.created,
            resolutionDate: issue.fields.resolutiondate,
            labels: issue.fields.labels,
            storyPoints: issue.fields.customfield_10042,
          }
        })

      allIssues.push(...issuesFormatted)

      startAt += maxResults
    }

    console.log(allIssues)
    return allIssues
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
    const issues = await this.getJiraIssues()

    issues.forEach(async (issue) => {
      const newIssue = new Issue({
        issueKey: issue.key,
        nombreIssue: issue.summary,
        storyPoints: issue.storyPoints,
        labelIssue: issue.labels,
        prioridadIssue: issue.priority,
        estadoIssue: issue.status,
        fechaCreacion: issue.created,
        fechaResolucion: issue.resolutionDate,
      })

      await newIssue.save()
    })
  } catch (error) {
    console.log(error)
  }
}