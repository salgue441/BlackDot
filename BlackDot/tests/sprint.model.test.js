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

const { beforeEach, describe } = require("node:test");
const Sprint = require("../models/sprint.model");
const dataBase = require("../utils/dataBase");

describe("Sprint", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("Constructor", () => {
    /**
     *    @brief
     *  Test para el constructor de Sprint
     * @param {int} idSprint - ID del sprint (autogenerado)\
     * @param {date} fechaCreacion - Fecha de inicio del sprint
     * @param {date} fechaFinalizacion - Fecha de finalización del sprint
     *  @param {int} numero - Numero del sprint
     * @param {string} descripcion - Descripción del sprint
     * @param {int} idEpica - ID de la epica a la que pertenece el sprint
     *
     **/

    test("Debe crear un objeto de tipo Sprint", () => {
      const sprint = new Sprint({
        id: 1,
        FechaCreacion: "2021-03-21",
        FechaFinalizacion: "2021-03-28",
        numeroSprint: 1,
        idEpica: 1,
      });

      expect(sprint).toBeInstanceOf(Sprint);
    });

    /**
     * @brief
     * Test para el metodo de GetByID
     * @param {int} idSprint - ID del sprint (autogenerado)
     * **/

    describe("getByID", () => {
      test("Debe devolver unsprint", async () => {
        const sprint = await Sprint.getbyID(1);
        expect(sprint).toBeInstanceOf(Sprint);
      });
    });

    /**
     * @brief
     * Test para el metodo de GetAll
     */

    describe("getAll", () => {
      test("Debe devolver un arreglo de sprints", async () => {
        const sprints = await Sprint.getAll();
        expect(sprints).toBeInstanceOf(Array);
        expect(sprints[0]).toBeInstanceOf(Sprint);
      });
    });

    /**
     * @brief
     * Test para el metodo getSprintActual
     ***/

    describe("getSprintActual", () => {
      test("Debe devolver el sprint actual", async () => {
        const sprint = await Sprint.getSprintActual();
        expect(sprint).toBeInstanceOf(Sprint);
      });
    });
  });
});
