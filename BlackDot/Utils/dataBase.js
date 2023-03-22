const mysql = require("mysql2")

/**
 * @brief
 * Create a connection to the database
 * @return {object} - The connection to the database
 */
const dataBase = mysql.createPool({
  host: "localhost" || process.env.HOST,
  user: "root" || process.env.USER,
  password: "" || process.env.PASSWORD,
  database: "blackdot" || process.env.DATABASE,
  port: 3306 || process.env.PORT,
})

module.exports = dataBase.promise()
