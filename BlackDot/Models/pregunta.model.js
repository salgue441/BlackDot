const dataBase = require("../Utils/dataBase")

/**
 * @class
 * @classdesc Clase que representa un modelo de Pregunta
 * @property {string} id - Identificador de la pregunta
 * @property {string} contenido - Contenido de la pregunta
 */
module.exports = class Pregunta {
  /**
   * @brief
   * Constructor de la clase pregunta
   * @param {*} Pregunta - Objeto de tipo pregunta
   * @throws {Error} - Si no se envia el objeto de tipo pregunta
   * @throws {Error} - Si el objeto no tiene el atributo contenido
   */
  constructor(Pregunta) {
    if (!Pregunta) throw new Error("El objeto no es de tipo pregunta")
    if (!Pregunta.contenido)
      throw new Error("El objeto no tiene el atributo contenido")

    this.id = Pregunta.id
    this.contenido = Pregunta.contenido
    this.tipo = Pregunta.tipo

    //?   enum('Cualitativa', 'Cuantitativa')
  }

  /**
   * @brief
   * Funcion que obtiene una pregunta por su id
   * @param {*} id - Identificador de la pregunta
   * @returns {Pregunta} - Objeto de tipo pregunta
   * @throws {Error} - Si no se envia el id
   */
  static async getByID(id) {
    if (!id) throw new Error("No se envio el id")

    const pregunta = await dataBase.query(
      "select * from Pregunta where id = ?",
      [id]
    )

    return pregunta
  }

  /**
   * @brief
   * Funcion que obtiene todas las Pregunta
   * @returns {Pregunta[]} - Arreglo de objetos de tipo pregunta
   * @throws {Error} - Si no se envia el id
   * @throws {Error} - Si
   */
  static async getAll() {
    return dataBase.execute("select * from Pregunta")
  }

  /**
   * @brief
   * Funcion que manda los datos de la pregunta a la base de datos
   */
  save() {
    if (Pregunta.verify(this.contenido)) {
      return dataBase.query(
        "insert into Pregunta (contenido, tipo) values (?, ?)",
        [this.contenido, this.tipo]
      )
    }
  }

  /**
   * @brief
   * Funcion que verifica si una pregunta existe
   * @param {*} contenido - Contenido de la pregunta
   * @returns {boolean} - True si existe, false si no existe
   * @throws {Error} - Si no se envia el contenido
   * @throws {Error} - Si el contenido es muy largo
   */
  static async verify(Pregunta) {
    if (!Pregunta.contenido) throw new Error("No se envio el contenido")

    if (Pregunta.contenido.length > 300)
      throw new Error("El contenido de la pregunta es muy largo")
  }

  /**
   * @brief
   * Funcion que elimina una pregunta por su id
   * @param {*} pregunta  - Objeto de tipo pregunta
   * @returns {Function} - Query de la base de datos para eliminar la pregunta
   */
  static async deleteById(Pregunta) {
    return dataBase.query("delete from Pregunta where id = ?", [Pregunta.id])
  }

  /**
   * @brief
   * Funcion que modifica una pregunta por su id
   * @param {*} Pregunta - Objeto de tipo pregunta
   * @returns {Function} - Query de la base de datos para actualizar la pregunta
   */
  static async modifyById(Pregunta) {
    if (Pregunta.verify(Pregunta.contenido)) {
      return dataBase.query("update Pregunta set contenido = ? where id = ?", [
        Pregunta.contenido,
        Pregunta.id,
      ])
    }
  }
}
