/** @type {*}
 * oli
 *
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
