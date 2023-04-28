/**
 * @file cuantitativa.model.js
 * @brief Modelo de la tabla de respuestas cuantitativa
 * @author Carlos Salguero & Olimpia Garcia
 * @version 1.0
 * @date 2023-03-22
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")


/**
 * @class
 * @classdesc Modelo de la tabla de respuestas cuantitativas
 * @property {int} idCuantitativa - Identificador de la respuesta
 * @property {string} contenido - Contenido de la respuesta
 * @property {int} idPregunta - Identificador de la pregunta
 * @property {int} idRetroalimentacion - Identificador de la retroalimentacion
 */
module.exports = class Cuantitativa {
  /**
   * @brief
   * Constructor de la clase Cuantitativa
   * @param {*} Cuantitativa - Objeto de tipo Cuantitativa
   */
  constructor(Cuantitativa) {
    this.idCuantitativa = Cuantitativa.idCuantitativa
    this.contenido = Cuantitativa.contenido
    this.idPregunta = Cuantitativa.idPregunta
    this.idRetroalimentacion = Cuantitativa.idRetroalimentacion
  }

  /**
   * @brief
   * Recibe una respuesta Cuantitativa de acuerdo con el ID.
   * @param {*} idCuantitativa - ID de la respuesta Cuantitativa
   * @returns {object} - Objeto de tipo Cuantitativa
   */
  static async getByID(idCuantitativa) {
    const query = `select * from cuantitativa where idCuantitativa = ?`
    const [rows] = await dataBase.execute(query, [idCuantitativa])

    if (rows.length === 0)
      throw new Error("Respuesta Cuantitativa no encontrada")

    return new Cuantitativa(rows[0])
  }

  /**
   * @brief
   * Obtiene todas las respuestas Cuantitativas.
   * @returns {Promise<Cuantitativa[]>} - Arreglo de objetos de tipo Cuantitativa
   */
  static async getAll() {
    const query = `select * from cuantitativa`
    const [rows] = await dataBase.execute(query)

    return rows.map((row) => new Cuantitativa(row))
  }

  /**
   * @brief
   * Guarda una nueva respuesta Cuantitativa
   * @returns {Promise<Cuantitativa>} - Query de la respuesta Cuantitativa guardada
   */
  async save() {
    const query = `insert into cuantitativa(contenido, idPregunta, idRetroalimentacion) values (?, ?, ?)`

    const [result] = await dataBase.execute(query, [
      this.contenido,
      this.idPregunta,
      this.idRetroalimentacion,
    ])

    this.idCuantitativa = result.insertId
  }

  /**
   * @brief
   * Verifica que el objeto sea de tipo Cuantitativa
   * @param {*} Cuantitativa
   * @returns {boolean}
   */
  static async verify(Cuantitativa) { }

  /**
   * @brief
   * Elimina una respuesta Cuantitativa de acuerdo con el ID
   * @param {*} idCuantitativa - id de la respuesta
   * @returns {Promise<void>} - Query de la respuesta Cuantitativa eliminada
   */
  static async deleteByID(idCuantitativa) {
    const query = `delete from cuantitativa where idCuantitativa = ?`

    await dataBase.execute(query, [idCuantitativa])
  }

  /**
   * @brief
   * Actualiza el contenido de la respuesta
   * @param {*} Cuantitativa - Objeto de tipo Cuantitativa
   */
  async update(Cuantitativa) {
    const query = `update cuantitativa set contenido = ? where idCuantitativa = ?`

    await dataBase.execute(query, [Cuantitativa.contenido, this.idCuantitativa])

    this.contenido = Cuantitativa.contenido

    return this
  }
}
