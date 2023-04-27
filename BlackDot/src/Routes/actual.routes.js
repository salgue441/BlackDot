/**
 *
 */

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const Retro = require("../Controllers/retroalimentacion.controller")
router.get("/verRespuestas/:id", Retro.getCurretRetroalimentacion)
router.get("/verRespuestas", Retro.getCurretRetroalimentacion)

router.get("/retroalimentacion", Retro.getRegistrarRespuestas)

router.post("/enviado", Retro.postRegistrarRespuestas)

// Fetches the data for the graph (Not really used to display content)
router.get("/respuestasRetro", Retro.getCurretRetroalimentacionAPI)

// Sprint Actual
const SprintActual = require("../Controllers/metricaActual.controller")
router.get("/metricasSprint", SprintActual.getActual)

// Fetches all the epicas and their metrics for the actual sprint
router.get("/sprintData", SprintActual.getActualAPI)

const Accionable = require("../Controllers/accionable.controller")
router.get("/accionables", Accionable.getRegistrarAprobacion)
router.post("/admin/saveAccionables", Accionable.saveAccionable)

module.exports = router
