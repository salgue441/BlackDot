/**
 * @file cualitativa.model.js
 * @brief model for table cualitativa (Cualitativa)
 * @author Carlos Salguero
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc model for table cualitativa
 * @property {int} idCualitativa - answer id
 * @property {string} contenido - answer content
 * @property {int} idPregunta - question id
 * @property {int} idRetroalimentacion - retroalimentacion id
 */
module.exports = class Cualitativa {
  /**
   * @brief
   * constructor for Cualitativa
   * @param {*} Cualitativa - cualitativa object
   */
  constructor(Cualitativa) {
    this.idCualitativa = Cualitativa.idCualitativa;
    this.contenido = Cualitativa.contenido;
    this.idPregunta = Cualitativa.idPregunta;
    this.idRetroalimentacion = Cualitativa.idRetroalimentacion;
  }

  /**
   * @brief
   * get a Cualitativa answer by ID
   * @param {*} idCualitativa - cualitativa answer ID
   * @returns {object} - cualitativa object
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
   * @returns {Promise<Cualitativa[]>} - cualitativa array object
   */
  static async getAll() {
    const [rows, _] = await dataBase.execute("select * from Cualitativa")

    return rows
  }

  /**
   * @brief
   * gets last Cualitativa answer ID
   * @returns  cualitativa ID object
   */

  static async getLastid() {
    const query = `select idCualitativa from Cualitativa order by idCualitativa desc limit 1`;
    const [idCualitativa, _] = await dataBase.execute(query);

    const id = idCualitativa[0].idCualitativa;

    return id;
  }

  /**
   * @brief
   * save a Cualitativa answer
   * @returns {Promise<Cualitativa>} - Query of the saved Cualitativa answer
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
   * Elimina una respuesta cualitativa de acuerdo con el ID
   * @param {*} idCualitativa - id de la respuesta
   * @returns {Promise<void>} - Query de la respuesta cualitativa eliminada
   */
  static async deleteByID(idCualitativa) {
    const query = `delete from Cualitativa where idCualitativa = ?`;

    await dataBase.execute(query, [idCualitativa]);
  }

  /**
   * @brief
   * Actualiza el contenido de la respuesta
   */
  async update(Cualitativa) {
    const query = `update Cualitativa set contenido = ? where idCualitativa = ?`;

    await dataBase.execute(query, [Cualitativa.contenido, this.idCualitativa]);
    this.contenido = Cualitativa.contenido;

    return this;
  }
};
