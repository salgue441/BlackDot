const express = require("express")
const app = express()
require("dotenv").config()

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("views"))
app.use("/assets", express.static("assets"))

// Routes
/**
 * @brief
 * Landing page rout for the app
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 */
app.get("/", (req, res) => {
  res.render("static/index")
})

// Section routes
const historico = require("./routes/historico.routes")
const actual = require("./routes/actual.routes")

/**
 * @brief
 * Route for the actual section
 */
app.use("/actual", actual)

// Starting the server
const PORT = 3000

/**
 * @brief
 * Starts the server
 * @param {Number} PORT - Port number
 * @param {Function} () - Callback function
 * @returns {Function} - Callback function
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
