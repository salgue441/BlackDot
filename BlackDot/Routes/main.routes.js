/** @type {*} 
 * oli
 * 
*/

//Funcion que llama el metodo getAll sprint

const express = require("express")
const router = express.Router()

const tareaSprint = require("../Controllers/tareasSprint.controller")
router.get("/home", tareaSprint.getAllSprint)

module.exports = router