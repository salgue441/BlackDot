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

const Retro = require("../models/retro.model");
const Pregunta = require("../models/pregunta.model");
const Cualitativa = require("../models/cualitativa.model");
const Cuantitativa = require("../models/cuantitativa.model");
const bodyparser = require("body-parser");
const express = require("express");

const path = require("path");

bodyparser.urlencoded({ extended: true });

/**
 * @brief
 * Gets all retros
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */
exports.getAllRetros = async (req, res) => {
  try {
    await Retro.getAll().then((retros) => {
      res.render(
        path.join(__dirname, "../Views/Static/actual/verRetroalimentacion.ejs")
      );
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener retroalimentación",
    });
  }
};

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
      const total = preguntas.length;
      const completed = req.query.respuestas
        ? Object.keys(req.query.respuestas).length
        : 0;
      const barProgress = 0;

      // Render the EJS template with the preguntas and progress variables
      res.render("Static/actual/registrarRespuestasRetroalimentacion.ejs", {
        preguntas,
        barProgress,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener preguntas",
    });
  }
};

/**
 * @brief
 * post of register answers in retro
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.postRegistrarRespuestas = async (req, res) => {
  const respuestas = req.body;

  for (i in respuestas) {
    respuestas[i] = [i, respuestas[i], 1];
    respuestas[i][0] = parseInt(respuestas[i][0]);

    if (respuestas[i][1].length > 2) {
      const resCuali = new Cualitativa({
        contenido: respuestas[i][1],
        idPregunta: respuestas[i][0],
        idRetroalimentacion: respuestas[i][2],
      });
      console.log(resCuali);
    } else {
      respuestas[i][1] = parseInt(respuestas[i][1]);
      const resCuant = new Cuantitativa({
        contenido: respuestas[i][1],
        idPregunta: respuestas[i][0],
        idRetroalimentacion: respuestas[i][2],
      });
    }
  }

  res.render(
    path.join(__dirname, "../Views/Static/actual/verRetroalimentacion.ejs")
  );
};
