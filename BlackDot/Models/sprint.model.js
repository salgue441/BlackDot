/**
 * @file sprint.model.js
 * @brief Modelo de la tabla de sprints
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Yuna Chung
 * @author Ivan Paredes
 * @version 1.0
 * @date 2023-03-23
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

module.exports = class Sprint {
    constructor(Sprint) {
        this.idSprint = Sprint.idSprint
        this.fechaCreacion = Sprint.fechaCreacion
        this.fechaFinalizacion = Sprint.fechaFinalizacion
        this.numeroSprint = Sprint.numeroSprint
        this.idEpica = Spint.idEpica
    }

    /**
     * @brief
     * Obtiene una sprint de acuerdo con el ID.
     * @param {*} idSprint - ID del sprint
     * @returns {object} - Objeto de tipo Sprint
     */
    static async getByID(idSprint) {
        if (!idSprint) throw new Error("No se ha proporcionado un ID")

        const [sprint] = await dataBase.query(
            "select * from Sprint where idSprint = ?",
            [idSprint]
        )

        return new Sprint(sprint)
    }

    /**
     * @brief
     * Obtiene todos los Sprints.
     * @returns {Promise<Sprint[]>} - Arreglo de objetos de tipo Sprint
     */
    static async getAll() {
        const sprints = await dataBase.query("select * from Sprint")

        return sprints.map((sprint) => new Sprint(sprint))
    }

    /**
     * @brief
     * Guarda un sprint en la base de datos.
     * @returns {Promise<Sprint>} - Query del sprint guardado
     * @throws {Error} - Si no se ha proporcionado un numero de Sprint
     * @throws {Error} - Si no se ha proporcionado un id de Epica
     */
    save() {
        if (!this.numeroSprint) 
            throw new Error("No se ha proporcionado numero de sprint")
        if (!this.idEpica)
            throw new Error("No se ha proporcionado un id de epica")

        return dataBase.query(
            "insert into Sprint (fechaCreacion, fechaFinalizacion, numeroSprint, idEpica) values (?, ?, ?, ?)",
            [this.fechaCreacion, this.fechaFinalizacion, this.numeroSprint, this.idEpica]
        )
    }

    /**
     * @brief
     * Verifica si un sprint existe en la base de datos.
     * @returns {Promise<boolean>} - True si existe, false si no
     * @throws {Error} - Si no se envia el numero de sprint
     * @throws {Error} - Si el numero de sprint es muy largo
     */
    static async verify() {
        if (!this.numeroSprint) 
            throw new Error("No se ha proporcionado un numero de sprint")
        if (this.numeroSprint.length > 6)
            throw new Error("El numero es muy largo")

        const [sprint] = await dataBase.query(
            "select * from Sprint where numeroSprint = ?",
            [this.numeroSprint]
        )
    }

}