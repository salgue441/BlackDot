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
const BancoPreguntas = require("../models/bancoPreguntas.model")
const Cualitativa = require("../models/cualitativa.model")
const Cuantitativa = require("../models/cuantitativa.model")
const Accionable = require("../models/accionable.model")
const CualitativaAccionable = require("../models/cualiAccionable.model")
const retroPregunta = require("../models/retroPregunta.model")
const Sprint = require("../models/sprint.model")

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
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
      error,
    })
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
  Retro.getLastId()
    .then(async (retro) => {
      try {
        const idRetro = req.params.id || retro

     

        retroObj.id = idRetro

    

        // Quantitative answers
        const quantitative = await retroPregunta.getQuantitativeAnswerByID(
          idRetro
        )

          // Qualitative answers
        const qualitative = await retroPregunta.getQualitativeAnswersByID(idRetro)
        const simplifiedQualitative = simplifyAnswers(qualitative)

        // Questions
        retros = await Retro.getAll()


    

        const simplifiedQuantitative = simplifyAnswers(quantitative)

        for (const question of simplifiedQuantitative) {
          question.respuestas = countDuplicates(question.respuestas)
        }

   
        res.render(
          path.join(
            __dirname,
            "../views/static/retroalimentacion/verRetroalimentacion.ejs"
          ),
          {
            idRetroalimentacion: idRetro,
            simplifiedQuantitative: simplifiedQuantitative,
            simplifiedQualitative: simplifiedQualitative,
            retros,
          }
        )
      } catch (error) {
        res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
          error,
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
        error: "No existe una retroalimentacion",
      })
    })
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
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
      error,
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
    Retro.getRetroActual().then((retro) => {
      //Check if there is an active retroalimentacion
      if (!retro) {
        res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
          //? VIsta Temporal
          error: "No hay retroalimentacion activa",
        })
      } else {
        const idRetro = retro.id

        retroPregunta.getIdsPreguntas(idRetro).then(async (idsPreguntas) => {
          //Checks if the retro has questions
          if (idsPreguntas.length == 0) {
            res.render(
              path.join(__dirname, "../views/static/error/error.ejs"),
              {
                error: "No hay preguntas registradas",
              }
            )
          } else {
            Pregunta.getByIds(idsPreguntas).then(async (preguntas) => {
              // Render the EJS template with the preguntas and progress variables
              res.render(
                "static/retroalimentacion/registrarRespuestasRetroalimentacion.ejs",
                {
                  preguntas,
                }
              )
            })
          }
        })
      }
    })
  } catch (error) {
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
      error,
    })
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

  try {
    //Gets the id of the active retroalimentacion
    Retro.getRetroActual().then(async (retro) => {
      idRetroalimentacion = retro.id
      //Saves the answers
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

            //Create and save accionable
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

      res.render(
        path.join(__dirname, "../views/static/retroalimentacion/enviado.ejs")
      )
    })
  } catch (error) {
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
      error,
    })
  }
}

