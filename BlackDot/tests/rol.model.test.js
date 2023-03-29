/**
 * @file rol.model.test.js
 * @brief Test de la clase Rol
 * @author Iván Paredes
 * @date 2023-03-29
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Rol = require("../models/rol.model")

/**
 * @brief
 * Test para Rol
 */
describe("Rol", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Test para el constructor de Rol
         * @param {int} idRol - ID del rol (autogenerado)
         * @param {varchar} nombreRol - Nombre del rol
         */
        test("Debe crear una instancia de Rol", () => {
            const rol = new Rol({
                nombreRol: "Gerente",
            })
            expect(rol).toBeInstanceOf(Rol)
        })

        /**
         * @brief
         * Test para el metodo de GetByID
         * @param {int} idRol - ID del rol (autogenerado)
         */
        describe("getByID", () => {
            test("Debe devolver un rol", async () => {
                const rol = await Rol.getByID(1)
                expect(rol).toBeInstanceOf(Rol)
            })
        })

        /**
         * @brief
         * Test para el metodo de GetAll
         */
        describe("getAll", () => {
            test("Debe devolver un arreglo de roles", async () => {
                const roles = await Rol.getAll()
                expect(roles).toBeInstanceOf(Array)
                expect(roles[0]).toBeInstanceOf(Rol)
            })
        })

        /**
         * @brief
         * Test para el metodo de save
         */
        describe("save", () => {
            test("Debe guardar un rol", async () => {
                const rol = new Rol({
                    nombreRol: "Gerente"
                })

                await rol.save()
                expect(rol).toBeInstanceOf(Rol)
            })
        })

        /**
         * @brief
         * Test para el método verify
         **/
        describe("verify", () => {
            test("Debe verificar si existe un Rol", async () => {
                const rol = new Rol({
                    nombreRol: "Gerente"
                });

                await rol.save();

                await rol.verify(rol.idRol);
                expect(rol).toBeInstanceOf(Rol);
            });
        })

        /**
         * @brief
         * Test para el metodo de deleteByID
         * @param {int} idRol - ID del rol (autogenerado)
         */
        describe("deleteByID", () => {
            test("Debe eliminar un rol", async () => {
                const rol = new Rol({
                    nombreRol: "Gerente",              
                })
    
            await rol.save()
    
            await Rol.deleteByID(rol.idRol)
            expect(rol).toBeInstanceOf(Rol)
            })
        })
    })
})