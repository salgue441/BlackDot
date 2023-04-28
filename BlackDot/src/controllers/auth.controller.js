const path = require("path")
const bycript = require("bcryptjs")

// Auth Utils
const authUtils = require("../utils/auth")

// Data models
const Empleado = require("../models/empleado.model")
const EmpleadoRol = require("../models/empleadoRol.model")

// Functions
/**
 * @brief
 * Renders the login page
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Rendered login page
 */
const renderLogin = (req, res) => {
  if (req.session.currentUser) return res.redirect("/")

  return res.render(path.join(__dirname, "../views/static/auth/auth.ejs"), {
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

    const userData = {
      idGoogleAuth: data.sub,
      googleEmail: data.email,
      primerNombre: data.given_name,
      apellidoPaterno: data.family_name,
      googleProfilePicture: data.picture,
    }

    const authToken = authUtils.createTokenLogin(userData)
    const refreshToken = authUtils.createTokenRefresh(userData)

    res.status(200).json({ authToken, refreshToken })
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

let usuarioRegistrado = false
let refreshcantidad = 0

/**
 * @brief
 * Refreshes the token with a new one
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 */
const refreshTokenAPI = async (req, res, next) => {
  try {
    if (!usuarioRegistrado) {
      registrarEmpleado(req, res)
    }

    const { refreshToken } = req.body
    const verified = authUtils.verifyToken(refreshToken, "refresh")

    const userData = {
      name: verified.name,
      email: verified.email,
      id_google: verified.sub,
    }

    // Creating tokens
    const authToken = authUtils.createTokenLogin(userData)
    const newRefreshToken = authUtils.createTokenRefresh(userData)

    res.status(200).json({ authToken, refreshToken: newRefreshToken })
  } catch (error) {
    console.log("error: ", error)
    authUtils.deleteSession(req, res)
  }
}

const registrarEmpleado = async (req, res) => {
  const { refreshToken } = req.body
  const verified = authUtils.verifyToken(refreshToken, "refresh")

  // If name has more than one word, split it
  const name = verified.primerNombre ? verified.primerNombre.split(" ") : []
  const lastName = verified.apellidoPaterno ? verified.apellidoPaterno.split(" ") : []

  const userData = {
    primerNombre: name[0],
    segundoNombre: name[1] || null,
    apellidoPaterno: lastName[0],
    apellidoMaterno: lastName[1] || null,
    idGoogleAuth: bycript.hashSync(verified.idGoogleAuth, 12),
    googleEmail: verified.googleEmail,
    googleProfilePicture: verified.googleProfilePicture,
  }

  try {
    const validacion = await Empleado.verifyByEmail(userData.googleEmail)

    if (!validacion) {
      const nuevoEmpleado = new Empleado(userData)
      const empleado = await nuevoEmpleado.save()

      console.log(empleado)

      const empleadoRol = new EmpleadoRol({
        idEmpleado: empleado.idEmpleado,
        idRol: 3,
      })

      await empleadoRol.save()
      usuarioRegistrado = true
    }

    usuarioRegistrado = true
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = {
  renderLogin,
  loginAPI,
  refreshTokenAPI,
  registrarEmpleado,
}
