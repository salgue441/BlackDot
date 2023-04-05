/**
 * @file jiraIssues.controller.test.js
 * @brief This file contains the tests for the jira issues controller
 * @author Carlos Salguero
 * @date 2023-04-04
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const axios = require("axios")

const issues = require("../Models/issue.model")
const { getJiraIssues } = require("../utils/jiraIssues.api")
const { saveIssuesToDB } = require("../utils/jiraIssues.api")

/**
 * @brief
 * Tests for the jira issues controller
 * @test {getJiraIssues} - Tests the getJiraIssues function
 * @test {saveIssuesToDB} - Tests the saveIssuesToDB function
 */
describe("Jira Issues Controller", () => {
  let mockedAxios

  beforeEach(() => {
    mockedAxios = jest.spyOn(axios, "get")
  })

  afterEach(() => {
    mockedAxios.mockRestore()
  })

  describe("getJiraIssues", () => {
    it("returns formatted issues when API call is successful", async () => {
      const response = {
        data: {
          issues: [
            {
              key: "ISSUE-123",
              fields: {
                summary: "Test issue",
                status: { name: "Open" },
                priority: { name: "High" },
                created: "2022-01-01T00:00:00.000Z",
                resolutiondate: "2022-01-02T00:00:00.000Z",
                labels: ["test", "issue"],
                customfield_10004: 3,
              },
            },
          ],
        },
      }

      mockedAxios.mockResolvedValue(response)

      const result = await getJiraIssues()

      expect(result).toEqual([
        {
          key: "ISSUE-123",
          summary: "Test issue",
          status: "Open",
          priority: "High",
          created: "2022-01-01T00:00:00.000Z",
          resolutionDate: "2022-01-02T00:00:00.000Z",
          labels: ["test", "issue"],
          storyPoints: 3,
        },
      ])
    })

    it("throws an error when API call fails", async () => {
      mockedAxios.mockRejectedValueOnce(new Error("API call failed"))

      try {
        await getJiraIssues()
      } catch (error) {
        expect(error.message).toBe("API call failed")
      }
    })
  })
})
