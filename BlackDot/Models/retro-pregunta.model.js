const dataBase = require("../utils/dataBase");

/**
 * @class
 * @classdesc Modelo de la tabla de sprintissue
 * @property {int} idRetro - Identificador del issue
 * @property {int} idPregunta - Identificador del sprint
 * */

const { getByID } = require("./retro.model");
const { getByID } = require("./pregunta.model");

module.exports = class SprintIssue {
  constructor(retroPregunta) {
    this.idRetro = retroPregunta.idRetro;
    this.idPregunta = retroPregunta.idPregunta;
  }

  /**
   * @brief
   * obtiene un retroPregunta de acuerdo con el ID de retro.
   * @param {*} idRetro - ID del retro
   * @returns {object} - Objeto de tipo retroPregunta
   */

  static async getByIDR(idRetro) {
    if (!idRetro) throw new Error("No se ha proporcionado un ID de retro");

    const [retro] = await dataBase.query(
      "select * from retroPregunta where idRetro = ?",
      [idRetro]
    );

    return new SprintIssue(retro);
  }

  /**
   * @brief
   * Obtiene un retroPregunta de acuerdo con el ID de pregunta.
   * @param {*} idPregunta - ID del pregunta
   * @returns {object} - Objeto de tipo retroPregunta
   * */

  static async getByIDP(idPregunta) {
    if (!idPregunta)
      throw new Error("No se ha proporcionado un ID de pregunta");

    const [pregunta] = await dataBase.query(
      "select * from retroPregunta where idPregunta = ?",
      [idPregunta]
    );

    return new SprintIssue(pregunta);
  }
  /**
   * @brief
   * Obtiene todos los retroPregunta Cualitativa.
   * @returns {Promise<retroPregunta[]>} - Arreglo de objetos de tipo retroPregunta
   * */

  static async getAllCuali() {
    const query = `
    select 
    pregunta.contenido as Pregunta, 
    cuantitativa.contenido
  from retroalimentacion
  join retroalimentacionpregunta on retroalimentacion.idRetroalimentacion = retroalimentacionpregunta.idPregunta
  join pregunta on retroalimentacionpregunta.idPregunta = pregunta.idPregunta
  left join cuantitativa on retroalimentacionpregunta.idPregunta = cuantitativa.idPregunta
  and retroalimentacionpregunta.idRetroalimentacion = cuantitativa.idRetroalimentacion;
    `;

    const retroPregunta = await dataBase.query(query);
    return retroPregunta.map((retroPregunta) => new SprintIssue(retroPregunta));
  }

  /**
   * @brief
   * Obtiene todos los retroPregunta Cuantitativa.
   *  @returns {Promise<retroPregunta[]>} - Arreglo de objetos de tipo retroPregunta
   * */

  static async getAllCuant() {
    const query = `select retroalimentacion.idRetroalimentacion,  
    pregunta.idPregunta, 
    pregunta.contenido as Pregunta, 
    cuantitativa.idPregunta,
    cuantitativa.contenido
  from retroalimentacion
  join retroalimentacionpregunta on retroalimentacion.idRetroalimentacion = retroalimentacionpregunta.idPregunta
  join pregunta on retroalimentacionpregunta.idPregunta = pregunta.idPregunta
  left join cuantitativa on retroalimentacionpregunta.idPregunta = cuantitativa.idPregunta
  and retroalimentacionpregunta.idRetroalimentacion = cuantitativa.idRetroalimentacion; `;

    const retroPregunta = await dataBase.query(query);

    return retroPregunta.map((retroPregunta) => new SprintIssue(retroPregunta));
  }
};
