const dataBase = require("../database")

/**
 * @class
 * @classdesc Modelo de la tabla de respuestas cualitativas
 */
module.exports = class Cualitativa {
  /**
   * @brief
   * Constructor de la clase Cualitativa
   * @param {*} Cualitativa - Objeto de tipo Cualitativa
   */
  constructor(Cualitativa) {
    this.idCualitativa = Cualitativa.idCualitativa
    this.contenido = Cualitativa.contenido
    this.idPregunta = Cualitativa.idPregunta
    this.idRetroalimentacion = Cualitativa.idRetroalimentacion
  }

  /**
   * @brief
   * Recibe una respuesta cualitativa de acuerdo con el ID.
   * @param {*} idCualitativa -
   */
  static async getByID(idCualitativa) {
    const query = `select * from Cualitativa where idCualitativa = ?`
    const [rows] = await dataBase.execute(query, [idCualitativa])

    if (rows.length === 0)
      throw new Error("Respuesta cualitativa no encontrada")

    return new Cualitativa(rows[0])
  }

  /**
   * @brief
   * Obtiene todas las respuestas cualitativas.
   * @returns
   */
  static async getAll() {
    const query = `select * from Cualitativa`
    const [rows] = await dataBase.execute(query)

    return rows.map((row) => new Cualitativa(row))
  }

  /**
   * @brief
   * Guarda una nueva respuesta cualitativa
   */
  async save() {
    const query = `insert into Cualitativa(contenido, idPregunta, idRetroalimentacion) values (?, ?, ?)`

    const [result] = await dataBase.execute(query, [
      this.contenido,
      this.idPregunta,
      this.idRetroalimentacion,
    ])

    this.idCualitativa = result.insertId
  }

  /**
   * @brief
   * Verifica que el objeto sea de tipo Cualitativa
   * @param {*} Cualitativa
   * @returns
   */
  static async verify(Cualitativa) {}

  /**
   * @brief
   * Elimina una respuesta cualitativa de acuerdo con el ID
   * @param {*} idCualitativa - id de la respuesta
   * @returns
   */
  static async deleteByID(idCualitativa) {
    const query = `delete from Cualitativa where idCualitativa = ?`

    await dataBase.execute(query, [idCualitativa])
  }

  /**
   * @brief
   * Actualiza el contenido de la respuesta
   */
  async update() {
    const query = `update Cualitativa set contenido = ?, idPregunta = ?, idRetroalimentacion = ? where idCualitativa = ?`

    await dataBase.execute(query, [
      this.contenido,
      this.idPregunta,
      this.idRetroalimentacion,
      this.idCualitativa,
    ])
  }
}
