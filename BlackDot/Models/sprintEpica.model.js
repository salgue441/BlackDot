/**
 * @file sprintEpica.model.js
 * @brief Modelo de la tabla de Sprint Epica
 * @author Olimpia Garcia
 * @version 0.1
 * @date 2023-03-23
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

 const dataBase = require("../database") //manda llamar a la base
 
const { getByID } = require("./Epica.model")

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

    /**
     * @brief obtiene una epica de acuerdo al ID
     * @param {*} idEpica - Id de la epica
     * @returns {object} -Objeto tipo epica
     */

    static async getByID(idEpica)
    {
       if (!idEpica) throw new Error("No se ha proporcionado un ID")
       const [epica] = await dataBase.query
       (
        "select * from Epica where idEpica = ?", [idEpica]
       )
        return new Epica(epica)
    }

    /**
     * @brief Obtiene las epicas
     * @returns {Promise<epica[]>} Arreglo de objetos epica
     */

    static async getAll()
    {
        if(!this.Epica) throw new Error ("No hay epicas que recuperar")

        const query = "select * from epica"
        const epica = await dataBase.execute(query)
        
        return epica.map((epica) => new Epica(epica))
    }

    }


