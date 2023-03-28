/**
 * @file sprintEpica.model.test.js
 * @brief Pruebas unitarias para la clase sprintEpica
 * @author Olimpia Garcia
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

// const Epica = require("../models/Epica.model")
// const { getByIDS } = require("./Sprint.model") 
// const { getByIDE } = require("./Sprint.model") 
const sprintEpica = require("../models/sprintEpica.model")

 
/**
 *
 */
describe("sprintEpica", () => {
beforeEach(() => {
    jest.resetModules()
})


/**
 * @brief
 * Prueba unitaria para el método getByIDE
 * @param {int} idEpica - ID de la Epica
 */
describe("getByIDE", () => {
    test("Debe devolver una epica", async () => {
    const epica = await sprintEpica.getByIDE(1)

    expect(epica).toBeInstanceOf(sprintEpica)
    })
})

/**
 * @brief
 * Prueba unitaria para el método getByIDS
 * @param {int} idSprint - ID de la Sprint
 */
 describe("getByIDS", () => {
    test("Debe devolver un sprint", async () => {
    const sprint = await sprintEpica.getByIDS(1)

    expect(sprint).toBeInstanceOf(sprintEpica)
    })
})

  /**
   * @brief
   * Prueba unitaria para el método getAll
   */
   describe("getAll", () => {
    it("Debe devolver un arreglo de sprint-Epicas", async () => {
      const sprintepicas = await sprintEpica.getAll()

      expect(sprintepicas).toBeInstanceOf(Array)
    })
  })
})