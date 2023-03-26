const express = require("express")

const app = express()

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("views"))
app.use("/assets", express.static("assets"))

// Routes
app.get("/", (req, res) => {
  res.render("static/index")
})

const historico = require("./routes/historico.routes")

app.use("/historico", historico)

// Starting the server
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
