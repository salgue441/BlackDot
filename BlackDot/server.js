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
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()

// Dotenv config
require("dotenv").config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("public"))
app.use(cookieParser())

const path = require("path");

// /auth
/**
 * @brief
 * Routes for the auth section
 * @param {String} "/auth" - Route
 * @param {Function} auth - Callback function
 */
const auth = require("./Routes/auth.routes")
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: true,
      secure: true
    }
  })
)

// Section routes
/**
 * @brief
 * Routes for the main section
 * @param {String} "/" - Route
 * @param {Function} main - Callback function
 */
const main = require("./Routes/main.routes")
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
const historico = require("./Routes/historico.routes")
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
  res.render(path.join(__dirname, "/Views/Static/404.ejs"),
  )
})

// Starting the server
const PORT = 3000
const { saveIssuesToDB } = require("./Utils/jiraIssues.api")

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

  saveIssuesToDB()

  // if time is 00:00:00
  if (new Date().getHours() === 0) {
    saveIssuesToDB()
  }
})
