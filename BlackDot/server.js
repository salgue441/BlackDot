/**
 * @file server.js
 * @brief Main file of the server. It contains the configuration of the server
 * @author Carlos Salguero
 * @author Yuna Chung
 * @author Olimpia Garcia
 * @author Diego Sandoval
 * @author Diego Llaca
 * @version 1
 * @date 2023-03-31
 * 
 * @copyright Copyright 2023 - MIT License
 */
// Dotenv
require('dotenv').config();

// Dependencies
const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// App
const app = express();
const PORT = 3000

// Middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieparser())
app.use(cors({
  origin: ["https://padawan-0.laing.mx", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// View engine & static files
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "/src/views"))
app.use(express.static('public'))

// Session
/**
 * @brief
 * Session middleware. It creates a session for the user
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next function
 * @return {Object} Response object with error message
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
  })
)

// Locals
/**
 * @brief
 * Locals middleware. It checks if there is a user logged in and 
 * saves it in the locals
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next function
 * @return {Object} Response object with error message
 */
app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser
  }

  next()
})




// Routes
const initRoutes = require('./src/routes/index.routes')
initRoutes(app)


const { roles } = require('./src/middlewares/roles.middleware')
app.use(roles)

// 404 Error
/**
 * @brief
 * 404 Error handler
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next function
 * @returns {Object} Response object with error message
 */
app.get('*', (req, res) => {
  res.render(path.join(__dirname, './src/views/static/404/404.ejs'))
})

// Server
/**
 * @brief
 * Starts the server. The first time it saves the issues to the database.
 * Then, it saves on 00:00:00 and 12:00:00 every day.
 * @param {Number} PORT Port number
 * @param {Function} callback Callback function
 * @returns {Object} Response object with error message
 */
const { saveIssuesToDB } = require('./src/utils/jiraIssues.api')
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)

  // Save issues to DB
  await saveIssuesToDB()

  // Save issues to DB every 12 hours
  setInterval(async () => {
    await saveIssuesToDB()
  }, 43200000)
})