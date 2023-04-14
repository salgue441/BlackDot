const dataBase = require("../Utils/dataBase")

/**
 * @class Retroalimentacion
 * @classdesc Clase que representa un modelo de Retroalimentacion
 * @property {int} id - Identificador de la retroalimentacion
 * @property {string:Date} FechaCreacion - Fecha de creacion de la retroalimentacion
 * @property {string:Date} FechaFinalizacion - Fecha de finalizacion de la retroalimentacion
 **/
module.exports = class Retroalimentacion {
  /**
   * @brief
   * Constructor de la clase Retroalimentacion
   */
  constructor(retro) {
    this.id = retro.id
    this.FechaCreacion = retro.FechaCreacion
    this.FechaFinalizacion = retro.FechaFinalizacion
    this.idSprint = retro.idSprint
  }

  /**
   * @brief
   * Funcion que obtiene una retroalimentacion por su id
   */
  static async getbyID(id) {
    if (!id) throw new Error("No se envio el id")

    const retro = await dataBase.query(
      "select * from retroalimentacion where id = ?",
      [id]
    )

    if (retro.length == 0)
      throw new Error("No se encontro la retroalimentacion")

    return new Retroalimentacion(retro[0])
  }

  /**
   * @brief
   * Funcion que obtiene todas las retroalimentaciones
   * @returns {Retroalimentacion[]} - Arreglo de objetos de tipo retroalimentacion
   * */
  static async getAll() {
    const [retros, _] = await dataBase.query("select * from retroalimentacion")
    return retros
  }

  /**
   * @brief
   * Funcion que guarda una retroalimentacion
   * @returns {Promise<Retroalimentacion>}
   */
  async save() {
    await dataBase.query(
      "insert into retroalimentacion (FechaCreacion, FechaFinalizacion, idSprint) values (?,?,?)",
      [this.FechaCreacion, this.FechaFinalizacion, this.idSprint]
    )
  }

  static async getRetroActual() {
    const fechaActual =
      new Date().toISOString().split("T")[0].toString() + " 01:00:00"

    const [retro, _] = await dataBase.query(
      "select * from retroalimentacion where FechaCreacion <= ? and FechaFinalizacion >= ?",
      [fechaActual, fechaActual]
    )

    if (retro.length == 0) return false

    const retroActual = new Retroalimentacion({
      id: retro[0].idRetroalimentacion,
      FechaCreacion: retro[0].fechaCreacion,
      FechaFinalizacion: retro[0].fechaFinalizacion,
      idSprint: retro[0].idSprint,
    })

    return retroActual
  }

  /**
   * @brief
   * Obtiene la ultima id retroalimentacion
   * @returns  id de la ultima retroalimentacion
   */

  static async getLastId() {
    const query = `select * from retroalimentacion order by idRetroalimentacion desc limit 1`
    const [rows] = await dataBase.execute(query)

    return rows[0].idRetroalimentacion
  }
}
