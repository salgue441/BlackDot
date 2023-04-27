const bodyparser = require("body-parser");
const express = require("express");
const path = require("path");

/**
 * @brief
 * get error view
 * @param {Request} req
 * @param {Response} res
 * @returns {View} error view
 */

exports.getError = (req, res) => {
  try {
    res.render(path.join(__dirname, "../Views/Static/error.view.ejs"));
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener vista de error",
    });
  }
};
