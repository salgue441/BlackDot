// Utils
const authUtils = require('../Utils/auth')

// Data models
const Empleado = require('../Models/empleado.model')

// Middlewares
/**
 * @brief
 * Handles the validation of the login form
 */
const authMiddleware = {
    /**
     * @brief
     * Validates that the token is active
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @param {Function} next - Next function
     * @returns {Function} Next function
     */
    verifyToken: async (req, res, next) => {
        let token;

        if (req.headers.authorization)
            token = req.headers.authorization.split(" ")[1]

        else token = req.cookies.blackdotToken

        if (!token)
            return res.status(401).json({ message: "No token provided" })

        try {
            const { newToken, payload } = await authUtils.verifyToken(token)
            console.log(payload)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = authMiddleware