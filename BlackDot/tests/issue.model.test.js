/**
 * @file issue.model.test.js
 * @brief Pruebas unitarias para la clase Issue
 * @author Diego Llaca
 * @version 1.0
 * @date 2023-03-28
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const Issue = require("../models/issue.model");

describe("issue", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe("Constructor", () => {});

    /**
    * @brief
    * Prueba unitaria para el método getByID
    * @param {int} idIssue - ID del issue
    */
    describe("getByID", () => {
        it("Debe devolver un issue", async () => {
            const issuegetid = await Issue.getByID(1);

            expect(issuegetid).toBeInstanceOf(Issue);
        });

        it("Debe devolver un error si no se proporciona un ID", async () => {
            await expect(Issue.getByID()).rejects.toThrow();
        });
    });

    /**
    * @brief
    * Prueba unitaria para el método getAll
    */
    describe("getAll", () => {
        it("Debe devolver un arreglo de issues", async () => {
            const issues = await Issue.getAll();

            expect(Array.isArray(issues)).toBe(true);
        });
    });

    /**
    * @brief
    * Prueba unitaria para el metodo verify
    */
    describe("verify", () => {
        test("Debe devolver un error si no se proporciona un nombre de issue", async () => {
            const issuevrfy1 = new Issue({ labelIssue: "Front" });

            await expect(issuevrfy1.verify()).rejects.toThrow(
                "No se ha proporcionado un nombre de issue"
            );
        });

        test("Debe devolver un error si el nombre es muy largo", async () => {
            const issuevrfy2 = new Issue({
                nombreIssue: "a".repeat(151),
                labelIssue: "Front",
            });

            await expect(issuevrfy2.verify()).rejects.toThrow(
                "El nombre es muy largo"
            );
        });

        test("Debe devolver un error si no se proporciona un label de issue", async () => {
            const issuevrfy3 = new Issue({
                nombreIssue: "Implementar barra de progreso",
            });

            await expect(issuevrfy3.verify()).rejects.toThrow(
                "No se ha proporcionado un label de issue"
            );
        });

        test("Debe devolver un error si el label es muy largo", async () => {
            const issuevrfy4 = new Issue({
                nombreIssue: "Implementar barra de progreso",
                labelIssue: "a".repeat(51),
            });

            await expect(issuevrfy4.verify()).rejects.toThrow(
                "El label es muy largo"
            );
        });

    });
});