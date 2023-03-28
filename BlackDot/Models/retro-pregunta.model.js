/**
 * @file retro-pregunta.model.js
 * @brief Data model for retro-pregunta table
 * @author Diego Sandoval
 * @date 2023-03-27
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @brief
 * @classdesc Data model class for retro-pregunta table
 */
class retroPregunta {
  /**
   * @brief
   * Creates a new instance of retroPregunta
   * @param {int} idRetroalimentacion - ID of the retroalimentacion
   * @param {int} idPregunta - ID of the pregunta
   * @param {boolean} required - If the pregunta is required
   */
  constructor(retroPregunta) {
    this.idRetroalimentacion = retroPregunta.idRetroalimentacion
    this.idPregunta = retroPregunta.idPregunta
    this.required = retroPregunta.required
  }

  /**
   * @brief
   * Gets retroPreguntas entities from the database
   * @param {int} idRetroalimentacion - ID of the retroalimentacion
   * @throw {Error} If the query fails
   * @return {* } retroPreguntas entities
   */
  static async getByRetroalimentacion(idRetroalimentacion) {
    const query = `select * from retroalimentacionPregunta 
                   where idRetroalimentacion = ?`

    const retro = await dataBase.query(query, [idRetroalimentacion])

    return new retroPregunta(retro)
  }

  /**
   * @brief
   * Gets the retroPreguntas entities from the database
   * @param {int} idPregunta - ID of the pregunta
   * @throw {Error} If the query fails
   * @return {* } retroPreguntas entities
   */
  static async getByPregunta(idPregunta) {
    const query = `select * from retroalimentacionPregunta 
                   where idPregunta = ?`

    const retro = await dataBase.query(query, [idPregunta])

    return new retroPregunta(retro)
  }

  /**
   * @brief
   * Gets the cualitative answers from the database
   * @throw {Error} If the query fails
   * @return {Array} retroPreguntas entities
   */
  static async getQualitativeAnswers() {
    try {
      const query = `
        select 
        pregunta.contenido as Pregunta, 
        cuantitativa.contenido
        from retroalimentacion
        join retroalimentacionpregunta on retroalimentacion.idRetroalimentacion = retroalimentacionpregunta.idPregunta
        join pregunta on retroalimentacionpregunta.idPregunta = pregunta.idPregunta
        left join cuantitativa on retroalimentacionpregunta.idPregunta = cuantitativa.idPregunta
        and retroalimentacionpregunta.idRetroalimentacion = cuantitativa.idRetroalimentacion 
        where Pregunta.tipoPregunta = 'Cualitativa';
    `

      const qualitatives = await dataBase.query(query)

      return qualitatives.map((qualitative) => new retroPregunta(qualitative))
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @brief
   * Gets the quantitative answers from the database
   * @throw {Error} If the query fails
   * @return {Array} retroPreguntas entities
   */
  static async getQuantitativeAnswers() {
    try {
      const query = `
        select 
          retroalimentacion.idRetroalimentacion, 
          pregunta.idPregunta, 
          pregunta.contenido AS Pregunta, 
          cuantitativa.idPregunta, 
          cuantitativa.contenido 
        from retroalimentacion 
        join retroalimentacionpregunta on retroalimentacion.idRetroalimentacion = retroalimentacionpregunta.idRetroalimentacion 
        join pregunta on retroalimentacionpregunta.idPregunta = pregunta.idPregunta 
        left join cuantitativa on retroalimentacionpregunta.idPregunta = cuantitativa.idPregunta and retroalimentacion.idRetroalimentacion = cuantitativa.idRetroalimentacion 
        where pregunta.tipoPregunta = 'Cuantitativa';;`

      const quantitatives = await dataBase.query(query)

      return quantitatives.map(
        (quantitative) => new retroPregunta(quantitative)
      )
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = retroPregunta
