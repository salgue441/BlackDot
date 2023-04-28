const path = require("path");

/**
 * @Get error view
 * @param {Request} req
 * @param {Response} res
 * @returns error view
 * @throws {Error} - Error message
 */
exports.getError = (req, res) => {
  try {
    res.render(path.join(__dirname, "../Views/Static/error.view.ejs"));
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al obtener vista de error",
    });
  }
};
