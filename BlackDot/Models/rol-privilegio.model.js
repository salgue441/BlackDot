/**
 * @file rol-privilegio.model.js
 * @brief Modelo de la tabla rolPrivilegio
 * @author Iván Paredes
 * @version 1.0
 * @date 2023-03-28
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const dataBase = require("../utils/dataBase")

/**
 * @class
 * @classdesc Modelo de la tabla de rolPrivilegio
 * @property {int} idRol - Identificador del rol
 * @property {int} idPrivilegio - Identificador del privilegio
 * 
 */
const { getByID } = require("./Rol.model")
const { getByID } = require("./Privilegio.model")

