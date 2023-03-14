const mysql = require("mysql2")

const dataBase = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "",
  database: process.env.PORT || "BlackDot",
  port: process.env.PORT || 3306,
})

module.exports = dataBase.promise()
