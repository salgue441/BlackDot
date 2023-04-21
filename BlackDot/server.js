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
const cookieParser = require("cookie-parser")

// Model
const Accionable = require("./models/Accionable.model")

// Dotenv config
require("dotenv").config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("public"))
app.use(cookieParser())

// /auth
/**
 * @brief
 * Routes for the auth section
 * @param {String} "/auth" - Route
 * @param {Function} auth - Callback function
 */
const auth = require("./routes/auth.routes")
const authMiddleware = require("./middlewares/auth")

app.use("/auth", auth)

/**
 * @brief
 * Redirects to /auth if the user is not logged in
 * @param {String} "/" - Route
 * @param {Function} (req, res) - Callback function
 */
app.get("/", (req, res) => {
  res.redirect("/auth")
})

app.use(authMiddleware.validateTokenActive)

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

// Section routes
/**
 * @brief
 * Routes for the main section
 * @param {String} "/" - Route
 * @param {Function} main - Callback function
 */
const main = require("./routes/main.routes")
app.use(main)

/**
 * @brief
 * Routes for the actual section
 * @param {String} "/actual" - Route
 * @param {Function} actual - Callback function
 */
const actual = require("./Routes/actual.routes")
app.use("/actual", actual)

/**
 * @brief
 * Route for the historico section
 * @param {String} "/historico" - Route
 * @param {Function} historico - Callback function
 */
const historico = require("./routes/historico.routes")
app.use("/historico", historico)

/**
 * @brief
 * Routes for the editar section
 * @param {String} "/editar" - Route
 * @param {Function} editar - Callback function
 * @returns {Function} - Callback function
 * */

const editar = require("./Routes/editar.routes")
app.use("/editar", editar)

/**
 * @brief
 * 404 error page
 * @param {String} "*" - Route
 * @param {Function} (req, res) - Callback function
 * @returns {Function} - Callback function
 */
app.get("*", (req, res) => {
  // file in views/static/404.ejs
  res.render("static/404")
})

// Starting the server
const PORT = 3000
// const { saveIssuesToDB } = require("./utils/jiraIssues.api")
// const { createAccionable } = require("./utils/jiraIssues.api")

/**
 * @brief
 * Starts the server. The first time it saves the issues to the DB
 * and then it saves or updates the issues to the DB every day at 00:00:00
 * @param {Number} PORT - Port number
 * @param {Function} () - Callback function
 * @returns {Function} - Callback function
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)

  // first time save issues to DB when server starts
  // saveIssuesToDB()

  // const accionable = new Accionable({
  //   nombreAccionable: "Test",
  //   storyPoints: 1,
  //   labelAccionable: "Test",
  //   prioridadAccionable: "Highest",
  //   estadoAccionable: "To Do",
  //   estadoIssue: "To Do",
  //   fechaCreacion: "2021-08-01",
  //   fechaFinalizacion: "2021-08-01",
  // })

  // createAccionable(accionable)

  // if time is 00:00:00
  if (new Date().getHours() === 0) {
    saveIssuesToDB()
  }
})
