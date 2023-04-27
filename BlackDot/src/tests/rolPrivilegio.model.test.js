/**
 * @file rolPrivilegio.model.test.js
 * @brief Test suite for rol-privilegio model
 * @author Iván Paredes
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const rolPrivilegio = require("../models/rol-privilegio.model")

/**
 * @brief
 * Test suite for rolPrivilegio model
 */
describe("rolPrivilegio", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Unit test for rolPrivilegio constructor
         * @param {int} idRol - ID of the rol
         * @param {int} idPrivilegio - ID of the privilegio
         */
        test("Debe crear una instancia de rolPrivilegio", () => {
            const rolprivilegio = new rolPrivilegio({
                idRol: 1,
                idPrivilegio: 1,
            })
    
            expect(rolprivilegio).toBeInstanceOf(rolPrivilegio)
        })

        /**
         * @brief
         * Unit test for rolPrivilegio constructor
         * @param {int} idPrivilegio - ID of the privilegio
         */
        describe("getByIDP", () => {
            test("Debe devolver un arreglo de roles", async () => {
                const roles = await rolPrivilegio.getByIDP(1)
                expect(roles).toBeInstanceOf(rolPrivilegio)
            })
        })

        /**
         * @brief
         * Unit test for rolPrivilegio constructor
         * @param {int} idRol - ID of the rol
         */
        describe("getByIDR", () => {
            test("Debe devolver un arreglo de privilegios", async () => {
                const privilegios = await rolPrivilegio.getByIDR(1)
                expect(privilegios).toBeInstanceOf(rolPrivilegio)
            })
        })

        /**
         * @brief
         * Prueba unitaria para el método getAll
         */
        describe("getAll", () => {
            it("Debe devolver un arreglo de rol-Privilegios", async () => {
            const rolprivilegios = await rolPrivilegio.getAll()

            expect(rolprivilegios).toBeInstanceOf(Array)
            })
        })
    })
})