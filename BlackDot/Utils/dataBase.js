const mysql = require("mysql2")

/**
 * @brief
 * Create a connection to the database
 * @return {object} - The connection to the database
 */
const dataBase = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "",
  database: process.env.PORT || "BlackDot",
  port: process.env.PORT || 3306,
})

/**
 * @brief
 * Connect to the database
 * @param {function} error - Error handler
 * @return {void} - Nothing
 */
dataBase.connect((error) => {
  if (error) throw error

  console.log("Connected to the database")
})

module.exports = dataBase.promise()
