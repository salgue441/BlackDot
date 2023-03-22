/**
 * @file pregunta.model.js
 * @brief Modelo de la tabla de preguntas
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

const dataBase = require("../utils/dataBase")

module.exports = class Pregunta {
  constructor(Pregunta) {
    this.idPregunta = Pregunta.idPregunta
    this.contenido = Pregunta.contenido
    this.tipoPregunta = Pregunta.tipoPregunta
  }

  /**
   * @brief
   * Obtiene una pregunta de acuerdo con el ID.
   * @param {*} idPregunta - ID de la pregunta
   * @returns {object} - Objeto de tipo Pregunta
   */
  static async getByID(idPregunta) {
    if (!idPregunta) throw new Error("No se ha proporcionado un ID")

    const [pregunta] = await dataBase.query(
      "select * from Pregunta where idPregunta = ?",
      [idPregunta]
    )

    return new Pregunta(pregunta)
  }

  /**
   * @brief
   * Obtiene todas las preguntas.
   * @returns {Promise<Pregunta[]>} - Arreglo de objetos de tipo Pregunta
   */
  static async getAll() {
    const preguntas = await dataBase.query("select * from Pregunta")

    return preguntas.map((pregunta) => new Pregunta(pregunta))
  }

  /**
   * @brief
   * Guarda una pregunta en la base de datos.
   * @returns {Promise<Pregunta>} - Query de la pregunta guardada
   * @throws {Error} - Si no se ha proporcionado un contenido
   * @throws {Error} - Si no se ha proporcionado un tipo de pregunta
   */
  save() {
    if (!this.contenido) throw new Error("No se ha proporcionado un contenido")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado un tipo de pregunta")

    return dataBase.query(
      "insert into Pregunta (contenido, tipoPregunta) values (?, ?)",
      [this.contenido, this.tipoPregunta]
    )
  }

  /**
   * @brief
   * Verifica si una pregunta existe en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el contenido
   * @throws {Error} - Si el contenido es muy largo
   * @throws {Error} - Si no se envia el tipo de pregunta
   */
  static async verify() {
    if (!this.contenido) throw new Error("No se ha proporcionado un contenido")
    if (this.contenido.length > 300)
      throw new Error("El contenido es muy largo")

    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado un tipo de pregunta")

    const [pregunta] = await dataBase.query(
      "select * from Pregunta where contenido = ? and tipoPregunta = ?",
      [this.contenido, this.tipoPregunta]
    )
  }

  /**
   * @brief
   * Elimina una pregunta segun su ID de la base de datos.
   * @param {number} idPregunta - ID de la pregunta
   * @returns {boolean} - True si se elimino, false si no
   * @throws {Error} - Si no se envia el ID
   * @throws {Error} - Si el ID no es un numero
   */
  deleteByID(idPregunta) {
    if (!idPregunta) throw new Error("No se envio el ID")
    if (typeof id !== "number") throw new Error("El ID debe ser un numero")

    const index = this.preguntas.findIndex(
      (pregunta) => pregunta.idPregunta === idPregunta
    )
    if (index === -1) return false

    this.preguntas.splice(index, 1)
    return true
  }
}
