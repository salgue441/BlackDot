/**
 * @file sprint-issue.model.js
 * @brief Modelo de la tabla de sprint-issue
 * @author Diego Llaca
 * @version 1.0
 * @date 2023-03-29
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../Utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de sprintissue
 * @property {int} idIssue - Identificador del issue
 * @property {int} idSprint - Identificador del sprint
 *
 */

module.exports = class SprintIssue {
  constructor(SprintIssue) {
    this.idIssue = SprintIssue.idIssue
    this.idSprint = SprintIssue.idSprint
  }

  /**
   * @brief
   * Obtiene un SprintIssue de acuerdo con el ID de issue.
   * @param {*} idIssue - ID del issue
   * @returns {object} - Objeto de tipo SprintIssue
   */
  static async getByIDI(idIssue) {
    if (!idIssue) throw new Error("No se ha proporcionado un ID de issue")

    const [issue] = await dataBase.query(
      "select * from SprintIssue where idIssue = ?",
      [idIssue]
    )

    return new SprintIssue(issue)
  }

  /**
   * @brief
   * Obtiene un SprintIssue de acuerdo con el ID de sprint.
   * @param {*} idSprint - ID del sprint
   * @returns {object} - Objeto de tipo SprintIssue
   */
  static async getByIDS(idSprint) {
    if (!idSprint) throw new Error("No se ha proporcionado un ID de sprint")

    const [sprint, _] = await dataBase.query(
      "select * from SprintIssue where idSprint = ?",
      [idSprint]
    )

    return sprint
  }

  /**
   * @brief
   * Obtiene todos los SprintIssues.
   * @returns {Promise<SprintIssue[]>} - Arreglo de objetos de tipo SprintIssue
   */
  static async getAll() {
    const [sprintissue, _] = await dataBase.query("select * from SprintIssue")

    return sprintissue
  }

  /**
   * @brief
   * Saves a new SprintIssue. If the SprintIssue already exists, 
   * it will be updated.
   * @returns {Promise<SprintIssue>} - Objeto de tipo SprintIssue
   * @throws {Error} - Si no se ha proporcionado un ID de issue o un ID de sprint
   */
  async save() {
    if (!this.idIssue) throw new Error("No se ha proporcionado un ID de issue")
    if (!this.idSprint) throw new Error("No se ha proporcionado un ID de sprint")

    const [sprintissue, _] = await dataBase.query(
      "insert into SprintIssue (idIssue, idSprint) values (?, ?) on duplicate key update idSprint = ?",
      [this.idIssue, this.idSprint, this.idSprint]
    )

    return this
  }
}
