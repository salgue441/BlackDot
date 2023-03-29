/**
 * @file empleadoRol.model.test.js
 * @brief Test suite for empleado-rol model
 * @author Iván Paredes
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const empleadoRol = require("../models/empleado-rol.model")

/**
 * @brief
 * Test suite for empleadoRol model
 */
describe("empleadoRol", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Unit test for empleadoRol constructor
         * @param {int} idEmpleado - ID of the empleado
         * @param {int} idRol - ID of the rol
         */
        test("Debe crear una instancia de empleadoRol", () => {
            const empleadorol = new empleadoRol({
                idEmpleado: 1,
                idRol: 1,
            })
    
            expect(empleadorol).toBeInstanceOf(empleadoRol)
        })

        /**
         * @brief
         * Unit test for empleadoRol constructor
         * @param {int} idRol - ID of the rol
         */
        describe("getByIDR", () => {
            test("Debe devolver un arreglo de empleados", async () => {
                const empleados = await empleadoRol.getByIDR(1)
                expect(empleados).toBeInstanceOf(empleadoRol)
            })
        })

        /**
         * @brief
         * Unit test for empleadoRol constructor
         * @param {int} idEmpleado - ID of the empleado
         */
        describe("getByIDE", () => {
            test("Debe devolver un arreglo de roles", async () => {
                const roles = await empleadoRol.getByIDE(1)
                expect(roles).toBeInstanceOf(empleadoRol)
            })
        })

        /**
         * @brief
         * Prueba unitaria para el método getAll
         */
        describe("getAll", () => {
            it("Debe devolver un arreglo de empleado-Roles", async () => {
            const empleadoroles = await empleadoRol.getAll()

            expect(empleadoroles).toBeInstanceOf(Array)
            })
        })
    })
})