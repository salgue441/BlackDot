const path = require("path")

//Models
const Empleado = require("../Models/empleado.model")
const Rol = require("../Models/rol.model")
const RolEmpleado = require("../Models/empleado-rol.model")

exports.mostrarCorreos = async (req, res) => {
  const idEmpleado = req.params.id || -1

  let empleado = null
  let rolEmpleado = null

  if (idEmpleado != -1) {
    empleado = await Empleado.getById(idEmpleado)
    rolEmpleado = await Rol.getById(empleado.idRol)
  }

  try {
    Empleado.getAll().then((empleados) => {
      try {
        Rol.getAll().then((roles) => {
          try {
            RolEmpleado.getAll().then((rolesEmpleados) => {
              if (empleado != null) {
                res.render(
                  path.join(__dirname, "../Views/Static/editar/correo.ejs"),
                  {
                    empleados,
                    roles,
                    rolesEmpleados,
                    idEmpleado,
                  }
                )
              } else {
                res.render(
                  path.join(__dirname, "../Views/Static/editar/correo.ejs"),
                  {
                    empleados,
                    roles,
                    rolesEmpleados,
                    idEmpleado,
                    empleado,
                    rolEmpleado,
                  }
                )
              }
            })
          } catch (error) {
            res.render(path.join(__dirname, "../Views/Static/error.ejs"), {
              error,
            })
          }
        })
      } catch (error) {
        res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
      }
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
  }
}
