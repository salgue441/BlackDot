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

const Pregunta = require("../models/pregunta.model");
const dataBase = require("../utils/dataBase");

/**
 *
 */
describe("Pregunta", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("Constructor", () => {});

  /**
   * @brief
   * Prueba unitaria para el método getByID
   * @param {int} idPregunta - ID de la pregunta
   */
  describe("getByID", () => {
    it("Debe devolver una pregunta", async () => {
      const pregunta = await Pregunta.getByID(1);

      expect(pregunta).toBeInstanceOf(Pregunta);
    });

    it("Debe devolver un error si no se proporciona un ID", async () => {
      await expect(Pregunta.getByID()).rejects.toThrow();
    });
  });

  /**
   * @brief
   * Prueba unitaria para el método getAll
   */
  describe("getAll", () => {
    it("Debe devolver un arreglo de preguntas", async () => {
      const preguntas = await Pregunta.getAll();

      expect(Array.isArray(preguntas)).toBe(true);
    });
  });

  /**
   * @brief
   * Prueba unitaria para el método save
   */
  describe("save", () => {
    test("Debe devolver un error si no se proporciona un contenido", async () => {
      const pregunta = new Pregunta({
        contenido: null,
        tipoPregunta: "Cualitativa",
      });

      await expect(pregunta.save()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      );
    });

    test("Debe devolver un error si el contenido esta vacio", async () => {
      const pregunta = new Pregunta({
        contenido: "",
        tipoPregunta: "Cuantitativa",
      });

      await expect(pregunta.save()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      );
    });

    test("Debe devolver un error si no se proporciona el tipo de Pregunta", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
      });

      await expect(pregunta.save()).rejects.toThrow(
        "No se ha proporcionado el tipo de Pregunta"
      );
    });

    test("Debe guardar la pregunta en la base de datos", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
        tipoPregunta: "Cualitativa",
      });

      const savedPregunta = await pregunta.save();

      expect(savedPregunta.idPregunta).not.toBeNull();
      expect(savedPregunta.contenido).toBe(pregunta.contenido);
      expect(savedPregunta.tipoPregunta).toBe(pregunta.tipoPregunta);
    });

    test("Debe devolver un error si la pregunta no pudo ser almacenada en la base de datos", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
        tipoPregunta: "Cualitativa",
      });

      const errorMessage = "La pregunta no se pudo guardar";
      const mockQuery = jest.fn(() => Promise.reject(new Error(errorMessage)));
      dataBase.query = mockQuery;

      await expect(pregunta.save()).rejects.toThrow(errorMessage);
    });
  });

  /**
   * @brief
   * Prueba unitaria para el metodo verify
   */
  describe("verify", () => {
    test("Debe devolver un error si no se proporciona un contenido", async () => {
      const pregunta = new Pregunta({ tipoPregunta: "Cualitativa" });

      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado un contenido"
      );
    });

    test("Debe devolver un error si el contenido es muy largo", async () => {
      const pregunta = new Pregunta({
        contenido: "a".repeat(500),
        tipoPregunta: "Cuantitativa",
      });

      await expect(pregunta.verify()).rejects.toThrow(
        "El contenido es muy largo"
      );
    });

    test("Debe devolver un error si no se proporciona un tipo", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
      });

      await expect(pregunta.verify()).rejects.toThrow(
        "No se ha proporcionado un tipo de pregunta"
      );
    });

    test("Debe verificar si la pregunta existe en la base de datos", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
        tipoPregunta: "Cualitativa",
      });

      const mockQuery = jest.fn(() => Promise.resolve([{ id: 1 }]));
      dataBase.query = mockQuery;

      const result = await pregunta.verify();
      expect(result).toBe(true);
    });

    test("Debe devolver false si la pregunta existe en la base de datos", async () => {
      const pregunta = new Pregunta({
        contenido: "¿Cómo podemos mejorar el ambiente laboral?",
        tipoPregunta: "Cualitativa",
      });

      const mockQuery = jest.fn(() => Promise.resolve([{ id: -1 }]));
      dataBase.query = mockQuery;

      const result = await pregunta.verify();
      expect(result).toBe(true);
    });
  });

  /**
   * @brief
   * Prueba unitaria para el metodo deleteByID
   */
  describe("deleteByID", () => {
    test("Devuelve error si no se proporciona el ID", async () => {
      const pregunta = new Pregunta({});

      await expect(pregunta.deleteByID()).rejects.toThrow("No se envio el ID");
    });

    test("Devuelve error si el ID no es un numero", async () => {
      const pregunta = new Pregunta({});

      await expect(pregunta.deleteByID("abcdef")).rejects.toThrow(
        "El ID debe ser un numero"
      );
    });

    test("Elimina un registro de la base de datos", async () => {
      // Por terminar
    });
  });
});
