/**
 * @file retroPregunta.model.test.js
 * @brief Archivo de pruebas unitarias para el modelo retroPregunta.model.js
 * @author Carlos Salguero
 * @date 2023-03-27
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const RetroPregunta = require("../models/retro-pregunta.model")

/**
 * @brief
 * Test para RetroPregunta
 */
describe("RetroPregunta", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe("Constructor", () => {
    /**
     * @brief
     * Test para el constructor de RetroPregunta
     * @param {int} idRetro - ID del retro
     * @param {int} idPregunta - ID de la pregunta
     */
    test("Debe crear una instancia de RetroPregunta", () => {
      const retroPregunta = new RetroPregunta({
        idRetro: 1,
        idPregunta: 1,
      })
      expect(retroPregunta).toBeInstanceOf(RetroPregunta)
    })
  })

  /**
   * @brief
   * Test para el metodo de GetByIDR
   * @param {int} idRetro - ID del retro
   */
  describe("getByIDR", () => {
    test("Debe devolver un arreglo de preguntas", async () => {
      const preguntas = await RetroPregunta.getByIDR(1)
      expect(preguntas).toBeInstanceOf(RetroPregunta)
    })
  })

  /**
   * @brief
   * Test para el metodo de GetByIDR
   * @param {int} idRetro - ID del retro
   */
  describe("getByIDP", () => {
    test("Debe devolver un arreglo de retroalimentaciones", async () => {
      const retro = await RetroPregunta.getByIDP(1)
      expect(retro).toBeInstanceOf(RetroPregunta)
    })
  })

  /**
   * @brief
   * Test para el metodo de getAllCualitativas de RetroPregunta
   */
  describe("getAllCualitativas", () => {
    test("Debe devolver un arreglo de retroPregunta", async () => {
      const retroPregunta = await RetroPregunta.getAllCuali()
      expect(retroPregunta).toBeInstanceOf(Array)
      expect(retroPregunta[0]).toBeInstanceOf(RetroPregunta)
    })
  })

  /**
   * @brief
   * Test para el metodo de getAllCuantitativas de RetroPregunta
   */
  describe("getAllCuantitativas", () => {
    test("Debe devolver un arreglo de retroPregunta", async () => {
      const retroPregunta = await RetroPregunta.getAllCuali()
      expect(retroPregunta).toBeInstanceOf(Array)
      expect(retroPregunta[0]).toBeInstanceOf(RetroPregunta)
    })
  })
})
