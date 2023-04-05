/**
 * @file issue.model.test.js
 * @brief Pruebas unitarias para la clase Issue
 * @author Diego Llaca
 * @fixed Carlos Salguero
 * @version 1.0
 * @date 2023-03-28
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Issue = require("../models/issue.model")
const dataBase = require("../utils/dataBase")

describe("issue", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  /**
   * @brief
   * Tests the constructor
   * @test {Issue#constructor}
   */
  describe("Constructor", () => {
    it("should create an issue", () => {
      const issue = new Issue({
        idIssue: 1,
        nombreIssue: "Issue 1",
        storyPoints: 1,
        prioridadIssue: "Alta",
        estadoIssue: "Done",
        fechaCreacion: "2021-03-28",
        fechaFinalizacion: "2021-03-28",
      })

      expect(issue).toEqual({
        idIssue: 1,
        nombreIssue: "Issue 1",
        storyPoints: 1,
        prioridadIssue: "Alta",
        estadoIssue: "Done",
        fechaCreacion: "2021-03-28",
        fechaFinalizacion: "2021-03-28",
      })
    })
  })

  /**
   * @brief
   * Tests the getByID method
   * @test {Issue#getByID}
   * @throws {Error} - Returns an error if the ID is not provided
   * @throws {Error} - Returns an error if the ID is not a number
   * @throws {Error} - Returns an error if the ID is not an integer
   * @throws {Error} - Returns an error if the issue doesn't exist
   * @return {Object} - Returns an issue
   */
  describe("getByID", () => {
    it("Should return an error if the ID is not provided", async () => {
      await expect(Issue.getByID()).rejects.toThrow(
        "No se ha proporcionado un ID"
      )
    })

    it("Should return an error if the ID is not a number", async () => {
      await expect(Issue.getByID("1")).rejects.toThrow("El ID no es un número")
    })

    it("Should return an error if the ID is not an integer", async () => {
      await expect(Issue.getByID(1.5)).rejects.toThrow(
        "El ID no es un número entero"
      )
    })

    it("Should return an error if the issue doesn't exist", async () => {
      await expect(Issue.getByID(10000)).rejects.toThrow("No existe el issue")
    })

    it("Should return an issue", async () => {
      const issue = await Issue.getByID(1)

      expect(issue).toEqual({
        idIssue: 1,
        nombreIssue: "Arreglar error en el sistema de pagos",
        storyPoints: 5,
        prioridadIssue: "Alta",
        estadoIssue: "To Do",
        fechaCreacion: new Date("2021-04-01T15:00:00.000Z"),
        fechaFinalizacion: new Date("2021-04-03T23:00:00.000Z"),
      })
    })
  })

  /**
   * @brief
   * Tests the getAll method
   * @test {Issue#getAll}
   * @return {Object} - Returns all issues
   */
  describe("getAll", () => {
    it("Should return all issues", async () => {
      const issues = await Issue.getAll()

      expect(Array.isArray(issues)).toBe(true)
    })
  })

  /**
   * @brief
   * Tests the verify method
   */
  describe("verify", () => {
    it("Should return an error if the nombreIssue is not provided", async () => {
      await expect(
        Issue.verify({
          storyPoints: 5,
          prioridadIssue: "Alta",
          estadoIssue: "To Do",
          fechaCreacion: "2021-04-01",
          fechaFinalizacion: "2021-04-03",
        })
      ).rejects.toThrow("No se ha proporcionado el nombre del issue")
    })

    it("Should return an error if nombreIssues is not a string", async () => {
      await expect(
        Issue.verify({
          nombreIssue: 1,
          storyPoints: 5,
          prioridadIssue: "Alta",
          estadoIssue: "To Do",
          fechaCreacion: "2021-04-01",
          fechaFinalizacion: "2021-04-03",
        })
      ).rejects.toThrow("El nombre del issue no es un string")
    })

    it("Should return an error if the nombreIssue is too long", async () => {
      await expect(
        Issue.verify({
          nombreIssue: "a".repeat(151),
          storyPoints: 5,
          prioridadIssue: "Alta",
          labelIssue: "[Front]",
          estadoIssue: "To Do",
          fechaCreacion: "2021-04-01",
          fechaFinalizacion: "2021-04-03",
        })
      ).rejects.toThrow("El nombre es demasiado largo")
    })

    it("Should return an error if the labelIssue is not provided", async () => {
      await expect(
        Issue.verify({
          nombreIssue: "Issue 1",
          storyPoints: 5,
          prioridadIssue: "Alta",
          estadoIssue: "To Do",
          fechaCreacion: "2021-04-01",
          fechaFinalizacion: "2021-04-03",
        })
      ).rejects.toThrow("No se ha proporcionado un label de issue")
    })

    it("Should return an error if labelIssue is not a string", async () => {
      await expect(
        Issue.verify({
          nombreIssue: "Issue 1",
          storyPoints: 5,
          prioridadIssue: "Alta",
          labelIssue: 1,
          estadoIssue: "To Do",
          fechaCreacion: "2021-04-01",
          fechaFinalizacion: "2021-04-03",
        })
      ).rejects.toThrow("El label del issue no es un string")
    })

    it("Should return an error if the labelIssue is too long", async () => {
      await expect(
        Issue.verify({
          nombreIssue: "Issue 1",
          storyPoints: 5,
          prioridadIssue: "Alta",
          labelIssue: "a".repeat(51),
          estadoIssue: "To Do",
          fechaCreacion: "2021-04-01",
          fechaFinalizacion: "2021-04-03",
        })
      ).rejects.toThrow("El label es demasiado largo")
    })

    it("Should return true if the issue is valid", async () => {
      const result = await Issue.getByID(1)

      expect(result).toBeTruthy()
    })
  })

  /**
   * @brief
   * Tests the save method
   * @test {Issue#save}
   */
  describe("save", () => {
    it("Should throw an error if the issue cannot be saved", async () => {
      // Mock the database to throw an error
      const mockDatabase = {
        query: jest.fn().mockImplementation(() => {
          throw new Error("Column 'storyPoints' cannot be null")
        }),
      }

      // Create an issue object with invalid data
      const invalidIssue = new Issue({
        nombreIssue: "",
        storyPoints: null,
        prioridadIssue: "",
        estadoIssue: "",
        fechaCreacion: "",
        fechaFinalizacion: "",
      })

      invalidIssue.database = mockDatabase

      // Expect the save method to throw an error
      await expect(invalidIssue.save()).rejects.toThrow(
        "Error al guardar el issue: Column 'storyPoints' cannot be null"
      )
    })

    it("Should return this if the issue is saved", async () => {
      const issue = new Issue({
        nombreIssue: "Issue 1",
        storyPoints: 1,
        prioridadIssue: "Alta",
        estadoIssue: "Done",
        fechaCreacion: "2021-03-28",
        fechaFinalizacion: "2021-03-28",
      })

      await expect(issue.save()).resolves.toEqual(issue)
    })
  })
})
