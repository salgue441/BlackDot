/**
 * @file jiraIssues.controller.js
 * @brief This file contains the controller for the jira issues
 * @author Carlos Salguero
 * @date 2023-04-04
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const express = require("express")
const fetch = require("node-fetch")

const router = express.Router()

/**
 * @brief
 * Route to fetch Jira Issues
 * @param {String} "/jiraIssues" - Route
 * @param {Function} (req, res) - Callback function
 * @return {Object} - Returns the Jira Issues
 */
router.get("/jiraIssues", async (req, res) => {
  const jiraUrl = process.env.JIRA_URL
  const jiraUser = process.env.JIRA_USER
  const apiToken = process.env.JIRA_API_TOKEN

  // endPoint & query
  const apiEndPoint = "/rest/api/2/search"
  const jqlQuery = "assignee=currentUser()"

  // Fields to retrieve
  const fields = ""
  const maxResults = 1000

  // URL to fetch
    const url = `${jiraUrl}${apiEndPoint}?jql=${jqlQuery}&fields=${fields}&maxResults=${maxResults}`
    
    try {

    }
    catch (error) {
})
