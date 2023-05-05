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
    this.idRetroalimentacion = retroPregunta.idRetroalimentacion || null
    this.idPregunta = retroPregunta.idPregunta || null
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
   * Gets the ids of Pregruntas from the database
   * @param {int} idRetroalimentacion - ID of the retroalimentacion
   * @throw {Error} If the query fails
   * @return {Array} retroPreguntas entities
   * @return {int} retroPreguntas.entities.idPregunta
   */

  static async getIdsPreguntas(idRetroalimentacion) {
    const query = `select idPregunta from retroalimentacionPregunta
                  where idRetroalimentacion = ?`

    const [idsPreguntas, _] = await dataBase.query(query, [idRetroalimentacion])

    //insert idsPreguntas into an array
    let ids = []
    for (let i = 0; i < idsPreguntas.length; i++) {
      ids.push(idsPreguntas[i].idPregunta)
    }

    return ids
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
          cualitativa.contenido
        from retroalimentacion
        join retroalimentacionPregunta on retroalimentacion.idRetroalimentacion = retroalimentacionpregunta.idPregunta
        join pregunta on retroalimentacionpregunta.idPregunta = pregunta.idPregunta
        join cualitativa on retroalimentacionpregunta.idPregunta = cualitativa.idPregunta
        and retroalimentacionPregunta.idRetroalimentacion = cualitativa.idRetroalimentacion 
        where pregunta.tipoPregunta = 'Cualitativa';
`

      const [qualitatives, _] = await dataBase.query(query)
      return qualitatives
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @brief
   * Gets the cualitative answers from the database
   * @param {int} idRetroalimentacion - ID of the retroalimentacion
   * @throw {Error} If the query fails
   * @return {Array} retroPreguntas entities
   */
  static async getQualitativeAnswersByID(idRetroalimentacion) {
    try {
      const query = `
        select 
          retroalimentacion.idRetroalimentacion, 
          pregunta.idPregunta, 
          pregunta.contenido AS Pregunta, 
          cualitativa.idPregunta, 
          cualitativa.contenido,
          retroalimentacion.fechaFinalizacion
        from retroalimentacion 
        join retroalimentacionPregunta on retroalimentacion.idRetroalimentacion = retroalimentacionPregunta.idRetroalimentacion 
        join pregunta on retroalimentacionPregunta.idPregunta = pregunta.idPregunta 
        join cualitativa on retroalimentacionPregunta.idPregunta = cualitativa.idPregunta and retroalimentacion.idRetroalimentacion = cualitativa.idRetroalimentacion 
        where pregunta.tipoPregunta = 'Cualitativa' 
        and retroalimentacion.idRetroalimentacion = ?;`

      const [qualitatives, _] = await dataBase.query(query, [
        idRetroalimentacion,
      ])
      return qualitatives
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
          cuantitativa.contenido,
          retroalimentacion.fechaFinalizacion
        from retroalimentacion 
        join retroalimentacionPregunta on retroalimentacion.idRetroalimentacion = retroalimentacionPregunta.idRetroalimentacion 
        join pregunta on retroalimentacionPregunta.idPregunta = pregunta.idPregunta 
        join cuantitativa on retroalimentacionPregunta.idPregunta = cuantitativa.idPregunta and retroalimentacion.idRetroalimentacion = cuantitativa.idRetroalimentacion 
        where pregunta.tipoPregunta = 'Cuantitativa';`

      const [quantitatives, _] = await dataBase.query(query)

      return quantitatives
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @brief
   * Gets the quantitative answers from the database
   * @param {int} idRetroalimentacion - ID of the retroalimentacion
   * @throw {Error} If the query fails
   * @return {Array} retroPreguntas entities
   */
  static async getQuantitativeAnswerByID(idRetroalimentacion) {
    try {
      const query = `
        select 
          retroalimentacion.idRetroalimentacion, 
          pregunta.idPregunta, 
          pregunta.contenido AS Pregunta, 
          cuantitativa.idPregunta, 
          cuantitativa.contenido,
          retroalimentacion.fechaFinalizacion
        from retroalimentacion 
        join retroalimentacionPregunta on retroalimentacion.idRetroalimentacion = retroalimentacionPregunta.idRetroalimentacion 
        join pregunta on retroalimentacionPregunta.idPregunta = pregunta.idPregunta 
        join cuantitativa on retroalimentacionPregunta.idPregunta = cuantitativa.idPregunta and retroalimentacion.idRetroalimentacion = cuantitativa.idRetroalimentacion 
        where pregunta.tipoPregunta = 'Cuantitativa' 
        and retroalimentacion.idRetroalimentacion = ?;`

      const [quantitatives, _] = await dataBase.query(query, [
        idRetroalimentacion,
      ])

      return quantitatives
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @brief
   * Gets all the qualitative answers associated to a specific question
   * @param {int} idPregunta - ID of the question
   * @return {Object} retroPregunta - Object of retroPregunta
   * @throws {Error} if idPregunta is not found
   */
  static async getQualitativeAnswersByIDPregunta(idPregunta) {
    try {
      if (idPregunta === undefined)
        throw new Error("The ID Pregunta is not found")

      const query = `
        select 
          retroalimentacion.idRetroalimentacion, 
          pregunta.idPregunta, 
          pregunta.contenido AS Pregunta, 
          cualitativa.idCualitativa,
          cualitativa.idPregunta, 
          cualitativa.contenido,
          retroalimentacion.fechaFinalizacion
        from retroalimentacion 
        join retroalimentacionPregunta on retroalimentacion.idRetroalimentacion = retroalimentacionPregunta.idRetroalimentacion 
        join pregunta on retroalimentacionPregunta.idPregunta = pregunta.idPregunta 
        join cualitativa on retroalimentacionPregunta.idPregunta = cualitativa.idPregunta and retroalimentacion.idRetroalimentacion = cualitativa.idRetroalimentacion 
        where pregunta.tipoPregunta = 'Cualitativa' 
        and retroalimentacionPregunta.idPregunta = ?;  
      `

      const [qualitatives, _] = await dataBase.execute(query, [idPregunta])

      return qualitatives
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @brief
   * Guarda una retroPregunta en la base de datos
   * @param {int} idRetroalimentacion - ID de la retroalimentacion
   * @param {int} idPregunta - ID de la pregunta
   * */

  async save() {
    const query = `insert into retroalimentacionPregunta (idRetroalimentacion, idPregunta, required) values (?, ?, ?)`

    const retro = await dataBase.query(query, [
      this.idRetroalimentacion,
      this.idPregunta,
      this.required,
    ])
  }
}

module.exports = retroPregunta
