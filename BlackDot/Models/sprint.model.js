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
   * Constructor de la clase Sprint
   * @param {*} Sprint - Objeto de tipo Sprint
   */

  constructor(Sprint) {
    this.id = Sprint.id
    this.sprintName = Sprint.sprintName
    this.state = Sprint.state
    this.boardID = Sprint.boardID
    this.FechaCreacion = Sprint.FechaCreacion
    this.FechaFinalizacion = Sprint.FechaFinalizacion
    this.idEpica = Sprint.idEpica
  }

  /**
   * @brief
   * Funcion que obtiene un sprint por su id
   * @param {*} id - Identificador del sprint
   * @returns {Sprint} - Objeto de tipo sprint
   */

  static async getbyID(id) {
    if (!id) throw new Error("No se envio el id")

    const sprint = await dataBase.query(
      "select * from Sprint where idSprint = ?",
      [id]
    )

    return new Sprint(sprint)
  }

  /**
   * @brief
   * Funcion que obtiene todos los sprints
   * @returns {Sprint[]} - Arreglo de objetos de tipo sprint
   */

  static async getAll() {
    const [sprints, _] = await dataBase.query("select * from Sprint")
    return sprints
  }

  static async getSprintActual() {
    const fechaActual = new Date().toISOString().split("T")[0]
    const [sprint, _] = await dataBase.query(
      "select * from Sprint where FechaCreacion <= ? and FechaFinalizacion >= ?",
      [fechaActual, fechaActual]
    )

    const sprintNew = new Sprint({
      id: sprint[0].idSprint,
      FechaCreacion: sprint[0].fechaCreacion,
      FechaFinalizacion: sprint[0].fechaFinalizacion,
      numeroSprint: sprint[0].numeroSprint,
      idEpica: sprint[0].idEpica,
    })
    return sprintNew
  }

  /**
   * @brief
   * Saves a sprint in the database
   * @returns {Sprint} - Returns the saved sprint
   */
  static async save() {
    try {
      const query = `insert into Sprint (sprintName, state, boardID, fechaCreacion, fechaFinalizacion, idEpica) values (?, ?, ?, ?, ?, ?)`

      const [result] = await dataBase.query(query, [
        this.sprintName,
        this.state,
        this.boardID,
        this.FechaCreacion,
        this.FechaFinalizacion,
        this.idEpica,
      ])

      const newSprint = await Sprint.getByID(result.insertId)

      return newSprint
    } catch (error) {
      throw new Error(`Error al guardar el sprint: ${error.message}`)
    }
  }
}
