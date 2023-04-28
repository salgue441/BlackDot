// Utils
const authUtils = require("../utils/auth");

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
      token = req.headers.authorization.split(" ")[1];
    else token = req.cookies.blackdotToken;

    if (!token) return authUtils.deleteSession(req, res, next);

    try {
      const payload = await authUtils.verifyToken(token);

      req.session.currentUser = payload;
      res.locals.currentUser = payload;
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authMiddleware;
