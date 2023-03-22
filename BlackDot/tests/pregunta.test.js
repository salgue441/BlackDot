/**
 * @file pregunta.test.js
 * @brief Pruebas unitarias para la clase Pregunta
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Yuna Chung
 * @author Ivan Paredes
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Pregunta = require("../models/pregunta.model")

/**
 *
 */
describe("Pregunta", () => {
  describe("Constructor", () => {})

  /**
   * @brief
   * Prueba unitaria para el método getByID
   * @param {int} idPregunta - ID de la pregunta
   */
  describe("getByID", () => {
    it("Debe devolver una pregunta", async () => {
      const pregunta = await Pregunta.getByID(1)

      expect(pregunta).toBeInstanceOf(Pregunta)
    })

    it("Debe devolver un error si no se proporciona un ID", async () => {
      await expect(Pregunta.getByID()).rejects.toThrow()
    })
  })
})
