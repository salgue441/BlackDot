/**
 * @file equipoTrabajo.model.js
 * @brief Modelo de la tabla de equipoTrabajo
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-27
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de equipoTrabajo
 * @property {int} idEquipoTrabajo - Identificador del equipoTrabajo
 */
module.exports = class EquipoTrabajo {
    /**
     * @brief
     * Constructor de la clase EquipoTrabajo
     * @param {*} EquipoTrabajo - Objeto de tipo EquipoTrabajo
     */
    constructor(EquipoTrabajo) {
        this.idEquipoTrabajo = EquipoTrabajo.idEquipoTrabajo
    }

    /**
     * @brief
     * Obtiene un EquipoTrabajo de acuerdo con el ID
     * @param {*} idEquipoTrabajo - ID del EquipoTrabajo
     * @returns {object} - Objeto de tipo EquipoTrabajo
     */
    static async getByID(idEquipoTrabajo) {
        if (!idEquipoTrabajo) throw new Error("No se ha proporcionado un ID")

        const [equipoTrabajo] = await dataBase.query(
            "select * from EquipoTrabajo where idEquipoTrabajo = ?",
            [idEquipoTrabajo]
        )

        return new EquipoTrabajo(equipoTrabajo)
    }

    /**
     * @brief
     * Obtiene todos los EquipoTrabajos.
     * @returns {Promise<EquipoTrabajo[]>} - Arreglo de objetos de tipo EquipoTrabajo
     */
    static async getAll() {
        const equipoTrabajos = await dataBase.query("select * from EquipoTrabajo")

        return equipoTrabajos.map((equipoTrabajo) => new EquipoTrabajo(equipoTrabajo))
    }

    /**
     * @brief
     * Guarda un EquipoTrabajo en la base de datos.
     * @returns {Promise<EquipoTrabajo>} - Query del equipoTrabajo guardado
     */
    save() {
        return dataBase.query(
            "insert into EquipoTrabajo (idEquipoTrabajo) values (?)",
            [this.idEquipoTrabajo]
        )
    }

    /**
     * @brief
     * Verifica que el objeto sea de tipo EquipoTrabajo
     * @param {*} EquipoTrabajo
     * @returns {boolean}
     */
    static async verify(EquipoTrabajo) {}

    /**
     * @brief
     * Elimina un equipoTrabajo de acuerdo con el ID
     * @param {*} idEquipoTrabajo - id del equipoTrabajo
     * @returns {Promise<void>} - Query del equipoTrabajo eliminado
     */
    static async deleteByID(idEquipoTrabajo) {
        const query = `delete from EquipoTrabajo where idEquipoTrabajo = ?`

        await dataBase.execute(query, [idEquipoTrabajo])
    }
}
