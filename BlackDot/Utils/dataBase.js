const mysql = require("mysql2")

const dataBase = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blackdot",
  port: process.env.DB_PORT || 3306,
})

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_NAME)
console.log(process.env.DB_PORT)

module.exports = dataBase.promise()
