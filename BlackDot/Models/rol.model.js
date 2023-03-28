/**
 * @file rol.model.js
 * @brief Modelo de la tabla de rol
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-27
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de rol
 * @property {int} idRol - Identificador del rol
 * @property {varchar} nombreRol - Nombre del rol
 */
module.exports = class Rol {
    /**
     * @brief
     * Constructor de la clase Rol
     * @param {*} Rol - Objeto de tipo Rol
     */
    constructor(Rol) {
        this.idRol = Rol.idRol
        this.nombreRol = Rol.nombreRol
    }

    /**
     * @brief
     * Obtiene un Rol de acuerdo con el ID
     * @param {*} idRol - ID del rol
     * @returns {object} - Objeto de tipo Rol
     */
    static async getByID(idRol) {
        if (!idRol) throw new Error("No se ha proporcionado un ID")

        const [rol] = await dataBase.query(
            "select * from Rol where idRol = ?",
            [idRol]
        )

        return new Rol(rol)
    }

    /**
     * @brief
     * Obtiene todos los Roles.
     * @returns {Promise<Rol[]>} - Arreglo de objetos de tipo Rol
     */
    static async getAll() {
        const roles = await dataBase.query("select * from Rol")

        return roles.map((rol) => new Rol(rol))
    }

    /**
     * @brief
     * Guarda un Rol en la base de datos.
     * @returns {Promise<Rol>} - Query del rol guardado
     * @throws {Error} - Si no se ha proporcionado un nombre de Rol
     * @throws {Error} - Si no se ha proporcionado un label de Rol
     */
    save() {
        if (!this.nombreRol) 
            throw new Error("No se ha proporcionado nombre de rol")

        return dataBase.query(
            "insert into Rol (nombreRol) values (?)",
            [this.nombreRol]
        )
    }

    /**
     * @brief
     * Verifica si un rol existe en la base de datos.
     * @returns {Promise<boolean>} - True si existe, false si no
     * @throws {Error} - Si no se envia el id de rol
     */
    static async verify(Rol) {
        if (!Rol.idRol) 
            throw new Error("No se ha proporcionado un id de privilegio")

        const [rol] = await dataBase.query(
            "select * from Rol where idRol = ?",
            [Rol.idRol]
        )
    }  

    /**
     * @brief
     * Elimina un rol de acuerdo con el ID
     * @param {*} idRol - id del rol
     * @returns {Promise<void>} - Query del rol eliminado
     */
    static async deleteByID(idRol) {
        const query = `delete from Rol where idRol = ?`

        await dataBase.execute(query, [idRol])
    }
}


