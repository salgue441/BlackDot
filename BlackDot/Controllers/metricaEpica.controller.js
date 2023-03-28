/**
 * @file retroalimentacion.controller.js
 * @brief Controller for retroalimentacion mdodel.
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

const Epica = require("../models/epica.model")
const retroPregunta = require("../models/retro-pregunta.model")

/**
 * @brief
 * Gets all epicas and their metrics
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getAllEpicas = async (req, res) => {
  try {
    const result = await retroPregunta.getAllCualitativas()
    console.log(result)

    res.render(
      path.join(__dirname, "../Views/Static/historico/verMetricasEpicas.ejs")
    )
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}
