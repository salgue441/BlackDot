const path = require("path")

//Models
const Empleado = require("../Models/empleado.model")

exports.mostrarCorreos = async (req, res) => {
  try {
    Empleado.getAll().then((empleados) => {
      console.log(empleados)
      res.render(path.join(__dirname, "../Views/Static/editar/correo.ejs"), {
        empleados,
      })
    })
  } catch (error) {
    res.render(path.join(__dirname, "../Views/Static/error.ejs"), { error })
  }
}
