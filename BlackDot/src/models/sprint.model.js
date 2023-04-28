/**
 * @file sprint.model.js
 * @brief Data model for the Sprint table
 * @author Carlos Salguero (fixes)
 * @version 1.0
 * @date 2021-03-24
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class Sprint
 * @classdesc Clase que representa un modelo de Sprint
 * @property {int} id - Identificador del sprint
 * @property {string:Date} FechaCreacion - Fecha de creacion del sprint
 * @property {string:Date} FechaFinalizacion - Fecha de finalizacion del sprint
 * @property {int} numeroSprint - Numero de sprint
 **/

module.exports = class Sprint {
  /**
   * @brief
   * Creaates a new instance of Sprint. If no parameters are provided,
   * the default values are used
   * @param {*} Sprint - Objeto de tipo Sprint
   */
  constructor(Sprint) {
    this.idSprint = Sprint.idSprint
    this.jiraID = Sprint.jiraID || 0
    this.sprintName = Sprint.sprintName || ""
    this.state = Sprint.state || "To Do"
    this.boardID = Sprint.boardID || 0
    this.fechaCreacion = Sprint.fechaCreacion
      || new Date().toISOString().slice(0, 19).replace('T', ' ')
    this.fechaFinalizacion = Sprint.fechaFinalizacion
      || new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  /**
   * @brief
   * Funcion que obtiene un sprint por su id
   * @param {*} id - Identificador del sprint
   * @returns {Sprint} - Objeto de tipo sprint
   */

  static async getbyID(id) {
    if (!id) throw new Error("No se envio el id")

    const [sprint, _] = await dataBase.query(
      "select * from sprint where idSprint = ?",
      [id]
    )

    return sprint

  }

  /**
   * @brief
   * Obtains a sprint by its jira key
   * @param {string} jiraID - Jira key of the sprint
   */
  static async getByJiraID(jiraID) {
    const [sprint] = await dataBase.query(
      "select * from sprint where jiraID = ?",
      [jiraID]
    )

    if (sprint.length === 0) return null

    return new Sprint(sprint[0])
  }

  /**
   * @brief
   * Funcion que obtiene todos los sprints
   * @returns {Sprint[]} - Arreglo de objetos de tipo sprint
   */

  static async getAll() {
    const [sprints, _] = await dataBase.query("select * from sprint")
    return sprints
  }

  /**
   * @brief
   * FUncion que obtiene el sprunt actual
   * @returns {Sprint} - Objeto de tipo sprint
   * @throws {Error} - Lanza un error si no se pudo obtener el sprint
   * actual
   * */

  static async getSprintActual() {
    const estado = "active"
    const [sprint, _] = await dataBase.query(
      "select * from sprint where state = ?",
      [estado]
    )

    return sprint
  }


  /**
   * @brief
   * Saves a sprint in the database if it doesn't exist. If it does exist,
   * it updates the sprint.
   * @returns {Sprint} - Returns the saved sprint object
   * @throws {Error} - Throws an error if the sprint couldn't be saved
   */
  async save() {
    try {
      const existingSprint = await Sprint.getByJiraID(this.jiraID)

      if (existingSprint) {
        const [result, _] = await dataBase.query(
          "UPDATE sprint SET sprintName = ?, state = ?, boardID = ?, FechaCreacion = ?, FechaFinalizacion = ? WHERE jiraID = ?",
          [
            this.sprintName,
            this.state,
            this.boardID,
            this.fechaCreacion,
            this.fechaFinalizacion,
            this.jiraID,
          ]
        )

        if (result.affectedRows === 0) {
          throw new Error("No se pudo actualizar el sprint")
        }

        this.idSprint = existingSprint.idSprint
      }
      else {

        const [result, _] = await dataBase.query(
          "INSERT INTO sprint (jiraID, sprintName, state, boardID, FechaCreacion, FechaFinalizacion) VALUES (?, ?, ?, ?, ?, ?)",
          [
            this.jiraID,
            this.sprintName,
            this.state,
            this.boardID,
            this.fechaCreacion,
            this.fechaFinalizacion,
          ]
        )

        if (result.affectedRows === 0) {
          throw new Error("No se pudo guardar el sprint")
        }

        this.idSprint = result.insertId
      }
      return this
    } catch (error) {
      console.log(error)
      throw new Error(`Error al guardar el sprint: ${error.message}`)
    }
  }
}
