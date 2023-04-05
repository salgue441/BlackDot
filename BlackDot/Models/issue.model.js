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

/**
 * @class
 * Class Issue
 * @param {Int} idIssue - Issue ID
 * @param {String} nombreIssue - Issue name
 * @param {Int} storyPoints - Issue story points
 * @param {Enum} prioridadIssue - Issue priority
 * @param {Enum} estadoIssue - Issue status
 * @param {Date} fechaCreacion - Issue creation date
 * @param {Date} fechaFinalizacion - Issue resolution date
 */
module.exports = class Issue {
  /**
   * @brief
   * Constructs a new instance.
   */
  constructor(Issue) {
    this.idIssue = Issue.idIssue
    this.nombreIssue = Issue.nombreIssue
    this.storyPoints = Issue.storyPoints
    this.prioridadIssue = Issue.prioridadIssue
    this.estadoIssue = Issue.estadoIssue
    this.fechaCreacion = Issue.fechaCreacion
    this.fechaFinalizacion = Issue.fechaFinalizacion
  }

  /**
   * @brief
   * Gets an issue by ID
   * @param {Int} idIssue - Issue ID
   * @return {Object} - Returns an issue
   * @throws {Error} - Returns an error if the issue doesn't exist
   * @throws {Error} - Returns an error if the ID is not provided
   * @throws {Error} - Returns an error if the ID is not a number
   * @throws {Error} - Returns an error if the ID is not an integer
   */
  static async getByID(idIssue) {
    if (!idIssue) {
      throw new Error("No se ha proporcionado un ID")
    }

    if (typeof idIssue !== "number") {
      throw new Error("El ID no es un número")
    }

    if (!Number.isInteger(idIssue)) {
      throw new Error("El ID no es un número entero")
    }

    const query = `select * from issue where idIssue = ?`
    const [rows] = await dataBase.query(query, [idIssue])

    if (rows.length === 0) {
      throw new Error("No existe el issue")
    }

    return new Issue(rows[0])
  }

  /**
   * @brief
   * Gets all issues
   * @return {Array} - Returns an array of issues
   */
  static async getAll() {
    const [issues, _] = await dataBase.query("select * from issue")

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
  static async verify(issueData) {
    if (!issueData.nombreIssue) {
      throw new Error("No se ha proporcionado el nombre del issue")
    }

    if (typeof issueData.nombreIssue !== "string") {
      throw new Error("El nombre del issue no es un string")
    }

    if (issueData.nombreIssue.length > 150) {
      throw new Error("El nombre es demasiado largo")
    }

    if (!issueData.labelIssue) {
      throw new Error("No se ha proporcionado un label de issue")
    }

    if (typeof issueData.labelIssue !== "string") {
      throw new Error("El label del issue no es un string")
    }

    if (issueData.labelIssue.length > 50) {
      throw new Error("El label es demasiado largo")
    }

    const [issue] = await dataBase.query(
      "select * from Issue where nombreIssue = ? and labelIssue = ?",
      [issueData.nombreIssue, issueData.labelIssue]
    )

    return Boolean(issue) || false
  }

  /**
   * @brief
   * Saves an issue in the database
   * @return {Object} - Returns the issue saved
   */
  async save() {
    try {
      const query = `insert into issue (nombreIssue, storyPoints, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion) values (?, ?, ?, ?, ?, ?)`

      const [result] = await dataBase.query(query, [
        this.nombreIssue,
        this.storyPoints,
        this.prioridadIssue,
        this.estadoIssue,
        this.fechaCreacion,
        this.fechaFinalizacion,
      ])

      this.idIssue = result.insertId

      return this
    } catch (error) {
      throw new Error(`Error al guardar el issue: ${error.message}`)
    }
  }
}
