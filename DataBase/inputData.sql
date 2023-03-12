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
    (primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, idGoogleAuth, googleEmail)
values


-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member')

-- Insertando datos en tabla de Issue
insert into Issue
    (nombreIssue, storyPoints, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion)
values
    ('Thomas', 'Andrew', 'Peterson', null, UNHEX(REPLACE('ed9a2326-3f05-4a4f-80e8-81457275ff7f', '-', '')), 'thomas@gmail.com'),
    ('John', 'Michael', 'Smith', null, UNHEX(REPLACE('68404405-5c4c-44c1-887c-9c4aa9e51fa5', '-', '')), 'johnmichael@gmail.com'),
    ('Mary', null, 'Smith', null, UNHEX(REPLACE('71cf87e8-d60e-4b62-8a5d-2c223489a972', '-', '')), 'marysmith@gmail.com'),
    ('Ethan', 'Michael', 'Phillips', null, unhex(replace()), null),
    ('Rebecca', null, 'Johnson', 'Smith', UNHEX(REPLACE('f1b5b8b1-1b9f-4b5b-8c1a-1c1b1b1b1b1b', '-', '')), 'rebecca@gmail.com'),
    ('David', 'Robert', 'Wilson', 'Open', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-30774538483b', '-', '')), 'davidwilson@gmail.com'),
    ('Samantha', null, 'Jones', 'Closed', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-30774538483c', '-', '')), 'samanthajones@gmail.com'),
    ('Nathan', 'Christopher', 'Clark', 'In Progress', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-30774538483d', '-', '')), 'nathanclark@gmail.com'),
    ('Olivia', null, 'Davis', 'Open', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-30774538483e', '-', '')), 'oliviadavis@gmail.com'),
    ('Jacob', 'Anthony', 'Martinez', 'Closed', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-30774538483f', '-', '')), 'jacobmartinez@gmail.com'),
    ('Emily', null, 'Garcia', 'In Progress', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-307745384840', '-', '')), 'emilygarcia@gmail.com'),
    ('William', 'Ryan', 'Hernandez', 'Open', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-307745384841', '-', '')), 'williamhernandez@gmail.com'),
    ('Isabella', null, 'Lopez', 'Closed', UNHEX(REPLACE('4f23f31c-6e36-4f9e-8a36-307745384842', '-', '')), 'isabellalopez@gmail.com'),
    ('Elijah', 'Noah
