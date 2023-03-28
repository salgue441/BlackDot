/**
 * @file cualiAccionable.model.test.js
 * @brief Archivo de preubas unitarias para el modelo cualiAccionable.model.js
 * @author Yuna Chung
 * @date 2023.03.27
 * @version 1.0
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

const CualitativaAccionable = require("../Models/cuali-accionable.model");

/**
 * @brief
 * Test para CualitativaAccionable
 **/

describe("CualitativaAccionable", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe("Constructor", () => {
        /**
         * @brief
         * Test para el constructor de CualitativaAccionable
         * @param {int} idCualitativa - ID de Cualitativa
         * @param {int} idAccionable - ID de Accionable
         **/

        test("Debe crear una instancia de CualitativaAccionable", () => {
            const cualitativaAccionable = new CualitativaAccionable({
                idCualitativa: 1,
                idAccionable: 1,
            });
            expect(cualitativaAccionable).toBeInstanceOf(CualitativaAccionable);
        });
    });

    /**
     * @brief
     * Test para el método de GetByIDC
     * @param {int} idCualitativa - ID de Cualitativa
     **/

    describe("getByIDC", () => {
        test("Debe devolver un arreglo de respuestas cualitativas", async () => {
            const cualitativas = await CualitativaAccionable.getByIdC(1);
            expect(cualitativas).toBeInstanceOf(CualitativaAccionable);
        });
    });

    /**
     * @brief
     * Test para el método de GetByIDA
     * @param {int} idAccionable - ID del Accionable
     **/

    describe("getByIDA", () => {
        test("Debe devolver un arreglo de accionables", async () => {
            const accionable = await CualitativaAccionable.getByIDA(1);
            expect(accionable).toBeInstanceOf(CualitativaAccionable);
        });
    });

    /**
     * @brief
     * Test para el método de getAll de CualitativaAccionable
     **/

    describe("getAll", () => {
        test("Debe devolver un arreglo de cualitativaAccionable", async () => {
            const cualitativaAccionable = await CualitativaAccionable.getAll();
            expect(cualitativaAccionable).toBeInstanceOf(Array);
            expect(cualitativaAccionable[0]).toBeInstanceOf(CualitativaAccionable);
        });
    });
});