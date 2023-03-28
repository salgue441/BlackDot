/**
 *
 */

const express = require("express");
const router = express.Router();

const Retro = require("../Controllers/retroalimentacion.controller");
router.get("/verRespuestas", Retro.getAllRetros);
router.get("/retroalimentacion", Retro.getRegistrarRespuestas);

module.exports = router;
