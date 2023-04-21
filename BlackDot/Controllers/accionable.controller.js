/**
 * @file accionable.controller.js
 * @brief Controlador de Accionable
 * @author Yuna Chung
 * @date 2023.03.28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const axios = require("axios");
const path = require("path");
const bodyparser = require("body-parser");
const express = require("express");
bodyparser.urlencoded({ extended: true });

const Accionable = require("../Models/accionable.model");
const Cualitativa = require("../Models/cualitativa.model");
const retroPregunta = require("../Models/retro-pregunta.model");
const CualiAccionable = require("../Models/cuali-accionable.model");

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
    const accionables = await Accionable.getAll();
    const accionablesNoAprobados = accionables.filter((item) => item.estadoAccionable === 'No aprobado')

    res.render(
      path.join(__dirname, "../Views/Static/actual/aprobarAccionable.ejs"),
      {
        accionables: accionablesNoAprobados,
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    });
  }
};

exports.saveAccionable = async (req, res) => {
  const { idsAccionables } = req.body
  console.log(idsAccionables)

  res.status(200).json({ message: 'Accinoables saved successfully'})

  try {
    
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}