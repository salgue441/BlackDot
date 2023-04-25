/**
 * @file usuario.controller.js
 * @brief Controller for usuario table (Editar Usuarios)
 * @author Oli Garcia
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

// Data Models
const Empleado = require("../models/empleado.model")
const Rol = require("../models/rol.model")
const EmpleadoRol = require("../models/empleado-rol.model")
const authUtil = require("../Utils/auth")


/**
 * @brief
 * get of editar usuarios
 * @param {Request} request - Request object
 * @param {Response} response - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */
/** */
exports.getEditarUsuario = async (request, response) => {
  try {
    const empleados = await Empleado.getAll()
    const empleadoRoles = await EmpleadoRol.getAll()

    // Render the EJS template with the usuarios and empleadoRoles
    response.render("Static/editar/editarUsuario.ejs", {
      empleados,
      empleadoRoles
    })
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error al obtener datos",
    })
  }
}

/**
 * @brief
 * 
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */
exports.getRegistrarUsuario = async (request, response) => {
  try {
    const empleados = await Empleado.getAll()
    const empleadoRoles = await EmpleadoRol.getAll()
    console.log(empleadoRoles[0].idRol)
    const roles = await Rol.getAll()

    // Render the EJS template with the usuarios and empleadoRoles
    response.render("Static/editar/registrarUsuario.ejs", {
      empleados,
      empleadoRoles,
      roles
    })
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error al obtener empleados, empleados-roles, roles",
    })
  }
}

/**
 * @brief
 * get of editar rol de usuarios
 * @param {Request} request - Request object
 * @param {Response} response - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */
/** */
exports.getEditarUsuarioRol = async (request, response) => {
  try {
    const empleados = await Empleado.getAll()
    const empleadoRoles = await EmpleadoRol.getAll()

    // Render the EJS template with the usuarios and empleadoRoles
    response.render("Static/editar/editarUsuarioRol.ejs", {
      empleados,
      empleadoRoles
    })
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error al obtener datos",
    })
  }
}


