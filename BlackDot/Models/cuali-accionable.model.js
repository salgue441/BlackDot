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
 * @classdesc Modelo de la tabla de cualitativaaccionable
 * @property {int} idCualitativa - Identificador de Cualitativa
 * @property {int} idAccionable - Identificador del Accionable
 **/

const {getById} = require("./cualitativa.model");
const {getById} = require("./accionable.model");

module.exports = class CualitativaAccionable{
    constructor(CualitativaAccionable){
        this.idCualitativa = CualitativaAccionable.idCualitativa;
        this.idAccionable = CualitativaAccionable.idAccionable;
    };

    /**
     * @brief
     * Obtiene una CualitativaAccionable de acuerdo con el ID del Accionable
     * @param {*} IdAccionable - ID del Accionable
     * @returns {object} - Objeto de tipo CualitativaAccionable
     **/

    static async getByIdA(idAccionable){
        if(!idAccionable) throw new Error("No se ha proporcionado un ID del Accionable");

        const [accionable] = await dataBase.query(
            "SELECT * FROM CualitativaAccionable WHERE idAccionable = ?",
            [idAccionable]
        );

        return new CualitativaAccionable(accionable);
    };

    /**
     * @brief
     * Obtiene un CualitativaAccionable de acuerdo con el ID de Cualitativa
     * @param {*} idCualitativa - ID de Cualitativa
     * @returns {object} - Objeeto de tipo CualitativaAccionable
     **/

    static async getByIdC(idCualitativa){
        if(!idCualitativa) throw new Error("No se ha proporcionado un ID de la cualitativa");

        const [cualitativa] = await dataBase.query(
            "SELECT * FROM CualitativaAccionable WHERE idCualitativa = ?",
            [idCualitativa]
        );

        return new CualitativaAccionable(cualitativa);
    };

    /**
     * @brief
     * Obtiene todos los CualitativaAccionables
     * @returns {Promise<CualitativaAccionable[>} - Arreglo de objetos de tipo CualitativaAccionable
     **/

    static async getAll(){
        const cualitativaaccionable = await dataBase.query("SELECT * FROM CualitativaAccionable");

        return cualitativaaccionable.map((cualitativaaccionable) => new CualitativaAccionable(cualitativaaccionable));
    };
};