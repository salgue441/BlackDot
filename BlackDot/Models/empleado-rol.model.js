/**
 * @file empleado-rol.model.js
 * @brief Modelo de la tabla empleadoRol
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-28
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de empleadoRol
 * @property {int} idEmpleado - Identificador del empleado
 * @property {int} idRol - Identificador del rol
 * 
 */
module.exports = class EmpleadoRol {
    constructor(EmpleadoRol) {
        this.idEmpleado = EmpleadoRol.idEmpleado
        this.idRol = EmpleadoRol.idRol
    }

    /**
     * @brief
     * Obtiene un EmpleadoRol de acuerdo con el ID de rol.
     * @param {*} idRol - ID del rol
     * @returns {object} - Objeto de tipo EmpleadoRol
     */
    static async getByIDR(idRol) {
        if (!idRol) throw new Error("No se ha proporcionado un ID de rol")

        const [rol] = await dataBase.query(
            "select * from EmpleadoRol where idRol = ?",
            [idRol]
        )

        return new EmpleadoRol(rol)
    }

    /**
     * @brief
     * Obtiene un EmpleadoRol de acuerdo con el ID de empleado.
     * @param {*} idEmpleado - ID del empleado
     * @returns {object} - Objeto de tipo EmpleadoRol
     */
    static async getByIDE(idEmpleado) {
        if (!idEmpleado) throw new Error("No se ha proporcionado un ID de empleado")

        const [empleado] = await dataBase.query(
            "select * from EmpleadoRol where idEmpleado = ?",
            [idEmpleado]
        )

        return new EmpleadoRol(empleado)
    }

    /**
     * @brief
     * Obtiene todos los EmpleadoRol.
     * @returns {Promise<EmpleadoRol[]>} - Arreglo de objetos de tipo EmpleadoRol
     */
    static async getAll() {
        const empleadorol = await dataBase.query("select * from EmpleadoRol")

        return empleadorol.map((empleadorol) => new EmpleadoRol(empleadorol))
    }
}