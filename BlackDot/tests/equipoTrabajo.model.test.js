/**
 * @file equipoTrabajo.model.test.js
 * @brief Test de la clase EquipoTrabajo
 * @author Iván Paredes
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const EquipoTrabajo = require("../models/equipoTrabajo.model")

/**
 * @brief
 * Test para EquipoTrabajo
 */
describe("EquipoTrabajo", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Test para el constructor de EquipoTrabajo
         * @param {int} idEquipoTrabajo - ID del equipoTrabajo
         */
        test("Debe crear una instancia de EquipoTrabajo", () => {
            const equiTraba = new EquipoTrabajo({
                idEquipoTrabajo: 111
            })
            expect(equiTraba).toBeInstanceOf(EquipoTrabajo)
        })

        /**
         * @brief
         * Test para el metodo de GetByID
         * @param {int} idEquipoTrabajo - ID del equipoTrabajo
         */
        describe("getByID", () => {
            test("Debe devolver un equipoTrabajo", async () => {
                const equiTraba = await EquipoTrabajo.getByID(1)
                expect(equiTraba).toBeInstanceOf(EquipoTrabajo)
            })
        })

        /**
         * @brief
         * Test para el metodo de GetAll
         */
        describe("getAll", () => {
            test("Debe devolver un arreglo de equipoTrabajos", async () => {
                const equiTrabas = await EquipoTrabajo.getAll()
                expect(equiTrabas).toBeInstanceOf(Array)
                expect(equiTrabas[0]).toBeInstanceOf(EquipoTrabajo)
            })
        })

        /**
         * @brief
         * Test para el metodo de save
         */
        describe("save", () => {
            test("Debe guardar un equipoTrabajo", async () => {
                const privi = new EquipoTrabajo({
                    idEquipoTrabajo: 111
                })

                await equiTraba.save()
                expect(equiTraba).toBeInstanceOf(EquipoTrabajo)
            })
        })

        /**
         * @brief
         * Test para el método verify
         **/
        describe("verify", () => {
            test("Debe verificar si existe un EquipoTrabajo", async () => {
                const equiTraba = new EquipoTrabajo({
                    idEquipoTrabajo: 111
                });

                await equiTraba.save();

                await equiTraba.verify(equiTraba.idEquipoTrabajo);
                expect(equiTraba).toBeInstanceOf(EquipoTrabajo);
            });
        })

        /**
         * @brief
         * Test para el metodo de deleteByID
         * @param {int} idEquipoTrabajo - ID del equipoTrabajo
         */
        describe("deleteByID", () => {
            test("Debe eliminar un equipoTrabajo", async () => {
                const privi = new EquipoTrabajo({
                    idEquipoTrabajo: 111                
            })
    
            await equiTraba.save()
    
            await EquipoTrabajo.deleteByID(equiTraba.idEquipoTrabajo)
            expect(equiTraba).toBeInstanceOf(EquipoTrabajo)
            })
        })
    })
})