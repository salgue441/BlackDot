/**
 * @file roles.middleware.js
 * @brief Middleware for roles. 
 * @author Carlos Salguero
 * @version 1.0
 * @date 2023-05-01
 * 
 * @copyright Copyright 2023 (c) - MIT License
 */

// Middlware
/**
 * @brief
 * Middleware for roles. If the user doesn't have the required role, it
 * redirects to home.
 * @param  {...any} allowedRoles Allowed roles
 * @returns {Object} Response object
 * @returns {Object} Next function
 */
const roles = (...allowedRoles) => {
    return (req, res, next) => {
        const { currentUser } = req.session

        if (!currentUser) return res.redirect('/auth')

        const { role } = currentUser
        if (!allowedRoles.includes(role)) return res.redirect('/home')

    

        next()
    }
}

module.exports = roles