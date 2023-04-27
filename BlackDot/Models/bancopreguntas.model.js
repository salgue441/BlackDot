/**
 * @file pregunta.model.js
 * @brief banco de preguntas model (Preguntas)
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Yuna Chung
 * @author Ivan Paredes
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../Utils/dataBase")

/**
 * @class BancoPregunta
 * @classdesc  BancoPreguntas model 
 * @property {number} idPreguntaBanco - question id
 * @property {string} contenido - question content
 * @property {string} tipoPregunta - question type
*/

module.exports = class BancoPregunta {
  constructor(bancoPregunta) {
    this.idPreguntaBanco = bancoPregunta.idPreguntaBanco
    this.contenido = bancoPregunta.contenido
    this.tipoPregunta = bancoPregunta.tipoPregunta
  }

  /**
   * @brief
   * obtains a question by ID
   * @param {number} idPreguntaBanco - question id
   * @returns {Promise<Pregunta>} - question object
   */

  static async getByID(idPreguntaBanco) {
    if (!idPreguntaBanco) throw new Error("No se ha proporcionado un ID")

    const [pregunta] = await dataBase.query(
      "select * from bancoPreguntas where idPreguntaBanco = ?",
      [idPreguntaBanco]
    )

    if (pregunta.length === 0) throw new Error("Pregunta no encontrada")

    return new BancoPregunta(pregunta[0])
  }

  /**
   * @brief
   * delete a question by ID
   * @param {number} idPreguntaBanco - question id
   * @returns {Promise<Pregunta>} - question object
   * @throws {Error} - if no ID is provided
   * @throws {Error} - if the ID is not a number
   * @throws {Error} - if question is not found
   * @throws {Error} - if question is not deleted
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
   * get all questions
   * @returns {Promise<Pregunta[]>} - array of question objects
   */
  static async getAll() {
    const [preguntas, _] = await dataBase.query("select * from bancoPreguntas")

    return preguntas
  }

  /**
   * @brief
   * save a question in the database
   * @returns {Promise<Pregunta>} - question object
   * @throws {Error} - if no content is provided
   * @throws {Error} - if no question type is provided
   * */

  async save() {
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")

    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const query = `insert into bancoPreguntas (contenido, tipoPregunta) values(?, ?)`
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
   * update a question in the database
   * @returns {Promise<Pregunta>} - question object
   * @throws {Error} - if no ID is provided
   * @throws {Error} - if no content is provided
   * @throws {Error} - if no question type is provided
   * */

  async update() {
    if (!this.idPreguntaBanco) throw new Error("No se ha proporcionado un ID")
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const query = `update bancoPreguntas set contenido = ?, tipoPregunta = ? where idPreguntaBanco = ?`
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
   * verify if a question meets the requirements to be saved in the database.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - if no content is provided
   * @throws {Error} - if content is too long
   * @throws {Error} - if no question type is provided
   */

  async verify() {
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")
    if (this.contenido.length > 300)
      throw new Error("El contenido es muy largo")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const [pregunta] = await dataBase.query(
      "select * from bancoPreguntas where contenido = ? and tipoPregunta = ?",
      [this.contenido, this.tipoPregunta]
    )

    return Boolean(pregunta)
  }
}
