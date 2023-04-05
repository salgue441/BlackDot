/**
 *
 */

const express = require("express")
const router = express.Router()

const crearRetroalimentacion = require("../controllers/retroalimentacion.controller")
router.get(
  "/crearRetroalimentacion",
  crearRetroalimentacion.getCrearRetroalimentacion
)

module.exports = router
