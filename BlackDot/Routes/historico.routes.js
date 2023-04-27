const express = require("express")
const router = express.Router()

const metricasEpicas = require("../Controllers/metricaEpica.controller")
router.get("/metricasEpicas", metricasEpicas.getAllEpicas)

// Fetches all epicas and their metrics
router.get("/epicasData", metricasEpicas.getAllEpicasAPI)

const Accionable = require("../Controllers/historicoAccionable.controller")
router.get("/historicoAccionables", Accionable.getAllAccionables)

module.exports = router
