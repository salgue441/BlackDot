/**
 * @file rol-privilegio.model.js
 * @brief Modelo de la tabla rolPrivilegio
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-28
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../Utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de rolPrivilegio
 * @property {int} idRol - Identificador del rol
 * @property {int} idPrivilegio - Identificador del privilegio
 *
 */
module.exports = class RolPrivilegio {
  constructor(RolPrivilegio) {
    this.idRol = RolPrivilegio.idRol
    this.idPrivilegio = RolPrivilegio.idPrivilegio
  }

  /**
   * @brief
   * Obtiene un RolPrivilegio de acuerdo con el ID de privilegio.
   * @param {*} idPrivilegio - ID del privilegio
   * @returns {object} - Objeto de tipo RolPrivilegio
   */
  static async getByIDP(idPrivilegio) {
    if (!idPrivilegio)
      throw new Error("No se ha proporcionado un ID de privilegio")

    const [privilegio] = await dataBase.query(
      "select * from rolprivilegio where idPrivilegio = ?",
      [idPrivilegio]
    )

    return new RolPrivilegio(privilegio)
  }

  /**
   * @brief
   * Obtiene un RolPrivilegio de acuerdo con el ID de rol.
   * @param {*} idRol - ID del rol
   * @returns {object} - Objeto de tipo RolPrivilegio
   */
  static async getByIDR(idRol) {
    if (!idRol) throw new Error("No se ha proporcionado un ID de rol")

    const [rol] = await dataBase.query(
      "select * from rolprivilegio where idRol = ?",
      [idRol]
    )

    return new RolPrivilegio(rol)
  }

  /**
   * @brief
   * Obtiene todos los RolPrivilegio.
   * @returns {Promise<RolPrivilegio[]>} - Arreglo de objetos de tipo RolPrivilegio
   */
  static async getAll() {
    const rolprivilegio = await dataBase.query("select * from rolprivilegio")

    return rolprivilegio.map(
      (rolprivilegio) => new RolPrivilegio(rolprivilegio)
    )
  }
}
