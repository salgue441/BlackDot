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
const axios = require("axios");
const Bottleneck = require("bottleneck");

// Data Models
const Issue = require("../models/issue.model");
const Sprint = require("../models/sprint.model");
const Epica = require("../models/epica.model");
const SprintIssue = require("../models/sprintIssue.model");
const SprintEpica = require("../models/sprintEpica.model");

// Auxiliar functions
/**
 * @brief
 * Creates a new limiter for the API requests. Prevents error 429.
 * @param {Number} minTime - Time in milliseconds
 */
const limiter = new Bottleneck({
  minTime: 0,
});

// Wrapping axios
const rateLimitedAxios = {
  get: limiter.wrap(axios.get.bind(axios)),
  post: limiter.wrap(axios.post.bind(axios)),
};

// Jira API
/**
 * @brief
 * Fetches the boardID from the Jira API.
 * @param {String} jiraURL - Jira URL from the .env file
 * @param {String} jiraUser - Jira user from the .env file
 * @param {String} apiToken - Jira API token from the .env file
 * @param {String} projectKey - Jira project key from the .env file
 * @param {String} jiraBoard - Jira board name from the .env file
 * @returns {Number} boardID - Jira board ID
 * @throws {Error} - If the board is not found
 * @throws {Error} - If the project is not found
 * @throws {Error} - If the user is not found
 * @throws {Error} - If the API token is not found
 * @throws {Error} - If the Jira URL is not found
 */
const getBoardID = async (
  jiraUrl,
  jiraUser,
  apiToken,
  projectKey,
  jiraBoard
) => {
  try {
    const {
      data: { values: boards },
    } = await rateLimitedAxios.get(`${jiraUrl}/rest/agile/1.0/board`, {
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
        return status >= 200 && status < 300;
      },
    });

    const board = boards.find((board) => board.name === jiraBoard);

    if (!board) {
      throw new Error("Board not found");
    }

    return board.id;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * @brief
 * Fetches the sprints associated with the boardID from the Jira API.
 * @param {String} jiraURL - Jira URL from the .env file
 * @param {String} jiraUser - Jira user from the .env file
 * @param {String} apiToken - Jira API token from the .env file
 * @param {String} projectKey - Jira project key from the .env file
 * @param {String} jiraBoard - Jira board name from the .env file
 */
const getSprints = async (
  jiraUrl,
  jiraUser,
  apiToken,
  projectKey,
  boardName
) => {
  try {
    const boardID = await getBoardID(
      jiraUrl,
      jiraUser,
      apiToken,
      projectKey,
      boardName
    );

    const response = await rateLimitedAxios.get(
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
          return status >= 200 && status < 300;
        },
      }
    );

    const sprints = response.data.values;

    if (sprints.length === 0)
      throw new Error(`No sprints found for ${boardName}`);

    // Use Promise.all() to fetch sprint details concurrently
    const sprintDetailsPromises = sprints.map((sprint) =>
      rateLimitedAxios.get(`${jiraUrl}/rest/agile/1.0/sprint/${sprint.id}`, {
        auth: {
          username: jiraUser,
          password: apiToken,
        },
        headers: {
          Accept: "application/json",
        },
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      })
    );

    const sprintDetailsResponses = await Promise.all(sprintDetailsPromises);

    const detailedSprints = sprintDetailsResponses.map(
      (response) => response.data
    );

    return detailedSprints;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * @brief
 * Gets the total number of issues from a sprint.
 * @param {String} jiraURL - Jira URL from the .env file
 * @param {String} jiraUser - Jira user from the .env file
 * @param {String} apiToken - Jira API token from the .env file
 * @param {String} projectKey - Jira project key from the .env file
 * @param {String} jiraBoard - Jira board name from the .env file
 */
const getIssuesCount = async (
  jiraUrl,
  jiraUser,
  apiToken,
  projectKey,
  boardName
) => {
  try {
    const sprints = await getSprints(
      jiraUrl,
      jiraUser,
      apiToken,
      projectKey,
      boardName
    );

    const sprintIssuesCountPromises = sprints.map(async (sprint) => {
      const sprintID = sprint.id;
      const sprintName = sprint.name;
      const sprintState = sprint.state;
      const sprintStartDate = sprint.startDate;
      const sprintEndDate = sprint.endDate;
      const originBoardID = sprint.originBoardId;

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
            return status >= 200 && status < 300;
          },
        }
      );

      const totalIssues = response.data.total;

      return {
        sprintID,
        sprintName,
        sprintState,
        sprintStartDate,
        sprintEndDate,
        originBoardID,
        totalIssues,
      };
    });

    const sprintIssuesCount = await Promise.all(sprintIssuesCountPromises);
    return sprintIssuesCount;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * @brief
 * Fetches the issues from a sprint in chunks of 1000.
 * @param {String} jiraURL - Jira URL from the .env file
 * @param {String} jiraUser - Jira user from the .env file
 * @param {String} apiToken - Jira API token from the .env file
 * @param {String} projectKey - Jira project key from the .env file
 * @param {String} jiraBoard - Jira board name from the .env file
 * @param {Number} startAt - The starting index of the issue to be fetched
 */
