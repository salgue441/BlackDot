/**
 * @file issueepica.model.js
 * @brief Modelo de la tabla de Issue Epica
 * @author Olimpia Garcia
 * @version 0.1
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

 const dataBase = require("../database") //manda llamar a la base

 /**
 * @class
 * @classdesc Modelo de la tabla de epicas
 * @property {int} idEpica - Identificador epica
 * @property {varchar} nombreEpica - Nombre de la epica
 */

 module.exports = class Epica
 {
    /**
     * @brief Cosntructor de la clase Epica
     * @param {*} Epica - Objeto de tipo Epica
     */
    constructor(Epica)
    {
        this.idEpica = Epica.idEpica
        this.contenido = Epica.nombreEpica
    }
 }

 
