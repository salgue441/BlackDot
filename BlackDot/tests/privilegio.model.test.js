/**
 * @file privilegio.model.test.js
 * @brief Test de la clase Privilegio
 * @author Iván Paredes
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Privilegio = require("../models/privilegio.model")

/**
 * @brief
 * Test para Privilegio
 */
describe("Privilegio", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Test para el constructor de Privilegio
         * @param {int} idPrivilegio - ID del privilegio (autogenerado)
         * @param {varchar} nombrePrivilegio - Nombre del privilegio
         * @param {varchar} descripcionPrivilegio - Descripción del privilegio
         */
        test("Debe crear una instancia de Privilegio", () => {
            const privi = new Privilegio({
                nombrePrivilegio: "Registrar trabajadores",
                descripcionPrivilegio: "Registrar nuevos trabajadores en el sistema"
            })
            expect(privi).toBeInstanceOf(Privilegio)
        })

        /**
         * @brief
         * Test para el metodo de GetByID
         * @param {int} idPrivilegio - ID del privilegio (autogenerado)
         */
        describe("getByID", () => {
            test("Debe devolver un privilegio", async () => {
                const privi = await Privilegio.getByID(1)
                expect(privi).toBeInstanceOf(Privilegio)
            })
        })

        /**
         * @brief
         * Test para el metodo de GetAll
         */
        describe("getAll", () => {
            test("Debe devolver un arreglo de privilegios", async () => {
                const privis = await Privilegio.getAll()
                expect(privis).toBeInstanceOf(Array)
                expect(privis[0]).toBeInstanceOf(Privilegio)
            })
        })

        /**
         * @brief
         * Test para el metodo de save
         */
        describe("save", () => {
            test("Debe guardar un privilegio", async () => {
                const privi = new Privilegio({
                    nombrePrivilegio: "Registrar trabajadores",
                    descripcionPrivilegio: "Registrar nuevos trabajadores en el sistema"
                })

                await privi.save()
                expect(privi).toBeInstanceOf(Privilegio)
            })
        })

        /**
         * @brief
         * Test para el método verify
         **/
        describe("verify", () => {
            test("Debe verificar si existe un Privilegio", async () => {
                const privi = new Privilegio({
                    nombrePrivilegio: "Registrar trabajadores",
                    descripcionPrivilegio: "Registrar nuevos trabajadores en el sistema"
                });

                await privi.save();

                await privi.verify(privi.idPrivilegio);
                expect(privi).toBeInstanceOf(Privilegio);
            });
        })

        /**
         * @brief
         * Prueba unitaria para el metodo deleteByID
         */
        describe("deleteByID", () => {
            test("Devuelve error si no se proporciona el ID", async () => {
            const privilegio = new Privilegio({});

            await expect(privilegio.deleteByID()).rejects.toThrow("No se envio el ID");
            });

            test("Devuelve error si el ID no es un numero", async () => {
            const privilegio = new Privilegio({});

            await expect(privilegio.deleteByID("abcdef")).rejects.toThrow(
                "El ID debe ser un numero"
            );
            });

            test("Elimina un registro de la base de datos", async () => {
            // Por terminar
            });
        });
    })
})