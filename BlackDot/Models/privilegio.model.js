/**
 * @file privilegio.model.js
 * @brief Modelo de la tabla de privilegio
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-27
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../Utils/dataBase")

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
    this.idPrivilegio = Privilegio.idPrivilegio
    this.nombrePrivilegio = Privilegio.nombrePrivilegio
    this.descripcionPrivilegio = Privilegio.descripcionPrivilegio
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
      "select * from privilegio where idPrivilegio = ?",
      [idPrivilegio]
    )

    return new Privilegio(privilegio)
  }

  /**
   * @brief
   * Obtiene todos los Privilegios.
   * @returns {Promise<Privilegio[]>} - Arreglo de objetos de tipo Privilegio
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
   * @throws {Error} - Si no se ha proporcionado una descripción de Privilegio
   */
  save() {
    if (!this.nombrePrivilegio)
      throw new Error("No se ha proporcionado nombre de privilegio")
    if (!this.descripcionPrivilegio)
      throw new Error("No se ha proporcionado una descripción de privilegio")

    return dataBase.query(
      "insert into privilegio (nombrePrivilegio, descripcionPrivilegio) values (?, ?)",
      [this.nombrePrivilegio, this.descripcionPrivilegio]
    )
  }

  /**
   * @brief
   * Verifica si un privilegio existe en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el id de privilegio
   */
  static async verify(Privilegio) {
    if (!Privilegio.idPrivilegio)
      throw new Error("No se ha proporcionado un id de privilegio")

    const [privilegio] = await dataBase.query(
      "select * from privilegio where idPrivilegio = ?",
      [Privilegio.idPrivilegio]
    )
  }

  /**
   * @brief
   * Verifica si una privilegio existe en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el nombrePrivilegio
   * @throws {Error} - Si nombrePrivilegio es muy largo
   * @throws {Error} - Si no se envia descripcionPrivilegio
   * @throws {Error} - Si descripcionPrivilegio es muy largo
   */
  async verify() {
    if (!this.nombrePrivilegio)
      throw new Error("No se ha proporcionado un nombrePrivilegio")
    if (this.nombrePrivilegio.length > 50)
      throw new Error("El nombrePrivilegio es muy largo")

    if (!this.descripcionPrivilegio)
      throw new Error("No se ha proporcionado una descripcionPrivilegio")
    if (this.nombrePrivilegio.length > 200)
      throw new Error("El nombrePrivilegio es muy largo")

    const [privilegio] = await dataBase.query(
      "select * from privilegio where nombrePrivilegio = ? and descripcionPrivilegio = ?",
      [this.nombrePrivilegio, this.descripcionPrivilegio]
    )

    return Boolean(privilegio)
  }

  /**
   * @brief
   * Elimina un privilegio segun su ID de la base de datos.
   * @param {number} idPrivilegio - ID del privilegio
   * @returns {boolean} - True si se elimino, false si no
   * @throws {Error} - Si no se envia el ID
   * @throws {Error} - Si el ID no es un numero
   */
  async deleteByID(idPrivilegio) {
    if (!idPrivilegio) throw new Error("No se envio el ID")
    if (typeof idPrivilegio !== "number")
      throw new Error("El ID debe ser un numero")

    const result = await dataBase.query(
      `delete from privilegio where idPrivilegio = $1`,
      [idPrivilegio]
    )

    return result.rowCount > 0
  }
}
