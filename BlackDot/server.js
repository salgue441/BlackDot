const express = require("express")

const app = express()

// View Engine
app.set("view engine", "ejs")

// Static files
app.use(express.static("views"))
app.use("/assets", express.static("assets"))

// Main Routes
app.get("/", (req, res) => {
  res.render("static/index.ejs")
})

// Port
const port = 3000

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
