/**
 * @file server.js
 * @brief This file contains the server configuration
 * @author Yuna Chung
 * @author Carlos Salguero
 * @author Olimpia Garcia
 * @author Diego Sandoval
 * @author Diego Llaca
 * @author Ivan Paredes
 * @date 2023-03-31
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const express = require("express")
const app = express()
const bodyparser = require("body-parser")

// Dotenv config
require("dotenv").config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("public"))

// Routes
const main = require("./Routes/main.routes")

/**
 * @brief
 * Routes for the main section
 * @param {String} "/" - Route
 * @param {Function} main - Callback function
 */
app.use("/", main)

// Section routes
const actual = require("./routes/actual.routes")
/**
 * @brief
 * Routes for the actual section
 * @param {String} "/actual" - Route
 * @param {Function} actual - Callback function
 */
app.use("/actual", actual)

const historico = require("./routes/historico.routes")
/**
 * @brief
 * Route for the historico section
 * @param {String} "/historico" - Route
 * @param {Function} historico - Callback function
 */
app.use("/historico", historico)

// Starting the server
const PORT = 3000
const { getJiraIssues } = require("./utils/jiraIssues.api")

/**
 * @brief
 * Starts the server
 * @param {Number} PORT - Port number
 * @param {Function} () - Callback function
 * @returns {Function} - Callback function
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  getJiraIssues()
})
