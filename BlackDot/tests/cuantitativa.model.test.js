/**
 * @file cuantitativa.model.test.js
 * @brief Test de la clase Cualitativa
 * @author Carlos Salguero
 * @date 2023-03-27
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Cuantitativa = require("../models/cuantitativa.model")

/**
 * @brief
 * Test para Cualitativa
 */
describe("Cuantitativa", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe("Constructor", () => {
    /**
     * @brief
     * Test para el constructor de Cualitativa
     * @param {int} idCualitativa - ID de la respuesta cualitativa (autogenerado)
     * @param {string} contenido - Contenido de la respuesta
     * @param {int} idPregunta - ID de la pregunta a la que pertenece la respuesta
     * @param {int} idRetroalimentacion -ID de la retroalimentación a la que pertenece la respuesta
     */
    test("Debe crear una instancia de Cuantitativa", () => {
      const cuanti = new Cuantitativa({
        contenido: 5,
        idPregunta: 1,
        idRetroalimentacion: 1,
      })
      expect(cuanti).toBeInstanceOf(Cuantitativa)
    })
  })

  /**
   * @brief
   * Test para el metodo de GetByID
   * @param {int} idCualitativa - ID de la respuesta cualitativa (autogenerado)
   */
  describe("getByID", () => {
    test("Debe devolver una respuesta cualitativa", async () => {
      const cuanti = await Cuantitativa.getByID(1)
      expect(cuanti).toBeInstanceOf(Cuantitativa)
    })
  })

  /**
   * @brief
   * Test para el metodo de GetAll
   */
  describe("getAll", () => {
    test("Debe devolver un arreglo de respuestas cualitativas", async () => {
      const cualitas = await Cuantitativa.getAll()
      expect(cualitas).toBeInstanceOf(Array)
      expect(cualitas[0]).toBeInstanceOf(Cuantitativa)
    })
  })

  /**
   * @brief
   * Test para el metodo de save
   */
  describe("save", () => {
    test("Debe guardar una respuesta cualitativa", async () => {
      const cuanti = new Cuantitativa({
        contenido: 5,
        idPregunta: 1,
        idRetroalimentacion: 1,
      })
      await cuanti.save()
      expect(cuanti.idCuantitativa).toBeGreaterThan(0)
    })
  })

  /**
   * @brief
   * Test para el metodo de deleteByID
   * @param {int} idCualitativa - ID de la respuesta cualitativa (autogenerado)
   */
  describe("deleteByID", () => {
    test("Debe eliminar una respuesta cualitativa", async () => {
      const cuantitativa = new Cuantitativa({
        contenido: 5,
        idPregunta: 1,
        idRetroalimentacion: 1,
      })

      await cuantitativa.save()

      await Cuantitativa.deleteByID(cuantitativa.idCuantitativa)
      expect(cuantitativa.idCuantitativa).toBeGreaterThan(0)
    })
  })

  /**
   * @brief
   * Test para el metodo de Update
   * @param {*} Cuantitativa - Objeto de la clase Cuantitativa
   */
  describe("update", () => {
    test("Debe actualizar una respuesta cuantitativa", async () => {
      const cuanti = new Cuantitativa({
        contenido: 5,
        idPregunta: 1,
        idRetroalimentacion: 1,
      })

      await cuanti.save()

      cuanti.update({
        contenido: 10,
      })
    })
  })
})
