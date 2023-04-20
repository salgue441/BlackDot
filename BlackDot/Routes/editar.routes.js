const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })

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

router.get(
  "/preguntas/eliminar/:id",
  crearRetroalimentacion.getEliminarPreguntas
)

router.get(
  "/crearRetroalimentacion/exitosa",
  crearRetroalimentacion.getRetroalimentacionExitosa
)

module.exports = router
