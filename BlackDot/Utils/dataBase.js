const mysql = require("mysql2")

const dataBase = mysql.createPool({
<<<<<<< HEAD
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blackdot",
  port: process.env.DB_PORT || 3306,
=======
  host: "localhost",
  user: "root",
  password: "",
  database: "blackdot",
  port: 3306,
>>>>>>> 916f76a5cdafd0c5bdfc34d30a2406d23a5d217f
})

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_NAME)
console.log(process.env.DB_PORT)

module.exports = dataBase.promise()
