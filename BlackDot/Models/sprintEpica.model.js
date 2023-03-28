/**
 * @file sprintEpica.model.js
 * @brief Modelo de la tabla de Sprint Epica
 * @author Olimpia Garcia
 * @version 0.1
 * @date 2023-03-23
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

 const dataBase = require("../utils/dataBase") //manda llamar a la base
 
const { getByIDE } = require("./Epica.model")
const { getByIDS } = require("./Sprint.model") //validar con llaca 

 /**
 * @class
 * @classdesc Modelo de la tabla de epicas
 * @property {int} idEpica - IIdentificador de la epica
 *  @property {int} idSprint - IIdentificador del sprint
 * 
 */

 module.exports = class SprintEpica
 {
    /**
     * @brief Cosntructor de la clase SprintEpica
     * @param {*} SprintEpica - Objeto de tipo SprintEpica
     */
    constructor(SprintEpica)
    {
        this.idEpica = SprintEpica.idEpica
        this.idsprint = SprintEpica.idsprint
    }

    /**
     * @brief obtiene una epica de acuerdo al ID
     * @param {*} idEpica - Id de la epica
     * @returns {object} -Objeto tipo epica
     */

    static async getByIDE(idEpica)
    {
       if (!idEpica) throw new Error("No se ha proporcionado un ID")
       const [epica] = await dataBase.query
       (
        "select * from sprintepica where idEpica = ?", [idEpica]
       )
        return new Epica(epica)
    }


    static async getByIDS(idsprint)
    {
       if (!idsprint) throw new Error("No se ha proporcionado un ID")
       const [sprint] = await dataBase.query
       (
        "select * from sprintepica where idSprint = ?", [idsprint]
       )
        return new Epica(sprint)
    }

    /**
     * @brief Obtiene las epicas
     * @returns {Promise<epica[]>} Arreglo de objetos epica
     */

    static async getAll()
    {
        if(!this.SprintEpica) throw new Error ("No hay epicas que recuperar")

        const query = "select * from sprintepica"
        const sprintepica = await dataBase.execute(query)
        
        return sprintepica.map((sprintepica) => new SprintEpica(sprintepica))
    }

    }


