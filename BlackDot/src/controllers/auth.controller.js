/**
 * @file auth.controller.js
 * @brief Authentication controller. Renders the login page and handles the
 * login API endpoint.
 * @author Carlos Salguero
 * @version 1.0
 * @date 2023-05-01 
 * 
 * @copyright Copyright 2023 (c) - MIT License
 */
const path = require('path');
const bycript = require('bcryptjs');

// Utils
const authUtils = require('../utils/auth')

// Models
const Empleado = require('../models/empleado.model');
const EmpleadoRol = require('../models/empleadoRol.model');
const Rol = require('../models/rol.model')

// Functions
/**
 * @brief
 * Renders the login page. If the user exists, redirects to home.
 * @param {*} req Request object
 * @param {*} res Response object
 * @returns {Object} Response object
 */
const renderLogin = (req, res) => {
  if (req.session.currentUser) return res.redirect('/home')

  // locals & session
  res.locals.currentUser = null
  req.session.currentUser = null

  // Render
  res.render(path.join(__dirname, '../views/static/auth/auth.ejs'))
}

/**
 * @brief 
 * Log in API endpoint. Verifies if the user already exists in the database.
 * If it doesn't, it creates a new user. Then, it creates a new session and
 * returns the session data.
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next function
 * @returns {Object} Response object with session data
 */
const loginAPI = async (req, res, next) => {
  try {
    const { token } = req.body
    const data = await authUtils.verifyGoogleToken(token)
    const user = await Empleado.getByEmail(data.email)

    if (!user) {
      const newUser = new Empleado({
        primerNombre: data.given_name.split(" ")[0],
        segundoNombre: data.given_name.split(" ")[1] || null,
        apellidoPaterno: data.family_name.split(" ")[0],
        apellidoMaterno: data.family_name.split(" ")[1] || null,
        idGoogleAuth: bycript.hashSync(data.sub, 12),
        googleEmail: data.email,
        googleProfilePicture: data.picture,
      })

      const newEmployee = await newUser.save()
      newUser.idEmpleado = newEmployee.idEmpleado

      // Role (default: 3 - No Role)
      const newEmployeeRole = new EmpleadoRol({
        idEmpleado: newEmployee.idEmpleado,
        idRol: 3,
      })

      await newEmployeeRole.save()
    }

    // Getting the role of the user
    const userRole = await EmpleadoRol.getByIDE(user.idEmpleado)
    const roleName = await Rol.getByID(userRole.idRol)

    const userData = {
      primerNombre: data.given_name,
      apellidoPaterno: data.family_name,
      googleEmail: data.email,
      idGoogleAuth: data.sub,
      googleProfilePicture: data.picture,
      idRole: userRole.idRol,
      roleName: roleName.nombreRol,
    }

    // session
    req.session.currentUser = userData

    // tokens
    const authToken = authUtils.createTokenLogin(userData)
    const refreshToken = authUtils.createTokenRefresh(userData)

    res.status(200).json({ authToken, refreshToken })
  }
  catch (error) {
    const errorMessage = error.message.split(" ");
    errorMessage.pop();

    if (errorMessage.join(" ") === "Invalid token signature:") {
      return res.status(401).json({ message: "Acceso denegado" });
    }

    next(error);
  }
}

/**
 * @brief
 * Refreshes the current session. If the session is valid, it returns a new
 * session and refresh token.
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next function
 * @returns {Object} Response object with session data
 */
const refreshTokenAPI = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    const verified = authUtils.verifyToken(refreshToken, "refresh")
    let user = null

    // Check if the user exists
    try {
      user = await Empleado.getByEmail(verified.googleEmail)
    } catch (error) {
      return res.status(500).json({
        message: "Error al verificar el token de refresco"
      })
    }

    // User role data & session data
    const userRole = await EmpleadoRol.getByIDE(user.idEmpleado)
    const roleName = await Rol.getByID(userRole.idRol)

    const userData = {
      primerNombre: verified.primerNombre,
      apellidoPaterno: verified.apellidoPaterno,
      googleEmail: verified.googleEmail,
      idGoogleAuth: verified.idGoogleAuth,
      googleProfilePicture: verified.googleProfilePicture,
      idRole: userRole.idRol,
      roleName: roleName.nombreRol,
    }

    // Refreshing the tokens
    const authToken = authUtils.createTokenLogin(userData)
    const newRefreshToken = authUtils.createTokenRefresh(userData)

    // session
    req.session.currentUser = userData

    // Response
    res.status(200).json({ authToken, refreshToken: newRefreshToken })
  }
  catch (error) {
    console.log(error)
    next(error)
  }
}

/**
 * @brief 
 * Deletes the current session.
 * @param {*} req Request object
 * @param {*} res Response object
 */
const logoutAPI = async (req, res) => {
  authUtils.deleteSession(req, res)
}

module.exports = {
  renderLogin,
  loginAPI,
  refreshTokenAPI,
  logoutAPI
}