/**
 * @file retroalimentacion.controller.js
 * @brief Controller for retroalimentacion table (Actual Retroalimentacion)
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
 * Counts the number of duplicates in an array of answers
 * @param {*} data - Array of answers
 * @returns {*} - Object with the number of duplicates per question
 */
function countDuplicates(data) {
  const datasets = new Set(data)

  const result = {}
  for (const dataset of datasets) {
    result[dataset] = data.filter((x) => x === dataset).length
  }

  return result
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

    for (const question of simplifiedQuantitative) {
      question.respuestas = countDuplicates(question.respuestas)
    }

    res.render(
      path.join(__dirname, "../Views/Static/actual/verRetroalimentacion.ejs"),
      {
        idRetroalimentacion: quantitative[0].idRetroalimentacion,
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
 * Gets all answers from a retroalimentacion
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getCurretRetroalimentacionAPI = async (req, res) => {
  try {
    // Quantitative answers
    const quantitative = await retroPregunta.getQuantitativeAnswers()
    const simplifiedQuantitative = simplifyAnswers(quantitative)

    for (const question of simplifiedQuantitative) {
      question.respuestas = countDuplicates(question.respuestas)
    }

    res.json({
      idRetroalimentacion: req.params.idRetroalimentacion,
      simplifiedQuantitative: simplifiedQuantitative,
    })
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
