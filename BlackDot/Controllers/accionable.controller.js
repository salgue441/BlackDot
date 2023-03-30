/**
 * @file accionable.controller.js
 * @brief Controlador de Accionable
 * @author Yuna Chung
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Ivan Paredes
 * @date 2023.03.28
 * @version 1.0
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

 const path = require("path");

const Accionable = require("../Models/accionable.model");

/**
 * @brief
 * Gets all Actionables
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message 
 **/

exports.getAllAccionables = async (req, res) => {
    try{
        const accionables = await Accionable.getAll()

        res.render(
            path.join(__dirname, "../Views/Static/actual/aprobarAccionable.ejs"), 
            {
                accionables: accionables,
            }
        )
    }

    catch (error){
        res.status(500).json({
            message: error.message || "Error al obtener Accionables",
        })
    }
}