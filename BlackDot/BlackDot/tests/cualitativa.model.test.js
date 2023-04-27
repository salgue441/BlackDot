/**
 * @file cualitativa.model.test.js
 * @brief Test de la clase Cualitativa
 * @author Carlos Salguero
 * @date 2023-03-27
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Cualitativa = require("../models/cualitativa.model")

/**
 * @brief
 * Test para Cualitativa
 */
describe("Cualitativa", () => {
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
    test("Debe crear una instancia de Cualitativa", () => {
      const cualita = new Cualitativa({
        contenido:
          "Considero que mi desempeño fue bueno. Me gustaría que me dieran más oportunidades de participar en las etapas de negociación con el cliente",
        idPregunta: 1,
        idRetroalimentacion: 1,
      })
      expect(cualita).toBeInstanceOf(Cualitativa)
    })

    /**
     * @brief
     * Test para el metodo de GetByID
     * @param {int} idCualitativa - ID de la respuesta cualitativa (autogenerado)
     */
    describe("getByID", () => {
      test("Debe devolver una respuesta cualitativa", async () => {
        const cualita = await Cualitativa.getByID(1)
        expect(cualita).toBeInstanceOf(Cualitativa)
      })
    })

    /**
     * @brief
     * Test para el metodo de GetAll
     */
    describe("getAll", () => {
      test("Debe devolver un arreglo de respuestas cualitativas", async () => {
        const cualitas = await Cualitativa.getAll()
        expect(cualitas).toBeInstanceOf(Array)
        expect(cualitas[0]).toBeInstanceOf(Cualitativa)
      })
    })

    /**
     * @brief
     * Test para el metodo de save
     */
    describe("save", () => {
      test("Debe guardar una respuesta cualitativa", async () => {
        const cualita = new Cualitativa({
          contenido:
            "Considero que mi desempeño fue bueno. Me gustaría que me dieran más oportunidades de participar en las etapas de negociación con el cliente",
          idPregunta: 1,
          idRetroalimentacion: 1,
        })

        await cualita.save()
        expect(cualita).toBeInstanceOf(Cualitativa)
      })
    })

    /**
     * @brief
     * Test para el metodo de deleteByID
     * @param {int} idCualitativa - ID de la respuesta cualitativa (autogenerado)
     */
    describe("deleteByID", () => {
      test("Debe eliminar una respuesta cualitativa", async () => {
        const cualita = new Cualitativa({
          contenido:
            "Considero que mi desempeño fue bueno. Me gustaría que me dieran más oportunidades de participar en las etapas de negociación con el cliente",
          idPregunta: 1,
          idRetroalimentacion: 1,
        })

        await cualita.save()

        await Cualitativa.deleteByID(cualita.idCualitativa)
        expect(cualita).toBeInstanceOf(Cualitativa)
      })
    })

    /**
     * @brief
     * Test para el metodo de updateByID
     * @param {Cuaitativa} cualitativa - Objeto de tipo Cualitativa
     */
    describe("updateByID", () => {
      test("Debe actualizar una respuesta cualitativa", async () => {
        const cualita = new Cualitativa({
          contenido:
            "Considero que mi desempeño fue bueno. Me gustaría que me dieran más oportunidades de participar en las etapas de negociación con el cliente",
          idPregunta: 1,
          idRetroalimentacion: 1,
        })

        await cualita.save()
        // Actualizar el contenido
        cualita.update({
          contenido:
            "Considero que mi desempeño fue bueno. Me gustaría que me dieran más oportunidades de participar en las etapas de negociación con el cliente",
        })
      })
    })
  })
})
