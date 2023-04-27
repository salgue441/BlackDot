require("dotenv").config()

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["./setupTests.js"],
  verbose: true,
  testTimeout: 10000,
  globals: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DATABASE: process.env.DB_NAME || "blackdot",
    PORT: process.env.DB_PORT || 3306,
  },
}
