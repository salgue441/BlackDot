/**
 * @file auth.js
 * @brief Utils functions of Google Authentication
 * @author Oli Garcia
 * @date 2023-04-14
 * @version 1.0
 * 
 * @copyright Copyright (c) - MIT License
 */

const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Models
const Token = require('../Models/token.model')

/**
 * @brief
 * Creates a token login ID that expires in 30 seconds.
 * @param {Object} data - google Token
 * @return {Function} jwt.sign - log in token
 * @throws {Error} returns to /auth 
 */
const createTokenLogin = (data) => {
    return jwt.sign(data, process.env.JWT_LOGIN, {
        expiresIn: "300s",
    })
}

/**
 * @brief
 * Creates a refresh token that expires in 8 hours
 * @param {Object} data - google Token
 * @return {Function} jwt.sign - Refresh token (renewable)
 * @throws {Error} returns to /auth
 */
const createRefreshToken = (data) => {
    data.createdAt = Date.now()

    return jwt.sign(data, process.env.JWT_REFRESH, {
        expiresIn: "28800s",
    })
}

/**
 * @brief
 * Verifies the token 
 * @param {Object} token - Google Token to be verified
 * @param {Object} type - default value is "login"
 * @return {Function} jwt.verifiy() result
 * @throws {Error}
 */
const verifyToken = (token, type = "login") => {
    let typeToken;

    if (type === "login")
        typeToken = process.env.JWT_LOGIN;

    if (type === "refresh")
        typeToken = process.env.JWT_REFRESH;

    return jwt.verify(token, typeToken);
}

/**
 * @brief
 * Verifies the Google Token
 * @param {Object} token - Google token
 * @return {Function} payload - getPayload() 
 * @throws {Error} 
 */
const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    })

    return ticket.getPayload()
}

/**
 * @brief
 * Verifies if a token is blacklisted
 * @param {Object} token - token to be checked
 * @return {Boolean} returns true if the token is blacklisted, otherwise false
 */
const isBlacklisted = async (token) => {
    const tokenExists = await Token.getByID(token)

    if (!tokenExists) return false

    return true
}

/**
 * @brief
 * Blacklists a token 
 * @param {Object} token - token to be blacklisted
 */
const blacklistToken = async (token) => {
    const tokenModel = new Token({
        id: token,
    })

    await tokenModel.post()
}

/**
 * @brief
 * Deletes a session from the server
 * @param {Object} res - response oject
 * @param {Object} req - request object
 * @return {Object} callback function
*/
const deleteSession = (req, res) => {
    // locals
    res.locals.activeTeams = []
    res.locals.currentUser = null
    res.locals.currentTeam = null

    // session & cookies
    req.session.destroy()
    res.clearCookie(this.cookie, { path: "/" })

    res.status(301).redirect('/')
}

/**
 * @brief
 * Exporting all the file functions
 */
module.exports = {
    createTokenLogin,
    createRefreshToken,
    verifyToken,
    verifyGoogleToken,
    isBlacklisted,
    blacklistToken,
    deleteSession
}