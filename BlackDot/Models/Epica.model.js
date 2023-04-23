/**
 * @file Epica.model.js
 * @brief Modelo de la tabla de Epica
 * @author Olimpia Garcia
 * @author Carlos Salguero (Fixes)
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de epicas
 * @property {int} idEpica - Identificador epica
 * @property {varchar} nombreEpica - Nombre de la epica
 */

module.exports = class Epica {
  /**
   * @brief Cosntructor de la clase Epica
   * @param {*} Epica - Objeto de tipo Epica
   */
  constructor(Epica) {
    this.idEpica = Epica.idEpica || 0
    this.jiraID = Epica.jiraID || 0
    this.jiraKey = Epica.jiraKey || ""
    this.nombreEpica = Epica.nombreEpica || ""
  }

  /**
   * @brief
   * Gets an epic by its id
   * @param {*} idEpica - epic id
   * @returns {object} - Object of type epic
   */
  static async getByID(idEpica) {
    if (!idEpica) throw new Error("No se envio el id")

    const epica = await dataBase.query(
      "select * from epica where idEpica = ?",
      [idEpica]
    )

    return new Epica(epica)
  }

  /**
   * @brief
   * Gets an epic by its jira key
   * @param {*} jiraID - epic jira key
   * @returns {object} - Object of type epic
   * @throws {Error} - if jiraID is not provided or is not a string
   */
  /**
   * @brief
   * Obtains an epica by its jira ID
   * @param {string} jiraID - Jira ID of the epica
   */
  static async getByJiraID(jiraID) {
    const [epica] = await dataBase.query(
      "select * from epica where jiraID = ?",
      [jiraID]
    )

    if (epica.length === 0) return null

    return epica[0]
  }

  /**
   * @brief
   * Gets epics by their jiraID and epicName
   * @param {*} jiraID - epic jira key
   * @param {*} nombreEpica - epic name
   * @returns {object} - Object of type epic
   */
  static async getByJiraIDAndName(jiraID, nombreEpica) {
    if (!jiraID) throw new Error("No se envio el id")
    if (!nombreEpica) throw new Error("No se envio el nombre")

    const [epica] = await dataBase.query(
      "select * from epica where jiraID = ? and nombreEpica = ?",
      [jiraID, nombreEpica]
    )

    return epica
  }

  /**
   * @brief
   * Gets all epics
   * @returns {object} - Object of type epic
   * @throws {Error} - Error if there is no epic
   * @returns {object} - Object of type epic
   */
  static async getAll() {
    const [epicas, _] = await dataBase.query("select * from epica")

    return epicas
  }

  /**
   * @brief
   * Saves an epic in the database if it does not exist. If it exists,
   * it updates it
   * @returns {object} - Object of type epic
   */
  async save() {
    try {
      const existingEpica = await Epica.getByJiraID(this.jiraID)

      if (existingEpica) {
        const [result, _] = await dataBase.query(
          "update epica set jiraKey = ?, nombreEpica = ? where jiraID = ?",
          [this.jiraKey, this.nombreEpica, this.jiraID]
        )

        if (result.affectedRows === 0) throw new Error("No se pudo actualizar")

        this.idEpica = existingEpica.idEpica
      } else {
        const [result, _] = await dataBase.query(
          "insert into epica (jiraID, jiraKey, nombreEpica) values (?, ?, ?)",
          [this.jiraID, this.jiraKey, this.nombreEpica]
        )

        if (result.affectedRows === 0) throw new Error("No se pudo insertar")

        this.idEpica = result.insertId
      }

      return this
    } catch (error) {
      throw new Error(error)
    }
  }
}
