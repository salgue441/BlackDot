/**
 *
 */

const express = require("express")
const router = express.Router()

const crearRetroalimentacion = require("../Controllers/retroalimentacion.controller")
router.get(
  "/crearRetroalimentacion",
  crearRetroalimentacion.getCrearRetroalimentacion
)

router.post(
  "/crearRetroalimentacion",
  crearRetroalimentacion.postEditarPreguntas
)

router.get("/preguntas/:id", crearRetroalimentacion.getEditarPreguntas)

module.exports = router
