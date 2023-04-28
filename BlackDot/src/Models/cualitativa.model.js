/**
 * @file cualitativa.model.js
 * @brief Modelo de la tabla de respuestas cualitativas
 * @author Carlos Salguero
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc model of the table Cualitativa
 * @property {int} idCualitativa - Cualitativa answer ID
 * @property {string} contenido - Content of the answer
 * @property {int} idPregunta - Question ID
 * @property {int} idRetroalimentacion - Retroalimentacion ID
 */
module.exports = class Cualitativa {
  /**
   * @brief
   * Cualitativa constructor
   * @param {*} Cualitativa - Cualitativa object
   * @property {int} idCualitativa - Cualitativa answer ID
   * @property {string} contenido - Content of the answer
   * @property {int} idPregunta - Question ID
   * @property {int} idRetroalimentacion - Retroalimentacion ID
   * @returns {object} - Cualitativa object
   */
  constructor(Cualitativa) {
    this.idCualitativa = Cualitativa.idCualitativa;
    this.contenido = Cualitativa.contenido;
    this.idPregunta = Cualitativa.idPregunta;
    this.idRetroalimentacion = Cualitativa.idRetroalimentacion;
  }

  /**
   * @brief
   * gets a Cualitativa answers by ID
   * @param {*} idCualitativa - id of the answer
   * @returns {object} - Cualitativa object
   */
  static async getByID(idCualitativa) {
    const query = `select * from Cualitativa where idCualitativa = ?`;
    const [rows] = await dataBase.execute(query, [idCualitativa]);

    if (rows.length === 0)
      throw new Error("Respuesta cualitativa no encontrada");

    return new Cualitativa(rows[0]);
  }

  /**
   * @brief
   * gets all Cualitativa answers
   * @returns {Promise<Cualitativa[]>} - Array of Cualitativa objects
   */
  static async getAll() {
    const [rows, _] = await dataBase.execute("select * from Cualitativa")

    return rows
  }

  /**
   * @brief
   * gets all Cualitativa answers by question ID
   * @returns  {Promise<Cualitativa[]>} - Array of Cualitativa objects
   */

  static async getLastid() {
    const query = `select idCualitativa from Cualitativa order by idCualitativa desc limit 1`;
    const [idCualitativa, _] = await dataBase.execute(query);

    const id = idCualitativa[0].idCualitativa;

    return id;
  }

  /**
   * @brief
   * saves a Cualitativa answer
   * @returns {Promise<Cualitativa>} - Cualitativa object 
   * @property {string} contenido - Content of the answer
   * @property {int} idPregunta - Question ID
   * @property {int} idRetroalimentacion - Retroalimentacion ID 
   */
  async save() {
    const query = `insert into Cualitativa(contenido, idPregunta, idRetroalimentacion) values (?, ?, ?)`;

    const [result] = await dataBase.execute(query, [
      this.contenido,
      this.idPregunta,
      this.idRetroalimentacion,
    ]);

    this.idCualitativa = result.insertId;
  }

  /**
   * @brief
   * Deletes a Cualitativa answer by ID
   * @param {*} idCualitativa - id of the answer
   * @returns {Promise<void>} - Query result
   */
  static async deleteByID(idCualitativa) {
    const query = `delete from Cualitativa where idCualitativa = ?`;

    await dataBase.execute(query, [idCualitativa]);
  }

  /**
   * @brief
   * Updates a Cualitativa answer
   * @param {*} Cualitativa - Cualitativa object
   * @property {string} contenido - Content of the answer
   * @returns {Promise<Cualitativa>} - Cualitativa object	
   */
  async update(Cualitativa) {
    const query = `update Cualitativa set contenido = ? where idCualitativa = ?`;

    await dataBase.execute(query, [Cualitativa.contenido, this.idCualitativa]);
    this.contenido = Cualitativa.contenido;

    return this;
  }
};
