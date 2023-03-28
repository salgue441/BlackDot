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

const path = require("path")

// Data Models
const Epica = require("../models/epica.model")
const retroPregunta = require("../models/retro-pregunta.model")
const Pregunta = require("../models/pregunta.model")

/**
 * @brief
 * Simplifies the array of answers
 * @param {*} answers - Array of answers to simplify
 * @returns {*} - Simplified array of answers
 * @throws {Error} - Error message
 */
const simplifyAnswers = (answers) => {
  try {
    return answers.reduce((acc, curr) => {
      const index = acc.findIndex((item) => item.idPregunta === curr.idPregunta)

      if (index === -1) {
        acc.push({
          idPregunta: curr.idPregunta,
          Pregunta: curr.Pregunta,
          respuestas: [curr.contenido],
        })
      } else {
        acc[index].respuestas.push(curr.contenido)
      }

      return acc
    }, [])
  } catch (error) {
    console.log(error)
  }
}

/**
 * @brief
 * Gets all answers from a retroalimentacion
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getCurretRetroalimentacion = async (req, res) => {
  try {
    // Quantitative answers
    const quantitative = await retroPregunta.getQuantitativeAnswers()
    const simplifiedQuantitative = simplifyAnswers(quantitative)

    console.log(simplifiedQuantitative)

    res.render(
      path.join(__dirname, "../Views/Static/actual/verRetroalimentacion.ejs"),
      {
        idRetroalimentacion: req.params.idRetroalimentacion,
        simplifiedQuantitative: simplifiedQuantitative,
      }
    )
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}

/**
 * @brief
 * get de registar preguntas de retro
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.getRegistrarRespuestas = async (req, res) => {
  try {
    await Pregunta.getAll().then((preguntas) => {
      res.render("Static/actual/registrarRespuestasRetroalimentacion.ejs", {
        preguntas,
      })
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener preguntas",
    })
  }
}
