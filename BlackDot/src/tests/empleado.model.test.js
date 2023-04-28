/**
 * @file empleado.model.test.js
 * @brief Test de la clase Empleado
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.28
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const Empleado = require("../Models/empleado.model")

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
     * @param {varchar} googleEmail - E-mail of Google
     * @param {varchar} googleProfilePicture - Profile picture of Google
     **/

    test("Debe crear una instancia de Empleado", () => {
      const bin = 0xdba6a8c07b84449894cc524f047b42e2

      const empleado = new Empleado({
        primerNombre: "Diego",
        segundoNombre: "Ernesto",
        apellidoPaterno: "Sandoval",
        apellidoMaterno: "Vargas",
        idGoogleAuth: bin.toString(2),
        googleEmail: "ABC1234@zeb.mx",
        googleProfilePicture:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      })

      expect(empleado).toBeInstanceOf(Empleado)
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
        const nuevoEmpleado = new Empleado({
          primerNombre: "Carlos",
          segundoNombre: "Rodrigo",
          apellidoPaterno: "Salguero",
          apellidoMaterno: "Alcántara",
          idGoogleAuth: 0xdba6a8c07b84449894cc524f047b42e1,
          googleEmail: "carlos.salguero@zeb.mx",
          googleProfilePicture:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        })

        await nuevoEmpleado.save()
        expect(nuevoEmpleado).toBeInstanceOf(Empleado)
      })
    })

    describe("verify", () => {
      /**
       * @brief
       * Test for the verify method of Empleado
       **/

      test("Debe verificar si existe un Empleado", async () => {
        const nuevoEmpleado = new Empleado({
          primerNombre: "Carlos",
          segundoNombre: "Rodrigo",
          apellidoPaterno: "Salguero",
          apellidoMaterno: "Alcántara",
          idGoogleAuth: 0xdba6a8c07b84449894cc524f047b42e1,
          googleEmail: "DEF5678@zeb.mx",
          googleProfilePicture:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        })

        await nuevoEmpleado.save()
        await nuevoEmpleado.verify(nuevoEmpleado)

        expect(nuevoEmpleado).toBeInstanceOf(Empleado)
      })
    })

    describe("deleteByID", () => {
      /**
       * @brief
       * Test for the deleteByID method of Empleado
       * @param {int} idEmpleado - ID of Empleao
       **/

      test("Debe eliminar un Empleado", async () => {
        const empleado = new Empleado({
          primerNombre: "Carlos",
          segundoNombre: "Rodrigo",
          apellidoPaterno: "Salguero",
          apellidoMaterno: "Alcántara",
          idGoogleAuth: 0xdba6a8c07b84449894cc524f047b42e1,
          googleEmail: "DEF5678@zeb.mx",
          googleProfilePicture:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        })

        await empleado.save()
        await empleado.deleteByID(empleado.idEmpleado)

        expect(empleado).toBeInstanceOf(Empleado)
      })
    })
  })
})
