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
                idEquipoTrabajo: 22
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
                const equiTraba = new EquipoTrabajo({
                    idEquipoTrabajo: 23
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
                const equipotrabajo = new EquipoTrabajo({
                    idEquipoTrabajo: 11,
                });

                await equipotrabajo.save();

                await equipotrabajo.verify(equipotrabajo.idEquipoTrabajo);
                expect(equipotrabajo).toBeInstanceOf(EquipoTrabajo);
            });
        })

        /**
         * @brief
         * Prueba unitaria para el metodo deleteByID
         */
        describe("deleteByID", () => {
            test("Devuelve error si no se proporciona el ID", async () => {
            const equipotrabajo = new EquipoTrabajo({});

            await expect(equipotrabajo.deleteByID()).rejects.toThrow("No se envio el ID");
            });

            test("Devuelve error si el ID no es un numero", async () => {
            const equipotrabajo = new EquipoTrabajo({});

            await expect(equipotrabajo.deleteByID("abcdef")).rejects.toThrow(
                "El ID debe ser un numero"
            );
            });
        });
    })
})