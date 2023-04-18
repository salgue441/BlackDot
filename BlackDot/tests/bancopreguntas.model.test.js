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

const { before, beforeEach } = require("node:test")
const BancoPreguntas = require("../Models/bancopreguntas.model")
const dataBase = require("../Utils/database")

describe("BancoPreguntas", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  /**
   * @brief
   * Prueba para el metodo getByID
   * @param {int} idPreguntaBanco
   */

  describe("getByID", () => {
    test("Debe retornar una pregunta", async () => {
      const pregunta = await BancoPreguntas.getByID(1)
      expect(pregunta).toBeInstanceOf(BancoPreguntas)
    })

    it("Debe devolver un error si no se proporciona un ID", async () => {
      await expect(BancoPreguntas.getByID()).rejects.toThrow()
    })
  })

  /**
   * @brief
   * Prueba unitaria para el método getAll
   */

  describe("getAll", () => {
    test("Debe retornar un arreglo de preguntas", async () => {
      const preguntas = await BancoPreguntas.getAll()
      expect(Array.isArray(preguntas)).toBe(true)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el método save
   */

  describe("save", () => {
    test("Debe devolver un error si no se proporciona un contenido", async () => {
      const pregunta = new BancoPreguntas({ tipoPregunta: "Cualitativa" })
      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      )
    })

    test("Debe devolver un error si el contenido esta vacio", async () => {
      const pregunta = new BancoPreguntas({
        contenido: "",
        tipoPregunta: "Cualitativa",
      })
      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      )
    })

    test("Debe devolver un error si no se proporciona un tipo de Pregunta", async () => {
      const pregunta = new BancoPreguntas({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
      })
      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado el tipo de Pregunta"
      )
    })

    test("Debe guardar la pregunta en la base de datos", async () => {
      const pregunta = new BancoPreguntas({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
        tipoPregunta: "Cualitativa",
      })

      const savedPregunta = await pregunta.save()

      expect(savedPregunta.idPreguntaBanco).not.toBeNull()
      expect(savedPregunta.contenido).toBe(pregunta.contenido)
      expect(savedPregunta.tipoPregunta).toBe(pregunta.tipoPregunta)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo verify
   */

  describe("verify", () => {
    test("Debe devolver un error si no se proporciona un contenido", async () => {
      const pregunta = new BancoPreguntas({ tipoPregunta: "Cualitativa" })
      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      )
    })

    test("Debe devolver un error si el contenido esta vacio", async () => {
      const pregunta = new BancoPreguntas({
        contenido: "",
        tipoPregunta: "Cualitativa",
      })
      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      )
    })

    test("Debe devolver un error si no se proporciona el tipo de Pregunta", async () => {
      const pregunta = new BancoPreguntas({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
      })
      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado el tipo de Pregunta"
      )
    })

    test("Debe devolver true si la pregunta es valida", async () => {
      const pregunta = new BancoPreguntas({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
        tipoPregunta: "Cualitativa",
      })

      const result = await pregunta.verify()
      expect(result).toBe(true)
    })
  })

  /**
   * @brief
   * Prueba unitaria para el metodo deleteByID
   */

  describe("deleteByID", () => {
    test("Debe devolver un error si no se proporciona un ID", async () => {
      await expect(BancoPreguntas.deleteByID()).rejects.toThrow()
    })

    test("Debe devolver un error si el ID no es un numero", async () => {
      await expect(BancoPreguntas.deleteByID("1")).rejects.toThrow()
    })

    test("Debe devolver un error si el ID no es un numero entero", async () => {
      await expect(BancoPreguntas.deleteByID(1.5)).rejects.toThrow()
    })
  })
})
