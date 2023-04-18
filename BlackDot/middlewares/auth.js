const authUtil = require("../Utils/auth");

/**
 * @brief
 * Middleware for the auth section
 */
const authMiddleware = {
    validateTokenActive: async (req, res, next) => {
        let token;
        console.log(req.cookies)

        if (req.headers.authorization)
            token = req.headers.authorization.split(" ")[1];
        else token = req.cookies.blackdotToken;

        // if (!token) return res.redirect("/auth");

        try {
            const auth = authUtil.verifyToken(token);
            next()
            //   if (!req.session.currentUser) req.session.currentUser = auth;
        } catch (error) {
            next(error);
        }
    },
};

module.exports = authMiddleware;