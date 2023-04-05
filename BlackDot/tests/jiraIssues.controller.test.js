/**
 * @file jiraIssues.controller.test.js
 * @brief This file contains the tests for the jira issues controller
 * @author Carlos Salguero
 * @date 2023-04-04
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const { getJiraIssues } = require("../Controllers/jiraIssues.controller")
const { saveIssuesToDB } = require("../Controllers/jiraIssues.controller")

describe("Jira Issues Controller", () => {
  describe("getJiraIssues", () => {
    /**
     * @brief
     * Unit test for the getJiraIssues function
     * @name GET /jiraIssues - Fetch Jira Issues
     * @param {String} "Returns a list of Jira issues from Zebrands" - Test name
     * @param {Function} (req, res) - Callback function
     * @return {Object} - Returns the Jira Issues
     */
    test("Returns a list of Jira issues from Zebrands", async () => {
      const req = {}
      const statusMock = jest.fn().mockReturnThis()
      const jsonMock = jest.fn()

      const res = {
        status: statusMock,
        json: jsonMock,
      }

      await getJiraIssues(req, res)
      saveIssuesToDB()

      expect(statusMock).toHaveBeenCalledWith(expect.any(Number))
      expect(jsonMock).toHaveBeenCalled()
    })

    test("Returns an error message when there's an error fetching Jira Issues", async () => {
      const req = {}
      const statusMock = jest.fn().mockReturnThis()
      const jsonMock = jest.fn()

      const res = {
        status: statusMock,
        json: jsonMock,
      }

      jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject())

      await getJiraIssues(req, res)

      expect(statusMock).toHaveBeenCalledWith(500)
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error: fetching jira issues",
      })
    })
  })

  describe("saveIssuesToDB", () => {
  })
})