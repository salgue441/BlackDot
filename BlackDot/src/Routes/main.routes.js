/**
 * @file main.routes.js
 * @brief Main routes. Renders the landing page and handles the landing API
 * endpoint. Renders the error page and handles the error API endpoint.
 * @author Olimpia Garcia
 * @version 1.0
 * @date 2023-04-20
 * 
 * @copyright Copyright 2023 (c) - MIT License
 */

const express = require("express")
const router = express.Router()

const sprint = require("../controllers/tareasSprint.controller")
router.get("/home", sprint.getLanding)

const error = require("../controllers/errorHandler.controller")
router.get("/error", error.getError)

// Fetches all sprints and their metrics
router.get("/sprintData", sprint.getLandingAPI)

module.exports = router
