const path = require("path")

//Models
const Empleado = require("../Models/empleado.model")
const Rol = require("../Models/rol.model")
const RolEmpleado = require("../Models/empleado-rol.model")

exports.mostrarCorreos = async (req, res) => {
  try {
    Empleado.getAll().then((empleados) => {
      try {
        Rol.getAll().then((roles) => {
          try {
            RolEmpleado.getAll().then((rolesEmpleados) => {
              res.render(
                path.join(__dirname, "../Views/Static/editar/correo.ejs"),
                {
                  empleados,
                  roles,
                  rolesEmpleados,
                }
              )
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
