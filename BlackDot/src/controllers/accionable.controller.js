/**
 * @file accionable.controller.js
 * @brief Controller of approving Actionable
 * @author Yuna Chung
 * @date 2023.03.28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const axios = require("axios");
const express = require("express");
const router = express.Router();
const path = require("path");
const bodyparser = require("body-parser");
bodyparser.urlencoded({ extended: true });

const Accionable = require("../models/accionable.model.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
    const filterAccionables = accionables.filter(
      (item) => item.estadoAccionable === "No aprobado"
    );

    if (filterAccionables.length === 0)
      return res.render(
        path.join(__dirname, "../views/static/accionables/noAvailable.ejs")
      );

    res.render(
      path.join(__dirname, "../views/static/accionables/aprobarAccionable.ejs"),
      {
        accionables: filterAccionables,
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener metricas epicas",
    });
  }
};

exports.saveAccionable = async (req, res) => {
  const { idsAccionables } = req.body;
  const { createAccionable } = require("../Utils/jiraIssues.api");

  try {
    for (let i = 0; i < idsAccionables.length; i++) {
      const idAccionable = idsAccionables[i];
      const accionable = await Accionable.getbyId(idAccionable);

      // Call updateAccionable and wait for the Promise to resolve
      await accionable.updateAccionable()
      const updatedAccionable = await Accionable.getbyId(idAccionable);

      // Check the value of estadoAccionable after the Promise is resolved
      if (updatedAccionable.estadoAccionable === "Aprobado") {
        await createAccionable(accionable);
      }
    }

    res.status(200).json({ message: "Accinoables saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

