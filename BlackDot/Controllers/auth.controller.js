const path = require('path')

// Auth Utils
const authUtils = require('../Utils/auth')

// Data models
const Empleado = require('../Models/empleado.model')

// Functions
/**
 * @brief
 * Renders the login page 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Rendered login page
 */
const renderLogin = (req, res) => {
  // if (req.session.currentUser) return res.redirect('/')

  // req.locals.currentUser = null
  // req.session.currentUser = null

  return res.render(path.join(__dirname, '../Views/Static/auth.ejs'), {
    title: "Login",
  })
}

/**
 * @brief
 * Login API endpoint
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 * @returns {Object} Response object
 */
const loginAPI = async (req, res, next) => {
  try {
    const { token } = req.body
    const data = await authUtils.verifyGoogleToken(token)

    if (!data) {
      return res.status(401).json({ message: "Invalid token" })
    }

  } catch (error) {
    const errorMessage = error.message.split(" ")
    errorMessage.pop()

    if (errorMessage.join(" ") === "Invalid token signature: ") {
      req.session.errorMessage = "La sesión ha expirado"
      return res.status(401).json({ message: "La sesión ha expirado" })
    }

    next(error)
  }
}

/**
 * @brief
 * Refreshes the token with a new one
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 */
const refreshTokenAPI = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    const verified = authUtils.verifyToken(refreshToken, "refresh")

    const userData = {
      primerNombre: verified.primerNombre,
      segundoNombre: verified.segundoNombre,
      apellidoPaterno: verified.apellidoPaterno,
      apellidoMaterno: verified.apellidoMaterno,
      idGoogleAuth: verified.idGoogleAuth,
      googleEmail: verified.googleEmail,
      googleProfilePicture: verified.googleProfilePicture,
    }

    // Creating tokens
    const authToken = authUtils.createToken(userData)
    const newRefreshToken = authUtils.createRefreshToken(userData)

    res.status(200).json({ authToken, refreshToken: newRefreshToken })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  renderLogin,
  loginAPI,
  refreshTokenAPI
}
