/**
 *
 */

const express = require("express")
const router = express.Router()

const metricasEpicas = require("../controllers/metricaEpica.controller")
router.get("/metricasEpicas", metricasEpicas.getAllEpicas)

module.exports = router
