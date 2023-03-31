/**
 *
 */

const express = require("express");
const router = express.Router();

const Retro = require("../Controllers/retroalimentacion.controller");
router.get("/verRespuestas/:id", Retro.getCurretRetroalimentacion);
router.get("/verRespuestas", Retro.getCurretRetroalimentacion);

router.get("/retroalimentacion", Retro.getRegistrarRespuestas);

router.post("/enviado", Retro.postRegistrarRespuestas);

// Fetches the data for the graph (Not really used to display content)
router.get("/respuestasRetro", Retro.getCurretRetroalimentacionAPI);

// Sprint Actual
const SprintActual = require("../Controllers/metricaActual.controller")
router.get("/metricasSprint", SprintActual.getActual)

// Fetches all the epicas and their metrics for the actual sprint
router.get("/sprintData", SprintActual.getActualAPI)

module.exports = router;
