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
    this.issueKey = Issue.issueKey || ""
    this.nombreIssue = Issue.nombreIssue || ""
    this.storyPoints = Issue.storyPoints || 0
    this.labelIssue = Issue.labelIssue || ""
    this.prioridadIssue = Issue.prioridadIssue || "Lowest"
    this.estadoIssue = Issue.estadoIssue || "To Do"
    this.fechaCreacion = Issue.fechaCreacion || new Date()
    this.fechaFinalizacion = Issue.fechaFinalizacion || null
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
   * Saves an issue in the database. If the issue already exists, it updates it.
   * @return {Object} - Returns the issue saved
   */
  async save() {
    try {
      if (await this.exists()) {
        const [result] = await dataBase.query(
          "update issue set ? where idIssue = ?",
          [this, this.idIssue]
        )

        return result
      }

      const query =
        "insert into issue (issueKey, nombreIssue, storyPoints, labelIssue, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion) values (?, ?, ?, ?, ?, ?, ?, ?)"

      const [result] = await dataBase.query(query, [
        this.issueKey,
        this.nombreIssue,
        this.storyPoints,
        this.labelIssue,
        this.prioridadIssue,
        this.estadoIssue,
        this.fechaCreacion,
        this.fechaFinalizacion,
      ])

      this.idIssue = result.insertId

      return result
    } catch (error) {
      console.log(error)
      throw new Error(`Error al guardar el issue: ${error.message}`)
    }
  }

  /**
   * @brief
   * Verifies if an issue exists in the database
   */
  async exists() {
    try {
      const issue = await Issue.getByID(this.idIssue)

      return Boolean(issue)
    } catch (error) {
      return false
    }
  }

  /**
   * @brief
   * Finds an issue by query
   * @param {*} query  - Query to find the issue
   * @returns {Object} - Returns the issue found
   */
  static async findOne(query) {
    try {
      const [issue] = await dataBase.query("select * from issue where ?", query)

      return issue
    } catch (error) {
      throw new Error(`Error al buscar el issue: ${error.message}`)
    }
  }
}
