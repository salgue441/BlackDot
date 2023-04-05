/**
 * @file jiraIssues.controller.js
 * @brief This file contains the controller for the jira issues
 * @author Carlos Salguero
 * @date 2023-04-04
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */
const fetch = require("node-fetch")

/**
 * @brief
 * Route to fetch Jira Issues. This route is protected by the auth middleware.
 * The auth middleware will check if the user is authenticated and will return
 * a 401 if the user is not authenticated.
 * @name GET /jiraIssues - Fetch Jira Issues
 * @param {String} "/jiraIssues" - Route
 * @param {Function} (req, res) - Callback function
 * @return {Object} - Returns the Jira Issues
 */
exports.getJiraIssues = async (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Error: user not authenticated" })
  //     return
  //   }

  const jiraUrl = process.env.JIRA_URL
  const jiraUser = process.env.JIRA_USER
  const apiToken = process.env.JIRA_API_TOKEN

  // endPoint & query
  const apiEndPoint = "/rest/api/2/search"
  const jqlQuery = "assignee=currentUser()"

  // Fields to retrieve
  const fields =
    "summary,customfield_10002,labels,priority,status,created,resolutiondate"
  const maxResults = 1000

  // URL to fetch
  const apiUrl = `${jiraUrl}${apiEndPoint}?jql=${jqlQuery}&fields=${fields}&maxResults=${maxResults}`

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })

    const data = await response.json()
    const issues = data.issues.map((issue) => {
      return {
        key: issue.key,
        summary: issue.fields.summary,
        status: issue.fields.status.name,
        priority: issue.fields.priority.name,
        labels: issue.fields.labels,
        created: issue.fields.created,
        resolutionDate: issue.fields.resolutiondate,
        storyPoints: issue.fields.customfield_10002,
      }
    })

    res.json(issues)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error: fetching jira issues" })
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
    const issues = await getJiraIssues()
    const issuesModel = require("../models/issue.model")

    for (const issue of issues) {
      const issueNew = new issuesModel({
        idIssue: issue.key,
        nombreIssue: issue.summary,
        storyPoints: issue.storyPoints,
        labelIssue: issue.labels,
        prioridadIssue: issue.priority,
        estadoIssue: issue.status,
        fechaCreacion: issue.created,
        fechaFinalizacion: issue.resolutionDate,
      })

      await issueNew.save()
    }

    return issues
  } catch (error) {
    console.log(error)
  }
}
