/**
 * @file Epica.model.js
 * @brief Modelo de la tabla de Epica
 * @author Olimpia Garcia
 * @author Carlos Salguero (Fixes)
 * @version 0.1
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
  static async getByJiraID(jiraID) {
    if (!jiraID) throw new Error("No se envio el id")

    const epica = await dataBase.query(
      "select * from epica where jiraID = ?",
      [jiraID]
    )

    return new Epica(epica)
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
      const existingSprint = await Epica.getByJiraID(this.jiraID)

      if (existingSprint) {
        const query = `update epica set jiraKey = ?, nombreEpica = ? where jiraID = ?`

        const [result, _] = await dataBase.query(query, [
          this.jiraKey,
          this.nombreEpica,
          this.jiraID,
        ])

        return result
      }

      const query = `insert into epica (jiraID, jiraKey, nombreEpica) values (?, ?, ?)`

      const [result, _] = await dataBase.query(query, [
        this.jiraID,
        this.jiraKey,
        this.nombreEpica,
      ])


      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}
