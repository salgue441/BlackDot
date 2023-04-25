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
    //console.log(token)
    const data = await authUtil.verifyGoogleToken(token)

    const user = {
      idGoogleAuth: data.sub,
      googleEmail: data.email,
      primerNombre: data.given_name,
      apellidoPaterno: data.family_name,
      googleProfilePicture: data.picture,
    }
    //console.log("este es el user:")
    //console.log(user)

    // Creating tokens
    const authToken = authUtil.createTokenLogin(user)
    const refreshToken = authUtil.createRefreshToken(user)

    res.status(200).json({ authToken, refreshToken })
  } catch (error) {
    console.log(error)
    //throw new Error(error)
    res.redirect("/")
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

let usuarioRegistrado = false 

/**
 * @brief
 * Refreshes the token with a custom API
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - Callback function
 */
const refreshTokenAPI = async (req, res, next) => {
  try {

    if(usuarioRegistrado == false){
      registrarEmpleado(req, res)
    }

    const { refreshToken } = req.body
    //console.log(refreshToken)
    //console.log("refreshTokenAPI")
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

    console.log("userData")
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
    //throw new Error(error)  
    res.redirect("/")
  }
}

/**
 * @brief
 * Registers a new employee
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - Callback function
 */

const registrarEmpleado = async (req, res) => {

  const { refreshToken } = req.body
  const verified = authUtil.verifyToken(refreshToken, "refresh")
  
  const nombre = verified.primerNombre.split(" ")
  const apellido = verified.apellidoPaterno.split(" ")

  /**
   * @brief
   * userData is the object that will be used to create a new employee
   * @param {Object} userData - userData object
   * @param {String} userData.primerNombre - First name
   * @param {String} userData.segundoNombre - Second name
   * @param {String} userData.apellidoPaterno - First last name
   * @param {String} userData.apellidoMaterno - Second last name
   * @param {String} userData.idGoogleAuth - Google Auth ID
   * @param {String} userData.googleEmail - Google Email
   * @param {String} userData.googleProfilePicture - Google Profile Picture
   * @return {Object} userData 
   */

  let userData = {
    primerNombre: nombre[0],
    segundoNombre:null,
    apellidoPaterno: apellido[0],
    apellidoMaterno: null,
    idGoogleAuth: verified.idGoogleAuth,	
    googleEmail:  verified.googleEmail,
    googleProfilePicture: verified.googleProfilePicture,

  }

  if (nombre.length > 1)
  {
    userData.segundoNombre = nombre[1]
  }

  if (apellido.length > 1)
  {
    userData.apellidoMaterno = apellido[1]
  }

  /** 
   * @brief
   * Checks if the user is already registered if not it registers it
   * @param {Object} userData - userData object
   * @param {String} userData.googleEmail - Google Email
   * @return {Boolean} usuarioRegistrado
   * @return {Object} validacion
   * @return {Object} nuevoEmpleado
   */

  try{
    const validacion = await Empleado.verifyByEmail(userData.googleEmail)
    console.log(validacion)
    if(validacion){
      usuarioRegistrado = true
  
    }else{
      
      const nuevoEmpleado = new Empleado(userData)
      
      nuevoEmpleado.save()
      

      const idNuevoEmpleado = await Empleado.getLastID()

      const nuevoEmpleadoRol = new empleadoRol({
        idEmpleado: idNuevoEmpleado,
        idRol: 3,
      })

      nuevoEmpleadoRol.save()
        

    }
  }
  catch(error){
    console.log(error)
  }

}

module.exports = {
  renderLogin,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
  registrarEmpleado,
}
