const dataBase = require("../Utils/dataBase")

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
    this.FechaCreacion = Sprint.FechaCreacion
    this.FechaFinalizacion = Sprint.FechaFinalizacion
    this.numeroSprint = Sprint.numeroSprint
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

    const sprint = await dataBase.query(
      "select * from Sprint where FechaCreacion <= ? and FechaFinalizacion >= ?",
      [fechaActual, fechaActual]
    )

    return new Sprint(sprint)
  }
}
