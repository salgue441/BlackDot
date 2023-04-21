/**
 * @file correo.model.js
 * @brief Modelo de la tabla de correo
 * @author Olimpia Garcia
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class 
 * @classdesc Modelo de la tabla de correo
 * @property {int} id - Identificador del correo
 * @property {varchar} correo - Contenido del correo
 */
 
module.exports = class Correos {
    /**
     * @brief Constructor de la clase Correo
     * @param {*} Correo - Objeto de tipo Correo
     */
    constructor(correo) {
        this.id = correo.id
        this.correo = correo.correo
    }

    /**
     * @brief Obtiene toodos los correos
     * @param {*} Correo - correo
     * @returns {object} -Objeto tipo correo
     */

    static async getAll() {
        const [correos,_] = await dataBase.query(
            "select * from Correos"            
        )
    
    console.log(correos)

        return correos
    }
}