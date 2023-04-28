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

// Dotenv config
require("dotenv").config();

// Modules
const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

// App
const app = express();
const path = require("path");

// Port
const PORT = 3000;

// Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/Views/"));

// Static Files
app.use(express.static("public"));
app.use(cookieParser());

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
  })
);

// Routes
const initRoutes = require("./src/routes/index.routes");
initRoutes(app);

app.get("/", (req, res) => {
  res.redirect("/home");
});

/**
 * @brief
 * 404 error page
 * @param {String} "*" - Route
 * @param {Function} (req, res) - Callback function
 * @returns {Function} - Callback function
 */
app.get("*", (req, res) => {
  res.render("Static/404/404");
});

/**
 * @brief
 * Starts the server. The first time it saves the issues to the DB
 * and then it saves or updates the issues to the DB every day at 00:00:00
 * @param {Number} PORT - Port number
 * @param {Function} () - Callback function
 * @returns {Function} - Callback function
 */
const { saveIssuesToDB } = require("./src/utils/jiraIssues.api");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  saveIssuesToDB();

  // if time is 00:00:00
  if (new Date().getHours() === 0) {
    saveIssuesToDB();
  }
});
