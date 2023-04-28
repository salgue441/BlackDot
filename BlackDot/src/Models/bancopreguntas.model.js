/**
 * @file pregunta.model.js
 * @brief Questions model
 * @author Diego Sandoval
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/** 
 * @class BancoPregunta
 * @classdesc Questions model
 * @property {number} idPreguntaBanco - Question ID
 * @property {string} contenido - Question content
 * @property {string} tipoPregunta - Question type
 * @returns {object} - Question object
 */
module.exports = class BancoPregunta {
  constructor(bancoPregunta) {
    this.idPreguntaBanco = bancoPregunta.idPreguntaBanco
    this.contenido = bancoPregunta.contenido
    this.tipoPregunta = bancoPregunta.tipoPregunta
  }

  /**
   * @brief
   * Obtains a question by ID.
   * @param {number} idPreguntaBanco -Question ID
   * @returns {Promise<Pregunta>} - Object of type Pregunta
   */

  static async getByID(idPreguntaBanco) {
    if (!idPreguntaBanco) throw new Error("No se ha proporcionado un ID")

    const [pregunta] = await dataBase.query(
      "select * from BancoPreguntas where idPreguntaBanco = ?",
      [idPreguntaBanco]
    )

    if (pregunta.length === 0) throw new Error("Pregunta no encontrada")

    return new BancoPregunta(pregunta[0])
  }

  /**
   * @brief
   * delete a question by ID.
   * @param {number} idPreguntaBanco - Question ID
   * @returns {Promise<Pregunta>} - Object of type Pregunta
   * @throws {Error} - if the ID is not provided
   * @throws {Error} - if the ID is not a number
   * @throws {Error} - if the ID is not an integer
   * @throws {Error} - if the ID is not found
   * */

  static async deleteByID(idPreguntaBanco) {
    if (!idPreguntaBanco) throw new Error("No se envio el ID")
    if (typeof idPreguntaBanco !== "number")
      throw new Error("El ID debe ser un numero")

    if (!Number.isInteger(idPreguntaBanco))
      throw new Error("El ID debe ser un numero entero")

    const result = await dataBase.query(
      `delete from bancoPreguntas where idPreguntaBanco = ?`,
      [idPreguntaBanco]
    )

    return result.rowCount > 0
  }

  /**
   * @brief
   * obtains all questions.
   * @returns {Promise<Pregunta[]>} - Array of type Pregunta
   */
  static async getAll() {
    const [preguntas, _] = await dataBase.query("select * from BancoPreguntas")

    return preguntas
  }

  /**
   * @brief
   * Gsave a question in the database.
   * @returns {Promise<Pregunta>} - Object of type Pregunta
   * @throws {Error} - if the content is not provided
   * @throws {Error} - if the type of question is not provided
   * @throws {Error} - if the question could not be saved
   * */

  async save() {
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")

    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const query = `insert into BancoPreguntas (contenido, tipoPregunta) values(?, ?)`
    const result = await dataBase.query(query, [
      this.contenido,
      this.tipoPregunta,
    ])

    if (result.affectedRows === 0)
      throw new Error("La pregunta no se pudo guardar")

    this.idPreguntaBanco = result.insertId
    return this
  }

  /**
   * @brief
   * Update a question in the database.
   * @returns {Promise<Pregunta>} - Object of type Pregunta
   * @property {number} idPreguntaBanco - Question ID
   * @property {string} contenido - Question content
   * @property {string} tipoPregunta - Question type
   * @throws {Error} - if the ID is not provided
   * @throws {Error} - if the content is not provided
   * @throws {Error} - if the type of question is not provided
   * @throws {Error} - if the question could not be updated
   * */

  async update() {
    if (!this.idPreguntaBanco) throw new Error("No se ha proporcionado un ID")
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const query = `update BancoPreguntas set contenido = ?, tipoPregunta = ? where idPreguntaBanco = ?`
    const result = await dataBase.query(query, [
      this.contenido,
      this.tipoPregunta,
      this.idPreguntaBanco,
    ])

    if (result.affectedRows === 0)
      throw new Error("La pregunta no se pudo actualizar")

    return this
  }

  /**
   * @brief
   * Verify if a question exists in the database.
   * @returns {Promise<boolean>} - True if the question exists, false if not
   * @throws {Error} - if the content is not provided
   * @throws {Error} -if the content is too long
   * @throws {Error} - if the type of question is not provided
   */

  async verify() {
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")
    if (this.contenido.length > 300)
      throw new Error("El contenido es muy largo")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const [pregunta] = await dataBase.query(
      "select * from BancoPreguntas where contenido = ? and tipoPregunta = ?",
      [this.contenido, this.tipoPregunta]
    )

    return Boolean(pregunta)
  }
}
