/**
 * @file historicoAccionable.controller.js
 * @brief Controller of Actionable history
 * @author Yuna Chung
 * @date 2023.04.05
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const path = require("path");

const Accionable = require("../Models/accionable.model");

/**
 * @brief
 * Gets all Accionables
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 **/

exports.getAllAccionables = async (req, res) => {
  try {
    const accionables = await Accionable.getAll();

    if (accionables.length === 0)
      return res.render(
        path.join(__dirname, "../Views/Static/NoAvailable.ejs")
      );

    res.render(
      path.join(__dirname, "../Views/Static/Historico/historicoAccionable.ejs"),
      {
        accionables: accionables,
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener Accionables",
    });
  }
};
