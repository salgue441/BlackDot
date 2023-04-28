const express = require("express")

// Auth Components
const authController = require("../controllers/auth.controller")

// Router
const router = express.Router()

// Login
/**
 * @brief
 * Gets the Login page 
 * @note Gets the login page in get and validates the login in post
 * @route GET /login - Gets the login page
 * @route POST /login - Validates the login
 */
router.get("/", authController.renderLogin)
router.post("/login", authController.loginAPI)
router.post("/token/refresh", authController.refreshTokenAPI)

module.exports = router