/**
 * @file sprintEpica.model.js
 * @brief Modelo de la tabla de Sprint Epica
 * @author Olimpia Garcia
 * @version 0.1
 * @date 2023-03-23
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase");

/**
 * @class
 * @classdesc Modelo de la tabla de epicas
 * @property {int} idEpica - IIdentificador de la epica
 *  @property {int} idSprint - IIdentificador del sprint
 *
 */

module.exports = class SprintEpica {
  /**
   * @brief Cosntructor de la clase SprintEpica
   * @param {*} SprintEpica - Objeto de tipo SprintEpica
   */
  constructor(SprintEpica) {
    this.idEpica = SprintEpica.idEpica
    this.idSprint = SprintEpica.idSprint
  }

  /**
   * @brief obtiene una epica de acuerdo al ID
   * @param {*} idEpica - Id de la epica
   * @returns {object} -Objeto tipo epica
   */

  static async getByIDE(idEpica) {
    if (!idEpica) throw new Error("No se ha proporcionado un ID");
    const epica = await dataBase.query(
      "select * from sprintepica where idEpica = ?",
      [idEpica]
    );
    return new SprintEpica(epica);
  }

  static async getByIDS(idsprint) {
    if (!idsprint) throw new Error("No se ha proporcionado un ID");
    const [sprint, _] = await dataBase.query(
      "select * from sprintepica where idSprint = ?",
      [idsprint]
    );

    const sprintEpicaNew = new SprintEpica({
      idEpica: sprint[0].idEpica,
      idsprint: sprint[0].idSprint,
    });

    return sprintEpicaNew;
  }

  /**
   * @brief Obtiene las epicas
   * @returns {Promise<epica[]>} Arreglo de objetos epica
   */

  static async getAll() {
    const sprintepica = await dataBase.query("select * from sprintepica");

    return sprintepica.map((sprintepica) => new SprintEpica(sprintepica));
  }

  async save() {
    if (!this.idEpica || !this.idSprint)
      throw new Error("No se ha proporcionado un ID");

    const [sprintEpica, _] = await dataBase.query(
      "insert into sprintEpica (idEpica, idSprint) values (?, ?)",
      [this.idEpica, this.idSprint]
    )

    return this
  }
};
