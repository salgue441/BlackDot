/**
 *
 */

const express = require("express")
const router = express.Router()

const Retro = require("../Controllers/retroalimentacion.controller")
router.get("/verRespuestas", Retro.getCurretRetroalimentacion)
router.get("/retroalimentacion", Retro.getRegistrarRespuestas)

// Fetches the data for the graph (Not really used to display content)
router.get("/respuestasRetro", Retro.getCurretRetroalimentacionAPI)

const Accionable = require("../Controllers/accionable.controller");
router.get("/aprobarAccionables", Accionable.getAllAccionables);

module.exports = router
