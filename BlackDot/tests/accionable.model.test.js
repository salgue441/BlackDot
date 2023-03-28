/**
 * @file accionable.model.test.js
 * @brief Test de la clase Accionable
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.21
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const Accionable = require("../models/accionable.model")

/**
 * @brief
 * Test para Accionable
 */
describe("Accionable", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe("Constructor", () => {
    /**
     * @brief
     * Test para el constructor de Accionable
     * @param {int} idAccionable - ID del accionable (autogenerado)
     * @param {string} nombreAccionable - Nombre del accionable
     * @param {int} storyPoints - Story points del accionable
     * @param {string} labelAccionable - Label del accionable
     * @param {string} prioridadAccionable - Prioridad del accionable
     * @param {string} estadoAccionable - Estado del accionable
     * @param {string} estadoIssue - Estado del issue
     * @param {string:Date} fechaCreacion - Fecha de creación del accionable
     * @param {string:Date} fechaFinalizacion - Fecha de finalización del accionable
     */
    test("Debe crear una instancia de Accionable", () => {
      const accionable = new Accionable({
        nombreAccionable: "Martes de Tacos",
        storyPoints: 5,
        labelAccionable: "[Comunidad]",
        prioridadAccionable: "Alta",
        estadoAccionable: "Aprobado",
        estadoIssue: "To Do",
        fechaCreacion: "2023-03-27 14:24:00",
        fechaFinalizacion: "2023-04-13 14:24:00",
      })

      expect(accionable).toBeInstanceOf(Accionable)
    })
  })

  describe("getById", () => {
    /**
     * @brief
     * Test para el método getById de Accionable
     * @param {int} idAccionable - ID del accionable (autogenerado)
     */
    test("Debe obtener un accionable por su ID", async () => {
      const accionable = await Accionable.getbyId(1)
      expect(accionable).toBeInstanceOf(Accionable)
    })
  })

  describe("getAll", () => {
    /**
     * @brief
     * Test para el método getAll de Accionable
     */
    test("Debe obtener todos los accionables", async () => {
      const accionables = await Accionable.getAll()
      expect(accionables).toBeInstanceOf(Array)
    })
  })

  describe("save", () => {
    /**
     * @brief
     * Test para el método save de Accionable
     */
    test("Debe guardar un accionable", async () => {
      const accionable = new Accionable({
        nombreAccionable: "Jueves de Boliche",
        storyPoints: 5,
        labelAccionable: "[Comunidad]",
        prioridadAccionable: "Alta",
        estadoAccionable: "Aprobado",
        estadoIssue: "To Do",
        fechaCreacion: "2023-03-27 14:24:00",
        fechaFinalizacion: "2023-04-13 14:24:00",
      })

      await accionable.save()
      expect(accionable.idAccionable).toBeGreaterThan(0)
    })
  })
})
