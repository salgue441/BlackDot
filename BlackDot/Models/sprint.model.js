const dataBase = require("../Utils/dataBase");

/**
 * @class Sprint
 * @classdesc Clase que representa un modelo de Sprint
 * @property {int} id - Identificador del sprint
 * @property {string:Date} FechaCreacion - Fecha de creacion del sprint
 * @property {string:Date} FechaFinalizacion - Fecha de finalizacion del sprint
 * @property {int} numeroSprint - Numero de sprint
 **/

moduole.exports = class Sprint {
  /**
   * @brief
   * Constructor de la clase Sprint
   * @param {*} Sprint - Objeto de tipo Sprint
   * @throws {Error} - Si no se envia el objeto de tipo Sprint
   * @throws {Error} - Si el objeto no tiene el atributo FechaCreacion
   * @throws {Error} - Si el objeto no tiene el atributo FechaFinalizacion
   * @throws {Error} - Si el objeto no tiene el atributo numeroSprint
   */

  constructor(Sprint) {
    if (!Sprint) throw new Error("El objeto no es de tipo Sprint");
    if (!Sprint.FechaCreacion)
      throw new Error("El objeto no tiene el atributo FechaCreacion");
    if (!Sprint.FechaFinalizacion)
      throw new Error("El objeto no tiene el atributo FechaFinalizacion");
    if (!Sprint.numeroSprint)
      throw new Error("El objeto no tiene el atributo numeroSprint");

    this.id = Sprint.id;
    this.FechaCreacion = Sprint.FechaCreacion;
    this.FechaFinalizacion = Sprint.FechaFinalizacion;
    this.numeroSprint = Sprint.numeroSprint;
  }

  /**
   * @brief
   * Funcion que obtiene un sprint por su id
   * @param {*} id - Identificador del sprint
   * @returns {Sprint} - Objeto de tipo sprint
   */

  static async getbyID(id) {
    if (!id) throw new Error("No se envio el id");

    const sprint = await dataBase.query("select * from Sprint where id = ?", [
      id,
    ]);

    return new Sprint(sprint);
  }

  static async getAll() {
    const sprints = await dataBase.query("select * from Sprint");
    return sprints.map((sprint) => new Sprint(sprint));
  }

  static async getSprintActual() {
    const fechaActual = new Date().toISOString().split("T")[0];


    const sprint = await dataBase.query(
      "select * from Sprint where FechaCreacion <= ? and FechaFinalizacion >= ?",
      [fechaActual, fechaActual]
    );

    return new Sprint(sprint);
  }
};
