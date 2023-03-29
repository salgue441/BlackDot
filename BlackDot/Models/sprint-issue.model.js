/**
 * @file sprint-issue.model.js
 * @brief Modelo de la tabla de sprint-issue
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Yuna Chung
 * @author Ivan Paredes
 * @version 1.0
 * @date 2023-03-24
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

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

    const [sprint] = await dataBase.query(
      "select * from SprintIssue where idSprint = ?",
      [idSprint]
    )

    return new SprintIssue(sprint)
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
}
