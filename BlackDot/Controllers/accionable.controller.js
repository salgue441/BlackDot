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

const bodyparser = require("body-parser")
const express = require("express")
const path = require("path")
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
    await Accionable.getAll().then((accionables) => {
      res.render(
        path.join(__dirname, "../Views/Static/actual/aprobarAccionable.ejs"),
        {
          accionables,
        }
      )
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    })
  }
}

exports.postRegistrarAprobacion = async (req, res) => {
  const idsAccionable = req.body.puente
  console.log(idsAccionable)
  res.render(
    path.join(__dirname, "../Views/Static/actual/enviadoAccionable.ejs")
  )
}
// /**
//  * @brief
//  * Post to register Actionables
//  * @param {Request} req - Request object
//  * @param {Response} res - Response object
//  * @returns {Response} - Response object
//  * @throws {Error} - Error message
//  **/

// exports.postAccionables = async (req, res) => {
// }
