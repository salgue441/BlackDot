/**
 * @file rol.model.js
 * @brief Modelo de la tabla de rol
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-27
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de rol
 * @property {int} idRol - Identificador del rol
 * @property {varchar} nombreRol - Nombre del rol
 */
module.exports = class Rol {
  /**
   * @brief
   * Constructor de la clase Rol
   * @param {*} Rol - Objeto de tipo Rol
   */
  constructor(Rol) {
    this.idRol = Rol.idRol
    this.nombreRol = Rol.nombreRol
  }

  /**
   * @brief
   * Obtiene un Rol de acuerdo con el ID
   * @param {*} idRol - ID del rol
   * @returns {object} - Objeto de tipo Rol
   */
  static async getByID(idRol) {
    try {
      const query = `select * from rol where idRol = ?`
      const [rol, _] = await dataBase.query(query, [idRol])

      return new Rol(rol[0])
    } catch (error) {
      console.log(error)
      throw new Error("Error al obtener el rol")
    }
  }

  /**
   * @brief
   * Obtiene todos los Roles.
   * @returns {Promise<Rol[]>} - Arreglo de objetos de tipo Rol
   */
  static async getAll() {
    const [roles, _] = await dataBase.query("select * from rol")

    return roles
  }

  /**
   * @brief
   * Guarda un Rol en la base de datos.
   * @returns {Promise<Rol>} - Query del rol guardado
   * @throws {Error} - Si no se ha proporcionado un nombre de Rol
   */
  save() {
    if (!this.nombreRol) throw new Error("No se ha proporcionado nombre de rol")

    return dataBase.query("insert into rol (nombreRol) values (?)", [
      this.nombreRol,
    ])
  }

  /**
   * @brief
   * Verifica si una rol existe en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el nombreRol
   * @throws {Error} - Si nombreRol es muy largo
   */
  async verify() {
    if (!this.nombreRol) throw new Error("No se ha proporcionado un nombreRol")
    if (this.nombreRol.length > 25) throw new Error("El nombreRol es muy largo")

    const [rol] = await dataBase.query(
      "select * from rol where nombreRol = ?",
      [this.nombreRol]
    )

    return Boolean(rol)
  }

  /**
   * @brief
   * Elimina un rol segun su ID de la base de datos.
   * @param {number} idRol - ID del rol
   * @returns {boolean} - True si se elimino, false si no
   * @throws {Error} - Si no se envia el ID
   * @throws {Error} - Si el ID no es un numero
   */
  async deleteByID(idRol) {
    if (!idRol) throw new Error("No se envio el ID")
    if (typeof idRol !== "number") throw new Error("El ID debe ser un numero")

    const result = await dataBase.query(`delete from rol where idRol = $1`, [
      idRol,
    ])

    return result.rowCount > 0
  }
}
