const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("../Views/Static/auth.ejs")
})

// Google Auth
const passport = require("passport")

// User object
let user = {}

// Passport config
router.use(passport.initialize())
router.use(passport.session())

// Success & Failure redirects
/**
 * @brief
 * Redirects to the main page if the user is authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const successRedirect = (req, res) => {
  res.redirect("/home")
}

/**
 * @brief
 * Redirects to the auth page if the user is not authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const failureRedirect = (req, res) => {
  res.redirect("/")
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
router.get(
  "/google",
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
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),

  /**
   * @brief
   * Redirects to the main page if the user is authenticated
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Function} - Callback function
   */
  (req, res) => {
    successRedirect(req, res)
  }
)

/**
 * @brief
 * Protects certain routes and allows access only to authenticated users.
 * If the user is not authenticated, redirects to the auth page
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Callback function
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect(failureRedirect(req, res))
}

module.exports = router
