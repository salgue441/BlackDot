/**
 * @file pregunta.test.js
 * @brief Pruebas unitarias para la clase Pregunta
 * @author Carlos Salguero
 * @author Diego Sandoval
 * @author Olimpia Garcia
 * @author Diego Llaca
 * @author Yuna Chung
 * @author Ivan Paredes
 * @version 1.0
 * @date 2023-03-21
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Pregunta = require("../models/pregunta.model")

/**
 *
 */
describe("Pregunta", () => {
  describe("Constructor", () => {})

  /**
   * @brief
   * Prueba unitaria para el metodo getByID de la clase Pregunta
   */
  describe("getByID", () => {
    test("Returns a pregunta object", async () => {
      const pregunta = await Pregunta.getByID(1)
      expect(pregunta).toBeDefined()
      expect(pregunta).toBeInstanceOf(Pregunta)
    })

    test("Throws an error if no id is provided", async () => {
      await expect(Pregunta.getByID()).rejects.toThrow(Error)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo getAll de la clase Pregunta
   */
  describe("getAll", () => {
    test("Returns an array of pregunta objects", async () => {
      const preguntas = await Pregunta.getAll()

      expect(preguntas).toBeDefined()
      expect(Array.isArray(preguntas)).toBe(true)
      expect(preguntas[0]).toBeInstanceOf(Pregunta)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo de save de la clase Pregunta
   */
  describe("save", () => {
    test("Saves a new pregunta object to the database", async () => {
      const pregunta = new Pregunta({
        contenido:
          "¿De qué manera se puede mejorar la convivencia del equipo de trabajo?",
        tipoPregutna: "Cualitativa",
      })

      await pregunta.save()
      const preguntaDB = await Pregunta.getByID(pregunta.idPregunta)

      expect(preguntaDB).toBeDefined()
      expect(preguntaDB).toBeInstanceOf(Pregunta)
      expect(preguntaDB.contenido).toBe(
        "¿De qué manera se puede mejorar la convivencia del equipo de trabajo?"
      )
    })

    test("Throws an error when contenido is not provided", async () => {
      const pregunta = new Pregunta({
        tipoPregunta: "Cualitativa",
      })

      await expect(pregunta.save()).rejects.toThrow(Error)
    })

    test("Throws an error when tipoPregunta is not provided", async () => {
      const pregunta = new Pregunta({
        contenido:
          "¿De qué manera se puede mejorar la convivencia del equipo de trabajo?",
      })

      await expect(pregunta.save()).rejects.toThrow(Error)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo de verify de la clase Pregunta
   */
  describe("verify", () => {
    test("Throws an error when contenido is not provided", () => {
      const pregunta = new Pregunta({})
      expect(() => pregunta.verify()).toThrow(Error)
    })

    test("Throws an error when contenido is too long", () => {
      const pregunta = new Pregunta({
        contenido: "a".repeat(600),
      })

      expect(() => pregunta.verify()).toThrow(Error)
    })

    test("Throws an error when tipoPregunta is not provided", () => {
      const pregunta = new Pregunta({
        contenido:
          "¿De qué manera se puede mejorar la convivencia del equipo de trabajo?",
      })

      expect(() => pregunta.verify()).toThrow(Error)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo de deleteById de la clase Pregunta
   */
  describe("deleteById", () => {
    test("Deletes a pregunta object from the database", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Que evento te gustaria tener en la empresa?",
        tipoPregunta: "Cualitativa",
      })

      await pregunta.save()
      const deleteQuery = await Pregunta.deleteById(pregunta)

      expect(deleteQuery).toBeDefined()
      expect(deleteQuery.affectedRows).toBe(1)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo de modifyById de la clase Pregunta
   */
  describe("modifyById", () => {
    test("Modifies a pregunta object from the database", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Que evento te gustaria tener en la empresa?",
        tipoPregunta: "Cualitativa",
      })

      await pregunta.save()
      pregunta.contenido =
        "¿Que evento de comida te gustaria tener en la empresa?"
      const modifyQuery = await Pregunta.modifyById(pregunta)

      expect(modifyQuery).toBeDefined()
      expect(modifyQuery.affectedRows).toBe(1)
    })
  })
})
