/**
 * @file cuali-accionable.model.js
 * @brief Modelo de la tabla de cuali-accionable
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.27
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

const dataBase = require("../utils/dataBase");

/**
 * @class
 * @classdesc Modelo de la tabla de cualiaccionable
 * @property {int} idCualitativa - Identificador de Cualitativa
 * @property {int} idAccionable - Identificador del Accionable
 **/

const {getById} = require("./cualitativa.model");
const {getById} = require("./accionable.model");
const Accionable = require("./accionable.model");

module.exports = class CualiAccionable{
    constructor(CualiAccionable){
        this.idCualitativa = CualiAccionable.idCualitativa;
        this.idAccionable = CualiAccionable.idAccionable;
    }

    /**
     * @brief
     * Obtiene un CualiAccionable de acuerdo con el ID del Accionable
     * @param {*} IdAccionable - ID del Accionable
     * @returns {object} - Objeto de tipo CualiAccionable
     **/

    static async getById(idAccionable){
        if(!idAccionable) throw new Error("No se ha proporcionado un ID del Accionable");

        const [accionable] = await dataBase.query(
            "SELECT * FROM CualiAccionable WHERE idAccionable = ?",
            [idAccionable]
        );

        return new CualiAccionable(accionable);
    }
}