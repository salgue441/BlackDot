/**
 * @file cuantitativa.model.js
 * @brief Model of the table of cuantitativa answers
 * @author Carlos Salguero & Olimpia Garcia
 * @version 1.0
 * @date 2023-03-22
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")


/**
 * @class
 * @classdesc model of the table Cuantitativa
 * @property {int} idCuantitativa - cuantitativa answer ID
 * @property {string} contenido - Content of the answer
 * @property {int} idPregunta - Question ID
 * @property {int} idRetroalimentacion - Retroalimentacion ID
 */
module.exports = class Cuantitativa {
  /**
   * @brief
   * Cuantitativa constructor
   * @param {*} Cuantitativa - Cuantitativa object	
   * @property {int} idCuantitativa - cuantitativa answer ID
   * @property {string} contenido - Content of the answer
   * @property {int} idPregunta - Question ID
   * @property {int} idRetroalimentacion - Retroalimentacion ID
   * @returns {object} - Object of type Cuantitativa
   */
  constructor(Cuantitativa) {
    this.idCuantitativa = Cuantitativa.idCuantitativa
    this.contenido = Cuantitativa.contenido
    this.idPregunta = Cuantitativa.idPregunta
    this.idRetroalimentacion = Cuantitativa.idRetroalimentacion
  }

  /**
   * @brief
   * get the ID of the Cuantitativa answer
   * @param {*} idCuantitativa - Cuantitativa answer ID
   * @returns {object} - Object of type Cuantitativa
   */
  static async getByID(idCuantitativa) {
    const query = `select * from Cuantitativa where idCuantitativa = ?`
    const [rows] = await dataBase.execute(query, [idCuantitativa])

    if (rows.length === 0)
      throw new Error("Respuesta Cuantitativa no encontrada")

    return new Cuantitativa(rows[0])
  }

  /**
   * @brief
   * get all the Cuantitativa answers
   * @returns {Promise<Cuantitativa[]>} - array of Cuantitativa objects
   */
  static async getAll() {
    const query = `select * from Cuantitativa`
    const [rows] = await dataBase.execute(query)

    return rows.map((row) => new Cuantitativa(row))
  }

  /**
   * @brief
   * save a Cuantitativa answer
   * @returns {Promise<Cuantitativa>} - Object of type Cuantitativa
   * @property {string} contenido - Content of the answer
   * @property {int} idPregunta - Question ID
   * @property {int} idRetroalimentacion - Retroalimentacion ID 
   */
  async save() {
    const query = `insert into Cuantitativa(contenido, idPregunta, idRetroalimentacion) values (?, ?, ?)`

    const [result] = await dataBase.execute(query, [
      this.contenido,
      this.idPregunta,
      this.idRetroalimentacion,
    ])

    this.idCuantitativa = result.insertId
  }

  /**
   * @brief
   * Delete a Cuantitativa answer
   * @param {*} idCuantitativa - Cuantitativa answer ID
   * @returns {Promise<void>} - Quert result
   */
  static async deleteByID(idCuantitativa) {
    const query = `delete from Cuantitativa where idCuantitativa = ?`

    await dataBase.execute(query, [idCuantitativa])
  }

  /**
   * @brief
   * Update a Cuantitativa answer
   * @param {*} Cuantitativa - Cuantitativa object
   * @returns {Promise<Cuantitativa>} - Object of type Cuantitativa
   */
  async update(Cuantitativa) {
    const query = `update Cuantitativa set contenido = ? where idCuantitativa = ?`

    await dataBase.execute(query, [Cuantitativa.contenido, this.idCuantitativa])

    this.contenido = Cuantitativa.contenido

    return this
  }
}
