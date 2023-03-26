/**
 *
 */

const express = require("express")
const router = express.Router()

const Retro = require("../Controllers/retroalimentacion.controller")
router.get("/retroalimentacion", Retro.getAllRetros)

module.exports = router
