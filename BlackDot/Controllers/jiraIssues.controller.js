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
 * Route to fetch Jira Issues.
 * @name GET /jiraIssues - Fetch Jira Issues
 * @return {Object} - Returns the Jira Issues
 */
exports.getJiraIssues = async () => {
  
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
