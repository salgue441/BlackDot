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
const path = require("path")

/**
 * @brief
 * Gets all retros
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @returns {Promise<Response>} - Response
 * @throws {Error} - Error message
 */
exports.getAllRetros = async (req, res) => {
  try {
    const retros = await Retro.getAll().then((retros) => {
      res.render(
        path.join(__dirname, "../Views/Static/historico/retroalimentacion.ejs"),
        { retros }
      )
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener retroalimentación",
    })
  }
}