const fetchIssuesInChunks = async (
  sprintID,
  startAt,
  jiraUrl,
  jiraUser,
  apiToken,
  projectName
) => {
  try {
    const response = await rateLimitedAxios.get(
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
            "id",
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
          return status >= 200 && status < 300;
        },
      }
    );

    return response.data.issues;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * @brief
 * Fetches all the issues from all the sprints in a Jira board.
 * @returns {Array} - An array of objects containing the sprint ID and
 *                   the issues in the sprint
 */
const getJiraIssuesFromSprint = async () => {
  const jiraUrl = process.env.JIRA_URL;
  const jiraUser = process.env.JIRA_USER;
  const apiToken = process.env.JIRA_API_TOKEN;
  const projectName = process.env.JIRA_PROJECT_NAME;
  const boardName = process.env.JIRA_BOARD_NAME;

  try {
    const sprintIssuesCount = await getIssuesCount(
      jiraUrl,
      jiraUser,
      apiToken,
      projectName,
      boardName
    );

    const sprintIssuesPromises = sprintIssuesCount.map((sprint) =>
      fetchJiraIssuesFromSprint(
        sprint,
        jiraUrl,
        jiraUser,
        apiToken,
        projectName
      )
    );

    const sprintIssues = await Promise.all(sprintIssuesPromises);

    return sprintIssues;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * @brief
 * Fetches all the issues from a sprint.
 * @param {*} sprint - The sprint object
 * @param {*} jiraUrl - Jira URL from the .env file
 * @param {*} jiraUser - Jira user from the .env file
 * @param {*} apiToken - Jira API token from the .env file
 * @param {*} projectName - Jira project name from the .env file
 * @returns {Object} - An object containing the sprint ID and
 *                     the issues in the sprint
 */
const fetchJiraIssuesFromSprint = async (
  sprint,
  jiraUrl,
  jiraUser,
  apiToken,
  projectName
) => {
  try {
    const sprintID = sprint.sprintID;
    const issueCount = sprint.totalIssues;
    const chunkSize = 1000;
    const chunkCount = Math.ceil(issueCount / chunkSize);
    const startAts = Array.from(
      { length: chunkCount },
      (_, i) => i * chunkSize
    );

    const issueChunks = await Promise.allSettled(
      startAts.map((startAt) =>
        fetchIssuesInChunks(
          sprintID,
          startAt,
          jiraUrl,
          jiraUser,
          apiToken,
          projectName
        )
      )
    );

    const allIssues = issueChunks
      .filter((chunk) => chunk.status === "fulfilled")
      .flatMap((chunk) => chunk.value);

    const issuesFormatted = formatIssues(allIssues);
    const epicNames = new Set();
    let epic = [];

    for (let i = 0; i < issuesFormatted.length; i++) {
      if (!epicNames.has(issuesFormatted[i].epic?.fields?.summary)) {
        epicNames.add(issuesFormatted[i].epic?.fields?.summary);
        epic.push(issuesFormatted[i].epic);
      }
    }

    return {
      sprintID: sprint.sprintID,
      sprintName: sprint.sprintName,
      sprintState: sprint.sprintState,
      totalIssues: sprint.totalIssues,
      sprintStartDate: sprint.sprintStartDate,
      sprintEndDate: sprint.sprintEndDate,
      originBoardID: sprint.originBoardID,
      epic: epic,
      issues: issuesFormatted,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * @brief
 * Formats the issues to be saved in the database.
 * @param {*} issues - Issues to be formatted.
 * @returns {Array} - Formatted issues.
 */
const formatIssues = (issues) =>
  issues.map((issue) => ({
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status.name,
    priority: issue.fields.priority?.name || "None",
    created: issue.fields?.created || "None",
    resolutiondate: issue.fields.resolutiondate,
    labels: issue.fields.labels,
    storyPoints: issue.fields.customfield_10042,
    sprints: issue.fields?.customfield_10010 || "None",
    epic: issue.fields?.parent || null,
    id: issue.id,
  }));

/**
 * @brief
 * Saves the issues to the database.
 */
exports.saveIssuesToDB = async () => {
  try {
    const sprintIssuesData = await getJiraIssuesFromSprint();
    const processedData = new Set();

    for (const sprint of sprintIssuesData) {
      if (!processedData.has(sprint.sprintID)) {
        const newSprint = new Sprint({
          jiraID: sprint.sprintID,
          sprintName: sprint.sprintName,
          state: sprint.sprintState,
          boardID: sprint.originBoardID,
          fechaCreacion: new Date(sprint.sprintStartDate),
          fechaFinalizacion: new Date(sprint.sprintEndDate),
        });

        const savedSprint = await newSprint.save();
        processedData.add(sprint.sprintID);

        for (const epic of sprint.epic) {
          const newEpic = new Epica({
            jiraID: epic?.id,
            jiraKey: epic?.key,
            nombreEpica: epic?.fields?.summary,
          });

          if (newEpic.jiraID && newEpic.jiraKey && newEpic.nombreEpica) {
            const savedEpic = await newEpic.save();

            if (savedSprint.idSprint != null) {
              const newSprintEpic = new SprintEpica({
                idEpica: savedEpic.idEpica,
                idSprint: savedSprint.idSprint,
              });

              await newSprintEpic.save();
            }
          }
        }

        for (const issue of sprint.issues) {
          const newIssue = new Issue({
            issueKey: issue.key,
            nombreIssue: issue.summary,
            storyPoints: issue.storyPoints,
            labelIssue: issue.labels.join(","),
            prioridadIssue: issue.priority,
            estadoIssue: issue.status,
            fechaCreacion: new Date(issue.created),
            fechaFinalizacion: new Date(issue.resolutiondate),
          });

          const savedIssue = await newIssue.save();

          const newSprintIssue = new SprintIssue({
            idIssue: savedIssue.idIssue,
            idSprint: savedSprint.idSprint,
          });

          await newSprintIssue.save();
        }
      }
    }

    console.log("Fetch & Save completed successfully!")
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Testing

/**
 * @brief
 * Creates a new issue in the Jira board
 * @param {*} accionable - The accionable to be created
 */
exports.createAccionable = async (accionable) => {
  const jiraUrl = process.env.JIRA_URL;
  const jiraUser = process.env.JIRA_USER;
  const apiToken = process.env.JIRA_API_TOKEN;
  const projectName = process.env.JIRA_PROJECT_NAME;

  try {
    const auth = {
      username: jiraUser,
      password: apiToken,
    }

    const issue = {
      fields: {
        project: {
          key: projectName,
        },
        summary: accionable.nombreAccionable,
        description: accionable.descripcionAccionable,
        issuetype: {
          name: "Task",
        },
        priority: { name: 'Medium' },
        labels: ["Accionable"],
      }
    }

    const response = await rateLimitedAxios.post(`${jiraUrl}/rest/api/3/issue`, issue, { auth });
    console.log("New issue created: ", response.data);
    const issueID = response.data.id;

    const backlogResponse = await axios.post(`${jiraUrl}/rest/agile/1.0/backlog/issue`, { issues: [issueID] }, { auth });
    console.log("Issue added to backlog: ", backlogResponse.data);

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
