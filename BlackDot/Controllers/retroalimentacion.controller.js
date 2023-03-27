/**
 * @file retroalimentacion.controller.js
 * @brief Controlador de retroalimentación
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Yuna Chung
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Ivan Paredes
 * @date 2023-03-26
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Retro = require("../models/retro.model")
const { GoogleChart } = require("google-charts")

const path = require("path")

/**
 * @brief
 * Gets all retros
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getAllRetros = async (req, res) => {
  try {
    await Retro.getAll().then((retros) => {
      res.render(
        path.join(__dirname, "../Views/Static/actual/verRetroalimentacion.ejs")
      )
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener retroalimentación",
    })
  }
}
