const mysql = require("mysql2")

const dataBase = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "blackdot",
  port: 3306,
})

module.exports = dataBase.promise()
