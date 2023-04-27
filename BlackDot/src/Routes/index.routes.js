const actualRoutes = require("./actual.routes")
const authRoutes = require("./auth.routes")
const editarRoutes = require("./editar.routes")
const historicoRoutes = require("./historico.routes")
const mainRoutes = require("./main.routes")

// middleware
const authMiddleware = require("../middlewares/auth")

/**
 * @brief 
 * Initializes the routes of the app
 * @param {*} app - Express app object
 */
const initRoutes = (app) => {
    app.use("/auth", authRoutes)

    app.use(authMiddleware.verifyToken)
    app.use("/", mainRoutes)
    app.use("/actual", actualRoutes)
    app.use("/editar", editarRoutes)
    app.use("/historico", historicoRoutes)
}

module.exports = initRoutes