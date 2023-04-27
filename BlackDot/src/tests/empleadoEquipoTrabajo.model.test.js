/**
 * @file empleadoEquipoTrabajo.model.test.js
 * @brief Test suite for empleado-equipoTrabajo model
 * @author Iván Paredes
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const empleadoEquipoTrabajo = require("../models/empleado-equipoTrabajo.model")

/**
 * @brief
 * Test suite for empleadoEquipoTrabajo model
 */
describe("empleadoEquipoTrabajo", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Unit test for empleadoEquipoTrabajo constructor
         * @param {int} idEmpleado - ID of the empleado
         * @param {int} idEquipoTrabajo - ID of the equipoTrabajo
         */
        test("Debe crear una instancia de empleadoEquipoTrabajo", () => {
            const empleadoequipotrabajo = new empleadoEquipoTrabajo({
                idEmpleado: 1,
                idEquipoTrabajo: 1,
            })
    
            expect(empleadoequipotrabajo).toBeInstanceOf(empleadoEquipoTrabajo)
        })

        /**
         * @brief
         * Unit test for empleadoEquipoTrabajo constructor
         * @param {int} idEquipoTrabajo - ID of the equipoTrabajo
         */
        describe("getByIDET", () => {
            test("Debe devolver un arreglo de empleados", async () => {
                const empleados = await empleadoEquipoTrabajo.getByIDET(1)
                expect(empleados).toBeInstanceOf(empleadoEquipoTrabajo)
            })
        })

        /**
         * @brief
         * Unit test for empleadoEquipoTrabajo constructor
         * @param {int} idEmpleado - ID of the empleado
         */
        describe("getByIDE", () => {
            test("Debe devolver un arreglo de equipoTrabajos", async () => {
                const equipoTrabajos = await empleadoEquipoTrabajo.getByIDE(1)
                expect(equipoTrabajos).toBeInstanceOf(empleadoEquipoTrabajo)
            })
        })

        /**
         * @brief
         * Prueba unitaria para el método getAll
         */
        describe("getAll", () => {
            it("Debe devolver un arreglo de empleado-EquipoTrabajos", async () => {
            const empleadoequipotrabajos = await empleadoEquipoTrabajo.getAll()

            expect(empleadoequipotrabajos).toBeInstanceOf(Array)
            })
        })
    })
})