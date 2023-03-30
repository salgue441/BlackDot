module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["./setupTests.js"],
  verbose: true,
  testTimeout: 10000,
  globals: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DATABASE: "blackDot",
    PORT: 3306,
  },
}
