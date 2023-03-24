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

module.exports = class Empleado {
    constructor(Empleado) {
      this.idEmpleado = Empleado.idEmpleado
      this.primerNombre = Empleado.primerNombre
      this.segundoNombre = Empleado.segundoNombre
      this.apellidoPaterno = Empleado.apellidoPaterno
      this.apellidoMaterno = Empleado.apellidoMaterno
      this.idGoogleAuth = Empleado.idGoogleAuth
      this.googleEmail = Empleado.googleEmail
    }
}
