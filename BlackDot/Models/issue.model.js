/**
 * @file issue.model.js
 * @brief Modelo de la tabla de issues
 * @author Diego Llaca
 * @version 1.0
 * @date 2023-03-24
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

module.exports = class Issue {
  constructor(Issue) {
    this.idIssue = Issue.idIssue
    this.nombreIssue = Issue.nombreIssue
    this.storyPoints = Issue.storyPoints
    this.labelIssue = Issue.labelIssue
    this.prioridadIssue = Issue.prioridadIssue
    this.estadoIssue = Issue.estadoIssue
    this.fechaCreacion = Issue.fechaCreacion
    this.fechaFinalizacion = Issue.fechaFinalizacion
  }

  /**
   * @brief
   * Obtiene un issue de acuerdo con el ID.
   * @param {*} idIssue - ID del issue
   * @returns {object} - Objeto de tipo Issue
   */
  static async getByID(idIssue) {
    if (!idIssue) throw new Error("No se ha proporcionado un ID")

    const [issue] = await dataBase.query(
      "select * from Issue where idIssue = ?",
      [idIssue]
    )

    return new Issue(issue)
  }

  /**
   * @brief
   * Obtiene todos los Issues.
   * @returns {Promise<Issue[]>} - Arreglo de objetos de tipo Issue
   */
  static async getAll() {
    const [issues, _] = await dataBase.query("select * from Issue")

    return issues
  }

  /**
   * @brief
   * Verifica si un issue existe en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el nombre del issue
   * @throws {Error} - Si el nombre del issue es muy largo
   * @throws {Error} - Si no se envia el label del issue
   * @throws {Error} - Si el label del issue es muy largo
   */
  async verify() {
    if (!this.nombreIssue)
      throw new Error("No se ha proporcionado un nombre de issue")
    if (this.nombreIssue.length > 150) throw new Error("El nombre es muy largo")
    if (!this.labelIssue)
      throw new Error("No se ha proporcionado un label de issue")
    if (this.labelIssue.length > 50) throw new Error("El label es muy largo")

    const [issue] = await dataBase.query(
      "select * from Issue where nombreIssue = ? and labelIssue = ?",
      [this.nombreIssue, this.labelIssue]
    )

    return Boolean(issue)
  }

  /**
   * @brief
   * Guarda un issue en la base de datos.
   * @returns {Promise<Issue>} - Query del issue guardado
   * @throws {Error} - Si no se ha proporcionado un nombre de Issue
   * @throws {Error} - Si no se ha proporcionado un label de Issue
   */
  save() {
    if (!this.nombreIssue)
      throw new Error("No se ha proporcionado nombre de issue")
    if (!this.labelIssue)
      throw new Error("No se ha proporcionado un label de issue")

    return dataBase.query(
      "insert into Issue (nombreIssue, storyPoints, labelIssue, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion) values (?, ?, ?, ?, ?, ?, ?)",
      [
        this.nombreIssue,
        this.storyPoints,
        this.labelIssue,
        this.prioridadIssue,
        this.estadoIssue,
        this.fechaCreacion,
        this.fechaFinalizacion,
      ]
    )
  }
}
