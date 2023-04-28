/**
 * @file cuali-accionable.model.js
 * @brief Model of the table CualitativaAccionable
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.27
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Model of the table CualitativaAccionable
 * @property {int} idCualitativa - cualitativa ID
 * @property {int} idAccionable - Accionable ID
 **/

module.exports = class CualitativaAccionable {
  constructor(CualitativaAccionable) {
    this.idCualitativa = CualitativaAccionable.idCualitativa
    this.idAccionable = CualitativaAccionable.idAccionable
  }

  /**
   * @brief
   * gets a CualitativaAccionable by ID
   * @param {*} IdAccionable - Accionable ID
   * @returns {object} - CualitativaAccionable object
   **/

  static async getByIDA(idAccionable) {
    if (!idAccionable)
      throw new Error("No se ha proporcionado un ID del Accionable")

    const [accionable] = await dataBase.query(
      "SELECT * FROM CualitativaAccionable WHERE idAccionable = ?",
      [idAccionable]
    )

    return new CualitativaAccionable(accionable)
  }

  /**
   * @brief
   * Obtains a CualitativaAccionable by ID
   * @param {*} idCualitativa - Cualitativa ID
   * @returns {object} - CualitativaAccionable object
   **/

  static async getByIDC(idCualitativa) {
    if (!idCualitativa)
      throw new Error("No se ha proporcionado un ID de la cualitativa")

    const [cualitativa] = await dataBase.query(
      "SELECT * FROM CualitativaAccionable WHERE idCualitativa = ?",
      [idCualitativa]
    )

    return new CualitativaAccionable(cualitativa)
  }

  /**
   * @brief
   * Gets all CualitativaAccionable
   * @returns {Promise<CualitativaAccionable[>} - CualitativaAccionable object
   **/

  static async getAll() {
    const [result, _] = await dataBase.query("select * from CualitativaAccionable")

    return result
  }

  /**
   * @brief
   * Saves a CualitativaAccionable in the database
   * @returns {Promise<CualitativaAccionable>} - CualitativaAccionable object
   * */

  async save() {
    const query = `INSERT INTO CualitativaAccionable (idCualitativa, idAccionable) VALUES (?, ?)`
    await dataBase.execute(query, [this.idCualitativa, this.idAccionable])
  }
}
