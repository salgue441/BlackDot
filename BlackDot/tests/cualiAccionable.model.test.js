/**
 * @file cualiAccionable.model.test.js
 * @brief Archivo de preubas unitarias para el modelo cualiAccionable.model.js
 * @author Yuna Chung
 * @date 2023.03.27
 * @version 1.0
 * 
 * @copyright Copyright (c) 2023 - MIT License
 **/

const CualiAccionable = require("../Models/cuali-accionable.model")

/**
 * @brief
 * Test para CualiAccionable
 **/

describe("CualiAccionable", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    describe("Constructor", () => {
        /**
         * @brief
         * Test para el constructor de CualiAccionable
         * @param {int} idCualitativa - ID de Cualitativa
         * @param {int} idAccionable - ID de Accionable
         **/

        test("Debe crear una instancia de CualiAccionable", () => {
            const cualiAccionable = new CualiAccionable({
                idCualitativa: 1,
                idAccionable: 1,
            })
            expect(cualiAccionable).toBeInstanceOf(CualiAccionable)
        })
    })

    /**
     * @brief
     * Test para el método de GetByIDC
     * @param {int} idCualitativa - ID de Cualitativa
     **/

    describe("getByIDC", () => {
        test("Debe devolver un arreglo de respuestas cualitativas", async () => {
            const cualitativas = await CualiAccionable.getByIdC(1)
            expect(cualitativas).toBeInstanceOf(CualiAccionable)
        })
    })

    /**
     * @brief
     * Test para el método de GetByIDA
     * @param {int} idAccionable - ID del Accionable
     **/

    describe("getByIDA", () => {
        test("Debe devolver un arreglo de accionables", async () => {
            const accionable = await CualiAccionable.getByIDA(1)
            expect(accionable).toBeInstanceOf(CualiAccionable)
        }) 
    })
})