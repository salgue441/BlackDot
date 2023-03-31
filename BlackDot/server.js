const express = require("express")
const app = express()
const bodyparser = require("body-parser")

// Dotenv config
require("dotenv").config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("public"))

// Routes
const main = require("./Routes/main.routes")
app.use("/", main)

// Section routes
const historico = require("./routes/historico.routes")
const actual = require("./routes/actual.routes")

/**
 * @brief
 * Route for the historico section
 */
app.use("/historico", historico)

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
