/**
 * @file empleado.model.js
 * @brief Model of the table of empleado answers
 * @author Iván Paredes
 * @author Yuna Chung
 * @version 1.0
 * @date 2023-03-23
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

// Require the database connection
const dataBase = require("../utils/dataBase")


/**
 * @class
 * @classdesc Moodel of the table Empleado
 * @property {int} idEmpleado - Employee ID
 * @property {varchar} primerNombre - First name content
 * @property {varchar} segundoNombre - Second name content
 * @property {varchar} apellidoPaterno - last name content
 * @property {varchar} apellidoMaterno - given name content
 * @property {binary} idGoogleAuth - Google Auth ID
 * @property {varchar} googleEmail - google email
 * @property {varchar} googleProfilePicture - profile picture
 */
module.exports = class Empleado {
  /**
   * @brief
   * Empleado constructor
   * @param {*} Empleado - Objeto de tipo Empleado
   * @property {int} idEmpleado - Employee ID
    * @property {varchar} primerNombre - First name content
    * @property {varchar} segundoNombre - Second name content
    * @property {varchar} apellidoPaterno - last name content
    * @property {varchar} apellidoMaterno - given name content
    * @property {binary} idGoogleAuth - Google Auth ID
    * @property {varchar} googleEmail - google email
    * @property {varchar} googleProfilePicture - profile picture
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
   * get an employee by ID
   * @param {*} idEmpleado - Employee ID
   * @returns {object} - employee object
   */
  static async getByID(idEmpleado) {
    const query = `select * from Empleado where idEmpleado = ?`
    const [rows] = await dataBase.execute(query, [idEmpleado])

    if (rows.length === 0) throw new Error("Empleado no encontrado")

    return new Empleado(rows[0])
  }

  /**
   * @brief
   * get an employee by email
   * @param {*} email - mail of the employee
   * @returns {object} - employee object
   */
  static async getByEmail(googleEmail) {
    const query = `select * from Empleado where googleEmail = ?`
    const [rows] = await dataBase.execute(query, [googleEmail])

    if (rows.length === 0) throw new Error("Empleado no encontrado")

    return new Empleado(rows[0])
  }

  /**
   * @brief
   * get all employees
   * @returns {Empleado[]} - Array of employees
   */
  static async getAll() {
    const query = `select * from Empleado`
    const [rows, _] = await dataBase.execute(query)

    return rows
  }

  /**
   * @brief
   * Saves an employee in the database
   * @returns {Promise<Empleado>} - Empleado object
   * @property {int} idEmpleado - Employee ID
   * @property {varchar} primerNombre - First name content
   * @property {varchar} segundoNombre - Second name content
   * @property {varchar} apellidoPaterno - last name content
   * @property {varchar} apellidoMaterno - given name content
   * @property {binary} idGoogleAuth - Google Auth ID
   * @property {varchar} googleEmail - google email
   * @property {varchar} googleProfilePicture - profile picture
   * @throws {Error} - Si no se envia el primer nombre
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
  }

  /**
   * @brief
   * Verifies if an employee exists in the database
   * @returns {Promise<boolean>} - True si existe, false si no
   * @throws {Error} - if the first name is not provided
   * @throws {Error} - if the last name is not provided
   * @throws {Error} - if the google authenticator ID is not provided
   * @throws {Error} - if the google email is not provided
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
      `select * from Empleado where primerNombre = ? AND 
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
   * Deletes an employee from the database by ID
   * @param {*} idEmpleado - Employee ID
   * @returns {Promise<void>} - Query result
   * 
   */
  static async deleteByID(idEmpleado) {
    const query = `delete from Empleado where idEmpleado = ?`

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
      `select * from Empleado where googleEmail = ?`,
      [googleEmail]
    )

    if (empleado.length === 0) return false
    else
      return true
  }

  /**
   * @brief
   * Gets last employee ID
   * @returns {Promise<int>} - Last employee ID
   * @throws {Error} - If no employee is found
   * */

  static async getLastID() {
    const query = `select idEmpleado from Empleado order by idEmpleado desc limit 1`
    const [rows] = await dataBase.execute(query)

    if (rows.length === 0) throw new Error("No se ha encontrado el ultimo empleado")

    return rows[0].idEmpleado
  }
}
