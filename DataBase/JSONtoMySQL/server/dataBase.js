const mysql = require("mysql2")

const dataBase = mysql.createPool({
  host: "localhost",
  port: "8000",
  user: "root",
  password: "",
  database: "blackdot",
})

module.exports = dataBase.promise()
