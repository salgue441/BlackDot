/**
 * @file accionable.model.js
 * @brief Model of the Accionable table
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.21
 * @copyright Copyright (c) 2023 - MIT License
 **/

const dataBase = require("../utils/dataBase")

/**
 * @class Accionable
 * @classdesc Model of the Accionable 
 * @property {int} idAccionable - Accionable ID
 * @property {string} nombreAccionable - Accionable name
 * @property {int} storyPoints - StoryPoint assigned to the Accionable
 * @property {string} labelAccionable - Accionable label
 * @property {enum} prioridadAccionable - Accionable priority
 * @property {enum} estadoAccioanble - Accionable state
 * @property {enum} estadoIssue - Issue state
 * @property {string:Date} fechaCreacion - Accionable creation date
 * @property {string:Date} fechaFinalizacion - Accionable finish date
 **/

module.exports = class Accionable {
  /**
   * @brief
   * Constructor de la clase Accionable
   * @param {*} Accionable - Objeto de tipo Accionable
   * @property {int} idAccionable - Accionable ID
   * @property {string} nombreAccionable - Accionable name
   * @property {int} storyPoints - StoryPoint assigned to the Accionable
   * @property {string} labelAccionable - Accionable label
   * @property {enum} prioridadAccionable - Accionable priority
   * @property {enum} estadoAccioanble - Accionable state
   * @property {enum} estadoIssue - Issue state
   * @property {string:Date} fechaCreacion - Accionable creation date
   * @property {string:Date} fechaFinalizacion - Accionable finish date
   **/

  constructor(Accionable) {
    this.idAccionable = Accionable.idAccionable
    this.nombreAccionable = Accionable.nombreAccionable
    this.storyPoints = Accionable.storyPoints
    this.labelAccionable = Accionable.labelAccionable
    this.prioridadAccionable = Accionable.prioridadAccionable
    this.estadoAccionable = Accionable.estadoAccionable
    this.estadoIssue = Accionable.estadoIssue
    this.fechaCreacion = Accionable.fechaCreacion
    this.fechaFinalizacion = Accionable.fechaFinalizacion
  }

  /**
   * @brief
   * Recibe un Accionable de acuerdo con el ID.
   * @param {*} idAccionable - ID del Accionable
   * @returns {object} - Objeto de tipo Accionable
   **/

  static async getbyId(idAccionable) {
    const query = `SELECT * FROM Accionable where idAccionable = ?`
    const [rows] = await dataBase.execute(query, [idAccionable])

    if (rows.length === 0) throw new Error("Accionable no encontrada")

    return new Accionable(rows[0])
  }

  /**
   * @brief
   * Obtiene todos los Accionables.
   * @param {*} idAccionable - ID del Accionable
   * @returns {Accionable[]} - Arreglo de objetos de tipo Accionable
   **/

  static async getAll() {
    const query = `SELECT * FROM Accionable`
    const [rows, _] = await dataBase.execute(query)

    return rows
  }

  /**
   * @brief
   * Obtiene el id del ultimo accionable
   * @param {*} idAccionable - ID del Accionable
   * @returns {int} - id del ultimo accionable
   */
  static async getLastId() {
    const query = `SELECT idAccionable FROM Accionable ORDER BY idAccionable DESC LIMIT 1`

    const [idAccionable, _] = await dataBase.execute(query)

    const id = idAccionable[0].idAccionable

    return id
  }

  /**
   * @brief
   * Guarda un nuevo Accionable
   * @returns {Promise<Accionable>} - Query del Accioanble guardada
   * @property {string} nombreAccionable - Accionable name
   * @property {int} storyPoints - StoryPoint assigned to the Accionable
   * @property {string} labelAccionable - Accionable label 
   **/

  async save() {
    const query = `INSERT INTO Accionable(nombreAccionable, storyPoints, labelAccionable) VALUES (?, ?, ?)`

    const [result] = await dataBase.execute(query, [
      this.nombreAccionable,
      this.storyPoints,
      this.labelAccionable,
    ])

    this.idAccionable = result.insertId
  }

  /**
   * @brief
   * update an accionable
   * @returns {Promise<Accionable>} - Query del Accioanble guardada
   * @property {string} nombreAccionable - Accionable name
   * @property {int} storyPoints - StoryPoint assigned to the Accionable
   * @property {string} labelAccionable - Accionable label
   * @property {enum} prioridadAccionable - Accionable priority
   * @property {enum} estadoAccioanble - Accionable state
   * @property {enum} estadoIssue - Issue state
   * @property {string:Date} fechaCreacion - Accionable creation date
   * @property {string:Date} fechaFinalizacion - Accionable finish date
   * 
   **/
  async update() {
    const query = `UPDATE Accionable SET nombreAccionable = ?, storyPoints = ?, labelAccionable = ?, prioridadAccionable = ?, estadoAccionable = ?, estadoIssue = ?, fechaCreacion = ?, fechaFinalizacion = ? WHERE idAccionable = ?`

    await dataBase.execute(query, [
      this.nombreAccionable,
      this.storyPoints,
      this.labelAccionable,
      this.prioridadAccionable,
      this.estadoAccionable,
      this.estadoIssue,
      this.fechaCreacion,
      this.fechaFinalizacion,
    ])

    this.idAccionable = result.insertId
  }

  /**
   * @brief
   * Modifies the state of an accionable to "Aprobado"
   * @returns {Promise<Accionable>} - Query del Accioanble guardada
   * @property {string} nombreAccionable - Accionable name
   **/

  async updateEstadoAprobado() {
    const query = `UPDATE Accionable SET estadoAccionable = 'Aprobado' WHERE idAccionable = ?`
    await dataBase.execute(query, [this.idAccionable])
  }
}
