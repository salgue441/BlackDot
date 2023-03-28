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

const Epica = require("../models/epica.model")

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
    await Epica.getAll().then((epicas) => {
      res.render(
        path.join(__dirname, "../Views/Static/historico/verMetricasEpicas.ejs")
      )
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}
