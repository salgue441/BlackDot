/**
 * @file sprintIssue.test.js
 * @brief Pruebas unitarias para la clase SprintIssue
 * @author Diego Llaca
 * @version 1.0
 * @date 2023-03-29
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const SprintIssue = require("../models/sprint-issue.model");
const dataBase = require("../utils/dataBase");

/**
 *
 */
describe("sprint-issue", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe("Constructor", () => {});

    /**
    * @brief
    * Prueba unitaria para el método getByIDI
    * @param {int} idIssue - ID del issue
    */
    describe("getByIDI", () => {
        it("Debe devolver un issue", async () => {
            const issue = await SprintIssue.getByIDI(1);

            expect(issue).toBeInstanceOf(SprintIssue);
        });

        it("Debe devolver un error si no se proporciona un ID", async () => {
            await expect(SprintIssue.getByIDI()).rejects.toThrow();
        });
    });

    /**
    * @brief
    * Prueba unitaria para el método getByIDS
    * @param {int} idSprint - ID del sprint
    */
    describe("getByIDS", () => {
        it("Debe devolver un sprint", async () => {
            const sprint = await SprintIssue.getByIDS(1);

            expect(sprint).toBeInstanceOf(SprintIssue);
        });

        it("Debe devolver un error si no se proporciona un ID", async () => {
            await expect(SprintIssue.getByIDI()).rejects.toThrow();
        });
    });

    /**
    * @brief
    * Prueba unitaria para el método getAll
    */
    describe("getAll", () => {
        it("Debe devolver un arreglo de sprintissues", async () => {
            const sprintissues = await SprintIssue.getAll();

            expect(Array.isArray(sprintissues)).toBe(true);
        });
    });
});
