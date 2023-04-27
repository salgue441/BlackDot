/**
 * @file equipoTrabajo.model.js
 * @brief Modelo de la tabla de equipoTrabajo
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-27
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../Utils/dataBase")

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
            "INSERT INTO equipotrabajo VALUES(DEFAULT)"
        )
    }

    /**
     * @brief
     * Verifica si una equipoTrabajo existe en la base de datos.
     * @returns {Promise<boolean>} - True si existe, false si no
     * @throws {Error} - Si no se envia el idEquipoTrabajo
     */
    async verify() {

        const [equipoTrabajo] = await dataBase.query(
            "select * from EquipoTrabajo where idEquipoTrabajo = ?",
            [this.idEquipoTrabajo]
        );

        return Boolean(equipoTrabajo);
    }

    /**
     * @brief
     * Elimina un rol segun su ID de la base de datos.
     * @param {number} idEquipoTrabajo - ID del equipoTrabajo
     * @returns {boolean} - True si se elimino, false si no
     * @throws {Error} - Si no se envia el ID
     * @throws {Error} - Si el ID no es un numero
     */
    async deleteByID(idEquipoTrabajo) {
        if (!idEquipoTrabajo) throw new Error("No se envio el ID");
        if (typeof idEquipoTrabajo !== "number")
        throw new Error("El ID debe ser un numero");

        const result = await dataBase.query(
        `delete from Rol where idEquipoTrabajo = $1`,
        [idEquipoTrabajo]
        );

        return result.rowCount > 0;
    }
}
