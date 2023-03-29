/**
 * @file retroalimentacion.controller.js
 * @brief Controller for retroalimentacion mdodel (historic).
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

const path = require("path")

// Models
const Epica = require("../models/Epica.model")

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
    const epicas = await Epica.getAll()

    console.log(epicas)

    res.render(
      path.join(__dirname, "../Views/Static/historico/verMetricasEpicas.ejs"),
      {
        epicas: epicas,
      }
    )
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}