/**
 * @brief
 * get of register answers in retro
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.getPaginaEnviado = async (req, res) => {
  res.render(
    path.join(__dirname, "../views/static/retroalimentacion/enviado.ejs")
  )
}

/**
 * @brief
 * get of register answers in retro
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.getCrearRetroalimentacion = async (req, res) => {
  Retro.getRetroActual().then(async (retro) => {
    if (retro) {
      res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
        error: "Ya hay una retroalimentacion activa",
      })
    } else {
      try {
        await BancoPreguntas.getAll().then((preguntas) => {
          // Render the EJS template with the preguntas and progress variables
          res.render("static/crearRetro/crearRetroalimentacion.ejs", {
            preguntas,
          })
        })
      } catch (error) {
        res.render(path.join(__dirname, "../views/static/error.ejs"), { error })
      }
    }
  })
}

/**
 * @brief
 * Get of edit question of retro
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.getEditarPreguntas = async (req, res) => {
  const idPregunta = req.params.id || -1

  // If the id is -1, then the user didn't specify a question
  if (idPregunta == -1) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), {
      error: "No se ha especificado una pregunta",
    })
    // If the id is 0, then the user wants to create a new question
  } else if (idPregunta == 0) {
    pregunta = new BancoPreguntas({
      contenido: "",
      tipoPregunta: "",
    })

    res.render(
      path.join(__dirname, "../views/static/crearRetro/editarPregunta.ejs"),
      {
        pregunta,
      }
    )
  } else {
    const pregunta = await BancoPreguntas.getByID(idPregunta)

    res.render("static/crearRetro/editarPregunta.ejs", {
      pregunta,
    })
  }
}

/**
 * @brief
 * Post of edit question of retro/ Updates or creates a question
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.postEditarPreguntas = async (req, res) => {
  const preguntatest = req.body

  // If the id is 0, then the user wants to create a new question
  if (preguntatest.idPreguntaBanco == 0) {
    const pregunta = new BancoPreguntas({
      contenido: preguntatest.contenido,
      tipoPregunta: preguntatest.tipoPregunta,
    })

    try {
      await pregunta.save()
      res.redirect("/crearRetro/crearRetroalimentacion")
    } catch (error) {
      res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
        error,
      })
    }
  } else {
    if (preguntatest.contenido.length < 300) {
      const pregunta = new BancoPreguntas({
        idPreguntaBanco: preguntatest.idPreguntaBanco,
        contenido: preguntatest.contenido,
        tipoPregunta: preguntatest.tipoPregunta,
      })

      try {
        await pregunta.update()
        res.redirect("/editar/crearRetroalimentacion")
      } catch (error) {
        res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
          error,
        })
      }
    } else {
      res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
        error: "La pregunta no puede tener mas de 300 caracteres",
      })
    }
  }
}

/**
 * @brief
 * Get of delete question of retro/ deletes a question
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.getEliminarPreguntas = async (req, res) => {
  const idPregunta = parseInt(req.params.id) || -1

  try {
    await BancoPreguntas.deleteByID(idPregunta)
    res.redirect("/editar/crearRetroalimentacion")
  } catch (error) {
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
      error,
    })
  }
}

/**
 * @brief
 * Get of the success page of retro cretation/ creates a retro & saves the questions
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.getRetroalimentacionExitosa = async (req, res) => {
  try {
    //Se obtienen las preguntas del banco
    await BancoPreguntas.getAll().then((bancoPreguntas) => {
      //Gets the current date and end date of the retro
      const fechaActual = new Date()
      const horaActual = fechaActual.getHours()

      const FechaCreacion =
        fechaActual.toISOString().split("T")[0].toString() +
        " " +
        horaActual +
        ":00:00"

      fechaActual.setDate(fechaActual.getDate() + 1)

      const FechaFinalizacion =
        fechaActual.toISOString().split("T")[0].toString() + " 23:59:59"

      try {
        //Gets the id of the current sprint
        Sprint.getSprintActual().then(async (sprint) => {
          const idSprint = sprint[0].idSprint

          //Create and save the retro
          const retroalimentacion = new Retro({
            FechaCreacion,
            FechaFinalizacion,
            idSprint,
          })

          await retroalimentacion.save()

          //Gets the id of the retro created
          Retro.getLastId().then(async (idRetro) => {
            for (let i = 0; i < bancoPreguntas.length; i++) {
              //Saves each question of the bank in the questions table
              const nuevaPregunta = new Pregunta({
                contenido: bancoPreguntas[i].contenido,
                tipoPregunta: bancoPreguntas[i].tipoPregunta,
              })

              await nuevaPregunta.save()

              //Gets the id of the saved question to add it to the retroalimentacionPregunta table
              Pregunta.getLastId().then((idPregunta) => {
                const newRetroPregunta = new retroPregunta({
                  idRetroalimentacion: idRetro,
                  idPregunta: idPregunta,
                  required: 1,
                })

                newRetroPregunta.save()
              })
            }

            //Add the accionable question

            const accionable = new retroPregunta({
              idRetroalimentacion: idRetro,
              idPregunta: 8,
              required: 1,
            })

            accionable.save()

            res.render("../views/static/crearRetro/creacionexitosa.ejs")
          })
        })
      } catch (error) {
        res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
          error,
        })
      }
    })
  } catch (error) {
    res.render(path.join(__dirname, "../views/static/error/error.ejs"), {
      error,
    })
  }
}
