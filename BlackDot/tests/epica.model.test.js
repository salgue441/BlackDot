/**
 * @file epica.model.test.js
 * @brief Test de la clase Cualitativa
 * @author Olimpia Garcia
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */


const Epica = require("../models/epica.model")

describe("Epica", () => {
    beforeEach(() => {
      jest.resetModules()
    })

    describe ("Constructor", () =>{
    
    test("Crear una instancia Epica", () => 
    {
        const epica = new Epica({
        idEpica: 1,
        contenido: "Rovin en Mappa",
        })
        expect(epica).toBeInstance(Epica)
    })
    
    describe("geByID", () => 
    {
      test("Debe devolver una epica", async () => 
      {
        const epica = await Epica.getByID(1)
        expect(epica).toBeInstanceOf(Epica)
      })
    })

    describe("getAll", () => 
    {
      test("Debe devolver un arreglo de epicas", async () => {
        const epicas = await Epica.getAll()
        expect(epicas).toBeInstanceOf(Array)
        expect(epicas[0]).toBeInstanceOf(Epica)
      })
    })
  })
})