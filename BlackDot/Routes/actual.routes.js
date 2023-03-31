/**
 *
 */

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const Retro = require("../Controllers/retroalimentacion.controller");
router.get("/verRespuestas/:id", Retro.getCurretRetroalimentacion);
router.get("/verRespuestas", Retro.getCurretRetroalimentacion);

router.get("/retroalimentacion", Retro.getRegistrarRespuestas);

router.post("/enviado", Retro.postRegistrarRespuestas);

// Fetches the data for the graph (Not really used to display content)
router.get("/respuestasRetro", Retro.getCurretRetroalimentacionAPI);

router.get("/enviado", Retro.getPaginaEnviado);

const Accionable = require("../Controllers/accionable.controller");
router.get("/accionables", Accionable.getRegistrarAprobacion);
router.post("/accenviado", Accionable.postRegistrarAprobacion);

module.exports = router;
