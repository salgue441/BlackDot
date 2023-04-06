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
const bodyparser = require("body-parser")
const express = require("express")
const path = require("path")

// Data Models
const Retro = require("../models/retro.model")
const Pregunta = require("../models/pregunta.model")
const Cualitativa = require("../models/cualitativa.model")
const Cuantitativa = require("../models/cuantitativa.model")
const Accionable = require("../models/accionable.model")
const CualitativaAccionable = require("../models/cuali-accionable.model")
const retroPregunta = require("../models/retro-pregunta.model")

bodyparser.urlencoded({ extended: true })

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
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
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

let retroObj = {}

exports.getCurretRetroalimentacion = async (req, res) => {
  try {
    const idRetro = req.params.id || 5
    // req.idRetro = idRetro;

    retroObj.id = idRetro

    // Quantitative answers
    const quantitative = await retroPregunta.getQuantitativeAnswerByID(idRetro)
    const simplifiedQuantitative = simplifyAnswers(quantitative)

    for (const question of simplifiedQuantitative) {
      question.respuestas = countDuplicates(question.respuestas)
    }

    // Qualitative answers
    const qualitative = await retroPregunta.getQualitativeAnswersByID(idRetro)
    const simplifiedQualitative = simplifyAnswers(qualitative)

    // Questions

    retros = await Retro.getAll()

    res.render(
      path.join(__dirname, "../Views/Static/actual/verRetroalimentacion.ejs"),
      {
        idRetroalimentacion: quantitative[0].idRetroalimentacion,
        fechaRetroalimentacion: quantitative[0].fechaRetroalimentacion,
        simplifiedQuantitative: simplifiedQuantitative,
        simplifiedQualitative: simplifiedQualitative,
        retros,
      }
    )
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
  }
}

/**
 * @brief
 * Sends the data for the graph (Not really used to display content)
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getCurretRetroalimentacionAPI = async (req, res) => {
  try {
    const idRetro = retroObj.id
    // Quantitative answers
    const quantitative = await retroPregunta.getQuantitativeAnswerByID(idRetro)
    const simplifiedQuantitative = simplifyAnswers(quantitative)

    for (const question of simplifiedQuantitative) {
      question.respuestas = countDuplicates(question.respuestas)
    }

    res.json({
      idRetroalimentacion: req.params.idRetroalimentacion,
      simplifiedQuantitative: simplifiedQuantitative,
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
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
      // Calculate progress percentage based on completed fields
      const total = preguntas.length
      const completed = req.query.respuestas
        ? Object.keys(req.query.respuestas).length
        : 0
      const barProgress = 0

      // Render the EJS template with the preguntas and progress variables
      res.render("Static/actual/registrarRespuestasRetroalimentacion.ejs", {
        preguntas,
        barProgress,
      })
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
  }
}

/**
 * @brief
 * post of register answers in retro
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */
exports.postRegistrarRespuestas = async (req, res) => {
  const respuestas = req.body
  const idRetroalimentacion = 5 //Cambiar a actual Esperar a implementar iniciar retro
  for (i in respuestas) {
    respuestas[i] = [i, respuestas[i], idRetroalimentacion]
    respuestas[i][0] = parseInt(respuestas[i][0])

    if (respuestas[i][1].length > 2) {
      const resCuali = new Cualitativa({
        contenido: respuestas[i][1],
        idPregunta: respuestas[i][0],
        idRetroalimentacion: respuestas[i][2],
      })
      await resCuali.save()
      if (respuestas[i][0] === 8) {
        idcuali = await Cualitativa.getLastid()

        const accionable = new Accionable({
          nombreAccionable: respuestas[i][1],
          storyPoints: 0,
          labelAccionable: "Accionable",
        })

        await accionable.save()

        idAccionable = await Accionable.getLastId()

        const CualiAccionable = new CualitativaAccionable({
          idCualitativa: idcuali,
          idAccionable: idAccionable,
        })

        await CualiAccionable.save()
      }
    } else {
      respuestas[i][1] = parseInt(respuestas[i][1])
      const resCuant = new Cuantitativa({
        contenido: respuestas[i][1],
        idPregunta: respuestas[i][0],
        idRetroalimentacion: respuestas[i][2],
      })
      resCuant.save()
    }
  }

  res.render(path.join(__dirname, "../Views/Static/actual/enviado.ejs"))
}

exports.getPaginaEnviado = async (req, res) => {
  res.render(path.join(__dirname, "../Views/Static/actual/enviado.ejs"))
}

exports.getCrearRetroalimentacion = async (req, res) => {
  try {
    await Pregunta.getAll().then((preguntas) => {
      // Render the EJS template with the preguntas and progress variables
      res.render("Static/crearRetro/crearRetroalimentacion.ejs", {
        preguntas,
      })
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
  }
}
