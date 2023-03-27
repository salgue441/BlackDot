/**
 * @file cuali-accionable.model.js
 * @brief Modelo de la tabla de cuali-accionable
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.27
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de cualiaccionable
 * @property {int} idCualitativa - Identificador de Cualitativa
 * @property {int} idAccionable - Identificador del Accionable
 **/

const {getById} = require("./cualitativa.model")
const {getById} = require("./accionable.model")

