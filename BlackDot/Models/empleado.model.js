/**
 * @file empleado.model.js
 * @brief Modelo de la tabla de empleados
 * @author Iván Paredes
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
 * @property {varchar} googleEmail - Contenido del apellido materno
 * @property {int} idRol - Identificador del rol
 * @property {int} idEquipoTrabajo - Identificador del equipo de trabajo
 */
module.exports = class Empleado {
  /**
   * @brief
   * Constructor de la clase Empleado
   * @param {*} Empleado - Objeto de tipo Empleado
   */
    constructor(Empleado) {
      this.idEmpleado = Empleado.idEmpleado
      this.primerNombre = Empleado.primerNombre
      this.segundoNombre = Empleado.segundoNombre
      this.apellidoPaterno = Empleado.apellidoPaterno
      this.apellidoMaterno = Empleado.apellidoMaterno
      this.idGoogleAuth = Empleado.idGoogleAuth
      this.googleEmail = Empleado.googleEmail
      this.idRol = Empleado.idRol
      this.idEquipoTrabajo = Empleado.idEquipoTrabajo
    }

    /**
     * @brief
     * Recibe un empleado de acuerdo con el ID
     * @param {*} idEmpleado - ID del empleado
     * @returns {object} - Objeto de tipo Empleado
     */
    static async getByID(idEmpleado) {
        const query = `select * from Empleado where idEmpleado = ?`
        const [rows] = await dataBase.execute(query, [idEmpleado])

        if (rows.length === 0)
            throw new Error("Empleado no encontrado")
        
        return new Empleado(rows[0])
    }

    /**
     * @brief
     * Obtiene todos los Empleados.
     * @returns {Promise<Empleado[]>} - Arreglo de objetos de tipo Empleado
     */
    static async getAll() {
        const [empleado, _] = await dataBase.query("select * from Empleado")

        return empleado
    }

    /**
     * @brief
     * Guarda un nuevo empleado
     * @returns {Promise<Empleado>} - Query del empleado guardado
     */
    async save() {
        const query = `insert into Empleado(primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, 
            idGoogleAuth, googleEmail, idRol, idEquipoTrabajo) values (?, ?, ?, ?, ?, ?, ?, ?)`

        const [result] = await dataBase.execute(query, [
            this.primerNombre,
            this.segundoNombre,
            this.apellidoPaterno,
            this.apellidoMaterno,
            this.idGoogleAuth,
            this.googleEmail,
            this.idRol,
            this.idEquipoTrabajo
        ])

        this.idCualitativa = result.insertId
    }

    /**
     * @brief
     * Verifica si un empleado existe en la base de datos.
     * @returns {Promise<boolean>} - True si existe, false si no
     * @throws {Error} - Si no se envia el id de empleado
     */
    static async verify(Empleado) {
        if (!Empleado.idEmpleado) 
            throw new Error("No se ha proporcionado un id de empleado")

        const [empleado] = await dataBase.query(
            "select * from Empleado where idEmpleado = ?",
            [Empleado.idEmpleado]
        )
    }

    /**
     * @brief
     * Elimina un empleado de acuerdo con el ID
     * @param {*} idCualitativa - id del empleado
     * @returns {Promise<void>} - Query del empleado eliminado
     */
    static async deleteByID(idEmpleado) {
        const query = `delete from Empleado where idEmpleado = ?`

        await dataBase.execute(query, [idEmpleado])
    }
}
