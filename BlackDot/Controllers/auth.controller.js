/**
 * @file auth.controller.js
 * @brief Authentication controller
 * @author Oli Garcia
 * @date 2023-04-14
 * @version 1.0
 */

// Data Model & Util Functions
const authUtil = require('../Utils/auth')
const Empleado = require('../Models/empleado.model')
const empleadoRol = require('../Models/empleado-rol.model')

/**
 * @brief
 * Renders the log in 
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @return {Function} res.render()
 */
const renderLogin = (req, res) => {
    if (req.session.currentUser)
        return res.redirect("/")
    
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
        const data = await authUtil.verifyGoogleToken(token)
        const user = await Empleado.getByEmail(data.email)

        console.log(data)

        if (!user) {    
            // Needs to be checked with a clg(data)
            const newEmpleado = new Empleado({
                primerNombre: data.given_name, 
                segundoNombre: data.segundoNombre,
                apellidoPaterno: data.family_name,
                apellidoMaterno: data.apellidoMaterno,
                idGoogleAuth: data.sun, 
                googleEmail: data.email,
                googleProfilePicture: data.picture
            })

            const result = await newEmpleado.save()
            newEmpleado.idEmpleado = result.insertId

            await newEmpleado.addRole({ id: 1 })
        }

        const userData = {}

        // Creating tokens
        const authToken = authUtil.createTokenLogin(userData)
        const refreshToken = authUtil.createRefreshToken(uesrData)

        res.status(200).json({ authToken, refreshToken })
    }
    catch (error) {
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
        const verified = authUtil.verifyToken(refreshToken,
            "Refresh")
        
        // to finish primerNombre: verified.primerNombre
        const userData = {
            primerNombre: verified.primerNombre, 
            segundoNombre: verified.segundoNombre,
            apellidoPaterno: verified.apellidoPaterno, 
            apellidoMaterno: verified.apellidoMaterno,
            idGoogleAuth: verified.idGoogleAuth,
            googleEmail: verified.googleEmail, 
            googleProfilePicture: verified.googleProfilePicture
        }

        // Blacklisting refresh token
        const isBlacklisted = await authUtil.isBlacklisted(refreshToken)

        if (isBlacklisted) 
            return authUtil.deleteSession(req, res)
        
        await authUtil.blacklistToken(refreshToken)

        // Create tokens
        const authToken = authUtil.createTokenLogin(userData)
        const newRefreshToken = authUtil.createRefreshToken(userData)

        res.status(200).json({
            authToken, 
            refreshToken: newRefreshToken
        })
    }
    catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    renderLogin, 
    loginAPI, 
    logoutAPI, 
    refreshTokenAPI
}