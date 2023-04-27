/**
 * @file retroPregunta.model.test.js
 * @brief Test suite for retroPregunta model
 * @author Carlos Salguero
 * @date 2023-03-27
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const retroPregunta = require("../models/retro-pregunta.model")

/**
 * @brief
 * Test suite for retroPregunta model
 */
describe("retroPregunta", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe("Constructor", () => {
    /**
     * @brief
     * Unit test for retroPregunta constructor
     * @param {int} idRetro - ID of the retro
     * @param {int} idPregunta - ID of the pregunta
     * @param {boolean} required - If the pregunta is required
     */
    test("Debe crear una instancia de retroPregunta", () => {
      const retroalimentacionPregunta = new retroPregunta({
        idRetroalimentacion: 1,
        idPregunta: 1,
        required: true,
      })

      expect(retroalimentacionPregunta).toBeInstanceOf(retroPregunta)
    })

    /**
     * @brief
     * Unit test for retroPregunta constructor
     * @param {int} idRetro - ID of the retro
     */
    describe("getByIDRetro", () => {
      test("Debe devolver un arreglo de preguntas", async () => {
        const preguntas = await retroPregunta.getByRetroalimentacion(1)
        expect(preguntas).toBeInstanceOf(retroPregunta)
      })
    })

    /**
     * @brief
     * Unit test for retroPregunta constructor
     * @param {int} idPregunta - ID of the pregunta
     */
    describe("getByIDP", () => {
      test("Debe devolver un arreglo de retroalimentaciones", async () => {
        const retro = await retroPregunta.getByPregunta(1)
        expect(retro).toBeInstanceOf(retroPregunta)
      })
    })

    /**
     * @brief
     * Unit test for retroPregunta constructor
     */
    describe("getQualitativeAnswers", () => {
      test("Debe devolver un arreglo de retroPregunta", async () => {
        const qualitative = await retroPregunta.getQualitativeAnswers()
        expect(Array.isArray(qualitative)).toBe(true)
      })
    })

    /**
     * @brief
     * Unit test for retroPregunta constructor
     */
    describe("getQuantitativeAnswers", () => {
      test("Debe devolver un arreglo de retroPregunta", async () => {
        const quantitative = await retroPregunta.getQuantitativeAnswers()
        expect(Array.isArray(quantitative)).toBe(true)
      })
    })
  })
})
