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
const session = require("express-session")
const bodyparser = require("body-parser")
const path = require("path")

// Dotenv config
require("dotenv").config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("public"))

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

// Sessions
/**
 * @brief
 * Configures the session middleware
 * @param {Object} session - Session object
 * @param {Boolean} resave - Forces the session to be saved back to
 * the session store, even if the session was never modified during the request
 */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
)



// /auth
app.get("/", (req, res) => {
  res.redirect("/auth")
})

// Starting the server
const PORT = 3000
const { saveIssuesToDB } = require("./utils/jiraIssues.api")

/**
 * @brief
 * Starts the server
 * @param {Number} PORT - Port number
 * @param {Function} () - Callback function
 * @returns {Function} - Callback function
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  saveIssuesToDB()
})
