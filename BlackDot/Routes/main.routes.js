/** @type {*}
 * oli
 *
 */

const express = require("express")
const router = express.Router()

const sprint = require("../Controllers/tareasSprint.controller")
router.get("/home", sprint.getLanding)

const error = require("../Controllers/Error.controller")
router.get("/error", error.getError)

// Fetches all sprints and their metrics
router.get("/sprintData", sprint.getLandingAPI)

module.exports = router
    