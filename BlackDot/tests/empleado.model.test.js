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
 * Test para Empleado
 **/

describe("Empleado", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Test para el constructor del Empleado
         * @param {int} idEmpleado - Identificador del empleado
         * @param {varchar} primerNombre - Contenido del primer nombre
         * @param {varchar} segundoNombre - Contenido del segundo nombre
         * @param {varchar} apellidoPaterno - Contenido del apellido paterno
         * @param {varchar} apellidoMaterno - Contenido del apellido materno
         * @param {binary} idGoogleAuth - Identificador de la autenticación de Google
         * @param {varchar} googleEmail - Correo electrónico de Google
         * @param {int} idRol - Identificador de Rol
         * @param {int} idEquipoTrabajo - Identificdor del Equipo de Trabajo
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
         * Test para el método getByID del Empleado
         * @param {int} idEmpleado - ID del Empleado
         **/

        test("Debe obtener un Empleado por su ID", async () => {
            const empleado = await Empleado.getByID(1)
            expect(empleado).toBeInstanceOf(Empleado)
        })
    })

    describe("getAll", () => {
        /**
         * @brief
         * Test para el método getAll del Empleado
         **/

        test("Debe obtener todos los Empleados", async () => {
            const empleados = await Empleado.getAll()
            expect(empleados).toBeInstanceOf(Array)
        })
    })

    describe("save", () => {
        /**
         * @brief
         * Test para el método save del Empleado
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
})