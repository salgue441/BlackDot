/**
 * @file rol-privilegio.model.js
 * @brief Modelo de la tabla empleadoEquipoTrabajo
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-28
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de empleadoEquipoTrabajo
 * @property {int} idEmpleado - Identificador del empleado
 * @property {int} idEquipoTrabajo - Identificador del equipoTrabajo
 * 
 */
module.exports = class EmpleadoEquipoTrabajo {
    constructor(EmpleadoEquipoTrabajo) {
        this.idEmpleado = EmpleadoEquipoTrabajo.idEmpleado
        this.idEquipoTrabajo = EmpleadoEquipoTrabajo.idEquipoTrabajo
    }

    /**
     * @brief
     * Obtiene un EmpleadoEquipoTrabajo de acuerdo con el ID de equipoTrabajo.
     * @param {*} idEquipoTrabajo - ID del equipoTrabajo
     * @returns {object} - Objeto de tipo EmpleadoEquipoTrabajo
     */
    static async getByIDET(idEquipoTrabajo) {
        if (!idEquipoTrabajo) throw new Error("No se ha proporcionado un ID de equipoTrabajo")

        const [equipoTrabajo] = await dataBase.query(
            "select * from EmpleadoEquipoTrabajo where idEquipoTrabajo = ?",
            [idEquipoTrabajo]
        )

        return new EmpleadoEquipoTrabajo(equipoTrabajo)
    }

    /**
     * @brief
     * Obtiene un EmpleadoEquipoTrabajo de acuerdo con el ID de empleado.
     * @param {*} idEmpleado - ID del empleado
     * @returns {object} - Objeto de tipo EmpleadoEquipoTrabajo
     */
    static async getByIDE(idEmpleado) {
        if (!idEmpleado) throw new Error("No se ha proporcionado un ID de empleado")

        const [empleado] = await dataBase.query(
            "select * from EmpleadoEquipoTrabajo where idEmpleado = ?",
            [idEmpleado]
        )

        return new EmpleadoEquipoTrabajo(empleado)
    }

    /**
     * @brief
     * Obtiene todos los empleadoEquipoTrabajo
     * @returns {EmpleadoEquipoTrabajo[]} - Arreglo de objetos de tipo empleadoRol
     */
    static async getAll() {
        const query = `select * from EmpleadoEquipoTrabajo`
        const [rows] = await dataBase.execute(query)

        return rows.map((row) => new EmpleadoEquipoTrabajo(row))
    }
}