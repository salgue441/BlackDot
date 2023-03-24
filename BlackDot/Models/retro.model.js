const dataBase = require("../Utils/dataBase");

/**
 * @class Retro
 * @classdesc Clase que representa un modelo de Retro
 * @property {int} id - Identificador de la retro
 * @property {string:Date} FechaCreacion - Fecha de creacion de la retro
 * @property {string:Date} FechaFinalizacion - Fecha de finalizacion de la retro
 **/

module.exports = class Retro {
    /** 
     * @brief
     * Constructor de la clase Retro
     */

    constructor(Retro) {
        this.id = Retro.id;
        this.FechaCreacion = Retro.FechaCreacion;
        this.FechaFinalizacion = Retro.FechaFinalizacion;
        this.idSprint = Retro.idSprint;
        this.idReporte = Retro.reporte;
    }

    /** 
     * @brief
     * Funcion que obtiene una retro por su id
     */

    static async getbyID(id) {
        if (!id) throw new Error("No se envio el id");

        const retro = await dataBase.query("select * from Retro where id = ?", [
            id,
        ]);

        return new Retro(retro);
    }

    /**
     * @brief
     * Funcion que obtiene todas las retros
     * @returns {Retro[]} - Arreglo de objetos de tipo retro
     * */

    static async getAll() {
        const retros = await dataBase.query("select * from Retro");
        return retros.map((retro) => new Retro(retro));
    }

    /**
     * @brief
     * Funcion que guarda una retro
     */

    async save() {
        await dataBase.query("insert into Retroalimentacion (FechaCreacion, FechaFinalizacion, idSprint, idReporte) values (?,?,?,?)", [
            this.FechaCreacion,
            this.FechaFinalizacion,
            this.idSprint,
            this.idReporte
        ]);
    }


}