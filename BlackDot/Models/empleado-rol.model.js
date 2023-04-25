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
   * Obtiene todos los empleadoRol
   * @returns {EmpleadoRol[]} - Arreglo de objetos de tipo empleadoRol
   */
  static async getAll() {
    const query = `select * from EmpleadoRol`
    const [rows, _] = await dataBase.execute(query)

    return rows
  }

  /**
   * @brief
   * Obtiene todos los empleados con sus caracteristicas y roles
   * @returns {EmpleadoRol[]} - Arreglo de objetos de tipo empleadoRol
   * @throws {Error} - Error message
   * */

  static async getAllWithRoles() {
    const query = `SELECT E.idEmpleado, E.primerNombre, E.apellidoPaterno, E.idGoogleAuth, E.googleEmail, E.googleProfilePicture, ER.idRol, R.nombreRol  FROM empleado E, empleadorol ER, rol R
    WHERE E.idEmpleado = ER.idEmpleado and R.idRol = ER.idRol;`
    const [rows, _] = await dataBase.execute(query)

    return rows
  }

  /**
   * @brief
   * Update a EmpleadoRol
   * @param {object} empleadoRol - Objeto de tipo EmpleadoRol
   * @returns {object} - Objeto de tipo EmpleadoRol
   * @throws {Error} - Error message
   * */

  async update() {
    if (!this) throw new Error("No se ha proporcionado un empleadoRol")

    const query = `UPDATE EmpleadoRol SET idRol = ? WHERE idEmpleado = ?`
    const [result] = await dataBase.execute(query, [
      this.idRol,
      this.idEmpleado,
    ])

    return this
  }

  /**
   * @brief
   * Delete by idEmpleado
   * @param {int} idEmpleado - ID del empleado
   * @returns {object} - Objeto de tipo EmpleadoRol
   * @throws {Error} - Error message
   * */

  static async deleteById(idEmpleado) {
    if (!idEmpleado) throw new Error("No se ha proporcionado un idEmpleado")

    const query = `DELETE FROM EmpleadoRol WHERE idEmpleado = ?`
    const [result] = await dataBase.execute(query, [idEmpleado])

    return result
  }
}
