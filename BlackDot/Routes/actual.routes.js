/**
 *
 */

const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");

bodyparser.urlencoded({ extended: true });

const Retro = require("../Controllers/retroalimentacion.controller");
router.get("/verRespuestas", Retro.getAllRetros);
router.get("/retroalimentacion", Retro.getRegistrarRespuestas);

router.post("/retroalimentacion", Retro.postRegistrarRespuestas);

module.exports = router;
