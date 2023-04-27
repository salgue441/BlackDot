const mysql = require("mysql2")

const dataBase = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "blackdot",
})

module.exports = dataBase.promise()
