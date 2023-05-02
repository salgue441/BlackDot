/**
 * @file empleado.model.js
 * @brief Modelo de la tabla de empleados
 * @author Iván Paredes
 * @author Yuna Chung
 * @version 1.0
 * @date 2023-03-23
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")


/**
 * @class
 * @classdesc Modelo de la tabla de empleado
 * @property {int} idEmpleado - Identificador del empleado
 * @property {varchar} primerNombre - Contenido del primer nombre
 * @property {varchar} segundoNombre - Contenido del segundo nombre
 * @property {varchar} apellidoPaterno - Contenido del apellido paterno
 * @property {varchar} apellidoMaterno - Contenido del apellido materno
 * @property {binary} idGoogleAuth - Identificador de la autenticación de Google
 * @property {varchar} googleEmail - Correo electrónico de Google
 * @property {varchar} googleProfilePicture - Foto de Perfil de Google
 */
module.exports = class Empleado {
  /**
   * @brief
   * Constructor de la clase Empleado
   * @param {*} Empleado - Objeto de tipo Empleado
   */
  constructor(empleado) {
    this.idEmpleado = empleado.idEmpleado
    this.primerNombre = empleado.primerNombre
    this.segundoNombre = empleado.segundoNombre
    this.apellidoPaterno = empleado.apellidoPaterno
    this.apellidoMaterno = empleado.apellidoMaterno
    this.idGoogleAuth = empleado.idGoogleAuth
    this.googleEmail = empleado.googleEmail
    this.googleProfilePicture = empleado.googleProfilePicture
  }

  /**
   * @brief
   * Recibe un empleado de acuerdo con el ID
   * @param {*} idEmpleado - ID del empleado
   * @returns {object} - Objeto de tipo Empleado
   */
  static async getByID(idEmpleado) {
    const query = `select * from empleado where idEmpleado = ?`
    const [rows] = await dataBase.execute(query, [idEmpleado])

    if (rows.length === 0) throw new Error("Empleado no encontrado")

    return new Empleado(rows[0])
  }

  /**
   * @brief
   * Recibe un empleado de acuerdo con el mail
   * @param {*} email - mail del empleado
   * @returns {object} - Objeto de tipo Empleado
   */
  static async getByEmail(googleEmail) {
    const query = `select * from empleado where googleEmail = ?`
    const [rows] = await dataBase.execute(query, [googleEmail])

    if (rows.length === 0) return null

    return new Empleado(rows[0])
  }

  /**
   * @brief
   * Obtiene todos los empleados.
   * @returns {Empleado[]} - Arreglo de objetos de tipo Empleado
   */
  static async getAll() {
    const query = `select * from empleado`
    const [rows, _] = await dataBase.execute(query)

    return rows
  }

  /**
   * @brief
   * Guarda un nuevo empleado
   * @returns {Promise<Empleado>} - Query del empleado guardado
   */
  async save() {
    const query = `insert into empleado(primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, 
            idGoogleAuth, googleEmail, googleProfilePicture) values (?, ?, ?, ?, ?, ?, ?)`

    const [result] = await dataBase.execute(query, [
      this.primerNombre,
      this.segundoNombre,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.idGoogleAuth,
      this.googleEmail,
      this.googleProfilePicture,
    ])

    this.idEmpleado = result.insertId
    return this
  }

  /**
   * @brief
   * Verifica si un empleado existe en la base de datos.
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - Si no se envia el primer nombre
   * @throws {Error} - Si no se envia el apellido paterno
   * @throws {Error} - Si no se envia id de Google Authenticator
   * @throws {Error} - Si no se envia el correo electronico de Google
   */
  async verify(Empleado) {
    if (!this.primerNombre)
      throw new Error("No se ha proporcionado el primer nombre")
    if (!this.apellidoPaterno)
      throw new Error("No se ha proporcionado el apellido paterno")
    if (!this.idGoogleAuth)
      throw new Error("No se ha proporcionado un ID de Google Authenticator")
    if (!this.googleEmail)
      throw new Error("No se ha proporcionado un correo de Google")

    const [empleado] = await dataBase.query(
      `select * from empleado where primerNombre = ? AND 
            apellidoPaterno = ? AND idGoogleAuth = ? AND googleEmail = ?`,
      [
        this.primerNombre,
        this.apellidoPaterno,
        this.idGoogleAuth,
        this.googleEmail,
      ]
    )

    return Boolean(empleado)
  }

  /**
   * @brief
   * Elimina un empleado de acuerdo con el ID
   * @param {*} idEmpleado - id del empleado
   * @returns {Promise<void>} - Query del empleado eliminado
   */
  static async deleteByID(idEmpleado) {
    const query = `delete from empleado where idEmpleado = ?`

    await dataBase.execute(query, [idEmpleado])
  }

  /**
   * @brief
   * cheks if an employee exists in the database.
   * @returns {Promise<boolean>} - True if exists, false if not
   * throws {Error} - If idEmpleado is not provided
   * */

  static async verifyByEmail(googleEmail) {
    if (!googleEmail) throw new Error("No se ha proporcionado el ID del empleado")

    const [empleado, _] = await dataBase.query(
      `select * from empleado where googleEmail = ?`,
      [googleEmail]
    )

    if (empleado.length === 0) return false
    else
      return true
  }

  /**
   * @brief
   * Obtiene el ultimo id de empleado
   * @returns {Promise<int>} - id del ultimo empleado
   * @throws {Error} - Si no se encuentra el ultimo empleado
   * */

  static async getLastID() {
    const query = `select idEmpleado from empleado order by idEmpleado desc limit 1`
    const [rows] = await dataBase.execute(query)

    if (rows.length === 0) throw new Error("No se ha encontrado el ultimo empleado")

    return rows[0].idEmpleado
  }

  /**
   * @brief
   * Checks if there are employees in the database. If there are no 
   * employees, it returns false, otherwise it returns true.
   * @returns {Promise<boolean>} - True if exists, false if not
   */
  static async exists() {
    try {
      const query = `select count(*) as employees from empleado`
      const [rows] = await dataBase.execute(query)

      if (rows[0].employees === 0) return false

      return true
    } catch (error) {
      console.log(error)
      throw new Error("No se ha encontrado el ultimo empleado")
    }
  }
}
