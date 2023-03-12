-- file: inputData.sql
-- brief: File used for inputting data into the database
-- author: Carlos Salguero
-- author: Yuna Chung
-- author: Olimpia Garcia
-- author: Diego Llaca
-- author: Diego Sandoval
-- author: Ivan Paredes
-- version: 1.0
-- date: 2023-03-11
-- copyrigth: Copyright (c) 2023 - MIT License

-- Insertando datos en la tabla Empleado
insert into Empleado
    (primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, idGoogleAuth)
values
    ('Juan', 'Pablo', 'García', 'López', UNHEX(REPLACE('ba275379-63a6-11ec-96d2-87fcf641e8fa', '-', ''))),
    ('María', NULL, 'Hernández', 'González', UNHEX(REPLACE('c1b8d2aa-63a6-11ec-9e23-9be2c7145f5a', '-', ''))),
    ('Pedro', 'Antonio', 'Fernández', NULL, UNHEX(REPLACE('c925d91c-63a6-11ec-a0e2-d1e26a2432cf', '-', ''))),
    ('Laura', 'Elena', 'Martínez', 'Pérez', UNHEX(REPLACE('d2a2b3f2-63a6-11ec-9b62-f753f04c4b24', '-', ''))),
    ('José', 'Luis', 'González', 'Rodríguez', UNHEX(REPLACE('d8a42c6a-63a6-11ec-bc11-9f6050e314e7', '-', ''))),
    ('Ana', 'María', 'López', NULL, UNHEX(REPLACE('de41d6de-63a6-11ec-b2a8-19b38d674b7f', '-', ''))),
    ('Carlos', NULL, 'Gutiérrez', 'Ortega', UNHEX(REPLACE('e41fa2b2-63a6-11ec-8b4b-3b89ba4ddc07', '-', ''))),
    ('Sara', 'Isabel', 'Sánchez', 'Romero', UNHEX(REPLACE('ea4cf4a4-63a6-11ec-a78b-1bcf55cde0da', '-', ''))),
    ('David', 'Alejandro', 'Pérez', 'Ruiz', UNHEX(REPLACE('f094c5d6-63a6-11ec-98e2-ef92a1d64b5d', '-', ''))),
    ('Verónica', 'Lucía', 'Díaz', NULL, UNHEX(REPLACE('f7a3c470-63a6-11ec-80de-07349dfe7d27', '-', ''))),
    ('Miguel', NULL, 'Romero', 'Gómez', UNHEX(REPLACE('fe35d794-63a6-11ec-a42a-43f1049987b9', '-', ''))),
    ('Fernanda', 'Paola', 'Ortega', 'Morales', UNHEX(REPLACE('045c7e46-63a7-11ec-a3a4-6f1115292d1a', '-', ''))),
    ('Ricardo', 'José', 'Ruiz', 'Hernández', UNHEX(REPLACE('0bb2f8c8-63a7-11ec-965e-5346b41a618f', '-', ''))),
    ('Carmen', 'Leticia', 'Flores', 'García', UNHEX(REPLACE('11fbb5fc-63a7-11ec-bce8-7b2359dbdff', '-', ''))),
    ('Juan', 'Carlos', 'García', NULL, UNHEX('6f40c9ac9e8f11eb97e500ff22e710b3')),
    ('Ana', 'Isabel', 'Hernández', 'Martínez', UNHEX
    ('6f40c9b09e8f11eb97e500ff22e710b3')),
    ('María', 'Fernanda', 'Gutiérrez', 'Díaz', UNHEX
    ('6f40c9b19e8f11eb97e500ff22e710b3')),
    ('Roberto', 'Carlos', 'Vázquez', NULL, UNHEX
    ('6f40c9b29e8f11eb97e500ff22e710b3')),
    ('Luis', 'Gerardo', 'Méndez', 'Torres', UNHEX
    ('6f40c9b39e8f11eb97e500ff22e710b3')),
    ('Esteban', NULL, 'García', NULL, UNHEX
('f78f3077880a48a7b0a39f34d9b9a2d1')),
    ('Maria', 'Antonieta', 'Hernández', NULL, UNHEX
('832bfe6b7f6c4d838f8a52a31a20a44e')),
    ('Mario', NULL, 'Black', 'Díaz', UNHEX
('1562e70c8d444ad2b68c4f41b3d4c8f9')),
    ('Carmen', 'Dolores', 'Vázquez', NULL, UNHEX
('6f40c9b29e8f11eb97e500ff22e710b3')),
    ('Chan', NULL, 'Yeol', NULL , UNHEX
('3a92d8f88bba4aa09622e2872c45cc7f'))

-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member')

