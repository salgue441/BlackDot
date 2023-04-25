const express = require("express")
const router = express.Router()
const authController = require("../Controllers/auth.controller")

// Login
/**
 * @brief
 */
router.get("/", (req, res) => {
  res.render("../Views/Static/auth.ejs")
})

/**
 * @brief
 */
router.post("/login", authController.loginAPI)
router.post("/token/refresh", authController.refreshTokenAPI)

module.exports = router