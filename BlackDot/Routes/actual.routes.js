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

router.get("/enviado", Retro.getPaginaEnviado);

const Accionable = require("../Controllers/accionable.controller");
router.get("/accionables", Accionable.getAnswersCualitativa);
router.get('/accionableDatos', Accionable.getAnswersCualitativaAPI)

module.exports = router;
