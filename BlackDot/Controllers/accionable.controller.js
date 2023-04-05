/**
 * @file accionable.controller.js
 * @brief Controlador de Accionable
 * @author Yuna Chung
 * @date 2023.03.28
 * @version 1.0
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

const path = require("path")
const axios = require("axios")

const Accionable = require("../Models/accionable.model")
const Cualitativa = require("../Models/cualitativa.model")
const retroPregunta = require('../Models/retro-pregunta.model')
const CualiAccionable = require("../Models/cuali-accionable.model")

/**
 * @brief
 * Gets Qualitative Answers
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message 
 **/

exports.getAnswersCualitativa = async (req, res) => {
    try{
        
        const waitingAnswers = await retroPregunta.getQualitativeAnswersByIDPregunta(8)

        res.render(
            path.join(__dirname, "../Views/Static/actual/aprobarAccionable.ejs"), 
            {
                waitingAnswers: waitingAnswers,
            }
        )
    }

    catch (error){
        res.status(500).json({
            message: error.message || "Error al obtener Accionables",
        })
    }
}

exports.getAnswersCualitativaAPI = async (req, res) => {
    try{
        const waitingAnswers = await retroPregunta.getQualitativeAnswersByIDPregunta(8)

        res.json({waitingAnswers: waitingAnswers})
    }

    catch (error){
        res.status(500).json({
            message: error.message || "Error al obtener Accionables",
        })
    }
}

/**
 * @brief
 * Gets all Accioanbles
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 **/

exports.getAllAccionables = async (req, res) => {
    try{
        const accionables = await Accionable.getAll()

        res.render(
            path.join(__dirname, "../Views/Static/Historico/historicoAccionable.ejs"),
            {
                accionables: accionables,
            }
        )
    }

    catch(error){
        res.status(500).json({
            message: error.message || "Error al obtener Accionables",
        })
    }
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