const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const crearRetroalimentacion = require("../controllers/retroalimentacion.controller")
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

/**
 * @brief
 * Routes to get the edit user page 
 */

const usuario = require("../controllers/empleado.controller")
router.get("/empleados", usuario.getEditarUsuario)
router.post("/empleados", usuario.postEditarUsuario)

router.get("/empleados/aceptar", usuario.getRegistrarUsuario)

router.post("/empleados/aceptar", usuario.postAceptarUsuario)
router.post("/empleados/rechazar", usuario.postRechazarUsuario)

router.get("/empleados/eliminar/:id", usuario.getEliminarUsuario)

module.exports = router
