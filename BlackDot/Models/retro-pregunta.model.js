/**
 * @class
 * @classdesc Modelo de la tabla de retroPregunta
 * @property {int} idRetro - Identificador del issue
 * @property {int} idPregunta - Identificador del sprint
 */
const dataBase = require("../utils/dataBase");

module.exports = class retroPregunta {
  constructor(retroPregunta) {
    this.idRetro = retroPregunta.idRetroalimentacion;
    this.idPregunta = retroPregunta.idPregunta;
  }

  /**
   * @brief
   * obtiene un retroPregunta de acuerdo con el ID de retro.
   * @param {*} idRetro - ID del retro
   * @returns {object} - Objeto de tipo retroPregunta
   */

  static async getByIDR(idRetroalimentacion) {
    if (!idRetroalimentacion)
      throw new Error("No se ha proporcionado un ID de retro");

    const [retro] = await dataBase.query(
      "select * from retroalimentacionpregunta where idRetroalimentacion = ?",
      [idRetroalimentacion]
    );

    return new retroPregunta(retro);
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
      "select * from retroalimentacionpregunta where idPregunta = ?",
      [idPregunta]
    );

    return new retroPregunta(pregunta);
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
	  and retroalimentacionpregunta.idRetroalimentacion = cuantitativa.idRetroalimentacion 
    where Pregunta.tipoPregunta = 'Cuantitativa';
    `;

    const retro_pregunta = await dataBase.query(query);
    return retro_pregunta.map(
      (retro_pregunta) => new retroPregunta(retro_pregunta)
    );
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
    and retroalimentacionpregunta.idRetroalimentacion = cuantitativa.idRetroalimentacion and where Pregunta.tipoPregunta = 'Cuantitativa';`;

    const retroPregunta = await dataBase.query(query);

    return retroPregunta.map(
      (retroPregunta) => new retroPregunta(retroPregunta)
    );
  }
};
