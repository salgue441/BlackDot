/**
 * @file empleado.model.test.js
 * @brief Test de la clase Empleado
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.28
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

const Empleado = require("../Models/empleado.model");

/**
 * @brief
 * Test for Empleado
 **/

describe("Empleado", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Test for the constructor of Empleado
         * @param {int} idEmpleado - Identifier of Empleado
         * @param {varchar} primerNombre - Content of first name
         * @param {varchar} segundoNombre - Content of second name
         * @param {varchar} apellidoPaterno - Content of father's last name
         * @param {varchar} apellidoMaterno - Content of mother's last name
         * @param {binary} idGoogleAuth - Identificador de la autenticación de Google
         * @param {varchar} googleEmail - e-mail of Google
         * @param {int} idRol - Identifier of Rol
         * @param {int} idEquipoTrabajo - Identifier of Equipo de Trabajo
         **/

        test("Debe crear una instancia de Empleado", () => {
            const empleado = new Empleado({
                primerNombre: "Diego",
                segundoNombre: "Ernesto",
                apellidoMaterno: "Sandoval",
                apellidoMaterno: "Vargas",
                googleEmail: "ABC1234@zeb.mx",
                idRol: 1,
                idEquipoTrabajo: 1,
            })

            expect(empleado).toBeInstanceOf(Empleado)
        })
    })

    describe("getByID", () => {
        /**
         * @brief
         * Test for the getByID method of Empleado
         * @param {int} idEmpleado - ID of Empleado
         **/

        test("Debe obtener un Empleado por su ID", async () => {
            const empleado = await Empleado.getByID(1)
            expect(empleado).toBeInstanceOf(Empleado)
        })
    })

    describe("getAll", () => {
        /**
         * @brief
         * Test for the getAll method of Empleado
         **/

        test("Debe obtener todos los Empleados", async () => {
            const empleados = await Empleado.getAll()
            expect(empleados).toBeInstanceOf(Array)
        })
    })

    describe("save", () => {
        /**
         * @brief
         * Test for the save method of Empleado
         **/

        test("Debe guardar un Empleado", async () => {
            const empleado = new Empleado({
                primerNombre: "Carlos",
                segundoNombre: "Rodrigo",
                apellidoMaterno: "Salguero",
                apellidoMaterno: "Alcántara",
                googleEmail: "DEF5678@zeb.mx",
                idRol: 2,
                idEquipoTrabajo: 1,
            })

            await empleado.save()
            expect(empleado.idEmpleado).toBeGreaterThan(0)
        })
    })

    describe("verify", () => {
        /**
         * @brief
         * Test for the verify method of Empleado
         **/

        test("Debe verificar si existe un Empleado", async () => {
            const empleado = new Empleado({
                primerNombre: "Carlos",
                segundoNombre: "Rodrigo",
                apellidoMaterno: "Salguero",
                apellidoMaterno: "Alcántara",
                googleEmail: "DEF5678@zeb.mx",
                idRol: 2,
                idEquipoTrabajo: 1,
            });

            await empleado.verify();
            expect(empleado.idEmpleado).toBe(true);
        });
    })

    describe("delete", () => {
        /**
         * @brief
         * Test for the delete method of Empleado
         **/

        test("Debe boarrar un Empleado", async () => {
            const empleado = new Empleado({
                primerNombre: "Carlos",
                segundoNombre: "Rodrigo",
                apellidoMaterno: "Salguero",
                apellidoMaterno: "Alcántara",
                googleEmail: "DEF5678@zeb.mx",
                idRol: 2,
                idEquipoTrabajo: 1,
            })

            await empleado.save()

            await Empleado.deleteByID(empleado.idEmpleado)
            expect(empleado.idEmpleado).toBeGreaterThan(0)
        })
    })
})