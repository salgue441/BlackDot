/** @type {*} 
 * oli
 * 
*/

const express = require("express")
const router = express.Router()

const sprint = require('../Controllers/tareasSprint.controller')
router.get('/', sprint.getLanding)

// Fetches all sprints and their metrics
router.get('/sprintData', sprint.getLandingAPI)

module.exports = router