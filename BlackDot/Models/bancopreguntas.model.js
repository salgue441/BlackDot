/**
 * @file pregunta.model.js
 * @brief Modelo de la tabla de preguntas
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Yuna Chung
 * @author Ivan Paredes
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../Utils/dataBase")

module.exports = class BancoPregunta {
  constructor(bancoPregunta) {
    this.idPreguntaBanco = bancoPregunta.idPreguntaBanco
    this.contenido = bancoPregunta.contenido
    this.tipoPregunta = bancoPregunta.tipoPregunta
  }

  /**
   * @brief
   * Obtiene una pregunta de acuerdo con el ID.
   * @param {number} idPreguntaBanco - ID de la pregunta
   * @returns {Promise<Pregunta>} - Objeto de tipo Pregunta
   */

  static async getByID(idPreguntaBanco) {
    if (!idPreguntaBanco) throw new Error("No se ha proporcionado un ID")

    const [pregunta] = await dataBase.query(
      "select * from bancopreguntas where idPreguntaBanco = ?",
      [idPreguntaBanco]
    )

    if (pregunta.length === 0) throw new Error("Pregunta no encontrada")

    return new BancoPregunta(pregunta[0])
  }

  /**
   * @brief
   * elimina una pregunta de acuerdo con el ID.
   * @param {number} idPreguntaBanco - ID de la pregunta
   * @returns {Promise<Pregunta>} - Objeto de tipo Pregunta
   * @throws {Error} - Si no se ha proporcionado un ID
   * @throws {Error} - Si el ID no es un numero
   * @throws {Error} - Si no se encuentra la pregunta
   * @throws {Error} - Si no se pudo eliminar la pregunta
   * */

  static async deleteByID(idPreguntaBanco) {
    if (!idPreguntaBanco) throw new Error("No se envio el ID")
    if (typeof idPreguntaBanco !== "number")
      throw new Error("El ID debe ser un numero")

    if (!Number.isInteger(idPreguntaBanco))
      throw new Error("El ID debe ser un numero entero")

    const result = await dataBase.query(
      `delete from bancopreguntas where idPreguntaBanco = ?`,
      [idPreguntaBanco]
    )

    return result.rowCount > 0
  }

  /**
   * @brief
   * Obtiene todas las preguntas.
   * @returns {Promise<Pregunta[]>} - Arreglo de objetos de tipo Pregunta
   */
  static async getAll() {
    const [preguntas, _] = await dataBase.query("select * from bancopreguntas")

    return preguntas
  }

  /**
   * @brief
   * Guarda una pregunta en la base de datos.
   * @returns {Promise<Pregunta>} - Objeto de tipo Pregunta
   * @throws {Error} - Si no se ha proporcionado un contenido
   * @throws {Error} - Si no se ha proporcionado un tipo de pregunta
   * */

  async save() {
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")

    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const query = `insert into bancopreguntas (contenido, tipoPregunta) values(?, ?)`
    const result = await dataBase.query(query, [
      this.contenido,
      this.tipoPregunta,
    ])

    if (result.affectedRows === 0)
      throw new Error("La pregunta no se pudo guardar")

    this.idPreguntaBanco = result.insertId
    return this
  }

  /**
   * @brief
   * Actualiza una pregunta en la base de datos.
   * @returns {Promise<Pregunta>} - Objeto de tipo Pregunta
   * @throws {Error} - Si no se ha proporcionado un ID
   * @throws {Error} - Si no se ha proporcionado un contenido
   * @throws {Error} - Si no se ha proporcionado un tipo de pregunta
   * */

  async update() {
    if (!this.idPreguntaBanco) throw new Error("No se ha proporcionado un ID")
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const query = `update bancopreguntas set contenido = ?, tipoPregunta = ? where idPreguntaBanco = ?`
    const result = await dataBase.query(query, [
      this.contenido,
      this.tipoPregunta,
      this.idPreguntaBanco,
    ])

    if (result.affectedRows === 0)
      throw new Error("La pregunta no se pudo actualizar")

    return this
  }

  /**
   * @brief
   * Verifica si una pregunta cumple con los requisitos para ser guardada en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el contenido
   * @throws {Error} - Si el contenido es muy largo
   * @throws {Error} - Si no se envia el tipo de pregunta
   */

  async verify() {
    if (!this.contenido || this.contenido.trim().length === 0)
      throw new Error("No se ha proporcionado un contenido")
    if (this.contenido.length > 300)
      throw new Error("El contenido es muy largo")
    if (!this.tipoPregunta)
      throw new Error("No se ha proporcionado el tipo de Pregunta")

    const [pregunta] = await dataBase.query(
      "select * from bancopreguntas where contenido = ? and tipoPregunta = ?",
      [this.contenido, this.tipoPregunta]
    )

    return Boolean(pregunta)
  }
}
