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

// Sessions
const crypto = require("crypto")

/**
 * @brief
 * Generates a random string of characters i.e salt
 * @param {Number} length - Length of the random string
 * @returns {String} - The random string
 * @throws {TypeError} - If length is not a number
 * @throws {RangeError} - If length is less than 0
 * @throws {RangeError} - If length is greater than 2147483647
 * @throws {RangeError} - If length is not an integer
 * @throws {RangeError} - If length is not a safe integer
 */
const generateRandomString = (length) => {
  if (typeof length !== "number") {
    throw new TypeError("Expected a number")
  }

  if (length < 0) {
    throw new RangeError("Expected a number greater than 0")
  }

  if (length > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("Expected a safe integer")
  }

  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
}

const sessionSecret = generateRandomString(32)
process.env.SESSION_SECRET = sessionSecret

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

app.get("/auth", (req, res) => {
  res.render("../Views/Static/auth.ejs")
})

// Google Auth
const passport = require("passport")

// User object
let user = {}

// Passport config
app.use(passport.initialize())
app.use(passport.session())

// Success & Failure redirects
/**
 * @brief
 * Redirects to the main page if the user is authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const successRedirect = (req, res) => {
  res.redirect("/")
}

/**
 * @brief
 * Redirects to the auth page if the user is not authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const failureRedirect = (req, res) => {
  res.redirect("/auth")
}

// Serialize & Deserialize user
/**
 * @brief
 * Stores the user in the session
 * @param {Object} user - User object
 * @param {Function} done - Callback function
 * @returns {Function} - Callback function
 * @throws {Error} - If there is an error
 */
passport.serializeUser((user, done) => {
  try {
    done(null, user)
  } catch (error) {
    done(error)
  }
})

/**
 * @brief
 * Retrieves the user from the session
 * @param {Object} user - User object
 * @param {Function} done - Callback function
 * @returns {Function} - Callback function
 * @throws {Error} - If there is an error
 */
passport.deserializeUser((user, done) => {
  try {
    done(null, user)
  } catch (error) {
    done(error)
  }
})

// Google Strategy
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy

/**
 * @brief
 * Configures the Google Strategy
 * @param {Object} GoogleStrategy - Google Strategy object
 *
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },

    /**
     * @brief
     * Callback function for the Google Strategy
     * @param {String} accessToken - Access token
     * @param {String} refreshToken - Refresh token
     * @param {Object} profile - Profile object
     * @param {Function} done - Callback function
     * @returns {Function} - Callback function
     */
    function (accessToken, refreshToken, profile, done) {
      try {
        user = profile
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

/**
 * @brief
 * Redirects to the Google authentication page
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} passport.authenticate - Callback function
 * @returns {Function} - Callback function
 */
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

/**
 * @brief
 * Redirects to the main page if the user is authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} passport.authenticate - Callback function
 * @returns {Function} - Callback function
 */
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth",
  }),

  /**
   * @brief
   * Redirects to the main page if the user is authenticated
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Function} - Callback function
   */
  (req, res) => {
    res.redirect("/")
  }
)

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
