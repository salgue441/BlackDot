/**
 * @file usuario.controller.js
 * @brief Controller for usuario table (Editar Usuarios)
 * @author Oli Garcia
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const bodyparser = require("body-parser")
const express = require("express")
const path = require("path")

// Data Models
const Empleado = require("../Models/empleado.model")
const Rol = require("../Models/rol.model")
const EmpleadoRol = require("../Models/empleado-rol.model")


/**
 * @brief
 * get of editar usuarios
 * @param {Request} request - Request object
 * @param {Response} response - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */
/** */
exports.getEditarUsuario = async (req, res) => {
  try {
    const empleados = await Empleado.getAll()
    const empleadoRoles = await EmpleadoRol.getAll()

    // Render the EJS template with the usuarios and empleadoRoles
    res.render("Static/editar/editarUsuario.ejs", {
      empleados,
      empleadoRoles,
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/Error.ejs"), { error })
  }
}

/**
 * @brief
 * get of registrar usuarios
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */
exports.getRegistrarUsuario = async (req, res) => {
  try {
    const empleadoRoles = await EmpleadoRol.getAllWithRoles()

    const empleadoSinRol = []

    for (let i = 0; i < empleadoRoles.length; i++) {
      if (empleadoRoles[i].idRol == 3) {
        empleadoSinRol.push(empleadoRoles[i])
      }
    }

    res.render("../Views/Static/editar/registrarUsuario.ejs", {
      empleadoSinRol,
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/Error.ejs"), { error })
  }
}

/**
 * @brief
 * Post of accept usuario
 * @param {Request} request - Request object
 * @param {Response} response - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.postAceptarUsuario = async (req, res) => {
  try {
    const idEmpleado = parseInt(req.body.idEmpleado)
    const idRol = 2

    const empleadoRol = new EmpleadoRol({
      idEmpleado: idEmpleado,
      idRol: idRol,
    })

    await empleadoRol.update()

    res.redirect("/editar/empleados/aceptar")
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/Error.ejs"), { error })
  }
}

/**
 * @brief
 * Post of reject usuario
 * @param {Request} request - Request object
 * @param {Response} response - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 * */

exports.postRechazarUsuario = async (req, res) => {
  try {
    const idEmpleado = parseInt(req.body.idEmpleado)

    await EmpleadoRol.deleteById(idEmpleado)

    try {
      await Empleado.deleteByID(idEmpleado)
      res.redirect("/editar/empleados/aceptar")
    } catch (error) {
      res.render(path.join(__dirname, "../Views/Static/Error.ejs"), { error })
    }
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/Error.ejs"), { error })
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

exports.getEditarUsuario = async (req, res) => {
  try {
    const empleados = await EmpleadoRol.getAllWithRoles()
    const roles = await Rol.getAll()

    res.render(path.join(__dirname, "../Views/Static/editar/correo.ejs"), {
      empleados,
      roles,
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/Error.ejs"), {
      error,
    })
  }
}

/** 
 * @brief
 *  get of delete usuario
 * @param {Request} request - Request object
 * @param {Response} response - Response object
 * @returns {Response} - Response object
 * @throws {Error} - Error message
 */ 


exports.getEliminarUsuario = async (req, res) => {
  try {
    const idEmpleado = parseInt(req.params.id)

    await EmpleadoRol.deleteById(idEmpleado)
   
    try{
      await Empleado.deleteByID(idEmpleado)
      res.redirect("/editar/empleados")
    } catch (error) {
      res.render(path.join(__dirname, "../Views/Static/error.ejs"), 
      {error})
    }
      
  }catch (error) {
      res.render(path.join(__dirname, "../Views/Static/error.ejs"), 
      {error})
    }

  }
    



