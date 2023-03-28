/**
 * @file privilegio.model.js
 * @brief Modelo de la tabla de privilegio
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-27
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de privilegio
 * @property {int} idPrivilegio - Identificador del privilegio
 * @property {varchar} nombrePrivilegio - Nombre del privilegio
 * @property {varchar} descripcionPrivilegio - Descripción del privilegio
 */
module.exports = class Privilegio {
    /**
     * @brief
     * Constructor de la clase Privilegio
     * @param {*} Privilegio - Objeto de tipo Privilegio
     */
    constructor(Privilegio) {
        this.idPrivilegio = Rol.idPrivilegio
        this.nombrePrivilegio = Rol.nombrePrivilegio
        this.descripcionPrivilegio = Rol.descripcionPrivilegio
    }

    /**
     * @brief
     * Obtiene un Privilegio de acuerdo con el ID
     * @param {*} idPrivilegio - ID del privilegio
     * @returns {object} - Objeto de tipo Privilegio
     */
    static async getByID(idPrivilegio) {
        if (!idPrivilegio) throw new Error("No se ha proporcionado un ID")

        const [privilegio] = await dataBase.query(
            "select * from Privilegio where idPrivilegio = ?",
            [idPrivilegio]
        )

        return new Privilegio(privilegio)
    }

    /**
     * @brief
     * Obtiene todos los Privilegios.
     * @returns {Promise<Privilegios[]>} - Arreglo de objetos de tipo Privilegio
     */
    static async getAll() {
        const privilegios = await dataBase.query("select * from Privilegio")

        return privilegios.map((privilegio) => new Privilegio(privilegio))
    }

    /**
     * @brief
     * Guarda un Privilegio en la base de datos.
     * @returns {Promise<Privilegio>} - Query del privilegio guardado
     * @throws {Error} - Si no se ha proporcionado un nombre de Privilegio
     * @throws {Error} - Si no se ha proporcionado un label de Privilegio
     */
    save() {
        if (!this.nombrePrivilegio) 
            throw new Error("No se ha proporcionado nombre de privilegio")
        if (!this.labelPrivilegio)
            throw new Error("No se ha proporcionado un label de privilegio")

        return dataBase.query(
            "insert into Privilegio (nombrePrivilegio, descripcionPrivilegio) values (?, ?)",
            [this.nombrePrivilegio]
        )
    }

    /**
     * @brief
     * Verifica que el objeto sea de tipo Privilegio
     * @param {*} Privilegio
     * @returns {boolean}
     */
    static async verify(Privilegio) {}

    /**
     * @brief
     * Elimina un privilegio de acuerdo con el ID
     * @param {*} idPrivilegio - id del privilegio
     * @returns {Promise<void>} - Query del privilegio eliminado
     */
    static async deleteByID(idPrivilegio) {
        const query = `delete from Privilegio where idPrivilegio = ?`

        await dataBase.execute(query, [idPrivilegio])
    }
}