/**
 * @file accionable.controller.js
 * @brief Controlador de Accionable
 * @author Yuna Chung
 * @date 2023.03.28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const axios = require("axios")
const path = require("path")
const bodyparser = require("body-parser")
const express = require("express")
bodyparser.urlencoded({ extended: true })

const Accionable = require("../Models/accionable.model")
const Cualitativa = require("../Models/cualitativa.model")
const retroPregunta = require("../Models/retro-pregunta.model")
const CualiAccionable = require("../Models/cuali-accionable.model")

/**
 * @brief
 * Gets Qualitative Answers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 **/

exports.getRegistrarAprobacion = async (req, res) => {
  try {
    const accionables = await Accionable.getAll()
    const ids = []
    let numAccioanble = 0
    let numAccionablesNoAprobados = 0
    
    for(let i = 0; i < accionables.length; i++){
      const accionable = accionables[i]

      if(accionable.estadoAccionable === 'No aprobado'){
        ids.push(accionable.idAccionable)
        numAccioanble++
      }
    }

    console.log(ids)
      res.render(
        path.join(__dirname, "../Views/Static/actual/aprobarAccionable.ejs"),
        {
          accionables: accionables,
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
 * Post to register Actionables
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 **/
exports.postRegistrarAprobacion = async (req, res) => {
  //Colects the ids of the actionables
  const idsAccionableStr = req.body.puente

  //Splits the string into an array
  const idsAccionable = idsAccionableStr.split(",")

  for (let i = 0; i < idsAccionable.length; i++) {
    //Converts the string into an integer
    idsAccionable[i] = parseInt(idsAccionable[i])

    try {
      //Gets the actionable by id
      Accionable.getbyId(idsAccionable[i]).then((accionable) => {
        try {
          //Updates the state of the actionable
          accionable.estadoAccionable = "Aprobado"
          accionable.updateEstadoAprobado()
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  res.render(
    path.join(__dirname, "../Views/Static/actual/enviadoAccionable.ejs")
  )
}
