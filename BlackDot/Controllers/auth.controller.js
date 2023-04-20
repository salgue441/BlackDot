/**
 * @file auth.controller.js
 * @brief Authentication controller
 * @author Oli Garcia
 * @date 2023-04-14
 * @version 1.0
 */

// Data Model & Util Functions
const authUtil = require("../Utils/auth")
const Empleado = require("../Models/empleado.model")
const empleadoRol = require("../Models/empleado-rol.model")

/**
 * @brief
 * Renders the log in
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @return {Function} res.render()
 */
const renderLogin = (req, res) => {
  if (req.session.currentUser) return res.redirect("/")

  res.locals.activeTeams = []
  res.locals.currentUser = null
  res.locals.currentTeam = null

  req.session.currentUser = null
  req.session.currentTeam = null
  req.session.activeTeams = []

  res.render("index", { title: "Login" })
}

/**
 * @brief
 * Log in API.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - Callback function
 */
const loginAPI = async (req, res, next) => {
  try {
    const { token } = req.body
    console.log(token)
    const data = await authUtil.verifyGoogleToken(token)

    const user = {
      idGoogleAuth: data.sub,
      googleEmail: data.email,
      primerNombre: data.given_name,
      apellidoPaterno: data.family_name,
      googleProfilePicture: data.picture,
    }
    console.log("este es el user:")
    console.log(user)

    // Creating tokens
    const authToken = authUtil.createTokenLogin(user)
    const refreshToken = authUtil.createRefreshToken(user)

    res.status(200).json({ authToken, refreshToken })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * @brief
 * Logout API. Calls the deleteSession
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const logoutAPI = (req, res) => {
  authUtil.deleteSession(req, res)
}

/**
 * @brief
 * Refreshes the token with a custom API
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - Callback function
 */
const refreshTokenAPI = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    console.log(refreshToken)
    const verified = authUtil.verifyToken(refreshToken, "refresh")

    // to finish primerNombre: verified.primerNombre
    const userData = {
      primerNombre: verified.primerNombre,
      segundoNombre: verified.segundoNombre,
      apellidoPaterno: verified.apellidoPaterno,
      apellidoMaterno: verified.apellidoMaterno,
      idGoogleAuth: verified.idGoogleAuth,
      googleEmail: verified.googleEmail,
      googleProfilePicture: verified.googleProfilePicture,
    }

    console.log(userData)

    // Blacklisting refresh token
    /*  const isBlacklisted = await authUtil.isBlacklisted(refreshToken)
 
         if (isBlacklisted)
             return authUtil.deleteSession(req, res)
 
         await authUtil.blacklistToken(refreshToken) */

    // Create tokens
    const authToken = authUtil.createTokenLogin(userData)
    const newRefreshToken = authUtil.createRefreshToken(userData)

    res.status(200).json({
      authToken,
      refreshToken: newRefreshToken,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = {
  renderLogin,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
}
